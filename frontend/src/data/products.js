// Use AI-generated luxury product photos served from the backend.
const API = process.env.REACT_APP_BACKEND_URL;
const img = (slug) => `${API}/api/static/products/${slug}.png`;

// Gift pack images uploaded by Velora — real product photos from the store.
const GIFT = {
  giftpack2:
    "https://customer-assets.emergentagent.com/job_velora-ecommerce/artifacts/swdrarxa_WhatsApp%20Image%202026-06-17%20at%203.31.02%20PM.jpeg",
  giftpack3:
    "https://customer-assets.emergentagent.com/job_velora-ecommerce/artifacts/yaythj2z_WhatsApp%20Image%202026-06-17%20at%203.31.02%20PM%20%281%29.jpeg",
  giftpack4:
    "https://customer-assets.emergentagent.com/job_velora-ecommerce/artifacts/dmehi4hb_WhatsApp%20Image%202026-06-17%20at%203.31.02%20PM%20%282%29.jpeg",
  giftpack5:
    "https://customer-assets.emergentagent.com/job_velora-ecommerce/artifacts/lw44q019_WhatsApp%20Image%202026-06-17%20at%203.29.42%20PM%20%285%29.jpeg",
  // New gift box images (uploaded by Velora):
  goldFrame:
    "https://customer-assets.emergentagent.com/job_velora-ecommerce/artifacts/w4lvkq8u_WhatsApp%20Image%202026-06-17%20at%203.29.41%20PM%20%281%29.jpeg",
  cowTray:
    "https://customer-assets.emergentagent.com/job_velora-ecommerce/artifacts/3brauvvz_WhatsApp%20Image%202026-06-17%20at%203.29.42%20PM.jpeg",
  peacock:
    "https://customer-assets.emergentagent.com/job_velora-ecommerce/artifacts/6wuu7y9v_WhatsApp%20Image%202026-06-17%20at%203.29.42%20PM%20%281%29.jpeg",
  redMesh:
    "https://customer-assets.emergentagent.com/job_velora-ecommerce/artifacts/tdmatklu_WhatsApp%20Image%202026-06-17%20at%203.29.42%20PM%20%282%29.jpeg",
  yellowMesh:
    "https://customer-assets.emergentagent.com/job_velora-ecommerce/artifacts/7qke2es1_WhatsApp%20Image%202026-06-17%20at%203.29.42%20PM%20%283%29.jpeg",
    };
const CUSTOM_IMG = {
  "premium-wicker-hamper": GIFT.giftpack2,
  "festive-tray-hamper": GIFT.giftpack3,
  "classic-wicker-basket": GIFT.giftpack4,
  "connoisseur-bowl-hamper": GIFT.giftpack5,
  "gold-frame-mewa-box": GIFT.goldFrame,
  "cow-blessing-tray": GIFT.cowTray,
  "peacock-heritage-box": GIFT.peacock,
  "red-festive-potli": GIFT.redMesh,
  "saffron-wedding-basket": GIFT.yellowMesh,
  "sugar-sompu":
    "https://customer-assets.emergentagent.com/job_843794e4-a856-4ece-81c5-277fa972fcef/artifacts/dy5io0vt_ChatGPT%20Image%20Jul%208%2C%202026%2C%2005_29_25%20PM.png",
  "jeera":
    "https://customer-assets.emergentagent.com/job_843794e4-a856-4ece-81c5-277fa972fcef/artifacts/r1pi152d_ChatGPT%20Image%20Jul%2011%2C%202026%2C%2012_23_53%20PM.png",
};

// Per-product custom images (otherwise generated AI image by slug)

  


