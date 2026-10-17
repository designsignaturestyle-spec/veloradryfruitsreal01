import { Phone, Mail, MapPin, MessageCircle, Navigation } from "lucide-react";
import { BRAND, callLink, mailLink, waLink } from "@/data/constants";

export const Contact = () => (
  <section id="contact" className="py-16 sm:py-20 bg-[var(--velora-cream)]">
    <div className="max-w-7xl mx-auto px-4 sm:px-6">
      <div className="text-center mb-10">
        <div className="section-eyebrow justify-center mx-auto">Get in Touch</div>
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--velora-forest)] mt-3">
          Reach out us <span className="italic gold-text">today</span>
        </h2>
        <p className="text-[var(--velora-ink-soft)] mt-2 text-sm sm:text-base">
          We&apos;d love to take your order or answer any question about our products.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 lg:gap-10">
        {/* Info side */}
        <div className="space-y-4">
          <a href={callLink} data-testid="contact-phone-card" className="card-luxury rounded-2xl p-5 sm:p-6 flex items-center gap-4 group">
            <div className="w-12 h-12 rounded-xl bg-[var(--velora-forest)] text-[var(--velora-gold-bright)] flex items-center justify-center">
              <Phone size={20} />
            </div>
            <div className="flex-1">
              <div className="text-[10px] tracking-[0.2em] uppercase text-[var(--velora-gold)]">Mobile / Call</div>
              <div className="font-display text-2xl sm:text-3xl font-bold text-[var(--velora-forest)]">{BRAND.phone}</div>
            </div>
          </a>

          <a href={waLink()} target="_blank" rel="noreferrer" data-testid="contact-whatsapp-card" className="card-luxury rounded-2xl p-5 sm:p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#25D366] text-white flex items-center justify-center">
              <MessageCircle size={20} />
            </div>
            <div className="flex-1">
              <div className="text-[10px] tracking-[0.2em] uppercase text-[var(--velora-gold)]">WhatsApp Orders</div>
              <div className="font-display text-2xl sm:text-3xl font-bold text-[var(--velora-forest)]">{BRAND.phone}</div>
            </div>
          </a>

          <a href={mailLink} data-testid="contact-email-card" className="card-luxury rounded-2xl p-5 sm:p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[var(--velora-forest)] text-[var(--velora-gold-bright)] flex items-center justify-center">
              <Mail size={20} />
            </div>
            <div className="flex-1">
              <div className="text-[10px] tracking-[0.2em] uppercase text-[var(--velora-gold)]">Email</div>
              <div className="font-display text-base sm:text-lg font-semibold text-[var(--velora-forest)] break-all">{BRAND.email}</div>
            </div>
          </a>

          <div data-testid="contact-address-card" className="card-luxury rounded-2xl p-5 sm:p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[var(--velora-forest)] text-[var(--velora-gold-bright)] flex items-center justify-center shrink-0">
                <MapPin size={20} />
              </div>
              <div className="flex-1">
                <div className="text-[10px] tracking-[0.2em] uppercase text-[var(--velora-gold)]">Visit Our Store</div>
                <div className="font-display text-lg sm:text-xl font-bold text-[var(--velora-forest)] mt-1">{BRAND.name}</div>
                <p className="text-sm text-[var(--velora-ink-soft)] mt-1">
                  {BRAND.address.line1}<br />
                  {BRAND.address.line2}<br />
                  {BRAND.address.line3}
                </p>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              <a href={callLink} data-testid="contact-call-button" className="btn-forest px-5 py-2.5 rounded-full text-sm inline-flex items-center gap-2">
                <Phone size={16} /> Call Now
              </a>
              <a href={waLink()} target="_blank" rel="noreferrer" data-testid="contact-order-wa-button" className="btn-whatsapp px-5 py-2.5 rounded-full text-sm inline-flex items-center gap-2">
                <MessageCircle size={16} /> Order on WhatsApp
              </a>
              <a href={BRAND.mapsUrl} target="_blank" rel="noreferrer" data-testid="contact-get-directions" className="btn-gold px-5 py-2.5 rounded-full text-sm inline-flex items-center gap-2">
                <Navigation size={16} /> Get Directions
              </a>
            </div>
          </div>
        </div>

        {/* Map side */}
        <div className="card-luxury rounded-3xl overflow-hidden h-[420px] sm:h-[560px] lg:h-full min-h-[420px]">
          <iframe
            data-testid="contact-map-iframe"
            title="Velora Dry Fruits location"
            src="https://www.google.com/maps?q=Velora+Dry+Fruits+Near+Meghana+Foods+Opposite+Shopping+City+Rajarajeshwari+Nagar+Bengaluru&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0, minHeight: 420 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </div>
  </section>
);
