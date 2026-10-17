"""Backend API tests for Velora — Product Admin CRUD.

Covers:
- GET /api/products returns catalog (>=117 seeded)
- Fields present per Product schema
- POST /api/admin/products with/without token (auth + slug uniqueness)
- PUT /api/admin/products/{id}: valid update, wrong token, 404
- DELETE /api/admin/products/{id}: valid delete, wrong token, 404
- Cleanup of anything created with TEST_ prefix
"""
import os
import uuid
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "http://localhost:8001").rstrip("/")
ADMIN_TOKEN = os.environ.get("ADMIN_TOKEN", "velora-admin-2026")
API = f"{BASE_URL}/api"


@pytest.fixture(scope="module")
def client():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


@pytest.fixture(scope="module")
def admin_headers():
    return {"X-Admin-Token": ADMIN_TOKEN, "Content-Type": "application/json"}


REQUIRED_FIELDS = {"id", "slug", "name", "price", "category", "isGift", "image", "inStock", "featured", "order"}


# --------- GET /api/products ---------
class TestListProducts:
    def test_public_list_returns_catalog(self, client):
        r = client.get(f"{API}/products")
        assert r.status_code == 200
        data = r.json()
        assert isinstance(data, list)
        # Should have the seeded catalog (~117); do not assert exact 117 in case previous run left artifacts
        assert len(data) >= 100, f"Expected seeded catalog (>=100), got {len(data)}"

    def test_products_have_required_fields(self, client):
        r = client.get(f"{API}/products")
        assert r.status_code == 200
        data = r.json()
        assert data, "product list empty"
        missing = REQUIRED_FIELDS - set(data[0].keys())
        assert not missing, f"Missing fields on product: {missing}"
        # No Mongo _id leak
        for p in data[:20]:
            assert "_id" not in p

    def test_products_sorted_by_order(self, client):
        r = client.get(f"{API}/products")
        orders = [p["order"] for p in r.json()]
        assert orders == sorted(orders), "products should be sorted by 'order' asc"


# --------- Auth on admin endpoints ---------
class TestAdminAuth:
    def test_create_requires_token(self, client):
        r = client.post(f"{API}/admin/products", json={"name": "TEST_x", "category": "TEST"})
        assert r.status_code == 401

    def test_create_wrong_token(self, client):
        r = client.post(
            f"{API}/admin/products",
            json={"name": "TEST_x", "category": "TEST"},
            headers={"X-Admin-Token": "nope"},
        )
        assert r.status_code == 401

    def test_update_wrong_token(self, client):
        r = client.put(
            f"{API}/admin/products/some-id",
            json={"price": 1},
            headers={"X-Admin-Token": "nope"},
        )
        assert r.status_code == 401

    def test_delete_wrong_token(self, client):
        r = client.delete(
            f"{API}/admin/products/some-id",
            headers={"X-Admin-Token": "nope"},
        )
        assert r.status_code == 401


# --------- Product CRUD lifecycle ---------
class TestProductCrud:
    created_ids = []

    def test_create_product(self, client, admin_headers):
        tag = uuid.uuid4().hex[:6]
        payload = {
            "name": f"TEST_Nut_{tag}",
            "category": "TEST_Category",
            "price": 999,
            "image": "",
            "isGift": False,
            "inStock": True,
            "featured": False,
        }
        r = client.post(f"{API}/admin/products", json=payload, headers=admin_headers)
        assert r.status_code == 200, r.text
        prod = r.json()
        assert prod["name"] == payload["name"]
        assert prod["category"] == payload["category"]
        assert prod["price"] == 999
        assert prod["slug"].startswith("test-nut-")
        assert "id" in prod and prod["id"]
        TestProductCrud.created_ids.append(prod["id"])

        # GET verifies persistence
        r2 = client.get(f"{API}/products")
        ids = {p["id"] for p in r2.json()}
        assert prod["id"] in ids

    def test_create_unique_slug(self, client, admin_headers):
        # Two products with identical name should get suffixed slugs
        payload = {"name": "TEST_Duplicate", "category": "TEST_Category", "price": 100}
        r1 = client.post(f"{API}/admin/products", json=payload, headers=admin_headers)
        r2 = client.post(f"{API}/admin/products", json=payload, headers=admin_headers)
        assert r1.status_code == 200 and r2.status_code == 200
        s1, s2 = r1.json()["slug"], r2.json()["slug"]
        assert s1 != s2, "slug must be unique"
        assert s2.endswith("-2") or s2.endswith(("-3", "-4", "-5"))
        TestProductCrud.created_ids.extend([r1.json()["id"], r2.json()["id"]])

    def test_update_price_and_stock(self, client, admin_headers):
        # Create → Update → verify GET
        payload = {"name": f"TEST_Update_{uuid.uuid4().hex[:6]}", "category": "TEST", "price": 500}
        c = client.post(f"{API}/admin/products", json=payload, headers=admin_headers)
        assert c.status_code == 200
        pid = c.json()["id"]
        TestProductCrud.created_ids.append(pid)

        u = client.put(
            f"{API}/admin/products/{pid}",
            json={"price": 1234, "inStock": False, "name": "TEST_Update_Renamed"},
            headers=admin_headers,
        )
        assert u.status_code == 200, u.text
        upd = u.json()
        assert upd["price"] == 1234
        assert upd["inStock"] is False
        assert upd["name"] == "TEST_Update_Renamed"

        # verify via public GET
        listing = client.get(f"{API}/products").json()
        found = next((p for p in listing if p["id"] == pid), None)
        assert found is not None
        assert found["price"] == 1234
        assert found["inStock"] is False
        assert found["name"] == "TEST_Update_Renamed"

    def test_update_nonexistent(self, client, admin_headers):
        r = client.put(
            f"{API}/admin/products/does-not-exist-xyz",
            json={"price": 1},
            headers=admin_headers,
        )
        assert r.status_code == 404

    def test_update_no_fields(self, client, admin_headers):
        # empty payload => 400
        # create first
        c = client.post(
            f"{API}/admin/products",
            json={"name": f"TEST_Empty_{uuid.uuid4().hex[:6]}", "category": "TEST"},
            headers=admin_headers,
        )
        pid = c.json()["id"]
        TestProductCrud.created_ids.append(pid)
        r = client.put(f"{API}/admin/products/{pid}", json={}, headers=admin_headers)
        assert r.status_code == 400

    def test_delete_flow(self, client, admin_headers):
        c = client.post(
            f"{API}/admin/products",
            json={"name": f"TEST_Del_{uuid.uuid4().hex[:6]}", "category": "TEST", "price": 10},
            headers=admin_headers,
        )
        pid = c.json()["id"]

        d = client.delete(f"{API}/admin/products/{pid}", headers=admin_headers)
        assert d.status_code == 200
        assert d.json().get("deleted") is True

        # confirm removed
        listing = client.get(f"{API}/products").json()
        assert not any(p["id"] == pid for p in listing)

    def test_delete_nonexistent(self, client, admin_headers):
        r = client.delete(f"{API}/admin/products/does-not-exist-xyz", headers=admin_headers)
        assert r.status_code == 404


# --------- Cleanup ---------
def test_zz_cleanup_test_products(client, admin_headers):
    """Delete any TEST_* products created during test run to keep catalog clean."""
    r = client.get(f"{API}/products")
    if r.status_code != 200:
        return
    for p in r.json():
        if p["name"].startswith("TEST_") or p["category"] == "TEST_Category" or p["category"] == "TEST":
            client.delete(f"{API}/admin/products/{p['id']}", headers=admin_headers)
