"""
Generate premium Velora product images using Gemini Nano Banana.
Uses the user's reference image as style anchor — luxury dark-green Velora pouch + brass bowl + black marble.

Run: python /app/backend/scripts/generate_product_images.py
Output: /app/backend/static/products/{slug}.png
Progress logged to: /app/backend/static/products/_progress.json
"""
import asyncio
import base64
import json
import os
import re
import sys
import time
from pathlib import Path
from urllib.request import urlopen

from dotenv import load_dotenv

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))
load_dotenv(ROOT / ".env")

from emergentintegrations.llm.chat import LlmChat, UserMessage, ImageContent  # type: ignore

API_KEY = os.environ["EMERGENT_LLM_KEY"]
MODEL = "gemini-3.1-flash-image-preview"

OUT_DIR = ROOT / "static" / "products"
OUT_DIR.mkdir(parents=True, exist_ok=True)
PROGRESS = OUT_DIR / "_progress.json"

REFERENCE_URL = (
    "https://customer-assets.emergentagent.com/job_velora-ecommerce/artifacts/"
    "86f51z25_ChatGPT%20Image%20Jun%2010%2C%202026%2C%2002_01_20%20PM%20%281%29.png"
)

# Product list (must match frontend /app/frontend/src/data/products.js raw list)
PRODUCTS = [
    ("Almond Regular", "Almonds"),
    ("Almond Jumbo", "Almonds"),
    ("Almond Sonara", "Almonds"),
    ("Mamra Almond", "Almonds"),
    ("Salted Almonds", "Almonds"),
    ("Cashew Jumbo Roasted", "Cashews"),
    ("Cashew Special", "Cashews"),
    ("Cashew Regular", "Cashews"),
    ("Cashew Slices", "Cashews"),
    ("Cashew Classic", "Cashews"),
    ("Salted Cashews", "Cashews"),
    ("Pepper Cashews", "Cashews"),
    ("Red Chilli Cashews", "Cashews"),
    ("Pista Plain Roasted", "Pistachios"),
    ("Pista California", "Pistachios"),
    ("Pista Akbari", "Pistachios"),
    ("Walnut Kernel", "Walnuts"),
    ("Walnut Chilli Snow White", "Walnuts"),
    ("Hazelnuts", "Nuts"),
    ("Pecan Nuts", "Nuts"),
    ("Brazil Nuts", "Nuts"),
    ("Macadamia Nuts", "Nuts"),
    ("Black Raisins", "Raisins"),
    ("Raisin Indian", "Raisins"),
    ("Raisin Afghan", "Raisins"),
    ("Raisins Special Natala", "Raisins"),
    ("Dry Dates", "Dates"),
    ("Ajwa Dates", "Dates"),
    ("Medjool Dates", "Dates"),
    ("Saffawi Dates", "Dates"),
    ("Mabroom Dates", "Dates"),
    ("Sukkari Dates", "Dates"),
    ("Arabian Seedless Dates", "Dates"),
    ("Anjeer Jumbo", "Figs"),
    ("Anjeer Classic", "Figs"),
    ("Anjeer Big", "Figs"),
    ("Apricot Turkel", "Apricots"),
    ("Apricot Bold", "Apricots"),
    ("Cherry Dried", "Dried Fruits"),
    ("Mango Dried", "Dried Fruits"),
    ("Kiwi Dried", "Dried Fruits"),
    ("Blackberry Dried", "Dried Fruits"),
    ("Strawberry Dried", "Dried Fruits"),
    ("Cranberries", "Dried Fruits"),
    ("Prunes", "Dried Fruits"),
    ("Pineapple Dried", "Dried Fruits"),
    ("Mixed Fruits", "Dried Fruits"),
    ("Blueberries", "Berries"),
    ("Basil Sabja Seeds", "Seeds"),
    ("White Till", "Seeds"),
    ("White Till Natti", "Seeds"),
    ("Black Till", "Seeds"),
    ("Kalonji Seed", "Seeds"),
    ("Ajwain", "Seeds"),
    ("Poppy Seed Khus Khus", "Seeds"),
    ("Muskmelon Seeds", "Seeds"),
    ("Pumpkin Seeds", "Seeds"),
    ("Flax Seeds", "Seeds"),
    ("Sunflower Seeds", "Seeds"),
    ("Watermelon Seeds", "Seeds"),
    ("Chia Seeds", "Seeds"),
    ("Seeds Mix", "Seeds"),
    ("Alive Seeds", "Seeds"),
    ("Methi Seeds", "Seeds"),
    ("Cloves", "Spices"),
    ("Black Pepper", "Spices"),
    ("Shahi Jeera", "Spices"),
    ("Japatri", "Spices"),
    ("Cinnamon", "Spices"),
    ("Bay Leaf", "Spices"),
    ("Star Anise", "Spices"),
    ("Cardamom", "Spices"),
    ("Turmeric Powder", "Spices"),
    ("Garam Masala Powder", "Spices"),
    ("Marathi Mog", "Spices"),
    ("Misri White", "Sweeteners"),
    ("Misri Red", "Sweeteners"),
    ("Diamond Sugar", "Sweeteners"),
    ("Souff", "Snacks"),
    ("Makhana Plain", "Snacks"),
    ("Mexican Bites", "Snacks"),
    ("Party Snacks", "Snacks"),
    ("Avalaki Mix", "Snacks"),
    ("Amla Chatpata", "Snacks"),
    ("Muesli", "Breakfast"),
    ("Protein Beans", "Pulses"),
    ("Protein Booster", "Health Food"),
    ("Amla Honey", "Health Food"),
    ("Indian Mango Bar", "Sweets"),
    ("Amla Sweet", "Sweets"),
    ("Gond Laddu", "Sweets"),
    ("Pancharattan", "Mix"),
    ("Power Mix", "Mix"),
    ("Dry Fruits Mix", "Mix"),
    ("Mixed Vegetables", "Dried Vegetables"),
    ("Gond Katira", "Herbs"),
    ("Stone Chocolates", "Chocolates"),
    ("VDF Mixed Chocolates", "Chocolates"),
    ("VDF Dark Crackle Chocolates", "Chocolates"),
    ("VDF Fruits N Nut Chocolates", "Chocolates"),
    ("VDF Butterscotch Chocolates", "Chocolates"),
    ("VDF Dates And Almond Chocolates", "Chocolates"),
    ("VDF Nutella Chocolates", "Chocolates"),
    ("VDF Hazelnut Chocolates", "Chocolates"),
    ("VDF Almonds Bites Chocolates", "Chocolates"),
    ("VDF Orange Chocolates", "Chocolates"),
]


