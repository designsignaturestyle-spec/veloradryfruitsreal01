import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { priceFor } from "@/data/products";

const CartContext = createContext(null);
const STORAGE_KEY = "velora_cart_v2";

const keyOf = (slug, weight) => `${slug}__${weight}`;

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      console.warn("CartContext: could not read saved cart", e);
      return [];
    }
  });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.warn("CartContext: could not persist cart", e);
    }
  }, [items]);

  const addItem = useCallback((product, qty = 1, weight = "1kg") => {
    setItems((prev) => {
      const k = keyOf(product.slug, weight);
      const existing = prev.find((i) => i.key === k);
      if (existing) {
        return prev.map((i) => (i.key === k ? { ...i, qty: i.qty + qty } : i));
      }
      return [
        ...prev,
        {
          key: k,
          slug: product.slug,
          name: product.name,
          basePrice: product.price,
          weight,
          isGift: !!product.isGift,
          image: product.image,
          category: product.category,
          qty,
        },
      ];
    });
    const weightLabel = product.isGift ? "" : ` (${weight})`;
    toast.success(`${product.name}${weightLabel} added to cart`, { duration: 2200 });
  }, []);

  const updateQty = useCallback((key, qty) => {
    setItems((prev) =>
      prev
        .map((i) => (i.key === key ? { ...i, qty: Math.max(0, qty) } : i))
        .filter((i) => i.qty > 0)
    );
  }, []);

  const removeItem = useCallback((key) => {
    setItems((prev) => prev.filter((i) => i.key !== key));
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const lineTotal = (i) => (i.isGift ? i.basePrice : priceFor(i.basePrice, i.weight)) * i.qty;

  const subtotal = useMemo(
    () => items.reduce((sum, i) => sum + lineTotal(i), 0),
    [items]
  );
  const totalQty = useMemo(
    () => items.reduce((sum, i) => sum + i.qty, 0),
    [items]
  );

  const value = useMemo(
    () => ({
      items,
      open,
      setOpen,
      addItem,
      updateQty,
      removeItem,
      clearCart,
      subtotal,
      totalQty,
      lineTotal,
    }),
    [items, open, addItem, updateQty, removeItem, clearCart, subtotal, totalQty]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};
