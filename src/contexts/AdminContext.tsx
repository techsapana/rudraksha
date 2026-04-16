import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { Product, products as initialProducts, galleryImages as initialGallery } from "@/lib/data";
import { categoryService } from "@/services/categoryService";
import { productService } from "@/services/productService";
import { galleryService, GalleryResponse, GalleryUpdateRequest } from "@/services/galleryService";
import { CategoryResponse, CategoryRequest, ProductResponse, ProductDetailResponse, ProductCreateRequest, ProductUpdateRequest } from "@/lib/types";
import { toast } from "sonner";

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: string;
}

interface AdminContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  token: string | null;
  products: Product[];
  addProduct: (p: Omit<Product, "id">) => void;
  updateProduct: (id: string, p: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  adminCategories: CategoryResponse[];
  loadCategories: () => Promise<void>;
  addCategory: (request: CategoryRequest) => Promise<void>;
  updateCategory: (id: number, request: CategoryRequest) => Promise<void>;
  deleteCategory: (id: number) => Promise<void>;
  categoryStats: { totalCategories: number } | null;
  loadCategoryStats: () => Promise<void>;
  gallery: GalleryImage[];
  addGalleryImage: (g: Omit<GalleryImage, "id">) => void;
  deleteGalleryImage: (id: string) => void;
  apiGallery: GalleryResponse[];
  loadGallery: () => Promise<void>;
  createGalleryBulk: (images: File[], displayOrders?: number[]) => Promise<void>;
  updateGalleryMeta: (id: number, request: GalleryUpdateRequest) => Promise<void>;
  deleteGalleryApi: (id: number) => Promise<void>;
  galleryLoading: boolean;
  galleryError: string | null;
  categoriesLoading: boolean;
  categoriesError: string | null;
  apiProducts: ProductResponse[];
  loadProducts: () => Promise<void>;
  loadProductDetail: (id: number) => Promise<ProductDetailResponse>;
  createProduct: (request: ProductCreateRequest, images: File[]) => Promise<void>;
  updateProductApi: (id: number, request: ProductUpdateRequest, images?: File[]) => Promise<void>;
  deleteProductApi: (id: number) => Promise<void>;
  productsLoading: boolean;
  productsError: string | null;
  productStats: { totalProducts: number; activeProducts: number; totalValue: number } | null;
  loadProductStats: () => Promise<void>;
}

const AdminContext = createContext<AdminContextType | null>(null);

export const useAdmin = () => {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error("useAdmin must be used within AdminProvider");
  return ctx;
};

