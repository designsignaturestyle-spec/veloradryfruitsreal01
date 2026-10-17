import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, MessageCircle, Phone, ShieldCheck, Leaf, Package, BookOpen, Plus, Minus, ShoppingBag } from "lucide-react";
import { priceFor } from "@/data/products";
import { useProducts } from "@/context/ProductsContext";
import { BRAND, callLink, waLink } from "@/data/constants";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { FestiveBanner } from "@/components/FestiveBanner";
import { ProductCard } from "@/components/ProductCard";
import { CartDrawer } from "@/components/CartDrawer";
import { Toaster } from "@/components/ui/sonner";
import { useCart } from "@/context/CartContext";
import { WeightSelector } from "@/components/WeightSelector";

export default function ProductDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { products, bySlug } = useProducts();
  const product = bySlug[slug];
  const { addItem, setOpen: setCartOpen } = useCart();
  const [qty, setQty] = useState(1);
  const [weight, setWeight] = useState("1kg");
  const livePrice = product && !product.isGift ? priceFor(product.price, weight) : product?.price || 0;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    if (product) {
      document.title = `${product.name} — Velora Dry Fruits`;
      const m = document.querySelector('meta[name="description"]');
      if (m) m.setAttribute("content", product.description);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--velora-cream)]">
        <div className="text-center">
          <h1 className="font-display text-2xl text-[var(--velora-forest)]">Product not found</h1>
          <button onClick={() => navigate("/")} className="btn-forest mt-4 px-5 py-2.5 rounded-full text-sm">
            Back to home
          </button>
        </div>
      </div>
    );
  }

  const related = products.filter(
    (p) => p.category === product.category && p.slug !== product.slug
  ).slice(0, 4);

  const ldJson = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: product.name,
    image: [product.image],
    description: product.description,
    brand: { "@type": "Brand", name: "Velora Dry Fruits" },
    category: product.category,
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      price: product.price,
      availability: "https://schema.org/InStock",
      url: typeof window !== "undefined" ? window.location.href : "",
    },
  };

  return (
    <div className="bg-[var(--velora-cream-soft)] min-h-screen" data-testid={`product-page-${product.slug}`}>
      <FestiveBanner />
      <Header />

      <main>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6">
          <Link
            to="/"
            data-testid="product-back"
            className="inline-flex items-center gap-2 text-sm text-[var(--velora-forest)] hover:text-[var(--velora-gold)]"
          >
            <ArrowLeft size={16} /> Back to all products
          </Link>
        </div>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 grid lg:grid-cols-2 gap-10">
          {/* Gallery */}
          <div>
            <div className="card-luxury rounded-3xl overflow-hidden bg-marble">
              <img
                src={product.image}
                alt={product.name}
                data-testid="product-main-image"
                className="w-full aspect-square object-cover"
              />
            </div>
   </div>

          {/* Info */}
          <div>
            <div className="text-[10px] tracking-[0.22em] uppercase text-[var(--velora-gold)]">
              {product.category}
            </div>
            <h1
              data-testid="product-title"
              className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--velora-forest)] mt-2 leading-tight"
            >
              {product.name}
            </h1>

            <div className="mt-4 flex items-baseline gap-2">
              {product.isGift ? (
                <span
                  data-testid="pdp-price"
                  className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-wider gold-text"
                >
                  Price on enquiry
                </span>
              ) : (
                <>
                  <span data-testid="pdp-price" className="font-display text-4xl font-bold text-[var(--velora-forest)]">
                    ₹{livePrice.toLocaleString("en-IN")}
                  </span>
                  <span className="text-sm text-[var(--velora-ink-soft)]">
                    / {weight} • inclusive of taxes
                  </span>
                </>
              )}
            </div>

            {!product.isGift && (
              <div className="mt-5">
                <div className="text-[10px] tracking-[0.22em] uppercase text-[var(--velora-gold)] mb-2">
                  Choose weight
                </div>
                <WeightSelector
                  value={weight}
                  onChange={(w) => setWeight(w)}
                  testIdPrefix="pdp-w"
                />
              </div>
            )}

            <p className="mt-4 text-[var(--velora-ink-soft)] leading-relaxed">{product.description}</p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center rounded-full border border-[var(--velora-forest)]/20 bg-white">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  data-testid="pdp-qty-dec"
                  aria-label="Decrease quantity"
                  className="px-3 py-2.5 text-[var(--velora-forest)] hover:text-[var(--velora-gold)]"
                >
                  <Minus size={14} />
                </button>
                <span data-testid="pdp-qty" className="px-3 text-sm font-semibold text-[var(--velora-forest)] min-w-[32px] text-center">
                  {qty}
                </span>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  data-testid="pdp-qty-inc"
                  aria-label="Increase quantity"
                  className="px-3 py-2.5 text-[var(--velora-forest)] hover:text-[var(--velora-gold)]"
                >
                  <Plus size={14} />
                </button>
              </div>

              <button
                onClick={() => { addItem(product, qty, weight); }}
                disabled={product.inStock === false}
                data-testid="pdp-add-to-cart"
                className="btn-gold px-6 py-3 rounded-full inline-flex items-center gap-2 text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ShoppingBag size={16} /> {product.inStock === false ? "Sold Out" : "Add to Cart"}
              </button>
              <button
                onClick={() => { addItem(product, qty, weight); setCartOpen(true); }}
                disabled={product.inStock === false}
                data-testid="pdp-buy-now"
                className="btn-forest px-6 py-3 rounded-full inline-flex items-center gap-2 text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Buy Now
              </button>
              <a
                href={waLink(product.isGift ? `${product.name} × ${qty}` : `${product.name} (${weight}) × ${qty}`)}
                target="_blank"
                rel="noreferrer"
                data-testid="product-order-wa"
                className="btn-whatsapp px-6 py-3 rounded-full inline-flex items-center gap-2 text-sm"
              >
                <MessageCircle size={16} /> WhatsApp
              </a>
              <a
                href={callLink}
                data-testid="product-call"
                className="px-4 py-3 rounded-full inline-flex items-center gap-2 text-sm border border-[var(--velora-forest)]/20 hover:border-[var(--velora-gold)] transition"
              >
                <Phone size={16} />
              </a>
            </div>

            <ul className="mt-6 grid sm:grid-cols-2 gap-3 text-sm">
              <li className="flex items-center gap-2"><ShieldCheck size={16} className="text-[var(--velora-gold)]" /> 100% Fresh, vacuum sealed</li>
              <li className="flex items-center gap-2"><Leaf size={16} className="text-[var(--velora-gold)]" /> No additives or preservatives</li>
              <li className="flex items-center gap-2"><Package size={16} className="text-[var(--velora-gold)]" /> Free gift packing above ₹1,500</li>
              <li className="flex items-center gap-2"><BookOpen size={16} className="text-[var(--velora-gold)]" /> Delivery across India</li>
            </ul>

            {/* Benefits */}
            <div className="mt-8 card-luxury rounded-2xl p-5 sm:p-6">
              <h3 className="font-display text-lg font-bold text-[var(--velora-forest)]">Health Benefits</h3>
              <ul className="mt-3 space-y-2 text-sm text-[var(--velora-ink-soft)]">
                {product.benefits.map((b) => (
                  <li key={b} className="flex gap-2"><span className="text-[var(--velora-gold)]">✦</span> {b}</li>
                ))}
              </ul>
            </div>

            <div className="mt-4 card-luxury rounded-2xl p-5 sm:p-6">
              <h3 className="font-display text-lg font-bold text-[var(--velora-forest)]">Usage Suggestions</h3>
              <p className="mt-2 text-sm text-[var(--velora-ink-soft)]">{product.usage}</p>
            </div>

            <div className="mt-4 card-luxury rounded-2xl p-5 sm:p-6">
              <h3 className="font-display text-lg font-bold text-[var(--velora-forest)]">Storage</h3>
              <p className="mt-2 text-sm text-[var(--velora-ink-soft)]">{product.storage}</p>
            </div>
          </div>
        </section>

        {related.length > 0 && (
          <section className="bg-[var(--velora-cream)] py-14">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="flex items-end justify-between mb-6">
                <div>
                  <div className="section-eyebrow">You may also like</div>
                  <h2 className="font-display text-2xl sm:text-3xl font-bold text-[var(--velora-forest)] mt-2">
                    More from <span className="italic gold-text">{product.category}</span>
                  </h2>
                </div>
                <Link to="/" className="text-sm text-[var(--velora-forest)] hover:text-[var(--velora-gold)]">
                  See all →
                </Link>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                {related.map((r) => (
                  <ProductCard key={r.id} product={r} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
      <FloatingWhatsApp />
      <CartDrawer />
      <Toaster position="bottom-right" richColors />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ldJson) }}
      />
    </div>
  );
}
