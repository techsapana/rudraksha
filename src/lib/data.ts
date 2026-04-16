export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  description: string;
  benefits: string[];
  mukhi?: number;
  featured?: boolean;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  productCount: number;
}

export interface FAQ {
  question: string;
  answer: string;
}

export const categories: Category[] = [
  { id: "siddha-mala", name: "Siddha Mala", description: "Sacred combination of all 1 to 14 Mukhi Rudraksha beads strung together", image: "https://images.unsplash.com/photo-1600618528240-fb9fc964b853?w=400&q=80", productCount: 8 },
  { id: "saraswati-mala", name: "Saraswati Mala", description: "Blessed mala for wisdom, knowledge, and academic excellence", image: "https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?w=400&q=80", productCount: 6 },
  { id: "bracelets", name: "Bracelets", description: "Handcrafted Rudraksha bracelets for daily spiritual practice", image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=400&q=80", productCount: 12 },
  { id: "rare", name: "Rare Rudraksha", description: "Extremely rare and powerful beads from ancient trees", image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&q=80", productCount: 4 },
  { id: "beads", name: "Loose Beads", description: "Individual certified Rudraksha beads of various Mukhi", image: "https://images.unsplash.com/photo-1615529162924-f8605388461d?w=400&q=80", productCount: 20 },
];

export const products: Product[] = [
  { id: "1", name: "5 Mukhi Rudraksha Mala", price: 49.99, originalPrice: 79.99, image: "https://images.unsplash.com/photo-1600618528240-fb9fc964b853?w=500&q=80", category: "siddha-mala", description: "The 5 Mukhi Rudraksha represents Lord Kalagni Rudra. It is the most commonly available and widely used Rudraksha. Wearing this sacred bead brings peace of mind, good health, and spiritual growth.", benefits: ["Enhances mental clarity", "Reduces stress and anxiety", "Promotes spiritual growth", "Balances blood pressure"], mukhi: 5, featured: true },
  { id: "2", name: "Siddha Mala (1-14 Mukhi)", price: 599.99, originalPrice: 899.99, image: "https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?w=500&q=80", category: "siddha-mala", description: "A complete Siddha Mala containing all Mukhi from 1 to 14. This powerful mala is believed to fulfill all desires and bring complete spiritual awakening.", benefits: ["Complete spiritual protection", "Fulfills all desires", "Powerful meditation tool", "Rare collector piece"], featured: true },
  { id: "3", name: "Saraswati Mala - Premium", price: 149.99, image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=500&q=80", category: "saraswati-mala", description: "Dedicated to Goddess Saraswati, this mala enhances knowledge, creativity, and academic performance. Ideal for students and scholars.", benefits: ["Enhances learning ability", "Boosts creativity", "Improves concentration", "Aids in examinations"], featured: true },
  { id: "4", name: "Rudraksha Power Bracelet", price: 34.99, originalPrice: 49.99, image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&q=80", category: "bracelets", description: "A beautifully crafted bracelet with genuine 5 Mukhi Rudraksha beads set in silver. Perfect for daily wear and spiritual practice.", benefits: ["Easy to wear daily", "Stylish spiritual accessory", "Positive energy flow", "Stress relief"], featured: true },
  { id: "5", name: "1 Mukhi Rudraksha (Rare)", price: 1299.99, image: "https://images.unsplash.com/photo-1615529162924-f8605388461d?w=500&q=80", category: "rare", description: "The extremely rare 1 Mukhi Rudraksha represents Lord Shiva himself. It is considered the most powerful and auspicious of all Rudraksha beads.", benefits: ["Supreme consciousness", "Liberation from worldly attachments", "Divine blessings", "Ultimate spiritual attainment"], mukhi: 1, featured: true },
  { id: "6", name: "7 Mukhi Rudraksha Bead", price: 89.99, image: "https://images.unsplash.com/photo-1600618528240-fb9fc964b853?w=500&q=80", category: "beads", description: "The 7 Mukhi Rudraksha is associated with Goddess Lakshmi. It brings wealth, prosperity, and good fortune to the wearer.", benefits: ["Attracts wealth", "Business prosperity", "Financial stability", "Good fortune"], mukhi: 7 },
  { id: "7", name: "Ganesh Rudraksha", price: 249.99, image: "https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?w=500&q=80", category: "rare", description: "A naturally formed Rudraksha resembling Lord Ganesha's trunk. Extremely rare and considered highly auspicious for removing obstacles.", benefits: ["Removes obstacles", "Brings success", "Auspicious beginnings", "Rare collector bead"] },
  { id: "8", name: "Meditation Mala - 108 Beads", price: 79.99, originalPrice: 119.99, image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=500&q=80", category: "siddha-mala", description: "Traditional 108-bead meditation mala crafted from genuine Rudraksha. Perfect for japa meditation and mantra chanting.", benefits: ["108 sacred beads", "Perfect for japa", "Energized and blessed", "Knotted for durability"] },
  { id: "9", name: "Couple Bracelet Set", price: 59.99, image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&q=80", category: "bracelets", description: "A pair of matching Rudraksha bracelets for couples. Symbolizes unity and shared spiritual journey.", benefits: ["Harmonious relationship", "Shared energy", "Beautiful pairing", "Gift-ready packaging"] },
  { id: "10", name: "3 Mukhi Rudraksha", price: 69.99, image: "https://images.unsplash.com/photo-1615529162924-f8605388461d?w=500&q=80", category: "beads", description: "The 3 Mukhi Rudraksha represents Agni (Fire God). It purifies past karma and boosts self-confidence.", benefits: ["Purifies past karma", "Boosts confidence", "Stomach health", "Self-esteem enhancement"], mukhi: 3 },
];

export const faqs: FAQ[] = [
  { question: "What is Rudraksha?", answer: "Rudraksha are sacred seeds from the Elaeocarpus ganitrus tree, revered in Hinduism and Buddhism. The name comes from 'Rudra' (Lord Shiva) and 'Aksha' (eyes/tears). These beads have been used for thousands of years as prayer beads and for their believed spiritual and healing properties." },
  { question: "What are the benefits of wearing Rudraksha?", answer: "Rudraksha beads are believed to offer numerous benefits including stress reduction, improved concentration, enhanced meditation, blood pressure regulation, and spiritual protection. Different Mukhi (faces) are associated with different deities and specific benefits." },
  { question: "How do I identify genuine Rudraksha?", answer: "Genuine Rudraksha can be identified through several tests: the water test (real ones sink), the copper coin test (they rotate between two copper coins), and visual inspection of natural Mukhis (lines). We provide lab-certified authenticity with every purchase." },
  { question: "How should I wear Rudraksha?", answer: "Rudraksha can be worn as a mala around the neck, as a bracelet on the wrist, or kept in a pouch. Before wearing, it should be energized through proper rituals. It can be worn while sleeping and bathing, but should be removed during funerals or intimacy." },
  { question: "What is the significance of different Mukhi?", answer: "Each Mukhi (face) represents a different deity and offers unique benefits. 1 Mukhi represents Shiva (supreme consciousness), 5 Mukhi represents Kalagni Rudra (health & peace), 7 Mukhi represents Lakshmi (wealth), and so on up to 21 Mukhi." },
  { question: "How do I care for my Rudraksha?", answer: "Clean your Rudraksha with a soft brush and water periodically. Oil it with mustard or olive oil monthly to prevent drying and cracking. Store in a clean, sacred space when not wearing. Avoid exposure to chemicals, soap, or extreme heat." },
  { question: "Do you ship internationally?", answer: "Yes, we ship worldwide with tracked delivery. All orders come with certification of authenticity, protective packaging, and care instructions. International delivery typically takes 7-14 business days." },
  { question: "What is your return policy?", answer: "We offer a 30-day return policy on all products. If you're not satisfied or if the product doesn't match the description, you can return it for a full refund. Each Rudraksha comes with a certificate of authenticity." },
];

export const galleryImages = [
  { id: "1", src: "https://images.unsplash.com/photo-1600618528240-fb9fc964b853?w=600&q=80", alt: "Rudraksha mala on wooden surface", category: "Malas" },
  { id: "2", src: "https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?w=600&q=80", alt: "Sacred prayer beads arrangement", category: "Beads" },
  { id: "3", src: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=600&q=80", alt: "Rudraksha bracelet closeup", category: "Bracelets" },
  { id: "4", src: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&q=80", alt: "Spiritual jewelry collection", category: "Collection" },
  { id: "5", src: "https://images.unsplash.com/photo-1615529162924-f8605388461d?w=600&q=80", alt: "Rare Rudraksha beads", category: "Rare" },
  { id: "6", src: "https://images.unsplash.com/photo-1600618528240-fb9fc964b853?w=600&q=80", alt: "Meditation mala", category: "Meditation" },
  { id: "7", src: "https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?w=600&q=80", alt: "Blessed Rudraksha set", category: "Sets" },
  { id: "8", src: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=600&q=80", alt: "Handcrafted spiritual bracelet", category: "Bracelets" },
];

export const testimonials = [
  { name: "Arjun Sharma", text: "The Siddha Mala has truly transformed my meditation practice. I feel a deep sense of peace and clarity since I started wearing it.", rating: 5 },
  { name: "Priya Patel", text: "Authentic Rudraksha with beautiful craftsmanship. The energy from these beads is incredible. Highly recommended!", rating: 5 },
  { name: "David Chen", text: "I was skeptical at first, but after wearing the 5 Mukhi mala for a month, I noticed significant improvements in my focus and stress levels.", rating: 5 },
];
