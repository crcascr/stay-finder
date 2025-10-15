import {
  type ChangeEvent,
  type DragEvent,
  type FormEvent,
  useEffect,
  useState,
} from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

import Loader from "@/components/ui/Loader";
import { getAccommodationById } from "@/lib/bookings";
import { uploadImage } from "@/lib/storage";
import { supabase } from "@/lib/supabase";
import { useAdminAccommodations } from "@/stores/useAdminAccommodations";
import type { Accommodation } from "@/types/raw-supabase";

const amenitiesPool = [
  "WiFi",
  "Aire acondicionado",
  "Chimenea",
  "Cocina equipada",
  "Cocina",
  "Cocina gourmet",
  "Estacionamiento",
  "Vista a la montaña",
  "Piscina privada",
  "Piscina",
  "Piscina del edificio",
  "BBQ",
  "Playa privada",
  "Chef disponible",
  "TV",
  "Gimnasio del edificio",
  "Gimnasio",
  "Jardín",
  "Zona de juegos",
  "Jacuzzi",
  "Terraza",
  "Balcón",
  "Servicio de limpieza",
  "Desayuno incluido",
  "Room service",
  "Spa",
  "Muelle privado",
  "Kayaks",
  "Fogata",
];

const propertyTypeOpts: {
  label: string;
  value: Accommodation["property_type"];
}[] = [
  { label: "Apartamento", value: "apartment" },
  { label: "Casa", value: "house" },
  { label: "Cabaña", value: "cabin" },
  { label: "Villa", value: "villa" },
  { label: "Hotel", value: "hotel" },
];

const categoryOpts: { label: string; value: Accommodation["category"] }[] = [
  { label: "Montaña", value: "mountain" },
  { label: "Playa", value: "beach" },
  { label: "Ciudad", value: "city" },
  { label: "Campo", value: "countryside" },
  { label: "Lujo", value: "luxury" },
];

const initial: Omit<Accommodation, "id" | "created_at" | "created_by"> = {
  title: "",
  description: "",
  location: "",
  city: "",
  country: "",
  price_per_night: 0,
  max_guests: 1,
  bedrooms: 1,
  bathrooms: 1,
  property_type: "apartment",
  category: "city",
  images: [],
  amenities: [],
  rating: 0,
  reviews_count: 0,
  is_available: true,
  unavailable_dates: [],
};

