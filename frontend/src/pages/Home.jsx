import { useState } from "react";
import { Toaster } from "@/components/ui/sonner";
import { FestiveBanner } from "@/components/FestiveBanner";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Highlights } from "@/components/Highlights";
import { Categories } from "@/components/Categories";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { SpecialOffers } from "@/components/SpecialOffers";
import { ProductCatalog } from "@/components/ProductCatalog";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { Testimonials } from "@/components/Testimonials";
import { InstagramGallery } from "@/components/InstagramGallery";
import { BulkOrder } from "@/components/BulkOrder";
import { Newsletter } from "@/components/Newsletter";
import { BuildHamperCta } from "@/components/BuildHamperCta";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { CartDrawer } from "@/components/CartDrawer";

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("All");

  return (
    <div className="bg-[var(--velora-cream-soft)]" data-testid="velora-home">
      <FestiveBanner />
      <Header />
      <Hero />
      <Highlights />
      <Categories onSelect={setActiveCategory} />
      <FeaturedProducts />
      <SpecialOffers />
      <BuildHamperCta />
      <ProductCatalog activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
      <WhyChooseUs />
      <Testimonials />
      <InstagramGallery />
      <BulkOrder />
      <Newsletter />
      <Contact />
      <Footer />
      <FloatingWhatsApp />
      <CartDrawer />
      <Toaster position="bottom-right" richColors />
    </div>
  );
}
