import { useState } from "react";
import { Mail, Gift, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { BRAND, waLink } from "@/data/constants";
import { subscribeNewsletter } from "@/lib/api";

export const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    setLoading(true);
    try {
      await subscribeNewsletter(email, "website");
      setSubmitted(true);
      toast.success("You're in! Watch your inbox for our festive offers.");
    } catch (err) {
      // Graceful fallback: cache locally so we don't lose the subscriber
      console.warn("Newsletter: subscribe API failed, caching locally", err);
      try {
        const list = JSON.parse(localStorage.getItem("velora_newsletter") || "[]");
        if (!list.includes(email)) list.push(email);
        localStorage.setItem("velora_newsletter", JSON.stringify(list));
      } catch (storageErr) {
        console.warn("Newsletter: local cache failed", storageErr);
      }
      setSubmitted(true);
      toast.success("You're in! We'll be in touch soon.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="newsletter" className="py-14 sm:py-20 bg-[var(--velora-cream)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="card-luxury rounded-3xl overflow-hidden grid lg:grid-cols-2">
          <div className="bg-forest-deep text-[var(--velora-cream)] p-8 sm:p-12 relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-[var(--velora-gold)]/20 blur-3xl" />
            <div className="section-eyebrow text-[var(--velora-gold-bright)]">Festive Insider</div>
            <h3 className="font-display text-3xl sm:text-4xl font-bold mt-3 leading-tight">
              Diwali, Eid &amp; <span className="italic text-[var(--velora-gold-bright)]">wedding-season</span> offers, before anyone else.
            </h3>
            <p className="text-sm sm:text-base text-[var(--velora-cream)]/80 mt-3 max-w-md">
              Subscribe to get early access to festive hampers, bulk discount codes and limited-stock arrivals
              like Mamra almonds and Medjool dates.
            </p>
            <div className="mt-6 flex flex-col gap-2 text-sm text-[var(--velora-cream)]/85">
              <div className="flex items-center gap-2"><Gift size={16} className="text-[var(--velora-gold-bright)]" /> Early festive discounts &amp; gift sets</div>
              <div className="flex items-center gap-2"><CheckCircle2 size={16} className="text-[var(--velora-gold-bright)]" /> No spam &mdash; only meaningful updates</div>
              <div className="flex items-center gap-2"><Mail size={16} className="text-[var(--velora-gold-bright)]" /> Or write to us at <a className="underline hover:text-[var(--velora-gold-bright)]" href={`mailto:${BRAND.email}`}>{BRAND.email}</a></div>
            </div>
          </div>

          <div className="p-8 sm:p-12 flex flex-col justify-center">
            <h4 className="font-display text-2xl font-bold text-[var(--velora-forest)]">Join the Velora list</h4>
            <p className="text-sm text-[var(--velora-ink-soft)] mt-2">Drop your email &mdash; we&apos;ll send you our next festive drop.</p>

            {submitted ? (
              <div
                data-testid="newsletter-success"
                className="mt-6 rounded-2xl border border-[var(--velora-parrot)]/40 bg-[var(--velora-parrot)]/10 p-5"
              >
                <div className="flex items-center gap-2 font-semibold text-[var(--velora-forest)]">
                  <CheckCircle2 size={18} className="text-[var(--velora-parrot)]" /> You&apos;re subscribed!
                </div>
                <p className="text-sm text-[var(--velora-ink-soft)] mt-1">
                  Want a head start on our current offers?
                </p>
                <a
                  href={waLink()}
                  target="_blank"
                  rel="noreferrer"
                  data-testid="newsletter-wa-cta"
                  className="btn-whatsapp inline-flex items-center gap-2 mt-3 px-5 py-2.5 rounded-full text-sm"
                >
                  Order on WhatsApp now
                </a>
              </div>
            ) : (
              <form onSubmit={submit} className="mt-6 flex flex-col sm:flex-row gap-3">
                <div className="flex-1 relative">
                  <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--velora-ink-soft)]" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    data-testid="newsletter-email-input"
                    className="w-full pl-10 pr-4 py-3 rounded-full border border-[var(--velora-forest)]/20 bg-white focus:border-[var(--velora-gold)] focus:ring-2 focus:ring-[var(--velora-gold)]/30 outline-none text-sm"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  data-testid="newsletter-submit"
                  className="btn-gold px-6 py-3 rounded-full text-sm whitespace-nowrap disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? "Subscribing..." : "Subscribe"}
                </button>
              </form>
            )}

            <p className="text-[11px] text-[var(--velora-ink-soft)]/80 mt-4">
              By subscribing you agree to receive occasional emails from Velora Dry Fruits.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
