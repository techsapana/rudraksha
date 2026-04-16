import React from "react";
import Layout from "@/components/Layout";
import HeroSection from "@/components/HeroSection";
import FeaturedProductsSection from "@/components/FeaturedProductsSection";
import GalleryShowcaseSection from "@/components/GalleryShowcaseSection";
import TestimonialSection from "@/components/TestimonialSection";
import FAQSection from "@/components/FAQSection";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Shield, Truck, Award, Star } from "lucide-react";

const features = [
  { icon: Shield, title: "Lab Certified", desc: "Every bead verified authentic" },
  { icon: Truck, title: "Worldwide Shipping", desc: "Tracked & insured delivery" },
  { icon: Award, title: "Vedic Energized", desc: "Blessed through sacred rituals" },
];

const Index = () => {
  return (
    <Layout>
      <HeroSection />

      <section className="py-12 bg-gradient-to-b from-secondary/50 to-background border-y border-border/40">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="flex items-center gap-4 justify-center"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/8 flex items-center justify-center flex-shrink-0">
                  <f.icon size={22} className="text-primary" />
                </div>
                <div className="text-left">
                  <p className="text-base font-heading text-foreground">{f.title}</p>
                  <p className="text-sm text-muted-foreground">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <FeaturedProductsSection />

      <GalleryShowcaseSection />

      <section className="py-20 lg:py-32 bg-gradient-to-b from-secondary via-secondary/50 to-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="/images/images (1).jfif"
                  alt="About Rudraksha"
                  className="w-full h-auto min-h-[300px] lg:min-h-[400px] object-contain"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-primary/10 rounded-full blur-2xl" />
              <div className="absolute -top-6 -left-6 w-16 h-16 bg-primary/10 rounded-full blur-xl" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <p className="text-xs font-body tracking-[0.35em] text-primary uppercase mb-4">About Rudraksha</p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading text-gradient-gold mb-8">The Sacred Seed</h2>
              
              <div className="space-y-6">
                <p className="text-muted-foreground font-body text-lg leading-relaxed">
                  Rudraksha beads are the sacred seeds of the Elaeocarpus ganitrus tree, believed to have originated from the tears of Lord Shiva during deep meditation. For millennia, sages, monks, and spiritual seekers have worn these powerful beads to enhance meditation, promote healing, and connect with divine consciousness.
                </p>
                <p className="text-muted-foreground font-body text-lg leading-relaxed">
                  Each Rudraksha bead is unique, with varying numbers of Mukhis (faces) that determine its spiritual properties and the deity it represents. From the rare 1 Mukhi representing Lord Shiva himself, to the commonly available 5 Mukhi for general well-being, every bead carries profound spiritual significance.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-6 mt-10 pt-8 border-t border-border/40">
                <div className="text-center">
                  <p className="text-2xl lg:text-3xl font-heading text-gradient-gold">5000+</p>
                  <p className="text-xs text-muted-foreground mt-1">Happy Customers</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl lg:text-3xl font-heading text-gradient-gold">100%</p>
                  <p className="text-xs text-muted-foreground mt-1">Authentic</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl lg:text-3xl font-heading text-gradient-gold">15+</p>
                  <p className="text-xs text-muted-foreground mt-1">Years Experience</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <TestimonialSection />

      <section className="py-20 lg:py-32 bg-background relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-primary/5 blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-card border border-border/60 rounded-3xl p-10 lg:p-16 text-center glow-gold-lg max-w-3xl mx-auto"
          >
            <div className="flex justify-center mb-6">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={20} className="text-primary fill-primary" />
                ))}
              </div>
            </div>
            <h2 className="text-2xl lg:text-4xl font-heading text-gradient-gold mb-5">Begin Your Spiritual Journey</h2>
            <p className="text-muted-foreground font-body text-lg max-w-lg mx-auto mb-8">
              Explore our curated collection of authentic Rudraksha beads and find the perfect companion for your spiritual practice.
            </p>
            <Link
              to="/products"
              className="inline-flex items-center gap-2.5 bg-gradient-to-r from-primary to-primary/90 text-white px-10 py-4 rounded-xl font-body font-semibold text-sm tracking-wide hover:shadow-xl hover:shadow-primary/20 transition-all duration-300 glow-gold group"
            >
              <span>Explore Collection</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="py-20 lg:py-28 bg-gradient-to-b from-secondary/50 to-secondary">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <p className="text-xs font-body tracking-[0.35em] text-primary uppercase mb-3">FAQ</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading text-gradient-gold">Common Questions</h2>
          </motion.div>
          
          <FAQSection limit={3} />
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-10"
          >
            <Link to="/faq" className="inline-flex items-center gap-2 text-sm font-body font-medium text-primary hover:text-primary/70 transition-colors group">
              <span>View All FAQs</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;