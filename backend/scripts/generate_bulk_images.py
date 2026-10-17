"""Generate 3 luxury bulk/wholesale showcase images for Velora homepage."""
import asyncio, base64, sys
from pathlib import Path
from urllib.request import urlopen

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))
sys.path.insert(0, str(ROOT / "scripts"))
from generate_product_images import REFERENCE_URL, OUT_DIR, STYLE_LOCK
from emergentintegrations.llm.chat import LlmChat, UserMessage, ImageContent
import os
from dotenv import load_dotenv
load_dotenv(ROOT / ".env")

API_KEY = os.environ["EMERGENT_LLM_KEY"]
MODEL = "gemini-3.1-flash-image-preview"

BULK_PROMPTS = [
    ("bulk-corporate-hamper",
     "A luxury Diwali / wedding gift hamper using Velora packaging: a polished black-marble surface with multiple "
     "dark emerald-green Velora pouches arranged in a tall premium gift box trimmed with gold ribbon. Inside the "
     "box: assorted nuts, dried fruits and dates spilling artfully over the marble. Gold embossed 'VELORA' tree "
     "logo visible on every pouch. Warm golden cinematic lighting, soft golden bokeh. Premium catalogue product "
     "photography, top-tier luxury Indian aesthetic, ultra realistic. Show a small 'corporate gift' brass plaque."),
    ("bulk-wholesale-stack",
     "A wholesale shipment scene: a polished black-marble counter stacked with 12+ identical dark emerald-green "
     "Velora pouches arranged in neat rows like a luxury boutique display, with gold embossed VELORA tree logo on "
     "each pouch. A heavy ornate brass weighing scale on the side with almonds and cashews. Warm golden bokeh, "
     "premium retail look, ultra realistic high-end commercial photography."),
    ("bulk-wedding-gift",
     "A bride-and-groom wedding gifting tableau: an open premium gift box on black marble with three dark "
     "emerald-green Velora pouches inside, surrounded by Medjool dates, pistachios, and saffron threads, with "
     "gold ribbon and a small ivory ribbon. Soft golden bokeh background. Luxury Middle-Eastern wedding "
     "aesthetic, ultra realistic, no text overlay except VELORA logo on pouches."),
]


async def gen(ref_b64, slug, extra_prompt):
    out_path = OUT_DIR / f"{slug}.png"
    if out_path.exists() and out_path.stat().st_size > 50_000:
        print(f"SKIP cached: {slug}")
        return
    chat = LlmChat(api_key=API_KEY, session_id=f"bulk-{slug}", system_message="You are a luxury product photographer.")
    chat.with_model("gemini", MODEL).with_params(modalities=["image", "text"])
    prompt = f"{STYLE_LOCK} {extra_prompt}"
    msg = UserMessage(text=prompt, file_contents=[ImageContent(ref_b64)])
    _, images = await chat.send_message_multimodal_response(msg)
    if images:
        out_path.write_bytes(base64.b64decode(images[0]["data"]))
        print(f"OK {slug}")
    else:
        print(f"FAIL {slug}")


async def main():
    with urlopen(REFERENCE_URL, timeout=60) as r:
        ref_b64 = base64.b64encode(r.read()).decode()
    for slug, p in BULK_PROMPTS:
        await gen(ref_b64, slug, p)

asyncio.run(main())
