export type PropertyType = "apartment" | "house" | "cabin" | "villa" | "hotel";
export type Category = "mountain" | "beach" | "city" | "countryside" | "luxury";

export interface Accommodation {
  id: string;
  title: string;
  description: string;
  location: string;
  city: string;
  country: string;
  price_per_night: number;
  max_guests: number;
  bedrooms: number;
  bathrooms: number;
  property_type: PropertyType;
  category: Category;
  images: string[];
  amenities: string[];
  rating: number;
  reviews_count: number;
  is_available: boolean;
  created_by?: string;
  created_at: string;
}

export interface SearchFilters {
  query?: string;
  category?: Category;
  minPrice?: number;
  maxPrice?: number;
  guests?: number;
  propertyType?: PropertyType;
}
