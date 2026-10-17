import { useState } from "react";
import { Link } from "react-router-dom";
import { MessageCircle, ShoppingBag } from "lucide-react";
import { waLink } from "@/data/constants";
import { priceFor } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { WeightSelector } from "./WeightSelector";

export const ProductCard = ({ product, variant = "light" }) => {
  const isDark = variant === "dark";
  const { addItem } = useCart();
  const [weight, setWeight] = useState("1kg");
  const price = product.isGift ? product.price : priceFor(product.price, weight);
  const waName = product.isGift
    ? product.name
    : `${product.name} (${weight})`;

  return (
    <article
      data-testid={`product-card-${product.id}`}
      className={`card-luxury rounded-2xl overflow-hidden flex flex-col ${
        isDark ? "!bg-[var(--velora-marble-soft)] !border-[var(--velora-gold)]/15" : ""
      }`}
    >
      <Link
        to={`/product/${product.slug}`}
        data-testid={`product-link-${product.id}`}
        className="block prod-img-wrap aspect-square"
      >
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover"
        />
        {product.featured && (
          <span className="absolute top-3 left-3 badge-gold">
            {product.isGift ? "Gift Pack" : "Bestseller"}
          </span>
        )}
        {product.inStock === false && (
          <span
            data-testid={`out-of-stock-badge-${product.id}`}
            className="absolute inset-0 bg-black/55 flex items-center justify-center"
          >
            <span className="bg-[var(--velora-forest)] text-[var(--velora-cream)] text-xs font-semibold tracking-widest uppercase px-3 py-1.5 rounded-full">
              Out of Stock
            </span>
          </span>
        )}
        <span className="absolute top-3 right-3 text-[10px] tracking-widest uppercase bg-[var(--velora-forest)] text-[var(--velora-cream)] px-2 py-1 rounded-full">
          {product.category}
        </span>
      </Link>

      <div className="p-4 sm:p-5 flex-1 flex flex-col">
        <Link to={`/product/${product.slug}`}>
          <h3
            data-testid={`product-name-${product.id}`}
            className={`font-display font-bold text-base sm:text-lg leading-tight line-clamp-2 ${
              isDark ? "text-[var(--velora-cream)]" : "text-[var(--velora-forest)]"
            } hover:text-[var(--velora-gold)] transition`}
          >
            {product.name}
          </h3>
        </Link>

        {!product.isGift && (
          <div className="mt-3">
            <WeightSelector
              value={weight}
              onChange={setWeight}
              size="sm"
              testIdPrefix={`pc-w-${product.id}`}
            />
          </div>
        )}

        <div className="mt-3 flex items-baseline gap-1">
          {product.isGift ? (
            <span
              data-testid={`product-price-${product.id}`}
              className={`font-display text-base font-bold uppercase tracking-wider ${
                isDark ? "text-[var(--velora-gold-bright)]" : "text-[var(--velora-gold)]"
              }`}
            >
              Price on enquiry
            </span>
          ) : (
            <>
              <span
                data-testid={`product-price-${product.id}`}
                className={`font-display text-2xl font-bold ${
                  isDark ? "text-[var(--velora-gold-bright)]" : "text-[var(--velora-forest)]"
                }`}
              >
                ₹{price.toLocaleString("en-IN")}
              </span>
              <span className={`text-xs ${isDark ? "text-[var(--velora-cream)]/60" : "text-[var(--velora-ink-soft)]"}`}>
                / {weight}
              </span>
            </>
          )}
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2">
          <button
            onClick={() => addItem(product, 1, weight)}
            disabled={product.inStock === false}
            data-testid={`product-add-cart-${product.id}`}
            className="btn-gold px-3 py-2.5 rounded-full text-xs sm:text-sm inline-flex items-center justify-center gap-1.5 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ShoppingBag size={14} /> {product.inStock === false ? "Sold out" : "Add"}
          </button>
          <a
            href={waLink(waName)}
            target="_blank"
            rel="noreferrer"
            data-testid={`product-whatsapp-${product.id}`}
            className="btn-whatsapp px-3 py-2.5 rounded-full text-xs sm:text-sm inline-flex items-center justify-center gap-1.5"
          >
            <MessageCircle size={14} /> WhatsApp
          </a>
        </div>
      </div>
    </article>
  );
};
