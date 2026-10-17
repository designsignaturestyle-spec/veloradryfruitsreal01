import { Instagram } from "lucide-react";
import { BRAND } from "@/data/constants";
import { useProducts } from "@/context/ProductsContext";

// Use AI-generated luxury product images as a styled Instagram-look gallery
const slugs = [
  "mamra-almond",
  "medjool-dates",
  "pista-akbari",
  "anjeer-jumbo",
  "cashew-jumbo-roasted",
  "chia-seeds",
  "dry-fruits-mix",
  "vdf-fruits-n-nut-chocolates",
];

export const InstagramGallery = () => {
  const { products } = useProducts();
  const items = slugs
    .map((s) => products.find((p) => p.slug === s))
    .filter(Boolean);

  return (
    <section className="py-16 sm:py-20 bg-marble text-[var(--velora-cream)] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        <div className="text-center mb-10">
          <div className="section-eyebrow justify-center mx-auto text-[var(--velora-gold-bright)]">
            @veloradryfruits
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mt-3">
            Follow us on <span className="italic text-[var(--velora-gold-bright)]">Instagram</span>
          </h2>
          <p className="text-[var(--velora-cream)]/70 mt-2 max-w-xl mx-auto text-sm sm:text-base">
            A peek inside our luxury catalog. Tag <strong>#VeloraDryFruits</strong> to be featured.
          </p>
          <a
            href={BRAND.instagram}
            target="_blank"
            rel="noreferrer"
            data-testid="instagram-cta"
            className="btn-gold inline-flex items-center gap-2 mt-5 px-5 py-2.5 rounded-full text-sm"
          >
            <Instagram size={16} /> Follow @veloradryfruits
          </a>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {items.map((p, idx) => (
            <a
              key={p.slug}
              href={BRAND.instagram}
              target="_blank"
              rel="noreferrer"
              data-testid={`insta-tile-${idx}`}
              className="group relative block aspect-square rounded-2xl overflow-hidden border border-[var(--velora-gold)]/20"
            >
              <img
                src={p.image}
                alt={p.name}
                loading="lazy"
                className="w-full h-full object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition flex items-end p-3">
                <div className="text-[11px] tracking-wider uppercase text-[var(--velora-gold-bright)] flex items-center gap-1.5">
                  <Instagram size={12} /> View on Instagram
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
