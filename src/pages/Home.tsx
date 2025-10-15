import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import CTASection from "@/components/home/CTASection";
import FeaturedDestinations from "@/components/home/FeaturedDestinations";
import FeaturesSection from "@/components/home/FeaturesSection";
import HeroSection from "@/components/home/HeroSection";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import Loader from "@/components/ui/Loader";
import { useSession } from "@/stores/useSession";

export default function Home() {
  const checkSession = useSession((s) => s.checkSession);
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    checkSession().then((res) => {
      if (!res.ok && res.error) toast.error(res.error);
      setChecked(true);
    });
  }, [checkSession]);

  if (!checked) return <Loader />;
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <FeaturedDestinations />
        <FeaturesSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
