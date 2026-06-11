"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { API_URL } from "@/config/api";

export default function EquipmentLogin() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const doLogin = async () => {
    setLoading(true);
    setError("");

    if (!name.trim() || !password.trim()) {
      setError("Nome e senha são obrigatórios");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${API_URL}/api/auth/equipment/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Erro no login");
        setLoading(false);
        return;
      }

      if (typeof window !== "undefined") {
        sessionStorage.setItem("equipmentToken", data.token);
        sessionStorage.setItem(
          "equipmentData",
          JSON.stringify({
            id: data.equipment.id,
            name: data.equipment.name,
            logo: data.equipment.logo,
          })
        );
      }

      router.push(`/espaco/${data.equipment.id}`);
    } catch (err) {
      console.error("Erro no login:", err);
      setError("Erro ao conectar com o servidor");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await doLogin();
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-purple-700 text-white px-4 lg:px-40 py-3">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Nós Cultural</h1>
          <nav className="flex gap-4">
            <Link href="/" className="hover:underline">Home</Link>
            <a href="/busca" className="hover:underline">Ver Cadastros</a>
          </nav>
        </div>
      </header>

      <div className="flex-1 flex items-center justify-center bg-gray-50 py-12">
        <section className="max-w-md w-full bg-white shadow-lg rounded-lg p-8 mx-4">
          <div className="text-center mb-6">
            <div className="w-20 h-20 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-purple-700 mb-2">Login de Equipamento</h1>
            <p className="text-gray-600">Acesse o perfil do seu equipamento cultural</p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label className="font-medium text-gray-700">Nome do Equipamento *</label>
              <input
                type="text"
                placeholder="Digite o nome do equipamento"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
                disabled={loading}
              />
              <p className="text-xs text-gray-500 mt-1">Digite exatamente como foi cadastrado</p>
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-medium text-gray-700">Senha *</label>
              <input
                type="password"
                placeholder="Digite a senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              className="bg-purple-600 text-white px-4 py-3 rounded hover:bg-purple-700 disabled:opacity-50 transition font-semibold mt-2"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Entrando...
                </span>
              ) : (
                "Entrar"
              )}
            </button>
          </form>

          <hr className="my-6 border-gray-300" />

          <p className="text-center text-gray-600">
            Não tem um equipamento cadastrado?{" "}
            <a href="/cadastro-de-espaco" className="text-purple-600 hover:underline font-semibold">
              Cadastre aqui
            </a>
          </p>

          <div className="mt-4 bg-blue-50 border border-blue-200 rounded p-3">
            <p className="text-sm text-blue-700 text-center">
              <strong>ℹ️ Acesso independente:</strong> Não é necessário ser artista para cadastrar um equipamento cultural
            </p>
          </div>
        </section>
      </div>

      <footer className="bg-purple-700 text-white text-center p-4">
        <p>© 2026 <strong>Nós Cultural</strong> - Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}
