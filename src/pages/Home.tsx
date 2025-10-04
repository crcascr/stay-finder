import CTASection from "../components/home/CTASection";
import FeaturedDestinations from "../components/home/FeaturedDestinations";
import FeaturesSection from "../components/home/FeaturesSection";
import HeroSection from "../components/home/HeroSection";
import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/Navbar";

export default function Home() {
  const handleSearch = (query: string) => {
    console.log("Buscando:", query);
    // Aquí luego implementarás la lógica de búsqueda
  };

  const handleSignUp = () => {
    console.log("Ir a registro");
    // Aquí navegarás a la página de registro
  };

  const handleLogin = () => {
    console.log("Ir a login");
    // Aquí navegarás a la página de login
  };
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar onSignUp={handleSignUp} onLogin={handleLogin} />
      <main className="flex-grow">
        <HeroSection onSearch={handleSearch} />
        <FeaturedDestinations />
        <FeaturesSection />
        <CTASection onGetStarted={handleSignUp} />
      </main>
      <Footer />
    </div>
  );
}
