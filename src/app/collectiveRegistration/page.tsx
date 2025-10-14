"use client";
import { useState } from "react";
import FormInput from "@/components/FormInput";

const categorias = [
  "Arquitetura",
  "Arte digital",
  "Artesanato",
  "Cinema",
  "Dança",
  "Design",
  "Escultura",
  "Fotografia",
  "História em quadrinhos",
  "Jogos eletrônicos",
  "Literatura",
  "Música",
  "Pintura",
  "Teatro",
];

export default function CadastroColetivo() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData(e.target as HTMLFormElement);

    try {
      const res = await fetch("/api/coletivos", {
        method: "POST",
        body: data,
      });

      if (res.ok) {
        alert("Coletivo cadastrado com sucesso!");
        (e.target as HTMLFormElement).reset();
      } else {
        alert("Erro no cadastro do coletivo, tente novamente.");
      }
    } catch (error) {
      console.error(error);
      alert("Erro de conexão com o servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Cadastro de Coletivo Cultural</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <FormInput label="Nome do Coletivo" type="text" name="nome" required />
        <FormInput label="Descrição do Coletivo" type="text" name="descricao" required />
        <FormInput label="Imagem de Perfil" type="file" name="fotoDePerfil" accept="image/*" required />
        <FormInput label="Telefone / WhatsApp" type="tel" name="telefone" required />
        <FormInput label="Link da Principal Rede Social" type="url" name="redeSocial" required />
        <FormInput label="Número de Membros" type="number" name="numMembros" required />
        <FormInput label="Nomes Artísticos dos Membros" type="text" name="nomesMembros" required />
        
        {/* Categorias Artísticas */}
        <div>
          <p className="font-medium mb-2">Categorias Artísticas</p>
          <div className="grid grid-cols-2 gap-2">
            {categorias.map((cat) => (
              <label key={cat} className="flex items-center gap-2">
                <input type="checkbox" name="categorias" value={cat} />
                {cat}
              </label>
            ))}
          </div>
        </div>

        <FormInput label="Senha" type="password" name="senha" required />

        <button
          type="submit"
          disabled={loading}
          className="bg-bluePrimary text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Cadastrando..." : "Cadastrar"}
        </button>
      </form>
    </div>
  );
}
