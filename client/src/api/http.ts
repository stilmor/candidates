import axios from "axios";

const raw = (import.meta.env.VITE_API_BASE_URL as string | undefined)?.trim() ?? "";
const baseURL = raw.replace(/\/+$/, "") || "http://localhost:3000";

if (import.meta.env.DEV) {
  console.log("[API] baseURL =", baseURL);
}

export const http = axios.create({
  baseURL,
  timeout: 15000,
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

http.interceptors.response.use(
  (r) => r,
  (err) => {
    console.error("[API] Error:", {
      url: (err.config?.baseURL ?? "") + (err.config?.url ?? ""),
      message: err.message,
      code: err.code,
      status: err.response?.status,
      data: err.response?.data,
    });
    return Promise.reject(err);
  }
);