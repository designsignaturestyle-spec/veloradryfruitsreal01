# Velora Dry Fruits — PRD

## Original Problem Statement
Premium luxury dry-fruits brand for Velora Dry Fruits (R.R Nagar, Bengaluru). Mobile-first, conversion-focused, WhatsApp ordering at 9739323112, Email veloradryfruits@gmail.com, Get Directions to physical store, Digitara as digital partner in footer. Excel-driven 106-product catalogue with AI-generated luxury product photography matching the reference style (dark emerald Velora pouch + brass bowl + black marble + golden bokeh).

## Architecture
- Frontend: React + Tailwind + Shadcn UI primitives + react-router
- Backend: FastAPI + MongoDB; Newsletter API + Admin token-protected dashboard; static file serving at `/api/static/`
- AI image generation: Gemini Nano Banana (`gemini-3.1-flash-image-preview`) via `emergentintegrations`, locked to the user's reference image to enforce identical pouch / bowl / marble / lighting across 106 SKUs
- Generated images stored at `/app/backend/static/products/{slug}.png` and served via `/api/static/products/{slug}.png`

## Implemented (Feb–Jun 2026)
- Hero: "Premium Dry Fruits, Nuts & Healthy Snacks — Luxury Quality. Freshness You Can Trust." with Shop Now / View Collections / WhatsApp CTAs; phone + email highlighted in big letters
- Sticky top contact bar with rotating festive banner (Diwali, Eid, Wedding, Delivery messages)
- Shop By Category grid with 23 categories
- Featured Products carousel (dark marble theme)
- Special Offers (₹100 off, free dates, free gift packing)
- Full searchable / filterable catalog with 106 AI-generated luxury product images
- Product detail page at `/product/:slug` with description, health benefits, usage suggestions, storage, related products, JSON-LD Product schema
- Why Velora (Premium / Fresh / Hygienic / Fast Delivery / Trusted)
- Testimonials (luxury cream cards)
- Instagram gallery (black marble) → Instagram CTA
- Bulk / wholesale section, Contact with embedded Google map + Get Directions
- Newsletter (real backend POST /api/newsletter/subscribe + fallback)
- Admin dashboard at `/admin` (token: ADMIN_TOKEN env) — list, search, refresh, CSV export, delete
- Footer with Digitara logo as Digital Partner
- Floating WhatsApp + SEO meta tags + favicon updated to Velora logo

## Updates (Jul 2026)
- Catalog now 108 SKUs: added Sugar Sompu (₹250/kg) and Jeera (₹540/kg) under Spices with real uploaded product photos
- Price updates: Japatri 4100, Cardamom 5300, Methi Seeds 240, Hazelnuts 3250, Almond Regular 1060
- Restored `image: CUSTOM_IMG[slug] || img(slug)` in PRODUCTS map (an automated edit had dropped it, breaking all images)
- Product detail page confirmed single-image only (no thumbnail gallery/carousel)

## Updates (Jul 2026)
- **Live DB-driven catalog + Admin product manager**: catalog now stored in MongoDB `products` (seeded from `seed_products.json`, 117 SKUs). Whole site reads via `GET /api/products` (ProductsContext) so admin edits go live.
  - Admin `/admin` (password = ADMIN_TOKEN `velora-admin-2026`) has two tabs: Products & Subscribers.
  - Products tab: inline price edit, in-stock/out-of-stock toggle, add/edit (name, category, price, image, flags), delete. Endpoints: `GET /api/products`, `POST/PUT/DELETE /api/admin/products` (X-Admin-Token protected).
  - Out-of-stock products show an overlay badge + disabled Add on cards and PDP.
- New logo applied everywhere (header, footer, hero, admin, favicon).
- Catalog: added Sugar Sompu (₹250) & Jeera (₹540) with real photos; price updates (Japatri 4100, Cardamom 5300, Methi 240, Hazelnuts 3250, Almond Regular 1060).
- Keyword alias search (badam→Almonds, kaju→Cashews, khajur→Dates, elaichi→Cardamom, etc.).
- Restored broken `image` field in PRODUCTS map; PDP confirmed single-image (no thumbnail gallery).

## Code Quality Pass (Jul 2026)
- Removed XSS surface: ProductDetail "Usage Suggestions" now renders as plain text (no dangerouslySetInnerHTML).
- Test files read ADMIN_TOKEN from env (no hardcoded secret).
- Added error logging to previously-empty catch blocks (ProductsContext, CartContext, Newsletter).
- PriceCell re-syncs on product change (useEffect) — admin dialog price edits update the row.
- Deliberately NOT done (low value / high regression risk on live store): rearchitecting admin auth to httpOnly cookies, splitting working components, and bulk exhaustive-deps changes (callbacks only reference stable module imports). `v is not None` kept (correct Python).

## Backlog / Next
- P1: Connect newsletter to Resend/SendGrid for welcome email + coupon
- P2: Real customer photos in testimonials (currently stock)
- P2: Multi-language (Kannada / Hindi)
- P2: Form-based order with delivery address capture
- P3: Festive auto-banner schedule by date (Diwali Oct, Eid varies, Wedding season Nov-Feb)
