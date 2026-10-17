import { CATEGORY_META } from "@/data/products";
import { useProducts } from "@/context/ProductsContext";

export const Categories = ({ onSelect }) => {
  const { products, categories } = useProducts();
  const cats = categories.filter((c) => c !== "All");

  return (
    <section className="py-14 sm:py-20 bg-[var(--velora-cream-soft)]" id="categories">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <div className="section-eyebrow justify-center mx-auto">Shop by Category</div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--velora-forest)] mt-3">
            A curated <span className="italic gold-text">luxury selection</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
          {cats.map((cat, idx) => {
            const count = products.filter((p) => p.category === cat).length;
            const meta = CATEGORY_META[cat] || { icon: "🌰", tagline: "" };
            return (
              <button
                key={cat}
                onClick={() => {
                  onSelect(cat);
                  document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
                }}
                data-testid={`category-tile-${cat.toLowerCase().replace(/\s/g, "-")}`}
                className="card-luxury rounded-2xl p-4 text-left group"
              >
                <div className="text-2xl">{meta.icon}</div>
                <div className="mt-2 font-display font-bold text-sm sm:text-base text-[var(--velora-forest)] group-hover:text-[var(--velora-gold)] transition">
                  {cat}
                </div>
                <div className="text-[11px] text-[var(--velora-ink-soft)] mt-0.5">
                  {count} products
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
