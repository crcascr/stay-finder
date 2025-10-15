import { type FocusEvent, type FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Search } from "lucide-react";

import { mockAccommodations } from "@/data/mockAccommodations";

const heroImages = mockAccommodations.slice(0, 5).map((acc) => {
  return acc.images?.[0] || "/placeholder-house.jpg";
});

export default function HeroSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [inputFocus, setInputFocus] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1,
      );
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/explore?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleBlur = (e: FocusEvent<HTMLDivElement>) => {
    if (
      e.currentTarget &&
      !e.currentTarget.contains(e.relatedTarget as Node | null)
    ) {
      setInputFocus(false);
    }
  };

  return (
    <section
      className="relative flex h-[600px] items-center justify-center bg-cover bg-center transition-all duration-1000 ease-in-out"
      style={{ backgroundImage: `url("${heroImages[currentImageIndex]}")` }}
    >
      <div
        className="absolute inset-0 bg-black/40 transition-opacity duration-300 ease-in-out"
        style={{ opacity: inputFocus ? 0.8 : 0.3 }}
      ></div>

      <div className="relative z-10 container mx-auto px-6 text-center text-white lg:px-8">
        <h1 className="text-shadow-hero mb-4 text-4xl leading-tight font-black tracking-tighter md:text-6xl">
          Encuentra tu escapada perfecta
        </h1>
        <p className="text-shadow-hero mx-auto mb-8 max-w-2xl text-lg font-light md:text-xl">
          Descubre alojamientos únicos y experiencias alrededor del mundo.
        </p>

        <div className="relative mx-auto max-w-2xl" onBlur={handleBlur}>
          <form onSubmit={handleSearch}>
            <div
              className={`bg-surface-light dark:bg-surface-dark border-border-light dark:border-border-dark flex items-center rounded-full border-2 p-2 shadow-lg transition-all duration-300 ease-in-out ${
                inputFocus ? "border-primary" : ""
              }`}
            >
              <div className="text-text-secondary-light dark:text-text-secondary-dark hidden pr-2 pl-4 md:block">
                <Search size={24} />
              </div>
              <input
                className="text-text-primary-light dark:text-text-primary-dark placeholder:text-text-secondary-light dark:placeholder:text-text-secondary-dark flex-grow bg-transparent px-2 text-lg focus:outline-none"
                placeholder="¿A dónde vas?"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setInputFocus(true)}
              />
              <button
                type="submit"
                className="bg-primary hover:bg-primary/90 shrink-0 rounded-full px-3 py-3 text-base font-semibold text-white transition-colors md:px-6"
              >
                <span className="hidden md:block">Buscar</span>
                <Search className="block md:hidden" size={20} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
