import { Leaf, Sparkles, ShieldCheck, Gift, HeartPulse } from "lucide-react";

const items = [
  { icon: Sparkles, title: "Premium Quality", desc: "Hand-graded, top-tier produce" },
  { icon: Leaf, title: "100% Natural", desc: "No preservatives, no additives" },
  { icon: ShieldCheck, title: "Fresh & Hygienic", desc: "Sealed & vacuum-packed" },
  { icon: HeartPulse, title: "Healthy Lifestyle", desc: "Nutrient-dense superfoods" },
  { icon: Gift, title: "Perfect for Gifting", desc: "Free premium gift packing" },
];

export const Highlights = () => (
  <section className="py-10 sm:py-14 bg-[var(--velora-cream)] border-b border-[var(--velora-forest)]/5">
    <div className="max-w-7xl mx-auto px-4 sm:px-6">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 sm:gap-6">
        {items.map((it, idx) => (
          <div
            key={it.title}
            data-testid={`highlight-${idx}`}
            className="flex flex-col items-center text-center p-4 sm:p-5 rounded-2xl bg-white border border-[var(--velora-forest)]/8 hover:border-[var(--velora-gold)] transition"
          >
            <div className="w-12 h-12 rounded-full bg-[var(--velora-forest)] text-[var(--velora-gold-bright)] flex items-center justify-center mb-3">
              <it.icon size={20} />
            </div>
            <div className="font-display font-bold text-sm sm:text-base text-[var(--velora-forest)]">{it.title}</div>
            <div className="text-xs text-[var(--velora-ink-soft)] mt-1">{it.desc}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);
