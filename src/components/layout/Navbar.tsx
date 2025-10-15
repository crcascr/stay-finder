import { Link } from "react-router-dom";

import UserMenu from "@/components/layout/UserMenu";
import { useSession } from "@/stores/useSession";

export default function Navbar() {
  const profile = useSession((s) => s.profile);
  const signOut = useSession((s) => s.signOut);

  return (
    <header className="bg-surface-light/80 dark:bg-surface-dark/80 border-border-light dark:border-border-dark sticky top-0 z-50 border-b backdrop-blur-sm">
      <nav className="container mx-auto flex items-center justify-between px-6 py-4 lg:px-8">
        <Link className="flex items-center gap-3" to="/">
          <svg
            className="text-primary h-8 w-8"
            fill="none"
            viewBox="0 0 48 48"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M42.4379 44C42.4379 44 36.0744 33.9038 41.1692 24C46.8624 12.9336 42.2078 4 42.2078 4L7.01134 4C7.01134 4 11.6577 12.932 5.96912 23.9969C0.876273 33.9029 7.27094 44 7.27094 44L42.4379 44Z"
              fill="currentColor"
            />
          </svg>
          <h2 className="hidden text-xl font-bold md:block">StayFinder</h2>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <Link
            to="/explore"
            className="hover:text-primary text-base font-medium transition-colors"
          >
            Explorar
          </Link>
          <a
            className="hover:text-primary text-base font-medium transition-colors"
            href="#support"
          >
            Soporte
          </a>
        </div>

        {/* Lado derecho */}
        <div className="flex items-center gap-2">
          {profile ? (
            <UserMenu profile={profile} onLogout={signOut} />
          ) : (
            <>
              <Link
                to="/register"
                className="bg-primary hover:bg-primary/90 rounded-lg px-4 py-2 text-sm font-semibold text-white transition-colors"
              >
                Registrarse
              </Link>
              <Link
                to="/login"
                className="bg-primary/10 text-primary hover:bg-primary/20 dark:bg-primary/20 dark:hover:bg-primary/30 rounded-lg px-4 py-2 text-sm font-semibold transition-colors"
              >
                Iniciar sesión
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
