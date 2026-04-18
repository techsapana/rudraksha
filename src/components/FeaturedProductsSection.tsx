import { useState, useEffect, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ShoppingBag, Sparkles, Zap, Star } from "lucide-react";
import type { ProductResponse } from "@/lib/types";

const API_URL = "http://localhost:8090/api/products";

interface ShowcaseProduct {
  id: string | number;
  name: string;
  price: number;
  originalPrice?: number;
  discountPercentage?: number;
  discountedPrice?: number;
  image: string;
  category: string;
  description: string;
  benefits?: string[];
  mukhi?: number;
  badge?: "NEW" | "SALE" | "FEATURED";
}

const DEMO_PRODUCTS: ShowcaseProduct[] = [
  {
    id: "1",
    name: "5 Mukhi Rudraksha Mala",
    price: 49.99,
    originalPrice: 79.99,
    discountPercentage: 37,
    discountedPrice: 49.99,
    image: "https://images.unsplash.com/photo-1600618528240-fb9fc964b853?w=800&q=80",
    category: "Siddha Mala",
    description: "The most powerful Rudraksha for mental clarity and spiritual growth. Represents Lord Kalagni Rudra.",
    benefits: ["Mental clarity", "Stress relief", "Spiritual growth"],
    mukhi: 5,
    badge: "NEW",
  },
  {
    id: "2",
    name: "Siddha Mala (1-14 Mukhi)",
    price: 599.99,
    originalPrice: 899.99,
    discountPercentage: 33,
    discountedPrice: 599.99,
    image: "https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?w=800&q=80",
    category: "Siddha Mala",
    description: "Complete spiritual mala with all 14 Mukhi for ultimate enlightenment and divine blessings.",
    benefits: ["Complete protection", "Fulfills desires", "Rare collector piece"],
    badge: "SALE",
  },
  {
    id: "3",
    name: "Saraswati Mala Premium",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800&q=80",
    category: "Saraswati Mala",
    description: "Divine wisdom mala dedicated to Goddess Saraswati for knowledge and academic excellence.",
    benefits: ["Enhanced learning", "Boosts creativity", "Improves concentration"],
    badge: "NEW",
  },
  {
    id: "4",
    name: "Rudraksha Power Bracelet",
    price: 34.99,
    originalPrice: 49.99,
    discountPercentage: 30,
    discountedPrice: 34.99,
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&q=80",
    category: "Bracelets",
    description: "Elegant bracelet with authentic 5 Mukhi Rudraksha beads set in silver. Perfect for daily wear.",
    benefits: ["Daily positivity", "Stylish accessory", "Stress relief"],
    badge: "SALE",
  },
  {
    id: "5",
    name: "1 Mukhi Rudraksha (Rare)",
    price: 1299.99,
    image: "https://images.unsplash.com/photo-1615529162924-f8605388461d?w=800&q=80",
    category: "Rare",
    description: "The extremely rare 1 Mukhi represents Lord Shiva himself. Considered the most powerful Rudraksha.",
    benefits: ["Supreme consciousness", "Divine blessings", "Ultimate liberation"],
    mukhi: 1,
    badge: "FEATURED",
  },
];

