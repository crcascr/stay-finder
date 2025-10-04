interface CTASectionProps {
  onGetStarted?: () => void;
}

export default function CTASection({ onGetStarted }: CTASectionProps) {
  return (
    <section className="py-16 sm:py-24 bg-background-light dark:bg-background-dark">
      <div className="container mx-auto px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold mb-4">¿Listo para explorar?</h2>
        <p className="text-lg text-text-secondary-light dark:text-text-secondary-dark max-w-2xl mx-auto mb-8">
          Regístrate hoy y comienza a planificar tu próxima aventura.
        </p>
        <button
          onClick={onGetStarted}
          className="px-8 py-4 rounded-lg text-lg font-semibold bg-primary text-white hover:bg-primary/90 transition-colors"
        >
          Comenzar
        </button>
      </div>
    </section>
  );
}