// [name, price (₹/kg or fixed ₹ for gift packs), category, slug, isGift?]
const raw = [
  ["Almond Regular", 1060, "Almonds", "almond-regular"],
  ["Almond Jumbo", 1250, "Almonds", "almond-jumbo"],
  ["Almond Sonara", 1200, "Almonds", "almond-sonara"],
  ["Mamra Almond", 3650, "Almonds", "mamra-almond"],
  ["Salted Almonds", 1320, "Almonds", "salted-almonds"],
  ["Cashew Jumbo Roasted", 1630, "Cashews", "cashew-jumbo-roasted"],
  ["Cashew Special", 1370, "Cashews", "cashew-special"],
  ["Cashew Regular", 1200, "Cashews", "cashew-regular"],
  ["Cashew Slices", 1050, "Cashews", "cashew-slices"],
  ["Cashew Classic", 1050, "Cashews", "cashew-classic"],
  ["Salted Cashews", 1320, "Cashews", "salted-cashews"],
  ["Pepper Cashews", 1320, "Cashews", "pepper-cashews"],
  ["Red Chilli Cashews", 1320, "Cashews", "red-chilli-cashews"],
  ["Pista Plain Roasted", 2750, "Pistachios", "pista-plain-roasted"],
  ["Pista California", 1730, "Pistachios", "pista-california"],
  ["Pista Akbari", 1630, "Pistachios", "pista-akbari"],
  ["Walnut Kernel", 1850, "Walnuts", "walnut-kernel"],
  ["Walnut Chilli (Snow White)", 2150, "Walnuts", "walnut-chilli-snow-white"],
  ["Hazelnuts", 3250, "Nuts", "hazelnuts"],
  ["Pecan Nuts", 2750, "Nuts", "pecan-nuts"],
  ["Brazil Nuts", 4250, "Nuts", "brazil-nuts"],
  ["Macadamia Nuts", 3850, "Nuts", "macadamia-nuts"],
  ["Black Raisins", 730, "Raisins", "black-raisins"],
  ["Raisin Indian", 700, "Raisins", "raisin-indian"],
  ["Raisin Afghan", 800, "Raisins", "raisin-afghan"],
  ["Raisins Special (Natala)", 1030, "Raisins", "raisins-special-natala"],
  ["Dry Dates", 550, "Dates", "dry-dates"],
  ["Ajwa Dates", 1800, "Dates", "ajwa-dates"],
  ["Medjool Dates", 1850, "Dates", "medjool-dates"],
  ["Saffawi Dates", 980, "Dates", "saffawi-dates"],
  ["Mabroom Dates", 1500, "Dates", "mabroom-dates"],
  ["Sukkari Dates", 650, "Dates", "sukkari-dates"],
  ["Arabian Seedless Dates", 415, "Dates", "arabian-seedless-dates"],
  ["Anjeer Jumbo", 2100, "Figs", "anjeer-jumbo"],
  ["Anjeer Classic", 1600, "Figs", "anjeer-classic"],
  ["Anjeer Big", 2400, "Figs", "anjeer-big"],
  ["Apricot Turkel", 1750, "Apricots", "apricot-turkel"],
  ["Apricot Bold", 880, "Apricots", "apricot-bold"],
  // Moved to Berries:
  ["Cherry Dried", 850, "Berries", "cherry-dried"],
  ["Blackberry Dried", 980, "Berries", "blackberry-dried"],
  ["Cranberries", 980, "Berries", "cranberries"],
  ["Blueberries", 1950, "Berries", "blueberries"],
  // Other dried fruits remain
  ["Mango Dried", 950, "Dried Fruits", "mango-dried"],
  ["Kiwi Dried", 850, "Dried Fruits", "kiwi-dried"],
  ["Strawberry Dried", 1350, "Dried Fruits", "strawberry-dried"],
  ["Prunes", 980, "Dried Fruits", "prunes"],
  ["Pineapple Dried", 840, "Dried Fruits", "pineapple-dried"],
  ["Mixed Fruits", 950, "Dried Fruits", "mixed-fruits"],
  ["Basil / Sabja Seeds", 600, "Seeds", "basil-sabja-seeds"],
  ["White Till", 600, "Seeds", "white-till"],
  ["White Till (Natti)", 720, "Seeds", "white-till-natti"],
  ["Black Till", 800, "Seeds", "black-till"],
  ["Kalonji Seed", 600, "Seeds", "kalonji-seed"],
  ["Ajwain", 550, "Seeds", "ajwain"],
  ["Poppy Seed / Khus Khus", 2750, "Seeds", "poppy-seed-khus-khus"],
  ["Muskmelon Seeds", 1050, "Seeds", "muskmelon-seeds"],
  ["Pumpkin Seeds", 850, "Seeds", "pumpkin-seeds"],
  ["Flax Seeds", 320, "Seeds", "flax-seeds"],
  ["Sunflower Seeds", 650, "Seeds", "sunflower-seeds"],
  ["Watermelon Seeds", 1050, "Seeds", "watermelon-seeds"],
  ["Chia Seeds", 750, "Seeds", "chia-seeds"],
  ["Seeds Mix", 890, "Seeds", "seeds-mix"],
  ["Alive Seeds", 550, "Seeds", "alive-seeds"],
  ["Methi Seeds", 240, "Seeds", "methi-seeds"],
  ["Cloves", 1100, "Spices", "cloves"],
  ["Black Pepper", 1100, "Spices", "black-pepper"],
  ["Shahi Jeera", 1450, "Spices", "shahi-jeera"],
  ["Japatri", 4100, "Spices", "japatri"],
  ["Sugar Sompu", 250, "Spices", "sugar-sompu"],
["Jeera", 540, "Spices", "jeera"],
  ["Cinnamon", 1050, "Spices", "cinnamon"],
  ["Bay Leaf", 450, "Spices", "bay-leaf"],
  ["Star Anise", 1650, "Spices", "star-anise"],
  ["Cardamom", 5300, "Spices", "cardamom"],
  ["Turmeric Powder", 630, "Spices", "turmeric-powder"],
  ["Garam Masala Powder", 3600, "Spices", "garam-masala-powder"],
  ["Marathi Mog", 1290, "Spices", "marathi-mog"],
  ["Misri White", 350, "Sweeteners", "misri-white"],
  ["Misri Red", 350, "Sweeteners", "misri-red"],
  ["Diamond Sugar", 280, "Sweeteners", "diamond-sugar"],
  ["Souff", 610, "Snacks", "souff"],
  ["Makhana Plain", 1900, "Snacks", "makhana-plain"],
  ["Mexican Bites", 980, "Snacks", "mexican-bites"],
  ["Party Snacks", 1650, "Snacks", "party-snacks"],
  ["Avalaki Mix", 1200, "Snacks", "avalaki-mix"],
  ["Muesli", 1250, "Breakfast", "muesli"],
  // Moved to Health Food:
  ["Protein Beans", 950, "Health Food", "protein-beans"],
  ["Amla Chatpata", 600, "Health Food", "amla-chatpata"],
  ["Amla Sweet", 450, "Health Food", "amla-sweet"],
  ["Protein Booster", 1150, "Health Food", "protein-booster"],
  ["Amla Honey", 550, "Health Food", "amla-honey"],
  ["Indian Mango Bar", 750, "Sweets", "indian-mango-bar"],
  ["Pancharattan", 1650, "Mix", "pancharattan"],
  ["Power Mix", 1350, "Mix", "power-mix"],
  ["Dry Fruits Mix", 1350, "Mix", "dry-fruits-mix"],
  ["Mixed Vegetables", 1250, "Dried Vegetables", "mixed-vegetables"],
  // Moved to Herbs:
  ["Gond Katira", 750, "Herbs", "gond-katira"],
  ["Gond Laddu", 750, "Herbs", "gond-laddu"],
  ["Stone Chocolates", 580, "Chocolates", "stone-chocolates"],
  ["VDF Mixed Chocolates", 900, "Chocolates", "vdf-mixed-chocolates"],
  ["VDF Dark Crackle Chocolates", 840, "Chocolates", "vdf-dark-crackle-chocolates"],
  ["VDF Fruits N Nut Chocolates", 860, "Chocolates", "vdf-fruits-n-nut-chocolates"],
  ["VDF Butterscotch Chocolates", 880, "Chocolates", "vdf-butterscotch-chocolates"],
  ["VDF Dates & Almond Chocolates", 880, "Chocolates", "vdf-dates-and-almond-chocolates"],
  ["VDF Nutella Chocolates", 930, "Chocolates", "vdf-nutella-chocolates"],
  ["VDF Hazelnut Chocolates", 930, "Chocolates", "vdf-hazelnut-chocolates"],
  ["VDF Almonds Bites Chocolates", 860, "Chocolates", "vdf-almonds-bites-chocolates"],
  ["VDF Orange Chocolates", 930, "Chocolates", "vdf-orange-chocolates"],
  // ---- Gift Packs (price on enquiry, not per kg) ----
  ["Premium Wicker Hamper", 0, "Gift Packs", "premium-wicker-hamper", true],
  ["Festive Dry Fruit Tray", 0, "Gift Packs", "festive-tray-hamper", true],
  ["Classic Wicker Basket", 0, "Gift Packs", "classic-wicker-basket", true],
  ["Connoisseur Bowl Hamper", 0, "Gift Packs", "connoisseur-bowl-hamper", true],
  ["Gold Frame Mewa Box", 0, "Gift Packs", "gold-frame-mewa-box", true],
  ["Cow Blessing Tray", 0, "Gift Packs", "cow-blessing-tray", true],
  ["Peacock Heritage Box", 0, "Gift Packs", "peacock-heritage-box", true],
  ["Red Festive Potli", 0, "Gift Packs", "red-festive-potli", true],
  ["Saffron Wedding Basket", 0, "Gift Packs", "saffron-wedding-basket", true],
];

