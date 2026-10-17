import { useState } from "react";
import { Phone, Mail, MapPin, Menu, X, Instagram, ShoppingBag } from "lucide-react";
import { BRAND, callLink, mailLink, waLink } from "@/data/constants";
import { useCart } from "@/context/CartContext";

const navLinks = [
  { href: "/#home", label: "Home" },
  { href: "/#products", label: "Shop" },
  { href: "/build-hamper", label: "Build Hamper" },
  { href: "/#offers", label: "Offers" },
  { href: "/#why", label: "Why Us" },
  { href: "/#contact", label: "Contact" },
];

export const Header = () => {
  const [open, setOpen] = useState(false);
  const { totalQty, setOpen: setCartOpen } = useCart();

  return (
    <>
      {/* Top contact ribbon */}
      <div
        data-testid="top-contact-bar"
        className="bg-[var(--velora-forest)] text-[var(--velora-cream)] text-xs sm:text-sm"
      >
        <div className="max-w-7xl mx-auto px-4 py-2 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-4 flex-wrap">
            <a href={callLink} className="flex items-center gap-1.5 hover:text-[var(--velora-gold-bright)]">
              <Phone size={13} /> <span className="font-semibold">{BRAND.phone}</span>
            </a>
            <span className="hidden sm:inline opacity-30">|</span>
            <a href={mailLink} className="hidden sm:flex items-center gap-1.5 hover:text-[var(--velora-gold-bright)]">
              <Mail size={13} /> {BRAND.email}
            </a>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden md:flex items-center gap-1.5 opacity-90">
              <MapPin size={13} className="text-[var(--velora-gold-bright)]" /> Rajarajeshwari Nagar, Bengaluru
            </span>
            <a
              href={BRAND.instagram}
              target="_blank"
              rel="noreferrer"
              data-testid="header-instagram-link"
              className="hover:text-[var(--velora-gold-bright)]"
              aria-label="Instagram"
            >
              <Instagram size={14} />
            </a>
          </div>
        </div>
      </div>

      <header
        data-testid="main-header"
        className="sticky top-0 z-50 bg-[var(--velora-cream-soft)]/95 backdrop-blur-md border-b border-[var(--velora-forest)]/10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <a href="#home" className="flex items-center gap-3" data-testid="brand-logo">
            <img
              src={BRAND.logo}
              alt="Velora Dry Fruits"
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover border border-[var(--velora-gold)]/40 shadow-md bg-[var(--velora-forest)]"
            />
            <div className="leading-tight">
              <div className="font-display text-lg sm:text-xl font-bold text-[var(--velora-forest)]">
                Velora <span className="gold-text">Dry Fruits</span>
              </div>
              <div className="text-[10px] sm:text-xs text-[var(--velora-ink-soft)] tracking-widest uppercase">
                Healthiest Lifestyle
              </div>
            </div>
          </a>

          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((n) => (
              <a
                key={n.href}
                href={n.href}
                data-testid={`nav-${n.label.toLowerCase().replace(/\s/g, "-")}`}
                className="text-sm font-medium text-[var(--velora-ink)] hover:text-[var(--velora-gold)] transition-colors"
              >
                {n.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCartOpen(true)}
              data-testid="header-cart-button"
              aria-label={`Open cart (${totalQty} items)`}
              className="relative w-10 h-10 rounded-full border border-[var(--velora-forest)]/20 text-[var(--velora-forest)] flex items-center justify-center hover:border-[var(--velora-gold)] hover:text-[var(--velora-gold)] transition"
            >
              <ShoppingBag size={18} />
              {totalQty > 0 && (
                <span
                  data-testid="header-cart-count"
                  className="absolute -top-1.5 -right-1.5 min-w-[20px] h-5 px-1.5 rounded-full bg-[var(--velora-gold)] text-[var(--velora-forest)] text-[10px] font-bold flex items-center justify-center border border-[var(--velora-cream-soft)]"
                >
                  {totalQty}
                </span>
              )}
            </button>
            <a
              href={waLink()}
              target="_blank"
              rel="noreferrer"
              data-testid="header-whatsapp-button"
              className="hidden sm:inline-flex btn-whatsapp px-4 py-2 rounded-full text-sm items-center gap-2"
            >
              <i className="fab fa-whatsapp" /> Order on WhatsApp
            </a>
            <button
              className="lg:hidden p-2 rounded-md border border-[var(--velora-forest)]/20 text-[var(--velora-forest)]"
              onClick={() => setOpen((v) => !v)}
              data-testid="mobile-menu-toggle"
              aria-label="Menu"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {open && (
          <div className="lg:hidden border-t border-[var(--velora-forest)]/10 bg-[var(--velora-cream)]">
            <div className="px-4 py-3 flex flex-col gap-1">
              {navLinks.map((n) => (
                <a
                  key={n.href}
                  href={n.href}
                  onClick={() => setOpen(false)}
                  className="py-2.5 px-2 rounded-md text-[var(--velora-ink)] hover:bg-[var(--velora-forest)]/5"
                  data-testid={`mobile-nav-${n.label.toLowerCase().replace(/\s/g, "-")}`}
                >
                  {n.label}
                </a>
              ))}
              <a
                href={waLink()}
                target="_blank"
                rel="noreferrer"
                className="mt-2 btn-whatsapp px-4 py-2.5 rounded-full text-sm text-center"
                data-testid="mobile-whatsapp-button"
              >
                Order on WhatsApp
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
