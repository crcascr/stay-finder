import { useState } from "react";
import { Link } from "react-router-dom";

import type { Profile } from "@/stores/useSession";

type Props = { profile: Profile; onLogout: () => Promise<void> };

export default function UserMenu({ profile, onLogout }: Props) {
  const [open, setOpen] = useState(false);

  const initials = profile.full_name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="bg-primary hover:bg-primary/90 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full font-semibold text-white"
      >
        {initials}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-lg border bg-white shadow-lg dark:bg-gray-800">
          <div className="p-2">
            <Link
              to={profile.role === "admin" ? "/admin" : "/reservations"}
              className="block rounded px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => setOpen(false)}
            >
              {profile.role === "admin" ? "Dashboard" : "Mis reservas"}
            </Link>
            <button
              onClick={async () => {
                setOpen(false);
                await onLogout();
              }}
              className="block w-full cursor-pointer rounded px-3 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
