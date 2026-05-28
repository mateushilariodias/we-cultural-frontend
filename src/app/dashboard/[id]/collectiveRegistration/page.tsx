"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { API_URL } from "@/config/api";

const categorias = [
  "Arquitetura", "Arte digital", "Artesanato", "Cinema", "Dança",
  "Design", "Escultura", "Fotografia", "História em quadrinhos",
  "Jogos eletrônicos", "Literatura", "Música", "Pintura", "Teatro",
];

interface FormData {
  name: string;
  description: string;
  phone: string;
  socialLink: string;
  numMembers: number;
  memberNames: string;
  categories: string[];
  password: string;
  confirmPassword: string;
  profilePicture: File | null;
}

interface FormErrors {
  [key: string]: string;
}

export default function CollectiveRegistration() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [errors, setErrors] = useState<FormErrors>({});

  const [formData, setFormData] = useState<FormData>({
    name: "",
    description: "",
    phone: "",
    socialLink: "",
    numMembers: 1,
    memberNames: "",
    categories: [],
    password: "",
    confirmPassword: "",
    profilePicture: null,
  });

  // ===== VALIDAÇÕES E MÁSCARAS =====

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

  // Validação URL
  const isValidURL = (url: string): boolean => {
    if (!url) return false;
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

  // Validar nomes de membros
  const validateMemberNames = (names: string): boolean => {
    if (!names) return true;
    return /^[a-zA-Z0-9\s\-,áéíóúâêôãõçÁÉÍÓÚÂÊÔÃÕÇ]*$/.test(names);
  };

  // Validar nome do coletivo
  const isValidCollectiveName = (name: string): boolean => {
    return name.length >= 3 && /^[a-zA-Z0-9\s\-áéíóúâêôãõçÁÉÍÓÚÂÊÔÃÕÇ]+$/.test(name);
  };

  // Verificar se usuário está logado
  useEffect(() => {
    const token = localStorage.getItem("token");
    const artistData = localStorage.getItem("artistData");

    if (!token || !artistData) {
      setIsLoggedIn(false);
    } else {
      setIsLoggedIn(true);
    }

    setCheckingAuth(false);
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updateField = (field: keyof FormData, value: any) => {
    let formattedValue = value;

    if (field === 'phone') {
      formattedValue = formatPhone(value);
    } else if (field === 'numMembers') {
      const num = parseInt(value) || 1;
      formattedValue = Math.max(1, num);
    } else if (field === 'name') {
      formattedValue = value.trim();
    } else if (field === 'description') {
      formattedValue = value.trim();
    } else if (field === 'memberNames') {
      formattedValue = value.trim();
    } else if (field === 'password') {
      formattedValue = value;
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
          profilePicture: "Imagem inválida. Use JPG, PNG ou WebP (máx 5MB)"
        }));
        return;
      }

      updateField('profilePicture', file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleCategoryToggle = (category: string) => {
    setFormData(prev => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category]
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Nome do coletivo é obrigatório";
    } else if (!isValidCollectiveName(formData.name)) {
      newErrors.name = "Nome deve ter mínimo 3 caracteres (apenas letras, números, hífens)";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Descrição é obrigatória";
    } else if (formData.description.trim().length < 20) {
      newErrors.description = "Descrição deve ter mínimo 20 caracteres";
    }

    if (!formData.phone) {
      newErrors.phone = "Telefone é obrigatório";
    } else if (!isValidPhone(formData.phone)) {
      newErrors.phone = "Telefone inválido (10 ou 11 dígitos)";
    }

    if (!formData.socialLink) {
      newErrors.socialLink = "Link de rede social é obrigatório";
    } else if (!isValidURL(formData.socialLink)) {
      newErrors.socialLink = "URL inválida (ex: https://instagram.com/seu-coletivo)";
    }

    if (!formData.numMembers || formData.numMembers < 1) {
      newErrors.numMembers = "Número de membros deve ser pelo menos 1";
    } else if (formData.numMembers > 999) {
      newErrors.numMembers = "Número de membros não pode exceder 999";
    }

    if (formData.memberNames && !validateMemberNames(formData.memberNames)) {
      newErrors.memberNames = "Nomes contêm caracteres inválidos";
    }

    if (formData.categories.length === 0) {
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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    
    setLoading(true);

    try {
      // Obter ID do usuário logado do localStorage
      const artistDataStr = localStorage.getItem("artistData");
      if (!artistDataStr) {
        alert("Erro: Dados do artista não encontrados");
        setLoading(false);
        return;
      }

      let artistId: string;
      try {
        const artistData = JSON.parse(artistDataStr);
        artistId = artistData._id || artistData.id;
      } catch {
        alert("Erro: Formato de dados inválido");
        setLoading(false);
        return;
      }

      if (!artistId) {
        alert("Erro: ID do artista não encontrado");
        setLoading(false);
        return;
      }

      const submitData = new FormData();
      submitData.append("name", formData.name);
      submitData.append("description", formData.description);
      submitData.append("phone", formData.phone);
      submitData.append("socialLink", formData.socialLink);
      submitData.append("numMembers", String(formData.numMembers));
      submitData.append("memberNames", formData.memberNames);
      submitData.append("password", formData.password);
      
      formData.categories.forEach(cat => {
        submitData.append("categories", cat);
      });
      
      if (formData.profilePicture) {
        submitData.append("profilePicture", formData.profilePicture);
      }

      const res = await fetch(`${API_URL}/api/collectives`, {
        method: "POST",
        body: submitData,
      });

      const data = await res.json();

      if (res.ok) {
        alert("✅ Coletivo cadastrado com sucesso!");
        // Redirecionar para o login do coletivo com o ID do artista
        router.push(`/dashboard/${artistId}/collectiveLogin`);
      } else {
        alert(data.message || "Erro ao cadastrar coletivo");
      }
    } catch (error) {
      console.error(error);
      alert("Erro ao conectar com o servidor");
    } finally {
      setLoading(false);
    }
  };

  if (checkingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-bluePrimary"></div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md mx-4">
          <div className="bg-yellow-50 border-2 border-yellow-400 rounded-lg p-8 mb-6">
            <svg className="w-16 h-16 text-yellow-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Acesso Restrito</h2>
            <p className="text-gray-600 mb-6">
              Você precisa estar logado como <strong>artista</strong> para cadastrar um coletivo.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <a 
              href="/artistLogin" 
              className="bg-bluePrimary text-white px-6 py-3 rounded-lg hover:opacity-90 transition font-semibold"
            >
              Fazer Login como Artista
            </a>
            <a 
              href="/artistRegistration" 
              className="border-2 border-bluePrimary text-bluePrimary px-6 py-3 rounded-lg hover:bg-bluePrimary hover:text-white transition font-semibold"
            >
              Cadastrar como Artista
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-greenPrimary to-[#1a5f3f] py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Cadastro de Coletivo</h1>
          <p className="text-gray-200">Registre seu coletivo artístico na plataforma</p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="space-y-6">
            {/* Foto de Perfil */}
            <div className="flex flex-col items-center gap-4 p-6 bg-gray-50 rounded-lg">
              <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border-4 border-white shadow-lg">
                {imagePreview ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                )}
              </div>
              <label className="cursor-pointer">
                <span className="bg-greenPrimary text-white px-4 py-2 rounded-lg hover:opacity-90 transition inline-block">
                  {imagePreview ? "Trocar Foto" : "Escolher Foto"}
                </span>
                <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
              </label>
              {imagePreview && (
                <p className="text-sm text-green-600 font-medium">✓ Foto carregada</p>
              )}
              {errors.profilePicture && <p className="text-red-600 text-sm">{errors.profilePicture}</p>}
            </div>

            {/* Nome do Coletivo */}
            <div>
              <label className="block font-semibold text-gray-700 mb-2">Nome do Coletivo *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => updateField('name', e.target.value)}
                placeholder="Ex: Coletivo Arte Urbana"
                className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-greenPrimary ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
            </div>

            {/* Descrição */}
            <div>
              <label className="block font-semibold text-gray-700 mb-2">Descrição * (mínimo 20 caracteres)</label>
              <textarea
                value={formData.description}
                onChange={(e) => updateField('description', e.target.value)}
                placeholder="Conte sobre o coletivo, sua história e objetivos..."
                rows={4}
                className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-greenPrimary ${errors.description ? 'border-red-500' : 'border-gray-300'}`}
              />
              <p className="text-xs text-gray-500 mt-1">{formData.description.length} caracteres</p>
              {errors.description && <p className="text-red-600 text-sm mt-1">{errors.description}</p>}
            </div>

            {/* Telefone */}
            <div>
              <label className="block font-semibold text-gray-700 mb-2">Telefone / WhatsApp *</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => updateField('phone', e.target.value)}
                placeholder="(00) 00000-0000"
                className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-greenPrimary ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.phone && <p className="text-red-600 text-sm mt-1">{errors.phone}</p>}
            </div>

            {/* Rede Social */}
            <div>
              <label className="block font-semibold text-gray-700 mb-2">Link da Rede Social *</label>
              <input
                type="url"
                value={formData.socialLink}
                onChange={(e) => updateField('socialLink', e.target.value)}
                placeholder="https://instagram.com/seu-coletivo"
                className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-greenPrimary ${errors.socialLink ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.socialLink && <p className="text-red-600 text-sm mt-1">{errors.socialLink}</p>}
            </div>

            {/* Número de Membros */}
            <div>
              <label className="block font-semibold text-gray-700 mb-2">Número de Membros * (1-999)</label>
              <input
                type="number"
                min="1"
                max="999"
                value={formData.numMembers}
                onChange={(e) => updateField('numMembers', parseInt(e.target.value) || 1)}
                className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-greenPrimary ${errors.numMembers ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.numMembers && <p className="text-red-600 text-sm mt-1">{errors.numMembers}</p>}
            </div>

            {/* Nomes dos Membros */}
            <div>
              <label className="block font-semibold text-gray-700 mb-2">
                Nomes dos Membros (opcional)
                <span className="text-sm text-gray-500 font-normal ml-2">Separe por vírgula</span>
              </label>
              <input
                type="text"
                value={formData.memberNames}
                onChange={(e) => updateField('memberNames', e.target.value)}
                placeholder="João Silva, Maria Santos, Pedro Costa"
                className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-greenPrimary ${errors.memberNames ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.memberNames && <p className="text-red-600 text-sm mt-1">{errors.memberNames}</p>}
            </div>

            {/* Categorias */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="font-semibold text-gray-700 mb-4">
                Categorias Artísticas *
                {formData.categories.length > 0 && (
                  <span className="text-greenPrimary ml-2">({formData.categories.length} selecionadas)</span>
                )}
              </p>
              {errors.categories && <p className="text-red-600 text-sm mb-3">{errors.categories}</p>}
              <div className="grid grid-cols-2 gap-3">
                {categorias.map((cat) => (
                  <label key={cat} className="flex items-center gap-3 cursor-pointer hover:bg-white p-3 rounded transition">
                    <input 
                      type="checkbox" 
                      checked={formData.categories.includes(cat)}
                      onChange={() => handleCategoryToggle(cat)}
                      className="w-5 h-5 text-greenPrimary rounded"
                    />
                    <span className="text-gray-700">{cat}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Senha */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-gray-700 mb-2">Senha de Acesso *</label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => updateField('password', e.target.value)}
                  placeholder="Min 8 caracteres: maiúscula, minúscula, número e caractere especial"
                  className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-greenPrimary ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
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
                  placeholder="Digite a senha novamente"
                  className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-greenPrimary ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.confirmPassword && <p className="text-red-600 text-sm mt-1">{errors.confirmPassword}</p>}
              </div>
            </div>

            <p className="text-xs text-gray-500">
              Requisitos: Min 8 caracteres, Maiúscula (A-Z), Minúscula (a-z), Número (0-9), Caractere especial (!@#$%...)
            </p>

            {/* Info Box */}
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
              <p className="text-sm text-blue-700">
                <strong>ℹ️ Importante:</strong> A senha será usada para fazer login do coletivo. 
                Os membros poderão acessar com esta senha para gerenciar o perfil.
              </p>
            </div>

            {/* Botões */}
            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={() => router.back()}
                className="flex-1 bg-gray-300 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-400 transition font-semibold"
              >
                Cancelar
              </button>
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="flex-1 bg-greenPrimary text-white px-6 py-3 rounded-lg hover:opacity-90 transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Cadastrando..." : "Cadastrar Coletivo ✓"}
              </button>
            </div>
          </div>

          <p className="text-center mt-6 text-gray-600">
            Já tem um coletivo cadastrado? <a href="/collectiveLogin" className="text-greenPrimary hover:underline font-semibold">Faça login</a>
          </p>
        </div>
      </div>
    </div>
  );
}