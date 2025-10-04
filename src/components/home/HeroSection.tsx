import { Search, Star } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { mockAccommodations } from "../../data/mockAccommodations";
import type { Accommodation } from "../../types/accommodation";

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
        prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
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
            acc.location.toLowerCase().includes(searchQuery.toLowerCase())
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
      className="relative h-[600px] flex items-center justify-center bg-cover bg-center transition-all ease-in-out duration-1000"
      style={{ backgroundImage: `url("${heroImages[currentImageIndex]}")` }}
    >
      <div
        className="absolute inset-0 bg-black/40 transition-opacity duration-300 ease-in-out"
        style={{ opacity: inputFocus ? 0.8 : 0.3 }}
      ></div>

      <div className="relative z-10 container mx-auto px-6 lg:px-8 text-center text-white">
        <h1 className="text-4xl md:text-6xl font-black leading-tight tracking-tighter text-shadow-hero mb-4">
          Encuentra tu escapada perfecta
        </h1>
        <p className="text-lg md:text-xl font-light max-w-2xl mx-auto text-shadow-hero mb-8">
          Descubre alojamientos únicos y experiencias alrededor del mundo.
        </p>

        <div className="max-w-2xl mx-auto relative" onBlur={handleBlur}>
          <form onSubmit={handleSearch}>
            <div
              className={`flex transition-all ease-in-out duration-300 items-center bg-surface-light dark:bg-surface-dark rounded-full shadow-lg p-2 border-2 border-border-light dark:border-border-dark ${
                inputFocus ? "border-primary" : ""
              }`}
            >
              <div className="pl-4 pr-2 text-text-secondary-light dark:text-text-secondary-dark">
                <Search size={24} />
              </div>
              <input
                className="flex-grow bg-transparent text-text-primary-light dark:text-text-primary-dark placeholder:text-text-secondary-light dark:placeholder:text-text-secondary-dark focus:outline-none px-2 text-lg"
                placeholder="¿A dónde vas?"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setInputFocus(true)}
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-full text-base font-semibold bg-primary text-white hover:bg-primary/90 transition-colors shrink-0"
              >
                Buscar
              </button>
            </div>
          </form>

          {inputFocus && instantResults.length > 0 && (
            <div className="absolute top-full mt-2 w-full bg-surface-light dark:bg-surface-dark rounded-2xl shadow-lg overflow-hidden text-left">
              <ul>
                {instantResults.map((acc) => (
                  <li key={acc.id}>
                    <Link
                      to={`/accommodation/${acc.id}`}
                      className="flex items-center p-3 hover:bg-background-light dark:hover:bg-background-dark transition-colors"
                    >
                      <img
                        src={acc.images[0]}
                        alt={acc.title}
                        className="w-20 h-16 object-cover rounded-lg"
                      />
                      <div className="ml-4 flex-grow">
                        <p className="font-semibold text-text-primary-light dark:text-text-primary-dark">
                          {acc.title}
                        </p>
                        <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
                          {acc.location}
                        </p>
                      </div>
                      <div className="ml-4 flex items-center font-bold text-text-primary-light dark:text-text-primary-dark">
                        <Star
                          size={16}
                          className="mr-1 text-yellow-400 fill-current"
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
