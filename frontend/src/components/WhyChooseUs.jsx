import { Truck, Package2, BadgeCheck, Headphones, RefreshCcw, Boxes } from "lucide-react";
import { waLink, callLink } from "@/data/constants";

const items = [
  { icon: Boxes, title: "300+ Collection", desc: "Largest curated dry fruit catalog in RR Nagar." },
  { icon: BadgeCheck, title: "Wholesale Pricing", desc: "Bulk rates available — perfect for events & gifting." },
  { icon: Package2, title: "100% Fresh Stock", desc: "Sourced & restocked weekly, never aged." },
  { icon: Truck, title: "Delivery Across India", desc: "Free delivery in Rajarajeshwari Nagar, Bengaluru." },
  { icon: Headphones, title: "24/7 Support", desc: "Talk to us anytime over call or WhatsApp." },
  { icon: RefreshCcw, title: "Easy Return Policy", desc: "Hassle-free returns on quality concerns." },
];

export const WhyChooseUs = () => (
  <section id="why" className="py-16 sm:py-20 bg-[var(--velora-forest)] text-[var(--velora-cream)] relative overflow-hidden">
    <div className="absolute inset-0 opacity-[0.05] pointer-events-none"
      style={{
        backgroundImage:
          "radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)",
        backgroundSize: "26px 26px",
      }}
    />
    <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
      <div className="text-center mb-12">
        <div className="section-eyebrow justify-center mx-auto text-[var(--velora-gold-bright)]">Why Choose Velora</div>
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mt-3">
          Better Quality. <span className="italic text-[var(--velora-gold-bright)]">Better Life.</span>
        </h2>
        <p className="text-[var(--velora-cream)]/75 mt-3 max-w-2xl mx-auto text-sm sm:text-base">
          We are obsessed with sourcing the purest, freshest dry fruits and bringing them directly to your home at the best possible price.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {items.map((it, idx) => (
          <div
            key={it.title}
            data-testid={`why-card-${idx}`}
            className="rounded-2xl p-5 sm:p-6 bg-[var(--velora-cream)]/5 backdrop-blur border border-[var(--velora-gold)]/20 hover:border-[var(--velora-gold)] hover:bg-[var(--velora-cream)]/10 transition"
          >
            <div className="w-12 h-12 rounded-xl bg-[var(--velora-gold)] text-[var(--velora-forest)] flex items-center justify-center">
              <it.icon size={20} />
            </div>
            <h3 className="font-display font-bold text-lg sm:text-xl mt-4">{it.title}</h3>
            <p className="text-sm text-[var(--velora-cream)]/75 mt-1">{it.desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <p className="font-display italic text-2xl sm:text-3xl text-[var(--velora-gold-bright)]">
          “We wish you a Happy and Healthiest Lifestyle!”
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <a href={waLink()} target="_blank" rel="noreferrer" data-testid="why-whatsapp-cta" className="btn-whatsapp px-6 py-3 rounded-full text-sm">
            Order on WhatsApp
          </a>
          <a href={callLink} data-testid="why-call-cta" className="btn-gold px-6 py-3 rounded-full text-sm">
            Call Now
          </a>
        </div>
      </div>
    </div>
  </section>
);
