import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingBag, Eye, ChevronLeft, ChevronRight } from "lucide-react";
import type { ProductResponse } from "@/lib/types";

interface ProductCardProps {
  product: ProductResponse;
  index?: number;
}

const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = product.images && product.images.length > 0 
    ? product.images 
    : ["https://images.unsplash.com/photo-1600618528240-fb9fc964b853?w=500&q=80"];
  const hasMultipleImages = images.length > 1;
  const hasDiscount = product.discountPercentage > 0;

  const handlePrevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      className="group relative bg-card border border-border/60 rounded-2xl overflow-hidden hover:border-primary/30 transition-all duration-500 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10" />
      
      <Link to={`/products/${product.id}`} className="relative block aspect-square overflow-hidden bg-secondary/50">
        {images.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={idx === 0 ? product.name : `${product.name} ${idx + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
              idx === currentImageIndex ? "opacity-100" : "opacity-0"
            } ${idx === 0 ? "group-hover:scale-110" : ""}`}
            style={{ transition: "transform 0.7s ease-out, opacity 0.5s ease" }}
            loading="lazy"
          />
        ))}
        
        {hasDiscount && (
          <span className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-orange-500 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg tracking-wider shadow-lg z-20">
            -{product.discountPercentage}%
          </span>
        )}

        {hasMultipleImages && (
          <>
            <button
              onClick={handlePrevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-background/90 backdrop-blur-sm rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-background transition-colors opacity-0 group-hover:opacity-100 z-20"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={handleNextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-background/90 backdrop-blur-sm rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-background transition-colors opacity-0 group-hover:opacity-100 z-20"
            >
              <ChevronRight size={16} />
            </button>
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
              {images.map((_, idx) => (
                <span
                  key={idx}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                    idx === currentImageIndex ? "bg-primary w-4" : "bg-background/60"
                  }`}
                />
              ))}
            </div>
          </>
        )}
        
        <motion.div
          className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-400 z-30"
        >
          <button className="w-full flex items-center justify-center gap-2 bg-background/95 backdrop-blur-sm text-foreground py-3 rounded-xl font-body font-medium text-sm hover:bg-primary hover:text-white transition-all duration-300 shadow-lg">
            <Eye size={16} />
            <span>Quick View</span>
          </button>
        </motion.div>
      </Link>
      
      <div className="relative p-5 lg:p-6">
        <p className="text-[10px] font-body font-medium tracking-[0.2em] text-primary uppercase mb-2">
          {product.category.replace(/-/g, " ")}
        </p>
        
        <h3 className="font-heading text-base lg:text-lg text-foreground mb-3 line-clamp-1 group-hover:text-primary transition-colors duration-300">
          {product.name}
        </h3>
        
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
          {product.description}
        </p>
        
        <div className="flex items-center gap-3 mb-5">
          <span className="text-xl lg:text-2xl font-body font-bold text-gradient-gold">
            ${hasDiscount ? product.discountedPrice.toFixed(2) : product.price.toFixed(2)}
          </span>
          {hasDiscount && (
            <span className="text-sm text-muted-foreground line-through">
              ${product.price.toFixed(2)}
            </span>
          )}
        </div>
        
        <Link
          to={`/products/${product.id}`}
          className="block w-full text-center bg-secondary/80 text-secondary-foreground py-3 rounded-xl text-sm font-body font-medium hover:bg-primary hover:text-white transition-all duration-300 group/btn"
        >
          <span className="group-hover/btn:relative flex items-center justify-center gap-2">
            <ShoppingBag size={16} />
            View Details
          </span>
        </Link>
      </div>
    </motion.div>
  );
};

export default ProductCard;