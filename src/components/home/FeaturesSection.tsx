import { Search, Calendar, Shield } from "lucide-react";

interface Feature {
  id: number;
  icon: React.ReactNode;
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
    <section className="py-16 sm:py-24 bg-surface-light dark:bg-surface-dark">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold mb-4">
            ¿Por qué elegir StayFinder?
          </h2>
          <p className="text-lg text-text-secondary-light dark:text-text-secondary-dark">
            Tu estadía soñada, simplificada. Hacemos fácil encontrar y reservar
            el lugar perfecto para quedarse, dondequiera que te lleven tus
            viajes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="text-center p-6 bg-background-light dark:bg-background-dark rounded-lg"
            >
              <div className="flex justify-center items-center h-16 w-16 rounded-full bg-primary/10 text-primary mx-auto mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
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