// Regional / alternate-name search aliases (Hindi, Kannada & common names)
const ALIAS_BY_CATEGORY = {
  Almonds: ["badam", "baadam"],
  Cashews: ["kaju", "gerkasu", "godambi"],
  Pistachios: ["pista", "pistachio", "piste"],
  Walnuts: ["akhrot", "akrot", "walnut"],
  Dates: ["khajur", "khajoor", "kharjura", "khajoor"],
  Raisins: ["kishmish", "kismis", "drakshi", "dry grapes", "manuka"],
  Figs: ["anjeer", "anjir", "anjura", "fig"],
  Apricots: ["khubani", "jardalu", "apricot"],
  Seeds: ["beej", "beeja", "seeds"],
  Spices: ["masala", "masale", "spice"],
  Nuts: ["nuts", "dry fruits"],
  Berries: ["berry", "berries"],
  Sweeteners: ["sugar", "sweetener"],
  Chocolates: ["chocolate", "choco"],
};

const ALIAS_BY_SLUG = {
  cardamom: ["elaichi", "elakki", "yalakki", "elachi"],
  cloves: ["laung", "lavang", "lavanga"],
  "black-pepper": ["kali mirch", "menasu", "kalimirch", "pepper"],
  cinnamon: ["dalchini", "chakke", "dalcheeni"],
  "turmeric-powder": ["haldi", "arishina", "turmeric"],
  "flax-seeds": ["alsi", "agase", "flax", "linseed"],
  "chia-seeds": ["chia", "sabja"],
  "basil-sabja-seeds": ["sabja", "tukmaria", "basil seed", "kamakasturi"],
  "makhana-plain": ["fox nuts", "lotus seeds", "phool makhana", "makhana"],
  "poppy-seed-khus-khus": ["khus khus", "gasagase", "posto", "poppy"],
  "sugar-sompu": ["sompu", "saunf", "fennel", "mukhwas", "sonf", "scompu"],
  jeera: ["cumin", "jeerige", "zeera", "jeera"],
  "shahi-jeera": ["shahi jeera", "caraway", "black cumin"],
  "methi-seeds": ["fenugreek", "menthya", "methi"],
  ajwain: ["carom", "oma", "omkalu", "ajwain"],
  "kalonji-seed": ["nigella", "black seed", "kalojeera", "kalonji"],
  "gond-katira": ["tragacanth", "gum", "gond"],
  "gond-laddu": ["gond", "edible gum"],
  "misri-white": ["mishri", "rock sugar", "kalkandu"],
  "misri-red": ["mishri", "rock sugar"],
  "bay-leaf": ["tej patta", "biryani leaf"],
  "star-anise": ["chakri phool", "badian"],
  japatri: ["mace", "javitri", "jaipatri"],
  "marathi-mog": ["marathi moggu", "kapok buds"],
  "muskmelon-seeds": ["kharbuja", "magaz"],
  "watermelon-seeds": ["tarbuj", "magaj"],
  "pumpkin-seeds": ["pumpkin", "kaddu"],
  "sunflower-seeds": ["sunflower", "surajmukhi"],
  hazelnuts: ["hazel", "hajal"],
  "pecan-nuts": ["pecan"],
  "brazil-nuts": ["brazil"],
  "macadamia-nuts": ["macadamia"],
  souff: ["souff", "sev"],
  "amla-sweet": ["amla", "gooseberry", "nellikai"],
  "amla-chatpata": ["amla", "gooseberry"],
  "amla-honey": ["amla", "gooseberry"],
};

