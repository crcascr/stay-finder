import { useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";

import { Bed, Calendar, Home, Menu, Users, X } from "lucide-react";

const nav = [
  { to: "/dashboard", label: "Resumen", icon: Home },
  { to: "/dashboard/accommodations", label: "Alojamientos", icon: Bed },
  { to: "/dashboard/users", label: "Usuarios", icon: Users },
  { to: "/dashboard/bookings", label: "Reservas", icon: Calendar },
];

export default function DashboardLayout() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const Sidebar = () => (
    <aside
      className={`bg-surface-light dark:bg-surface-dark border-border-light dark:border-border-dark fixed top-0 left-0 z-40 h-screen w-64 shrink-0 border-r transition-transform lg:relative lg:h-auto lg:translate-x-0 ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="border-border-light dark:border-border-dark flex items-center justify-between border-b p-4">
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
          <h2 className="text-text-primary-light dark:text-text-primary-dark text-xl font-bold">
            StayFinder
          </h2>
        </Link>
        <button
          onClick={() => setSidebarOpen(false)}
          className="text-text-secondary-light dark:text-text-secondary-dark lg:hidden"
        >
          <X size={24} />
        </button>
      </div>
      <nav className="space-y-2 p-4">
        {nav.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-3 py-2 font-medium transition-colors ${
                isActive
                  ? "bg-primary text-white"
                  : "text-text-secondary-light dark:text-text-secondary-dark hover:bg-primary/10 hover:text-text-primary-light dark:hover:text-text-primary-dark"
              }`
            }
          >
            <Icon size={20} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );

  return (
    <div className="bg-background-light dark:bg-background-dark flex min-h-screen">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <header className="bg-surface-light dark:bg-surface-dark flex h-16 items-center justify-between border-b px-6 lg:hidden lg:justify-end">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-text-primary-light dark:text-text-primary-dark lg:hidden"
          >
            <Menu size={24} />
          </button>
        </header>
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
