import { useState, useEffect, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ShoppingBag, Eye, Sparkles } from "lucide-react";
import { publicProductService } from "@/services/publicProductService";
import type { ProductResponse } from "@/lib/types";

const API_URL = "http://localhost:8090/api/products";

const DEFAULT_IMAGES = [
  "https://images.unsplash.com/photo-1600618528240-fb9fc964b853?w=800&q=80",
];

const FeaturedProductsCarousel = () => {
  const [products, setProducts] = useState<ProductResponse[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
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
        setError(err instanceof Error ? err.message : "Failed to load products");
        setProducts([
          { id: 1, name: "5 Mukhi Rudraksha Mala", price: 79.99, category: "siddha-mala", description: "The most powerful Rudraksha for mental clarity and spiritual growth", discountPercentage: 20, discountedPrice: 49.99, images: ["https://images.unsplash.com/photo-1600618528240-fb9fc964b853?w=800&q=80"] },
          { id: 2, name: "Siddha Mala (1-14 Mukhi)", price: 899.99, category: "siddha-mala", description: "Complete spiritual mala with all 14 Mukhi for ultimate enlightenment", discountPercentage: 30, discountedPrice: 599.99, images: ["https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?w=800&q=80"] },
          { id: 3, name: "Saraswati Mala Premium", price: 199.99, category: "saraswati-mala", description: "Divine wisdom mala for knowledge and academic excellence", discountPercentage: 25, discountedPrice: 149.99, images: ["https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800&q=80"] },
          { id: 4, name: "Rudraksha Power Bracelet", price: 49.99, category: "bracelets", description: "Elegant bracelet with authentic 5 Mukhi Rudraksha beads", discountPercentage: 15, discountedPrice: 34.99, images: ["https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&q=80"] },
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
    const interval = setInterval(goToNext, 4000);
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
    const threshold = 50;
    if (diff > threshold) goToNext();
    if (diff < -threshold) goToPrev();
    touchStartX.current = null;
    touchEndX.current = null;
  };

  if (isLoading) {
    return (
      <section className="py-20 lg:py-28 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-14">
            <div className="h-4 w-24 bg-muted rounded mx-auto mb-3 animate-pulse" />
            <div className="h-10 w-64 bg-muted rounded mx-auto animate-pulse" />
          </div>
          <div className="flex justify-center items-center min-h-[500px]">
            <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
          </div>
        </div>
      </section>
    );
  }

  if (products.length === 0) {
    return null;
  }

  const activeProduct = products[currentIndex];
  const backgroundProducts = products
    .map((_, idx) => products[(currentIndex + idx + 1) % products.length])
    .slice(0, 3);

  return (
    <section className="py-20 lg:py-28 bg-background relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-primary/[0.03] blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-80 h-80 rounded-full bg-primary/[0.03] blur-3xl" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-xs font-body tracking-[0.35em] text-primary uppercase mb-3 flex items-center justify-center gap-2">
            <Sparkles size={14} className="text-primary" />
            Featured
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading text-gradient-gold">
            Sacred Collection
          </h2>
          <p className="text-muted-foreground mt-4 max-w-lg mx-auto font-body">
            Handpicked Rudraksha beads of exceptional quality, each authenticated and blessed through sacred Vedic rituals
          </p>
        </motion.div>

        <div
          ref={carouselRef}
          className="relative pt-4 pb-8"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="relative flex justify-center items-center min-h-[480px] lg:min-h-[520px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                className="absolute inset-0 flex justify-center items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16 w-full max-w-6xl px-4">
                  <motion.div
                    className="order-2 lg:order-1 w-full max-w-md lg:max-w-lg"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    <ProductCardActive product={activeProduct} />
                  </motion.div>

                  <div className="order-1 lg:order-2 flex items-start gap-4 lg:gap-6 justify-center lg:pt-8">
                    {backgroundProducts.map((product, idx) => (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 0.85 - idx * 0.05, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 + idx * 0.1 }}
                        className="hidden lg:block"
                      >
                        <ProductCardBackground product={product} index={idx} />
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex justify-center items-center gap-4 mt-10">
            <button
              onClick={goToPrev}
              className="w-12 h-12 rounded-full border border-border/60 bg-card/80 backdrop-blur-sm flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/40 hover:bg-card transition-all duration-300"
              aria-label="Previous product"
            >
              <ChevronLeft size={20} />
            </button>

            <div className="flex items-center gap-2">
              {products.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`transition-all duration-300 ${
                    idx === currentIndex
                      ? "w-8 bg-primary"
                      : "w-2 bg-border/40 hover:bg-border/80"
                  } h-1.5 rounded-full`}
                  aria-label={`Go to product ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={goToNext}
              className="w-12 h-12 rounded-full border border-border/60 bg-card/80 backdrop-blur-sm flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/40 hover:bg-card transition-all duration-300"
              aria-label="Next product"
            >
              <ChevronRight size={20} />
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
              className="inline-flex items-center gap-2.5 text-sm font-body font-medium text-primary hover:text-primary/70 transition-colors group"
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

interface ProductCardActiveProps {
  product: ProductResponse;
}

const ProductCardActive = ({ product }: ProductCardActiveProps) => {
  const images = product.images?.length ? product.images : DEFAULT_IMAGES;
  const hasDiscount = product.discountPercentage > 0;

  return (
    <motion.div
      className="w-full bg-card border border-border/60 rounded-3xl overflow-hidden shadow-2xl shadow-primary/5"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative aspect-square overflow-hidden bg-secondary/30">
        <motion.img
          src={images[0]}
          alt={product.name}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
        
        {hasDiscount && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs font-bold px-4 py-2 rounded-xl tracking-wider shadow-lg"
          >
            -{product.discountPercentage}%
          </motion.span>
        )}
      </div>

      <div className="p-6 lg:p-8">
        <p className="text-[10px] font-body font-medium tracking-[0.25em] text-primary uppercase mb-3">
          {product.category?.replace(/-/g, " ") || "Rudraksha"}
        </p>
        
        <h3 className="font-heading text-xl lg:text-2xl text-foreground mb-3 line-clamp-1">
          {product.name}
        </h3>
        
        <p className="text-muted-foreground font-body text-sm lg:text-base line-clamp-2 mb-5">
          {product.description}
        </p>
        
        <div className="flex items-baseline gap-3 mb-6">
          <span className="text-2xl lg:text-3xl font-body font-bold text-gradient-gold">
            ${hasDiscount ? product.discountedPrice?.toFixed(2) : product.price?.toFixed(2)}
          </span>
          {hasDiscount && (
            <span className="text-base text-muted-foreground line-through">
              ${product.price?.toFixed(2)}
            </span>
          )}
        </div>

        <div className="flex gap-3">
          <Link
            to={`/products/${product.id}`}
            className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-primary/90 text-white px-6 py-3.5 rounded-xl font-body font-semibold text-sm tracking-wide hover:shadow-xl hover:shadow-primary/20 transition-all duration-300 glow-gold group"
          >
            <ShoppingBag size={16} />
            <span>View Details</span>
          </Link>
          
          <button className="w-14 h-14 flex items-center justify-center border border-border/60 bg-card rounded-xl text-muted-foreground hover:text-foreground hover:border-primary/40 transition-all duration-300 group">
            <Eye size={18} className="group-hover:scale-110 transition-transform" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

interface ProductCardBackgroundProps {
  product: ProductResponse;
  index: number;
}

const ProductCardBackground = ({ product, index }: ProductCardBackgroundProps) => {
  const images = product.images?.length ? product.images : DEFAULT_IMAGES;
  const hasDiscount = product.discountPercentage > 0;

  return (
    <motion.div
      className="w-32 lg:w-40 cursor-pointer opacity-60 hover:opacity-80 transition-opacity"
      whileHover={{ scale: 1.02 }}
    >
      <div className="relative aspect-square rounded-2xl overflow-hidden bg-secondary/30 border border-border/40">
        <img
          src={images[0]}
          alt={product.name}
          className="w-full h-full object-cover blur-[1px]"
        />
        <div className="absolute inset-0 bg-background/40" />
        
        {hasDiscount && (
          <span className="absolute top-2 left-2 bg-gradient-to-r from-red-500 to-orange-500 text-white text-[9px] font-bold px-2 py-1 rounded-md">
            -{product.discountPercentage}%
          </span>
        )}
      </div>
      
      <div className="p-3 text-center">
        <p className="text-[9px] font-body font-medium tracking-[0.15em] text-primary/70 uppercase mb-1 line-clamp-1">
          {product.category?.replace(/-/g, " ") || "Rudraksha"}
        </p>
        <h4 className="font-heading text-xs text-foreground/70 line-clamp-1 mb-1">
          {product.name}
        </h4>
        <p className="text-xs font-body font-bold text-gradient-gold/70">
          ${hasDiscount ? product.discountedPrice?.toFixed(2) : product.price?.toFixed(2)}
        </p>
      </div>
    </motion.div>
  );
};

export default FeaturedProductsCarousel;