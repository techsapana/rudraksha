import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Send, Loader2 } from "lucide-react";

const ContactForm = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    toast.success("Message sent! We'll get back to you soon.");
    setForm({ name: "", email: "", message: "" });
    setIsSubmitting(false);
  };

  const inputFields = [
    { name: "name", label: "Your Name", type: "text", placeholder: "Enter your full name" },
    { name: "email", label: "Email Address", type: "email", placeholder: "Enter your email" },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {inputFields.map((field) => (
        <motion.div
          key={field.name}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <label className="block text-xs font-body tracking-wider text-gray-700 font-semibold uppercase mb-2">
            {field.label}
          </label>
          <motion.input
            type={field.type}
            required
            value={form[field.name as keyof typeof form]}
            onChange={(e) => setForm({ ...form, [field.name]: e.target.value })}
            placeholder={field.placeholder}
            whileFocus={{ scale: 1.01 }}
            className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3.5 text-sm text-gray-900 font-body placeholder:text-gray-400 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all duration-200"
          />
        </motion.div>
      ))}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <label className="block text-xs font-body tracking-wider text-gray-700 font-semibold uppercase mb-2">
          Message
        </label>
        <motion.textarea
          required
          rows={5}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          placeholder="Tell us about your inquiry... We're here to help you find the perfect Rudraksha."
          whileFocus={{ scale: 1.01 }}
          className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3.5 text-sm text-gray-900 font-body placeholder:text-gray-400 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all duration-200 resize-none"
        />
      </motion.div>
      <motion.button
        type="submit"
        disabled={isSubmitting}
        whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
        whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
        className="w-full bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500 text-white px-8 py-4 rounded-xl font-heading font-semibold text-sm tracking-wide hover:shadow-[0_0_25px_rgba(251,191,36,0.4)] hover:border-amber-400 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            <span>Sending...</span>
          </>
        ) : (
          <>
            <Send size={16} />
            <span>Send Message</span>
          </>
        )}
      </motion.button>
    </form>
  );
};

export default ContactForm;
