"""Quick test - generate 1 product image to validate setup."""
import asyncio, base64, sys
from pathlib import Path
ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))
sys.path.insert(0, str(ROOT / "scripts"))
from generate_product_images import gen_one, REFERENCE_URL
from urllib.request import urlopen

async def main():
    with urlopen(REFERENCE_URL, timeout=60) as r:
        ref_b64 = base64.b64encode(r.read()).decode()
    slug, ok, info = await gen_one(ref_b64, "Almond Jumbo", "Almonds")
    print(f"TEST RESULT: slug={slug} ok={ok} info={info}")

asyncio.run(main())
