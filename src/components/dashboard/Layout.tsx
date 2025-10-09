import { NavLink, Outlet } from "react-router-dom";

import { Bed, Calendar, Home, Users } from "lucide-react";

const nav = [
  { to: "/dashboard", label: "Resumen", icon: Home },
  { to: "/dashboard/accommodations", label: "Alojamientos", icon: Bed },
  { to: "/dashboard/users", label: "Usuarios", icon: Users },
  { to: "/dashboard/bookings", label: "Reservas", icon: Calendar },
];

export default function DashboardLayout() {
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <aside className="w-64 shrink-0 border-r bg-white dark:bg-gray-800">
        <div className="p-4 text-lg font-bold">Panel de administración</div>
        <nav className="space-y-2 px-4">
          {nav.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2 transition-colors ${
                  isActive
                    ? "bg-indigo-600 text-white"
                    : "text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
                }`
              }
            >
              <Icon size={20} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Contenido dinámico */}
      <main className="flex-1 overflow-auto p-6">
        <Outlet />
      </main>
    </div>
  );
}
