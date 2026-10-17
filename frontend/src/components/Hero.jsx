import { Phone, MessageCircle, MapPin, ShieldCheck, Sparkles, Mail } from "lucide-react";
import { BRAND, callLink, waLink, mailLink } from "@/data/constants";

export const Hero = () => {
  return (
    <section id="home" className="relative overflow-hidden bg-forest-deep text-[var(--velora-cream)] leaf-pattern">
      <div className="absolute inset-0 opacity-[0.06] mix-blend-screen pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.7) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 sm:py-20 lg:py-28 grid lg:grid-cols-2 gap-10 lg:gap-16 items-center relative">
        <div className="fade-up">
          <div className="section-eyebrow text-[var(--velora-gold-bright)] mb-5">
            <span>Rajarajeshwari Nagar, Bengaluru</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight">
            Premium Dry Fruits, <br />
            Nuts &amp; <span className="text-[var(--velora-gold-bright)] italic">Healthy Snacks</span>
          </h1>
          <p className="mt-5 text-base sm:text-lg text-[var(--velora-cream)]/85 max-w-xl">
            Luxury Quality. Freshness You Can Trust. Over 100+ curated dry fruits, nuts, seeds, spices and
            handcrafted chocolates &mdash; vacuum-fresh, hand-graded, delivered across India.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href="#products"
              data-testid="hero-shop-now-cta"
              className="btn-gold px-6 py-3 rounded-full inline-flex items-center gap-2 text-sm sm:text-base"
            >
              <Sparkles size={18} /> Shop Now
            </a>
            <a
              href="#categories"
              data-testid="hero-view-collections-cta"
              className="px-6 py-3 rounded-full inline-flex items-center gap-2 text-sm sm:text-base border border-[var(--velora-cream)]/30 hover:bg-[var(--velora-cream)]/10 transition"
            >
              View Collections
            </a>
            <a
              href={waLink()}
              target="_blank"
              rel="noreferrer"
              data-testid="hero-whatsapp-cta"
              className="btn-whatsapp px-6 py-3 rounded-full inline-flex items-center gap-2 text-sm sm:text-base"
            >
              <MessageCircle size={18} /> Order on WhatsApp
            </a>
          </div>

          {/* Big contact highlight */}
          <div className="mt-9 grid sm:grid-cols-2 gap-3 max-w-xl">
            <a
              href={callLink}
              data-testid="hero-phone-card"
              className="group rounded-2xl border border-[var(--velora-gold)]/40 bg-[var(--velora-cream)]/5 backdrop-blur p-4 hover:border-[var(--velora-gold)] transition"
            >
              <div className="text-[10px] tracking-[0.2em] text-[var(--velora-gold-bright)] uppercase">Call / WhatsApp</div>
              <div className="font-display text-2xl sm:text-3xl font-bold mt-1">{BRAND.phone}</div>
            </a>
            <a
              href={mailLink}
              data-testid="hero-email-card"
              className="group rounded-2xl border border-[var(--velora-gold)]/40 bg-[var(--velora-cream)]/5 backdrop-blur p-4 hover:border-[var(--velora-gold)] transition"
            >
              <div className="text-[10px] tracking-[0.2em] text-[var(--velora-gold-bright)] uppercase">Email Us</div>
              <div className="font-display text-sm sm:text-base lg:text-lg font-semibold mt-1 flex items-center gap-2 whitespace-nowrap">
                <Mail size={16} className="shrink-0" />
                <span className="truncate">{BRAND.email}</span>
              </div>
            </a>
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-5 text-xs sm:text-sm text-[var(--velora-cream)]/75">
            <span className="flex items-center gap-2"><ShieldCheck size={16} className="text-[var(--velora-gold-bright)]" /> 100% Fresh Stock</span>
            <span className="flex items-center gap-2"><Sparkles size={16} className="text-[var(--velora-gold-bright)]" /> 300+ Collection</span>
            <span className="flex items-center gap-2"><MapPin size={16} className="text-[var(--velora-gold-bright)]" /> Free delivery in Rajarajeshwari Nagar</span>
          </div>
        </div>

        {/* Visual */}
        <div className="relative fade-up delay-2">
          <div className="absolute -inset-6 bg-gradient-to-br from-[var(--velora-gold)]/20 to-transparent rounded-[40px] blur-2xl" />
          <div className="relative grid grid-cols-2 gap-3 sm:gap-4">
            <img
              src={`${process.env.REACT_APP_BACKEND_URL}/api/static/products/almond-jumbo.png`}
              alt="Almond Jumbo - Velora premium luxury pouch in brass bowl"
              className="rounded-3xl object-cover w-full h-44 sm:h-60 border border-[var(--velora-gold)]/30 shadow-2xl bg-black"
            />
            <img
              src={`${process.env.REACT_APP_BACKEND_URL}/api/static/products/medjool-dates.png`}
              alt="Medjool Dates"
              className="rounded-3xl object-cover w-full h-44 sm:h-60 mt-8 border border-[var(--velora-gold)]/30 shadow-2xl bg-black"
            />
            <img
              src={`${process.env.REACT_APP_BACKEND_URL}/api/static/products/pista-akbari.png`}
              alt="Pista Akbari"
              className="rounded-3xl object-cover w-full h-44 sm:h-60 -mt-6 border border-[var(--velora-gold)]/30 shadow-2xl bg-black"
            />
            <img
              src={`${process.env.REACT_APP_BACKEND_URL}/api/static/products/mamra-almond.png`}
              alt="Mamra Almonds"
              className="rounded-3xl object-cover w-full h-44 sm:h-60 border border-[var(--velora-gold)]/30 shadow-2xl bg-black"
            />
          </div>

          {/* Floating badge */}
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-[var(--velora-cream)] text-[var(--velora-forest)] rounded-2xl px-5 py-3 shadow-2xl border border-[var(--velora-gold)]/40 flex items-center gap-3">
            <img src={BRAND.logo} alt="Velora" className="w-10 h-10 rounded-full object-cover border border-[var(--velora-gold)]/50" />
            <div className="leading-tight">
              <div className="text-[10px] tracking-widest uppercase text-[var(--velora-ink-soft)]">Trusted Since</div>
              <div className="font-display font-bold text-base">Velora &mdash; A name in purity</div>
            </div>
          </div>
        </div>
      </div>

      <div className="shine-divider" />
    </section>
  );
};
