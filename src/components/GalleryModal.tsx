import { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { GalleryImage } from "@/services/galleryApi";

interface GalleryModalProps {
  images: GalleryImage[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

const GalleryModal = ({ images, currentIndex, isOpen, onClose, onNavigate }: GalleryModalProps) => {
  const totalImages = images.length;

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") {
        const newIndex = currentIndex > 0 ? currentIndex - 1 : totalImages - 1;
        onNavigate(newIndex);
      }
      if (e.key === "ArrowRight") {
        const newIndex = currentIndex < totalImages - 1 ? currentIndex + 1 : 0;
        onNavigate(newIndex);
      }
    },
    [currentIndex, onClose, onNavigate, totalImages]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleKeyDown]);

  const goToPrevious = () => {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : totalImages - 1;
    onNavigate(newIndex);
  };
  const goToNext = () => {
    const newIndex = currentIndex < totalImages - 1 ? currentIndex + 1 : 0;
    onNavigate(newIndex);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-background/98 backdrop-blur-md flex items-center justify-center"
          onClick={onClose}
        >
          <button
            className="absolute top-6 right-6 z-10 w-10 h-10 rounded-full bg-background/80 border border-border flex items-center justify-center hover:bg-background hover:border-primary/40 transition-all"
            onClick={onClose}
          >
            <X size={20} />
          </button>

          {totalImages > 1 && (
            <>
              <button
                className="absolute left-4 md:left-8 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-background/80 border border-border flex items-center justify-center hover:bg-background hover:border-primary/40 transition-all"
                onClick={(e) => {
                  e.stopPropagation();
                  goToPrevious();
                }}
              >
                <ChevronLeft size={20} className="md:w-6 md:h-6" />
              </button>

              <button
                className="absolute right-4 md:right-8 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-background/80 border border-border flex items-center justify-center hover:bg-background hover:border-primary/40 transition-all"
                onClick={(e) => {
                  e.stopPropagation();
                  goToNext();
                }}
              >
                <ChevronRight size={20} className="md:w-6 md:h-6" />
              </button>
            </>
          )}

          <div className="w-full max-w-6xl px-16" onClick={(e) => e.stopPropagation()}>
            <motion.img
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              src={images[currentIndex].imageUrl}
              alt={`Gallery image ${currentIndex + 1}`}
              className="w-full h-[80vh] md:h-[85vh] object-contain rounded-2xl shadow-2xl"
            />

            <div className="flex items-center justify-center gap-2 mt-4">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  className={`w-2 h-2 rounded-full transition-all ${
                    idx === currentIndex
                      ? "bg-primary w-6"
                      : "bg-border hover:bg-primary/50"
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onNavigate(idx);
                  }}
                />
              ))}
            </div>

            <p className="text-center text-muted-foreground text-sm mt-2 font-body">
              {currentIndex + 1} / {images.length}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GalleryModal;