import type { Accommodation } from "@/types/accommodation";

export const mockAccommodations: Accommodation[] = [
  {
    id: "1",
    title: "Cabaña Acogedora en las Montañas",
    description:
      "Una hermosa cabaña rústica con vistas impresionantes a las montañas. Perfecta para escapadas de fin de semana.",
    location: "Villa de Leyva, Boyacá",
    city: "Villa de Leyva",
    country: "Colombia",
    price_per_night: 180000,
    max_guests: 4,
    bedrooms: 2,
    bathrooms: 1,
    property_type: "cabin",
    category: "mountain",
    images: [
      "https://images.unsplash.com/photo-1542718610-a1d656d1884c?w=800&q=80",
      "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80",
    ],
    amenities: [
      "WiFi",
      "Chimenea",
      "Cocina equipada",
      "Estacionamiento",
      "Vista a la montaña",
    ],
    rating: 4.8,
    reviews_count: 42,
    is_available: true,
    created_at: "2024-01-15T10:00:00Z",
    unavailable_dates: ["2024-10-20", "2024-10-21", "2024-11-15"],
  },
  {
    id: "2",
    title: "Villa Frente al Mar Caribeño",
    description:
      "Lujosa villa con acceso directo a playa privada. Ideal para familias y grupos.",
    location: "Cartagena, Bolívar",
    city: "Cartagena",
    country: "Colombia",
    price_per_night: 450000,
    max_guests: 8,
    bedrooms: 4,
    bathrooms: 3,
    property_type: "villa",
    category: "beach",
    images: [
      "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&q=80",
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
    ],
    amenities: [
      "Piscina privada",
      "WiFi",
      "Aire acondicionado",
      "BBQ",
      "Playa privada",
      "Chef disponible",
    ],
    rating: 4.9,
    reviews_count: 87,
    is_available: true,
    created_at: "2024-01-10T14:30:00Z",
    unavailable_dates: ["2024-11-05", "2024-11-06", "2024-11-07"],
  },
  {
    id: "3",
    title: "Apartamento Moderno en el Centro",
    description:
      "Apartamento contemporáneo en el corazón de Bogotá. Cerca de restaurantes y vida nocturna.",
    location: "Chapinero, Bogotá",
    city: "Bogotá",
    country: "Colombia",
    price_per_night: 120000,
    max_guests: 2,
    bedrooms: 1,
    bathrooms: 1,
    property_type: "apartment",
    category: "city",
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
    ],
    amenities: [
      "WiFi",
      "Aire acondicionado",
      "Cocina",
      "TV",
      "Gimnasio del edificio",
    ],
    rating: 4.6,
    reviews_count: 56,
    is_available: true,
    created_at: "2024-02-01T09:15:00Z",
    unavailable_dates: ["2024-10-15", "2024-10-16", "2024-10-17"],
  },
  {
    id: "4",
    title: "Casa Campestre con Piscina",
    description:
      "Amplia casa en el campo con jardines extensos y piscina. Tranquilidad garantizada.",
    location: "La Mesa, Cundinamarca",
    city: "La Mesa",
    country: "Colombia",
    price_per_night: 250000,
    max_guests: 6,
    bedrooms: 3,
    bathrooms: 2,
    property_type: "house",
    category: "countryside",
    images: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    ],
    amenities: [
      "Piscina",
      "WiFi",
      "BBQ",
      "Jardín",
      "Estacionamiento",
      "Zona de juegos",
    ],
    rating: 4.7,
    reviews_count: 34,
    is_available: true,
    created_at: "2024-01-20T11:00:00Z",
    unavailable_dates: ["2025-10-05", "2025-10-06", "2025-10-07"],
  },
  {
    id: "5",
    title: "Penthouse de Lujo con Vista Panorámica",
    description:
      "Espectacular penthouse con terraza y jacuzzi. Vistas de 360 grados de la ciudad.",
    location: "Poblado, Medellín",
    city: "Medellín",
    country: "Colombia",
    price_per_night: 550000,
    max_guests: 4,
    bedrooms: 2,
    bathrooms: 2,
    property_type: "apartment",
    category: "luxury",
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
    ],
    amenities: [
      "Jacuzzi",
      "WiFi",
      "Aire acondicionado",
      "Cocina gourmet",
      "Terraza",
      "Servicio de limpieza",
    ],
    rating: 5.0,
    reviews_count: 93,
    is_available: true,
    created_at: "2024-01-05T16:45:00Z",
    unavailable_dates: ["2024-10-10", "2024-10-11", "2024-10-12"],
  },
  {
    id: "6",
    title: "Suite en Hotel Boutique",
    description:
      "Elegante suite en hotel boutique con servicio personalizado y desayuno incluido.",
    location: "Zona T, Bogotá",
    city: "Bogotá",
    country: "Colombia",
    price_per_night: 280000,
    max_guests: 2,
    bedrooms: 1,
    bathrooms: 1,
    property_type: "hotel",
    category: "luxury",
    images: [
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80",
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&q=80",
    ],
    amenities: [
      "Desayuno incluido",
      "WiFi",
      "Aire acondicionado",
      "Room service",
      "Spa",
      "Gimnasio",
    ],
    rating: 4.8,
    reviews_count: 67,
    is_available: true,
    created_at: "2024-02-10T08:30:00Z",
    unavailable_dates: [],
  },
  {
    id: "7",
    title: "Cabaña Rústica junto al Lago",
    description:
      "Encantadora cabaña de madera con muelle privado. Perfecta para la pesca y kayak.",
    location: "Guatapé, Antioquia",
    city: "Guatapé",
    country: "Colombia",
    price_per_night: 200000,
    max_guests: 5,
    bedrooms: 2,
    bathrooms: 1,
    property_type: "cabin",
    category: "countryside",
    images: [
      "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800&q=80",
      "https://images.unsplash.com/photo-1470770903676-69b98201ea1c?w=800&q=80",
    ],
    amenities: [
      "Muelle privado",
      "Kayaks",
      "WiFi",
      "Chimenea",
      "BBQ",
      "Fogata",
    ],
    rating: 4.9,
    reviews_count: 51,
    is_available: true,
    created_at: "2024-01-25T13:20:00Z",
    unavailable_dates: ["2024-10-25", "2024-10-26", "2024-10-27"],
  },
  {
    id: "8",
    title: "Apartamento Acogedor cerca de la Playa",
    description:
      "Cómodo apartamento a 5 minutos caminando de la playa. Vista al mar desde el balcón.",
    location: "Rodadero, Santa Marta",
    city: "Santa Marta",
    country: "Colombia",
    price_per_night: 150000,
    max_guests: 3,
    bedrooms: 1,
    bathrooms: 1,
    property_type: "apartment",
    category: "beach",
    images: [
      "https://images.unsplash.com/photo-1502672260066-6bc35f0a1ada?w=800&q=80",
      "https://images.unsplash.com/photo-1502672023488-70e25813eb80?w=800&q=80",
    ],
    amenities: [
      "WiFi",
      "Aire acondicionado",
      "Balcón",
      "Cocina",
      "Piscina del edificio",
    ],
    rating: 4.5,
    reviews_count: 38,
    is_available: true,
    created_at: "2024-02-05T10:00:00Z",
    unavailable_dates: [],
  },
];

// Función para simular búsqueda
export const searchAccommodations = (filters: {
  query?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  guests?: number;
  propertyType?: string;
}): Accommodation[] => {
  return mockAccommodations.filter((acc) => {
    // Búsqueda por texto
    if (filters.query) {
      const searchLower = filters.query.toLowerCase();
      const matchesSearch =
        acc.title.toLowerCase().includes(searchLower) ||
        (acc.description || "").toLowerCase().includes(searchLower) ||
        (acc.location || "").toLowerCase().includes(searchLower) ||
        (acc.city || "").toLowerCase().includes(searchLower);

      if (!matchesSearch) return false;
    }

    // Filtro por categoría
    if (filters.category && acc.category !== filters.category) {
      return false;
    }

    // Filtro por precio
    if (filters.minPrice && acc.price_per_night < filters.minPrice) {
      return false;
    }
    if (filters.maxPrice && acc.price_per_night > filters.maxPrice) {
      return false;
    }

    // Filtro por huéspedes
    if (filters.guests && acc.max_guests < filters.guests) {
      return false;
    }

    // Filtro por tipo de propiedad
    if (filters.propertyType && acc.property_type !== filters.propertyType) {
      return false;
    }

    return true;
  });
};
