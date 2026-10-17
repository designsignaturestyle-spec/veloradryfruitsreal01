import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { useProducts } from "@/context/ProductsContext";
import { ProductCard } from "./ProductCard";

export const ProductCatalog = ({ activeCategory, setActiveCategory }) => {
  const { products, categories } = useProducts();
  const [query, setQuery] = useState("");
  const [visible, setVisible] = useState(24);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((p) => {
      const matchCat = activeCategory === "All" || p.category === activeCategory;
      const matchQ = !q || (p.keywords || `${p.name} ${p.category}`.toLowerCase()).includes(q);
      return matchCat && matchQ;
    });
  }, [products, activeCategory, query]);

  const shown = filtered.slice(0, visible);

  return (
    <section id="products" className="py-16 sm:py-20 bg-velora-grain">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-10">
          <div className="section-eyebrow justify-center mx-auto">Our Catalog</div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--velora-forest)] mt-3">
            Explore our <span className="italic gold-text">{products.length}+</span> handpicked products
          </h2>
          <p className="text-[var(--velora-ink-soft)] mt-2 text-sm sm:text-base">
            Tap any product to order instantly on WhatsApp.
          </p>
        </div>

        {/* Search */}
        <div className="max-w-xl mx-auto relative mb-6">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--velora-ink-soft)]" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search almonds, dates, cashews..."
            data-testid="product-search-input"
            className="w-full pl-11 pr-4 py-3 rounded-full border border-[var(--velora-forest)]/20 bg-white focus:border-[var(--velora-gold)] focus:ring-2 focus:ring-[var(--velora-gold)]/30 outline-none text-sm"
          />
        </div>

        {/* Category pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setVisible(24);
              }}
              data-active={activeCategory === cat}
              data-testid={`filter-pill-${cat.toLowerCase().replace(/\s/g, "-")}`}
              className="cat-pill px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium"
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        {shown.length === 0 ? (
          <p className="text-center text-[var(--velora-ink-soft)] py-12" data-testid="no-products-message">
            No products match your search. Try a different keyword.
          </p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {shown.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}

        {visible < filtered.length && (
          <div className="text-center mt-10">
            <button
              onClick={() => setVisible((v) => v + 24)}
              data-testid="load-more-products"
              className="btn-forest px-6 py-3 rounded-full text-sm font-semibold"
            >
              Load more ({filtered.length - visible} more)
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