// Common copy generators for product detail page
const benefitsByCat = {
  Almonds: ["Rich in vitamin E and protein", "Supports heart and brain health", "Naturally helps manage cholesterol"],
  Cashews: ["Source of healthy fats and magnesium", "Boosts energy and immunity", "Great for bones and skin"],
  Pistachios: ["High in antioxidants and fibre", "Aids weight management", "Supports eye and gut health"],
  Walnuts: ["Loaded with Omega-3 fatty acids", "Boosts brain function", "Anti-inflammatory benefits"],
  Nuts: ["Premium imported quality", "Nutrient-dense superfood", "Perfect for daily snacking"],
  Dates: ["Natural energy boost", "Rich in iron and potassium", "Excellent post-workout recovery"],
  Raisins: ["Natural sweetener with iron", "Supports digestion", "Great for kids and elderly"],
  Figs: ["High in fibre and calcium", "Supports digestion and bones", "Slow-release energy"],
  Apricots: ["Vitamin A & beta-carotene rich", "Supports skin and eyesight", "Naturally sweet treat"],
  "Dried Fruits": ["Sun-dried for maximum nutrition", "No added preservatives", "Perfect for trail mixes"],
  Berries: ["Powerful antioxidants", "Supports immunity", "Great in smoothies and bowls"],
  Seeds: ["Superfood for daily nutrition", "Rich in Omega-3, fibre and protein", "Boosts heart and gut health"],
  Spices: ["Hand-graded whole spices", "Aromatic, fresh and pure", "Authentic flavour for every kitchen"],
  Chocolates: ["Handcrafted in small batches", "Premium cocoa and dry fruits", "Perfect gift indulgence"],
  Sweets: ["Traditional Indian sweets", "Made with pure ingredients", "Festive and gifting favourite"],
  Sweeteners: ["Pure unrefined goodness", "Natural energy source", "A healthier sugar alternative"],
  Snacks: ["Light, crunchy and wholesome", "Guilt-free everyday munchies", "Travel and tiffin ready"],
  Mix: ["Curated nut and fruit blend", "Balanced nutrition in every handful", "Office, gym and gift ready"],
  "Health Food": ["Wellness-focused superfoods", "Clean label, no additives", "Daily ritual essentials"],
  Breakfast: ["Wholesome start to your day", "High fibre, slow-burn energy", "Loved by all ages"],
  Herbs: ["Traditional Ayurvedic herbs", "Carefully sourced and cleaned", "Time-tested wellness"],
  "Dried Vegetables": ["Dehydrated to lock-in nutrition", "Quick-cook convenience", "Pantry essential"],
  "Gift Packs": ["Curated luxury hamper", "Premium emerald & gold packaging", "Ready for festive gifting"],
};

