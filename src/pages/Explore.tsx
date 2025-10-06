import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { SlidersHorizontal } from "lucide-react";
import type {
  Accommodation,
  Category,
  PropertyType,
} from "@/types/accommodation";
import { searchAccommodations } from "@/data/mockAccommodations";
import Navbar from "@/components/layout/Navbar";
import SearchBar from "@/components/explore/SearchBar";
import FilterPanel from "@/components/explore/FilterPanel";
import AccommodationCard from "@/components/explore/AccommodationCard";
import Footer from "@/components/layout/Footer";

export default function Explore() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [accommodations, setAccommodations] = useState<Accommodation[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  // Estados de filtros
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const [selectedCategory, setSelectedCategory] = useState<
    Category | undefined
  >((searchParams.get("category") as Category) || undefined);
  const [minPrice, setMinPrice] = useState<number | undefined>(
    searchParams.get("minPrice")
      ? Number(searchParams.get("minPrice"))
      : undefined,
  );
  const [maxPrice, setMaxPrice] = useState<number | undefined>(
    searchParams.get("maxPrice")
      ? Number(searchParams.get("maxPrice"))
      : undefined,
  );
  const [guests, setGuests] = useState<number | undefined>(
    searchParams.get("guests") ? Number(searchParams.get("guests")) : undefined,
  );
  const [propertyType, setPropertyType] = useState<PropertyType | undefined>(
    (searchParams.get("propertyType") as PropertyType) || undefined,
  );

  // Buscar acomodaciones cuando cambien los filtros
  useEffect(() => {
    const results = searchAccommodations({
      query: searchQuery,
      category: selectedCategory,
      minPrice,
      maxPrice,
      guests,
      propertyType,
    });
    setAccommodations(results);

    // Actualizar URL con los parámetros de búsqueda
    const params: Record<string, string> = {};
    if (searchQuery) params.q = searchQuery;
    if (selectedCategory) params.category = selectedCategory;
    if (minPrice) params.minPrice = minPrice.toString();
    if (maxPrice) params.maxPrice = maxPrice.toString();
    if (guests) params.guests = guests.toString();
    if (propertyType) params.propertyType = propertyType;

    setSearchParams(params);
  }, [searchQuery, selectedCategory, minPrice, maxPrice, guests, propertyType]);

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedCategory(undefined);
    setMinPrice(undefined);
    setMaxPrice(undefined);
    setGuests(undefined);
    setPropertyType(undefined);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="bg-background-light dark:bg-background-dark flex-grow">
        <div className="container mx-auto px-6 py-8 lg:px-8">
          {/* Barra de búsqueda principal */}
          <div className="mb-6">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Buscar por ubicación, ciudad o nombre..."
            />
          </div>

          <div className="flex gap-8">
            {/* Panel de filtros - Desktop */}
            <aside className="hidden w-80 flex-shrink-0 lg:block">
              <div className="sticky top-24">
                <FilterPanel
                  selectedCategory={selectedCategory}
                  onCategoryChange={setSelectedCategory}
                  minPrice={minPrice}
                  onMinPriceChange={setMinPrice}
                  maxPrice={maxPrice}
                  onMaxPriceChange={setMaxPrice}
                  guests={guests}
                  onGuestsChange={setGuests}
                  propertyType={propertyType}
                  onPropertyTypeChange={setPropertyType}
                  onClearFilters={handleClearFilters}
                />
              </div>
            </aside>

            {/* Resultados */}
            <div className="flex-grow">
              {/* Botón de filtros móvil */}
              <div className="mb-4 lg:hidden">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="bg-surface-light dark:bg-surface-dark border-border-light dark:border-border-dark flex w-full items-center justify-center gap-2 rounded-lg border px-4 py-3"
                >
                  <SlidersHorizontal size={20} />
                  <span>Filtros</span>
                </button>

                {showFilters && (
                  <div className="bg-surface-light dark:bg-surface-dark mt-4 rounded-lg p-4">
                    <FilterPanel
                      selectedCategory={selectedCategory}
                      onCategoryChange={setSelectedCategory}
                      minPrice={minPrice}
                      onMinPriceChange={setMinPrice}
                      maxPrice={maxPrice}
                      onMaxPriceChange={setMaxPrice}
                      guests={guests}
                      onGuestsChange={setGuests}
                      propertyType={propertyType}
                      onPropertyTypeChange={setPropertyType}
                      onClearFilters={handleClearFilters}
                    />
                  </div>
                )}
              </div>

              {/* Contador de resultados */}
              <div className="mb-4">
                <h2 className="text-2xl font-bold">
                  {accommodations.length}{" "}
                  {accommodations.length === 1 ? "alojamiento" : "alojamientos"}{" "}
                  encontrados
                </h2>
              </div>

              {/* Grid de resultados */}
              {accommodations.length > 0 ? (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {accommodations.map((accommodation) => (
                    <AccommodationCard
                      key={accommodation.id}
                      accommodation={accommodation}
                    />
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center">
                  <p className="text-text-secondary-light dark:text-text-secondary-dark text-xl">
                    No se encontraron alojamientos con los filtros seleccionados
                  </p>
                  <button
                    onClick={handleClearFilters}
                    className="bg-primary hover:bg-primary/90 mt-4 rounded-lg px-6 py-2 text-white transition-colors"
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
    </div>
  );
}
