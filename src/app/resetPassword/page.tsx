"use client";
import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const tokenFromUrl = searchParams.get('token');
    if (tokenFromUrl) {
      setToken(tokenFromUrl);
    } else {
      setError("Token de redefinição não encontrado na URL");
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Validações
    if (newPassword.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres");
      setLoading(false);
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("As senhas não coincidem");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${API_URL}/api/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Erro ao redefinir senha");
        return;
      }

      setSuccess(true);
      
      // Redirecionar para login após 3 segundos
      setTimeout(() => {
        router.push("/artistLogin");
      }, 3000);
    } catch (err) {
      console.error("Erro:", err);
      setError("Erro ao conectar com o servidor. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  if (!token && !error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1e3a8a]"></div>
      </div>
    );
  }

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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-[#1e3a8a] mb-2">Redefinir Senha</h1>
            <p className="text-gray-600">
              Digite sua nova senha
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
                    <p className="font-semibold">Senha redefinida com sucesso!</p>
                    <p className="text-sm mt-1">
                      Redirecionando para o login...
                    </p>
                  </div>
                </div>
              </div>

              <a 
                href="/artistLogin"
                className="block w-full text-center bg-[#1e3a8a] text-white px-4 py-3 rounded hover:bg-[#15306e] transition font-semibold"
              >
                Ir para Login
              </a>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                  <div className="flex items-start gap-2">
                    <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{error}</span>
                  </div>
                </div>
              )}

              <div>
                <label className="block font-medium text-gray-700 mb-2">
                  Nova Senha *
                </label>
                <input
                  type="password"
                  placeholder="Digite sua nova senha"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]"
                  disabled={loading}
                  required
                  minLength={6}
                />
                <p className="text-xs text-gray-500 mt-1">Mínimo de 6 caracteres</p>
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-2">
                  Confirmar Nova Senha *
                </label>
                <input
                  type="password"
                  placeholder="Digite novamente"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]"
                  disabled={loading}
                  required
                  minLength={6}
                />
              </div>

              {newPassword && confirmPassword && newPassword !== confirmPassword && (
                <div className="text-red-600 text-sm">
                  ⚠️ As senhas não coincidem
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-[#1e3a8a] text-white px-4 py-3 rounded hover:bg-[#15306e] disabled:opacity-50 transition font-semibold"
                disabled={loading || !token}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Redefinindo...
                  </span>
                ) : (
                  "Redefinir Senha"
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
        <p>© 2026 <strong>Nós Cultural</strong> - Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1e3a8a]"></div>
      </div>
    }>
      <ResetPasswordForm />
    </Suspense>
  );
}