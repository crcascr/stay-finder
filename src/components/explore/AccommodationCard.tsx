import { Link } from "react-router-dom";

import { MapPin, Star,Users } from "lucide-react";

import type { Accommodation } from "@/types/accommodation";

interface AccommodationCardProps {
  accommodation: Accommodation;
}

export default function AccommodationCard({
  accommodation,
}: AccommodationCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      mountain: "Montaña",
      beach: "Playa",
      city: "Ciudad",
      countryside: "Campo",
      luxury: "Lujo",
    };
    return labels[category] || category;
  };

  return (
    <Link
      to={`/accommodation/${accommodation.id}`}
      className="bg-surface-light dark:bg-surface-dark group block cursor-pointer overflow-hidden rounded-lg shadow-md transition-shadow hover:shadow-xl"
    >
      {/* Imagen */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={accommodation.images[0]}
          alt={accommodation.title}
          className="h-full w-full transform object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="bg-primary absolute top-3 right-3 rounded-full px-3 py-1 text-sm font-semibold text-white">
          {getCategoryLabel(accommodation.category)}
        </div>
      </div>

      {/* Contenido */}
      <div className="p-4">
        <h3 className="mb-2 line-clamp-1 text-lg font-bold">
          {accommodation.title}
        </h3>

        <div className="text-text-secondary-light dark:text-text-secondary-dark mb-2 flex items-center gap-1">
          <MapPin size={16} />
          <span className="text-sm">{accommodation.location}</span>
        </div>

        <div className="text-text-secondary-light dark:text-text-secondary-dark mb-3 flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1">
            <Users size={16} />
            <span>{accommodation.max_guests} huéspedes</span>
          </div>
          <span>•</span>
          <span>{accommodation.bedrooms} hab.</span>
          <span>•</span>
          <span>{accommodation.bathrooms} baños</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Star size={16} className="fill-yellow-400 text-yellow-400" />
            <span className="font-semibold">{accommodation.rating}</span>
            <span className="text-text-secondary-light dark:text-text-secondary-dark text-sm">
              ({accommodation.reviews_count})
            </span>
          </div>

          <div className="text-right">
            <span className="text-primary text-2xl font-bold">
              {formatPrice(accommodation.price_per_night)}
            </span>
            <span className="text-text-secondary-light dark:text-text-secondary-dark text-sm">
              {" "}
              /noche
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
