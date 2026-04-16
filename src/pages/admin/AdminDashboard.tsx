import { useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { useAdmin } from "@/contexts/AdminContext";
import { Card, CardContent } from "@/components/ui/card";
import { Package, FolderOpen, Image, Loader2, TrendingUp } from "lucide-react";

const AdminDashboard = () => {
  const { 
    apiProducts,
    adminCategories, 
    gallery, 
    categoryStats, 
    loadCategoryStats, 
    loadCategories, 
    categoriesLoading,
    productStats,
    loadProductStats,
    productsLoading,
  } = useAdmin();

  useEffect(() => {
    loadCategoryStats();
    loadCategories();
    loadProductStats();
  }, []);

  const stats = [
    { 
      label: "Total Products", 
      value: productStats?.totalProducts ?? 0, 
      icon: Package, 
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    { 
      label: "Total Categories", 
      value: categoryStats?.totalCategories ?? 0, 
      icon: FolderOpen, 
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    { 
      label: "Gallery Items", 
      value: gallery.length, 
      icon: Image, 
      color: "text-emerald-500",
      bgColor: "bg-emerald-500/10",
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-heading">Dashboard</h1>
            <p className="text-muted-foreground mt-1">Welcome back! Here's an overview of your store.</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 px-4 py-2 rounded-full w-fit">
            <TrendingUp size={16} className="text-emerald-500" />
            <span>Live data</span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 lg:gap-4">
          {stats.map((s) => (
            <Card key={s.label} className="shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-none bg-gradient-to-br from-card to-card/50 overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-transparent to-background/5 rounded-full -translate-y-1/2 translate-x-1/2" />
              <CardContent className="p-4 sm:p-5 relative">
                <div className={`w-10 h-10 rounded-xl ${s.bgColor} flex items-center justify-center mb-3`}>
                  <s.icon size={20} className={s.color} />
                </div>
                <p className="text-xs text-muted-foreground truncate">{s.label}</p>
                {productsLoading && s.label.includes("Products") ? (
                  <Loader2 className="h-7 w-7 animate-spin text-muted-foreground/50 mt-1" />
                ) : categoriesLoading && s.label.includes("Categories") ? (
                  <Loader2 className="h-7 w-7 animate-spin text-muted-foreground/50 mt-1" />
                ) : (
                  <p className="text-xl sm:text-2xl font-heading mt-0.5">{s.value}</p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="shadow-md">
            <CardContent className="p-6">
              <h3 className="font-heading text-lg mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { label: "Add Product", href: "/admin/products", icon: Package },
                  { label: "Add Category", href: "/admin/categories", icon: FolderOpen },
                  { label: "Gallery", href: "/admin/gallery", icon: Image },
                ].map((action) => (
                  <a
                    key={action.label}
                    href={action.href}
                    className="flex flex-col items-center gap-2 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors text-center"
                  >
                    <action.icon size={20} className="text-primary" />
                    <span className="text-sm font-medium">{action.label}</span>
                  </a>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-md">
            <CardContent className="p-6">
              <h3 className="font-heading text-lg mb-4">Latest Products</h3>
              <div className="space-y-3">
                {apiProducts.slice(0, 3).map((product) => (
                  <div key={product.id} className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Package size={18} className="text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{product.name}</p>
                      <p className="text-xs text-muted-foreground">${product.price.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
                {apiProducts.length === 0 && (
                  <p className="text-muted-foreground text-sm">No products yet</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;