import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";
import { waLink } from "@/data/constants";

const MESSAGES = [
  "Festive Offer — Buy ₹2,000 & get Premium Dates FREE",
  "Diwali Special — Free luxury gift packing on orders above ₹1,500",
  "Wedding-Season — Wholesale rates available on bulk hampers",
  "Eid Edition — Premium Ajwa & Medjool Dates restocked weekly",
  "Free delivery in Rajarajeshwari Nagar • Delivery across India",
];

export const FestiveBanner = () => {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setIdx((i) => (i + 1) % MESSAGES.length);
    }, 4500);
    return () => clearInterval(t);
  }, []);

  return (
    <a
      href={waLink()}
      target="_blank"
      rel="noreferrer"
      data-testid="festive-banner"
      className="block w-full text-center text-[11px] sm:text-xs tracking-wider uppercase font-semibold py-2 px-3 text-[var(--velora-forest)] overflow-hidden"
      style={{
        background:
          "linear-gradient(90deg, #e5c168 0%, #f0d684 25%, #ffe9a8 50%, #f0d684 75%, #e5c168 100%)",
        backgroundSize: "200% 100%",
        animation: "festiveShimmer 6s linear infinite",
      }}
    >
      <span className="inline-flex items-center gap-2 max-w-full">
        <Sparkles size={14} className="text-[var(--velora-forest)] shrink-0" />
        <span
          key={idx}
          data-testid={`festive-message-${idx}`}
          className="fade-up inline-block truncate"
        >
          {MESSAGES[idx]}
        </span>
        <span className="hidden sm:inline opacity-80">• Tap to order on WhatsApp</span>
      </span>
    </a>
  );
};
