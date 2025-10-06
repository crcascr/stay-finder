import { Link } from "react-router-dom";

export default function CTASection() {
  return (
    <section className="bg-background-light dark:bg-background-dark py-16 sm:py-24">
      <div className="container mx-auto px-6 text-center lg:px-8">
        <h2 className="mb-4 text-3xl font-bold">¿Listo para explorar?</h2>
        <p className="text-text-secondary-light dark:text-text-secondary-dark mx-auto mb-8 max-w-2xl text-lg">
          Regístrate hoy y comienza a planificar tu próxima aventura.
        </p>
        <Link
          to="/register"
          className="bg-primary hover:bg-primary/90 rounded-lg px-8 py-4 text-lg font-semibold text-white transition-colors"
        >
          Comenzar
        </Link>
      </div>
    </section>
  );
}
