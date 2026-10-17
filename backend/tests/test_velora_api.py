"""Backend API tests for Velora Dry Fruits.

Covers:
- Health/root endpoint
- Newsletter subscribe (public) — happy path, dedupe, invalid email
- Admin verification (token correct/incorrect)
- Newsletter subscribers list (admin only) + stats
- Newsletter delete (admin only) + 404
- Static file route for product images
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


def _gen_email(tag="t"):
    return f"test_{tag}_{uuid.uuid4().hex[:8]}@velora-test.com".lower()


# ----- Root ----- #
def test_root(client):
    r = client.get(f"{API}/")
    assert r.status_code == 200
    assert r.json().get("message") == "Velora Dry Fruits API"


# ----- Newsletter Subscribe ----- #
class TestNewsletterSubscribe:
    def test_subscribe_success(self, client):
        email = _gen_email("sub")
        r = client.post(f"{API}/newsletter/subscribe", json={"email": email, "source": "website"})
        assert r.status_code == 200, r.text
        data = r.json()
        assert data["email"] == email
        assert data["source"] == "website"
        assert "id" in data and isinstance(data["id"], str)
        assert "subscribed_at" in data

    def test_subscribe_dedupes_same_email(self, client, admin_headers):
        email = _gen_email("dup")
        r1 = client.post(f"{API}/newsletter/subscribe", json={"email": email})
        assert r1.status_code == 200
        id1 = r1.json()["id"]
        r2 = client.post(f"{API}/newsletter/subscribe", json={"email": email})
        assert r2.status_code == 200
        id2 = r2.json()["id"]
        assert id1 == id2, "Subscribing same email twice should return same record (dedupe)"

        # Verify only one record in admin list
        listing = client.get(f"{API}/newsletter/subscribers", headers=admin_headers)
        assert listing.status_code == 200
        emails = [s["email"] for s in listing.json()]
        assert emails.count(email) == 1

    def test_subscribe_invalid_email(self, client):
        r = client.post(f"{API}/newsletter/subscribe", json={"email": "not-an-email"})
        assert r.status_code == 422

    def test_subscribe_lowercases_email(self, client):
        email = _gen_email("CASE").upper()
        r = client.post(f"{API}/newsletter/subscribe", json={"email": email})
        assert r.status_code == 200
        assert r.json()["email"] == email.lower()


# ----- Admin Verify ----- #
class TestAdminVerify:
    def test_verify_correct_token(self, client, admin_headers):
        r = client.post(f"{API}/admin/verify", headers=admin_headers)
        assert r.status_code == 200
        assert r.json().get("ok") is True

    def test_verify_wrong_token(self, client):
        r = client.post(f"{API}/admin/verify", headers={"X-Admin-Token": "wrong"})
        assert r.status_code == 401
        assert "Invalid admin token" in r.text

    def test_verify_missing_token(self, client):
        r = client.post(f"{API}/admin/verify")
        assert r.status_code == 401


# ----- Subscribers List & Stats (admin) ----- #
class TestAdminSubscribers:
    def test_list_requires_admin(self, client):
        r = client.get(f"{API}/newsletter/subscribers")
        assert r.status_code == 401

    def test_list_with_admin(self, client, admin_headers):
        email = _gen_email("list")
        client.post(f"{API}/newsletter/subscribe", json={"email": email})
        r = client.get(f"{API}/newsletter/subscribers", headers=admin_headers)
        assert r.status_code == 200
        rows = r.json()
        assert isinstance(rows, list)
        assert any(s["email"] == email for s in rows)
        # No _id (Mongo ObjectId) leaking
        for s in rows[:5]:
            assert "_id" not in s

    def test_stats(self, client, admin_headers):
        r = client.get(f"{API}/newsletter/stats", headers=admin_headers)
        assert r.status_code == 200
        assert "total" in r.json()
        assert isinstance(r.json()["total"], int)

    def test_stats_requires_admin(self, client):
        r = client.get(f"{API}/newsletter/stats")
        assert r.status_code == 401


# ----- Delete Subscriber ----- #
class TestDeleteSubscriber:
    def test_delete_flow(self, client, admin_headers):
        email = _gen_email("del")
        c = client.post(f"{API}/newsletter/subscribe", json={"email": email})
        sub_id = c.json()["id"]

        d = client.delete(f"{API}/newsletter/subscribers/{sub_id}", headers=admin_headers)
        assert d.status_code == 200
        assert d.json().get("deleted") is True

        # Verify removed
        listing = client.get(f"{API}/newsletter/subscribers", headers=admin_headers)
        emails = [s["email"] for s in listing.json()]
        assert email not in emails

    def test_delete_nonexistent_returns_404(self, client, admin_headers):
        r = client.delete(f"{API}/newsletter/subscribers/does-not-exist-xyz", headers=admin_headers)
        assert r.status_code == 404

    def test_delete_requires_admin(self, client):
        r = client.delete(f"{API}/newsletter/subscribers/anything")
        assert r.status_code == 401


# ----- Static product images ----- #
class TestStatic:
    def test_static_image_serves(self, client):
        # Sample a real product image; ajwa-dates.png exists in /app/backend/static/products
        r = client.get(f"{BASE_URL}/api/static/products/ajwa-dates.png")
        assert r.status_code == 200
        assert r.headers.get("content-type", "").startswith("image/")
        assert int(r.headers.get("content-length", "0")) > 1000


# ----- Cleanup ----- #
def test_zz_cleanup_test_data(client, admin_headers):
    """Remove all velora-test.com subscribers after the run."""
    r = client.get(f"{API}/newsletter/subscribers", headers=admin_headers)
    if r.status_code != 200:
        return
    for sub in r.json():
        if sub["email"].endswith("@velora-test.com"):
            client.delete(f"{API}/newsletter/subscribers/{sub['id']}", headers=admin_headers)
