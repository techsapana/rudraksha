import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Instagram, Facebook, Youtube } from "lucide-react";
import { motion } from "framer-motion";

const socialLinks = [
  { icon: Instagram, label: "Instagram" },
  { icon: Facebook, label: "Facebook" },
  { icon: Youtube, label: "Youtube" },
];

 const Footer = () => (
   <footer className="bg-gradient-to-b from-black via-gray-900 to-black text-white relative overflow-hidden">
     {/* Background decoration */}
     <div className="absolute inset-0">
       <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
       <div className="absolute top-20 left-1/4 w-96 h-96 rounded-full bg-amber-500/5 blur-3xl" />
       <div className="absolute bottom-20 right-1/4 w-80 h-80 rounded-full bg-amber-500/5 blur-3xl" />
       
       {/* Subtle lotus pattern */}
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5">
         <svg width="400" height="400" viewBox="0 0 100 100" fill="currentColor" className="text-amber-500">
           <path d="M50 20 C45 25, 40 30, 35 35 C30 40, 25 45, 20 50 C25 55, 30 60, 35 65 C40 70, 45 75, 50 80 C55 75, 60 70, 65 65 C70 60, 75 55, 80 50 C75 45, 70 40, 65 35 C60 30, 55 25, 50 20 Z" opacity="0.5"/>
           <path d="M50 25 C47 28, 44 31, 41 34 C38 37, 35 40, 32 43 C35 46, 38 49, 41 52 C44 55, 47 58, 50 61 C53 58, 56 55, 59 52 C62 49, 65 46, 68 43 C65 40, 62 37, 59 34 C56 31, 53 28, 50 25 Z" opacity="0.3"/>
         </svg>
       </div>
     </div>

     <div className="container mx-auto px-4 lg:px-8 py-16 lg:py-20 relative z-10">
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          <div className="lg:pr-8">
            <Link to="/" className="inline-block">
              <h3 className="text-2xl font-heading font-bold tracking-wider text-amber-400 mb-4">SHAMBO</h3>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed mb-6 max-w-xs">
              Authentic, lab-certified Rudraksha beads sourced directly from Nepal and Indonesia. Serving spiritual seekers worldwide since 2010.
            </p>
            <div>
              <h4 className="font-heading text-sm font-semibold tracking-[0.15em] text-amber-400 mb-5">FOLLOW US</h4>
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
          </div>

        <div>
          <h4 className="font-heading text-sm font-semibold tracking-[0.15em] text-amber-400 mb-5">QUICK LINKS</h4>
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
                className="text-sm text-gray-400 hover:text-amber-400 transition-all duration-300 hover:translate-x-1 inline-flex items-center group"
              >
                <span className="w-0 h-px bg-amber-400 mr-0 group-hover:w-4 group-hover:mr-3 transition-all duration-300" />
                {link.label}
              </Link>
            ))}
            <Link
              to="/products"
              className="text-sm text-amber-400 hover:text-amber-300 transition-all duration-300 hover:translate-x-1 mt-3 inline-flex items-center font-medium"
            >
              <span className="w-4 h-px bg-amber-400 mr-3" />
              View All Products
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>



        <div>
          <h4 className="font-heading text-sm font-semibold tracking-[0.15em] text-amber-400 mb-5">CONNECT</h4>
          <div className="flex flex-col gap-4">
            <a
              href="tel:+447000000000"
              className="flex items-center gap-3 text-sm text-gray-400 hover:text-amber-400 transition-all duration-300 group"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-amber-500 group-hover:text-black transition-all duration-300">
                <Phone size={16} />
              </div>
              <span className="group-hover:translate-x-1 transition-transform duration-300">+44 7XXX XXXXXX</span>
            </a>
            <a
              href="mailto:info@shamborudraksha.uk"
              className="flex items-center gap-3 text-sm text-gray-400 hover:text-amber-400 transition-all duration-300 group"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-amber-500 group-hover:text-black transition-all duration-300">
                <Mail size={16} />
              </div>
              <span className="group-hover:translate-x-1 transition-transform duration-300">info@shamborudraksha.uk</span>
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

      <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          <p className="text-xs text-gray-500 tracking-wide">
            &copy; {new Date().getFullYear()} Shambo Rudraksha. All rights reserved.
          </p>
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
          <p className="text-xs text-gray-500 tracking-wide">Handcrafted with devotion</p>
        </div>
        <div className="flex items-center gap-6">
          <Link to="#" className="text-xs text-gray-500 hover:text-amber-400 transition-colors">Privacy Policy</Link>
          <span className="w-1 h-1 bg-gray-700 rounded-full" />
          <Link to="#" className="text-xs text-gray-500 hover:text-amber-400 transition-colors">Terms of Service</Link>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;