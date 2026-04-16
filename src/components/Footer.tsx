import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Instagram, Facebook, Youtube } from "lucide-react";
import { motion } from "framer-motion";

const socialLinks = [
  { icon: Instagram, label: "Instagram" },
  { icon: Facebook, label: "Facebook" },
  { icon: Youtube, label: "Youtube" },
];

const Footer = () => (
  <footer className="bg-black text-black relative overflow-hidden">
    {/* Background decoration */}
    <div className="absolute inset-0">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
      <div className="absolute top-20 left-1/4 w-96 h-96 rounded-full bg-amber-500/5 blur-3xl" />
      <div className="absolute bottom-20 right-1/4 w-80 h-80 rounded-full bg-amber-500/5 blur-3xl" />
    </div>

    <div className="container mx-auto px-4 lg:px-8 py-16 lg:py-20 relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        <div className="lg:pr-8">
          <Link to="/" className="inline-block">
            <h3 className="text-2xl font-heading font-bold tracking-wider text-amber-400 mb-4">SHAMBO</h3>
          </Link>
          <p className="text-sm text-gray-400 leading-relaxed mb-6">
            Authentic, lab-certified Rudraksha beads sourced directly from Nepal and Indonesia. Serving spiritual seekers worldwide since 2010.
          </p>
          <div className="flex gap-3">
            {socialLinks.map((social, i) => (
              <motion.a
                key={i}
                href="#"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400 hover:bg-amber-500 hover:text-black transition-all duration-300"
                aria-label={social.label}
              >
                <social.icon size={18} />
              </motion.a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-heading text-sm font-semibold tracking-[0.15em] text-black mb-5">QUICK LINKS</h4>
          <div className="flex flex-col gap-3">
            {[
              { to: "/", label: "Home" },
              { to: "/products", label: "Products" },
              { to: "/gallery", label: "Gallery" },
              { to: "/faq", label: "FAQ" },
              { to: "/contact", label: "Contact" },
            ].map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-sm text-gray-400 hover:text-amber-400 transition-all duration-300 hover:translate-x-1"
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/products"
              className="text-sm text-amber-400 hover:text-amber-300 transition-all duration-300 hover:translate-x-1 mt-2"
            >
              View All Products →
            </Link>
          </div>
        </div>

        <div>
          <h4 className="font-heading text-sm font-semibold tracking-[0.15em] text-black mb-5">CATEGORIES</h4>
          <div className="flex flex-col gap-3">
            {["Siddha Mala", "Saraswati Mala", "Bracelets", "Rare Rudraksha", "Loose Beads"].map((cat) => (
              <Link
                key={cat}
                to="/products"
                className="text-sm text-gray-400 hover:text-amber-400 transition-all duration-300 hover:translate-x-1"
              >
                {cat}
              </Link>
            ))}
            <Link
              to="/products"
              className="text-sm text-amber-400 hover:text-amber-300 transition-all duration-300 hover:translate-x-1 mt-2"
            >
              View All Products →
            </Link>
          </div>
        </div>

        <div>
          <h4 className="font-heading text-sm font-semibold tracking-[0.15em] text-black mb-5">CONTACT</h4>
          <div className="flex flex-col gap-4">
            <a
              href="tel:+447000000000"
              className="flex items-center gap-3 text-sm text-gray-400 hover:text-amber-400 transition-colors group"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-amber-500 group-hover:text-black transition-all duration-300">
                <Phone size={16} />
              </div>
              <span>+44 7XXX XXXXXX</span>
            </a>
            <a
              href="mailto:info@shamborudraksha.uk"
              className="flex items-center gap-3 text-sm text-gray-400 hover:text-amber-400 transition-colors group"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-amber-500 group-hover:text-black transition-all duration-300">
                <Mail size={16} />
              </div>
              <span>info@shamborudraksha.uk</span>
            </a>
            <div className="flex items-center gap-3 text-sm text-gray-400">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                <MapPin size={16} />
              </div>
              <span>London, United Kingdom</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-14 pt-8 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-xs text-gray-500 tracking-wide">
          &copy; {new Date().getFullYear()} Shambo Rudraksha. All rights reserved.
        </p>
        <div className="flex items-center gap-6">
          <Link to="#" className="text-xs text-gray-500 hover:text-amber-400 transition-colors">Privacy Policy</Link>
          <Link to="#" className="text-xs text-gray-500 hover:text-amber-400 transition-colors">Terms of Service</Link>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;