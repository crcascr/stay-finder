import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

import Loader from "@/components/ui/Loader";
import { uploadImage } from "@/lib/storage";
import { supabase } from "@/lib/supabase";
import { useSession } from "@/stores/useSession";
import type { Accommodation } from "@/types/accommodation";

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
  const profile = useSession((s) => s.profile);
  const [form, setForm] = useState(initial);
  const [loading, setLoading] = useState(Boolean(id));
  const [files, setFiles] = useState<File[]>([]);

  useEffect(() => {
    if (!id) return;
    (async () => {
      const { data, error } = await supabase
        .from("accommodations")
        .select("*")
        .eq("id", id)
        .single();
      if (error) toast.error("No se pudo cargar");
      else {
        const d = data as Accommodation;
        // Sanitize numeric fields that could be Infinity
        if (!isFinite(d.price_per_night)) d.price_per_night = 0;
        if (!isFinite(d.max_guests)) d.max_guests = 1;
        if (!isFinite(d.bedrooms)) d.bedrooms = 1;
        if (!isFinite(d.bathrooms)) d.bathrooms = 1;
        setForm(d);
      }
      setLoading(false);
    })();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // 1. Subir imágenes nuevas
    const uploadedUrls = await Promise.all(
      files.map((f) => uploadImage(f, "accommodation-images")),
    );
    const finalImages = [...form.images, ...uploadedUrls].slice(0, 6); // máx 6

    // 2. Preparar payload
    const payload = { ...form, images: finalImages, created_by: profile?.id };

    // 3. Insert / Update
    const { error } = id
      ? await supabase.from("accommodations").update(payload).eq("id", id)
      : await supabase.from("accommodations").insert(payload);

    setLoading(false);
    if (error) toast.error("Error al guardar");
    else {
      toast.success(id ? "Actualizado" : "Creado");
      navigate("/dashboard/accommodations");
    }
  };

  if (loading) return <Loader />;

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl space-y-6">
      {/* Campos básicos (title, description, price, etc.) */}
      <div>
        <label className="mb-2 block text-sm font-semibold">Imágenes</label>
        <input
          type="file"
          multiple
          onChange={(e) => setFiles(Array.from(e.target.files || []))}
          className="focus:ring-primary w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:outline-none dark:border-gray-600 dark:bg-gray-700"
        />
      </div>
      {/* Botón guardar */}
      <button
        type="submit"
        disabled={loading}
        className="bg-primary hover:bg-primary/90 rounded-lg px-6 py-3 text-white transition-colors"
      >
        {loading ? "Guardando..." : "Guardar"}
      </button>
    </form>
  );
}