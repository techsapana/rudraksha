import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Products" },
  { to: "/gallery", label: "Gallery" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/95 backdrop-blur-2xl shadow-lg shadow-black/5"
          : "bg-background/80 backdrop-blur-xl"
      } border-b ${
        scrolled ? "border-gold/20" : "border-transparent"
      }`}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link
            to="/"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex flex-col cursor-pointer"
          >
            <span className="text-2xl lg:text-3xl font-heading font-bold tracking-wider text-gradient-gold hover:opacity-80 transition-opacity">
              SHAMBO Rudraksha
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setIsOpen(false)}
                    className={`group relative block py-3 px-4 text-base font-heading font-semibold tracking-wide rounded-xl transition-all ${
                      location.pathname === link.to
                        ? "text-primary bg-primary/5"
                        : "text-foreground hover:text-primary hover:bg-secondary/50"
                    }`}
                  >
                <span className="relative z-10">{link.label}</span>
                {location.pathname === link.to && (
                  <motion.div
                    layoutId="navIndicator"
                    className="absolute inset-0 bg-primary/8 rounded-lg -z-0"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-gold rounded-full transition-all duration-300 group-hover:w-3" />
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button className="relative p-2.5 text-muted-foreground hover:text-primary transition-all duration-300 hover:bg-primary/5 rounded-lg group">
              <ShoppingBag size={20} className="group-hover:scale-110 transition-transform" />
              <span className="absolute top-1 right-1 w-4.5 h-4.5 bg-gradient-gold text-white text-[9px] font-bold rounded-full flex items-center justify-center shadow-lg">
                0
              </span>
            </button>
            <button
              className="lg:hidden p-2.5 text-foreground hover:bg-secondary rounded-lg transition-colors"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-background/98 backdrop-blur-2xl border-t border-gold/10"
          >
            <div className="container mx-auto px-4 py-6 flex flex-col gap-1">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    to={link.to}
                    onClick={() => setIsOpen(false)}
                    className={`block py-3 px-4 text-base font-heading font-semibold tracking-wide rounded-xl transition-all ${
                      location.pathname === link.to
                        ? "text-primary bg-primary/5"
                        : "text-foreground hover:text-primary hover:bg-secondary/50"
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;