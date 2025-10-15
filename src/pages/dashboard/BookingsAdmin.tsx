import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import BookingCard from "@/components/dashboard/BookingCard";
import Loader from "@/components/ui/Loader";
import { useAdminBookings } from "@/stores/useAdminBookings";

export default function BookingsAdmin() {
  const { list, fetchAll, cancelBooking } = useAdminBookings();
  const [tab, setTab] = useState<"all" | "confirmed" | "cancelled">("all");

  useEffect(() => {
    fetchAll().then((res) => {
      if (!res.ok) toast.error(res.error || "Error al cargar reservas");
    });
  }, [fetchAll]);

  const filtered = list
    ? tab === "all"
      ? list
      : list.filter((b) => b.status === tab)
    : [];

  if (!list) return <Loader />;

  return (
    <div className="bg-surface-light dark:bg-surface-dark mx-auto w-full max-w-7xl space-y-8 rounded-2xl p-8 shadow-lg">
      <div className="flex items-center justify-between">
        <h1 className="text-text-primary-light dark:text-text-primary-dark text-3xl font-bold">
          Reservas
        </h1>
      </div>

      {/* Tabs */}
      <div className="border-border-light dark:border-border-dark flex gap-2 border-b">
        {(["all", "confirmed", "cancelled"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`cursor-pointer px-4 py-2 text-sm font-medium transition-colors ${
              tab === t
                ? "border-primary text-primary border-b-2"
                : "text-text-secondary-light dark:text-text-secondary-dark hover:text-text-primary-light dark:hover:text-text-primary-dark"
            }`}
          >
            {t === "all"
              ? "Todas"
              : t === "confirmed"
                ? "Confirmadas"
                : "Canceladas"}
          </button>
        ))}
      </div>

      {/* Lista */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((b) => (
          <BookingCard
            key={b.id}
            booking={b}
            onCancel={() => cancelBooking(b.id)}
          />
        ))}
      </div>
    </div>
  );
}
