import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { ArrowLeft, Mail, Lock, Download, Trash2, RefreshCw, Users, Package } from "lucide-react";
import { Toaster } from "@/components/ui/sonner";
import {
  listSubscribers,
  verifyAdmin,
  deleteSubscriber,
} from "@/lib/api";
import { AdminProducts } from "@/components/AdminProducts";
import { BRAND } from "@/data/constants";

const TOKEN_KEY = "velora_admin_token";

export default function Admin() {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY) || "");
  const [authed, setAuthed] = useState(false);
  const [subs, setSubs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState("products");

  useEffect(() => {
    const t = localStorage.getItem(TOKEN_KEY);
    if (t) {
      tryAuth(t, false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const tryAuth = async (t, withToast = true) => {
    if (!t) return;
    setLoading(true);
    try {
      await verifyAdmin(t);
      localStorage.setItem(TOKEN_KEY, t);
      setAuthed(true);
      await refresh(t);
      if (withToast) toast.success("Signed in to admin");
    } catch (err) {
      localStorage.removeItem(TOKEN_KEY);
      setAuthed(false);
      if (withToast) toast.error("Invalid admin token");
    } finally {
      setLoading(false);
    }
  };

  const refresh = async (t = token) => {
    setLoading(true);
    try {
      const res = await listSubscribers(t);
      setSubs(res.data || []);
    } catch (err) {
      toast.error("Failed to fetch subscribers");
    } finally {
      setLoading(false);
    }
  };

  const onLogin = (e) => {
    e.preventDefault();
    tryAuth(token);
  };

  const onLogout = () => {
    localStorage.removeItem(TOKEN_KEY);
    setToken("");
    setAuthed(false);
    setSubs([]);
    toast.success("Signed out");
  };

  const onDelete = async (id) => {
    if (!window.confirm("Remove this subscriber?")) return;
    try {
      await deleteSubscriber(id, token);
      setSubs((s) => s.filter((r) => r.id !== id));
      toast.success("Subscriber removed");
    } catch (err) {
      toast.error("Could not delete");
    }
  };

  const exportCsv = () => {
    const rows = [["email", "source", "subscribed_at"], ...subs.map((s) => [s.email, s.source, s.subscribed_at])];
    const csv = rows.map((r) => r.map((v) => `"${String(v ?? "").replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `velora-subscribers-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const filtered = subs.filter((s) =>
    !query.trim() ? true : s.email.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-velora-grain">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex items-center justify-between mb-6">
          <Link
            to="/"
            data-testid="admin-back-link"
            className="inline-flex items-center gap-2 text-sm text-[var(--velora-forest)] hover:text-[var(--velora-gold)]"
          >
            <ArrowLeft size={16} /> Back to site
          </Link>
          <div className="flex items-center gap-3">
            <img src={BRAND.logo} alt="Velora" className="w-10 h-10 rounded-full object-cover border border-[var(--velora-gold)]/40" />
            <div className="leading-tight">
              <div className="font-display text-lg font-bold text-[var(--velora-forest)]">Velora Admin</div>
              <div className="text-[10px] tracking-widest uppercase text-[var(--velora-ink-soft)]">Admin Dashboard</div>
            </div>
          </div>
        </div>

        {!authed ? (
          <div className="card-luxury rounded-3xl p-8 sm:p-10 max-w-md mx-auto">
            <div className="w-12 h-12 rounded-xl bg-[var(--velora-forest)] text-[var(--velora-gold-bright)] flex items-center justify-center">
              <Lock size={20} />
            </div>
            <h1 className="font-display text-2xl font-bold text-[var(--velora-forest)] mt-4">
              Admin sign-in
            </h1>
            <p className="text-sm text-[var(--velora-ink-soft)] mt-1">
              Enter the admin password to manage products, prices and subscribers.
            </p>
            <form onSubmit={onLogin} className="mt-5 space-y-3">
              <input
                type="password"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                placeholder="Admin password"
                data-testid="admin-token-input"
                className="w-full px-4 py-3 rounded-full border border-[var(--velora-forest)]/20 bg-white focus:border-[var(--velora-gold)] focus:ring-2 focus:ring-[var(--velora-gold)]/30 outline-none text-sm"
              />
              <button
                type="submit"
                disabled={loading || !token}
                data-testid="admin-login-btn"
                className="btn-forest w-full px-6 py-3 rounded-full text-sm font-semibold disabled:opacity-60"
              >
                {loading ? "Verifying..." : "Sign in"}
              </button>
            </form>
          </div>
        ) : (
          <div className="space-y-5">
            <div className="flex gap-2 border-b border-[var(--velora-forest)]/10">
              <button
                onClick={() => setTab("products")}
                data-testid="admin-tab-products"
                className={`px-4 py-2.5 text-sm font-semibold inline-flex items-center gap-2 border-b-2 -mb-px transition ${
                  tab === "products"
                    ? "border-[var(--velora-gold)] text-[var(--velora-forest)]"
                    : "border-transparent text-[var(--velora-ink-soft)] hover:text-[var(--velora-forest)]"
                }`}
              >
                <Package size={15} /> Products
              </button>
              <button
                onClick={() => setTab("subscribers")}
                data-testid="admin-tab-subscribers"
                className={`px-4 py-2.5 text-sm font-semibold inline-flex items-center gap-2 border-b-2 -mb-px transition ${
                  tab === "subscribers"
                    ? "border-[var(--velora-gold)] text-[var(--velora-forest)]"
                    : "border-transparent text-[var(--velora-ink-soft)] hover:text-[var(--velora-forest)]"
                }`}
              >
                <Users size={15} /> Subscribers
              </button>
              <button
                onClick={onLogout}
                data-testid="admin-logout"
                className="ml-auto px-4 py-2 rounded-full text-sm border border-[var(--velora-forest)]/20 hover:bg-[var(--velora-forest)]/5 my-1"
              >
                Sign out
              </button>
            </div>

            {tab === "products" ? (
              <AdminProducts token={token} />
            ) : (
            <div className="space-y-5">
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="card-luxury rounded-2xl p-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[var(--velora-forest)] text-[var(--velora-gold-bright)] flex items-center justify-center">
                    <Users size={18} />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-[var(--velora-ink-soft)]">Total subscribers</div>
                    <div data-testid="admin-total" className="font-display text-3xl font-bold text-[var(--velora-forest)]">
                      {subs.length}
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-luxury rounded-2xl p-5 sm:col-span-2 flex flex-wrap items-center gap-3">
                <input
                  type="text"
                  placeholder="Search by email..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  data-testid="admin-search"
                  className="flex-1 min-w-[180px] px-4 py-2.5 rounded-full border border-[var(--velora-forest)]/20 bg-white focus:border-[var(--velora-gold)] focus:ring-2 focus:ring-[var(--velora-gold)]/30 outline-none text-sm"
                />
                <button
                  onClick={() => refresh()}
                  data-testid="admin-refresh"
                  className="btn-forest px-4 py-2.5 rounded-full text-sm inline-flex items-center gap-2"
                >
                  <RefreshCw size={14} /> Refresh
                </button>
                <button
                  onClick={exportCsv}
                  disabled={subs.length === 0}
                  data-testid="admin-export"
                  className="btn-gold px-4 py-2.5 rounded-full text-sm inline-flex items-center gap-2 disabled:opacity-50"
                >
                  <Download size={14} /> Export CSV
                </button>
              </div>
            </div>

            <div className="card-luxury rounded-2xl overflow-hidden">
              {loading ? (
                <div className="p-10 text-center text-[var(--velora-ink-soft)]">Loading…</div>
              ) : filtered.length === 0 ? (
                <div className="p-10 text-center text-[var(--velora-ink-soft)]" data-testid="admin-empty">
                  No subscribers yet.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-[var(--velora-forest)] text-[var(--velora-cream)]">
                      <tr>
                        <th className="text-left px-5 py-3 font-semibold">Email</th>
                        <th className="text-left px-5 py-3 font-semibold hidden sm:table-cell">Source</th>
                        <th className="text-left px-5 py-3 font-semibold hidden md:table-cell">Subscribed</th>
                        <th className="px-5 py-3"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {filtered.map((s) => (
                        <tr key={s.id} data-testid={`admin-row-${s.id}`} className="border-b border-[var(--velora-forest)]/5 hover:bg-[var(--velora-cream)]/40">
                          <td className="px-5 py-3 font-medium text-[var(--velora-forest)] flex items-center gap-2">
                            <Mail size={14} className="text-[var(--velora-gold)]" /> {s.email}
                          </td>
                          <td className="px-5 py-3 hidden sm:table-cell text-[var(--velora-ink-soft)]">{s.source || "—"}</td>
                          <td className="px-5 py-3 hidden md:table-cell text-[var(--velora-ink-soft)]">
                            {new Date(s.subscribed_at).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}
                          </td>
                          <td className="px-5 py-3 text-right">
                            <button
                              onClick={() => onDelete(s.id)}
                              data-testid={`admin-delete-${s.id}`}
                              className="inline-flex items-center gap-1 text-xs text-red-700 hover:text-red-900"
                            >
                              <Trash2 size={14} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
            </div>
            )}
          </div>
        )}
      </div>
      <Toaster position="bottom-right" richColors />
    </div>
  );
}
