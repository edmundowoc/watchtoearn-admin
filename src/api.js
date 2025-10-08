import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || "http://127.0.0.1:5000",
  headers: { "Content-Type": "application/json" }
});

export function setAuthToken(token) {
  if (token) api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  else delete api.defaults.headers.common["Authorization"];
}

export const adminLogin = (email, password) =>
  api.post("/api/admin/login", { email, password });

export const fetchWithdrawals = () =>
  api.get("/api/withdrawals/debug/list");

export const updateWithdrawal = (id, status) =>
  api.put(`/api/withdrawals/${id}`, { status });
