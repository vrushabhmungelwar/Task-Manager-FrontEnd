import axios from "axios";

const API_BASE =
  import.meta.env.MODE === "development"
    ? "" // lets dev proxy handle /api
    : import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_BASE,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;

// const API_BASE = import.meta.env.VITE_API_URL || '';

// export async function fetchTasks() {
//   const res = await fetch(`${API_BASE}/api/tasks`); // your backend route
//   if (!res.ok) throw new Error('Failed to load tasks');
//   return res.json();
// }
