import Layout from "@/components/Layout";
import GalleryGrid from "@/components/GalleryGrid";

const Gallery = () => (
  <Layout>
    <section className="py-12 lg:py-20 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-xs font-body tracking-[0.3em] text-primary uppercase mb-3">Gallery</p>
          <h1 className="text-3xl lg:text-4xl font-heading text-gradient-gold">Our Collection</h1>
          <p className="text-muted-foreground font-body mt-3 max-w-md mx-auto text-sm">
            Browse through our curated gallery of sacred Rudraksha beads and spiritual jewelry.
          </p>
        </div>
        <GalleryGrid />
      </div>
    </section>
  </Layout>
);

export default Gallery;
