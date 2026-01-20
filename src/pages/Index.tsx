import { useState, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AboutSection } from "@/components/sections/AboutSection";
import { InterestsSection } from "@/components/sections/InterestsSection";
import { GallerySection } from "@/components/sections/GallerySection";
import { GamesSection } from "@/components/sections/GamesSection";
import { MatrixSection } from "@/components/sections/MatrixSection";

const sections = {
  about: AboutSection,
  interests: InterestsSection,
  gallery: GallerySection,
  games: GamesSection,
  matrix: MatrixSection,
};

const Index = () => {
  const [activeTab, setActiveTab] = useState("about");
  
  // Handle browser back/forward
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (hash && sections[hash as keyof typeof sections]) {
        setActiveTab(hash);
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    handleHashChange(); // Check initial hash

    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    window.location.hash = tab;
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const ActiveSection = sections[activeTab as keyof typeof sections] || AboutSection;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-hero">
      <Header activeTab={activeTab} onTabChange={handleTabChange} />
      
      <main className="flex-1 container mx-auto px-4 pt-[152px] md:pt-20 pb-8">
        <div className="animate-fade-in" key={activeTab}>
          <ActiveSection />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
