import { Search } from "lucide-react";
import { useState } from "react";

interface HeroSectionProps {
  onSearch?: (query: string) => void;
}

export default function HeroSection({ onSearch }: HeroSectionProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch && searchQuery.trim()) {
      onSearch(searchQuery);
    }
  };

  return (
    <section
      className="relative h-[600px] flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.5) 100%), url("https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&q=80")`,
      }}
    >
      <div className="container mx-auto px-6 lg:px-8 text-center text-white">
        <h1 className="text-4xl md:text-6xl font-black leading-tight tracking-tighter text-shadow-hero mb-4">
          Encuentra tu escapada perfecta
        </h1>
        <p className="text-lg md:text-xl font-light max-w-2xl mx-auto text-shadow-hero mb-8">
          Descubre alojamientos únicos y experiencias alrededor del mundo.
        </p>

        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSearch}>
            <div className="flex items-center bg-surface-light dark:bg-surface-dark rounded-full shadow-lg p-2">
              <div className="pl-4 pr-2 text-text-secondary-light dark:text-text-secondary-dark">
                <Search size={24} />
              </div>
              <input
                className="flex-grow bg-transparent text-text-primary-light dark:text-text-primary-dark placeholder:text-text-secondary-light dark:placeholder:text-text-secondary-dark focus:outline-none px-2 text-lg"
                placeholder="¿A dónde vas?"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-full text-base font-semibold bg-primary text-white hover:bg-primary/90 transition-colors shrink-0"
              >
                Buscar
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
