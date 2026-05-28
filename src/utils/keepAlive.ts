import { API_URL } from "@/config/api";

export const startKeepAlive = () => {
  if (typeof window === "undefined") return;

  const interval = setInterval(async () => {
    try {
      await fetch(`${API_URL}/api/health`, { method: "GET" });
    } catch (error) {
      console.warn("[keepAlive] Backend health check failed:", error);
    }
  }, 14 * 60 * 1000);

  return () => clearInterval(interval);
};
