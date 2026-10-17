import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Plus, X, Sparkles, MessageCircle, Gift } from "lucide-react";
import { toast } from "sonner";
import { WEIGHT_OPTIONS, priceFor } from "@/data/products";
import { useProducts } from "@/context/ProductsContext";
import { BRAND } from "@/data/constants";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { FestiveBanner } from "@/components/FestiveBanner";
import { CartDrawer } from "@/components/CartDrawer";
import { Toaster } from "@/components/ui/sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const MIN_ITEMS = 4;
const MAX_ITEMS = 6;
const PACKAGING_FEE = 250;
const HAMPER_SUGGESTIONS = [
  {
    name: "Diwali Festive",
    icon: "🪔",
    slugs: ["mamra-almond", "medjool-dates", "pista-akbari", "anjeer-jumbo"],
  },
  {
    name: "Wellness Pack",
    icon: "💚",
    slugs: ["chia-seeds", "flax-seeds", "amla-honey", "walnut-kernel"],
  },
  {
    name: "Wedding Royale",
    icon: "💍",
    slugs: ["mamra-almond", "ajwa-dates", "cashew-jumbo-roasted", "pista-akbari", "anjeer-jumbo"],
  },
  {
    name: "Office Snack Box",
    icon: "🏢",
    slugs: ["dry-fruits-mix", "makhana-plain", "chia-seeds", "cranberries"],
  },
];

