"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

// Simula as configurações da API
const API_ENDPOINTS = {
  login: "/api/auth/login"
};

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(API_ENDPOINTS.login, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Erro no login. Verifique suas credenciais.");
        setLoading(false);
        return;
      }

      // Salvar token e dados do artista
      localStorage.setItem("authToken", data.token);
      localStorage.setItem("artistData", JSON.stringify(data.artist));

      // Redirecionar para o dashboard com o ID do artista na URL
      router.push(`/dashboard/${data.artist.id}`);

    } catch (err) {
      console.error("Erro no login:", err);
      setError("Erro ao conectar com o servidor. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-[#1e3a8a] text-white px-4 lg:px-40 py-3">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Nós Cultural</h1>
          <nav className="flex gap-4">
            <a href="/" className="hover:underline">Home</a>
            <a href="/search" className="hover:underline">Ver Artistas</a>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center bg-gray-50 py-12">
        <section className="max-w-md w-full bg-white shadow-lg rounded-lg p-8 mx-4">
          <h1 className="text-3xl font-bold mb-2 text-[#1e3a8a]">Login de Artista</h1>
          <p className="text-gray-600 mb-6">Entre na sua conta</p>
          
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}
          
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label className="font-medium text-gray-700">E-mail *</label>
              <input
                type="email"
                placeholder="Digite seu e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]"
                disabled={loading}
              />
            </div>
            
            <div className="flex flex-col gap-1">
              <label className="font-medium text-gray-700">Senha *</label>
              <input
                type="password"
                placeholder="Digite sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]"
                disabled={loading}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleSubmit(e);
                  }
                }}
              />
            </div>
            
            <button
              onClick={handleSubmit}
              className="bg-[#1e3a8a] text-white px-4 py-3 rounded hover:bg-[#15306e] disabled:opacity-50 transition font-semibold mt-2"
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
          </div>
          
          <div className="mt-4">
            <a href="/forgotPassword" className="text-sm text-[#1e3a8a] hover:underline">
              Esqueceu sua senha?
            </a>
          </div>
          
          <hr className="my-6 border-gray-300" />
          
          <p className="text-center text-gray-600">
            Não tem uma conta?{" "}
            <a href="/artistRegistration" className="text-[#1e3a8a] hover:underline font-semibold">
              Cadastre-se aqui
            </a>
          </p>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-[#1e3a8a] text-white text-center p-4">
        <p>© 2025 <strong>Nós Cultural</strong> - Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}