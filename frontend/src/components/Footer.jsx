import { Phone, Mail, MapPin, Instagram, MessageCircle, Navigation } from "lucide-react";
import { BRAND, callLink, mailLink, waLink } from "@/data/constants";

export const Footer = () => (
  <footer className="bg-[var(--velora-ink)] text-[var(--velora-cream)] pt-14 pb-6 border-t border-[var(--velora-gold)]/20">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 grid gap-10 md:grid-cols-12">
      {/* Brand */}
      <div className="md:col-span-5">
        <div className="flex items-center gap-3">
          <img
            src={BRAND.logo}
            alt="Velora Dry Fruits"
            className="w-14 h-14 rounded-full object-cover border border-[var(--velora-gold)]/40"
          />
          <div>
            <div className="font-display text-2xl font-bold">Velora <span className="gold-text">Dry Fruits</span></div>
            <div className="text-xs tracking-widest uppercase text-[var(--velora-cream)]/60">Healthiest Lifestyle</div>
          </div>
        </div>
        <p className="text-sm text-[var(--velora-cream)]/70 mt-4 max-w-md">
          Premium quality dry fruits, nuts, seeds and chocolates &mdash; delivered fresh across India.
          Free delivery in Rajarajeshwari Nagar, Bengaluru.
        </p>
        <div className="mt-5 flex items-center gap-3">
          <a href={BRAND.instagram} target="_blank" rel="noreferrer" data-testid="footer-instagram" className="w-10 h-10 rounded-full border border-[var(--velora-gold)]/30 flex items-center justify-center hover:bg-[var(--velora-gold)] hover:text-[var(--velora-forest)] transition">
            <Instagram size={16} />
          </a>
          <a href={waLink()} target="_blank" rel="noreferrer" data-testid="footer-whatsapp" className="w-10 h-10 rounded-full border border-[var(--velora-gold)]/30 flex items-center justify-center hover:bg-[var(--velora-gold)] hover:text-[var(--velora-forest)] transition">
            <MessageCircle size={16} />
          </a>
          <a href={callLink} data-testid="footer-call" className="w-10 h-10 rounded-full border border-[var(--velora-gold)]/30 flex items-center justify-center hover:bg-[var(--velora-gold)] hover:text-[var(--velora-forest)] transition">
            <Phone size={16} />
          </a>
        </div>
      </div>

      {/* Quick links */}
      <div className="md:col-span-3">
        <h4 className="font-display text-lg font-bold text-[var(--velora-gold-bright)]">Explore</h4>
        <ul className="mt-4 space-y-2 text-sm text-[var(--velora-cream)]/80">
          <li><a className="hover:text-[var(--velora-gold-bright)]" href="#products">Shop Products</a></li>
          <li><a className="hover:text-[var(--velora-gold-bright)]" href="#offers">Special Offers</a></li>
          <li><a className="hover:text-[var(--velora-gold-bright)]" href="#why">Why Choose Us</a></li>
          <li><a className="hover:text-[var(--velora-gold-bright)]" href="#bulk">Wholesale / Bulk</a></li>
          <li><a className="hover:text-[var(--velora-gold-bright)]" href="#contact">Contact</a></li>
        </ul>
      </div>

      {/* Contact */}
      <div className="md:col-span-4">
        <h4 className="font-display text-lg font-bold text-[var(--velora-gold-bright)]">Reach Us</h4>
        <ul className="mt-4 space-y-3 text-sm">
          <li className="flex items-start gap-3">
            <Phone size={16} className="mt-0.5 text-[var(--velora-gold-bright)]" />
            <div>
              <div className="text-[10px] tracking-widest uppercase text-[var(--velora-cream)]/60">Phone / WhatsApp</div>
              <a href={callLink} className="font-display text-xl font-bold hover:text-[var(--velora-gold-bright)]">{BRAND.phone}</a>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <Mail size={16} className="mt-0.5 text-[var(--velora-gold-bright)]" />
            <a href={mailLink} className="font-semibold break-all hover:text-[var(--velora-gold-bright)]">{BRAND.email}</a>
          </li>
          <li className="flex items-start gap-3">
            <MapPin size={16} className="mt-0.5 text-[var(--velora-gold-bright)]" />
            <span className="text-[var(--velora-cream)]/80">
              {BRAND.address.line1}<br />
              {BRAND.address.line2}<br />
              {BRAND.address.line3}
            </span>
          </li>
        </ul>
        <a
          href={BRAND.mapsUrl}
          target="_blank"
          rel="noreferrer"
          data-testid="footer-directions"
          className="mt-4 inline-flex items-center gap-2 btn-gold px-5 py-2.5 rounded-full text-sm"
        >
          <Navigation size={14} /> Get Directions
        </a>
      </div>
    </div>

    <div className="shine-divider my-8 max-w-7xl mx-auto" />

    <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col-reverse md:flex-row items-center justify-between gap-4">
      <p className="text-xs text-[var(--velora-cream)]/60 text-center md:text-left">
        © {new Date().getFullYear()} Velora Dry Fruits. All Rights Reserved. Delivery across India.
      </p>
      <a
        href="#"
        data-testid="footer-digitara-partner"
        className="flex items-center gap-3 group rounded-2xl bg-white px-4 py-2.5 border border-[var(--velora-gold)]/30 hover:border-[var(--velora-gold)] transition shadow-md"
        aria-label="Digital Partner: Digitara — Business Solutions That Generate Leads"
      >
        <img
          src={BRAND.digitaraLogo}
          alt="Digitara"
          className="h-12 w-12 object-contain"
        />
        <div className="text-left leading-tight">
          <div className="text-[9px] tracking-[0.22em] uppercase text-[var(--velora-ink-soft)]">
            Digital Partner
          </div>
          <div className="font-display text-base font-bold text-[#0d2240]">Digitara</div>
          <div className="text-[9px] tracking-[0.12em] uppercase text-[#0d2240] font-semibold mt-0.5">
            Business Solutions That Generate Leads
          </div>
        </div>
      </a>
    </div>
  </footer>
);
