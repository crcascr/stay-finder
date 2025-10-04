export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-surface-light dark:bg-surface-dark border-t border-border-light dark:border-border-dark">
      <div className="container mx-auto px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-2">
            <a
              className="text-sm text-text-secondary-light dark:text-text-secondary-dark hover:text-primary transition-colors cursor-pointer"
              href="#about"
            >
              Acerca de
            </a>
            <a
              className="text-sm text-text-secondary-light dark:text-text-secondary-dark hover:text-primary transition-colors cursor-pointer"
              href="#contact"
            >
              Contacto
            </a>
            <a
              className="text-sm text-text-secondary-light dark:text-text-secondary-dark hover:text-primary transition-colors cursor-pointer"
              href="#terms"
            >
              Términos de Servicio
            </a>
            <a
              className="text-sm text-text-secondary-light dark:text-text-secondary-dark hover:text-primary transition-colors cursor-pointer"
              href="#privacy"
            >
              Política de Privacidad
            </a>
          </div>
          <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
            © {currentYear} StayFinder. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
