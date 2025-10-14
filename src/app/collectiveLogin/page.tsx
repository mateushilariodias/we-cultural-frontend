"use client";
import { useState } from "react";
import FormInput from "@/components/FormInput";

export default function LoginColetivo() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const form = new FormData(e.target as HTMLFormElement);

    try {
      const res = await fetch("/api/coletivos/login", {
        method: "POST",
        body: form,
      });

      if (res.ok) {
        alert("Login realizado com sucesso!");
      } else {
        alert("Credenciais inválidas, tente novamente.");
      }
    } catch (error) {
      console.error(error);
      alert("Erro de conexão com o servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <section className="max-w-md w-full bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4">Login de Coletivo</h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <FormInput label="E-mail" type="email" name="email" required />
          <FormInput label="Senha" type="password" name="senha" required />
          <button
            type="submit"
            disabled={loading}
            className="bg-bluePrimary text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>
      </section>
    </div>
  );
}
