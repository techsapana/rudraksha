import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { testimonials } from "@/lib/data";

const TestimonialSection = () => (
  <section className="py-20 lg:py-28 bg-secondary">
    <div className="container mx-auto px-4 lg:px-8">
      <div className="text-center mb-12">
        <p className="text-xs font-body tracking-[0.3em] text-primary uppercase mb-3">Testimonials</p>
        <h2 className="text-3xl lg:text-4xl font-heading text-gradient-gold">What Our Customers Say</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {testimonials.map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="bg-card border border-border rounded-xl p-6"
          >
            <div className="flex gap-0.5 mb-3">
              {Array.from({ length: t.rating }).map((_, j) => (
                <Star key={j} size={14} className="fill-primary text-primary" />
              ))}
            </div>
            <p className="text-sm text-muted-foreground font-body leading-relaxed mb-4">"{t.text}"</p>
            <p className="text-xs font-heading tracking-wider text-foreground">{t.name}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default TestimonialSection;
