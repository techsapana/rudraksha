import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import { useAdmin } from "@/contexts/AdminContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Pencil, Trash2, Search, Package, Eye, Upload, X, Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import { ProductResponse, ProductCreateRequest, ProductUpdateRequest } from "@/lib/types";

interface FormData {
  name: string;
  description: string;
  longDescription: string;
  price: string;
  discountPercentage: string;
  categoryId: string;
  images: File[];
}

const emptyForm: FormData = {
  name: "",
  description: "",
  longDescription: "",
  price: "",
  discountPercentage: "",
  categoryId: "",
  images: [],
};

const AdminProducts = () => {
  const navigate = useNavigate();
  const { 
    apiProducts, 
    loadProducts, 
    createProduct, 
    updateProductApi, 
    deleteProductApi, 
    adminCategories, 
    loadCategories,
    productsLoading,
    productsError 
  } = useAdmin();
  
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<number | null>(null);
  const [form, setForm] = useState<FormData>(emptyForm);
  const [searchQuery, setSearchQuery] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState<Record<number, number>>({});

  useEffect(() => {
    loadProducts();
    loadCategories();
  }, []);

  const getCurrentImageIndex = (productId: number) => selectedImageIndex[productId] ?? 0;
  
  const setCurrentImageIndex = (productId: number, index: number) => {
    setSelectedImageIndex(prev => ({ ...prev, [productId]: index }));
  };

  const nextImage = (productId: number, images: string[]) => {
    const current = getCurrentImageIndex(productId);
    setCurrentImageIndex(productId, (current + 1) % images.length);
  };

  const prevImage = (productId: number, images: string[]) => {
    const current = getCurrentImageIndex(productId);
    setCurrentImageIndex(productId, current === 0 ? images.length - 1 : current - 1);
  };

  const openAdd = () => {
    setEditing(null);
    setForm(emptyForm);
    setImagePreviews([]);
    setOpen(true);
  };

  const openEdit = (p: ProductResponse) => {
    setEditing(p.id);
    setForm({
      name: p.name,
      description: p.description || "",
      longDescription: "",
      price: p.price.toString(),
      discountPercentage: p.discountPercentage?.toString() || "",
      categoryId: adminCategories.find(c => c.name === p.category)?.id?.toString() || "",
      images: [],
    });
    setImagePreviews(p.images || []);
    setOpen(true);
  };

  const openDetails = (id: number) => {
    navigate(`/admin/products/${id}`);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setForm(prev => ({ ...prev, images: [...prev.images, ...files] }));
    
    const newPreviews = files.map(file => URL.createObjectURL(file));
    setImagePreviews(prev => [...prev, ...newPreviews]);
  };

  const removeImage = (index: number) => {
    setForm(prev => ({ 
      ...prev, 
      images: prev.images.filter((_, i) => i !== index) 
    }));
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!form.name || !form.price || !form.categoryId) {
      toast.error("Please fill required fields");
      return;
    }

    setSubmitting(true);
    try {
      if (editing) {
        const request: ProductUpdateRequest = {
          name: form.name,
          description: form.description || undefined,
          longDescription: form.longDescription || undefined,
          price: parseFloat(form.price),
          discountPercentage: form.discountPercentage ? parseFloat(form.discountPercentage) : undefined,
          categoryId: parseInt(form.categoryId),
        };
        await updateProductApi(editing, request, form.images.length > 0 ? form.images : undefined);
        toast.success("Product updated", { description: "Changes saved successfully" });
      } else {
        const request: ProductCreateRequest = {
          name: form.name,
          description: form.description || undefined,
          longDescription: form.longDescription || undefined,
          price: parseFloat(form.price),
          discountPercentage: form.discountPercentage ? parseFloat(form.discountPercentage) : undefined,
          categoryId: parseInt(form.categoryId),
        };
        await createProduct(request, form.images);
        toast.success("Product created", { description: `${form.name} has been added to the inventory` });
      }
      setOpen(false);
      loadProducts();
    } catch (error) {
      toast.error(editing ? "Failed to update product" : "Failed to create product");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteProductApi(id);
      toast.success("Product deleted", { description: "Product has been removed" });
    } catch (error) {
      toast.error("Failed to delete product");
    }
  };

  const filteredProducts = apiProducts.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatPrice = (price: number) => `$${price.toFixed(2)}`;

  return (
    <AdminLayout>
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-heading">Manage Products</h1>
            <p className="text-muted-foreground mt-1">{apiProducts.length} products total</p>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button onClick={openAdd} className="w-full sm:w-auto">
                <Plus size={16} />
                <span className="ml-2 hidden sm:inline">Add Product</span>
                <span className="sm:hidden">Add</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editing ? "Edit Product" : "Add Product"}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label>Name *</Label>
                  <Input 
                    value={form.name} 
                    onChange={(e) => setForm({ ...form, name: e.target.value })} 
                    required 
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Price *</Label>
                    <Input 
                      type="number" 
                      step="0.01" 
                      value={form.price} 
                      onChange={(e) => setForm({ ...form, price: e.target.value })} 
                      required 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Discount %</Label>
                    <Input 
                      type="number" 
                      step="0.01" 
                      max="100"
                      value={form.discountPercentage} 
                      onChange={(e) => setForm({ ...form, discountPercentage: e.target.value })} 
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Category *</Label>
                  <Select 
                    value={form.categoryId} 
                    onValueChange={(v) => setForm({ ...form, categoryId: v })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {adminCategories.map((c) => (
                        <SelectItem key={c.id} value={c.id.toString()}>
                          {c.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Short Description</Label>
                  <Textarea 
                    value={form.description} 
                    onChange={(e) => setForm({ ...form, description: e.target.value })} 
                    rows={2} 
                    placeholder="Brief product description"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Long Description</Label>
                  <Textarea 
                    value={form.longDescription} 
                    onChange={(e) => setForm({ ...form, longDescription: e.target.value })} 
                    rows={4} 
                    placeholder="Detailed product information"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Images</Label>
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-4">
                    <div className="flex flex-wrap gap-2">
                      {imagePreviews.map((preview, index) => (
                        <div key={index} className="relative w-20 h-20">
                          <img 
                            src={preview} 
                            alt={`Preview ${index + 1}`} 
                            className="w-full h-full object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1 hover:bg-destructive/80"
                          >
                            <X size={12} />
                          </button>
                        </div>
                      ))}
                      <label className="w-20 h-20 border-2 border-dashed border-muted-foreground/25 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-muted-foreground/50 transition-colors">
                        <Upload size={20} className="text-muted-foreground" />
                        <span className="text-xs text-muted-foreground mt-1">Add</span>
                        <input
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={handleImageChange}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>
                </div>

                <Button type="submit" className="w-full" disabled={submitting}>
                  {submitting && <Loader2 size={16} className="mr-2 animate-spin" />}
                  {editing ? "Update" : "Add"} Product
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
          <Input 
            placeholder="Search products..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {productsLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 size={32} className="animate-spin text-muted-foreground" />
          </div>
        ) : productsError ? (
          <div className="text-center py-12">
            <Package size={40} className="mx-auto text-muted-foreground/30 mb-3" />
            <p className="text-muted-foreground">{productsError}</p>
            <Button variant="outline" onClick={loadProducts} className="mt-4">
              Retry
            </Button>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <Package size={40} className="mx-auto text-muted-foreground/30 mb-3" />
            <p className="text-muted-foreground">No products found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="overflow-hidden group">
                <div className="aspect-square relative overflow-hidden bg-muted">
                  {product.images && product.images.length > 0 ? (
                    <>
                      <img
                        src={product.images[getCurrentImageIndex(product.id)]}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform group-hover:scale-105"
                      />
                      {product.images.length > 1 && (
                        <>
                          <button
                            onClick={(e) => { e.stopPropagation(); prevImage(product.id, product.images); }}
                            className="absolute left-1 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <ChevronLeft size={16} />
                          </button>
                          <button
                            onClick={(e) => { e.stopPropagation(); nextImage(product.id, product.images); }}
                            className="absolute right-1 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <ChevronRight size={16} />
                          </button>
                          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                            {product.images.map((_, idx) => (
                              <button
                                key={idx}
                                onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(product.id, idx); }}
                                className={`w-2 h-2 rounded-full transition-colors ${
                                  idx === getCurrentImageIndex(product.id) 
                                    ? "bg-white" 
                                    : "bg-white/50"
                                }`}
                              />
                            ))}
                          </div>
                        </>
                      )}
                    </>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Package size={40} className="text-muted-foreground/30" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <Button 
                      variant="secondary" 
                      size="icon"
                      onClick={() => openDetails(product.id)}
                    >
                      <Eye size={16} />
                    </Button>
                    <Button 
                      variant="secondary" 
                      size="icon"
                      onClick={() => openEdit(product)}
                    >
                      <Pencil size={16} />
                    </Button>
                  </div>
                  {product.discountPercentage && product.discountPercentage > 0 && (
                    <Badge className="absolute top-2 right-2 bg-destructive">
                      -{product.discountPercentage}%
                    </Badge>
                  )}
                </div>
                <CardHeader className="p-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <h3 className="font-medium truncate">{product.name}</h3>
                      <Badge variant="secondary" className="mt-1 text-xs">
                        {product.category}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-3 pt-0">
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {product.description}
                  </p>
                </CardContent>
                <CardFooter className="p-3 pt-0 flex items-center justify-between">
                  <div>
                    <span className="text-lg font-bold">
                      {formatPrice(product.discountedPrice || product.price)}
                    </span>
                    {product.discountedPrice && product.discountedPrice < product.price && (
                      <span className="text-sm text-muted-foreground line-through ml-2">
                        {formatPrice(product.price)}
                      </span>
                    )}
                  </div>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-destructive hover:text-destructive"
                      >
                        <Trash2 size={14} />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete "{product.name}"?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDelete(product.id)}>
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminProducts;