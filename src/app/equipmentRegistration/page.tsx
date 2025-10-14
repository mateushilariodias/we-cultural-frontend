"use client";
import { useState } from "react";
import FormInput from "@/components/FormInput";

const categoriasEquipamentos = [
  "Teatro",
  "Biblioteca",
  "Museu",
  "Centro Cultural",
  "Cinema",
  "Ponto de Cultura",
  "Galeria de Arte",
  "Auditório",
  "Outro",
];

export default function CadastroEquipamento() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData(e.target as HTMLFormElement);

    try {
      const res = await fetch("/api/equipamentos", {
        method: "POST",
        body: data,
      });

      if (res.ok) {
        alert("Equipamento cultural cadastrado com sucesso!");
        (e.target as HTMLFormElement).reset();
      } else {
        alert("Erro no cadastro do equipamento, tente novamente.");
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
      <h1 className="text-2xl font-bold mb-4">Cadastro de Equipamento Cultural</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <FormInput label="Logo ou Foto do Espaço Cultural" type="file" name="logo" accept="image/*" required />
        <FormInput label="Nome do Equipamento Cultural" type="text" name="nome" required />
        <FormInput label="CNPJ (ou CPF do responsável)" type="text" name="cnpj" required />
        <FormInput label="Ano de Fundação / Início das Atividades" type="number" name="anoFundacao" />
        <FormInput label="Responsável Legal" type="text" name="responsavel" required />
        <FormInput label="Telefone de Contato" type="tel" name="telefone" required />
        <FormInput label="E-mail de Contato" type="email" name="email" required />
        <FormInput label="Site ou Rede Social Principal" type="url" name="site" />

        {/* Endereço */}
        <div>
          <p className="font-medium mb-2">Endereço Completo</p>
          <FormInput label="Rua / Avenida" type="text" name="rua" required />
          <FormInput label="Bairro" type="text" name="bairro" required />
          <FormInput label="Cidade" type="text" name="cidade" required />
          <FormInput label="Estado" type="text" name="estado" required />
          <FormInput label="CEP" type="text" name="cep" required />
        </div>

        {/* Categoria do Equipamento */}
        <div>
          <p className="font-medium mb-2">Categoria do Equipamento</p>
          <div className="grid grid-cols-2 gap-2">
            {categoriasEquipamentos.map((cat) => (
              <label key={cat} className="flex items-center gap-2">
                <input type="checkbox" name="categoria" value={cat} />
                {cat}
              </label>
            ))}
          </div>
        </div>

        {/* Descrição */}
        <div>
          <p className="font-medium mb-2">Descrição / Histórico</p>
          <textarea
            name="descricao"
            placeholder="Conte um pouco sobre o espaço cultural"
            className="border p-2 rounded w-full"
            rows={4}
          />
        </div>

        <FormInput label="Senha de Acesso" type="password" name="senha" required />

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
