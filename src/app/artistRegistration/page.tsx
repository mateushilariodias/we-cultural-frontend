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
  acceptTerms: boolean;
}

interface FormErrors {
  [key: string]: string;
}

export default function Cadastro() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [errors, setErrors] = useState<FormErrors>({});

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
    acceptTerms: false,
  });

  const [showTermsModal, setShowTermsModal] = useState(false);

  // ===== MÁSCARA DE TELEFONE =====
  const maskPhone = (value: string) => {
    if (!value) return "";
    value = value.replace(/\D/g, ""); // Remove tudo que não é número
    value = value.replace(/^(\d{2})(\d)/g, "($1) $2"); // DDD
    value = value.replace(/(\d)(\d{4})$/, "$1-$2"); // Hífen final
    return value;
  };

  // ===== VALIDAÇÕES =====
  
  // Validar email
  const isValidEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  // Validar telefone brasileiro (ajustado para aceitar a máscara)
  const isValidPhone = (phone: string): boolean => {
    const regex = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;
    return regex.test(phone);
  };

  // Validar senha: min 8 caracteres, letra maiúscula, minúscula, número e caractere especial
  const isValidPassword = (password: string): boolean => {
    const minLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
    
    return minLength && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;
  };

  // Validar força da senha (retorna mensagem)
  const getPasswordStrengthMessage = (password: string): string => {
    if (!password) return "";
    if (password.length < 8) return "❌ Mínimo 8 caracteres";
    if (!/[A-Z]/.test(password)) return "❌ Precisa de letra maiúscula";
    if (!/[a-z]/.test(password)) return "❌ Precisa de letra minúscula";
    if (!/[0-9]/.test(password)) return "❌ Precisa de número";
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) return "❌ Precisa de caractere especial: !@#$%^&*()_+-=[]{}';:\"\\|,.<>/?";
    return "✅ Senha forte";
  };

  // Validar URL
  const isValidURL = (url: string): boolean => {
    if (!url) return true; // URL não obrigatória se campo vazio
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  // Validar imagem
  const isValidImage = (file: File): boolean => {
    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    const maxSize = 5 * 1024 * 1024; // 5MB
    
    return validTypes.includes(file.type) && file.size <= maxSize;
  };

  // Validar idade (mínimo 16 anos)
  const isValidAge = (birthDate: string): boolean => {
    const birth = new Date(birthDate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    
    return age >= 16;
  };

  // Atualizar campo individual
  const updateField = (field: keyof FormData, value: any) => {
    // Aplicar máscara se for o campo de telefone
    if (field === 'phone') {
      value = maskPhone(value);
    }

    setFormData(prev => ({ ...prev, [field]: value }));
    // Limpar erro do campo ao editar
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  // Handle da imagem com preview
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validar imagem
      if (!isValidImage(file)) {
        setErrors(prev => ({
          ...prev,
          profilePicture: "Imagem inválida. Use JPG, PNG ou WebP (máx 5MB)"
        }));
        return;
      }

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
    const newErrors: FormErrors = {};

    if (step === 1) {
      if (!formData.name.trim()) {
        newErrors.name = "Nome completo é obrigatório";
      }
      if (!formData.birthDate) {
        newErrors.birthDate = "Data de nascimento é obrigatória";
      } else if (!isValidAge(formData.birthDate)) {
        newErrors.birthDate = "Você deve ter no mínimo 16 anos";
      }
      if (!formData.email.trim()) {
        newErrors.email = "E-mail é obrigatório";
      } else if (!isValidEmail(formData.email)) {
        newErrors.email = "E-mail inválido (ex: seu@email.com)";
      }
      if (!formData.phone.trim()) {
        newErrors.phone = "Telefone é obrigatório";
      } else if (!isValidPhone(formData.phone)) {
        newErrors.phone = "Formato inválido. Use: (00) 00000-0000";
      }
      if (!formData.password) {
        newErrors.password = "Senha é obrigatória";
      } else if (!isValidPassword(formData.password)) {
        newErrors.password = "Senha não atende aos requisitos";
      }
      if (!formData.profilePicture) {
        newErrors.profilePicture = "Foto de perfil é obrigatória";
      }
    }

    if (step === 2) {
      if (!formData.gender) {
        newErrors.gender = "Selecione sua identidade de gênero";
      }
    }

    if (step === 3) {
      if (formData.categories.length === 0) {
        newErrors.categories = "Selecione pelo menos uma categoria";
      }
      if (!formData.portfolioLink.trim()) {
        newErrors.portfolioLink = "Link do portfólio é obrigatório";
      } else if (!isValidURL(formData.portfolioLink)) {
        newErrors.portfolioLink = "URL inválida (ex: https://seu-site.com)";
      }
      if (!formData.resumeLink.trim()) {
        newErrors.resumeLink = "Link do currículo é obrigatório";
      } else if (!isValidURL(formData.resumeLink)) {
        newErrors.resumeLink = "URL inválida (ex: https://seu-site.com)";
      }
      if (formData.socialLink && !isValidURL(formData.socialLink)) {
        newErrors.socialLink = "URL inválida (ex: https://instagram.com/seu-perfil)";
      }
      if (!formData.acceptTerms) {
        newErrors.acceptTerms = "Você deve aceitar o Termo de Consentimento LGPD";
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
      console.log("📤 Enviando cadastro...");
      
      // Chamar backend diretamente
      const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
      
      const res = await fetch(`${BACKEND_URL}/api/artists`, {
        method: "POST",
        body: submitData,
      });

      console.log("📥 Status:", res.status);

      // Verificar se a resposta é JSON
      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await res.text();
        console.error("❌ Resposta não é JSON:", text.substring(0, 200));
        alert("Erro de comunicação com o servidor. Verifique o console.");
        setLoading(false);
        return;
      }

      const data = await res.json();
      console.log("✅ Resposta:", data);

      if (res.ok) {
        alert("Cadastro realizado com sucesso! Faça login para continuar.");
        router.push("/artistLogin");
      } else {
        alert(data.message || "Erro no cadastro, tente novamente.");
      }
    } catch (error) {
      console.error("💥 Erro no cadastro:", error);
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
                    required
                  />
                </label>
                {imagePreview && (
                  <p className="text-sm text-green-600 font-medium">✓ Foto carregada</p>
                )}
                {errors.profilePicture && (
                  <p className="text-sm text-red-600 font-medium">{errors.profilePicture}</p>
                )}
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-2">Nome Completo *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => updateField('name', e.target.value)}
                  className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a] ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                  required
                />
                {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-2">Data de Nascimento * (Mínimo 16 anos)</label>
                <input
                  type="date"
                  value={formData.birthDate}
                  onChange={(e) => updateField('birthDate', e.target.value)}
                  className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a] ${errors.birthDate ? 'border-red-500' : 'border-gray-300'}`}
                  required
                />
                {errors.birthDate && <p className="text-red-600 text-sm mt-1">{errors.birthDate}</p>}
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-2">E-mail *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateField('email', e.target.value)}
                  placeholder="seu@email.com"
                  className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a] ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                  required
                />
                {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-2">Telefone / WhatsApp *</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => updateField('phone', e.target.value)}
                  placeholder="(00) 00000-0000"
                  maxLength={15}
                  className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a] ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                  required
                />
                {errors.phone && <p className="text-red-600 text-sm mt-1">{errors.phone}</p>}
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-2">Senha *</label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => updateField('password', e.target.value)}
                  placeholder="Min 8 caracteres: maiúscula, minúscula, número e caractere especial"
                  className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a] ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                  required
                />
                {formData.password && (
                  <p className={`text-sm mt-2 font-medium ${
                    isValidPassword(formData.password) ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {getPasswordStrengthMessage(formData.password)}
                  </p>
                )}
                {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password}</p>}
                <p className="text-xs text-gray-500 mt-2">
                  Requisitos: Min 8 caracteres, Maiúscula (A-Z), Minúscula (a-z), Número (0-9), Caractere especial (!@#$%...)
                </p>
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
                  className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a] ${errors.gender ? 'border-red-500' : 'border-gray-300'}`}
                  required
                >
                  <option value="">Selecione...</option>
                  <option value="Masculino Cis">Masculino (Cis)</option>
                  <option value="Feminino Cis">Feminino (Cis)</option>
                  <option value="Homem Trans">Homem Trans</option>
                  <option value="Mulher Trans">Mulher Trans</option>
                  <option value="Não-binário">Não-binário</option>
                </select>
                {errors.gender && <p className="text-red-600 text-sm mt-1">{errors.gender}</p>}
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
                  Categorias Artísticas * {formData.categories.length > 0 && (
                    <span className="text-[#F59E0B] ml-2">({formData.categories.length} selecionadas)</span>
                  )}
                </p>
                {errors.categories && <p className="text-red-600 text-sm mb-3">{errors.categories}</p>}
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
                  className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a] ${errors.portfolioLink ? 'border-red-500' : 'border-gray-300'}`}
                  required
                />
                {errors.portfolioLink && <p className="text-red-600 text-sm mt-1">{errors.portfolioLink}</p>}
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-2">Link do Currículo Artístico *</label>
                <input
                  type="url"
                  value={formData.resumeLink}
                  onChange={(e) => updateField('resumeLink', e.target.value)}
                  placeholder="https://seu-curriculo.com"
                  className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a] ${errors.resumeLink ? 'border-red-500' : 'border-gray-300'}`}
                  required
                />
                {errors.resumeLink && <p className="text-red-600 text-sm mt-1">{errors.resumeLink}</p>}
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-2">Link da sua Principal Rede Social</label>
                <input
                  type="url"
                  value={formData.socialLink}
                  onChange={(e) => updateField('socialLink', e.target.value)}
                  placeholder="https://instagram.com/seu-perfil"
                  className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a] ${errors.socialLink ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.socialLink && <p className="text-red-600 text-sm mt-1">{errors.socialLink}</p>}
              </div>

              {/* TERMO LGPD */}
              <div className="bg-blue-50 border-2 border-[#1e3a8a] rounded-lg p-6 mt-6">
                <div className="flex items-start gap-3 mb-4">
                  <svg className="w-6 h-6 text-[#1e3a8a] flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <div className="flex-1">
                    <h3 className="font-bold text-[#1e3a8a] mb-2">📋 Proteção de Dados Pessoais (LGPD)</h3>
                    <p className="text-sm text-gray-700 mb-3">
                      Seus dados serão <strong>públicos</strong> e visíveis na plataforma para promover sua arte. Isso inclui: <strong>nome, foto, categorias, links, identidade de gênero, marcadores sociais, telefone e e-mail</strong>.
                    </p>
                    <button 
                      type="button"
                      onClick={() => setShowTermsModal(true)} 
                      className="text-[#1e3a8a] hover:underline font-semibold text-sm flex items-center gap-1"
                    >
                      📄 Ler Termo Completo de Consentimento
                    </button>
                  </div>
                </div>
                
                <label className="flex items-start gap-3 cursor-pointer p-4 bg-white rounded-lg hover:bg-gray-50 transition border-2 border-gray-200">
                  <input 
                    type="checkbox" 
                    checked={formData.acceptTerms}
                    onChange={(e) => updateField('acceptTerms', e.target.checked)}
                    className="w-5 h-5 text-[#1e3a8a] rounded mt-1 flex-shrink-0" 
                  />
                  <span className="text-sm text-gray-800">
                    <strong>Li e aceito</strong> o Termo de Consentimento e Política de Privacidade, estando ciente que meus dados serão públicos conforme descrito.
                  </span>
                </label>
                {errors.acceptTerms && <p className="text-red-600 text-sm mt-3">{errors.acceptTerms}</p>}
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
                  disabled={loading || !formData.acceptTerms}
                  className="flex-1 bg-[#F59E0B] text-white px-6 py-3 rounded-lg hover:bg-[#D97706] transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
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

      {/* Modal do Termo LGPD */}
      {showTermsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" onClick={() => setShowTermsModal(false)}>
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[85vh] overflow-y-auto p-8" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-2xl font-bold text-[#1e3a8a]">Termo de Consentimento - LGPD</h2>
              <button onClick={() => setShowTermsModal(false)} className="text-gray-500 hover:text-gray-700 text-3xl leading-none">×</button>
            </div>
            
            <div className="prose prose-sm max-w-none text-gray-700 space-y-4">
              <p className="text-sm text-gray-500"><strong>Última atualização:</strong> Dezembro de 2024</p>
              
              <h3 className="text-lg font-bold text-[#1e3a8a] mt-6">1. Sobre Este Termo</h3>
              <p>Este documento esclarece como a plataforma <strong>Nós Cultural</strong> coleta, utiliza e protege seus dados pessoais, em conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018 - LGPD).</p>
              
              <h3 className="text-lg font-bold text-[#1e3a8a] mt-6">2. Dados Coletados</h3>
              <p>Para seu cadastro como artista, coletamos:</p>
              <ul className="list-disc ml-6 space-y-1">
                <li><strong>Identificação:</strong> Nome, data de nascimento, e-mail, telefone, foto</li>
                <li><strong>Profissionais:</strong> Categorias artísticas, links de portfólio e currículo</li>
                <li><strong>Marcadores Sociais (opcional):</strong> Identidade de gênero, LGBTQIAPN+, raça/etnia, PcD</li>
              </ul>
              
              <h3 className="text-lg font-bold text-[#1e3a8a] mt-6">3. Dados Públicos - IMPORTANTE</h3>
              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
                <p className="font-semibold text-yellow-800">⚠️ ATENÇÃO:</p>
                <p className="mt-2">Os seguintes dados serão <strong>PÚBLICOS</strong> e visíveis para qualquer pessoa:</p>
                <ul className="list-disc ml-6 mt-2 space-y-1">
                  <li>Nome completo</li>
                  <li>Foto de perfil</li>
                  <li>Categorias artísticas</li>
                  <li>Links (portfólio, currículo, redes sociais)</li>
                  <li>Identidade de gênero e marcadores sociais</li>
                  <li>Telefone e e-mail (para contato profissional)</li>
                </ul>
                <p className="mt-2"><strong>Apenas sua senha permanece privada e criptografada.</strong></p>
              </div>
              
              <h3 className="text-lg font-bold text-[#1e3a8a] mt-6">4. Finalidade</h3>
              <p>Seus dados serão utilizados para:</p>
              <ul className="list-disc ml-6 space-y-1">
                <li>Criar seu perfil público na plataforma</li>
                <li>Promover a diversidade cultural de Franca-SP</li>
                <li>Facilitar contato entre artistas, coletivos e público</li>
                <li>Gerar estatísticas sobre o cenário cultural local</li>
                <li>Conectar artistas a oportunidades culturais</li>
              </ul>
              
              <h3 className="text-lg font-bold text-[#1e3a8a] mt-6">5. Compartilhamento</h3>
              <p>Seus dados <strong>NÃO serão vendidos ou cedidos</strong> para fins comerciais.</p>
              <p>Poderão ser compartilhados apenas:</p>
              <ul className="list-disc ml-6 space-y-1">
                <li>Com gestores públicos de cultura para fins estatísticos</li>
                <li>Com promotores de eventos culturais locais (mediante consentimento)</li>
                <li>Quando exigido por lei ou ordem judicial</li>
              </ul>
              
              <h3 className="text-lg font-bold text-[#1e3a8a] mt-6">6. Seus Direitos (LGPD)</h3>
              <p>Você tem direito a:</p>
              <ul className="list-disc ml-6 space-y-1">
                <li>📌 Acessar seus dados a qualquer momento</li>
                <li>📌 Corrigir dados incompletos ou desatualizados</li>
                <li>📌 Excluir sua conta e todos os dados associados</li>
                <li>📌 Revogar este consentimento a qualquer momento</li>
                <li>📌 Solicitar portabilidade dos seus dados</li>
                <li>📌 Opor-se ao tratamento de dados específicos</li>
              </ul>
              
              <h3 className="text-lg font-bold text-[#1e3a8a] mt-6">7. Segurança</h3>
              <p>Adotamos medidas para proteger seus dados:</p>
              <ul className="list-disc ml-6 space-y-1">
                <li>Senhas criptografadas</li>
                <li>Conexão segura (HTTPS)</li>
                <li>Backup regular dos dados</li>
                <li>Acesso restrito aos administradores</li>
              </ul>
              
              <h3 className="text-lg font-bold text-[#1e3a8a] mt-6">8. Retenção dos Dados</h3>
              <p>Seus dados serão mantidos enquanto sua conta estiver ativa. Após exclusão, os dados serão anonimizados ou deletados permanentemente em até 30 dias.</p>
              
              <h3 className="text-lg font-bold text-[#1e3a8a] mt-6">9. Consentimento</h3>
              <p>Ao aceitar este termo e prosseguir com o cadastro, você declara:</p>
              <ul className="list-disc ml-6 space-y-1">
                <li>✓ Ter lido e compreendido este termo</li>
                <li>✓ Consentir livre e expressamente com a coleta e tratamento dos dados</li>
                <li>✓ Estar ciente que seus dados serão <strong>públicos</strong></li>
                <li>✓ Ter mais de 16 anos ou autorização de responsável legal</li>
              </ul>
              
              <h3 className="text-lg font-bold text-[#1e3a8a] mt-6">10. Contato - Encarregado de Dados</h3>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="font-semibold">Para dúvidas sobre privacidade e proteção de dados:</p>
                <p className="mt-2">📧 <strong>E-mail:</strong> nosculturaloficial@gmail.com</p>
                <p>📱 <strong>Telefone:</strong> (16) 99119-0429</p>
              </div>
              
              <div className="bg-gray-100 p-4 rounded-lg mt-6 text-center">
                <p className="font-bold text-[#1e3a8a]">Plataforma Nós Cultural</p>
                <p className="text-sm text-gray-600">Promovendo a cultura de Franca-SP</p>
              </div>
            </div>
            
            <button 
              onClick={() => setShowTermsModal(false)} 
              className="w-full mt-6 bg-[#1e3a8a] text-white px-6 py-3 rounded-lg hover:bg-[#15306e] transition font-semibold"
            >
              Fechar e Voltar ao Cadastro
            </button>
          </div>
        </div>
      )}
    </div>
  );
}