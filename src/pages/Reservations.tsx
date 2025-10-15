import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

import { BedDouble } from "lucide-react";

import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import Card from "@/components/reservations/Card";
import Loader from "@/components/ui/Loader";
import { getMyBookings, updateBookingStatus } from "@/lib/bookings";
import { useSession } from "@/stores/useSession";
import type { RawBooking } from "@/types/raw-supabase";

export default function Reservations() {
  const profile = useSession((s) => s.profile);
  const [list, setList] = useState<RawBooking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!profile) return;
    load();
  }, [profile]);

  const load = async () => {
    setLoading(true);
    const { data, error } = await getMyBookings();
    if (error) toast.error("Error al cargar reservas");
    else setList(data ?? []);
    setLoading(false);
  };

  const handleCancel = async (id: string) => {
    if (!profile) return;
    if (!confirm("¿Seguro que quieres cancelar esta reserva?")) return;
    const { error } = await updateBookingStatus(profile?.id, id, "cancelled");
    if (error) toast.error("No se pudo cancelar");
    else {
      toast.success("Reserva cancelada");
      load(); // refresca lista
    }
  };

  const active = list.filter((b) => b.status === "confirmed");
  const cancelled = list.filter((b) => b.status === "cancelled");

  if (loading)
    return (
      <>
        <Navbar />
        <Loader />
        <Footer />
      </>
    );

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="container mx-auto flex-grow px-6 py-8 lg:px-8">
        <h1 className="mb-6 text-3xl font-bold">Mis reservas</h1>

        {/* ACTIVAS */}
        <section className="mb-10">
          <h2 className="mb-4 text-xl font-semibold">Reservas activas</h2>
          {active.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-12 text-center">
              <BedDouble className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-4 text-lg font-medium text-gray-900">
                No tienes reservas activas
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                Parece que no tienes ninguna reserva próxima. ¡Empieza a
                explorar y encuentra tu próxima estancia!
              </p>
              <Link
                to="/explore"
                className="mt-6 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Explorar alojamientos
              </Link>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {active.map((b) => (
                <Card
                  key={b.id}
                  booking={b}
                  onCancel={() => handleCancel(b.id)}
                />
              ))}
            </div>
          )}
        </section>

        {/* CANCELADAS */}
        <section>
          <h2 className="mb-4 text-xl font-semibold">Reservas canceladas</h2>
          {cancelled.length === 0 ? (
            <p className="text-text-secondary">
              No tienes reservas canceladas.
            </p>
          ) : (
            <div className="grid gap-6 opacity-75 md:grid-cols-2 xl:grid-cols-3">
              {cancelled.map((b) => (
                <Card key={b.id} booking={b} />
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}
