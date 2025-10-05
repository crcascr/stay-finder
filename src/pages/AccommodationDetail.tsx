import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { mockAccommodations } from "@/data/mockAccommodations";
import type { Accommodation } from "@/types/accommodation";
import { Star, Users, Bed, Bath, MapPin } from "lucide-react";
import { AmenityIcons } from "@/utils/AmenityIcons";

export default function AccommodationDetail() {
  const { id } = useParams<{ id: string }>();
  const [accommodation, setAccommodation] = useState<Accommodation | null>(
    null
  );

  useEffect(() => {
    const foundAccommodation = mockAccommodations.find((acc) => acc.id === id);
    setAccommodation(foundAccommodation || null);
  }, [id]);

  if (!accommodation) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <p>Alojamiento no encontrado.</p>
        </main>
        <Footer />
      </div>
    );
  }

  const {
    title,
    location,
    images,
    description,
    rating,
    reviews_count,
    max_guests,
    bedrooms,
    bathrooms,
    price_per_night,
    amenities,
  } = accommodation;

  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 lg:px-8 py-8">
        {/* Encabezado con título y ubicación */}
        <div className="mb-4">
          <h1 className="text-3xl md:text-4xl font-bold text-text-primary-light dark:text-text-primary-dark">
            {title}
          </h1>
          <div className="flex items-center gap-2 text-text-secondary-light dark:text-text-secondary-dark mt-2">
            <MapPin size={16} />
            <span>{location}</span>
          </div>
        </div>

        {/* Galería de Imágenes */}
        <div className="grid grid-cols-1 md:grid-cols-2 md:grid-rows-2 gap-2 h-[500px] mb-8">
          <div className="md:col-span-1 md:row-span-2">
            <img
              src={images[0]}
              alt={title}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <div className="hidden md:block">
            <img
              src={images[1] || images[0]}
              alt={title}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <div className="hidden md:block">
            <img
              src={images[2] || images[0]}
              alt={title}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </div>

        {/* Contenido Principal y Panel de Reserva */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Columna de Información */}
          <div className="lg:col-span-2">
            <div className="border-b border-border-light dark:border-border-dark pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-semibold">
                    Alojamiento completo
                  </h2>
                  <div className="flex gap-4 text-text-secondary-light dark:text-text-secondary-dark mt-1">
                    <span>
                      <Users className="inline mr-2" />
                      {max_guests} huéspedes
                    </span>
                    <span>
                      <Bed className="inline mr-2" />
                      {bedrooms} dormitorios
                    </span>
                    <span>
                      <Bath className="inline mr-2" />
                      {bathrooms} baños
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 font-bold">
                  <Star size={20} className="text-yellow-400 fill-current" />
                  <span>
                    {rating.toFixed(1)} ({reviews_count} reseñas)
                  </span>
                </div>
              </div>
            </div>

            <div className="py-6 border-b border-border-light dark:border-border-dark">
              <h3 className="text-xl font-semibold mb-2">Descripción</h3>
              <p className="text-text-secondary-light dark:text-text-secondary-dark whitespace-pre-line">
                {description}
              </p>
            </div>

            <div className="py-6">
              <h3 className="text-xl font-semibold mb-4">Comodidades</h3>
              <ul className="grid grid-cols-2 gap-4">
                {amenities.map((amenity) => (
                  <li key={amenity} className="flex items-center gap-3">
                    {AmenityIcons[amenity] || <Star size={20} />}
                    <span>{amenity}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Columna de Reserva (Sticky) */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 p-6 bg-surface-light dark:bg-surface-dark rounded-xl shadow-lg border border-border-light dark:border-border-dark">
              <p className="text-2xl font-bold mb-4">
                ${price_per_night.toLocaleString("es-CO")}{" "}
                <span className="text-base font-normal">noche</span>
              </p>
              <div className="border rounded-lg p-3 mb-4">
                <p className="text-center text-sm">
                  Fechas y huéspedes (funcionalidad futura)
                </p>
              </div>
              <button className="w-full bg-primary text-white font-bold py-3 rounded-lg hover:bg-primary/90 transition-colors">
                Reservar
              </button>
              <p className="text-center text-xs text-text-secondary-light dark:text-text-secondary-dark mt-3">
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
