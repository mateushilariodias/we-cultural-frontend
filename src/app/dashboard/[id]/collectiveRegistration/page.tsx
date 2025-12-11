"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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

export default function CollectiveRegistration() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

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

  // Verificar se usuário está logado
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const artistData = localStorage.getItem("artistData");
    
    if (!token || !artistData) {
      setIsLoggedIn(false);
    } else {
      setIsLoggedIn(true);
    }
    
    setCheckingAuth(false);
  }, []);

  const updateField = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
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
    if (!formData.name || !formData.description || !formData.phone || 
        !formData.socialLink || !formData.password) {
      alert("Por favor, preencha todos os campos obrigatórios");
      return false;
    }
    
    if (formData.categories.length === 0) {
      alert("Selecione pelo menos uma categoria artística");
      return false;
    }
    
    if (formData.numMembers < 1) {
      alert("O número de membros deve ser pelo menos 1");
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
    
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    
    setLoading(true);

    try {
      const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
      
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

      const res = await fetch(`${BACKEND_URL}/api/collectives`, {
        method: "POST",
        body: submitData,
      });

      const data = await res.json();

      if (res.ok) {
        alert("✅ Coletivo cadastrado com sucesso!");
        router.push("/collectiveLogin");
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
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1e3a8a]"></div>
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
              className="bg-[#1e3a8a] text-white px-6 py-3 rounded-lg hover:bg-[#15306e] transition font-semibold"
            >
              Fazer Login como Artista
            </a>
            <a 
              href="/artistRegistration" 
              className="border-2 border-[#1e3a8a] text-[#1e3a8a] px-6 py-3 rounded-lg hover:bg-[#1e3a8a] hover:text-white transition font-semibold"
            >
              Cadastrar como Artista
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-700 to-green-900 py-12 px-4">
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
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                )}
              </div>
              <label className="cursor-pointer">
                <span className="bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-800 transition inline-block">
                  {imagePreview ? "Trocar Foto" : "Escolher Foto"}
                </span>
                <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
              </label>
            </div>

            {/* Nome do Coletivo */}
            <div>
              <label className="block font-semibold text-gray-700 mb-2">Nome do Coletivo *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => updateField('name', e.target.value)}
                placeholder="Ex: Coletivo Arte Urbana"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-600"
              />
            </div>

            {/* Descrição */}
            <div>
              <label className="block font-semibold text-gray-700 mb-2">Descrição *</label>
              <textarea
                value={formData.description}
                onChange={(e) => updateField('description', e.target.value)}
                placeholder="Conte sobre o coletivo, sua história e objetivos..."
                rows={4}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-600"
              />
            </div>

            {/* Telefone */}
            <div>
              <label className="block font-semibold text-gray-700 mb-2">Telefone / WhatsApp *</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => updateField('phone', e.target.value)}
                placeholder="(00) 00000-0000"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-600"
              />
            </div>

            {/* Rede Social */}
            <div>
              <label className="block font-semibold text-gray-700 mb-2">Link da Rede Social *</label>
              <input
                type="url"
                value={formData.socialLink}
                onChange={(e) => updateField('socialLink', e.target.value)}
                placeholder="https://instagram.com/seu-coletivo"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-600"
              />
            </div>

            {/* Número de Membros */}
            <div>
              <label className="block font-semibold text-gray-700 mb-2">Número de Membros *</label>
              <input
                type="number"
                min="1"
                value={formData.numMembers}
                onChange={(e) => updateField('numMembers', parseInt(e.target.value) || 1)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-600"
              />
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
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-600"
              />
            </div>

            {/* Categorias */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="font-semibold text-gray-700 mb-4">
                Categorias Artísticas *
                {formData.categories.length > 0 && (
                  <span className="text-green-600 ml-2">({formData.categories.length} selecionadas)</span>
                )}
              </p>
              <div className="grid grid-cols-2 gap-3">
                {categorias.map((cat) => (
                  <label key={cat} className="flex items-center gap-3 cursor-pointer hover:bg-white p-3 rounded transition">
                    <input 
                      type="checkbox" 
                      checked={formData.categories.includes(cat)}
                      onChange={() => handleCategoryToggle(cat)}
                      className="w-5 h-5 text-green-600 rounded"
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
                  placeholder="Mínimo 6 caracteres"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-600"
                />
              </div>
              <div>
                <label className="block font-semibold text-gray-700 mb-2">Confirmar Senha *</label>
                <input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => updateField('confirmPassword', e.target.value)}
                  placeholder="Digite a senha novamente"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-600"
                />
              </div>
            </div>

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
                onClick={() => router.push("/dashboard")}
                className="flex-1 bg-gray-300 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-400 transition font-semibold"
              >
                Cancelar
              </button>
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="flex-1 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition font-semibold disabled:opacity-50"
              >
                {loading ? "Cadastrando..." : "Cadastrar Coletivo"}
              </button>
            </div>
          </div>

          <p className="text-center mt-6 text-gray-600">
            Já tem um coletivo cadastrado? <a href="/collectiveLogin" className="text-green-600 hover:underline font-semibold">Faça login</a>
          </p>
        </div>
      </div>
    </div>
  );
}