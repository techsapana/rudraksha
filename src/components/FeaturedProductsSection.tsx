import { useState, useEffect, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ShoppingBag, Sparkles } from "lucide-react";
import type { ProductResponse } from "@/lib/types";

const API_URL = "http://localhost:8090/api/products";

const DEFAULT_IMAGES = [
  "https://images.unsplash.com/photo-1600618528240-fb9fc964b853?w=600&q=80",
];

const FeaturedProductsSection = () => {
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
          { id: 1, name: "5 Mukhi Rudraksha Mala", price: 79.99, category: "siddha-mala", description: "The most powerful Rudraksha for mental clarity and spiritual growth", discountPercentage: 20, discountedPrice: 49.99, images: ["https://images.unsplash.com/photo-1600618528240-fb9fc964b853?w=600&q=80"] },
          { id: 2, name: "Siddha Mala (1-14 Mukhi)", price: 899.99, category: "siddha-mala", description: "Complete spiritual mala with all 14 Mukhi for ultimate enlightenment", discountPercentage: 30, discountedPrice: 599.99, images: ["https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?w=600&q=80"] },
          { id: 3, name: "Saraswati Mala Premium", price: 199.99, category: "saraswati-mala", description: "Divine wisdom mala for knowledge and academic excellence", discountPercentage: 25, discountedPrice: 149.99, images: ["https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=600&q=80"] },
          { id: 4, name: "Rudraksha Power Bracelet", price: 49.99, category: "bracelets", description: "Elegant bracelet with authentic 5 Mukhi Rudraksha beads", discountPercentage: 15, discountedPrice: 34.99, images: ["https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&q=80"] },
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
    const interval = setInterval(goToNext, 5000);
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
      <section className="py-20 lg:py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-14">
            <div className="h-3 w-20 bg-muted rounded mx-auto mb-2 animate-pulse" />
            <div className="h-8 w-48 bg-muted rounded mx-auto animate-pulse" />
          </div>
          <div className="flex justify-center items-center min-h-[350px]">
            <div className="w-10 h-10 border-3 border-primary/20 border-t-primary rounded-full animate-spin" />
          </div>
        </div>
      </section>
    );
  }

  if (products.length === 0) return null;

  const activeProduct = products[currentIndex];
  const rightProducts = [
    products[(currentIndex + 1) % products.length],
    products[(currentIndex + 2) % products.length],
  ];
  const leftProducts = [
    products[(currentIndex - 1 + products.length) % products.length],
    products[(currentIndex - 2 + products.length) % products.length],
  ];

  return (
    <section className="py-20 lg:py-24 bg-background relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 -left-40 w-[500px] h-[500px] rounded-full bg-primary/[0.03] blur-[100px]" />
        <div className="absolute bottom-1/3 -right-40 w-[400px] h-[400px] rounded-full bg-primary/[0.02] blur-[80px]" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-xs font-body tracking-[0.35em] text-primary uppercase mb-3 flex items-center justify-center gap-2">
            <Sparkles size={12} className="text-primary" />
            Featured
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading text-gradient-gold">
            Sacred Collection
          </h2>
          <p className="text-muted-foreground mt-4 text-sm max-w-md mx-auto font-body">
            Handpicked Rudraksha beads of exceptional quality
          </p>
        </motion.div>

        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="relative flex items-center justify-center min-h-[400px] lg:min-h-[420px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
              >
                <div className="flex items-center justify-center gap-4 lg:gap-6 w-full max-w-5xl px-2">
                  <SidePreviewStack products={leftProducts} side="left" />
                  <CenterCard product={activeProduct} />
                  <SidePreviewStack products={rightProducts} side="right" />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex justify-center items-center gap-3 mt-10">
            <button
              onClick={goToPrev}
              className="w-10 h-10 rounded-full border border-border/40 bg-card/60 backdrop-blur-sm flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/30 hover:bg-card transition-all duration-200"
              aria-label="Previous"
            >
              <ChevronLeft size={18} />
            </button>

            <div className="flex items-center gap-1.5 px-2">
              {products.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`rounded-full transition-all duration-300 ${
                    idx === currentIndex 
                      ? "w-6 bg-primary" 
                      : "w-2 h-2 bg-border/40 hover:bg-border/70"
                  }`}
                  aria-label={`Go to product ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={goToNext}
              className="w-10 h-10 rounded-full border border-border/40 bg-card/60 backdrop-blur-sm flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/30 hover:bg-card transition-all duration-200"
              aria-label="Next"
            >
              <ChevronRight size={18} />
            </button>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-10"
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

interface SidePreviewStackProps {
  products: ProductResponse[];
  side: "left" | "right";
}

const SidePreviewStack = ({ products, side }: SidePreviewStackProps) => {
  const isLeft = side === "left";
  
  return (
    <div className={`hidden lg:flex flex-col ${isLeft ? 'items-end' : 'items-start'} gap-2`}>
      {products.map((product, idx) => (
        <motion.div
          key={`${product.id}-${side}-${idx}`}
          initial={{ opacity: 0, x: isLeft ? -8 : 8 }}
          animate={{ 
            opacity: 0.45 - idx * 0.15, 
            scale: 0.72 - idx * 0.03,
            y: idx * 8,
          }}
          transition={{ duration: 0.3, delay: 0.12 + idx * 0.04 }}
        >
          <BackgroundCard product={product} />
        </motion.div>
      ))}
    </div>
  );
};

interface BackgroundCardProps {
  product: ProductResponse;
}

const BackgroundCard = ({ product }: BackgroundCardProps) => {
  const images = product.images?.length ? product.images : DEFAULT_IMAGES;

  return (
    <div className="w-28 cursor-pointer">
      <div className="relative aspect-square rounded-xl overflow-hidden bg-secondary/20 border border-border/20">
        <img
          src={images[0]}
          alt={product.name}
          className="w-full h-full object-cover blur-[0.8px]"
        />
        <div className="absolute inset-0 bg-background/50" />
      </div>
    </div>
  );
};

interface CenterCardProps {
  product: ProductResponse;
}

const CenterCard = ({ product }: CenterCardProps) => {
  const images = product.images?.length ? product.images : DEFAULT_IMAGES;
  const hasDiscount = product.discountPercentage > 0;

  return (
    <motion.div
      className="order-2 w-full max-w-sm lg:max-w-md bg-card border border-border/50 rounded-xl overflow-hidden shadow-xl shadow-primary/5"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: 0.08 }}
    >
      <div className="relative aspect-square overflow-hidden bg-secondary/20">
        <motion.img
          src={images[0]}
          alt={product.name}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />
        
        {hasDiscount && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-orange-500 text-white text-[10px] font-bold px-3 py-1 rounded-lg"
          >
            -{product.discountPercentage}%
          </motion.span>
        )}
      </div>

      <div className="p-5">
        <p className="text-[9px] font-body font-medium tracking-[0.2em] text-primary uppercase mb-2">
          {product.category?.replace(/-/g, " ") || "Rudraksha"}
        </p>
        
        <h3 className="font-heading text-lg text-foreground mb-2 line-clamp-1">
          {product.name}
        </h3>
        
        <p className="text-muted-foreground font-body text-sm line-clamp-2 mb-4">
          {product.description}
        </p>
        
        <div className="flex items-baseline gap-2.5 mb-5">
          <span className="text-xl font-body font-bold text-gradient-gold">
            ${hasDiscount ? product.discountedPrice?.toFixed(2) : product.price?.toFixed(2)}
          </span>
          {hasDiscount && (
            <span className="text-sm text-muted-foreground line-through">
              ${product.price?.toFixed(2)}
            </span>
          )}
        </div>

        <Link
          to={`/products/${product.id}`}
          className="flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-primary/90 text-white py-2.5 rounded-lg text-sm font-body font-semibold hover:shadow-lg hover:shadow-primary/20 transition-all"
        >
          <ShoppingBag size={14} />
          View Details
        </Link>
      </div>
    </motion.div>
  );
};

export default FeaturedProductsSection;