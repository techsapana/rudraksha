import { motion } from "framer-motion";

const ProductCardSkeleton = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="bg-card border border-border/60 rounded-2xl overflow-hidden"
  >
    <div className="aspect-square bg-secondary/50 animate-pulse" />
    <div className="p-5 lg:p-6 space-y-4">
      <div className="h-3 w-16 bg-secondary/50 rounded animate-pulse" />
      <div className="h-5 w-3/4 bg-secondary/50 rounded animate-pulse" />
      <div className="flex items-center gap-3">
        <div className="h-7 w-24 bg-secondary/50 rounded animate-pulse" />
        <div className="h-5 w-16 bg-secondary/50 rounded animate-pulse" />
      </div>
      <div className="h-12 w-full bg-secondary/50 rounded-xl animate-pulse" />
    </div>
  </motion.div>
);

const ProductsSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
    {[...Array(8)].map((_, i) => (
      <ProductCardSkeleton key={i} />
    ))}
  </div>
);

export default ProductsSkeleton;
