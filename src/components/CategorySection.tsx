import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { categories } from "@/lib/data";
import { ArrowRight } from "lucide-react";

const CategorySection = () => (
  <section className="py-20 lg:py-28 bg-background">
    <div className="container mx-auto px-4 lg:px-8">
      <div className="text-center mb-12">
        <p className="text-xs font-body tracking-[0.3em] text-primary uppercase mb-3">Explore</p>
        <h2 className="text-3xl lg:text-4xl font-heading text-gradient-gold">Our Categories</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.slice(0, 3).map((cat, i) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <Link
              to={`/products?category=${cat.id}`}
              className="group relative block aspect-[4/3] rounded-xl overflow-hidden border border-border hover:border-primary/30 transition-all"
            >
              <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="font-heading text-lg text-foreground mb-1">{cat.name}</h3>
                <p className="text-xs text-muted-foreground mb-2">{cat.description}</p>
                <span className="inline-flex items-center gap-1 text-xs text-primary font-medium">
                  Shop Now <ArrowRight size={12} />
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
      <div className="text-center mt-10">
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-8 py-3 rounded-xl border border-primary/30 text-primary font-heading font-semibold hover:bg-primary/10 transition-all duration-300"
        >
          View All Products <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  </section>
);

export default CategorySection;
