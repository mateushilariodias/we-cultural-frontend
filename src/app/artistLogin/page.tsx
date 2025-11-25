"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { API_ENDPOINTS } from "@/config/api";
import { useAuth } from "@/contexts/AuthContext";

export default function Login() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(API_ENDPOINTS.login, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Erro no login");
        setLoading(false);
        return;
      }

      // Usa o context para fazer login
      login(data.token);

      alert("Login realizado com sucesso!");
      router.push("/dashboard");
    } catch (error) {
      console.error(error);
      alert("Erro ao conectar com o servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <section className="max-w-md w-full bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold mb-2 text-[#1e3a8a]">Login de Artista</h1>
        <p className="text-gray-600 mb-6">Entre na sua conta</p>
        
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1">
            <label className="font-medium text-gray-700">E-mail *</label>
            <input
              type="email"
              placeholder="Digite seu e-mail"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-medium text-gray-700">Senha *</label>
            <input
              type="password"
              placeholder="Digite sua senha"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]"
            />
          </div>

          <button
            type="submit"
            className="bg-[#1e3a8a] text-white px-4 py-3 rounded hover:bg-[#15306e] disabled:opacity-50 transition font-semibold"
            disabled={loading}
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>
        
        <p className="text-center mt-6 text-gray-600">
          Não tem uma conta? <a href="/artistRegistration" className="text-[#1e3a8a] hover:underline font-semibold">Cadastre-se</a>
        </p>
      </section>
    </div>
  );
}