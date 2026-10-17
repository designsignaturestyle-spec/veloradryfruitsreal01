import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { Plus, Trash2, RefreshCw, Search, Check, X, Pencil, PackageX, PackageCheck } from "lucide-react";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProductApi,
} from "@/lib/api";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

const EMPTY = { name: "", category: "", price: 0, image: "", isGift: false, inStock: true, featured: false };

const PriceCell = ({ product, token, onSaved }) => {
  const [value, setValue] = useState(product.price);
  const [saving, setSaving] = useState(false);
  const dirty = Number(value) !== Number(product.price);

  useEffect(() => {
    setValue(product.price);
  }, [product.price]);

  const save = async () => {
    if (!dirty) return;
    setSaving(true);
    try {
      const res = await updateProduct(product.id, { price: Number(value) }, token);
      onSaved(res.data);
      toast.success(`Updated ${product.name} price`);
    } catch (e) {
      toast.error("Failed to update price");
      setValue(product.price);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex items-center gap-1.5">
      <span className="text-[var(--velora-ink-soft)]">₹</span>
      <input
        type="number"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && save()}
        data-testid={`product-price-input-${product.id}`}
        className="w-24 px-2 py-1.5 rounded-lg border border-[var(--velora-forest)]/20 bg-white focus:border-[var(--velora-gold)] outline-none text-sm"
      />
      {dirty && (
        <button
          onClick={save}
          disabled={saving}
          data-testid={`product-price-save-${product.id}`}
          className="p-1.5 rounded-lg bg-[var(--velora-forest)] text-[var(--velora-gold-bright)] hover:opacity-90"
          title="Save price"
        >
          <Check size={14} />
        </button>
      )}
    </div>
  );
};

