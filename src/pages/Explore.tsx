import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import SearchBar from "../components/explore/SearchBar";
import FilterPanel from "../components/explore/FilterPanel";
import AccommodationCard from "../components/explore/AccommodationCard";
import { searchAccommodations } from "../data/mockAccommodations";
import { SlidersHorizontal } from "lucide-react";
import type {
  Accommodation,
  Category,
  PropertyType,
} from "../types/accommodation";

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
      : undefined
  );
  const [maxPrice, setMaxPrice] = useState<number | undefined>(
    searchParams.get("maxPrice")
      ? Number(searchParams.get("maxPrice"))
      : undefined
  );
  const [guests, setGuests] = useState<number | undefined>(
    searchParams.get("guests") ? Number(searchParams.get("guests")) : undefined
  );
  const [propertyType, setPropertyType] = useState<PropertyType | undefined>(
    (searchParams.get("propertyType") as PropertyType) || undefined
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
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow bg-background-light dark:bg-background-dark">
        <div className="container mx-auto px-6 lg:px-8 py-8">
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
            <aside className="hidden lg:block w-80 flex-shrink-0">
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
              <div className="lg:hidden mb-4">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-surface-light dark:bg-surface-dark rounded-lg border border-border-light dark:border-border-dark"
                >
                  <SlidersHorizontal size={20} />
                  <span>Filtros</span>
                </button>

                {showFilters && (
                  <div className="mt-4 p-4 bg-surface-light dark:bg-surface-dark rounded-lg">
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
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {accommodations.map((accommodation) => (
                    <AccommodationCard
                      key={accommodation.id}
                      accommodation={accommodation}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-xl text-text-secondary-light dark:text-text-secondary-dark">
                    No se encontraron alojamientos con los filtros seleccionados
                  </p>
                  <button
                    onClick={handleClearFilters}
                    className="mt-4 px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
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
