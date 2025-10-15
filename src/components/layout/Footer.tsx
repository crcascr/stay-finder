export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-surface-light dark:bg-surface-dark border-border-light dark:border-border-dark border-t">
      <div className="container mx-auto px-6 py-8 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 md:justify-start">
            <a
              className="text-text-secondary-light dark:text-text-secondary-dark hover:text-primary cursor-pointer text-sm transition-colors"
              href="#about"
            >
              Acerca de
            </a>
            <a
              className="text-text-secondary-light dark:text-text-secondary-dark hover:text-primary cursor-pointer text-sm transition-colors"
              href="#contact"
            >
              Contacto
            </a>
            <a
              className="text-text-secondary-light dark:text-text-secondary-dark hover:text-primary cursor-pointer text-sm transition-colors"
              href="#terms"
            >
              Términos de Servicio
            </a>
            <a
              className="text-text-secondary-light dark:text-text-secondary-dark hover:text-primary cursor-pointer text-sm transition-colors"
              href="#privacy"
            >
              Política de Privacidad
            </a>
          </div>
          <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm">
            © {currentYear} StayFinder. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
