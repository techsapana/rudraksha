import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { ImageIcon, AlertCircle, RefreshCw } from "lucide-react";
import { galleryApi, GalleryImage } from "@/services/galleryApi";
import GalleryItem from "./GalleryItem";
import GalleryModal from "./GalleryModal";
import GallerySkeleton from "./GallerySkeleton";

const GalleryGrid = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    data: images,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["gallery"],
    queryFn: galleryApi.getAll,
    staleTime: 5 * 60 * 1000,
  });

  const sortedImages = useMemo(() => {
    if (!images) return [];
    const active = images.filter((img: GalleryImage) => img.isActive !== false);
    return [...active].sort((a, b) => a.displayOrder - b.displayOrder);
  }, [images]);

  const handleImageClick = (index: number) => {
    setSelectedIndex(index);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleNavigate = (newIndex: number) => {
    setSelectedIndex(newIndex);
  };

  if (isLoading) {
    return <GallerySkeleton />;
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center py-16 px-4"
      >
        <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mb-4">
          <AlertCircle size={32} className="text-destructive" />
        </div>
        <h3 className="text-lg font-heading text-foreground mb-2">Failed to load gallery</h3>
        <p className="text-sm text-muted-foreground text-center max-w-md mb-6">
          There was an error loading the gallery. Please try again.
        </p>
        <button
          onClick={() => refetch()}
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-body hover:bg-primary/90 transition-colors"
        >
          <RefreshCw size={16} />
          Try Again
        </button>
      </motion.div>
    );
  }

  if (!sortedImages || sortedImages.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center py-16 px-4"
      >
        <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-4">
          <ImageIcon size={32} className="text-muted-foreground" />
        </div>
        <h3 className="text-lg font-heading text-foreground mb-2">No images yet</h3>
        <p className="text-sm text-muted-foreground text-center max-w-md">
          Check back soon for our curated collection of sacred Rudraksha beads and spiritual jewelry.
        </p>
      </motion.div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-4">
        <AnimatePresence>
          {sortedImages.map((image, index) => (
            <GalleryItem
              key={image.id}
              image={image}
              index={index}
              onClick={() => handleImageClick(index)}
            />
          ))}
        </AnimatePresence>
      </div>

      <GalleryModal
        images={sortedImages}
        currentIndex={selectedIndex ?? 0}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onNavigate={handleNavigate}
      />
    </>
  );
};

export default GalleryGrid;