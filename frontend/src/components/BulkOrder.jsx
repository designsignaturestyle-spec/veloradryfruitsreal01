import { Building2, PartyPopper, Briefcase } from "lucide-react";
import { waLink, callLink, BRAND } from "@/data/constants";

const useCases = [
  { icon: Building2, title: "Corporate Gifting", desc: "Diwali, employee welcome, client appreciation." },
  { icon: PartyPopper, title: "Weddings & Events", desc: "Bulk gift hampers and trousseau packs." },
  { icon: Briefcase, title: "Retailers & Resellers", desc: "Wholesale pricing for stores & exporters." },
];

export const BulkOrder = () => (
  <section id="bulk" className="py-16 sm:py-20 bg-velora-grain">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
      <div>
        <div className="section-eyebrow">Bulk & Wholesale</div>
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--velora-forest)] mt-3">
          Let&apos;s get the business <span className="italic gold-text">started.</span>
        </h2>
        <p className="text-[var(--velora-ink-soft)] mt-3 text-sm sm:text-base max-w-lg">
          We provide premium dry fruits at <strong>wholesale prices</strong> for corporate gifting, weddings,
          retail and export. Reach out to us today for a custom quote.
        </p>

        <div className="mt-6 grid sm:grid-cols-2 gap-3 max-w-lg">
          <a href={callLink} data-testid="bulk-call-card" className="rounded-2xl p-4 bg-white border border-[var(--velora-forest)]/10 hover:border-[var(--velora-gold)] transition block">
            <div className="text-[10px] tracking-[0.2em] text-[var(--velora-gold)] uppercase">Direct Line</div>
            <div className="font-display text-xl sm:text-2xl font-bold text-[var(--velora-forest)]">{BRAND.phone}</div>
          </a>
          <a href={`mailto:${BRAND.email}?subject=Bulk%20Order%20Enquiry`} data-testid="bulk-email-card" className="rounded-2xl p-4 bg-white border border-[var(--velora-forest)]/10 hover:border-[var(--velora-gold)] transition block min-w-0">
            <div className="text-[10px] tracking-[0.2em] text-[var(--velora-gold)] uppercase">Bulk Enquiry</div>
            <div className="font-display text-sm sm:text-base font-semibold text-[var(--velora-forest)] whitespace-nowrap overflow-hidden text-ellipsis">{BRAND.email}</div>
          </a>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={`https://wa.me/${BRAND.whatsappNumber}?text=Hello%20Velora%20Dry%20Fruits%2C%20I%20would%20like%20a%20wholesale%2Fbulk%20order%20quote.`}
            target="_blank"
            rel="noreferrer"
            data-testid="bulk-whatsapp-cta"
            className="btn-whatsapp px-6 py-3 rounded-full text-sm inline-flex items-center gap-2"
          >
            Request Bulk Quote
          </a>
          <a href={callLink} data-testid="bulk-call-cta" className="btn-forest px-6 py-3 rounded-full text-sm">
            Call Now
          </a>
        </div>
      </div>

      <div className="grid gap-4">
        {useCases.map((u, idx) => (
          <div key={u.title} data-testid={`bulk-usecase-${idx}`} className="card-luxury rounded-2xl p-5 sm:p-6 flex gap-4 items-start">
            <div className="w-12 h-12 rounded-xl bg-[var(--velora-forest)] text-[var(--velora-gold-bright)] flex items-center justify-center shrink-0">
              <u.icon size={20} />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg sm:text-xl text-[var(--velora-forest)]">{u.title}</h3>
              <p className="text-sm text-[var(--velora-ink-soft)] mt-1">{u.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);
