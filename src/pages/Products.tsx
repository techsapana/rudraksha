import { useState, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { AlertCircle, Package, Search, ChevronDown } from "lucide-react";
import Layout from "@/components/Layout";
import ProductCard from "@/components/ProductCard";
import ProductsSkeleton from "@/components/ProductsSkeleton";
import { publicProductService } from "@/services/publicProductService";

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const activeCategory = searchParams.get("category") || "";

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const { data: products, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: () => publicProductService.getAll(),
    staleTime: 5 * 60 * 1000,
  });

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await fetch("http://localhost:8090/api/categories");
      const data = await res.json();
      return data.data || [];
    },
    staleTime: 10 * 60 * 1000,
  });

  const selectedCategory = categories?.find((cat: { id: number; name: string }) => cat.id.toString() === activeCategory);

  const filtered = !activeCategory
    ? products
    : products?.filter((p) => p.category === activeCategory);

  return (
    <Layout>
      <section className="pt-16 pb-8 lg:pt-20 lg:pb-12 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <p className="text-xs font-body tracking-[0.35em] text-primary uppercase mb-2">Collection</p>
            <h1 className="text-2xl lg:text-3xl xl:text-4xl font-heading font-bold text-gradient-gold">Our Products</h1>
            <p className="text-muted-foreground mt-3 max-w-lg mx-auto text-sm font-bold">
              Explore our curated collection of authentic Rudraksha beads
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex justify-center mb-8"
          >
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-3 px-6 py-3 bg-card border border-border/60 rounded-xl text-sm font-body font-medium tracking-wide transition-all duration-300 hover:border-primary/30 min-w-[200px] justify-between"
              >
                <span className="flex items-center gap-2">
                  <Search size={16} className="text-muted-foreground" />
                  {selectedCategory ? selectedCategory.name : "Search by Category"}
                </span>
                <ChevronDown size={16} className={`text-muted-foreground transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isDropdownOpen && categories && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-full left-0 right-0 mt-2 bg-card border border-border/60 rounded-xl shadow-xl overflow-hidden z-50"
                >
                  <button
                    onClick={() => {
                      setSearchParams({});
                      setIsDropdownOpen(false);
                    }}
                    className="w-full px-6 py-3 text-left text-sm font-body text-muted-foreground hover:bg-secondary/50 hover:text-foreground transition-colors"
                  >
                    All Categories
                  </button>
                  {categories.map((cat: { id: number; name: string }) => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setSearchParams({ category: cat.id.toString() });
                        setIsDropdownOpen(false);
                      }}
                      className="w-full px-6 py-3 text-left text-sm font-body text-muted-foreground hover:bg-secondary/50 hover:text-foreground transition-colors"
                    >
                      {cat.name}
                    </button>
                  ))}
                </motion.div>
              )}
            </div>
          </motion.div>

          {isLoading && <ProductsSkeleton />}
          
          {error && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center py-20 text-center"
            >
              <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center mb-4">
                <AlertCircle className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="text-xl font-heading text-foreground mb-2">Failed to load products</h3>
              <p className="text-muted-foreground mb-6">Please try again later</p>
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-2.5 bg-primary text-primary-foreground rounded-xl font-body font-medium hover:bg-primary/90 transition-colors"
              >
                Try Again
              </button>
            </motion.div>
          )}

          {!isLoading && !error && filtered && filtered.length > 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
            >
              {filtered.map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <ProductCard product={product} index={i} />
                </motion.div>
              ))}
            </motion.div>
          )}

          {!isLoading && !error && filtered && filtered.length === 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center py-20 text-center"
            >
              <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-4">
                <Package className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-heading text-foreground mb-2">No products found</h3>
              <p className="text-muted-foreground">No products available in this category yet.</p>
            </motion.div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Products;