def slugify(name: str) -> str:
    s = re.sub(r"[^a-z0-9]+", "-", name.lower()).strip("-")
    return s


STYLE_LOCK = (
    "Premium luxury Indian dry-fruit catalogue photography. "
    "EXACT same composition as the reference image: a dark emerald green stand-up Velora pouch "
    "stands upright in the background with a gold embossed VELORA tree logo and the text "
    "'PREMIUM QUALITY SINCE 1992' in gold; in the foreground a heavy ornate antique brass bowl "
    "with embossed gold Velora tree emblem on the front holds a generous mound of the product. "
    "Surface is polished black marble with subtle gold veins. Lighting is warm cinematic gold "
    "with soft golden bokeh in the background and elegant rim light. Ultra realistic high-end "
    "commercial product photography, centered composition, vertical 4:5 aspect feel, sharp focus "
    "on product, photographic detail, no text overlay except the pouch branding."
)


async def gen_one(reference_b64: str, name: str, category: str, retries: int = 2):
    slug = slugify(name)
    out_path = OUT_DIR / f"{slug}.png"
    if out_path.exists() and out_path.stat().st_size > 50_000:
        return slug, True, "cached"

    prompt = (
        f"{STYLE_LOCK} The bowl is filled with {name.upper()} ({category}). "
        f"Keep the Velora pouch EXACTLY identical to the reference. Only the product inside the "
        f"bowl changes to {name}. Show a small spill of {name} on the marble next to the bowl. "
        f"Do not add price tags or extra text."
    )

    for attempt in range(retries + 1):
        try:
            chat = LlmChat(
                api_key=API_KEY,
                session_id=f"velora-{slug}-{attempt}",
                system_message="You are a luxury product photographer.",
            )
            chat.with_model("gemini", MODEL).with_params(modalities=["image", "text"])
            msg = UserMessage(text=prompt, file_contents=[ImageContent(reference_b64)])
            _, images = await chat.send_message_multimodal_response(msg)
            if images:
                image_bytes = base64.b64decode(images[0]["data"])
                out_path.write_bytes(image_bytes)
                return slug, True, "ok"
        except Exception as e:
            if attempt >= retries:
                return slug, False, str(e)[:120]
            await asyncio.sleep(2)
    return slug, False, "no-image"


def load_progress():
    if PROGRESS.exists():
        try:
            return json.loads(PROGRESS.read_text())
        except Exception:
            return {}
    return {}


def save_progress(progress):
    PROGRESS.write_text(json.dumps(progress, indent=2))


async def main(concurrency: int = 4):
    print("Downloading reference image...")
    with urlopen(REFERENCE_URL, timeout=60) as r:
        ref_bytes = r.read()
    ref_b64 = base64.b64encode(ref_bytes).decode("utf-8")
    print(f"Reference size: {len(ref_bytes)} bytes")

    progress = load_progress()
    progress.setdefault("results", {})
    progress["started_at"] = time.time()
    progress["total"] = len(PRODUCTS)

    sem = asyncio.Semaphore(concurrency)

    async def worker(p):
        async with sem:
            slug, ok, info = await gen_one(ref_b64, p[0], p[1])
            progress["results"][slug] = {"ok": ok, "info": info, "name": p[0]}
            done = sum(1 for v in progress["results"].values() if v.get("ok"))
            progress["done"] = done
            save_progress(progress)
            status = "OK" if ok else "FAIL"
            print(f"[{done}/{len(PRODUCTS)}] {status} {p[0]} ({info})", flush=True)
            return ok

    await asyncio.gather(*[worker(p) for p in PRODUCTS])
    progress["finished_at"] = time.time()
    save_progress(progress)
    print("Done.")


if __name__ == "__main__":
    asyncio.run(main())