export default function HamperBuilder() {
  const { products } = useProducts();
  const CHOOSABLE = useMemo(() => products.filter((p) => !p.isGift), [products]);
  const [slots, setSlots] = useState([]); // [{slug, weight}]
  const [pickerOpen, setPickerOpen] = useState(false);
  const [pickerCategory, setPickerCategory] = useState("All");
  const [searchQ, setSearchQ] = useState("");

  const subtotal = useMemo(
    () =>
      slots.reduce((sum, s) => {
        const p = products.find((x) => x.slug === s.slug);
        return sum + (p ? priceFor(p.price, s.weight) : 0);
      }, 0),
    [slots, products]
  );
  const total = subtotal + (slots.length > 0 ? PACKAGING_FEE : 0);
  const canSend = slots.length >= MIN_ITEMS;

  const addProduct = (product) => {
    if (slots.length >= MAX_ITEMS) {
      toast.error(`A hamper can hold a maximum of ${MAX_ITEMS} items.`);
      return;
    }
    setSlots((s) => [...s, { slug: product.slug, weight: "250g" }]);
    setPickerOpen(false);
    toast.success(`${product.name} added to hamper`);
  };

  const removeSlot = (idx) => {
    setSlots((s) => s.filter((_, i) => i !== idx));
  };

  const changeWeight = (idx, weight) => {
    setSlots((s) => s.map((it, i) => (i === idx ? { ...it, weight } : it)));
  };

  const applyPreset = (preset) => {
    const items = preset.slugs
      .map((slug) => products.find((p) => p.slug === slug))
      .filter(Boolean)
      .slice(0, MAX_ITEMS)
      .map((p) => ({ slug: p.slug, weight: "250g" }));
    setSlots(items);
    toast.success(`${preset.name} preset loaded`);
  };

  const filteredCatalog = useMemo(() => {
    const q = searchQ.trim().toLowerCase();
    return CHOOSABLE.filter((p) => {
      if (pickerCategory !== "All" && p.category !== pickerCategory) return false;
      if (q && !p.name.toLowerCase().includes(q) && !p.category.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [pickerCategory, searchQ, CHOOSABLE]);

  const pickerCategories = useMemo(
    () => ["All", ...Array.from(new Set(CHOOSABLE.map((p) => p.category))).sort()],
    [CHOOSABLE]
  );

  const buildWaMessage = () => {
    const lines = [
      "Hello Velora Dry Fruits,",
      `I would like to order a CUSTOM HAMPER (${slots.length} items):`,
      "",
      ...slots.map((s, idx) => {
        const p = products.find((x) => x.slug === s.slug);
        if (!p) return "";
        const unit = priceFor(p.price, s.weight);
        return `${idx + 1}. ${p.name} — ${s.weight} @ ₹${unit}`;
      }),
      "",
      `Items subtotal: ₹${subtotal.toLocaleString("en-IN")}`,
      `Custom packaging: ₹${PACKAGING_FEE}`,
      `Hamper total: ₹${total.toLocaleString("en-IN")}`,
      "Please confirm packaging style and delivery details.",
    ];
    return encodeURIComponent(lines.join("\n"));
  };

  const waUrl = `https://wa.me/${BRAND.whatsappNumber}?text=${buildWaMessage()}`;

  return (
    <div className="bg-[var(--velora-cream-soft)] min-h-screen" data-testid="hamper-builder-page">
      <FestiveBanner />
      <Header />

      <main>
        {/* Hero */}
        <section className="bg-forest-deep text-[var(--velora-cream)] py-12 sm:py-16 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
            <Link
              to="/"
              data-testid="hamper-back-link"
              className="inline-flex items-center gap-2 text-sm text-[var(--velora-gold-bright)] hover:text-white"
            >
              <ArrowLeft size={16} /> Back to home
            </Link>
            <div className="mt-4 grid lg:grid-cols-3 gap-6 items-end">
              <div className="lg:col-span-2">
                <div className="section-eyebrow text-[var(--velora-gold-bright)]">Velora Hamper Studio</div>
                <h1 className="font-display text-4xl sm:text-5xl font-bold leading-tight mt-3">
                  Build your own <span className="italic text-[var(--velora-gold-bright)]">luxury hamper</span>
                </h1>
                <p className="mt-3 text-[var(--velora-cream)]/80 max-w-2xl text-sm sm:text-base">
                  Pick {MIN_ITEMS}–{MAX_ITEMS} of your favourite Velora dry fruits, nuts, seeds or chocolates.
                  We&apos;ll pack them in an emerald-and-gold gift box, hand-tied with a satin ribbon.
                </p>
              </div>
              <div className="rounded-2xl border border-[var(--velora-gold)]/30 bg-[var(--velora-cream)]/5 backdrop-blur p-4 text-sm">
                <div className="flex items-center gap-2 font-display text-base font-bold">
                  <Gift size={18} className="text-[var(--velora-gold-bright)]" /> Hamper Pricing
                </div>
                <ul className="mt-2 space-y-1 text-[var(--velora-cream)]/85 text-xs">
                  <li>· Items priced per chosen weight</li>
                  <li>· Custom packaging: ₹{PACKAGING_FEE}</li>
                  <li>· Free for orders above ₹3,000</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Presets */}
        <section className="py-6 bg-[var(--velora-cream)] border-b border-[var(--velora-forest)]/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div className="text-[10px] tracking-[0.22em] uppercase text-[var(--velora-gold)] font-semibold">
                Quick start preset
              </div>
              <div className="flex flex-wrap gap-2">
                {HAMPER_SUGGESTIONS.map((p) => (
                  <button
                    key={p.name}
                    onClick={() => applyPreset(p)}
                    data-testid={`preset-${p.name.toLowerCase().replace(/\s/g, "-")}`}
                    className="px-3 py-1.5 rounded-full text-xs bg-white border border-[var(--velora-forest)]/15 hover:border-[var(--velora-gold)] text-[var(--velora-forest)] inline-flex items-center gap-1.5"
                  >
                    <span>{p.icon}</span> {p.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Builder grid */}
        <section className="py-10 sm:py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-3 gap-6 lg:gap-10">
            <div className="lg:col-span-2">
              <div className="flex items-baseline justify-between mb-4">
                <h2 className="font-display text-2xl font-bold text-[var(--velora-forest)]">
                  Your hamper
                  <span className="text-sm text-[var(--velora-ink-soft)] ml-2 font-sans">
                    ({slots.length} / {MAX_ITEMS})
                  </span>
                </h2>
                <button
                  onClick={() => setPickerOpen(true)}
                  disabled={slots.length >= MAX_ITEMS}
                  data-testid="hamper-add-item-top"
                  className="btn-gold px-4 py-2 rounded-full text-xs font-semibold inline-flex items-center gap-1.5 disabled:opacity-50"
                >
                  <Plus size={14} /> Add item
                </button>
              </div>

              <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                {[...Array(MAX_ITEMS)].map((_, idx) => {
                  const slot = slots[idx];
                  if (!slot) {
                    // empty placeholder
                    return (
                      <button
                        key={`empty-${idx}`}
                        onClick={() => setPickerOpen(true)}
                        data-testid={`hamper-empty-slot-${idx}`}
                        className={`aspect-[3/1.4] rounded-2xl border-2 border-dashed transition flex items-center justify-center text-center p-4 ${
                          idx < MIN_ITEMS
                            ? "border-[var(--velora-gold)]/50 bg-[var(--velora-gold)]/5 hover:bg-[var(--velora-gold)]/10"
                            : "border-[var(--velora-forest)]/15 bg-white/50 hover:bg-white"
                        }`}
                      >
                        <div>
                          <div className="text-[var(--velora-gold)]">
                            <Plus size={22} className="mx-auto" />
                          </div>
                          <div className="text-xs mt-1 text-[var(--velora-ink-soft)]">
                            Slot {idx + 1}
                            {idx < MIN_ITEMS && (
                              <span className="text-[var(--velora-gold)] font-semibold"> · required</span>
                            )}
                          </div>
                        </div>
                      </button>
                    );
                  }
                  const product = products.find((p) => p.slug === slot.slug);
                  if (!product) return null;
                  const linePrice = priceFor(product.price, slot.weight);
                  return (
                    <div
                      key={`slot-${idx}`}
                      data-testid={`hamper-slot-${idx}`}
                      className="card-luxury rounded-2xl overflow-hidden flex"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-24 h-24 sm:w-28 sm:h-28 object-cover bg-black shrink-0"
                      />
                      <div className="flex-1 p-3 flex flex-col justify-between">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <div className="font-display font-semibold text-sm text-[var(--velora-forest)] line-clamp-2">
                              {product.name}
                            </div>
                            <div className="text-[10px] tracking-wider uppercase text-[var(--velora-gold)] mt-0.5">
                              {product.category}
                            </div>
                          </div>
                          <button
                            onClick={() => removeSlot(idx)}
                            data-testid={`hamper-remove-${idx}`}
                            aria-label="Remove"
                            className="text-red-700/70 hover:text-red-800 p-1"
                          >
                            <X size={14} />
                          </button>
                        </div>
                        <div className="mt-1 flex items-end justify-between gap-1">
                          <div className="inline-flex gap-1">
                            {WEIGHT_OPTIONS.map((w) => {
                              const active = slot.weight === w.key;
                              return (
                                <button
                                  key={w.key}
                                  onClick={() => changeWeight(idx, w.key)}
                                  data-testid={`hamper-weight-${idx}-${w.key}`}
                                  data-active={active}
                                  className={`px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wider transition border ${
                                    active
                                      ? "bg-[var(--velora-forest)] text-[var(--velora-gold-bright)] border-[var(--velora-forest)]"
                                      : "bg-white text-[var(--velora-forest)] border-[var(--velora-forest)]/15"
                                  }`}
                                >
                                  {w.label}
                                </button>
                              );
                            })}
                          </div>
                          <div className="font-display text-base font-bold text-[var(--velora-forest)]">
                            ₹{linePrice}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Sticky summary */}
            <aside>
              <div className="card-luxury rounded-2xl p-5 sm:p-6 lg:sticky lg:top-32">
                <div className="flex items-center gap-2 text-[var(--velora-forest)]">
                  <Sparkles size={18} className="text-[var(--velora-gold)]" />
                  <h3 className="font-display text-xl font-bold">Hamper summary</h3>
                </div>

                <div className="mt-4 space-y-1 text-sm">
                  <div className="flex justify-between text-[var(--velora-ink-soft)]">
                    <span>Items ({slots.length})</span>
                    <span data-testid="hamper-subtotal">₹{subtotal.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between text-[var(--velora-ink-soft)]">
                    <span>Custom packaging</span>
                    <span>{slots.length === 0 ? "—" : `₹${PACKAGING_FEE}`}</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-[var(--velora-forest)]/10 flex items-baseline justify-between">
                  <span className="text-xs uppercase tracking-widest text-[var(--velora-gold)]">Total</span>
                  <span
                    data-testid="hamper-total"
                    className="font-display text-3xl font-bold text-[var(--velora-forest)]"
                  >
                    ₹{total.toLocaleString("en-IN")}
                  </span>
                </div>

                {!canSend && (
                  <div className="mt-3 text-xs text-[var(--velora-ink-soft)] bg-[var(--velora-gold)]/8 border border-dashed border-[var(--velora-gold)]/40 rounded-xl p-2.5">
                    Add at least {MIN_ITEMS - slots.length} more {MIN_ITEMS - slots.length === 1 ? "item" : "items"} to send your hamper.
                  </div>
                )}

                <a
                  href={canSend ? waUrl : undefined}
                  target={canSend ? "_blank" : undefined}
                  rel="noreferrer"
                  data-testid="hamper-send-wa"
                  aria-disabled={!canSend}
                  className={`mt-4 w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full text-sm font-semibold transition ${
                    canSend
                      ? "btn-whatsapp"
                      : "bg-[var(--velora-forest)]/10 text-[var(--velora-forest)]/40 cursor-not-allowed"
                  }`}
                  onClick={(e) => { if (!canSend) e.preventDefault(); }}
                >
                  <MessageCircle size={16} /> Send hamper on WhatsApp
                </a>

                <button
                  onClick={() => setSlots([])}
                  disabled={slots.length === 0}
                  data-testid="hamper-clear"
                  className="mt-2 w-full px-4 py-2 rounded-full text-xs text-[var(--velora-ink-soft)] hover:text-red-800 disabled:opacity-40"
                >
                  Clear hamper
                </button>

                <p className="text-[10px] text-center text-[var(--velora-ink-soft)] mt-3">
                  Final hamper is hand-assembled and confirmed by our team on WhatsApp.
                </p>
              </div>
            </aside>
          </div>
        </section>
      </main>

      {/* Product picker dialog */}
      <Dialog open={pickerOpen} onOpenChange={setPickerOpen}>
        <DialogContent
          data-testid="hamper-picker-dialog"
          className="max-w-3xl bg-[var(--velora-cream-soft)] p-0 overflow-hidden"
        >
          <DialogHeader className="px-5 py-4 border-b border-[var(--velora-forest)]/10">
            <DialogTitle className="font-display text-xl text-[var(--velora-forest)]">
              Pick an item for your hamper
            </DialogTitle>
            <DialogDescription className="text-xs text-[var(--velora-ink-soft)]">
              Slot {slots.length + 1} of {MAX_ITEMS}
            </DialogDescription>
          </DialogHeader>

          <div className="px-5 py-3 border-b border-[var(--velora-forest)]/10 bg-white space-y-2">
            <input
              type="text"
              placeholder="Search almonds, dates, chia..."
              value={searchQ}
              onChange={(e) => setSearchQ(e.target.value)}
              data-testid="hamper-picker-search"
              className="w-full px-4 py-2.5 rounded-full border border-[var(--velora-forest)]/15 bg-[var(--velora-cream-soft)] focus:border-[var(--velora-gold)] focus:ring-2 focus:ring-[var(--velora-gold)]/30 outline-none text-sm"
            />
            <div className="flex flex-wrap gap-1.5">
              {pickerCategories.map((c) => (
                <button
                  key={c}
                  onClick={() => setPickerCategory(c)}
                  data-active={pickerCategory === c}
                  data-testid={`hamper-picker-cat-${c.toLowerCase().replace(/\s/g, "-")}`}
                  className="cat-pill px-2.5 py-1 rounded-full text-[11px] font-medium"
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="max-h-[55vh] overflow-y-auto p-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
            {filteredCatalog.map((p) => (
              <button
                key={p.slug}
                onClick={() => addProduct(p)}
                data-testid={`hamper-pick-${p.slug}`}
                className="text-left card-luxury rounded-2xl overflow-hidden hover:border-[var(--velora-gold)]"
              >
                <img src={p.image} alt={p.name} className="w-full aspect-square object-cover bg-black" />
                <div className="p-2.5">
                  <div className="font-display font-semibold text-xs text-[var(--velora-forest)] line-clamp-2">
                    {p.name}
                  </div>
                  <div className="text-[10px] tracking-wider uppercase text-[var(--velora-gold)] mt-0.5">
                    {p.category}
                  </div>
                  <div className="text-xs font-bold text-[var(--velora-forest)] mt-1">
                    From ₹{priceFor(p.price, "100g")}
                  </div>
                </div>
              </button>
            ))}
            {filteredCatalog.length === 0 && (
              <div className="col-span-full p-6 text-center text-[var(--velora-ink-soft)] text-sm">
                No products match your filter.
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
      <FloatingWhatsApp />
      <CartDrawer />
      <Toaster position="bottom-right" richColors />
    </div>
  );
}
