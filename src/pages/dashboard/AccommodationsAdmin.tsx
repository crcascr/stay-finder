import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

import { Edit, MapPinOff, Plus, Trash2 } from "lucide-react";

import SearchBar from "@/components/explore/SearchBar";
import Loader from "@/components/ui/Loader";
import { supabase } from "@/lib/supabase";
import { useAccommodations } from "@/stores/useAccommodations";

export default function AccommodationsAdmin() {
  const { list, fetchList } = useAccommodations();
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchList();
    setLoading(false);
  }, [fetchList]);

  const filtered = list.filter((a) =>
    a.title.toLowerCase().includes(q.toLowerCase()),
  );

  const handleDelete = async (id: string) => {
    if (!confirm("¿Marcar como no disponible? (soft-delete)")) return;
    const { error } = await supabase
      .from("accommodations")
      .update({ is_available: false })
      .eq("id", id);
    if (error) toast.error("Error al eliminar");
    else {
      toast.success("Alojamiento desactivado");
      fetchList();
    }
  };

  if (loading) return <Loader />;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Alojamientos</h1>
        <Link
          to="/dashboard/accommodations/new"
          className="bg-primary hover:bg-primary/90 flex items-center gap-2 rounded-lg px-4 py-2 text-white"
        >
          <Plus size={20} />
          Nuevo
        </Link>
      </div>

      <div className="mb-4">
        <SearchBar
          value={q}
          onChange={setQ}
          placeholder="Buscar por título..."
        />
      </div>

      {filtered.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((acc) => (
            <div
              key={acc.id}
              className="bg-surface-light dark:bg-surface-dark rounded-lg border p-4 shadow"
            >
              <img
                src={acc.images?.[0] || "/placeholder-house.jpg"}
                alt={acc.title}
                className="mb-3 h-40 w-full rounded object-cover"
              />
              <h3 className="font-semibold">{acc.title}</h3>
              <p className="text-text-secondary text-sm">{acc.location}</p>
              <div className="mt-4 flex items-center gap-2">
                <Link
                  to={`/dashboard/accommodations/edit/${acc.id}`}
                  className="flex flex-1 items-center justify-center gap-2 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  <Edit size={16} />
                  <span>Editar</span>
                </Link>
                <button
                  onClick={() => handleDelete(acc.id)}
                  className="flex flex-1 items-center justify-center gap-2 rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                >
                  <Trash2 size={16} />
                  <span>Desactivar</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4 py-12 text-center">
          <p className="text-text-secondary text-xl">
            No se encontraron alojamientos
          </p>
          <MapPinOff className="text-gray-500" size={100} />
        </div>
      )}
    </div>
  );
}