const usageByCat = {
  Almonds: "Soak 6-8 overnight; eat in the morning, or add to milkshakes, kheer and salads.",
  Cashews: "Snack as-is, blend into creamy curries (kaju masala), or top desserts and biryanis.",
  Pistachios: "Garnish kulfi, ras malai or salads; eat a handful as an evening snack.",
  Walnuts: "Add to brownies, oatmeal, walnut chutney or simply eat 3-4 daily.",
  Nuts: "Mix into trail mixes, energy bars, granola or eat by the handful.",
  Dates: "Enjoy 2-3 daily, blend into smoothies, or stuff with nuts for festive bites.",
  Raisins: "Add to kheer, pulao, cookies, or carry as a quick snack pouch.",
  Figs: "Soak overnight in milk, slice over yoghurt, or eat dry as a sweet treat.",
  Apricots: "Snack as-is, simmer in compotes, or chop into tagines and oatmeal.",
  "Dried Fruits": "Top yoghurt, granola or breakfast bowls; perfect for trail mixes.",
  Berries: "Blend into smoothies, scatter on overnight oats, or eat by the spoonful.",
  Seeds: "Sprinkle on salads, smoothie bowls, curd or chapati dough.",
  Spices: "Temper in hot ghee or oil; grind fresh for masalas and tea.",
  Chocolates: "Serve chilled with coffee, gift in festive hampers, or pair with wine.",
  Sweets: "Serve as dessert or distribute on festivals and special occasions.",
  Sweeteners: "Crush misri to sprinkle on milk, paan or kheer; pure natural sweetness.",
  Snacks: "Open and enjoy — perfect for parties, tiffin, road trips and movie nights.",
  Mix: "Eat by the handful, gift in mason jars, or top sundaes and trail bowls.",
  "Health Food": "Make a daily wellness ritual — ideal for kids, elders and athletes.",
  Breakfast: "Pour with milk, yoghurt or plant milk and top with fresh fruit.",
  Herbs: "Soak as instructed for traditional Ayurvedic preparations.",
  "Dried Vegetables": "Rehydrate in warm water 10 minutes before cooking into curries and soups.",
  "Gift Packs": "Gift to family, friends, clients or staff on Diwali, Eid, weddings and corporate events.",
};

const storage = "Store in an airtight container in a cool, dry place. Refrigerate after opening for extended freshness up to 3 months.";

export const WEIGHT_OPTIONS = [
  { key: "100g", label: "100 g", factor: 0.10 },
  { key: "250g", label: "250 g", factor: 0.25 },
  { key: "500g", label: "500 g", factor: 0.50 },
  { key: "1kg", label: "1 kg", factor: 1.00 },
];

