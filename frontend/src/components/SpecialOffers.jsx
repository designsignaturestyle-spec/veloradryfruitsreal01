import { Tag, Gift, Package } from "lucide-react";
import { waLink } from "@/data/constants";

const offers = [
  {
    icon: Tag,
    title: "Buy ₹1,000 — Get ₹100 OFF",
    desc: "Instant discount on every order above one thousand.",
    accent: "from-[#c9a14a] to-[#e5c168]",
  },
  {
    icon: Gift,
    title: "Buy ₹2,000 — Premium Dates FREE",
    desc: "Receive a complimentary pack of premium Saffawi dates.",
    accent: "from-[#1f5e3a] to-[#0e3b25]",
  },
  {
    icon: Package,
    title: "FREE Gift Packing on ₹1,500+",
    desc: "Festive luxury packaging — perfect for gifting.",
    accent: "from-[#5fb846] to-[#1f5e3a]",
  },
];

export const SpecialOffers = () => (
  <section id="offers" className="py-16 sm:py-20 bg-velora-grain">
    <div className="max-w-7xl mx-auto px-4 sm:px-6">
      <div className="text-center mb-10">
        <div className="section-eyebrow justify-center mx-auto">Exclusive Offers</div>
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--velora-forest)] mt-3">
          Savings <span className="italic gold-text">worth celebrating</span>
        </h2>
        <p className="text-[var(--velora-ink-soft)] mt-2 max-w-xl mx-auto text-sm sm:text-base">
          Treat your family to the finest dry fruits and enjoy curated offers, free gifting and wholesale rates.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-5 sm:gap-6">
        {offers.map((o, idx) => (
          <div
            key={o.title}
            data-testid={`offer-card-${idx}`}
            className="card-luxury rounded-3xl p-6 sm:p-7 relative overflow-hidden group"
          >
            <div className={`absolute -top-12 -right-12 w-40 h-40 rounded-full bg-gradient-to-br ${o.accent} opacity-20 blur-2xl group-hover:opacity-40 transition`} />
            <div className="w-12 h-12 rounded-full bg-[var(--velora-forest)] text-[var(--velora-gold-bright)] flex items-center justify-center">
              <o.icon size={20} />
            </div>
            <h3 className="font-display text-xl sm:text-2xl font-bold text-[var(--velora-forest)] mt-4 leading-snug">
              {o.title}
            </h3>
            <p className="text-sm text-[var(--velora-ink-soft)] mt-2">{o.desc}</p>
            <a
              href={waLink()}
              target="_blank"
              rel="noreferrer"
              data-testid={`offer-claim-${idx}`}
              className="inline-flex items-center gap-2 mt-5 text-sm font-semibold text-[var(--velora-forest)] hover:text-[var(--velora-gold)] transition"
            >
              Claim on WhatsApp <span aria-hidden>→</span>
            </a>
          </div>
        ))}
      </div>
    </div>
  </section>
);
