"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

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

interface FormData {
  name: string;
  birthDate: string;
  email: string;
  phone: string;
  password: string;
  gender: string;
  lgbtqiapn: boolean;
  black: boolean;
  indigenous: boolean;
  pcd: boolean;
  portfolioLink: string;
  resumeLink: string;
  socialLink: string;
  categories: string[];
  profilePicture: File | null;
}

export default function Cadastro() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [imagePreview, setImagePreview] = useState<string>("");

  // Estado para armazenar os dados do formulário
  const [formData, setFormData] = useState<FormData>({
    name: "",
    birthDate: "",
    email: "",
    phone: "",
    password: "",
    gender: "",
    lgbtqiapn: false,
    black: false,
    indigenous: false,
    pcd: false,
    portfolioLink: "",
    resumeLink: "",
    socialLink: "",
    categories: [],
    profilePicture: null,
  });

  // Atualizar campo individual
  const updateField = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Handle da imagem com preview
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      updateField('profilePicture', file);
      
      // Criar preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle checkboxes de categorias
  const handleCategoryChange = (category: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      categories: checked 
        ? [...prev.categories, category]
        : prev.categories.filter(c => c !== category)
    }));
  };

  // Validação antes de avançar
  const validateStep = (step: number): boolean => {
    if (step === 1) {
      if (!formData.name || !formData.birthDate || !formData.email || 
          !formData.phone || !formData.password || !formData.profilePicture) {
        alert("Por favor, preencha todos os campos obrigatórios da Etapa 1");
        return false;
      }
    }
    if (step === 2) {
      if (!formData.gender) {
        alert("Por favor, selecione sua identidade de gênero");
        return false;
      }
    }
    if (step === 3) {
      if (formData.categories.length === 0) {
        alert("Por favor, selecione pelo menos uma categoria artística");
        return false;
      }
      if (!formData.portfolioLink || !formData.resumeLink) {
        alert("Por favor, preencha os links do portfólio e currículo");
        return false;
      }
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateStep(3)) return;
    
    setLoading(true);

    const submitData = new FormData();
    
    // Adicionar dados simples
    submitData.append("name", formData.name);
    submitData.append("birthDate", formData.birthDate);
    submitData.append("email", formData.email);
    submitData.append("phone", formData.phone);
    submitData.append("password", formData.password);
    submitData.append("gender", formData.gender);
    submitData.append("lgbtqiapn", String(formData.lgbtqiapn));
    submitData.append("black", String(formData.black));
    submitData.append("indigenous", String(formData.indigenous));
    submitData.append("pcd", String(formData.pcd));
    submitData.append("portfolioLink", formData.portfolioLink);
    submitData.append("resumeLink", formData.resumeLink);
    submitData.append("socialLink", formData.socialLink);
    
    // Adicionar categorias
    formData.categories.forEach(cat => {
      submitData.append("categories", cat);
    });
    
    // Adicionar arquivo
    if (formData.profilePicture) {
      submitData.append("profilePicture", formData.profilePicture);
    }

    try {
      const res = await fetch("/api/artists", {
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
            <div className={`flex items-center justify-center w-10 h-10 rounded-full ${currentStep >= 1 ? 'bg-[#F59E0B]' : 'bg-gray-600'} text-white font-bold transition-all`}>
              1
            </div>
            <div className={`w-16 h-1 ${currentStep >= 2 ? 'bg-[#F59E0B]' : 'bg-gray-600'} transition-all`}></div>
            <div className={`flex items-center justify-center w-10 h-10 rounded-full ${currentStep >= 2 ? 'bg-[#F59E0B]' : 'bg-gray-600'} text-white font-bold transition-all`}>
              2
            </div>
            <div className={`w-16 h-1 ${currentStep >= 3 ? 'bg-[#F59E0B]' : 'bg-gray-600'} transition-all`}></div>
            <div className={`flex items-center justify-center w-10 h-10 rounded-full ${currentStep >= 3 ? 'bg-[#F59E0B]' : 'bg-gray-600'} text-white font-bold transition-all`}>
              3
            </div>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {/* Etapa 1: Informações Básicas */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-[#1e3a8a] mb-4">Informações Básicas</h2>
              
              <div className="flex flex-col items-center gap-4 p-6 bg-gray-50 rounded-lg">
                <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border-4 border-white shadow-lg">
                  {imagePreview ? (
                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  )}
                </div>
                <label className="cursor-pointer">
                  <span className="bg-[#1e3a8a] text-white px-4 py-2 rounded-lg hover:bg-[#15306e] transition inline-block">
                    {imagePreview ? "Trocar Foto" : "Escolher Foto"}
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
                {imagePreview && (
                  <p className="text-sm text-green-600 font-medium">✓ Foto carregada</p>
                )}
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-2">Nome Completo *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => updateField('name', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-2">Data de Nascimento *</label>
                <input
                  type="date"
                  value={formData.birthDate}
                  onChange={(e) => updateField('birthDate', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-2">E-mail *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateField('email', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-2">Telefone / WhatsApp *</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => updateField('phone', e.target.value)}
                  placeholder="(00) 00000-0000"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-2">Senha *</label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => updateField('password', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]"
                  required
                />
              </div>

              <button
                type="button"
                onClick={handleNext}
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
                <select 
                  value={formData.gender}
                  onChange={(e) => updateField('gender', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]" 
                  required
                >
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
                    <input 
                      type="checkbox" 
                      checked={formData.lgbtqiapn}
                      onChange={(e) => updateField('lgbtqiapn', e.target.checked)}
                      className="w-5 h-5 text-[#1e3a8a] rounded focus:ring-[#1e3a8a]" 
                    />
                    <span className="text-gray-700">Pessoa LGBTQIAPN+</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer hover:bg-white p-3 rounded transition">
                    <input 
                      type="checkbox" 
                      checked={formData.black}
                      onChange={(e) => updateField('black', e.target.checked)}
                      className="w-5 h-5 text-[#1e3a8a] rounded focus:ring-[#1e3a8a]" 
                    />
                    <span className="text-gray-700">Pessoa negra (pretas e pardas)</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer hover:bg-white p-3 rounded transition">
                    <input 
                      type="checkbox" 
                      checked={formData.indigenous}
                      onChange={(e) => updateField('indigenous', e.target.checked)}
                      className="w-5 h-5 text-[#1e3a8a] rounded focus:ring-[#1e3a8a]" 
                    />
                    <span className="text-gray-700">Pessoa indígena</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer hover:bg-white p-3 rounded transition">
                    <input 
                      type="checkbox" 
                      checked={formData.pcd}
                      onChange={(e) => updateField('pcd', e.target.checked)}
                      className="w-5 h-5 text-[#1e3a8a] rounded focus:ring-[#1e3a8a]" 
                    />
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
                  onClick={handleNext}
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
                <p className="font-semibold text-gray-700 mb-4">
                  Categorias Artísticas * 
                  {formData.categories.length > 0 && (
                    <span className="text-[#F59E0B] ml-2">({formData.categories.length} selecionadas)</span>
                  )}
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {categorias.map((cat) => (
                    <label key={cat} className="flex items-center gap-3 cursor-pointer hover:bg-white p-3 rounded transition">
                      <input 
                        type="checkbox" 
                        checked={formData.categories.includes(cat)}
                        onChange={(e) => handleCategoryChange(cat, e.target.checked)}
                        className="w-5 h-5 text-[#1e3a8a] rounded focus:ring-[#1e3a8a]" 
                      />
                      <span className="text-gray-700">{cat}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-2">Link do Portfólio Artístico *</label>
                <input
                  type="url"
                  value={formData.portfolioLink}
                  onChange={(e) => updateField('portfolioLink', e.target.value)}
                  placeholder="https://seu-portfolio.com"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-2">Link do Currículo Artístico *</label>
                <input
                  type="url"
                  value={formData.resumeLink}
                  onChange={(e) => updateField('resumeLink', e.target.value)}
                  placeholder="https://seu-curriculo.com"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-2">Link da sua Principal Rede Social</label>
                <input
                  type="url"
                  value={formData.socialLink}
                  onChange={(e) => updateField('socialLink', e.target.value)}
                  placeholder="https://instagram.com/seu-perfil"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]"
                />
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="flex-1 bg-gray-300 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-400 transition font-semibold"
                >
                  ← Voltar
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={loading}
                  className="flex-1 bg-[#F59E0B] text-white px-6 py-3 rounded-lg hover:bg-[#D97706] transition font-semibold disabled:opacity-50"
                >
                  {loading ? "Cadastrando..." : "Cadastrar ✓"}
                </button>
              </div>
            </div>
          )}

          <p className="text-center mt-6 text-gray-600">
            Já tem uma conta? <a href="/artistLogin" className="text-[#1e3a8a] hover:underline font-semibold">Faça login</a>
          </p>
        </div>
      </div>
    </div>
  );
}