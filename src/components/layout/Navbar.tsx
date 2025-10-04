import { useNavigate } from "react-router-dom";

interface NavbarProps {
  onSignUp?: () => void;
  onLogin?: () => void;
}

export default function Navbar({ onSignUp, onLogin }: NavbarProps) {
  const navigate = useNavigate();
  return (
    <header className="sticky top-0 z-50 bg-surface-light/80 dark:bg-surface-dark/80 backdrop-blur-sm border-b border-border-light dark:border-border-dark">
      <nav className="container mx-auto px-6 lg:px-8 py-4 flex items-center justify-between">
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <svg
            className="h-8 w-8 text-primary"
            fill="none"
            viewBox="0 0 48 48"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M42.4379 44C42.4379 44 36.0744 33.9038 41.1692 24C46.8624 12.9336 42.2078 4 42.2078 4L7.01134 4C7.01134 4 11.6577 12.932 5.96912 23.9969C0.876273 33.9029 7.27094 44 7.27094 44L42.4379 44Z"
              fill="currentColor"
            ></path>
          </svg>
          <h2 className="text-xl font-bold">StayFinder</h2>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <a
            className="text-base font-medium hover:text-primary transition-colors cursor-pointer"
            onClick={() => navigate("/explore")}
          >
            Explorar
          </a>
          <a
            className="text-base font-medium hover:text-primary transition-colors cursor-pointer"
            href="#support"
          >
            Soporte
          </a>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onSignUp}
            className="px-4 py-2 rounded-lg text-sm font-semibold bg-primary text-white hover:bg-primary/90 transition-colors"
          >
            Registrarse
          </button>
          <button
            onClick={onLogin}
            className="px-4 py-2 rounded-lg text-sm font-semibold bg-primary/10 text-primary hover:bg-primary/20 dark:bg-primary/20 dark:hover:bg-primary/30 transition-colors"
          >
            Iniciar sesión
          </button>
        </div>
      </nav>
    </header>
  );
}
