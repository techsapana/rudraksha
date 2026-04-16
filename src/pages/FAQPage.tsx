import Layout from "@/components/Layout";
import FAQSection from "@/components/FAQSection";

const FAQPage = () => (
  <Layout>
    <section className="py-12 lg:py-20 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-xs font-body tracking-[0.3em] text-primary uppercase mb-3">Support</p>
          <h1 className="text-3xl lg:text-4xl font-heading text-gradient-gold">Frequently Asked Questions</h1>
          <p className="text-muted-foreground font-body mt-3 max-w-md mx-auto text-sm">
            Everything you need to know about Rudraksha beads and our products.
          </p>
        </div>
        <FAQSection />
      </div>
    </section>
  </Layout>
);

export default FAQPage;
