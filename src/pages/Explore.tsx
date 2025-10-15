import { useEffect, useMemo } from "react";
import toast from "react-hot-toast";
import { useSearchParams } from "react-router-dom";

import AccommodationCard from "@/components/explore/AccommodationCard";
import FilterPanel from "@/components/explore/FilterPanel";
import SearchBar from "@/components/explore/SearchBar";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import Loader from "@/components/ui/Loader";
import { useAccommodations } from "@/stores/useAccommodations";
import type { Category, PropertyType } from "@/types/accommodation";

export default function Explore() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { list, loading, fetchList, error } = useAccommodations();

  /* ---------- filtros desde URL ---------- */
  const searchQuery = searchParams.get("q") ?? "";
  const selectedCategory = searchParams.get("category") as Category | undefined;
  const minPrice = Number(searchParams.get("minPrice") || 0);
  const maxPrice = Number(searchParams.get("maxPrice") || Infinity);
  const guests = Number(searchParams.get("guests") || 0);
  const propertyType = searchParams.get("propertyType") as
    | PropertyType
    | undefined;

  /* ---------- cargar datos 1ª vez ---------- */
  useEffect(() => {
    fetchList();
    if (error) toast.error("Ocurrió un error al cargar los alojamientos");
  }, [fetchList, error]);

  /* ---------- filtros en memoria ---------- */
  const filtered = useMemo(() => {
    return list
      .filter((acc) => {
        if (searchQuery) {
          const q = searchQuery.toLowerCase();
          return (
            acc.title.toLowerCase().includes(q) ||
            acc.location.toLowerCase().includes(q) ||
            acc.city.toLowerCase().includes(q)
          );
        }
        return true;
      })
      .filter((acc) => !selectedCategory || acc.category === selectedCategory)
      .filter((acc) => !propertyType || acc.property_type === propertyType)
      .filter((acc) => acc.price_per_night >= minPrice)
      .filter((acc) => acc.price_per_night <= maxPrice)
      .filter((acc) => !guests || acc.max_guests >= guests);
  }, [
    list,
    searchQuery,
    selectedCategory,
    propertyType,
    minPrice,
    maxPrice,
    guests,
  ]);

  /* ---------- handlers ---------- */
  const setFilter = (key: string, val: string | number | null | undefined) => {
    const p = new URLSearchParams(searchParams);
    if (val) p.set(key, String(val));
    else p.delete(key);
    setSearchParams(p);
  };
  const clearFilters = () => setSearchParams({});

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="bg-background-light dark:bg-background-dark flex-grow">
        <div className="container mx-auto px-6 py-8 lg:px-8">
          <div className="mb-6">
            <SearchBar
              value={searchQuery}
              onChange={(v) => setFilter("q", v || null)}
              placeholder="Buscar por ubicación, ciudad o nombre..."
            />
          </div>

          <div className="flex gap-8">
            {/* Filtros escritorio */}
            <aside className="hidden w-80 flex-shrink-0 lg:block">
              <div className="sticky top-24">
                <FilterPanel
                  selectedCategory={selectedCategory}
                  onCategoryChange={(c) => setFilter("category", c)}
                  minPrice={minPrice}
                  onMinPriceChange={(n) => setFilter("minPrice", n)}
                  maxPrice={maxPrice}
                  onMaxPriceChange={(n) => setFilter("maxPrice", n)}
                  guests={guests}
                  onGuestsChange={(n) => setFilter("guests", n)}
                  propertyType={propertyType}
                  onPropertyTypeChange={(t) => setFilter("propertyType", t)}
                  onClearFilters={clearFilters}
                />
              </div>
            </aside>

            {/* Resultados */}
            <div className="flex-grow">
              {/* contador y grid igual que antes */}
              <h2 className="mb-4 text-2xl font-bold">
                {filtered.length}{" "}
                {filtered.length === 1 ? "alojamiento" : "alojamientos"}{" "}
                encontrados
              </h2>

              {filtered.length ? (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {filtered.map((a) => (
                    <AccommodationCard key={a.id} accommodation={a} />
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center">
                  <p className="text-text-secondary-light dark:text-text-secondary-dark text-xl">
                    No se encontraron alojamientos
                  </p>
                  <button
                    onClick={clearFilters}
                    className="bg-primary mt-4 rounded-lg px-6 py-2 text-white"
                  >
                    Limpiar filtros
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
      {/* Overlay loader */}
      {loading && <Loader message="Cargando alojamientos" />}
    </div>
  );
}