export default function AccommodationForm() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { list } = useAdminAccommodations();
  const [form, setForm] = useState(initial);
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(Boolean(id));
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!id) return;
    const loadAccommodation = async () => {
      setLoading(true);
      const fromStore = list.find((a) => a.id === id);
      if (fromStore) {
        setForm(fromStore);
        setLoading(false);
        return;
      }

      const { data, error } = await getAccommodationById(id!);
      if (error || !data) {
        toast.error("Alojamiento no encontrado");
      } else {
        setForm(data as Accommodation);
      }
      setLoading(false);
    };
    loadAccommodation();
  }, [id, list]);

  const validate = (): boolean => {
    const e: Record<string, string> = {};

    if (!form.title.trim()) e.title = "El título es obligatorio";
    if (!(form.description || "").trim())
      e.description = "La descripción es obligatoria";
    if (!(form.location || "").trim())
      e.location = "La ubicación es obligatoria";
    if (!(form.city || "").trim()) e.city = "La ciudad es obligatoria";
    if (!(form.country || "").trim()) e.country = "El país es obligatorio";
    if (form.price_per_night <= 0)
      e.price_per_night = "El precio debe ser mayor a 0";
    if (form.max_guests < 1) e.max_guests = "Mínimo 1 huésped";
    if (form.bedrooms < 1) e.bedrooms = "Mínimo 1 habitación";
    if (form.bathrooms < 1) e.bathrooms = "Mínimo 1 baño";
    if ((form.images || []).length === 0) e.images = "Sube al menos 1 imagen";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateField = (name: string, value: unknown) => {
    let msg = "";

    switch (name) {
      case "title":
      case "description":
      case "location":
      case "city":
      case "country":
        if (!String(value).trim()) msg = "Este campo es obligatorio";
        break;

      case "price_per_night":
      case "max_guests":
      case "bedrooms":
      case "bathrooms":
        if (Number(value) <= 0) msg = "El valor debe ser mayor a 0";
        break;
      case "images":
        if (!Array.isArray(value) || value.length === 0)
          msg = "Sube al menos 1 imagen";
        break;
      case "amenities":
        if (!Array.isArray(value) || value.length === 0)
          msg = "Selecciona al menos 1 comodidad";
        break;
      default:
        break;
    }

    setErrors((e) => ({ ...e, [name]: msg })); // <-- aquí se hace visible
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target;
    const parsed = type === "number" ? Number(value) : value;
    validateField(name, parsed);
    setForm((f) => ({ ...f, [name]: parsed }));
  };

  const handleAmenityToggle = (amenity: string) => {
    const newAmenities = (form.amenities || []).includes(amenity)
      ? (form.amenities || []).filter((a) => a !== amenity)
      : [...(form.amenities || []), amenity];

    setForm((f) => ({ ...f, amenities: newAmenities }));
    validateField("amenities", newAmenities);
  };

  const handleImageDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const dropped = Array.from(e.dataTransfer.files);
    setFiles((f) =>
      [...f, ...dropped].slice(0, 6 - (form.images || []).length),
    );
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    if (saving) return;
    setSaving(true);

    // 1. Subir imágenes nuevas
    const uploadedUrls = await Promise.all(
      files.map((f) => uploadImage(f, "accommodation-images")),
    );
    const finalImages = [...(form.images || []), ...uploadedUrls].slice(0, 6);

    // 2. Payload completo
    const payload = { ...form, images: finalImages };

    // 3. Insert / Update
    const { error } = id
      ? await supabase.from("accommodations").update(payload).eq("id", id)
      : await supabase.from("accommodations").insert(payload);

    setSaving(false);
    if (error) toast.error("Error al guardar");
    else {
      toast.success(id ? "Actualizado" : "Creado");
      navigate("/dashboard/accommodations");
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="bg-surface-light dark:bg-surface-dark mx-auto w-full max-w-4xl space-y-8 rounded-2xl p-8 shadow-lg">
      <h1 className="text-text-primary-light dark:text-text-primary-dark text-3xl font-bold">
        {id ? "Editar alojamiento" : "Nuevo alojamiento"}
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Campos básicos (title, description, price, etc.) */}
        <div>
          <label className="text-text-primary-light dark:text-text-primary-dark block text-sm font-medium">
            Imágenes (máx. 6)
          </label>
          <div className="mt-1 grid grid-cols-3 gap-4">
            {form.images?.map((img, i) => (
              <img
                key={i}
                src={img}
                alt=""
                className="h-32 w-full rounded-lg object-cover"
              />
            ))}
            {files.map((f, i) => (
              <img
                key={`new-${i}`}
                src={URL.createObjectURL(f)}
                alt=""
                className="h-32 w-full rounded-lg object-cover"
              />
            ))}
            {(form.images || []).length + files.length < 6 && (
              <div
                onDrop={handleImageDrop}
                onDragOver={(e) => e.preventDefault()}
                className="border-border-light dark:border-border-dark flex h-32 w-full cursor-pointer items-center justify-center rounded-lg border-2 border-dashed"
              >
                <span className="text-sm text-gray-500">Soltar imágenes</span>
              </div>
            )}
          </div>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) =>
              setFiles(
                Array.from(e.target.files ?? []).slice(
                  0,
                  6 - (form.images?.length || 0),
                ),
              )
            }
            className="mt-2 text-sm"
          />
        </div>
        <div className="grid gap-x-4 gap-y-6 md:grid-cols-2">
          <div>
            <label className="text-text-primary-light dark:text-text-primary-dark block text-sm font-medium">
              Título
            </label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              className="bg-background-light dark:bg-background-dark border-border-light dark:border-border-dark focus:ring-primary focus:border-primary mt-1 block w-full rounded-lg border px-4 py-3 shadow-sm focus:ring-2 focus:outline-none"
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">{errors.title}</p>
            )}
          </div>

          <div>
            <label className="text-text-primary-light dark:text-text-primary-dark block text-sm font-medium">
              Ubicación
            </label>
            <input
              name="location"
              value={form.location || undefined}
              onChange={handleChange}
              required
              className="bg-background-light dark:bg-background-dark border-border-light dark:border-border-dark focus:ring-primary focus:border-primary mt-1 block w-full rounded-lg border px-4 py-3 shadow-sm focus:ring-2 focus:outline-none"
            />
            {errors.location && (
              <p className="mt-1 text-sm text-red-600">{errors.location}</p>
            )}
          </div>

          <div>
            <label className="text-text-primary-light dark:text-text-primary-dark block text-sm font-medium">
              Ciudad
            </label>
            <input
              name="city"
              value={form.city || undefined}
              onChange={handleChange}
              required
              className="bg-background-light dark:bg-background-dark border-border-light dark:border-border-dark focus:ring-primary focus:border-primary mt-1 block w-full rounded-lg border px-4 py-3 shadow-sm focus:ring-2 focus:outline-none"
            />
            {errors.city && (
              <p className="mt-1 text-sm text-red-600">{errors.city}</p>
            )}
          </div>

          <div>
            <label className="text-text-primary-light dark:text-text-primary-dark block text-sm font-medium">
              País
            </label>
            <input
              name="country"
              value={form.country || undefined}
              onChange={handleChange}
              required
              className="bg-background-light dark:bg-background-dark border-border-light dark:border-border-dark focus:ring-primary focus:border-primary mt-1 block w-full rounded-lg border px-4 py-3 shadow-sm focus:ring-2 focus:outline-none"
            />
            {errors.country && (
              <p className="mt-1 text-sm text-red-600">{errors.country}</p>
            )}
          </div>
        </div>

        <div>
          <label className="text-text-primary-light dark:text-text-primary-dark block text-sm font-medium">
            Descripción
          </label>
          <textarea
            name="description"
            value={form.description || undefined}
            onChange={handleChange}
            rows={4}
            required
            className="bg-background-light dark:bg-background-dark border-border-light dark:border-border-dark focus:ring-primary focus:border-primary mt-1 block w-full rounded-lg border px-4 py-3 shadow-sm focus:ring-2 focus:outline-none"
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">{errors.description}</p>
          )}
        </div>

        <div className="grid gap-x-4 gap-y-6 md:grid-cols-3">
          <div>
            <label className="text-text-primary-light dark:text-text-primary-dark block text-sm font-medium">
              Precio/noche (COP)
            </label>
            <input
              name="price_per_night"
              type="number"
              min={0}
              value={form.price_per_night}
              onChange={handleChange}
              required
              className="bg-background-light dark:bg-background-dark border-border-light dark:border-border-dark focus:ring-primary focus:border-primary mt-1 block w-full rounded-lg border px-4 py-3 shadow-sm focus:ring-2 focus:outline-none"
            />
            {errors.price_per_night && (
              <p className="mt-1 text-sm text-red-600">
                {errors.price_per_night}
              </p>
            )}
          </div>
          <div>
            <label className="text-text-primary-light dark:text-text-primary-dark block text-sm font-medium">
              Huéspedes
            </label>
            <input
              name="max_guests"
              type="number"
              min={1}
              value={form.max_guests}
              onChange={handleChange}
              required
              className="bg-background-light dark:bg-background-dark border-border-light dark:border-border-dark focus:ring-primary focus:border-primary mt-1 block w-full rounded-lg border px-4 py-3 shadow-sm focus:ring-2 focus:outline-none"
            />
            {errors.max_guests && (
              <p className="mt-1 text-sm text-red-600">{errors.max_guests}</p>
            )}
          </div>
          <div>
            <label className="text-text-primary-light dark:text-text-primary-dark block text-sm font-medium">
              Habitaciones
            </label>
            <input
              name="bedrooms"
              type="number"
              min={1}
              value={form.bedrooms}
              onChange={handleChange}
              required
              className="bg-background-light dark:bg-background-dark border-border-light dark:border-border-dark focus:ring-primary focus:border-primary mt-1 block w-full rounded-lg border px-4 py-3 shadow-sm focus:ring-2 focus:outline-none"
            />
            {errors.bedrooms && (
              <p className="mt-1 text-sm text-red-600">{errors.bedrooms}</p>
            )}
          </div>
          <div>
            <label className="text-text-primary-light dark:text-text-primary-dark block text-sm font-medium">
              Baños
            </label>
            <input
              name="bathrooms"
              type="number"
              min={1}
              value={form.bathrooms}
              onChange={handleChange}
              required
              className="bg-background-light dark:bg-background-dark border-border-light dark:border-border-dark focus:ring-primary focus:border-primary mt-1 block w-full rounded-lg border px-4 py-3 shadow-sm focus:ring-2 focus:outline-none"
            />
            {errors.bathrooms && (
              <p className="mt-1 text-sm text-red-600">{errors.bathrooms}</p>
            )}
          </div>
        </div>

        <div className="grid gap-x-4 gap-y-6 md:grid-cols-2">
          <div>
            <label className="text-text-primary-light dark:text-text-primary-dark block text-sm font-medium">
              Tipo de propiedad
            </label>
            <select
              name="property_type"
              value={form.property_type}
              onChange={handleChange}
              className="bg-background-light dark:bg-background-dark border-border-light dark:border-border-dark focus:ring-primary focus:border-primary mt-1 block w-full rounded-lg border px-4 py-3 shadow-sm focus:ring-2 focus:outline-none"
            >
              {propertyTypeOpts.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-text-primary-light dark:text-text-primary-dark block text-sm font-medium">
              Categoría
            </label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="bg-background-light dark:bg-background-dark border-border-light dark:border-border-dark focus:ring-primary focus:border-primary mt-1 block w-full rounded-lg border px-4 py-3 shadow-sm focus:ring-2 focus:outline-none"
            >
              {categoryOpts.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="text-text-primary-light dark:text-text-primary-dark block text-sm font-medium">
            Comodidades
          </label>
          <div className="mt-1 flex flex-wrap gap-2">
            {amenitiesPool.map((a) => (
              <button
                key={a}
                type="button"
                onClick={() => handleAmenityToggle(a)}
                className={`cursor-pointer rounded-full px-3 py-1 text-sm font-medium ${
                  form.amenities?.includes(a)
                    ? "bg-primary text-white"
                    : "text-text-primary-light dark:text-text-primary-dark bg-gray-200 dark:bg-gray-700"
                }`}
              >
                {a}
              </button>
            ))}
            {errors.amenities && (
              <p className="mt-1 text-sm text-red-600">{errors.amenities}</p>
            )}
          </div>
        </div>
        {/* Botón guardar */}
        <div className="flex justify-end gap-4 pt-4">
          <button
            type="button"
            onClick={() => navigate("/dashboard/accommodations")}
            className="rounded-lg border border-gray-300 px-4 py-3 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-100 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-800"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={saving}
            className="bg-primary hover:bg-primary/90 focus:ring-primary flex cursor-pointer justify-center rounded-lg border border-transparent px-4 py-3 text-sm font-medium text-white shadow-sm focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:opacity-60"
          >
            {saving ? "Guardando…" : id ? "Actualizar" : "Crear"}
          </button>
        </div>
      </form>
    </div>
  );
}
