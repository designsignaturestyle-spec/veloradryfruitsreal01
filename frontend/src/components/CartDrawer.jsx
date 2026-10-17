import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import { Minus, Plus, Trash2, ShoppingBag, MessageCircle } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { BRAND } from "@/data/constants";
import { priceFor } from "@/data/products";

const buildWaMessage = (items, subtotal) => {
  const lines = [
    "Hello Velora Dry Fruits,",
    "I would like to place the following order:",
    "",
    ...items.map((i, idx) => {
      if (i.isGift) {
        return `${idx + 1}. ${i.name} (Gift Packs) — ${i.qty} × pack — Price on enquiry`;
      }
      const unit = priceFor(i.basePrice, i.weight);
      return `${idx + 1}. ${i.name} (${i.category}) — ${i.qty} × ${i.weight} @ ₹${unit} = ₹${unit * i.qty}`;
    }),
    "",
    `Subtotal: ₹${subtotal.toLocaleString("en-IN")}`,
    "Please confirm availability and delivery details.",
  ];
  return encodeURIComponent(lines.join("\n"));
};

export const CartDrawer = () => {
  const { items, open, setOpen, updateQty, removeItem, clearCart, subtotal, totalQty } = useCart();

  const waUrl = `https://wa.me/${BRAND.whatsappNumber}?text=${buildWaMessage(items, subtotal)}`;
  const giftPackEligible = subtotal >= 1500;
  const datesGift = subtotal >= 2000;
  const flat100Off = subtotal >= 1000;

  const unitPrice = (i) => (i.isGift ? 0 : priceFor(i.basePrice, i.weight));

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent
        side="right"
        data-testid="cart-drawer"
        className="w-full sm:max-w-md bg-[var(--velora-cream-soft)] flex flex-col p-0"
      >
        <SheetHeader className="px-5 py-4 border-b border-[var(--velora-forest)]/10">
          <SheetTitle className="font-display text-2xl text-[var(--velora-forest)] flex items-center gap-2">
            <ShoppingBag size={20} className="text-[var(--velora-gold)]" />
            Your Cart
            {totalQty > 0 && (
              <span className="text-xs font-sans font-semibold text-[var(--velora-ink-soft)]">
                ({totalQty} {totalQty === 1 ? "item" : "items"})
              </span>
            )}
          </SheetTitle>
          <SheetDescription className="text-xs text-[var(--velora-ink-soft)]">
            Review your selection. Send the full order on WhatsApp in one tap.
          </SheetDescription>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center px-6">
            <div className="w-16 h-16 rounded-full bg-[var(--velora-forest)]/5 flex items-center justify-center">
              <ShoppingBag size={28} className="text-[var(--velora-forest)]/40" />
            </div>
            <p className="mt-4 font-display text-lg text-[var(--velora-forest)]">Your cart is empty</p>
            <p className="text-sm text-[var(--velora-ink-soft)] mt-1">
              Browse our luxury collection and add products to start an order.
            </p>
            <button
              onClick={() => setOpen(false)}
              data-testid="cart-continue-shopping"
              className="btn-forest mt-5 px-5 py-2.5 rounded-full text-sm"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3" data-testid="cart-items">
              {items.map((i) => (
                <div
                  key={i.key}
                  data-testid={`cart-item-${i.key}`}
                  className="flex gap-3 items-start bg-white rounded-2xl p-3 border border-[var(--velora-forest)]/8"
                >
                  <img
                    src={i.image}
                    alt={i.name}
                    className="w-16 h-16 rounded-xl object-cover bg-black"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="font-display font-semibold text-sm text-[var(--velora-forest)] line-clamp-2">
                      {i.name}
                    </div>
                    <div className="text-[11px] text-[var(--velora-ink-soft)] mt-0.5 flex items-center gap-1.5">
                      <span className="rounded-full bg-[var(--velora-forest)]/10 text-[var(--velora-forest)] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider">
                        {i.isGift ? "Gift pack" : i.weight}
                      </span>
                      <span>
                        {i.isGift ? "Price on enquiry" : `₹${unitPrice(i).toLocaleString("en-IN")}`}
                      </span>
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                      <div className="inline-flex items-center rounded-full border border-[var(--velora-forest)]/15 bg-[var(--velora-cream-soft)]">
                        <button
                          onClick={() => updateQty(i.key, i.qty - 1)}
                          data-testid={`cart-dec-${i.key}`}
                          aria-label="Decrease"
                          className="px-2 py-1.5 text-[var(--velora-forest)] hover:text-[var(--velora-gold)]"
                        >
                          <Minus size={13} />
                        </button>
                        <span
                          data-testid={`cart-qty-${i.key}`}
                          className="px-2 text-sm font-semibold text-[var(--velora-forest)] min-w-[24px] text-center"
                        >
                          {i.qty}
                        </span>
                        <button
                          onClick={() => updateQty(i.key, i.qty + 1)}
                          data-testid={`cart-inc-${i.key}`}
                          aria-label="Increase"
                          className="px-2 py-1.5 text-[var(--velora-forest)] hover:text-[var(--velora-gold)]"
                        >
                          <Plus size={13} />
                        </button>
                      </div>
                      <div className="text-sm font-bold text-[var(--velora-forest)]">
                        {i.isGift ? "Enquire" : `₹${(unitPrice(i) * i.qty).toLocaleString("en-IN")}`}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => removeItem(i.key)}
                    data-testid={`cart-remove-${i.key}`}
                    aria-label="Remove"
                    className="text-red-700/70 hover:text-red-800 p-1"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              ))}

              {/* Offer hints */}
              <div className="rounded-2xl border border-dashed border-[var(--velora-gold)]/50 p-3 text-xs space-y-1 bg-[var(--velora-gold)]/5">
                <div className={flat100Off ? "text-[var(--velora-forest)] font-semibold" : "text-[var(--velora-ink-soft)]"}>
                  {flat100Off ? "✓ ₹100 OFF unlocked" : `Add ₹${(1000 - subtotal).toLocaleString("en-IN")} more for ₹100 OFF`}
                </div>
                <div className={giftPackEligible ? "text-[var(--velora-forest)] font-semibold" : "text-[var(--velora-ink-soft)]"}>
                  {giftPackEligible ? "✓ Free luxury gift packing" : `Add ₹${(1500 - subtotal).toLocaleString("en-IN")} more for free gift packing`}
                </div>
                <div className={datesGift ? "text-[var(--velora-forest)] font-semibold" : "text-[var(--velora-ink-soft)]"}>
                  {datesGift ? "✓ Free Premium Dates added on us" : `Add ₹${(2000 - subtotal).toLocaleString("en-IN")} more for FREE Premium Dates`}
                </div>
              </div>
            </div>

            <SheetFooter className="border-t border-[var(--velora-forest)]/10 px-5 py-4 bg-white">
              <div className="w-full space-y-3">
                <div className="flex items-baseline justify-between">
                  <span className="text-sm text-[var(--velora-ink-soft)]">Subtotal</span>
                  <span
                    data-testid="cart-subtotal"
                    className="font-display text-2xl font-bold text-[var(--velora-forest)]"
                  >
                    ₹{subtotal.toLocaleString("en-IN")}
                  </span>
                </div>
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noreferrer"
                  data-testid="cart-checkout-wa"
                  onClick={() => setOpen(false)}
                  className="btn-whatsapp w-full px-5 py-3 rounded-full text-sm inline-flex items-center justify-center gap-2 font-semibold"
                >
                  <MessageCircle size={16} /> Send full order on WhatsApp
                </a>
                <div className="flex justify-between gap-2">
                  <button
                    onClick={() => setOpen(false)}
                    data-testid="cart-continue"
                    className="flex-1 px-4 py-2.5 rounded-full text-xs border border-[var(--velora-forest)]/20 hover:bg-[var(--velora-forest)]/5"
                  >
                    Continue Shopping
                  </button>
                  <button
                    onClick={clearCart}
                    data-testid="cart-clear"
                    className="px-4 py-2.5 rounded-full text-xs text-red-700/80 hover:text-red-800"
                  >
                    Clear cart
                  </button>
                </div>
                <p className="text-[10px] text-center text-[var(--velora-ink-soft)]">
                  Final order is confirmed by our team on WhatsApp. Prices are inclusive of taxes.
                </p>
              </div>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};
