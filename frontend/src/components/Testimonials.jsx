import { Quote, Star } from "lucide-react";

const items = [
  {
    quote:
      "Velora's Mamra almonds are the freshest I have ever tasted. The pouch arrived sealed, premium, and beautifully presented — loved by the whole family.",
    name: "Priya R.",
    place: "Rajarajeshwari Nagar, Bengaluru",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&h=200&q=80",
  },
  {
    quote:
      "I ordered Medjool dates and Ajwa for our Eid hampers. Quality is straight from the Gulf and the packaging is gift-ready. Will reorder for Diwali too.",
    name: "Imran S.",
    place: "Banashankari, Bengaluru",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&h=200&q=80",
  },
  {
    quote:
      "We use Velora for our corporate Diwali boxes — clients keep complimenting the freshness and the elegant emerald-and-gold look.",
    name: "Anjali K.",
    place: "Whitefield, Bengaluru",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&h=200&q=80",
  },
  {
    quote:
      "The seeds mix and chia have become a daily ritual. Free delivery in RR Nagar was a lovely surprise. Five stars!",
    name: "Naveen M.",
    place: "RR Nagar, Bengaluru",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&h=200&q=80",
  },
];

export const Testimonials = () => (
  <section className="py-16 sm:py-20 bg-[var(--velora-cream-soft)]">
    <div className="max-w-7xl mx-auto px-4 sm:px-6">
      <div className="text-center mb-10">
        <div className="section-eyebrow justify-center mx-auto">Loved by families</div>
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--velora-forest)] mt-3">
          What our <span className="italic gold-text">customers say</span>
        </h2>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {items.map((t, idx) => (
          <figure
            key={t.name}
            data-testid={`testimonial-${idx}`}
            className="card-luxury rounded-3xl p-6 sm:p-7 flex flex-col"
          >
            <Quote size={22} className="text-[var(--velora-gold)]" />
            <blockquote className="mt-3 text-sm sm:text-base text-[var(--velora-ink-soft)] leading-relaxed flex-1">
              &ldquo;{t.quote}&rdquo;
            </blockquote>
            <div className="flex items-center gap-1 mt-4 text-[var(--velora-gold)]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} fill="currentColor" />
              ))}
            </div>
            <figcaption className="mt-3 flex items-center gap-3">
              <img
                src={t.avatar}
                alt={t.name}
                data-testid={`testimonial-avatar-${idx}`}
                className="w-12 h-12 rounded-full object-cover border-2 border-[var(--velora-gold)]/30 shadow-sm"
                loading="lazy"
              />
              <div>
                <div className="font-display font-bold text-[var(--velora-forest)]">{t.name}</div>
                <div className="text-xs text-[var(--velora-ink-soft)]">{t.place}</div>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  </section>
);
