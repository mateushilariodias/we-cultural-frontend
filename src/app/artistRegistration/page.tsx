"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import FormInput from "@/components/FormInput";
import { API_ENDPOINTS } from "@/config/api";

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
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target as HTMLFormElement;
    const data = new FormData(form);

    // Transformando checkboxes booleanos
    const parseBoolean = (value: FormDataEntryValue | null) => value === "on";

    // Criando um objeto para enviar
    const payload = {
      name: data.get("name"),
      birthDate: data.get("birthDate"),
      email: data.get("email"),
      phone: data.get("phone"),
      socialLink: data.get("socialLink"),
      resumeLink: data.get("resumeLink"),
      portfolioLink: data.get("portfolioLink"),
      gender: data.get("gender"),
      password: data.get("password"),
      lgbtqiapn: parseBoolean(data.get("lgbtqiapn")),
      black: parseBoolean(data.get("black")),
      indigenous: parseBoolean(data.get("indigenous")),
      pcd: parseBoolean(data.get("pcd")),
      categories: data.getAll("categories"),
    };

    // Para enviar o arquivo junto
    const submitData = new FormData();
    Object.entries(payload).forEach(([key, value]) => {
      if (key === "profilePicture") return;
      if (Array.isArray(value)) {
        value.forEach((v) => submitData.append(key, v.toString()));
      } else if (value !== null) {
        submitData.append(key, value.toString());
      }
    });

    // Adicionando arquivo
    const fileInput = form.querySelector<HTMLInputElement>('input[name="profilePicture"]');
    if (fileInput?.files?.[0]) {
      submitData.append("profilePicture", fileInput.files[0]);
    }

    try {
      const res = await fetch(API_ENDPOINTS.artists, {
        method: "POST",
        body: submitData,
      });

      if (res.ok) {
        alert("Cadastro realizado com sucesso! Faça login para continuar.");
        router.push("/artistLogin");
      } else {
        const error = await res.json();
        alert(error.message || "Erro no cadastro, tente novamente.");
      }
    } catch (error) {
      console.error(error);
      alert("Erro ao conectar com o servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1e3a8a] to-[#0f172a] py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Cadastro de Artista</h1>
          <p className="text-gray-300">Faça parte da nossa comunidade cultural</p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-4">
            <div className={`flex items-center justify-center w-10 h-10 rounded-full ${currentStep >= 1 ? 'bg-[#F59E0B]' : 'bg-gray-600'} text-white font-bold`}>
              1
            </div>
            <div className={`w-16 h-1 ${currentStep >= 2 ? 'bg-[#F59E0B]' : 'bg-gray-600'}`}></div>
            <div className={`flex items-center justify-center w-10 h-10 rounded-full ${currentStep >= 2 ? 'bg-[#F59E0B]' : 'bg-gray-600'} text-white font-bold`}>
              2
            </div>
            <div className={`w-16 h-1 ${currentStep >= 3 ? 'bg-[#F59E0B]' : 'bg-gray-600'}`}></div>
            <div className={`flex items-center justify-center w-10 h-10 rounded-full ${currentStep >= 3 ? 'bg-[#F59E0B]' : 'bg-gray-600'} text-white font-bold`}>
              3
            </div>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <form className="flex flex-col gap-6" onSubmit={handleSubmit} encType="multipart/form-data">
            {/* Etapa 1: Informações Básicas */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-[#1e3a8a] mb-4">Informações Básicas</h2>
                
                <div className="flex flex-col items-center gap-4 p-6 bg-gray-50 rounded-lg">
                  <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                    <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <FormInput
                    label="Foto de Perfil"
                    type="file"
                    accept="image/*"
                    name="profilePicture"
                    required
                  />
                </div>

                <FormInput label="Nome Completo" type="text" name="name" required />
                <FormInput label="Data de Nascimento" type="date" name="birthDate" required />
                <FormInput label="E-mail" type="email" name="email" required />
                <FormInput label="Telefone / WhatsApp" type="tel" name="phone" required />
                <FormInput label="Senha" type="password" name="password" required />

                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="w-full bg-[#1e3a8a] text-white px-6 py-3 rounded-lg hover:bg-[#15306e] transition font-semibold"
                >
                  Próximo →
                </button>
              </div>
            )}

            {/* Etapa 2: Identidade e Marcadores */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-[#1e3a8a] mb-4">Identidade e Marcadores Sociais</h2>

                <div>
                  <label className="block font-semibold text-gray-700 mb-2">Identidade de Gênero *</label>
                  <select name="gender" className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]" required>
                    <option value="">Selecione...</option>
                    <option value="Masculino Cis">Masculino (Cis)</option>
                    <option value="Feminino Cis">Feminino (Cis)</option>
                    <option value="Homem Trans">Homem Trans</option>
                    <option value="Mulher Trans">Mulher Trans</option>
                    <option value="Não-binário">Não-binário</option>
                  </select>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <p className="font-semibold text-gray-700 mb-4">Marcadores Sociais (opcional)</p>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 cursor-pointer hover:bg-white p-3 rounded transition">
                      <input type="checkbox" name="lgbtqiapn" className="w-5 h-5 text-[#1e3a8a] rounded focus:ring-[#1e3a8a]" />
                      <span className="text-gray-700">Pessoa LGBTQIAPN+</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer hover:bg-white p-3 rounded transition">
                      <input type="checkbox" name="black" className="w-5 h-5 text-[#1e3a8a] rounded focus:ring-[#1e3a8a]" />
                      <span className="text-gray-700">Pessoa negra (pretas e pardas)</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer hover:bg-white p-3 rounded transition">
                      <input type="checkbox" name="indigenous" className="w-5 h-5 text-[#1e3a8a] rounded focus:ring-[#1e3a8a]" />
                      <span className="text-gray-700">Pessoa indígena</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer hover:bg-white p-3 rounded transition">
                      <input type="checkbox" name="pcd" className="w-5 h-5 text-[#1e3a8a] rounded focus:ring-[#1e3a8a]" />
                      <span className="text-gray-700">Pessoa com deficiência</span>
                    </label>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="flex-1 bg-gray-300 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-400 transition font-semibold"
                  >
                    ← Voltar
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(3)}
                    className="flex-1 bg-[#1e3a8a] text-white px-6 py-3 rounded-lg hover:bg-[#15306e] transition font-semibold"
                  >
                    Próximo →
                  </button>
                </div>
              </div>
            )}

            {/* Etapa 3: Categorias e Links */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-[#1e3a8a] mb-4">Categorias e Portfólio</h2>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <p className="font-semibold text-gray-700 mb-4">Categorias Artísticas *</p>
                  <div className="grid grid-cols-2 gap-3">
                    {categorias.map((cat) => (
                      <label key={cat} className="flex items-center gap-3 cursor-pointer hover:bg-white p-3 rounded transition">
                        <input type="checkbox" name="categories" value={cat} className="w-5 h-5 text-[#1e3a8a] rounded focus:ring-[#1e3a8a]" />
                        <span className="text-gray-700">{cat}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <FormInput label="Link do Portfólio Artístico" type="url" name="portfolioLink" required />
                <FormInput label="Link do Currículo Artístico" type="url" name="resumeLink" required />
                <FormInput label="Link da sua Principal Rede Social" type="url" name="socialLink" />

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="flex-1 bg-gray-300 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-400 transition font-semibold"
                  >
                    ← Voltar
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-[#F59E0B] text-white px-6 py-3 rounded-lg hover:bg-[#D97706] transition font-semibold disabled:opacity-50"
                  >
                    {loading ? "Cadastrando..." : "Cadastrar ✓"}
                  </button>
                </div>
              </div>
            )}
          </form>

          <p className="text-center mt-6 text-gray-600">
            Já tem uma conta? <a href="/artistLogin" className="text-[#1e3a8a] hover:underline font-semibold">Faça login</a>
          </p>
        </div>
      </div>
    </div>
  );
}