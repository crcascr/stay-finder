import { Search, Star } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { mockAccommodations } from "@/data/mockAccommodations";
import type { Accommodation } from "@/types/accommodation";

const heroImages = mockAccommodations.slice(0, 5).map((acc) => acc.images[0]);

export default function HeroSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [inputFocus, setInputFocus] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [instantResults, setInstantResults] = useState<Accommodation[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1,
      );
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (searchQuery.trim().length > 1) {
      const results = mockAccommodations
        .filter(
          (acc) =>
            acc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            acc.location.toLowerCase().includes(searchQuery.toLowerCase()),
        )
        .slice(0, 5);
      setInstantResults(results);
    } else {
      setInstantResults([]);
    }
  }, [searchQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/explore?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
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

          {inputFocus && instantResults.length > 0 && (
            <div className="bg-surface-light dark:bg-surface-dark absolute top-full mt-2 w-full overflow-hidden rounded-2xl text-left shadow-lg">
              <ul>
                {instantResults.map((acc) => (
                  <li key={acc.id}>
                    <Link
                      to={`/accommodation/${acc.id}`}
                      className="hover:bg-background-light dark:hover:bg-background-dark flex items-center p-3 transition-colors"
                    >
                      <img
                        src={acc.images[0]}
                        alt={acc.title}
                        className="h-16 w-20 rounded-lg object-cover"
                      />
                      <div className="ml-4 flex-grow">
                        <p className="text-text-primary-light dark:text-text-primary-dark font-semibold">
                          {acc.title}
                        </p>
                        <p className="text-text-secondary-light dark:text-text-secondary-dark text-sm">
                          {acc.location}
                        </p>
                      </div>
                      <div className="text-text-primary-light dark:text-text-primary-dark ml-4 flex items-center font-bold">
                        <Star
                          size={16}
                          className="mr-1 fill-current text-yellow-400"
                        />
                        {acc.rating.toFixed(1)}
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
