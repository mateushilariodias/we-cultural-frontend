// utils/keepAlive.ts

export const startKeepAlive = () => {
  // Só executa no cliente (navegador)
  if (typeof window === "undefined") return;

  console.log("🔄 Keep-alive iniciado (ping a cada 14 minutos)");

  // Fazer ping a cada 14 minutos para evitar cold start
  const interval = setInterval(async () => {
    try {
      const BACKEND_URL =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

      const response = await fetch(`${BACKEND_URL}/api/health`, {
        method: "GET",
      });

      if (response.ok) {
        console.log("✅ Keep-alive ping enviado com sucesso");
      } else {
        console.warn("⚠️ Keep-alive retornou status:", response.status);
      }
    } catch (error) {
      console.log("⚠️ Keep-alive falhou (normal em inatividade):", error);
    }
  }, 14 * 60 * 1000); // 14 minutos = 840000 ms

  // Limpar interval quando sair da página
  return () => clearInterval(interval);
};