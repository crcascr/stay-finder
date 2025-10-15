import type { ReactNode } from "react";

import { Calendar, Search, Shield } from "lucide-react";

interface Feature {
  id: number;
  icon: ReactNode;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    id: 1,
    icon: <Search size={32} />,
    title: "Amplia selección",
    description: "Miles de listados únicos para elegir",
  },
  {
    id: 2,
    icon: <Calendar size={32} />,
    title: "Reserva fácil",
    description: "Proceso de búsqueda y reserva simple",
  },
  {
    id: 3,
    icon: <Shield size={32} />,
    title: "Pagos seguros",
    description: "Tus transacciones son seguras y protegidas",
  },
];

export default function FeaturesSection() {
  return (
    <section className="bg-surface-light dark:bg-surface-dark py-16 sm:py-24">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-bold">
            ¿Por qué elegir StayFinder?
          </h2>
          <p className="text-text-secondary-light dark:text-text-secondary-dark text-lg">
            Tu estadía soñada, simplificada. Hacemos fácil encontrar y reservar
            el lugar perfecto para quedarse, dondequiera que te lleven tus
            viajes.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="bg-background-light dark:bg-background-dark rounded-lg p-6 text-center"
            >
              <div className="bg-primary/10 text-primary mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
                {feature.icon}
              </div>
              <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
              <p className="text-text-secondary-light dark:text-text-secondary-dark">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
