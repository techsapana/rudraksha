import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft, ImageOff, Eye } from "lucide-react";
import { galleryApi, GalleryImage } from "@/services/galleryApi";

const MAX_VISIBLE = 5;

const DEMO_IMAGES: GalleryImage[] = [
  { id: 1, imageUrl: "https://images.unsplash.com/photo-1605433246452-82d9dc1a7a1d?w=400&h=300&fit=crop", displayOrder: 1, isActive: true },
  { id: 2, imageUrl: "https://images.unsplash.com/photo-1599707367072-cd6c66daa891?w=400&h=300&fit=crop", displayOrder: 2, isActive: true },
  { id: 3, imageUrl: "https://images.unsplash.com/photo-1618423696806-9a83c56a0e36?w=400&h=300&fit=crop", displayOrder: 3, isActive: true },
  { id: 4, imageUrl: "https://images.unsplash.com/photo-1604881988758-f2ad6a3729ea?w=400&h=300&fit=crop", displayOrder: 4, isActive: true },
  { id: 5, imageUrl: "https://images.unsplash.com/photo-1625556702017-0753a1573403?w=400&h=300&fit=crop", displayOrder: 5, isActive: true },
];

const HomeGallerySection = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        setIsLoading(true);
        const data = await galleryApi.getAll();
        const sortedData = [...data].sort((a, b) => a.displayOrder - b.displayOrder);
        setImages(sortedData.length > 0 ? sortedData : DEMO_IMAGES);
      } catch (err) {
        setImages(DEMO_IMAGES);
        setIsLoading(false);
        return;
      } finally {
        setIsLoading(false);
      }
    };
    fetchGallery();
  }, []);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const scrollAmount = scrollRef.current.clientWidth * 0.7;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section className="py-16 lg:py-20 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <p className="text-xs font-body tracking-[0.3em] text-primary uppercase mb-1">Gallery</p>
            <h2 className="text-2xl sm:text-3xl font-heading text-gradient-gold">Moments We Captured</h2>
          </div>
          <div className="flex items-center gap-3">
            {!isLoading && images.length > 0 && (
              <Link
                to="/gallery"
                className="hidden sm:flex items-center gap-2 text-sm font-body font-medium text-primary hover:text-primary/70 transition-colors"
              >
                <span>View All</span>
                <ArrowRight size={16} />
              </Link>
            )}
          </div>
        </motion.div>

        {isLoading ? (
          <LoadingSkeleton />
        ) : images.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="relative">
            {canScrollLeft && (
              <button
                onClick={() => scroll("left")}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/90 shadow-xl flex items-center justify-center hover:bg-white transition-colors"
              >
                <ArrowLeft size={18} className="text-foreground" />
              </button>
            )}

            <div
              ref={scrollRef}
              onScroll={handleScroll}
              className="flex gap-4 overflow-x-auto scrollbar-hide pb-2"
              style={{ scrollBehavior: "smooth" }}
            >
              {images.slice(0, MAX_VISIBLE).map((image, index) => (
                <GalleryCard key={image.id} image={image} index={index} priority={index < 3} />
              ))}
            </div>

            {canScrollRight && (
              <button
                onClick={() => scroll("right")}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/90 shadow-xl flex items-center justify-center hover:bg-white transition-colors"
              >
                <ArrowRight size={18} className="text-foreground" />
              </button>
            )}
          </div>
        )}

        {images.length > 0 && (
          <div className="flex justify-center mt-6 sm:hidden">
            <Link
              to="/gallery"
              className="inline-flex items-center gap-2 text-sm font-body font-medium text-primary"
            >
              <span>View All</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

const GalleryCard = ({ image, index, priority }: { image: GalleryImage; index: number; priority?: boolean }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const widthClass = index % 3 === 0 ? "min-w-[280px] lg:min-w-[320px]" : "min-w-[220px] lg:min-w-[260px]";

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className={`${widthClass} group relative flex-shrink-0 rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500`}
    >
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-gradient-to-br from-secondary via-muted to-secondary animate-pulse" />
      )}

      {hasError ? (
        <div className="aspect-[4/3] bg-gradient-to-br from-secondary to-muted flex items-center justify-center">
          <ImageOff className="w-8 h-8 text-muted-foreground" />
        </div>
      ) : (
        <img
          src={image.imageUrl}
          alt={`Gallery ${index + 1}`}
          className={`w-full h-[200px] lg:h-[240px] object-cover transition-transform duration-700 group-hover:scale-105 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
          loading={priority ? "eager" : "lazy"}
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
        <div className="w-12 h-12 rounded-full bg-white/95 flex items-center justify-center shadow-xl backdrop-blur-sm transform scale-90 group-hover:scale-100 transition-transform">
          <Eye size={20} className="text-foreground" />
        </div>
      </div>
    </motion.div>
  );
};

const LoadingSkeleton = () => (
  <div className="flex gap-4 overflow-hidden">
    {[...Array(4)].map((_, i) => (
      <div
        key={i}
        className={`${i % 3 === 0 ? "min-w-[280px] lg:min-w-[320px]" : "min-w-[220px] lg:min-w-[260px]"} h-[200px] lg:h-[240px] rounded-2xl bg-gradient-to-br from-secondary via-muted to-secondary animate-pulse flex-shrink-0`}
      />
    ))}
  </div>
);

const EmptyState = () => (
  <div className="flex flex-col items-center justify-center py-16">
    <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-4">
      <ImageOff className="w-8 h-8 text-muted-foreground" />
    </div>
    <p className="text-muted-foreground font-body">No gallery images available</p>
  </div>
);

export default HomeGallerySection;