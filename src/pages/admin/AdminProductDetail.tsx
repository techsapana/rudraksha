import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import { useAdmin } from "@/contexts/AdminContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ArrowLeft, ArrowRight, Pencil, Package, Loader2, DollarSign, Tag, Calendar, FileText, ImageIcon, Trash2, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import { ProductDetailResponse } from "@/lib/types";

const AdminProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
   const { loadProductDetail, deleteProductApi, adminCategories } = useAdmin();
  
  const [product, setProduct] = useState<ProductDetailResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [imageIndex, setImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("overview");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (id) {
      loadProductData(parseInt(id));
    }
  }, [id]);

  const loadProductData = async (productId: number) => {
    setLoading(true);
    try {
      const data = await loadProductDetail(productId);
      setProduct(data);
      setImageIndex(0);
    } catch (error) {
      toast.error("Failed to load product");
      navigate("/admin/products");
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price: number) => `$${price.toFixed(2)}`;

  const nextImage = () => {
    if (product?.images) {
      setImageIndex(prev => (prev + 1) % product.images.length);
    }
  };

   const prevImage = () => {
     if (product?.images) {
       setImageIndex(prev => prev === 0 ? product.images.length - 1 : prev - 1);
     }
   };

   const handleDelete = async () => {
     if (!product) return;
     setDeleting(true);
     try {
       await deleteProductApi(product.id);
       toast.success("Product deleted successfully");
       navigate("/admin/products");
     } catch (error) {
       toast.error("Failed to delete product");
     } finally {
       setDeleting(false);
       setDeleteDialogOpen(false);
     }
   };

   if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 size={32} className="animate-spin text-muted-foreground" />
        </div>
      </AdminLayout>
    );
  }

  if (!product) {
    return (
      <AdminLayout>
        <div className="text-center py-12">
          <Package size={48} className="mx-auto text-muted-foreground/30 mb-4" />
          <p className="text-muted-foreground">Product not found</p>
          <Button onClick={() => navigate("/admin/products")} className="mt-4">
            Back to Products
          </Button>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate("/admin/products")}>
              <ArrowLeft size={20} />
            </Button>
            <div>
              <h1 className="text-2xl font-heading">{product.name}</h1>
              <p className="text-muted-foreground text-sm">Product Details</p>
            </div>
          </div>
            <div className="flex items-center gap-2">
              {/* <Button variant="destructive" onClick={() => setDeleteDialogOpen(true)}>
                <Trash2 size={16} className="mr-2" />
                Delete
              </Button> */}
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ImageIcon size={20} />
                  Product Images
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative aspect-square rounded-lg overflow-hidden bg-muted">
                  {product.images && product.images.length > 0 ? (
                    <>
                      <img
                        src={product.images[imageIndex]}
                        alt={`${product.name} ${imageIndex + 1}`}
                        className="w-full h-full object-contain"
                      />
                      {product.images.length > 1 && (
                        <>
                          <button
                            onClick={prevImage}
                            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors"
                          >
                            <ArrowLeft size={20} />
                          </button>
                          <button
                            onClick={nextImage}
                            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors"
                          >
                            <ArrowRight size={20} />
                          </button>
                          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
                            {imageIndex + 1} / {product.images.length}
                          </div>
                        </>
                      )}
                    </>
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center">
                      <Package size={60} className="text-muted-foreground/30 mb-2" />
                      <p className="text-muted-foreground">No images available</p>
                    </div>
                  )}
                </div>
                {product.images && product.images.length > 1 && (
                  <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
                    {product.images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setImageIndex(idx)}
                        className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all hover:scale-105 ${
                          idx === imageIndex 
                            ? "border-primary ring-2 ring-primary/30" 
                            : "border-transparent hover:border-muted-foreground"
                        }`}
                      >
                        <img
                          src={img}
                          alt={`Thumbnail ${idx + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
</CardContent>
            </Card>
          </div>

            <Card>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="w-full justify-start rounded-none border-b bg-transparent">
                  <TabsTrigger value="overview" className="data-[state=active]:bg-muted">Overview</TabsTrigger>
                  <TabsTrigger value="description" className="data-[state=active]:bg-muted">Description</TabsTrigger>
                  <TabsTrigger value="pricing" className="data-[state=active]:bg-muted">Pricing</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="mt-4 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-2 text-muted-foreground mb-1">
                        <Tag size={16} />
                        <span className="text-sm">Category</span>
                      </div>
                      <p className="font-medium">{product.category}</p>
                    </div>
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-2 text-muted-foreground mb-1">
                        <DollarSign size={16} />
                        <span className="text-sm">Price</span>
                      </div>
                      <p className="font-medium">{formatPrice(product.price)}</p>
                    </div>
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-2 text-muted-foreground mb-1">
                        <Tag size={16} />
                        <span className="text-sm">Discount</span>
                      </div>
                      <p className="font-medium">
                        {product.discountPercentage ? `${product.discountPercentage}%` : "0%"}
                      </p>
                    </div>
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-2 text-muted-foreground mb-1">
                        <DollarSign size={16} />
                        <span className="text-sm">Final Price</span>
                      </div>
                      <p className="font-medium text-green-600">
                        {formatPrice(product.discountedPrice || product.price)}
                      </p>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="description" className="mt-4 space-y-4">
                  <div>
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <FileText size={16} />
                      Short Description
                    </h4>
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <p className="text-sm whitespace-pre-wrap">
                        {product.description || "No description provided"}
                      </p>
                    </div>
                  </div>
                  {product.longDescription && (
                    <div>
                      <h4 className="font-medium mb-2 flex items-center gap-2">
                        <FileText size={16} />
                        Long Description
                      </h4>
                      <div className="p-4 bg-muted/50 rounded-lg">
                        <p className="text-sm whitespace-pre-wrap">{product.longDescription}</p>
                      </div>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="pricing" className="mt-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-normal text-muted-foreground">Original Price</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-2xl font-bold">{formatPrice(product.price)}</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-normal text-muted-foreground">Discount</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-2xl font-bold text-destructive">
                          {product.discountPercentage ? `-${product.discountPercentage}%` : "0%"}
                        </p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-normal text-muted-foreground">Final Price</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-2xl font-bold text-green-600">
                          {formatPrice(product.discountedPrice || product.price)}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Quick Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Product ID</span>
                  <span className="font-mono text-sm">#{product.id}</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Category</span>
                  <Badge variant="secondary">{product.category}</Badge>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Images</span>
                  <span className="font-medium">{product.images?.length || 0}</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Discount</span>
                  <Badge variant={product.discountPercentage && product.discountPercentage > 0 ? "destructive" : "secondary"}>
                    {product.discountPercentage ? `${product.discountPercentage}% OFF` : "No Discount"}
                  </Badge>
                </div>
</CardContent>
            </Card>
          </div>
        </div>

    
    </AdminLayout>
  );
};
export default AdminProductDetail;