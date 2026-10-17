import { ProductCard } from "./ProductCard";
import { useProducts } from "@/context/ProductsContext";

export const FeaturedProducts = () => {
  const { products } = useProducts();
  const featured = products.filter((p) => p.featured).slice(0, 8);
  return (
    <section className="py-16 sm:py-20 bg-marble text-[var(--velora-cream)] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        <div className="text-center mb-10">
          <div className="section-eyebrow justify-center mx-auto text-[var(--velora-gold-bright)]">
            Featured Products
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mt-3">
            Our <span className="italic text-[var(--velora-gold-bright)]">bestsellers</span>
          </h2>
          <p className="text-[var(--velora-cream)]/70 mt-2 max-w-xl mx-auto text-sm sm:text-base">
            Hand-picked Velora classics &mdash; loved by families and connoisseurs across India.
          </p>
        </div>

        <div
          data-testid="featured-products"
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6"
        >
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} variant="dark" />
          ))}
        </div>
      </div>
    </section>
  );
};