export const AdminProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => localStorage.getItem("admin_token") !== null);
  const [token, setToken] = useState<string | null>(() => localStorage.getItem("admin_token"));
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [adminCategories, setCategories] = useState<CategoryResponse[]>([]);
  const [categoryStats, setCategoryStats] = useState<{ totalCategories: number } | null>(null);
  const [categoriesLoading, setCategoriesLoading] = useState(false);
  const [categoriesError, setCategoriesError] = useState<string | null>(null);
  const [gallery, setGallery] = useState<GalleryImage[]>(initialGallery);
  const [apiGallery, setApiGallery] = useState<GalleryResponse[]>([]);
  const [galleryLoading, setGalleryLoading] = useState(false);
  const [galleryError, setGalleryError] = useState<string | null>(null);
  const [apiProducts, setApiProducts] = useState<ProductResponse[]>([]);
  const [productsLoading, setProductsLoading] = useState(false);
  const [productsError, setProductsError] = useState<string | null>(null);
  const [productStats, setProductStats] = useState<{ totalProducts: number; activeProducts: number; totalValue: number } | null>(null);

  useEffect(() => {
    if (token) {
      localStorage.setItem("admin_token", token);
      setIsAuthenticated(true);
    } else {
      localStorage.removeItem("admin_token");
      setIsAuthenticated(false);
    }
  }, [token]);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch("http://localhost:8090/api/auth/login", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      
      if (!response.ok) {
        return false;
      }
      
      const data = await response.json();
      
      let authToken = null;
      if (data.success && data.data?.token) {
        authToken = data.data.token;
      } else if (data.token) {
        authToken = data.token;
      }
      
      if (authToken) {
        localStorage.setItem("admin_token", authToken);
        setToken(authToken);
        setIsAuthenticated(true);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("admin_token");
    setToken(null);
    setIsAuthenticated(false);
  };

  const loadCategories = async () => {
    setCategoriesLoading(true);
    setCategoriesError(null);
    try {
      const categories = await categoryService.getAll();
      setCategories(categories);
    } catch (error) {
      setCategoriesError(error instanceof Error ? error.message : "Failed to load categories");
      toast.error("Failed to load categories");
    } finally {
      setCategoriesLoading(false);
    }
  };

  const loadCategoryStats = async () => {
    try {
      const stats = await categoryService.getStats();
      setCategoryStats(stats);
    } catch (error) {
      console.error("Failed to load category stats:", error);
    }
  };

  const addCategory = async (request: CategoryRequest) => {
    try {
      const created = await categoryService.create(request);
      setCategories(prev => [...prev, created]);
      toast.success("Category created successfully");
    } catch (error) {
      toast.error("Failed to create category");
      throw error;
    }
  };

  const updateCategory = async (id: number, request: CategoryRequest) => {
    try {
      const updated = await categoryService.update(id, request);
      setCategories(prev => prev.map(c => c.id === id ? updated : c));
      toast.success("Category updated successfully");
    } catch (error) {
      toast.error("Failed to update category");
      throw error;
    }
  };

  const deleteCategory = async (id: number) => {
    try {
      await categoryService.delete(id);
      setCategories(prev => prev.filter(c => c.id !== id));
      toast.success("Category deleted successfully");
    } catch (error) {
      toast.error("Failed to delete category");
      throw error;
    }
  };

  const addProduct = (p: Omit<Product, "id">) => {
    setProducts((prev) => [...prev, { ...p, id: crypto.randomUUID() }]);
  };
  const updateProduct = (id: string, p: Partial<Product>) => {
    setProducts((prev) => prev.map((x) => (x.id === id ? { ...x, ...p } : x)));
  };
  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((x) => x.id !== id));
  };

  const addGalleryImage = (g: Omit<GalleryImage, "id">) => {
    setGallery((prev) => [...prev, { ...g, id: crypto.randomUUID() }]);
  };
  const deleteGalleryImage = (id: string) => {
    setGallery((prev) => prev.filter((x) => x.id !== id));
  };

  const loadGallery = async () => {
    setGalleryLoading(true);
    setGalleryError(null);
    try {
      const data = await galleryService.getAll();
      setApiGallery(data);
    } catch (error) {
      setGalleryError(error instanceof Error ? error.message : "Failed to load gallery");
      toast.error("Failed to load gallery");
    } finally {
      setGalleryLoading(false);
    }
  };

  const createGalleryBulk = async (images: File[], displayOrders?: number[]) => {
    try {
      const created = await galleryService.createBulk(images, displayOrders);
      setApiGallery((prev) => [...prev, ...created]);
      toast.success("Gallery images uploaded successfully");
    } catch (error) {
      toast.error("Failed to upload gallery images");
      throw error;
    }
  };

  const updateGalleryMeta = async (id: number, request: GalleryUpdateRequest) => {
    try {
      const updated = await galleryService.updateMeta(id, request);
      setApiGallery((prev) => prev.map((g) => (g.id === id ? updated : g)));
      toast.success("Gallery image updated successfully");
    } catch (error) {
      toast.error("Failed to update gallery image");
      throw error;
    }
  };

  const deleteGalleryApi = async (id: number) => {
    try {
      await galleryService.delete(id);
      setApiGallery((prev) => prev.filter((g) => g.id !== id));
      toast.success("Gallery image deleted successfully");
    } catch (error) {
      toast.error("Failed to delete gallery image");
      throw error;
    }
  };

  const loadProducts = async () => {
    setProductsLoading(true);
    setProductsError(null);
    try {
      const data = await productService.getAll();
      setApiProducts(data);
    } catch (error) {
      setProductsError(error instanceof Error ? error.message : "Failed to load products");
      toast.error("Failed to load products");
    } finally {
      setProductsLoading(false);
    }
  };

  const loadProductDetail = async (id: number): Promise<ProductDetailResponse> => {
    return productService.getDetail(id);
  };

  const createProduct = async (request: ProductCreateRequest, images: File[]) => {
    try {
      const created = await productService.create(request, images);
      setApiProducts(prev => [...prev, created]);
      toast.success("Product created successfully");
    } catch (error) {
      toast.error("Failed to create product");
      throw error;
    }
  };

  const updateProductApi = async (id: number, request: ProductUpdateRequest, images?: File[]) => {
    try {
      const updated = await productService.update(id, request, images);
      setApiProducts(prev => prev.map(p => p.id === id ? updated : p));
      toast.success("Product updated successfully");
    } catch (error) {
      toast.error("Failed to update product");
      throw error;
    }
  };

  const deleteProductApi = async (id: number) => {
    try {
      await productService.delete(id);
      setApiProducts(prev => prev.filter(p => p.id !== id));
      toast.success("Product deleted successfully");
    } catch (error) {
      toast.error("Failed to delete product");
      throw error;
    }
  };

  const loadProductStats = async () => {
    try {
      const stats = await productService.getStats();
      setProductStats(stats);
    } catch (error) {
      console.error("Failed to load product stats:", error);
    }
  };

  return (
    <AdminContext.Provider value={{ 
      isAuthenticated, 
      login, 
      logout, 
      token, 
      products, 
      addProduct, 
      updateProduct, 
      deleteProduct, 
      adminCategories, 
      loadCategories,
      addCategory, 
      updateCategory, 
      deleteCategory,
      categoryStats,
      loadCategoryStats,
      gallery, 
      addGalleryImage, 
      deleteGalleryImage,
      apiGallery,
      loadGallery,
      createGalleryBulk,
      updateGalleryMeta,
      deleteGalleryApi,
      galleryLoading,
      galleryError,
      categoriesLoading,
      categoriesError,
      apiProducts,
      loadProducts,
      loadProductDetail,
      createProduct,
      updateProductApi,
      deleteProductApi,
      productsLoading,
      productsError,
      productStats,
      loadProductStats
    }}>
      {children}
    </AdminContext.Provider>
  );
};
