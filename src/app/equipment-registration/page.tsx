"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { API_URL } from "@/config/api";

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

interface FormErrors {
  [key: string]: string;
}

export default function EquipmentRegistration() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [errors, setErrors] = useState<FormErrors>({});

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

  // ===== VALIDAÇÕES E MÁSCARAS =====

  // Máscara e validação CNPJ
  const formatCNPJ = (value: string): string => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 14) {
      return numbers
        .replace(/^(\d{2})(\d)/, '$1.$2')
        .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
        .replace(/\.(\d{3})(\d)/, '.$1/$2')
        .replace(/(\d{4})(\d)/, '$1-$2');
    }
    return value;
  };

  const isValidCNPJ = (cnpj: string): boolean => {
    const numbers = cnpj.replace(/\D/g, '');
    return numbers.length === 14;
  };

  // Validação email
  const isValidEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  // Máscara e validação telefone
  const formatPhone = (value: string): string => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 11) {
      return numbers
        .replace(/^(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{4,5})(\d{4})$/, '$1-$2');
    }
    return value;
  };

  const isValidPhone = (phone: string): boolean => {
    const numbers = phone.replace(/\D/g, '');
    return numbers.length === 10 || numbers.length === 11;
  };

  // Máscara e validação CEP
  const formatCEP = (value: string): string => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 8) {
      return numbers.replace(/^(\d{5})(\d)/, '$1-$2');
    }
    return value;
  };

  const isValidCEP = (cep: string): boolean => {
    const numbers = cep.replace(/\D/g, '');
    return numbers.length === 8;
  };

  // Validação URL
  const isValidURL = (url: string): boolean => {
    if (!url) return true;
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  // Validação imagem
  const isValidImage = (file: File): boolean => {
    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    const maxSize = 5 * 1024 * 1024;
    return validTypes.includes(file.type) && file.size <= maxSize;
  };

  // Validação senha
  const isValidPassword = (password: string): boolean => {
    const minLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
    
    return minLength && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;
  };

  const getPasswordStrengthMessage = (password: string): string => {
    if (!password) return "";
    if (password.length < 8) return "❌ Mínimo 8 caracteres";
    if (!/[A-Z]/.test(password)) return "❌ Precisa de letra maiúscula";
    if (!/[a-z]/.test(password)) return "❌ Precisa de letra minúscula";
    if (!/[0-9]/.test(password)) return "❌ Precisa de número";
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) return "❌ Precisa de caractere especial (!@#$%...)";
    return "✅ Senha forte";
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updateField = (field: keyof FormData, value: any) => {
    let formattedValue = value;

    if (field === 'cnpj') {
      formattedValue = formatCNPJ(value);
    } else if (field === 'phone') {
      formattedValue = formatPhone(value);
    } else if (field === 'cep') {
      formattedValue = formatCEP(value);
    } else if (field === 'foundationYear') {
      formattedValue = value.replace(/\D/g, '').slice(0, 4);
    } else if (field === 'email') {
      formattedValue = value.toLowerCase();
    } else if (field === 'estado') {
      formattedValue = value.toUpperCase().slice(0, 2);
    }

    setFormData(prev => ({ ...prev, [field]: formattedValue }));
    
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!isValidImage(file)) {
        setErrors(prev => ({
          ...prev,
          logo: "Imagem inválida. Use JPG, PNG ou WebP (máx 5MB)"
        }));
        return;
      }

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
    const newErrors: FormErrors = {};

    if (step === 1) {
      if (!formData.name.trim()) {
        newErrors.name = "Nome do equipamento é obrigatório";
      }
      if (!formData.cnpj) {
        newErrors.cnpj = "CNPJ é obrigatório";
      } else if (!isValidCNPJ(formData.cnpj)) {
        newErrors.cnpj = "CNPJ inválido (14 dígitos)";
      }
      if (!formData.responsible.trim()) {
        newErrors.responsible = "Nome do responsável é obrigatório";
      }
      if (!formData.phone) {
        newErrors.phone = "Telefone é obrigatório";
      } else if (!isValidPhone(formData.phone)) {
        newErrors.phone = "Telefone inválido (10 ou 11 dígitos)";
      }
      if (!formData.email) {
        newErrors.email = "E-mail é obrigatório";
      } else if (!isValidEmail(formData.email)) {
        newErrors.email = "E-mail inválido (ex: seu@email.com)";
      }
      if (!formData.logo) {
        newErrors.logo = "Logo é obrigatório";
      }
      if (formData.foundationYear && isNaN(Number(formData.foundationYear))) {
        newErrors.foundationYear = "Ano deve ser um número válido";
      }
      if (formData.foundationYear && Number(formData.foundationYear) < 1800) {
        newErrors.foundationYear = "Ano deve ser 1800 ou posterior";
      }
      if (formData.foundationYear && Number(formData.foundationYear) > new Date().getFullYear()) {
        newErrors.foundationYear = `Ano não pode ser maior que ${new Date().getFullYear()}`;
      }
      if (formData.website && !isValidURL(formData.website)) {
        newErrors.website = "URL inválida (ex: https://seu-site.com)";
      }
    }

    if (step === 2) {
      if (!formData.rua.trim()) {
        newErrors.rua = "Rua é obrigatória";
      }
      if (!formData.bairro.trim()) {
        newErrors.bairro = "Bairro é obrigatório";
      }
      if (!formData.cidade.trim()) {
        newErrors.cidade = "Cidade é obrigatória";
      }
      if (!formData.estado.trim() || formData.estado.length !== 2) {
        newErrors.estado = "Estado deve ter 2 letras";
      }
      if (!formData.cep) {
        newErrors.cep = "CEP é obrigatório";
      } else if (!isValidCEP(formData.cep)) {
        newErrors.cep = "CEP inválido (8 dígitos)";
      }
    }

    if (step === 3) {
      if (formData.category.length === 0) {
        newErrors.categories = "Selecione pelo menos uma categoria";
      }
      if (!formData.password) {
        newErrors.password = "Senha é obrigatória";
      } else if (!isValidPassword(formData.password)) {
        newErrors.password = "Senha não atende aos requisitos";
      }
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = "Confirmação de senha é obrigatória";
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "As senhas não coincidem";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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

      const res = await fetch(`${API_URL}/api/equipments`, {
        method: "POST",
        body: submitData,
      });

      const data = await res.json();

      if (res.ok) {
        alert("✅ Equipamento cultural cadastrado com sucesso!");
        router.push("/entrar-espaco");
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
    <div className="min-h-screen bg-gradient-to-br from-bluePrimary to-[#0f172a] py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Cadastro de Equipamento Cultural</h1>
          <p className="text-gray-300">Registre seu espaço cultural na plataforma</p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-4">
            {[1, 2, 3].map((step, idx) => (
              <div key={step} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full ${currentStep >= step ? 'bg-yellow-500' : 'bg-gray-600'} text-white font-bold transition-all`}>
                  {step}
                </div>
                {idx < 2 && <div className={`w-16 h-1 ${currentStep > step ? 'bg-yellow-500' : 'bg-gray-600'} transition-all`}></div>}
              </div>
            ))}
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {/* Etapa 1: Informações Básicas */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-bluePrimary mb-4">Informações Básicas</h2>
              
              {/* Logo */}
              <div className="flex flex-col items-center gap-4 p-6 bg-gray-50 rounded-lg">
                <div className="w-32 h-32 rounded-lg bg-gray-200 flex items-center justify-center overflow-hidden border-4 border-white shadow-lg">
                  {imagePreview ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  )}
                </div>
                <label className="cursor-pointer">
                  <span className="bg-bluePrimary text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition inline-block">
                    {imagePreview ? "Trocar Logo" : "Escolher Logo"}
                  </span>
                  <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                </label>
                {imagePreview && (
                  <p className="text-sm text-green-600 font-medium">✓ Logo carregado</p>
                )}
                {errors.logo && <p className="text-red-600 text-sm">{errors.logo}</p>}
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-2">Nome do Equipamento *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => updateField('name', e.target.value)}
                  placeholder="Ex: Teatro Municipal de Franca"
                  className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-bluePrimary ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-gray-700 mb-2">CNPJ *</label>
                  <input
                    type="text"
                    value={formData.cnpj}
                    onChange={(e) => updateField('cnpj', e.target.value)}
                    placeholder="00.000.000/0000-00"
                    className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-bluePrimary ${errors.cnpj ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.cnpj && <p className="text-red-600 text-sm mt-1">{errors.cnpj}</p>}
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-2">Ano de Fundação</label>
                  <input
                    type="number"
                    value={formData.foundationYear}
                    onChange={(e) => updateField('foundationYear', e.target.value)}
                    placeholder="2000"
                    className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-bluePrimary ${errors.foundationYear ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.foundationYear && <p className="text-red-600 text-sm mt-1">{errors.foundationYear}</p>}
                </div>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-2">Responsável *</label>
                <input
                  type="text"
                  value={formData.responsible}
                  onChange={(e) => updateField('responsible', e.target.value)}
                  placeholder="Nome do gestor/responsável"
                  className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-bluePrimary ${errors.responsible ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.responsible && <p className="text-red-600 text-sm mt-1">{errors.responsible}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-gray-700 mb-2">Telefone *</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => updateField('phone', e.target.value)}
                    placeholder="(00) 00000-0000"
                    className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-bluePrimary ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.phone && <p className="text-red-600 text-sm mt-1">{errors.phone}</p>}
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-2">E-mail *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateField('email', e.target.value)}
                    placeholder="contato@equipamento.com"
                    className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-bluePrimary ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
                </div>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-2">Website</label>
                <input
                  type="url"
                  value={formData.website}
                  onChange={(e) => updateField('website', e.target.value)}
                  placeholder="https://seu-site.com.br"
                  className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-bluePrimary ${errors.website ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.website && <p className="text-red-600 text-sm mt-1">{errors.website}</p>}
              </div>

              <button
                onClick={handleNext}
                className="w-full bg-bluePrimary text-white px-6 py-3 rounded-lg hover:opacity-90 transition font-semibold"
              >
                Próximo →
              </button>
            </div>
          )}

          {/* Etapa 2: Endereço */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-bluePrimary mb-4">Endereço</h2>

              <div>
                <label className="block font-semibold text-gray-700 mb-2">Rua *</label>
                <input
                  type="text"
                  value={formData.rua}
                  onChange={(e) => updateField('rua', e.target.value)}
                  placeholder="Nome da rua e número"
                  className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-bluePrimary ${errors.rua ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.rua && <p className="text-red-600 text-sm mt-1">{errors.rua}</p>}
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-2">Bairro *</label>
                <input
                  type="text"
                  value={formData.bairro}
                  onChange={(e) => updateField('bairro', e.target.value)}
                  placeholder="Nome do bairro"
                  className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-bluePrimary ${errors.bairro ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.bairro && <p className="text-red-600 text-sm mt-1">{errors.bairro}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block font-semibold text-gray-700 mb-2">Cidade *</label>
                  <input
                    type="text"
                    value={formData.cidade}
                    onChange={(e) => updateField('cidade', e.target.value)}
                    className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-bluePrimary ${errors.cidade ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.cidade && <p className="text-red-600 text-sm mt-1">{errors.cidade}</p>}
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-2">Estado *</label>
                  <input
                    type="text"
                    value={formData.estado}
                    onChange={(e) => updateField('estado', e.target.value)}
                    maxLength={2}
                    placeholder="SP"
                    className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-bluePrimary ${errors.estado ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.estado && <p className="text-red-600 text-sm mt-1">{errors.estado}</p>}
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-2">CEP *</label>
                  <input
                    type="text"
                    value={formData.cep}
                    onChange={(e) => updateField('cep', e.target.value)}
                    placeholder="00000-000"
                    className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-bluePrimary ${errors.cep ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.cep && <p className="text-red-600 text-sm mt-1">{errors.cep}</p>}
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
                  className="flex-1 bg-bluePrimary text-white px-6 py-3 rounded-lg hover:opacity-90 transition font-semibold"
                >
                  Próximo →
                </button>
              </div>
            </div>
          )}

          {/* Etapa 3: Categorias e Senha */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-bluePrimary mb-4">Categorias e Acesso</h2>

              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="font-semibold text-gray-700 mb-4">
                  Categorias *
                  {formData.category.length > 0 && (
                    <span className="text-bluePrimary ml-2">({formData.category.length} selecionadas)</span>
                  )}
                </p>
                {errors.categories && <p className="text-red-600 text-sm mb-3">{errors.categories}</p>}
                <div className="grid grid-cols-2 gap-3">
                  {categorias.map((cat) => (
                    <label key={cat} className="flex items-center gap-3 cursor-pointer hover:bg-white p-3 rounded transition">
                      <input 
                        type="checkbox" 
                        checked={formData.category.includes(cat)}
                        onChange={() => handleCategoryToggle(cat)}
                        className="w-5 h-5 text-bluePrimary rounded"
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
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-bluePrimary"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-gray-700 mb-2">Senha de Acesso *</label>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => updateField('password', e.target.value)}
                    placeholder="Min 8 caracteres: maiúscula, minúscula, número e caractere especial"
                    className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-bluePrimary ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {formData.password && (
                    <p className={`text-sm mt-2 font-medium ${
                      isValidPassword(formData.password) ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {getPasswordStrengthMessage(formData.password)}
                    </p>
                  )}
                  {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password}</p>}
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-2">Confirmar Senha *</label>
                  <input
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => updateField('confirmPassword', e.target.value)}
                    placeholder="Digite novamente"
                    className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-bluePrimary ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.confirmPassword && <p className="text-red-600 text-sm mt-1">{errors.confirmPassword}</p>}
                </div>
              </div>

              <p className="text-xs text-gray-500">
                Requisitos: Min 8 caracteres, Maiúscula (A-Z), Minúscula (a-z), Número (0-9), Caractere especial (!@#$%...)
              </p>

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
                  className="flex-1 bg-greenPrimary text-white px-6 py-3 rounded-lg hover:opacity-90 transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Cadastrando..." : "Cadastrar Equipamento ✓"}
                </button>
              </div>
            </div>
          )}

          <p className="text-center mt-6 text-gray-600">
            Já tem um equipamento cadastrado? <a href="/entrar-espaco" className="text-bluePrimary hover:underline font-semibold">Faça login</a>
          </p>
        </div>
      </div>
    </div>
  );
}