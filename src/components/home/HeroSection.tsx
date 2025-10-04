import { Search } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { mockAccommodations } from "../../data/mockAccommodations";

const heroImages = mockAccommodations.slice(0, 5).map((acc) => acc.images[0]);

export default function HeroSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [inputFocus, setInputFocus] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Cambia la imagen cada 5 segundos

    return () => clearInterval(timer); // Limpia el intervalo al desmontar el componente
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/explore?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <section
      className="relative h-[600px] flex items-center justify-center bg-cover bg-center transition-all ease-in-out duration-2000"
      style={{
        backgroundImage: `url("${heroImages[currentImageIndex]}")`,
      }}
    >
      {/* Capa de superposición para el efecto de atenuación */}
      <div
        className="absolute inset-0 bg-black/40 transition-opacity duration-500 ease-in-out"
        style={{ opacity: inputFocus ? 0.8 : 0.3 }}
      ></div>

      <div className="relative z-10 container mx-auto px-6 lg:px-8 text-center text-white">
        <h1 className="text-4xl md:text-6xl font-black leading-tight tracking-tighter text-shadow-hero mb-4">
          Encuentra tu escapada perfecta
        </h1>
        <p className="text-lg md:text-xl font-light max-w-2xl mx-auto text-shadow-hero mb-8">
          Descubre alojamientos únicos y experiencias alrededor del mundo.
        </p>

        <div className="max-w-2xl mx-auto">
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
                onBlur={() => setInputFocus(false)}
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
