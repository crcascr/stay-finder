import { Link } from "react-router-dom";

import { ArrowRight, CalendarDays, Moon, Users } from "lucide-react";

import type { RawBooking } from "@/types/raw-supabase";

export default function Card({
  booking,
  onCancel,
}: {
  booking: RawBooking;
  onCancel?: () => void;
}) {
  const { accommodation, check_in, check_out, guests, total_price, status } =
    booking;
  const nights = Math.ceil(
    (new Date(check_out).getTime() - new Date(check_in).getTime()) /
      (1000 * 60 * 60 * 24),
  );

  return (
    <div className="bg-surface-light dark:bg-surface-dark group flex flex-col rounded-lg shadow-md transition-shadow hover:shadow-xl">
      <div className="relative h-56 w-full overflow-hidden rounded-t-lg">
        <img
          src={accommodation.images?.[0] || ""}
          alt={accommodation.title}
          className="h-full w-full transform object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>

      <div className="flex flex-grow flex-col p-4">
        <Link
          to={`/accommodation/${accommodation.id}`}
          className="hover:text-primary mb-2 text-lg font-bold"
        >
          {accommodation.title}
        </Link>
        <p className="text-text-secondary text-sm">{accommodation.location}</p>

        <div className="mt-4 space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <CalendarDays size={16} className="text-text-secondary" />
            <span className="flex items-center gap-1">
              {check_in} <ArrowRight size={16} /> {check_out}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Moon size={16} className="text-text-secondary" />
            <span>{nights} noches</span>
          </div>
          <div className="flex items-center gap-2">
            <Users size={16} className="text-text-secondary" />
            <span>{guests} huéspedes</span>
          </div>
        </div>

        <div className="mt-auto pt-4">
          <p className="text-right">
            <span className="text-text-secondary text-sm">Total: </span>
            <span className="text-xl font-bold">
              ${total_price.toLocaleString("es-CO")}
            </span>
          </p>

          {status === "confirmed" && onCancel && (
            <button
              onClick={onCancel}
              className="mt-3 w-full cursor-pointer rounded-lg bg-red-500 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-600"
            >
              Cancelar reserva
            </button>
          )}
          {status === "cancelled" && (
            <div className="mt-3 rounded-lg bg-red-500/10 py-2 text-center">
              <span className="font-semibold text-red-500">Cancelada</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
