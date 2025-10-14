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

export default function Cadastro() {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = new FormData(e.target as HTMLFormElement);

    const res = await fetch("http://localhost:5000/api/artists", {
      method: "POST",
      body: data,
    });

    if (res.ok) {
      alert("Cadastro realizado com sucesso!");
    } else {
      alert("Erro no cadastro, tente novamente.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Cadastro de Artista</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit} encType="multipart/form-data">
        <FormInput
          label="Foto de Perfil"
          type="file"
          accept="image/*"
          name="profilePicture"
          required
        />

        <FormInput label="Nome Completo" type="text" name="name" required />
        <FormInput label="Data de Nascimento" type="date" name="birthDate" required />
        <FormInput label="E-mail" type="email" name="email" required />
        <FormInput label="Telefone / WhatsApp" type="tel" name="phone" required />
        <FormInput label="Link da sua Principal Rede Social" type="url" name="socialLink" />
        <FormInput label="Link do Currículo Artístico" type="url" name="resumeLink" required />
        <FormInput label="Link do Portfólio Artístico" type="url" name="portfolioLink" required />

        {/* Identidade de Gênero */}
        <div>
          <p className="font-medium mb-2">Identidade de Gênero</p>
          <select name="gender" className="border p-2 rounded w-full" required>
            <option value="">Selecione...</option>
            <option value="Masculino Cis">Masculino (Cis)</option>
            <option value="Feminino Cis">Feminino (Cis)</option>
            <option value="Homem Trans">Homem Trans</option>
            <option value="Mulher Trans">Mulher Trans</option>
            <option value="Não-binário">Não-binário</option>
          </select>
        </div>

        {/* Perguntas de Sim/Não */}
        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-2">
            <input type="checkbox" name="lgbtqiapn" /> Pessoa LGBTQIAPN+
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" name="black" /> Pessoa negra (pretas e pardas)
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" name="indigenous" /> Pessoa indígena
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" name="pcd" /> Pessoa com deficiência
          </label>
        </div>

        {/* Categorias Artísticas */}
        <div>
          <p className="font-medium mb-2">Categorias Artísticas</p>
          <div className="grid grid-cols-2 gap-2">
            {categorias.map((cat) => (
              <label key={cat} className="flex items-center gap-2">
                <input type="checkbox" name="categories" value={cat} />
                {cat}
              </label>
            ))}
          </div>
        </div>

        <FormInput label="Senha" type="password" name="password" required />

        <button
          type="submit"
          className="bg-bluePrimary text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Cadastrar
        </button>
      </form>
    </div>
  );
}