export const AdminProducts = ({ token }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState(EMPTY);
  const [editingId, setEditingId] = useState(null);
  const [busy, setBusy] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const res = await getProducts();
      setProducts(res.data || []);
    } catch (e) {
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const replaceInList = (updated) =>
    setProducts((list) => list.map((p) => (p.id === updated.id ? updated : p)));

  const toggleStock = async (product) => {
    try {
      const res = await updateProduct(product.id, { inStock: !product.inStock }, token);
      replaceInList(res.data);
      toast.success(`${product.name} marked ${res.data.inStock ? "in stock" : "out of stock"}`);
    } catch (e) {
      toast.error("Failed to update stock");
    }
  };

  const onDelete = async (product) => {
    if (!window.confirm(`Delete "${product.name}"? This cannot be undone.`)) return;
    try {
      await deleteProductApi(product.id, token);
      setProducts((list) => list.filter((p) => p.id !== product.id));
      toast.success("Product deleted");
    } catch (e) {
      toast.error("Failed to delete");
    }
  };

  const openAdd = () => {
    setForm(EMPTY);
    setEditingId(null);
    setDialogOpen(true);
  };

  const openEdit = (product) => {
    setForm({
      name: product.name,
      category: product.category,
      price: product.price,
      image: product.image || "",
      isGift: product.isGift,
      inStock: product.inStock,
      featured: product.featured,
    });
    setEditingId(product.id);
    setDialogOpen(true);
  };

  const saveForm = async () => {
    if (!form.name.trim() || !form.category.trim()) {
      toast.error("Name and category are required");
      return;
    }
    setBusy(true);
    try {
      const payload = { ...form, price: Number(form.price) || 0 };
      if (editingId) {
        const res = await updateProduct(editingId, payload, token);
        replaceInList(res.data);
        toast.success("Product updated");
      } else {
        const res = await createProduct(payload, token);
        setProducts((list) => [...list, res.data]);
        toast.success("Product added");
      }
      setDialogOpen(false);
    } catch (e) {
      toast.error(e?.response?.data?.detail || "Failed to save product");
    } finally {
      setBusy(false);
    }
  };

  const categories = useMemo(
    () => Array.from(new Set(products.map((p) => p.category))).sort(),
    [products]
  );

  const filtered = products.filter((p) =>
    !query.trim() ? true : p.name.toLowerCase().includes(query.toLowerCase()) || p.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="card-luxury rounded-2xl p-4 flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--velora-ink-soft)]" />
          <input
            type="text"
            placeholder="Search products..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            data-testid="admin-product-search"
            className="w-full pl-9 pr-4 py-2.5 rounded-full border border-[var(--velora-forest)]/20 bg-white focus:border-[var(--velora-gold)] outline-none text-sm"
          />
        </div>
        <button onClick={load} data-testid="admin-product-refresh" className="btn-forest px-4 py-2.5 rounded-full text-sm inline-flex items-center gap-2">
          <RefreshCw size={14} /> Refresh
        </button>
        <button onClick={openAdd} data-testid="admin-add-product-btn" className="btn-gold px-4 py-2.5 rounded-full text-sm inline-flex items-center gap-2 font-semibold">
          <Plus size={14} /> Add product
        </button>
      </div>

      <div className="card-luxury rounded-2xl overflow-hidden">
        {loading ? (
          <div className="p-10 text-center text-[var(--velora-ink-soft)]">Loading…</div>
        ) : filtered.length === 0 ? (
          <div className="p-10 text-center text-[var(--velora-ink-soft)]" data-testid="admin-products-empty">No products found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-[var(--velora-forest)] text-[var(--velora-cream)]">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold">Product</th>
                  <th className="text-left px-4 py-3 font-semibold hidden sm:table-cell">Category</th>
                  <th className="text-left px-4 py-3 font-semibold">Price / kg</th>
                  <th className="text-left px-4 py-3 font-semibold">Stock</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p) => (
                  <tr key={p.id} data-testid={`product-admin-row-${p.id}`} className="border-b border-[var(--velora-forest)]/5 hover:bg-[var(--velora-cream)]/40">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        {p.image ? (
                          <img src={p.image} alt={p.name} className="w-10 h-10 rounded-lg object-cover bg-black shrink-0" />
                        ) : (
                          <div className="w-10 h-10 rounded-lg bg-[var(--velora-forest)]/10 shrink-0" />
                        )}
                        <div>
                          <div className="font-medium text-[var(--velora-forest)]">{p.name}</div>
                          {p.isGift && <span className="text-[10px] uppercase tracking-widest text-[var(--velora-gold)]">Gift Pack</span>}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden sm:table-cell text-[var(--velora-ink-soft)]">{p.category}</td>
                    <td className="px-4 py-3">
                      {p.isGift ? (
                        <span className="text-xs text-[var(--velora-ink-soft)]">On enquiry</span>
                      ) : (
                        <PriceCell product={p} token={token} onSaved={replaceInList} />
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => toggleStock(p)}
                        data-testid={`product-stock-toggle-${p.id}`}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${
                          p.inStock
                            ? "bg-green-100 text-green-800 hover:bg-green-200"
                            : "bg-red-100 text-red-800 hover:bg-red-200"
                        }`}
                      >
                        {p.inStock ? <PackageCheck size={13} /> : <PackageX size={13} />}
                        {p.inStock ? "In stock" : "Out of stock"}
                      </button>
                    </td>
                    <td className="px-4 py-3 text-right whitespace-nowrap">
                      <button onClick={() => openEdit(p)} data-testid={`product-edit-${p.id}`} className="p-1.5 text-[var(--velora-forest)] hover:text-[var(--velora-gold)]" title="Edit">
                        <Pencil size={15} />
                      </button>
                      <button onClick={() => onDelete(p)} data-testid={`product-delete-${p.id}`} className="p-1.5 text-red-700 hover:text-red-900" title="Delete">
                        <Trash2 size={15} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent data-testid="product-form-dialog" className="bg-[var(--velora-cream-soft)]">
          <DialogHeader>
            <DialogTitle className="font-display text-xl text-[var(--velora-forest)]">
              {editingId ? "Edit product" : "Add new product"}
            </DialogTitle>
            <DialogDescription className="text-xs text-[var(--velora-ink-soft)]">
              Changes go live on the website immediately.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3">
            <div>
              <label className="text-xs font-semibold text-[var(--velora-forest)]">Name</label>
              <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} data-testid="pa-name" className="mt-1 w-full px-3 py-2 rounded-lg border border-[var(--velora-forest)]/20 bg-white outline-none text-sm" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-[var(--velora-forest)]">Category</label>
                <input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} list="admin-cat-list" data-testid="pa-category" className="mt-1 w-full px-3 py-2 rounded-lg border border-[var(--velora-forest)]/20 bg-white outline-none text-sm" />
                <datalist id="admin-cat-list">
                  {categories.map((c) => <option key={c} value={c} />)}
                </datalist>
              </div>
              <div>
                <label className="text-xs font-semibold text-[var(--velora-forest)]">Price / kg (₹)</label>
                <input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} data-testid="pa-price" className="mt-1 w-full px-3 py-2 rounded-lg border border-[var(--velora-forest)]/20 bg-white outline-none text-sm" />
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold text-[var(--velora-forest)]">Image URL (optional)</label>
              <input value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} placeholder="https://..." data-testid="pa-image" className="mt-1 w-full px-3 py-2 rounded-lg border border-[var(--velora-forest)]/20 bg-white outline-none text-sm" />
              {form.image && <img src={form.image} alt="preview" className="mt-2 w-16 h-16 rounded-lg object-cover bg-black" />}
            </div>
            <div className="flex flex-wrap gap-4 pt-1">
              <label className="flex items-center gap-2 text-sm text-[var(--velora-forest)]">
                <input type="checkbox" checked={form.inStock} onChange={(e) => setForm({ ...form, inStock: e.target.checked })} data-testid="pa-instock" /> In stock
              </label>
              <label className="flex items-center gap-2 text-sm text-[var(--velora-forest)]">
                <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} data-testid="pa-featured" /> Featured
              </label>
              <label className="flex items-center gap-2 text-sm text-[var(--velora-forest)]">
                <input type="checkbox" checked={form.isGift} onChange={(e) => setForm({ ...form, isGift: e.target.checked })} data-testid="pa-isgift" /> Gift pack (price on enquiry)
              </label>
            </div>
          </div>

          <DialogFooter>
            <button onClick={() => setDialogOpen(false)} className="px-4 py-2 rounded-full text-sm border border-[var(--velora-forest)]/20 inline-flex items-center gap-1.5">
              <X size={14} /> Cancel
            </button>
            <button onClick={saveForm} disabled={busy} data-testid="pa-save" className="btn-forest px-5 py-2 rounded-full text-sm font-semibold inline-flex items-center gap-1.5 disabled:opacity-60">
              <Check size={14} /> {busy ? "Saving…" : editingId ? "Save changes" : "Add product"}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
