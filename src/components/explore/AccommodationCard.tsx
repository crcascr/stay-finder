import { Link } from "react-router-dom";
import { MapPin, Users, Star } from "lucide-react";
import type { Accommodation } from "../../types/accommodation";

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
      className="block bg-surface-light dark:bg-surface-dark rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow cursor-pointer group"
    >
      {/* Imagen */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={accommodation.images[0]}
          alt={accommodation.title}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3 bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold">
          {getCategoryLabel(accommodation.category)}
        </div>
      </div>

      {/* Contenido */}
      <div className="p-4">
        <h3 className="text-lg font-bold mb-2 line-clamp-1">
          {accommodation.title}
        </h3>

        <div className="flex items-center gap-1 text-text-secondary-light dark:text-text-secondary-dark mb-2">
          <MapPin size={16} />
          <span className="text-sm">{accommodation.location}</span>
        </div>

        <div className="flex items-center gap-4 text-sm text-text-secondary-light dark:text-text-secondary-dark mb-3">
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
            <span className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
              ({accommodation.reviews_count})
            </span>
          </div>

          <div className="text-right">
            <span className="text-2xl font-bold text-primary">
              {formatPrice(accommodation.price_per_night)}
            </span>
            <span className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
              {" "}
              /noche
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
