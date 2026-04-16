import { useState } from "react";
import { motion } from "framer-motion";
import { Expand } from "lucide-react";

interface GalleryItemProps {
  image: { id: number; imageUrl: string; displayOrder: number };
  index: number;
  onClick: () => void;
}

const GalleryItem = ({ image, index, onClick }: GalleryItemProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer border border-border hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10 transition-all duration-500"
      onClick={onClick}
    >
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-gradient-to-br from-secondary to-muted animate-pulse" />
      )}

      {hasError ? (
        <div className="absolute inset-0 bg-gradient-to-br from-secondary to-muted flex items-center justify-center">
          <span className="text-muted-foreground text-xs font-body">Image unavailable</span>
        </div>
      ) : (
        <img
          src={image.imageUrl}
          alt={`Gallery image ${index + 1}`}
          className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
        <motion.div
          initial={{ scale: 0.8 }}
          whileHover={{ scale: 1 }}
          className="w-12 h-12 rounded-full bg-primary/90 flex items-center justify-center shadow-lg backdrop-blur-sm"
        >
          <Expand size={20} className="text-primary-foreground" />
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
        <p className="text-xs font-body text-foreground/90 text-center">
          View Full Size
        </p>
      </div>
    </motion.div>
  );
};

export default GalleryItem;