export const priceFor = (basePrice, weightKey) => {
  const w = WEIGHT_OPTIONS.find((o) => o.key === weightKey) || WEIGHT_OPTIONS[3];
  return Math.round(basePrice * w.factor);
};

export const enrichProduct = (p, i = 0) => {
  const { name, category, slug } = p;
  const isGift = Boolean(p.isGift);
  const keywords = [
    name,
    category,
    ...(ALIAS_BY_CATEGORY[category] || []),
    ...(ALIAS_BY_SLUG[slug] || []),
  ]
    .join(" ")
    .toLowerCase();
  return {
    id: p.id || slug,
    slug,
    image: p.image && String(p.image).trim() ? p.image : img(slug),
    name,
    price: p.price,
    category,
    isGift,
    inStock: p.inStock !== false,
    featured: Boolean(p.featured),
    description: isGift
      ? `${name} — a curated luxury hamper from Velora Dry Fruits, beautifully packed in emerald-and-gold festive style. Perfect for Diwali, Eid, weddings and corporate gifting.`
      : `${name} from Velora Dry Fruits — premium ${category.toLowerCase()} sourced and hand-graded for the finest taste, aroma and nutrition. Vacuum-fresh packed in our signature emerald-green pouch.`,
    benefits: benefitsByCat[category] || ["Premium quality", "Hand-graded freshness", "Vacuum-sealed for purity"],
    usage: usageByCat[category] || "Enjoy daily as part of a balanced lifestyle.",
    storage,
    keywords,
  };
};

export const buildCatalog = (list) => {
  const products = (list || []).map((p, i) => enrichProduct(p, i));
  const bySlug = Object.fromEntries(products.map((p) => [p.slug, p]));
  const categories = [
    "All",
    ...Array.from(new Set(products.map((p) => p.category))).sort(),
  ];
  return { products, bySlug, categories };
};

const FEATURED_INDEXES = [2, 4, 14, 17, 21, 28, 29, 34, 47, 78, 96];
const staticList = raw.map(([name, price, category, slug, isGift], i) => ({
  id: i + 1,
  slug,
  name,
  price,
  category,
  isGift: Boolean(isGift),
  image: CUSTOM_IMG[slug] || "",
  inStock: true,
  featured: FEATURED_INDEXES.includes(i + 1) || Boolean(isGift),
}));

const staticCatalog = buildCatalog(staticList);
export const PRODUCTS = staticCatalog.products;
export const PRODUCT_BY_SLUG = staticCatalog.bySlug;
export const CATEGORIES = staticCatalog.categories;

export const CATEGORY_META = {
  Almonds: { icon: "🌰", tagline: "Premium quality almonds" },
  Cashews: { icon: "🥜", tagline: "Crunchy & creamy cashews" },
  Pistachios: { icon: "🌿", tagline: "Iranian & Californian pista" },
  Dates: { icon: "🌴", tagline: "Authentic Arabian dates" },
  Raisins: { icon: "🍇", tagline: "Naturally sweet raisins" },
  Figs: { icon: "🍐", tagline: "Premium anjeer figs" },
  Walnuts: { icon: "🌳", tagline: "Brain-boosting kernels" },
  Nuts: { icon: "🥥", tagline: "Imported gourmet nuts" },
  Apricots: { icon: "🍑", tagline: "Soft Turkish apricots" },
  Seeds: { icon: "🌱", tagline: "Superfood seeds" },
  Spices: { icon: "🌶️", tagline: "Whole spices & masalas" },
  Berries: { icon: "🫐", tagline: "Antioxidant rich berries" },
  "Dried Fruits": { icon: "🍓", tagline: "Sun-dried goodness" },
  "Dried Vegetables": { icon: "🥬", tagline: "Dehydrated veggies" },
  Chocolates: { icon: "🍫", tagline: "VDF house chocolates" },
  Sweets: { icon: "🍯", tagline: "Traditional sweets" },
  Sweeteners: { icon: "🍬", tagline: "Natural misri & sugar" },
  Snacks: { icon: "🥨", tagline: "Healthy munchies" },
  Mix: { icon: "🎁", tagline: "Curated dry fruit mixes" },
  "Health Food": { icon: "💚", tagline: "Wellness essentials" },
  Breakfast: { icon: "🥣", tagline: "Wholesome breakfast" },
  Herbs: { icon: "🌿", tagline: "Ayurvedic herbs" },
  "Gift Packs": { icon: "🎀", tagline: "Luxury hampers for gifting" },
};
