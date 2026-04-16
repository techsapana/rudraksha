import { useState, useEffect, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ShoppingBag, Eye, Sparkles } from "lucide-react";
import type { ProductResponse } from "@/lib/types";

const API_URL = "http://localhost:8090/api/products";

const DEFAULT_IMAGES = [
  "https://images.unsplash.com/photo-1600618528240-fb9fc964b853?w=400&q=80",
];

const FeaturedSpotlightSection = () => {
  const [products, setProducts] = useState<ProductResponse[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
        const json = await res.json();
        let data: ProductResponse[] = [];
        if (json.data && Array.isArray(json.data)) {
          data = json.data;
        } else if (Array.isArray(json)) {
          data = json;
        }
        setProducts(data.slice(0, 4));
      } catch (err) {
        setProducts([
          { id: 1, name: "5 Mukhi Rudraksha Mala", price: 79.99, category: "siddha-mala", description: "The most powerful Rudraksha for mental clarity and spiritual growth", discountPercentage: 20, discountedPrice: 49.99, images: ["https://images.unsplash.com/photo-1600618528240-fb9fc964b853?w=400&q=80"] },
          { id: 2, name: "Siddha Mala (1-14 Mukhi)", price: 899.99, category: "siddha-mala", description: "Complete spiritual mala with all 14 Mukhi for ultimate enlightenment", discountPercentage: 30, discountedPrice: 599.99, images: ["https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?w=400&q=80"] },
          { id: 3, name: "Saraswati Mala Premium", price: 199.99, category: "saraswati-mala", description: "Divine wisdom mala for knowledge and academic excellence", discountPercentage: 25, discountedPrice: 149.99, images: ["https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=400&q=80"] },
          { id: 4, name: "Rudraksha Power Bracelet", price: 49.99, category: "bracelets", description: "Elegant bracelet with authentic 5 Mukhi Rudraksha beads", discountPercentage: 15, discountedPrice: 34.99, images: ["https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&q=80"] },
        ]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % products.length);
  }, [products.length]);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
  }, [products.length]);

  useEffect(() => {
    if (isPaused || products.length === 0) return;
    const interval = setInterval(goToNext, 4500);
    return () => clearInterval(interval);
  }, [goToNext, isPaused, products.length]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 50) goToNext();
    if (diff < -50) goToPrev();
    touchStartX.current = null;
    touchEndX.current = null;
  };

  if (isLoading) {
    return (
      <section className="py-16 lg:py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-10">
            <div className="h-3 w-20 bg-muted rounded mx-auto mb-2 animate-pulse" />
            <div className="h-8 w-48 bg-muted rounded mx-auto animate-pulse" />
          </div>
          <div className="flex justify-center items-center min-h-[300px]">
            <div className="w-10 h-10 border-3 border-primary/20 border-t-primary rounded-full animate-spin" />
          </div>
        </div>
      </section>
    );
  }

  if (products.length === 0) return null;

  const activeProduct = products[currentIndex];
  const leftProducts = [
    products[(currentIndex - 1 + products.length) % products.length],
    products[(currentIndex - 2 + products.length) % products.length],
  ];
  const rightProducts = [
    products[(currentIndex + 1) % products.length],
    products[(currentIndex + 2) % products.length],
  ];

  return (
    <section className="py-16 lg:py-20 bg-background relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 -left-32 w-[400px] h-[400px] rounded-full bg-primary/[0.04] blur-3xl" />
        <div className="absolute bottom-0 -right-32 w-[350px] h-[350px] rounded-full bg-primary/[0.03] blur-3xl" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <p className="text-xs font-body tracking-[0.3em] text-primary uppercase mb-2 flex items-center justify-center gap-2">
            <Sparkles size={12} className="text-primary" />
            Featured
          </p>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading text-gradient-gold">Sacred Collection</h2>
          <p className="text-muted-foreground mt-3 text-sm max-w-md mx-auto">Handpicked Rudraksha beads of exceptional quality</p>
        </motion.div>

        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="relative flex items-center justify-center min-h-[280px] lg:min-h-[320px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className="flex items-center justify-center gap-3 lg:gap-4 w-full max-w-4xl px-2">
                  <SpotlightSideStack products={leftProducts} side="left" />
                  <SpotlightCardActive product={activeProduct} />
                  <SpotlightSideStack products={rightProducts} side="right" />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <CarouselControls 
            onPrev={goToPrev} 
            onNext={goToNext} 
            currentIndex={currentIndex}
            total={products.length}
          />

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-6"
          >
            <Link
              to="/products"
              className="inline-flex items-center gap-2 text-sm font-body font-medium text-primary hover:text-primary/70 transition-colors group"
            >
              <span>View All Products</span>
              <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

interface SpotlightSideStackProps {
  products: ProductResponse[];
  side: "left" | "right";
}

const SpotlightSideStack = ({ products, side }: SpotlightSideStackProps) => {
  const isLeft = side === "left";
  
  return (
    <div className={`hidden sm:flex flex-col ${isLeft ? 'items-end' : 'items-start'} gap-2`}>
      {products.map((product, idx) => (
        <motion.div
          key={`${product.id}-${side}-${idx}`}
          initial={{ opacity: 0, x: isLeft ? -10 : 10 }}
          animate={{ 
            opacity: 0.4 - idx * 0.1, 
            scale: 0.7 - idx * 0.05,
          }}
          transition={{ duration: 0.3, delay: 0.15 + idx * 0.05 }}
        >
          <SpotlightCardSmall product={product} />
        </motion.div>
      ))}
    </div>
  );
};

interface SpotlightCardSmallProps {
  product: ProductResponse;
}

const SpotlightCardSmall = ({ product }: SpotlightCardSmallProps) => {
  const images = product.images?.length ? product.images : DEFAULT_IMAGES;
  const hasDiscount = product.discountPercentage > 0;

  return (
    <div className="w-16 lg:w-20 opacity-50 blur-[0.3px]">
      <div className="relative aspect-square rounded-lg overflow-hidden bg-secondary/20 border border-border/20">
        <img
          src={images[0]}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-background/40" />
        {hasDiscount && (
          <span className="absolute top-1 left-1 bg-gradient-to-r from-red-500 to-orange-500 text-white text-[7px] font-bold px-1 py-0.5 rounded">
            -{product.discountPercentage}%
          </span>
        )}
      </div>
    </div>
  );
};

interface SpotlightCardActiveProps {
  product: ProductResponse;
}

const SpotlightCardActive = ({ product }: SpotlightCardActiveProps) => {
  const images = product.images?.length ? product.images : DEFAULT_IMAGES;
  const hasDiscount = product.discountPercentage > 0;

  return (
    <motion.div
      className="order-2 w-full max-w-[200px] lg:max-w-[240px] bg-card border border-border/50 rounded-2xl overflow-hidden shadow-lg shadow-black/5"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: 0.1 }}
    >
      <div className="relative aspect-square overflow-hidden bg-secondary/20">
        <img
          src={images[0]}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        {hasDiscount && (
          <span className="absolute top-2 left-2 bg-gradient-to-r from-red-500 to-orange-500 text-white text-[9px] font-bold px-2 py-0.5 rounded">
            -{product.discountPercentage}%
          </span>
        )}
      </div>

      <div className="p-3">
        <p className="text-[8px] font-body font-medium tracking-[0.15em] text-primary uppercase mb-1">
          {product.category?.replace(/-/g, " ") || "Rudraksha"}
        </p>
        
        <h3 className="font-heading text-sm text-foreground mb-1 line-clamp-1">
          {product.name}
        </h3>
        
        <div className="flex items-baseline gap-1.5 mb-2">
          <span className="text-base font-body font-bold text-gradient-gold">
            ${hasDiscount ? product.discountedPrice?.toFixed(2) : product.price?.toFixed(2)}
          </span>
          {hasDiscount && (
            <span className="text-[10px] text-muted-foreground line-through">
              ${product.price?.toFixed(2)}
            </span>
          )}
        </div>

        <Link
          to={`/products/${product.id}`}
          className="flex items-center justify-center gap-1.5 bg-gradient-to-r from-primary to-primary/90 text-white py-2 rounded-lg text-xs font-body font-semibold hover:shadow-md transition-all"
        >
          <ShoppingBag size={12} />
          View Details
        </Link>
      </div>
    </motion.div>
  );
};

interface CarouselControlsProps {
  onPrev: () => void;
  onNext: () => void;
  currentIndex: number;
  total: number;
}

const CarouselControls = ({ onPrev, onNext, currentIndex, total }: CarouselControlsProps) => {
  return (
    <div className="flex justify-center items-center gap-3 mt-6">
      <button
        onClick={onPrev}
        className="w-8 h-8 rounded-full border border-border/50 bg-card/80 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all"
        aria-label="Previous"
      >
        <ChevronLeft size={16} />
      </button>

      <div className="flex items-center gap-1">
        {Array.from({ length: total }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => {}}
            className={`rounded-full transition-all duration-300 ${
              idx === currentIndex 
                ? "w-5 bg-primary" 
                : "w-1.5 h-1.5 bg-border/50"
            }`}
            aria-label={`Slide ${idx + 1}`}
          />
        ))}
      </div>

      <button
        onClick={onNext}
        className="w-8 h-8 rounded-full border border-border/50 bg-card/80 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all"
        aria-label="Next"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
};

export default FeaturedSpotlightSection;