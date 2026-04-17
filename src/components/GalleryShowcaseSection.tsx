import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ImageOff, Eye } from "lucide-react";
import { galleryApi, GalleryImage } from "@/services/galleryApi";

const FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1605433246452-82d9dc1a7a1d?w=500&h=500&fit=crop",
  "https://images.unsplash.com/photo-1599707367072-cd6c66daa891?w=500&h=500&fit=crop",
  "https://images.unsplash.com/photo-1618423696806-9a83c56a0e36?w=500&h=500&fit=crop",
  "https://images.unsplash.com/photo-1604881988758-f2ad6a3729ea?w=500&h=500&fit=crop",
];

const MAX_DISPLAY = 4;

const GalleryShowcaseSection = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchGallery = async () => {
      try {
        setIsLoading(true);
        const data = await galleryApi.getAll();
        const sortedData = [...data].sort((a, b) => a.displayOrder - b.displayOrder);
        setImages(sortedData.length > 0 ? sortedData.slice(0, MAX_DISPLAY) : FALLBACK_IMAGES.map((url, i) => ({ id: i + 1, imageUrl: url, displayOrder: i + 1, isActive: true })) as GalleryImage[]);
      } catch {
        setImages([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchGallery();
  }, []);

  if (isLoading) {
    return (
      <section className="py-16 lg:py-24 bg-gradient-to-b from-background to-secondary/20">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10"
          >
            <p className="text-xs font-body tracking-[0.3em] text-primary uppercase mb-1 font-bold">Gallery</p>
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-gradient-gold">Sacred Moments</h2>
          </motion.div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="aspect-square rounded-2xl bg-muted animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (images.length === 0) {
    return null;
  }

  const heroImage = images[selectedIndex];
  const displayImages = images.slice(0, MAX_DISPLAY);
  const rightImages = displayImages.filter((_, i) => i !== selectedIndex).slice(0, 3);

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10"
        >
<p className="text-xs font-body tracking-[0.3em] text-primary uppercase mb-1 font-bold">Gallery</p>
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-gradient-gold">Sacred Moments</h2>
        </motion.div>

        <div className="hidden lg:grid lg:grid-cols-5 gap-3">
          <div className="lg:col-span-2">
            <HeroImage 
              image={heroImage} 
              onSelect={(idx) => setSelectedIndex(idx)}
              allImages={displayImages}
            />
          </div>

          <div className="lg:col-span-3 flex flex-col gap-2.5">
            {rightImages.map((image, index) => (
              <GalleryCard 
                key={image.id} 
                image={image} 
                index={index}
                isActive={displayImages.indexOf(image) === selectedIndex}
                onClick={() => setSelectedIndex(displayImages.indexOf(image))}
              />
            ))}
          </div>
        </div>

        <div className="lg:hidden space-y-6">
          <HeroImage 
            image={heroImage} 
            onSelect={(idx) => setSelectedIndex(idx)}
            allImages={displayImages}
          />
          
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4">
            {displayImages.map((image, index) => (
              <GalleryCard 
                key={image.id} 
                image={image} 
                index={index}
                isActive={index === selectedIndex}
                onClick={() => setSelectedIndex(index)}
                compact
              />
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <Link
            to="/gallery"
            className="inline-flex items-center gap-2 text-sm font-body font-medium text-primary hover:text-primary/70 transition-colors group"
          >
            <span>View All Pictures</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

interface HeroImageProps {
  image: GalleryImage;
  onSelect: (index: number) => void;
  allImages: GalleryImage[];
}

const HeroImage = ({ image, onSelect, allImages }: HeroImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="relative bg-card border border-border/60 rounded-xl overflow-hidden shadow-lg"
    >
        <div className="relative">
          <div className="aspect-square overflow-hidden max-h-[400px]">
          {hasError ? (
            <div className="w-full h-full bg-gradient-to-br from-secondary to-muted flex items-center justify-center">
              <ImageOff className="w-10 h-10 text-muted-foreground" />
            </div>
          ) : (
            <>
              {!isLoaded && (
                <div className="absolute inset-0 bg-gradient-to-br from-secondary via-muted to-secondary animate-pulse" />
              )}
              <img
                src={image.imageUrl}
                alt="Gallery"
                className={`w-full h-full object-cover transition-opacity duration-500 ${
                  isLoaded ? "opacity-100" : "opacity-0"
                }`}
                onLoad={() => setIsLoaded(true)}
                onError={() => setHasError(true)}
              />
            </>
          )}
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

        <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-all duration-300">
          <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center shadow-xl backdrop-blur-sm">
            <Eye size={20} className="text-foreground" />
          </div>
        </div>
      </div>

      {allImages.length > 1 && (
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-1.5">
          {allImages.map((_, idx) => (
            <button
              key={idx}
              onClick={(e) => {
                e.preventDefault();
                onSelect(idx);
              }}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                idx === allImages.indexOf(image) ? "bg-primary w-5" : "bg-white/50 hover:bg-white/80"
              }`}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
};

interface GalleryCardProps {
  image: GalleryImage;
  index: number;
  isActive: boolean;
  onClick: () => void;
  compact?: boolean;
}

const GalleryCard = ({ image, index, isActive, onClick, compact }: GalleryCardProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  if (compact) {
    return (
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: index * 0.08 }}
        onClick={onClick}
        className={`min-w-[120px] w-[120px] flex-shrink-0 bg-card border rounded-lg overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-all duration-300 ${
          isActive ? "border-primary ring-2 ring-primary/30" : "border-border/60"
        }`}
      >
        <div className="aspect-square overflow-hidden">
          {hasError ? (
            <div className="w-full h-full bg-gradient-to-br from-secondary to-muted flex items-center justify-center">
              <ImageOff className="w-5 h-5 text-muted-foreground" />
            </div>
          ) : (
            <>
              {!isLoaded && (
                <div className="absolute inset-0 bg-gradient-to-br from-secondary via-muted to-secondary animate-pulse" />
              )}
              <img
                src={image.imageUrl}
                alt="Gallery"
                className={`w-full h-full object-cover transition-opacity duration-500 ${
                  isLoaded ? "opacity-100" : "opacity-0"
                }`}
                loading="lazy"
                onLoad={() => setIsLoaded(true)}
                onError={() => setHasError(true)}
              />
            </>
          )}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      onClick={onClick}
      className={`group relative bg-card border rounded-xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.02] ${
        isActive ? "border-primary ring-2 ring-primary/30" : "border-border/60"
      }`}
    >
        <div className="flex gap-3 p-2">
          <div className="w-24 h-24 lg:w-28 lg:h-28 flex-shrink-0 rounded-md overflow-hidden">
          {hasError ? (
            <div className="w-full h-full bg-gradient-to-br from-secondary to-muted flex items-center justify-center">
              <ImageOff className="w-5 h-5 text-muted-foreground" />
            </div>
          ) : (
            <>
              {!isLoaded && (
                <div className="absolute inset-0 bg-gradient-to-br from-secondary via-muted to-secondary animate-pulse" />
              )}
              <img
                src={image.imageUrl}
                alt="Gallery"
                className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 ${
                  isLoaded ? "opacity-100" : "opacity-0"
                }`}
                loading="lazy"
                onLoad={() => setIsLoaded(true)}
                onError={() => setHasError(true)}
              />
            </>
          )}
        </div>
        
        <div className="flex-1 min-w-0 py-2">
          <p className="text-[9px] font-body font-medium tracking-[0.12em] text-primary uppercase">
            Image
          </p>
          <h4 className="text-xs font-heading text-foreground truncate">
            Gallery Picture
          </h4>
        </div>

        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/30 rounded-xl">
          <div className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
            <Eye size={14} className="text-foreground" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default GalleryShowcaseSection;