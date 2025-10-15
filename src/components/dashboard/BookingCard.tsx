import { Calendar, Moon, User, Users } from "lucide-react";

import type { Booking } from "@/stores/useAdminBookings";

export default function BookingCard({
  booking,
  onCancel,
}: {
  booking: Booking;
  onCancel: () => void;
}) {
  const nights = Math.ceil(
    (new Date(booking.check_out).getTime() -
      new Date(booking.check_in).getTime()) /
      (1000 * 60 * 60 * 24),
  );

  return (
    <div className="bg-surface-light dark:bg-surface-dark border-border-light dark:border-border-dark flex flex-col rounded-lg border p-4 shadow-sm transition-shadow hover:shadow-md">
      <img
        src={booking.accommodation.images?.[0] || "/placeholder-house.jpg"}
        alt={booking.accommodation.title}
        className="mb-3 h-32 w-full rounded-md object-cover"
      />
      <div className="flex flex-1 flex-col">
        <h3 className="text-text-primary-light dark:text-text-primary-dark font-semibold">
          {booking.accommodation.title}
        </h3>
        <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm">
          {booking.accommodation.location}
        </p>

        {/* Quién reservó */}
        <div className="text-text-secondary-light dark:text-text-secondary-dark mt-2 flex items-center gap-2 text-sm">
          <User size={14} />
          <span className="font-medium">{booking.profile.full_name}</span>
        </div>

        {/* Fechas + noches + huéspedes */}
        <div className="text-text-secondary-light dark:text-text-secondary-dark mt-3 space-y-1.5 text-sm">
          <div className="flex items-center gap-2">
            <Calendar
              size={16}
              className="text-text-tertiary-light dark:text-text-tertiary-dark"
            />
            <span>
              {booking.check_in} → {booking.check_out}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Moon
              size={16}
              className="text-text-tertiary-light dark:text-text-tertiary-dark"
            />
            <span>
              {nights} noche{nights !== 1 ? "s" : ""}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Users
              size={16}
              className="text-text-tertiary-light dark:text-text-tertiary-dark"
            />
            <span>{booking.guests} huéspedes</span>
          </div>
        </div>
      </div>

      {/* Total + estado */}
      <div className="border-border-light dark:border-border-dark mt-4 flex items-center justify-between border-t pt-3">
        <span className="text-text-primary-light dark:text-text-primary-dark font-semibold">
          Total: ${booking.total_price.toLocaleString("es-CO")}
        </span>
        <span
          className={`rounded-full px-2 py-1 text-xs font-medium ${
            booking.status === "confirmed"
              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
              : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
          }`}
        >
          {booking.status === "confirmed" ? "Confirmada" : "Cancelada"}
        </span>
      </div>

      {/* Botón cancelar */}
      {booking.status === "confirmed" && (
        <button
          onClick={() => {
            if (confirm("¿Cancelar esta reserva?")) onCancel();
          }}
          className="mt-3 w-full rounded-lg border border-red-500/50 bg-transparent py-2 text-sm font-semibold text-red-500 transition-colors hover:bg-red-500/10 hover:text-red-600"
        >
          Cancelar
        </button>
      )}
    </div>
  );
}
