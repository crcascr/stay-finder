import { useEffect, useMemo, useState } from "react";
import { type DateRange, DayPicker } from "react-day-picker";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Bath, Bed, MapPin, Minus, Plus, Star, Users } from "lucide-react";

import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import Loader from "@/components/ui/Loader";
import {
  checkOverlap,
  createBooking,
  getAccommodationById,
} from "@/lib/bookings";
import { useAccommodations } from "@/stores/useAccommodations";
import { useSession } from "@/stores/useSession";
import type { Accommodation } from "@/types/raw-supabase";
import { AmenityIcons } from "@/utils/AmenityIcons";

import "react-day-picker/dist/style.css";

export default function AccommodationDetail() {
  const { id } = useParams<{ id: string }>();
  const { list } = useAccommodations();
  const profile = useSession((s) => s.profile);

  // Estados para reserva
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [guests, setGuests] = useState(2);
  const [accommodation, setAccommodation] = useState<Accommodation | null>(
    null,
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAccommodation = async () => {
      setLoading(true);
      const fromStore = list.find((a) => a.id === id);
      if (fromStore) {
        setAccommodation(fromStore);
        setLoading(false);
        return;
      }

      const { data, error } = await getAccommodationById(id!);
      if (error || !data) {
        setAccommodation(null);
        toast.error("Alojamiento no encontrado");
      } else {
        setAccommodation(data as Accommodation);
      }
      setLoading(false);
    };
    loadAccommodation();
  }, [id, list]);

  const totalNights =
    dateRange?.from && dateRange?.to
      ? (dateRange.to.getTime() - dateRange.from.getTime()) /
        (1000 * 60 * 60 * 24)
      : 0;
  const totalPrice = accommodation
    ? totalNights * accommodation?.price_per_night + 10_000
    : 0;

  const handleDateSelect = (range: DateRange | undefined) => {
    // Aseguramos que el rango siempre tenga `from` y `to` definidos
    if (range?.from && !range.to) {
      // Si solo se ha seleccionado una fecha, esperamos la segunda
      setDateRange({ from: range.from, to: undefined });
    } else if (range?.from && range?.to) {
      // Normalizamos el rango para que from <= to
      const from = range.from <= range.to ? range.from : range.to;
      const to = range.from <= range.to ? range.to : range.from;
      setDateRange({ from, to });
    } else {
      // Si se deselecciona (ej: clic en una fecha ya seleccionada)
      setDateRange(undefined);
    }
  };

  const handleReserve = async () => {
    if (!profile) {
      toast.error("Inicia sesión para reservar");
      return;
    }
    if (!dateRange?.from || !dateRange?.to) {
      toast.error("Selecciona fechas");
      return;
    }

    if (!accommodation) {
      toast.error("Alojamiento no encontrado");
      return;
    }

    setLoading(true);

    const checkIn = dateRange.from.toISOString().slice(0, 10);
    const checkOut = dateRange.to.toISOString().slice(0, 10);

    // 1. Validar solapamiento
    const overlap = await checkOverlap(accommodation.id, checkIn, checkOut);
    if (overlap.length > 0) {
      toast.error("Las fechas ya están reservadas");
      setLoading(false);
      return;
    }

    // 2. Crear reserva
    const { error } = await createBooking(
      profile.id,
      accommodation.id,
      dateRange.from,
      dateRange.to,
      guests,
      totalPrice,
    );

    setLoading(false);
    if (error) {
      toast.error("Ocurrió un error al confirmar");
    } else {
      toast.success("¡Reserva confirmada!");
      setDateRange(undefined);
    }
  };

  // Calcular fechas deshabilitadas
  const disabledDates = useMemo(() => {
    if (!accommodation || !accommodation.unavailable_dates) return [];

    // Fechas pasadas + fechas no disponibles
    const past = { before: new Date() };

    const unavailable = accommodation.unavailable_dates.map((dateStr) => {
      const [year, month, day] = dateStr.split("-").map(Number);
      return new Date(year, month - 1, day); // Meses en JS son 0-indexed
    });

    return [past, ...unavailable];
  }, [accommodation]);

  if (loading)
    return (
      <>
        <Navbar />
        <Loader />
        <Footer />
      </>
    );

  if (!accommodation) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex flex-grow items-center justify-center">
          <p>Alojamiento no encontrado.</p>
        </main>
        <Footer />
      </div>
    );
  }

  const {
    title,
    location,
    description,
    reviews_count,
    max_guests,
    bedrooms,
    bathrooms,
    price_per_night,
  } = accommodation;

  const images: string[] = accommodation.images ?? [];
  const rating: number = accommodation.rating ?? 0;
  const amenities: string[] = accommodation.amenities ?? [];

  return (
    <div className="bg-background-light dark:bg-background-dark flex min-h-screen flex-col">
      <Navbar />
      <main className="container mx-auto flex-grow px-4 py-8 lg:px-8">
        {/* Encabezado con título y ubicación */}
        <div className="mb-4">
          <h1 className="text-text-primary-light dark:text-text-primary-dark text-3xl font-bold md:text-4xl">
            {title}
          </h1>
          <div className="text-text-secondary-light dark:text-text-secondary-dark mt-2 flex items-center gap-2">
            <MapPin size={16} />
            <span>{location}</span>
          </div>
        </div>

        {/* Galería de Imágenes */}
        <div className="mb-8 grid h-[500px] grid-cols-1 gap-2 md:grid-cols-2 md:grid-rows-2">
          <div className="md:col-span-1 md:row-span-2">
            <img
              src={images[0]}
              alt={title}
              className="h-full w-full rounded-lg object-cover"
            />
          </div>
          <div className="hidden md:block">
            <img
              src={images[1] || images[0]}
              alt={title}
              className="h-full w-full rounded-lg object-cover"
            />
          </div>
          <div className="hidden md:block">
            <img
              src={images[2] || images[0]}
              alt={title}
              className="h-full w-full rounded-lg object-cover"
            />
          </div>
        </div>

        {/* Contenido Principal y Panel de Reserva */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Columna de Información */}
          <div className="lg:col-span-2">
            <div className="border-border-light dark:border-border-dark border-b pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-semibold">
                    Alojamiento completo
                  </h2>
                  <div className="text-text-secondary-light dark:text-text-secondary-dark mt-1 flex gap-4">
                    <span>
                      <Users className="mr-2 inline" />
                      {max_guests} huéspedes
                    </span>
                    <span>
                      <Bed className="mr-2 inline" />
                      {bedrooms} dormitorios
                    </span>
                    <span>
                      <Bath className="mr-2 inline" />
                      {bathrooms} baños
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 font-bold">
                  <Star size={20} className="fill-current text-yellow-400" />
                  <span>
                    {rating.toFixed(1)} ({reviews_count} reseñas)
                  </span>
                </div>
              </div>
            </div>

            <div className="border-border-light dark:border-border-dark border-b py-6">
              <h3 className="mb-2 text-xl font-semibold">Descripción</h3>
              <p className="text-text-secondary-light dark:text-text-secondary-dark whitespace-pre-line">
                {description}
              </p>
            </div>

            <div className="py-6">
              <h3 className="mb-4 text-xl font-semibold">Comodidades</h3>
              <ul className="grid grid-cols-2 gap-4">
                {amenities.map((amenity) => (
                  <li key={amenity} className="flex items-center gap-3">
                    {AmenityIcons[amenity] || <Star size={20} />}
                    <span>{amenity}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Selector de fechas */}
            <div className="py-6">
              <h3 className="mb-4 text-xl font-semibold">Disponibilidad</h3>
              <div className="dark:bg-surface-dark flex items-center justify-center rounded-lg border bg-white p-6">
                <DayPicker
                  mode="range"
                  selected={dateRange}
                  onSelect={handleDateSelect}
                  disabled={disabledDates}
                  locale={es}
                  numberOfMonths={2}
                  hidden={{ before: new Date() }}
                  footer={
                    dateRange?.from &&
                    dateRange?.to && (
                      <p className="text-text-secondary-light dark:text-text-secondary-dark mt-2 text-sm">
                        {format(dateRange.from, "PPP", { locale: es })} –{" "}
                        {format(dateRange.to, "PPP", { locale: es })}
                      </p>
                    )
                  }
                />
              </div>
            </div>
          </div>

          {/* Columna de Reserva (Sticky) */}
          <div className="lg:col-span-1">
            <div className="bg-surface-light dark:bg-surface-dark border-border-light dark:border-border-dark sticky top-24 flex flex-col gap-6 rounded-xl border p-6 shadow-lg">
              <p className="text-text-primary-light dark:text-text-primary-dark text-2xl font-bold">
                ${price_per_night.toLocaleString("es-CO")}{" "}
                <span className="text-text-secondary-light dark:text-text-secondary-dark text-base font-normal">
                  / noche
                </span>
              </p>

              {/* Fechas y Huéspedes */}
              <div className="border-border-light dark:border-border-dark rounded-lg border">
                {/* Fechas */}
                {totalNights > 0 && (
                  <div className="border-border-light dark:border-border-dark grid grid-cols-2 border-b">
                    <div className="p-3">
                      <span className="text-text-secondary-light dark:text-text-secondary-dark text-xs font-bold uppercase">
                        Llegada
                      </span>
                      <p className="text-text-primary-light dark:text-text-primary-dark text-sm">
                        {dateRange?.from
                          ? format(dateRange.from, "P", { locale: es })
                          : "--/--/----"}
                      </p>
                    </div>
                    <div className="border-border-light dark:border-border-dark border-l p-3">
                      <span className="text-text-secondary-light dark:text-text-secondary-dark text-xs font-bold uppercase">
                        Salida
                      </span>
                      <p className="text-text-primary-light dark:text-text-primary-dark text-sm">
                        {dateRange?.to
                          ? format(dateRange.to, "P", { locale: es })
                          : "--/--/----"}
                      </p>
                    </div>
                  </div>
                )}

                {/* Huéspedes */}
                <div className="p-3">
                  <span className="text-text-secondary-light dark:text-text-secondary-dark text-xs font-bold uppercase">
                    Huéspedes
                  </span>
                  <div className="mt-1 flex items-center justify-between">
                    <button
                      onClick={() => setGuests(Math.max(1, guests - 1))}
                      className="text-text-secondary-light dark:text-text-secondary-dark hover:bg-background-light dark:hover:bg-background-dark rounded-full p-1 disabled:opacity-50"
                      aria-label="Menos huéspedes"
                      disabled={guests <= 1}
                    >
                      <Minus size={16} />
                    </button>
                    <span className="text-text-primary-light dark:text-text-primary-dark font-medium">
                      {guests} {guests === 1 ? "huésped" : "huéspedes"}
                    </span>
                    <button
                      onClick={() =>
                        setGuests(Math.min(max_guests, guests + 1))
                      }
                      className="text-text-secondary-light dark:text-text-secondary-dark hover:bg-background-light dark:hover:bg-background-dark rounded-full p-1 disabled:opacity-50"
                      aria-label="Más huéspedes"
                      disabled={guests >= max_guests}
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
              </div>

              <button
                onClick={handleReserve}
                disabled={!dateRange?.from || !dateRange?.to}
                className="bg-primary hover:bg-primary/90 w-full cursor-pointer rounded-lg py-3 font-bold text-white disabled:cursor-not-allowed disabled:opacity-60"
              >
                Reservar
              </button>

              {totalNights > 0 && (
                <div className="border-border-light dark:border-border-dark text-text-secondary-light dark:text-text-secondary-dark flex flex-col gap-3 border-t pt-4">
                  <div className="flex items-center justify-between">
                    <p className="underline">
                      {`${price_per_night.toLocaleString(
                        "es-CO",
                      )} x ${totalNights} ${
                        totalNights === 1 ? "noche" : "noches"
                      }`}
                    </p>
                    <span>
                      {`${(price_per_night * totalNights).toLocaleString(
                        "es-CO",
                      )}`}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="underline">Tarifa de servicio</p>
                    <span>{`${(10000).toLocaleString("es-CO")}`}</span>
                  </div>
                  <div className="text-text-primary-light dark:text-text-primary-dark mt-2 flex items-center justify-between text-lg font-bold">
                    <p>Total</p>
                    <span>{`${totalPrice.toLocaleString("es-CO")}`}</span>
                  </div>
                </div>
              )}

              {totalNights === 0 && (
                <p className="text-text-secondary-light dark:text-text-secondary-dark text-center text-sm">
                  Selecciona un rango de fechas para ver el precio.
                </p>
              )}

              <p className="text-text-secondary-light dark:text-text-secondary-dark text-center text-xs">
                No se te cobrará nada aún
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
