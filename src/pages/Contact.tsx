import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import ContactForm from "@/components/ContactForm";
import { Mail, Phone, MapPin, Clock, Sparkles } from "lucide-react";

const Contact = () => {
  const contactInfo = [
    { icon: Phone, label: "Phone", value: "+44 7XXX XXXXXX", description: "Mon-Fri, 9AM-6PM GMT" },
    { icon: Mail, label: "Email", value: "info@shamborudraksha.uk", description: "We reply within 24 hours" },
    { icon: MapPin, label: "Location", value: "London, United Kingdom", description: "Sacred Rudraksha experts" },
  ];

  return (
    <Layout>
      <section className="relative py-16 lg:py-28 overflow-hidden bg-gray-50">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-gray-50 via-gray-50 to-white" />
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23fbbf14' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} />
        </div>

        <motion.div
          className="absolute top-1/3 left-1/4 w-72 h-72 rounded-full"
          style={{ background: "radial-gradient(circle, hsl(38 80% 55% / 0.12) 0%, transparent 70%)" }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-60 h-60 rounded-full"
          style={{ background: "radial-gradient(circle, hsl(38 80% 55% / 0.08) 0%, transparent 70%)" }}
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="container relative mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-400/20 mb-6"
            >
              <Sparkles size={12} className="text-amber-500" />
              <span className="text-xs font-heading tracking-[0.2em] text-amber-500 uppercase">Get in Touch</span>
            </motion.div>

            <h1 className="text-4xl lg:text-5xl font-heading mb-4">
              <span className="text-gradient-gold">Contact</span>{" "}
              <span className="text-gray-900">Us</span>
            </h1>
            <p className="text-gray-600 font-body max-w-xl mx-auto text-lg font-medium">
              Have questions about our sacred Rudraksha beads? We'd love to hear from you.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="lg:col-span-5"
            >
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 p-6 lg:p-8 shadow-sm">
                <h2 className="text-xl font-heading text-gray-900 mb-2">Send a Message</h2>
                <p className="text-sm text-gray-600 mb-6">
                  Fill out the form below and we'll get back to you shortly.
                </p>
                <ContactForm />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="lg:col-span-7 space-y-6"
            >
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {contactInfo.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                    className="bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200/50 p-5 hover:border-amber-500/30 hover:shadow-[0_0_20px_rgba(251,191,36,0.1)] transition-all duration-300 group"
                  >
                    <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-amber-500/20 to-amber-600/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <item.icon size={20} className="text-amber-500" />
                    </div>
                    <p className="text-xs text-gray-500 font-body uppercase tracking-wider mb-1">{item.label}</p>
                    <p className="text-sm font-heading text-gray-900 mb-1">{item.value}</p>
                    <p className="text-xs text-gray-500">{item.description}</p>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                className="bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200/50 overflow-hidden"
              >
                <div className="p-4 border-b border-gray-200/50 flex items-center gap-2">
                  <MapPin size={16} className="text-amber-500" />
                  <span className="text-sm font-heading text-gray-900">Find Us</span>
                </div>
                <div className="aspect-[16/9] sm:aspect-video">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d317715.7119263355!2d-0.38178107698614075!3d51.52873519756609!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47d8a00baf21de75%3A0x52963a5addd52a99!2sLondon%2C%20UK!5e0!3m2!1sen!2s!4v1"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    title="Location"
                  />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
