import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

const HeroSection = () => (
  <section className="relative min-h-[60vh] sm:min-h-[75vh] lg:min-h-[85vh] flex items-center justify-center overflow-hidden">
    {/* Background Image Layer */}
    <div className="absolute inset-0">
      <img
        src="/images/images (1).jfif"
        alt="Rudraksha Background"
        className="w-full h-full object-cover object-center"
      />
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />
    </div>
    
    {/* Decorative radial gradient */}
    <div 
      className="absolute inset-0 opacity-40"
      style={{ 
        background: "radial-gradient(ellipse 80% 60% at 50% 20%, hsl(25 65% 45% / 0.2) 0%, transparent 60%)" 
      }} 
    />
    
    {/* Subtle pattern overlay */}
    <div 
      className="absolute inset-0 opacity-[0.02]"
      style={{ 
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }}
    />

    {/* Animated orbs */}
    <motion.div
      className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full"
      style={{ background: "radial-gradient(circle, hsl(25 65% 45% / 0.15) 0%, transparent 70%)" }}
      animate={{
        scale: [1, 1.1, 1],
        opacity: [0.5, 0.8, 0.5],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
    <motion.div
      className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full"
      style={{ background: "radial-gradient(circle, hsl(25 65% 45% / 0.1) 0%, transparent 70%)" }}
      animate={{
        scale: [1.1, 1, 1.1],
        opacity: [0.3, 0.6, 0.3],
      }}
      transition={{
        duration: 10,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />

    <div className="container relative mx-auto px-4 lg:px-8 text-center z-10">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-4xl mx-auto"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 backdrop-blur-md border border-amber-400/30 mb-6 sm:mb-10 shadow-[0_0_30px_rgba(251,191,36,0.15)]"
        >
          <Sparkles size={14} className="text-amber-400" />
          <span className="text-xs font-heading font-semibold tracking-[0.2em] text-amber-400 uppercase">
            Authentic · Certified · Sacred
          </span>
        </motion.div>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-heading leading-[1.15] mb-6 sm:mb-8">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="block text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
          >
            Divine
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="block text-amber-400 drop-shadow-[0_0_20px_rgba(251,191,36,0.4)]"
          >
            Rudraksha
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="block text-white/90 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
          >
            Collection
          </motion.span>
        </h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-sm sm:text-lg lg:text-xl text-white/80 font-body max-w-2xl mx-auto mb-8 sm:mb-12 leading-relaxed"
        >
          Discover the sacred power of genuine Rudraksha beads. Each bead is lab-certified, 
          energized through ancient Vedic rituals, and sourced from the purest origins.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            to="/products"
            className="inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500 text-white px-8 py-3 sm:px-10 sm:py-4 rounded-xl font-heading font-bold text-sm tracking-wide hover:shadow-[0_0_30px_rgba(251,191,36,0.5)] hover:scale-105 transition-all duration-300 group"
          >
            <span>Shop Now</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            to="/gallery"
            className="inline-flex items-center justify-center gap-2.5 border-2 border-white/30 text-white px-8 py-3 sm:px-10 sm:py-4 rounded-xl font-heading font-bold text-sm tracking-wide hover:bg-white/10 hover:border-white/50 transition-all duration-300 backdrop-blur-sm"
          >
            View Gallery
          </Link>
        </motion.div>
      </motion.div>
    </div>

    {/* Scroll indicator */}
    <motion.div
      className="absolute bottom-8 left-1/2 -translate-x-1/2"
      animate={{ y: [0, 8, 0] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
    >
      <div className="w-8 h-12 rounded-full border-2 border-white/30 flex items-start justify-center p-2 backdrop-blur-sm">
        <motion.div
          className="w-1.5 h-1.5 rounded-full bg-amber-400"
          animate={{ opacity: [1, 0.3, 1], y: [0, 4, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    </motion.div>
  </section>
);

export default HeroSection;