const FeaturedProductsSection = () => {
  const [products, setProducts] = useState<ShowcaseProduct[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
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
        
        const transformed: ShowcaseProduct[] = data.slice(0, 5).map((p, idx) => ({
          id: p.id,
          name: p.name,
          price: p.price,
          originalPrice: p.originalPrice,
          discountPercentage: p.discountPercentage,
          discountedPrice: p.discountedPrice,
          image: p.images?.[0] || DEMO_PRODUCTS[idx]?.image || "",
          category: p.category,
          description: p.description,
          benefits: p.benefits,
          mukhi: p.mukhi,
          badge: idx === 0 ? "NEW" : idx === 1 ? "SALE" : undefined,
        }));
        
        if (transformed.length > 0) {
          setProducts(transformed);
        } else {
          setProducts(DEMO_PRODUCTS);
        }
      } catch {
        setProducts(DEMO_PRODUCTS);
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

  const handleProductHover = (index: number) => {
    setIsHovering(true);
    setCurrentIndex(index);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

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
      <section className="py-12 lg:py-16 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <LoadingSkeleton />
        </div>
      </section>
    );
  }

  if (products.length === 0) return null;

  const activeProduct = products[currentIndex];
  const sideProducts = products.filter((_, idx) => idx !== currentIndex).slice(0, 4);

  return (
    <section className="py-12 lg:py-16 bg-background relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-40 w-[500px] h-[500px] rounded-full bg-primary/[0.03] blur-[100px]" />
        <div className="absolute bottom-1/4 -right-40 w-[400px] h-[400px] rounded-full bg-gold/[0.02] blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <p className="text-xs font-body tracking-[0.3em] text-primary uppercase mb-1 flex items-center gap-2 font-bold">
              <Sparkles size={12} className="text-gold" />
              Premium
            </p>
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-gradient-gold">Featured Collection</h2>
          </div>
          <Link
            to="/products"
            className="hidden sm:flex items-center gap-2 text-sm font-body font-medium text-primary hover:text-primary/70 transition-colors group"
          >
            <span>View All</span>
            <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        <div
          className="relative overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 lg:gap-8">
            <div className="lg:col-span-3 order-1">
              <HeroProductDisplay product={activeProduct} />
            </div>

            <div className="lg:col-span-2 order-2">
              <div className="lg:hidden mb-4">
                <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
                  {products.map((product) => (
                    <SideProductCardCompact
                      key={product.id}
                      product={product}
                      isActive={product.id === activeProduct.id}
                      onClick={() => setCurrentIndex(products.findIndex(p => p.id === product.id))}
                    />
                  ))}
                </div>
              </div>
              <div className="hidden lg:block">
                <SideProductGrid
                  products={sideProducts}
                  currentIndex={currentIndex}
                  allProducts={products}
                  onProductHover={handleProductHover}
                  onMouseLeave={handleMouseLeave}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-8 sm:hidden">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-sm font-body font-medium text-primary"
          >
            <span>View All Products</span>
            <ChevronRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
};

interface HeroProductDisplayProps {
  product: ShowcaseProduct;
}

const HeroProductDisplay = ({ product }: HeroProductDisplayProps) => {
  const hasDiscount = product.discountedPrice && product.originalPrice;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={product.id}
        className="relative group"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-secondary/30 via-card to-secondary/20 border border-border/40 shadow-2xl shadow-black/5">
          <div className="relative aspect-[3/4] sm:aspect-[4/3] lg:aspect-[3/2] overflow-hidden">
            <motion.div
              initial={{ scale: 1.05 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="absolute inset-0"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </motion.div>

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

            {product.badge && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="absolute top-4 left-4"
              >
                <Badge type={product.badge} />
              </motion.div>
            )}

            <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 lg:p-5">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
              >
                <p className="text-[10px] sm:text-xs font-body font-medium tracking-[0.15em] text-white/70 uppercase mb-1">
                  {product.category}
                  {product.mukhi && ` • ${product.mukhi} Mukhi`}
                </p>
                <h3 className="text-lg sm:text-xl font-heading text-white mb-1.5">
                  {product.name}
                </h3>
                <p className="text-xs sm:text-sm text-white/80 mb-2 sm:mb-3 line-clamp-2 max-w-xs sm:max-w-md">
                  {product.description}
                </p>
                <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                  <div className="flex items-baseline gap-1.5 sm:gap-2">
                    <span className="text-lg sm:text-xl font-body font-bold text-gradient-gold">
                      ${hasDiscount ? product.discountedPrice?.toFixed(2) : product.price?.toFixed(2)}
                    </span>
                    {hasDiscount && (
                      <span className="text-xs sm:text-sm text-white/50 line-through">
                        ${product.originalPrice?.toFixed(2)}
                      </span>
                    )}
                  </div>
                  <Link
                    to={`/products/${product.id}`}
                    className="inline-flex items-center gap-1.5 sm:gap-2 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-body font-medium transition-all border border-white/20 hover:border-white/40"
                  >
                    <ShoppingBag size={12} sm={14} />
                    View Details
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>

          <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-gold/20 rounded-full blur-3xl pointer-events-none" />
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

interface SideProductGridProps {
  products: ShowcaseProduct[];
  currentIndex: number;
  allProducts: ShowcaseProduct[];
  onProductHover: (index: number) => void;
  onMouseLeave: () => void;
}

const SideProductGrid = ({
  products,
  currentIndex,
  allProducts,
  onProductHover,
  onMouseLeave,
}: SideProductGridProps) => {
  const handleCardHover = (originalIndex: number) => {
    const actualIndex = originalIndex < currentIndex ? originalIndex : originalIndex + 1;
    if (actualIndex < allProducts.length) {
      onProductHover(actualIndex);
    }
  };

  return (
    <div className="space-y-3" onMouseLeave={onMouseLeave}>
      {allProducts.map((product, idx) => (
        <SideProductCard
          key={product.id}
          product={product}
          index={idx}
          isActive={idx === currentIndex}
          onHover={() => handleCardHover(idx)}
        />
      ))}
    </div>
  );
};

interface SideProductCardProps {
  product: ShowcaseProduct;
  index: number;
  isActive: boolean;
  onHover: () => void;
}

const SideProductCard = ({ product, index, isActive, onHover }: SideProductCardProps) => {
  const hasDiscount = product.discountedPrice && product.originalPrice;

  return (
    <motion.div
      onMouseEnter={onHover}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className={`relative group cursor-pointer transition-all duration-300 ${
        isActive
          ? "bg-gradient-to-r from-primary/10 to-transparent border-l-2 border-primary"
          : "bg-transparent border-l-2 border-transparent hover:bg-gradient-to-r hover:from-secondary/50 to-transparent"
      } rounded-r-xl`}
    >
      <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-card/50 transition-colors">
        <div className="relative w-18 h-18 lg:w-20 lg:h-20 rounded-lg overflow-hidden flex-shrink-0 shadow-md">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          {product.badge && (
            <div className="absolute top-1 right-1">
              <Badge type={product.badge} small />
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-[10px] font-body font-medium tracking-[0.12em] text-muted-foreground uppercase mb-0.5">
            {product.category}
          </p>
          <h4 className="font-heading text-sm text-foreground truncate group-hover:text-primary transition-colors">
            {product.name}
          </h4>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-sm font-body font-bold text-gradient-gold">
              ${hasDiscount ? product.discountedPrice?.toFixed(2) : product.price?.toFixed(2)}
            </span>
            {hasDiscount && (
              <span className="text-xs text-muted-foreground line-through">
                ${product.originalPrice?.toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

interface SideProductCardCompactProps {
  product: ShowcaseProduct;
  isActive: boolean;
  onClick: () => void;
}

const SideProductCardCompact = ({ product, isActive, onClick }: SideProductCardCompactProps) => {
  const hasDiscount = product.discountedPrice && product.originalPrice;

  return (
    <motion.button
      onClick={onClick}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative group cursor-pointer flex-shrink-0 w-[140px] transition-all duration-300 ${
        isActive
          ? "bg-primary/10 border-primary"
          : "bg-card/80 border-border/40 hover:border-primary/50"
      } border rounded-xl overflow-hidden`}
    >
      <div className="relative w-full aspect-square overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {product.badge && (
          <div className="absolute top-1.5 right-1.5">
            <Badge type={product.badge} small />
          </div>
        )}
      </div>
      <div className="p-2 text-left min-w-0">
        <p className="text-[8px] font-body font-medium tracking-[0.1em] text-muted-foreground uppercase truncate">
          {product.category}
        </p>
        <h4 className="font-heading text-xs text-foreground truncate group-hover:text-primary transition-colors">
          {product.name}
        </h4>
        <div className="flex items-baseline gap-1.5 mt-0.5">
          <span className="text-xs font-body font-bold text-gradient-gold">
            ${hasDiscount ? product.discountedPrice?.toFixed(2) : product.price?.toFixed(2)}
          </span>
        </div>
      </div>
    </motion.button>
  );
};

interface BadgeProps {
  type: "NEW" | "SALE" | "FEATURED";
  small?: boolean;
}

const Badge = ({ type, small }: BadgeProps) => {
  const styles = {
    NEW: "bg-gradient-to-r from-emerald-500 to-teal-500",
    SALE: "bg-gradient-to-r from-red-500 to-orange-500",
    FEATURED: "bg-gradient-to-r from-amber-500 to-yellow-500",
  };

  const icons = {
    NEW: Zap,
    SALE: ChevronRight,
    FEATURED: Star,
  };

  const Icon = icons[type];

  return (
    <span
      className={`inline-flex items-center gap-1 ${small ? "px-1.5 py-0.5 text-[9px]" : "px-2.5 py-1 text-[10px]"} font-body font-bold text-white rounded-full ${styles[type]}`}
    >
      {!small && <Icon size={10} />}
      {type}
    </span>
  );
};

const LoadingSkeleton = () => (
  <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">
    <div className="lg:col-span-3">
      <div className="aspect-[4/3] lg:aspect-[3/2] rounded-3xl bg-gradient-to-br from-secondary via-muted to-secondary animate-pulse" />
    </div>
    <div className="lg:col-span-2 space-y-4">
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className="flex items-center gap-4 p-3 rounded-xl bg-muted animate-pulse"
        >
          <div className="w-20 h-20 rounded-xl bg-muted-foreground/20" />
          <div className="flex-1">
            <div className="h-3 w-12 bg-muted-foreground/20 rounded mb-2" />
            <div className="h-4 w-24 bg-muted-foreground/20 rounded mb-2" />
            <div className="h-3 w-16 bg-muted-foreground/20 rounded" />
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default FeaturedProductsSection;