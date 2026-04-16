import { ReactNode, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, Package, FolderOpen, Image, LogOut, Menu, X, ChevronLeft, Settings2 } from "lucide-react";
import { useAdmin } from "@/contexts/AdminContext";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

const menuItems = [
  { to: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin/products", label: "Products", icon: Package },
  { to: "/admin/categories", label: "Categories", icon: FolderOpen },
  { to: "/admin/gallery", label: "Gallery", icon: Image },
];

const AdminLayout = ({ children }: { children: ReactNode }) => {
  const { logout } = useAdmin();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    toast.success("Logged out", { description: "You have been logged out successfully" });
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-muted/20 via-background to-muted/10">
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-gradient-to-b from-foreground via-foreground to-foreground/95 text-background transform transition-transform duration-300 ease-in-out ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 flex flex-col shrink-0 shadow-2xl lg:shadow-none`}>
        <div className="p-6 border-b border-background/10 relative">
          <button onClick={() => setSidebarOpen(false)} className="absolute right-3 top-3 lg:hidden p-1 hover:bg-background/10 rounded-md transition-colors">
            <X size={20} />
          </button>
          <h2 className="font-heading text-xl tracking-[0.2em] text-primary font-bold">SHAMBO</h2>
          <div className="flex items-center gap-2 mt-1">
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <p className="text-xs text-background/60 font-medium">Admin Panel</p>
          </div>
        </div>
        
        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const active = location.pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all duration-200 ${active ? "bg-gradient-to-r from-primary/20 to-primary/5 text-primary border-l-3 border-primary shadow-sm" : "text-background/60 hover:text-background hover:bg-background/10 hover:translate-x-1"}`}
              >
                <item.icon size={18} className={active ? "text-primary" : "text-background/60"} />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>
        
        <div className="p-4 border-t border-background/10">
          <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-background/60 hover:text-destructive hover:bg-destructive/10 transition-all duration-200 w-full">
            <LogOut size={18} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 min-h-screen">
        <header className="sticky top-0 z-40 lg:hidden bg-background/80 backdrop-blur-md border-b px-4 py-3 flex items-center justify-between">
          <button onClick={() => setSidebarOpen(true)} className="p-2 rounded-lg hover:bg-muted transition-colors">
            <Menu size={24} />
          </button>
          <h2 className="font-heading text-lg tracking-wider text-primary">SHAMBO</h2>
          <div className="w-10" />
        </header>
        
        <div className="p-4 lg:p-6 xl:p-8 overflow-auto">
          <div className="max-w-7xl mx-auto">{children}</div>
        </div>
      </main>

      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}
    </div>
  );
};

export default AdminLayout;