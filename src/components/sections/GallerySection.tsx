import { useState, useMemo } from "react";
import { X, ChevronLeft, ChevronRight, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";

// Import all photos
import photo2 from "@/assets/photo-2.jpg";
import photo3 from "@/assets/photo-3.jpg";
import photo4 from "@/assets/photo-4.jpg";
import photo5 from "@/assets/photo-5.jpg";
import photo6 from "@/assets/photo-6.jpg";
import photo7 from "@/assets/photo-7.jpg";
import photo8 from "@/assets/photo-8.jpg";
import photo9 from "@/assets/photo-9.jpg";
import photo10 from "@/assets/photo-10.jpg";
import photo11 from "@/assets/photo-11.jpg";
import photo12 from "@/assets/photo-12.jpg";
import photo13 from "@/assets/photo-13.jpg";

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  category: string;
}

const categories = ["Все", "Природа", "Город", "Путешествия"];

const images: GalleryImage[] = [
  // Природа (photos 2-5)
  { id: 1, src: photo2, alt: "Горы в Грузии", category: "Природа" },
  { id: 2, src: photo3, alt: "Горы в Сочи", category: "Природа" },
  { id: 3, src: photo4, alt: "Бурная река в Адыгее", category: "Природа" },
  { id: 4, src: photo5, alt: "Бурная река в Архызе", category: "Природа" },
  // Город (photos 6-9)
  { id: 5, src: photo6, alt: "Тбилиси", category: "Город" },
  { id: 6, src: photo7, alt: "Не смог вспомнить", category: "Город" },
  { id: 7, src: photo8, alt: "Магазин ковров, Стамбул", category: "Город" },
  { id: 8, src: photo9, alt: "Стамбул", category: "Город" },
  // Путешествия (photos 10-13)
  { id: 9, src: photo10, alt: "Это я в Архызе", category: "Путешествия" },
  { id: 10, src: photo11, alt: "И это я в Архызе", category: "Путешествия" },
  { id: 11, src: photo12, alt: "Моя жена Лиза в Архызе", category: "Путешествия" },
  { id: 12, src: photo13, alt: "Елизавета в горах, Красная поляна", category: "Путешествия" },
];

// Fisher-Yates shuffle
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const GallerySection = () => {
  const [activeCategory, setActiveCategory] = useState("Все");
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  // Shuffle images once on component mount
  const shuffledImages = useMemo(() => shuffleArray(images), []);

  const filteredImages =
    activeCategory === "Все"
      ? shuffledImages
      : shuffledImages.filter((img) => img.category === activeCategory);

  const currentIndex = selectedImage
    ? filteredImages.findIndex((img) => img.id === selectedImage.id)
    : -1;

  const goToPrevious = () => {
    if (currentIndex > 0) {
      setSelectedImage(filteredImages[currentIndex - 1]);
    }
  };

  const goToNext = () => {
    if (currentIndex < filteredImages.length - 1) {
      setSelectedImage(filteredImages[currentIndex + 1]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") goToPrevious();
    if (e.key === "ArrowRight") goToNext();
    if (e.key === "Escape") setSelectedImage(null);
  };

  return (
    <div className="pb-12" onKeyDown={handleKeyDown} tabIndex={0}>
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          <span className="gradient-text">Галерея</span>
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Коллекция фотографий моей жены и моментов вдохновения
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
        <Filter className="h-4 w-4 text-muted-foreground mr-2" />
        {categories.map((category) => (
          <Button
            key={category}
            variant={activeCategory === category ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveCategory(category)}
            className={`font-mono text-xs ${
              activeCategory === category ? "shadow-neon" : ""
            }`}
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredImages.map((image, index) => (
          <button
            key={image.id}
            onClick={() => setSelectedImage(image)}
            className="group relative aspect-square overflow-hidden rounded-xl bg-secondary animate-scale-in focus:outline-none focus:ring-2 focus:ring-primary"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-4 left-4 right-4">
                <p className="font-mono text-sm text-foreground">{image.alt}</p>
                <p className="text-xs text-primary">{image.category}</p>
              </div>
            </div>
            {/* Border glow on hover */}
            <div className="absolute inset-0 rounded-xl border-2 border-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-neon" />
          </button>
        ))}
      </div>

      {/* Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-sm animate-fade-in"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-5xl w-full mx-4 animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute -top-12 right-0 text-foreground hover:text-primary"
              onClick={() => setSelectedImage(null)}
            >
              <X className="h-6 w-6" />
            </Button>

            {/* Image */}
            <div className="relative rounded-2xl overflow-hidden border border-border shadow-2xl">
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="w-full h-auto max-h-[80vh] object-contain bg-card"
              />

              {/* Navigation */}
              <div className="absolute inset-y-0 left-0 flex items-center">
                <Button
                  variant="ghost"
                  size="icon"
                  className="ml-4 bg-background/50 hover:bg-background/80 disabled:opacity-30"
                  onClick={goToPrevious}
                  disabled={currentIndex === 0}
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center">
                <Button
                  variant="ghost"
                  size="icon"
                  className="mr-4 bg-background/50 hover:bg-background/80 disabled:opacity-30"
                  onClick={goToNext}
                  disabled={currentIndex === filteredImages.length - 1}
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>
              </div>

              {/* Info */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background/90 to-transparent">
                <p className="font-mono text-lg">{selectedImage.alt}</p>
                <p className="text-sm text-primary">{selectedImage.category}</p>
                <p className="text-xs text-muted-foreground mt-2">
                  {currentIndex + 1} / {filteredImages.length}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
