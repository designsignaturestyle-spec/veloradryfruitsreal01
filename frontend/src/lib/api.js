import axios from "axios";

const API_BASE = `${process.env.REACT_APP_BACKEND_URL}/api`;

export const subscribeNewsletter = (email, source = "website") =>
  axios.post(`${API_BASE}/newsletter/subscribe`, { email, source });

export const verifyAdmin = (token) =>
  axios.post(`${API_BASE}/admin/verify`, {}, { headers: { "X-Admin-Token": token } });

export const listSubscribers = (token) =>
  axios.get(`${API_BASE}/newsletter/subscribers`, { headers: { "X-Admin-Token": token } });

export const newsletterStats = (token) =>
  axios.get(`${API_BASE}/newsletter/stats`, { headers: { "X-Admin-Token": token } });

export const deleteSubscriber = (id, token) =>
  axios.delete(`${API_BASE}/newsletter/subscribers/${id}`, { headers: { "X-Admin-Token": token } });

// ---------- Products ----------
export const getProducts = () => axios.get(`${API_BASE}/products`);

export const createProduct = (data, token) =>
  axios.post(`${API_BASE}/admin/products`, data, { headers: { "X-Admin-Token": token } });

export const updateProduct = (id, data, token) =>
  axios.put(`${API_BASE}/admin/products/${id}`, data, { headers: { "X-Admin-Token": token } });

export const deleteProductApi = (id, token) =>
  axios.delete(`${API_BASE}/admin/products/${id}`, { headers: { "X-Admin-Token": token } });
