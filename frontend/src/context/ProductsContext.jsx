import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { getProducts } from "@/lib/api";
import { buildCatalog, PRODUCTS, PRODUCT_BY_SLUG, CATEGORIES } from "@/data/products";

const STATIC = { products: PRODUCTS, bySlug: PRODUCT_BY_SLUG, categories: CATEGORIES };

const ProductsContext = createContext(null);

export const ProductsProvider = ({ children }) => {
  const [catalog, setCatalog] = useState(STATIC);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    try {
      const res = await getProducts();
      const list = res.data || [];
      if (list.length) setCatalog(buildCatalog(list));
    } catch (e) {
      // keep static fallback so the site never breaks
      console.error("ProductsContext: failed to load products from API", e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <ProductsContext.Provider value={{ ...catalog, loading, reload: load }}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => {
  const ctx = useContext(ProductsContext);
  if (!ctx) return { ...STATIC, loading: false, reload: () => {} };
  return ctx;
};
