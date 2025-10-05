import { X } from "lucide-react";
import type { Category, PropertyType } from "@/types/accommodation";

interface FilterPanelProps {
  selectedCategory?: Category;
  onCategoryChange: (category?: Category) => void;
  minPrice?: number;
  onMinPriceChange: (price?: number) => void;
  maxPrice?: number;
  onMaxPriceChange: (price?: number) => void;
  guests?: number;
  onGuestsChange: (guests?: number) => void;
  propertyType?: PropertyType;
  onPropertyTypeChange: (type?: PropertyType) => void;
  onClearFilters: () => void;
}

const categories: { value: Category; label: string }[] = [
  { value: "mountain", label: "Montaña" },
  { value: "beach", label: "Playa" },
  { value: "city", label: "Ciudad" },
  { value: "countryside", label: "Campo" },
  { value: "luxury", label: "Lujo" },
];

const propertyTypes: { value: PropertyType; label: string }[] = [
  { value: "apartment", label: "Apartamento" },
  { value: "house", label: "Casa" },
  { value: "cabin", label: "Cabaña" },
  { value: "villa", label: "Villa" },
  { value: "hotel", label: "Hotel" },
];

export default function FilterPanel({
  selectedCategory,
  onCategoryChange,
  minPrice,
  onMinPriceChange,
  maxPrice,
  onMaxPriceChange,
  guests,
  onGuestsChange,
  propertyType,
  onPropertyTypeChange,
  onClearFilters,
}: FilterPanelProps) {
  return (
    <div className="bg-surface-light dark:bg-surface-dark rounded-lg p-6 border border-border-light dark:border-border-dark">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold">Filtros</h3>
        <button
          onClick={onClearFilters}
          className="text-sm text-primary hover:text-primary/80 flex items-center gap-1"
        >
          <X size={16} />
          Limpiar
        </button>
      </div>

      {/* Categoría */}
      <div className="mb-6">
        <label className="block text-sm font-semibold mb-3">Categoría</label>
        <div className="space-y-2">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() =>
                onCategoryChange(
                  selectedCategory === cat.value ? undefined : cat.value
                )
              }
              className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                selectedCategory === cat.value
                  ? "bg-primary text-white"
                  : "bg-background-light dark:bg-background-dark hover:bg-primary/10"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tipo de propiedad */}
      <div className="mb-6">
        <label className="block text-sm font-semibold mb-3">
          Tipo de propiedad
        </label>
        <select
          value={propertyType || ""}
          onChange={(e) =>
            onPropertyTypeChange((e.target.value as PropertyType) || undefined)
          }
          className="w-full px-4 py-2 rounded-lg bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="">Todos</option>
          {propertyTypes.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
      </div>

      {/* Rango de precio */}
      <div className="mb-6">
        <label className="block text-sm font-semibold mb-3">
          Precio por noche
        </label>
        <div className="space-y-3">
          <div>
            <label className="block text-xs text-text-secondary-light dark:text-text-secondary-dark mb-1">
              Mínimo (COP)
            </label>
            <input
              type="number"
              value={minPrice || ""}
              onChange={(e) =>
                onMinPriceChange(
                  e.target.value ? Number(e.target.value) : undefined
                )
              }
              placeholder="0"
              className="w-full px-4 py-2 rounded-lg bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-xs text-text-secondary-light dark:text-text-secondary-dark mb-1">
              Máximo (COP)
            </label>
            <input
              type="number"
              value={maxPrice || ""}
              onChange={(e) =>
                onMaxPriceChange(
                  e.target.value ? Number(e.target.value) : undefined
                )
              }
              placeholder="1000000"
              className="w-full px-4 py-2 rounded-lg bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
      </div>

      {/* Huéspedes */}
      <div className="mb-6">
        <label className="block text-sm font-semibold mb-3">Huéspedes</label>
        <input
          type="number"
          min="1"
          value={guests || ""}
          onChange={(e) =>
            onGuestsChange(e.target.value ? Number(e.target.value) : undefined)
          }
          placeholder="Cualquiera"
          className="w-full px-4 py-2 rounded-lg bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
    </div>
  );
}
