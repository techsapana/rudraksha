import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { 
  ArrowLeft, 
  ShoppingBag, 
  AlertCircle, 
  ChevronLeft, 
  ChevronRight,
  Check,
  Star,
  Heart,
  Share2,
  Shield,
  Truck,
  RotateCcw
} from "lucide-react";
import Layout from "@/components/Layout";
import ProductCard from "@/components/ProductCard";
import { publicProductService } from "@/services/publicProductService";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const { data: product, isLoading, error } = useQuery({
    queryKey: ["product-detail", id],
    queryFn: async () => {
      console.log("Fetching product detail for id:", id);
      const result = await publicProductService.getDetail(Number(id));
      console.log("Product detail response:", result);
      return result;
    },
    enabled: !!id,
    retry: 1,
    retryDelay: 1000,
  });

  const { data: allProducts } = useQuery({
    queryKey: ["products"],
    queryFn: () => publicProductService.getAll(),
    staleTime: 5 * 60 * 1000,
  });

  const related = allProducts?.filter(
    (p) => p.category === product?.category && p.id !== product.id
  ).slice(0, 4) || [];

  const handleAddToCart = () => {
    if (product) {
      toast.success(`${product.name} added to cart!`, {
        description: "Continue shopping or proceed to checkout",
      });
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <section className="py-12 lg:py-20 bg-background">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="animate-pulse mb-8 h-4 w-32 bg-secondary rounded" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
              <div className="aspect-square bg-secondary rounded-xl animate-pulse" />
              <div className="space-y-4">
                <div className="h-4 w-24 bg-secondary rounded animate-pulse" />
                <div className="h-8 w-3/4 bg-secondary rounded animate-pulse" />
                <div className="h-10 w-32 bg-secondary rounded animate-pulse" />
                <div className="h-20 w-full bg-secondary rounded animate-pulse" />
              </div>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  if (error || !product) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-32 text-center">
          <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center mb-4 mx-auto">
            <AlertCircle className="w-8 h-8 text-red-500" />
          </div>
          <h1 className="text-2xl font-heading text-foreground mb-4">Product Not Found</h1>
          <p className="text-muted-foreground mb-6">The product you're looking for doesn't exist or has been removed.</p>
          <Link to="/products" className="inline-flex items-center gap-2 text-primary hover:underline font-body">
            <ArrowLeft size={14} /> Back to Products
          </Link>
        </div>
      </Layout>
    );
  }

  const hasDiscount = product.discountPercentage > 0;
  const images = product.images && product.images.length > 0 
    ? product.images 
    : ["https://images.unsplash.com/photo-1600618528240-fb9fc964b853?w=800&q=80"];

  return (
    <Layout>
      <section className="pt-24 pb-16 lg:pt-32 lg:pb-24 bg-gradient-to-b from-background via-background to-secondary/20">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Link 
              to="/products" 
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-4 font-body transition-colors group"
            >
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
              Back to Products
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            <div className="space-y-4">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative aspect-square rounded-2xl overflow-hidden bg-secondary/50 border border-border group"
              >
                <AnimatePresence mode="wait">
                  <motion.img
                    key={selectedImageIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    src={images[selectedImageIndex]}
                    alt={product.name}
                    className={`w-full h-full object-cover cursor-zoom-in transition-transform duration-300 ${isZoomed ? 'scale-150' : 'group-hover:scale-105'}`}
                    onClick={() => setIsZoomed(!isZoomed)}
                  />
                </AnimatePresence>
                
                {hasDiscount && (
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-orange-500 text-white text-sm font-bold px-4 py-2 rounded-lg shadow-lg">
                    {product.discountPercentage}% OFF
                  </div>
                )}

                <div className="absolute top-4 right-4 flex flex-col gap-2">
                  <button className="w-10 h-10 bg-background/90 backdrop-blur-sm rounded-full flex items-center justify-center text-muted-foreground hover:text-red-500 hover:bg-background transition-colors shadow-lg">
                    <Heart size={18} />
                  </button>
                  <button className="w-10 h-10 bg-background/90 backdrop-blur-sm rounded-full flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-background transition-colors shadow-lg">
                    <Share2 size={18} />
                  </button>
                </div>

                {images.length > 1 && (
                  <>
                    <button
                      onClick={() => setSelectedImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-background/90 backdrop-blur-sm rounded-full flex items-center justify-center text-foreground hover:bg-background transition-colors shadow-lg"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button
                      onClick={() => setSelectedImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-background/90 backdrop-blur-sm rounded-full flex items-center justify-center text-foreground hover:bg-background transition-colors shadow-lg"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </>
                )}
              </motion.div>

              {images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImageIndex(idx)}
                      className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                        selectedImageIndex === idx 
                          ? 'border-primary shadow-lg shadow-primary/20' 
                          : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt={`${product.name} ${idx + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-6"
            >
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-body font-medium tracking-wider text-primary bg-primary/10 px-3 py-1 rounded-full uppercase">
                    {product.category.replace(/-/g, " ")}
                  </span>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} className="text-yellow-400 fill-yellow-400" />
                    ))}
                    <span className="text-xs text-muted-foreground ml-1">(0)</span>
                  </div>
                </div>
                <h1 className="text-2xl lg:text-4xl font-heading text-foreground mb-4 leading-tight">
                  {product.name}
                </h1>
              </div>

              <div className="flex items-baseline gap-4 pb-6 border-b border-border">
                <span className="text-3xl lg:text-4xl font-body font-bold text-gradient-gold">
                  ${Number(product.discountedPrice).toFixed(2)}
                </span>
                {hasDiscount && (
                  <>
                    <span className="text-lg text-muted-foreground line-through">
                      ${Number(product.price).toFixed(2)}
                    </span>
                    <span className="text-sm font-medium text-green-500 bg-green-500/10 px-2 py-1 rounded">
                      Save ${(Number(product.price) - Number(product.discountedPrice)).toFixed(2)}
                    </span>
                  </>
                )}
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-heading tracking-wider text-foreground">DESCRIPTION</h3>
                <p className="text-muted-foreground font-body leading-relaxed">
                  {product.longDescription || product.description}
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4 py-6 border-y border-border">
                <div className="flex flex-col items-center text-center p-3 bg-secondary/30 rounded-xl">
                  <Shield className="w-6 h-6 text-primary mb-2" />
                  <span className="text-xs font-body text-muted-foreground">Authenticity<br/>Certificate</span>
                </div>
                <div className="flex flex-col items-center text-center p-3 bg-secondary/30 rounded-xl">
                  <Truck className="w-6 h-6 text-primary mb-2" />
                  <span className="text-xs font-body text-muted-foreground">Free<br/>Shipping</span>
                </div>
                <div className="flex flex-col items-center text-center p-3 bg-secondary/30 rounded-xl">
                  <RotateCcw className="w-6 h-6 text-primary mb-2" />
                  <span className="text-xs font-body text-muted-foreground">30-Day<br/>Returns</span>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 flex items-center justify-center gap-3 bg-primary text-primary-foreground px-8 py-4 rounded-xl font-body font-semibold text-sm tracking-wide hover:opacity-90 transition-all shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30"
                >
                  <ShoppingBag size={20} />
                  Add to Cart
                </button>
                <button className="w-14 h-14 flex items-center justify-center bg-secondary text-foreground rounded-xl hover:bg-primary hover:text-primary-foreground transition-colors">
                  <Heart size={20} />
                </button>
              </div>

              <div className="bg-secondary/30 rounded-xl p-4 space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Check size={16} className="text-green-500" />
                  <span>100% Authentic Rudraksha beads</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Check size={16} className="text-green-500" />
                  <span>Lab certified authenticity</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Check size={16} className="text-green-500" />
                  <span>Energized by experts</span>
                </div>
              </div>
            </motion.div>
          </div>

          {related.length > 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-20 lg:mt-28"
            >
              <h2 className="text-2xl font-heading text-gradient-gold mb-8">Related Products</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {related.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default ProductDetail;