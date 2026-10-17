from fastapi import FastAPI, APIRouter, Header, HTTPException, status
from fastapi.staticfiles import StaticFiles
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import json
import logging
from pathlib import Path
from pydantic import BaseModel, EmailStr, Field, ConfigDict
from typing import List, Optional
import uuid
import re
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Ensure static directory exists
STATIC_DIR = ROOT_DIR / "static"
(STATIC_DIR / "products").mkdir(parents=True, exist_ok=True)

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI()
api_router = APIRouter(prefix="/api")


# ---------------- Status (kept from template) ---------------- #
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class StatusCheckCreate(BaseModel):
    client_name: str


@api_router.get("/")
async def root():
    return {"message": "Velora Dry Fruits API"}


@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_obj = StatusCheck(**input.model_dump())
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    await db.status_checks.insert_one(doc)
    return status_obj


@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    return status_checks


# ---------------- Newsletter ---------------- #
class SubscriberCreate(BaseModel):
    email: EmailStr
    source: Optional[str] = "website"


class Subscriber(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    email: EmailStr
    source: Optional[str] = "website"
    subscribed_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


def _require_admin(x_admin_token: Optional[str]):
    expected = os.environ.get("ADMIN_TOKEN", "")
    if not expected or x_admin_token != expected:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid admin token",
        )


@api_router.post("/newsletter/subscribe", response_model=Subscriber)
async def newsletter_subscribe(payload: SubscriberCreate):
    email_lower = payload.email.lower().strip()
    existing = await db.newsletter_subscribers.find_one({"email": email_lower}, {"_id": 0})
    if existing:
        if isinstance(existing.get("subscribed_at"), str):
            existing["subscribed_at"] = datetime.fromisoformat(existing["subscribed_at"])
        return Subscriber(**existing)

    sub = Subscriber(email=email_lower, source=payload.source or "website")
    doc = sub.model_dump()
    doc["subscribed_at"] = doc["subscribed_at"].isoformat()
    await db.newsletter_subscribers.insert_one(doc)
    return sub


@api_router.get("/newsletter/subscribers", response_model=List[Subscriber])
async def newsletter_list(x_admin_token: Optional[str] = Header(default=None)):
    _require_admin(x_admin_token)
    rows = await db.newsletter_subscribers.find({}, {"_id": 0}).sort("subscribed_at", -1).to_list(2000)
    for r in rows:
        if isinstance(r.get("subscribed_at"), str):
            r["subscribed_at"] = datetime.fromisoformat(r["subscribed_at"])
    return rows


@api_router.get("/newsletter/stats")
async def newsletter_stats(x_admin_token: Optional[str] = Header(default=None)):
    _require_admin(x_admin_token)
    total = await db.newsletter_subscribers.count_documents({})
    return {"total": total}


@api_router.delete("/newsletter/subscribers/{sub_id}")
async def newsletter_delete(sub_id: str, x_admin_token: Optional[str] = Header(default=None)):
    _require_admin(x_admin_token)
    result = await db.newsletter_subscribers.delete_one({"id": sub_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Subscriber not found")
    return {"deleted": True, "id": sub_id}


@api_router.post("/admin/verify")
async def admin_verify(x_admin_token: Optional[str] = Header(default=None)):
    _require_admin(x_admin_token)
    return {"ok": True}


# ---------------- Products (DB-driven catalog) ---------------- #
SEED_FILE = ROOT_DIR / "seed_products.json"


def _slugify(text: str) -> str:
    s = re.sub(r"[^a-z0-9]+", "-", (text or "").lower()).strip("-")
    return s or str(uuid.uuid4())[:8]


class Product(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    slug: str
    name: str
    price: float = 0
    category: str
    isGift: bool = False
    image: Optional[str] = ""
    inStock: bool = True
    featured: bool = False
    order: int = 0


class ProductCreate(BaseModel):
    name: str
    price: float = 0
    category: str
    isGift: bool = False
    image: Optional[str] = ""
    inStock: bool = True
    featured: bool = False


class ProductUpdate(BaseModel):
    name: Optional[str] = None
    price: Optional[float] = None
    category: Optional[str] = None
    isGift: Optional[bool] = None
    image: Optional[str] = None
    inStock: Optional[bool] = None
    featured: Optional[bool] = None


async def seed_products_if_empty():
    count = await db.products.count_documents({})
    if count == 0 and SEED_FILE.exists():
        data = json.loads(SEED_FILE.read_text())
        docs = [Product(**p).model_dump() for p in data]
        if docs:
            await db.products.insert_many(docs)
        logger.info("Seeded %d products", len(docs))


@app.on_event("startup")
async def _startup():
    await seed_products_if_empty()


@api_router.get("/products", response_model=List[Product])
async def list_products():
    rows = await db.products.find({}, {"_id": 0}).sort("order", 1).to_list(1000)
    return rows


@api_router.post("/admin/products", response_model=Product)
async def create_product(payload: ProductCreate, x_admin_token: Optional[str] = Header(default=None)):
    _require_admin(x_admin_token)
    base_slug = _slugify(payload.name)
    slug = base_slug
    n = 2
    while await db.products.find_one({"slug": slug}):
        slug = f"{base_slug}-{n}"
        n += 1
    last = await db.products.find_one({}, sort=[("order", -1)])
    order = (last["order"] + 1) if last and "order" in last else 0
    prod = Product(slug=slug, order=order, **payload.model_dump())
    await db.products.insert_one(prod.model_dump())
    return prod


@api_router.put("/admin/products/{product_id}", response_model=Product)
async def update_product(product_id: str, payload: ProductUpdate, x_admin_token: Optional[str] = Header(default=None)):
    _require_admin(x_admin_token)
    update = {k: v for k, v in payload.model_dump().items() if v is not None}
    if not update:
        raise HTTPException(status_code=400, detail="No fields to update")
    result = await db.products.update_one({"id": product_id}, {"$set": update})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Product not found")
    doc = await db.products.find_one({"id": product_id}, {"_id": 0})
    return doc


@api_router.delete("/admin/products/{product_id}")
async def delete_product(product_id: str, x_admin_token: Optional[str] = Header(default=None)):
    _require_admin(x_admin_token)
    result = await db.products.delete_one({"id": product_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Product not found")
    return {"deleted": True, "id": product_id}


app.include_router(api_router)

# Top-level health endpoints (without /api prefix) for Kubernetes liveness/readiness probes
@app.get("/")
async def health_root():
    return {"status": "ok", "service": "velora-dry-fruits"}


@app.get("/healthz")
async def healthz():
    return {"status": "ok"}


@app.get("/api/healthz")
async def api_healthz():
    return {"status": "ok"}


# Serve generated product images. Path is /api/static/... so it routes via ingress to backend.
app.mount("/api/static", StaticFiles(directory=str(STATIC_DIR)), name="static")

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
