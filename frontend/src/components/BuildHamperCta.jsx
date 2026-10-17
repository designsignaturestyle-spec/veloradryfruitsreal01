import { Link } from "react-router-dom";
import { Sparkles, Gift } from "lucide-react";
import { useProducts } from "@/context/ProductsContext";

export const BuildHamperCta = () => {
  const { products } = useProducts();
  const tiles = ["mamra-almond", "medjool-dates", "pista-akbari", "anjeer-jumbo", "chia-seeds"]
    .map((s) => products.find((p) => p.slug === s))
    .filter(Boolean);

  return (
    <section className="py-16 sm:py-20 bg-marble text-[var(--velora-cream)] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-10 lg:gap-16 items-center relative">
        <div>
          <div className="section-eyebrow text-[var(--velora-gold-bright)]">Velora Hamper Studio</div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mt-3 leading-tight">
            Build your own <span className="italic text-[var(--velora-gold-bright)]">luxury hamper</span>
          </h2>
          <p className="mt-4 text-[var(--velora-cream)]/80 max-w-lg text-sm sm:text-base">
            Pick 4&ndash;6 favourites &mdash; from Mamra almonds to Medjool dates, chia seeds and our
            handcrafted chocolates. We pack them in an emerald-and-gold gift box, hand-tied with satin ribbon.
          </p>
          <ul className="mt-5 grid grid-cols-2 gap-2 text-sm text-[var(--velora-cream)]/85 max-w-md">
            <li className="flex items-center gap-2"><Sparkles size={14} className="text-[var(--velora-gold-bright)]" /> Pick any 4&ndash;6 SKUs</li>
            <li className="flex items-center gap-2"><Gift size={14} className="text-[var(--velora-gold-bright)]" /> Choose weight per item</li>
            <li className="flex items-center gap-2"><Sparkles size={14} className="text-[var(--velora-gold-bright)]" /> Custom packaging ₹250</li>
            <li className="flex items-center gap-2"><Gift size={14} className="text-[var(--velora-gold-bright)]" /> Free over ₹3,000</li>
          </ul>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              to="/build-hamper"
              data-testid="build-hamper-cta"
              className="btn-gold px-6 py-3 rounded-full text-sm font-semibold inline-flex items-center gap-2"
            >
              <Gift size={16} /> Start Building
            </Link>
            <Link
              to="/build-hamper"
              data-testid="build-hamper-quick"
              className="px-6 py-3 rounded-full text-sm inline-flex items-center gap-2 border border-[var(--velora-cream)]/30 hover:bg-[var(--velora-cream)]/10"
            >
              Try Diwali Preset
            </Link>
          </div>
        </div>

        <div className="relative">
          <div className="grid grid-cols-3 gap-3 sm:gap-4">
            {tiles.slice(0, 3).map((p) => (
              <img
                key={p.slug}
                src={p.image}
                alt={p.name}
                className="rounded-2xl aspect-square object-cover w-full border border-[var(--velora-gold)]/25 shadow-xl"
              />
            ))}
            {tiles.slice(3, 5).map((p) => (
              <img
                key={p.slug}
                src={p.image}
                alt={p.name}
                className="rounded-2xl aspect-square object-cover w-full border border-[var(--velora-gold)]/25 shadow-xl"
              />
            ))}
            {/* Plus tile */}
            <Link
              to="/build-hamper"
              data-testid="build-hamper-tile-cta"
              className="rounded-2xl aspect-square w-full border-2 border-dashed border-[var(--velora-gold)]/50 flex items-center justify-center text-[var(--velora-gold-bright)] hover:bg-[var(--velora-gold)]/10 transition"
            >
              <div className="text-center">
                <div className="font-display text-3xl">+</div>
                <div className="text-[10px] tracking-widest uppercase mt-1">Pick more</div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
