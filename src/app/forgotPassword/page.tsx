"use client";
import { useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [resetLink, setResetLink] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);
    setResetLink("");

    try {
      const res = await fetch(`${API_URL}/api/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Erro ao processar solicitação");
        return;
      }

      setSuccess(true);
      
      // APENAS PARA DESENVOLVIMENTO - Remover em produção
      if (data.resetLink) {
        setResetLink(data.resetLink);
      }
    } catch (err) {
      console.error("Erro:", err);
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
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-[#1e3a8a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-[#1e3a8a] mb-2">Recuperar Senha</h1>
            <p className="text-gray-600">
              Digite seu e-mail e enviaremos instruções para redefinir sua senha
            </p>
          </div>

          {success ? (
            <div className="space-y-4">
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
                <div className="flex items-start gap-2">
                  <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <p className="font-semibold">E-mail enviado com sucesso!</p>
                    <p className="text-sm mt-1">
                      Verifique sua caixa de entrada e siga as instruções para redefinir sua senha.
                    </p>
                  </div>
                </div>
              </div>

              {/* APENAS PARA DESENVOLVIMENTO - Remover em produção */}
              {resetLink && (
                <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded">
                  <p className="font-semibold text-sm mb-2">⚠️ MODO DESENVOLVIMENTO</p>
                  <p className="text-xs mb-2">Clique no link abaixo para redefinir sua senha:</p>
                  <a 
                    href={resetLink.replace(API_URL, '')} 
                    className="text-blue-600 hover:underline text-sm break-all"
                  >
                    Redefinir Senha
                  </a>
                </div>
              )}

              <div className="pt-4">
                <a 
                  href="/artistLogin"
                  className="block w-full text-center bg-[#1e3a8a] text-white px-4 py-3 rounded hover:bg-[#15306e] transition font-semibold"
                >
                  Voltar para Login
                </a>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                  {error}
                </div>
              )}

              <div>
                <label className="block font-medium text-gray-700 mb-2">
                  E-mail cadastrado *
                </label>
                <input
                  type="email"
                  placeholder="Digite seu e-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]"
                  disabled={loading}
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#1e3a8a] text-white px-4 py-3 rounded hover:bg-[#15306e] disabled:opacity-50 transition font-semibold"
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Enviando...
                  </span>
                ) : (
                  "Enviar Instruções"
                )}
              </button>

              <div className="text-center">
                <a href="/artistLogin" className="text-sm text-[#1e3a8a] hover:underline">
                  ← Voltar para o login
                </a>
              </div>
            </form>
          )}
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-[#1e3a8a] text-white text-center p-4">
        <p>©  <strong>Nós Cultural</strong> - Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}