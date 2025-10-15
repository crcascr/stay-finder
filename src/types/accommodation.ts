export type PropertyType = "apartment" | "house" | "cabin" | "villa" | "hotel";
export type Category = "mountain" | "beach" | "city" | "countryside" | "luxury";

export interface Accommodation {
  id: string;
  title: string;
  description: string | null;
  location: string | null;
  city: string | null;
  country: string | null;
  price_per_night: number;
  max_guests: number;
  bedrooms: number;
  bathrooms: number;
  property_type: PropertyType;
  category: Category;
  images: string[] | null;
  amenities: string[] | null;
  rating: number | null;
  reviews_count: number | null;
  is_available: boolean | null;
  created_by?: string | null;
  created_at: string | null;
  unavailable_dates: string[] | null;
}

export interface SearchFilters {
  query?: string;
  category?: Category;
  minPrice?: number;
  maxPrice?: number;
  guests?: number;
  propertyType?: PropertyType;
}
