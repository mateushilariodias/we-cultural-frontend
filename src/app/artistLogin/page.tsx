"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import FormInput from "@/components/FormInput";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Erro no login");
        setLoading(false);
        return;
      }

      // Armazenar token JWT no localStorage
      localStorage.setItem("token", data.token);

      alert("Login realizado com sucesso!");
      setLoading(false);

      // Redirecionar para a página do artista (dashboard)
      router.push("/dashboard"); // Crie essa página depois

    } catch (error) {
      console.error(error);
      alert("Erro ao conectar com o servidor.");
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <section className="max-w-md w-full bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4">Login de Artista</h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <FormInput
            label="E-mail"
            type="email"
            name="email"
            placeholder="Digite seu e-mail"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <FormInput
            label="Senha"
            type="password"
            name="senha"
            placeholder="Digite sua senha"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="bg-bluePrimary text-white px-4 py-2 rounded hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>
      </section>
    </div>
  );
}
