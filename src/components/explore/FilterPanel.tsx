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
    <div className="bg-surface-light dark:bg-surface-dark border-border-light dark:border-border-dark rounded-lg border p-6">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-xl font-bold">Filtros</h3>
        <button
          onClick={onClearFilters}
          className="text-primary hover:text-primary/80 flex items-center gap-1 text-sm"
        >
          <X size={16} />
          Limpiar
        </button>
      </div>

      {/* Categoría */}
      <div className="mb-6">
        <label className="mb-3 block text-sm font-semibold">Categoría</label>
        <div className="space-y-2">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() =>
                onCategoryChange(
                  selectedCategory === cat.value ? undefined : cat.value,
                )
              }
              className={`w-full rounded-lg px-4 py-2 text-left transition-colors ${
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
        <label className="mb-3 block text-sm font-semibold">
          Tipo de propiedad
        </label>
        <select
          value={propertyType || ""}
          onChange={(e) =>
            onPropertyTypeChange((e.target.value as PropertyType) || undefined)
          }
          className="bg-background-light dark:bg-background-dark border-border-light dark:border-border-dark focus:ring-primary w-full rounded-lg border px-4 py-2 focus:ring-2 focus:outline-none"
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
        <label className="mb-3 block text-sm font-semibold">
          Precio por noche
        </label>
        <div className="space-y-3">
          <div>
            <label className="text-text-secondary-light dark:text-text-secondary-dark mb-1 block text-xs">
              Mínimo (COP)
            </label>
            <input
              type="number"
              value={minPrice || ""}
              onChange={(e) =>
                onMinPriceChange(
                  e.target.value ? Number(e.target.value) : undefined,
                )
              }
              placeholder="0"
              className="bg-background-light dark:bg-background-dark border-border-light dark:border-border-dark focus:ring-primary w-full rounded-lg border px-4 py-2 focus:ring-2 focus:outline-none"
            />
          </div>
          <div>
            <label className="text-text-secondary-light dark:text-text-secondary-dark mb-1 block text-xs">
              Máximo (COP)
            </label>
            <input
              type="number"
              value={maxPrice || ""}
              onChange={(e) =>
                onMaxPriceChange(
                  e.target.value ? Number(e.target.value) : undefined,
                )
              }
              placeholder="1000000"
              className="bg-background-light dark:bg-background-dark border-border-light dark:border-border-dark focus:ring-primary w-full rounded-lg border px-4 py-2 focus:ring-2 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Huéspedes */}
      <div className="mb-6">
        <label className="mb-3 block text-sm font-semibold">Huéspedes</label>
        <input
          type="number"
          min="1"
          value={guests || ""}
          onChange={(e) =>
            onGuestsChange(e.target.value ? Number(e.target.value) : undefined)
          }
          placeholder="Cualquiera"
          className="bg-background-light dark:bg-background-dark border-border-light dark:border-border-dark focus:ring-primary w-full rounded-lg border px-4 py-2 focus:ring-2 focus:outline-none"
        />
      </div>
    </div>
  );
}
