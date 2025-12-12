"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const categorias = [
  "Teatro", "Museu", "Biblioteca", "Centro Cultural", 
  "Galeria de Arte", "Casa de Cultura", "Cinemateca",
  "Arquivo Histórico", "Memorial", "Espaço de Eventos",
  "Sala de Espetáculos", "Auditório", "Outro"
];

interface FormData {
  name: string;
  cnpj: string;
  foundationYear: string;
  responsible: string;
  phone: string;
  email: string;
  website: string;
  rua: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
  category: string[];
  description: string;
  password: string;
  confirmPassword: string;
  logo: File | null;
}

export default function EquipmentRegistration() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [imagePreview, setImagePreview] = useState<string>("");

  const [formData, setFormData] = useState<FormData>({
    name: "",
    cnpj: "",
    foundationYear: "",
    responsible: "",
    phone: "",
    email: "",
    website: "",
    rua: "",
    bairro: "",
    cidade: "Franca",
    estado: "SP",
    cep: "",
    category: [],
    description: "",
    password: "",
    confirmPassword: "",
    logo: null,
  });

  const updateField = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      updateField('logo', file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleCategoryToggle = (category: string) => {
    setFormData(prev => ({
      ...prev,
      category: prev.category.includes(category)
        ? prev.category.filter(c => c !== category)
        : [...prev.category, category]
    }));
  };

  const validateStep = (step: number): boolean => {
    if (step === 1) {
      if (!formData.name || !formData.cnpj || !formData.responsible || 
          !formData.phone || !formData.email) {
        alert("Por favor, preencha todos os campos obrigatórios da Etapa 1");
        return false;
      }
    }
    if (step === 2) {
      if (!formData.rua || !formData.bairro || !formData.cidade || 
          !formData.estado || !formData.cep) {
        alert("Por favor, preencha todos os campos de endereço");
        return false;
      }
    }
    if (step === 3) {
      if (formData.category.length === 0) {
        alert("Selecione pelo menos uma categoria");
        return false;
      }
      if (!formData.password || !formData.confirmPassword) {
        alert("Por favor, defina uma senha");
        return false;
      }
      if (formData.password !== formData.confirmPassword) {
        alert("As senhas não coincidem");
        return false;
      }
      if (formData.password.length < 6) {
        alert("A senha deve ter pelo menos 6 caracteres");
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

  const handleSubmit = async () => {
    if (!validateStep(3)) return;
    
    setLoading(true);

    try {
      const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
      
      const submitData = new FormData();
      submitData.append("name", formData.name);
      submitData.append("cnpj", formData.cnpj);
      submitData.append("foundationYear", formData.foundationYear);
      submitData.append("responsible", formData.responsible);
      submitData.append("phone", formData.phone);
      submitData.append("email", formData.email);
      submitData.append("website", formData.website);
      submitData.append("rua", formData.rua);
      submitData.append("bairro", formData.bairro);
      submitData.append("cidade", formData.cidade);
      submitData.append("estado", formData.estado);
      submitData.append("cep", formData.cep);
      submitData.append("description", formData.description);
      submitData.append("password", formData.password);
      
      formData.category.forEach(cat => {
        submitData.append("category", cat);
      });
      
      if (formData.logo) {
        submitData.append("logo", formData.logo);
      }

      const res = await fetch(`${BACKEND_URL}/api/equipments`, {
        method: "POST",
        body: submitData,
      });

      const data = await res.json();

      if (res.ok) {
        alert("✅ Equipamento cultural cadastrado com sucesso!");
        router.push("/equipmentLogin");
      } else {
        alert(data.message || "Erro ao cadastrar equipamento");
      }
    } catch (error) {
      console.error(error);
      alert("Erro ao conectar com o servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-700 to-purple-900 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Cadastro de Equipamento Cultural</h1>
          <p className="text-gray-200">Registre seu espaço cultural na plataforma</p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-4">
            {[1, 2, 3].map((step, idx) => (
              <div key={step} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full ${currentStep >= step ? 'bg-yellow-500' : 'bg-purple-600'} text-white font-bold transition-all`}>
                  {step}
                </div>
                {idx < 2 && <div className={`w-16 h-1 ${currentStep > step ? 'bg-yellow-500' : 'bg-purple-600'} transition-all`}></div>}
              </div>
            ))}
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {/* Etapa 1: Informações Básicas */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-purple-700 mb-4">Informações Básicas</h2>
              
              {/* Logo */}
              <div className="flex flex-col items-center gap-4 p-6 bg-gray-50 rounded-lg">
                <div className="w-32 h-32 rounded-lg bg-gray-200 flex items-center justify-center overflow-hidden border-4 border-white shadow-lg">
                  {imagePreview ? (
                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  )}
                </div>
                <label className="cursor-pointer">
                  <span className="bg-purple-700 text-white px-4 py-2 rounded-lg hover:bg-purple-800 transition inline-block">
                    {imagePreview ? "Trocar Logo" : "Escolher Logo"}
                  </span>
                  <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                </label>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-2">Nome do Equipamento *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => updateField('name', e.target.value)}
                  placeholder="Ex: Teatro Municipal de Franca"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-gray-700 mb-2">CNPJ *</label>
                  <input
                    type="text"
                    value={formData.cnpj}
                    onChange={(e) => updateField('cnpj', e.target.value)}
                    placeholder="00.000.000/0000-00"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-600"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-2">Ano de Fundação</label>
                  <input
                    type="number"
                    value={formData.foundationYear}
                    onChange={(e) => updateField('foundationYear', e.target.value)}
                    placeholder="2000"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-600"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-2">Responsável *</label>
                <input
                  type="text"
                  value={formData.responsible}
                  onChange={(e) => updateField('responsible', e.target.value)}
                  placeholder="Nome do gestor/responsável"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-gray-700 mb-2">Telefone *</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => updateField('phone', e.target.value)}
                    placeholder="(00) 0000-0000"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-600"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-2">E-mail *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateField('email', e.target.value)}
                    placeholder="contato@equipamento.com"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-600"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-2">Website</label>
                <input
                  type="url"
                  value={formData.website}
                  onChange={(e) => updateField('website', e.target.value)}
                  placeholder="https://seu-site.com.br"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>

              <button
                onClick={handleNext}
                className="w-full bg-purple-700 text-white px-6 py-3 rounded-lg hover:bg-purple-800 transition font-semibold"
              >
                Próximo →
              </button>
            </div>
          )}

          {/* Etapa 2: Endereço */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-purple-700 mb-4">Endereço</h2>

              <div>
                <label className="block font-semibold text-gray-700 mb-2">Rua *</label>
                <input
                  type="text"
                  value={formData.rua}
                  onChange={(e) => updateField('rua', e.target.value)}
                  placeholder="Nome da rua e número"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-2">Bairro *</label>
                <input
                  type="text"
                  value={formData.bairro}
                  onChange={(e) => updateField('bairro', e.target.value)}
                  placeholder="Nome do bairro"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block font-semibold text-gray-700 mb-2">Cidade *</label>
                  <input
                    type="text"
                    value={formData.cidade}
                    onChange={(e) => updateField('cidade', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-600"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-2">Estado *</label>
                  <input
                    type="text"
                    value={formData.estado}
                    onChange={(e) => updateField('estado', e.target.value)}
                    maxLength={2}
                    placeholder="SP"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-600"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-2">CEP *</label>
                  <input
                    type="text"
                    value={formData.cep}
                    onChange={(e) => updateField('cep', e.target.value)}
                    placeholder="00000-000"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-600"
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setCurrentStep(1)}
                  className="flex-1 bg-gray-300 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-400 transition font-semibold"
                >
                  ← Voltar
                </button>
                <button
                  onClick={handleNext}
                  className="flex-1 bg-purple-700 text-white px-6 py-3 rounded-lg hover:bg-purple-800 transition font-semibold"
                >
                  Próximo →
                </button>
              </div>
            </div>
          )}

          {/* Etapa 3: Categorias e Senha */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-purple-700 mb-4">Categorias e Acesso</h2>

              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="font-semibold text-gray-700 mb-4">
                  Categorias *
                  {formData.category.length > 0 && (
                    <span className="text-purple-600 ml-2">({formData.category.length} selecionadas)</span>
                  )}
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {categorias.map((cat) => (
                    <label key={cat} className="flex items-center gap-3 cursor-pointer hover:bg-white p-3 rounded transition">
                      <input 
                        type="checkbox" 
                        checked={formData.category.includes(cat)}
                        onChange={() => handleCategoryToggle(cat)}
                        className="w-5 h-5 text-purple-600 rounded"
                      />
                      <span className="text-gray-700">{cat}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-2">Descrição</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => updateField('description', e.target.value)}
                  placeholder="Conte sobre o equipamento, sua história e atividades..."
                  rows={4}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-gray-700 mb-2">Senha de Acesso *</label>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => updateField('password', e.target.value)}
                    placeholder="Mínimo 6 caracteres"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-600"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-2">Confirmar Senha *</label>
                  <input
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => updateField('confirmPassword', e.target.value)}
                    placeholder="Digite novamente"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-600"
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setCurrentStep(2)}
                  className="flex-1 bg-gray-300 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-400 transition font-semibold"
                >
                  ← Voltar
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="flex-1 bg-yellow-500 text-white px-6 py-3 rounded-lg hover:bg-yellow-600 transition font-semibold disabled:opacity-50"
                >
                  {loading ? "Cadastrando..." : "Cadastrar Equipamento"}
                </button>
              </div>
            </div>
          )}

          <p className="text-center mt-6 text-gray-600">
            Já tem um equipamento cadastrado? <a href="/equipmentLogin" className="text-purple-600 hover:underline font-semibold">Faça login</a>
          </p>
        </div>
      </div>
    </div>
  );
}