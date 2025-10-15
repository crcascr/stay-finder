import { useNavigate } from "react-router-dom";

import type { Category } from "@/types/accommodation";

interface Destination {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  category: Category;
}

const destinations: Destination[] = [
  {
    id: 1,
    title: "Retiros de Montaña",
    description: "Cabañas y chalets acogedores",
    imageUrl:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    category: "mountain",
  },
  {
    id: 2,
    title: "Escapadas Frente al Mar",
    description: "Villas con vista al océano",
    imageUrl:
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80",
    category: "beach",
  },
  {
    id: 3,
    title: "Apartamentos Urbanos",
    description: "Vida urbana con estilo",
    imageUrl:
      "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800&q=80",
    category: "city",
  },
];

export default function FeaturedDestinations() {
  const navigate = useNavigate();

  const handleDestinationClick = (category: Category) => {
    navigate(`/explore?category=${category}`);
  };
  return (
    <section className="bg-background-light dark:bg-background-dark py-16 sm:py-24">
      <div className="container mx-auto px-6 lg:px-8">
        <h2 className="mb-12 text-center text-3xl font-bold">
          Destinos destacados
        </h2>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {destinations.map((destination) => (
            <div
              key={destination.id}
              className="group cursor-pointer overflow-hidden rounded-lg"
              onClick={() => handleDestinationClick(destination.category)}
            >
              <div
                className="h-64 w-full transform bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                style={{ backgroundImage: `url("${destination.imageUrl}")` }}
              />
              <div className="bg-surface-light dark:bg-surface-dark p-4">
                <h3 className="text-lg font-semibold">{destination.title}</h3>
                <p className="text-text-secondary-light dark:text-text-secondary-dark">
                  {destination.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
