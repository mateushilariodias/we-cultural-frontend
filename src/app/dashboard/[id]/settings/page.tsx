"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Artist {
  _id: string;
  id: string;
  name: string;
  email: string;
  phone: string;
  birthDate?: string;
  gender: string;
  profilePicture?: string;
  categories?: string[];
  lgbtqiapn?: boolean;
  black?: boolean;
  indigenous?: boolean;
  pcd?: boolean;
  portfolioLink?: string;
  resumeLink?: string;
  socialLink?: string;
}

export default function ArtistSettings() {
  const router = useRouter();
  const [artist, setArtist] = useState<Artist | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'profile' | 'edit' | 'delete'>('profile');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  
  // Estados para edição
  const [editLoading, setEditLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    birthDate: "",
    gender: "",
    lgbtqiapn: false,
    black: false,
    indigenous: false,
    pcd: false,
    categories: [] as string[],
    portfolioLink: "",
    resumeLink: "",
    socialLink: "",
    profilePicture: null as File | null,
  });

  useEffect(() => {
    // Carregar dados do artista do localStorage
    const artistData = localStorage.getItem("artistData");
    
    if (!artistData) {
      // Não está logado, redirecionar para login
      router.push("/artistLogin");
      return;
    }

    try {
      const parsed = JSON.parse(artistData);
      
      // Buscar dados completos do backend
      loadFullArtistData(parsed.id || parsed._id);
    } catch (error) {
      console.error("Erro ao carregar artista:", error);
      router.push("/artistLogin");
    }
  }, [router]);

  const loadFullArtistData = async (artistId: string) => {
    try {
      const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
      const token = localStorage.getItem("authToken");

      const res = await fetch(`${BACKEND_URL}/api/artists/${artistId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!res.ok) {
        throw new Error('Erro ao carregar dados');
      }

      const data = await res.json();
      setArtist(data);
      
      // Preencher formulário de edição
      setFormData({
        name: data.name || "",
        email: data.email || "",
        phone: data.phone || "",
        birthDate: data.birthDate ? data.birthDate.split('T')[0] : "",
        gender: data.gender || "",
        lgbtqiapn: data.lgbtqiapn || false,
        black: data.black || false,
        indigenous: data.indigenous || false,
        pcd: data.pcd || false,
        categories: data.categories || [],
        portfolioLink: data.portfolioLink || "",
        resumeLink: data.resumeLink || "",
        socialLink: data.socialLink || "",
        profilePicture: null,
      });
      
      if (data.profilePicture) {
        setImagePreview(data.profilePicture);
      }
      
      setLoading(false);
    } catch (error) {
      console.error("Erro ao carregar dados completos:", error);
      // Se falhar, usar dados do localStorage
      const cachedData = localStorage.getItem("artistData");
      if (cachedData) {
        setArtist(JSON.parse(cachedData));
      }
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("artistData");
    router.push("/");
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, profilePicture: file }));
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
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

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!artist) return;
    
    setEditLoading(true);
    
    try {
      const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
      const token = localStorage.getItem("authToken");
      const artistId = artist._id || artist.id;

      const submitData = new FormData();
      submitData.append("name", formData.name);
      submitData.append("email", formData.email);
      submitData.append("phone", formData.phone);
      submitData.append("birthDate", formData.birthDate);
      submitData.append("gender", formData.gender);
      submitData.append("lgbtqiapn", String(formData.lgbtqiapn));
      submitData.append("black", String(formData.black));
      submitData.append("indigenous", String(formData.indigenous));
      submitData.append("pcd", String(formData.pcd));
      submitData.append("portfolioLink", formData.portfolioLink);
      submitData.append("resumeLink", formData.resumeLink);
      submitData.append("socialLink", formData.socialLink);
      
      formData.categories.forEach(cat => {
        submitData.append("categories", cat);
      });
      
      if (formData.profilePicture) {
        submitData.append("profilePicture", formData.profilePicture);
      }

      const res = await fetch(`${BACKEND_URL}/api/artists/${artistId}`, {
        method: "PUT",
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: submitData,
      });

      if (res.ok) {
        const updatedData = await res.json();
        setArtist(updatedData);
        
        // Atualizar localStorage
        localStorage.setItem("artistData", JSON.stringify({
          id: updatedData._id || updatedData.id,
          name: updatedData.name,
          email: updatedData.email,
          profilePicture: updatedData.profilePicture,
        }));
        
        alert("✅ Perfil atualizado com sucesso!");
        setActiveTab('profile');
      } else {
        const errorData = await res.json();
        alert(errorData.message || "Erro ao atualizar perfil. Tente novamente.");
      }
    } catch (error) {
      console.error(error);
      alert("Erro ao conectar com o servidor.");
    } finally {
      setEditLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!showDeleteConfirm) {
      setShowDeleteConfirm(true);
      return;
    }

    if (!artist) return;

    setDeleteLoading(true);
    try {
      const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
      const token = localStorage.getItem("authToken");
      const artistId = artist._id || artist.id;

      const res = await fetch(`${BACKEND_URL}/api/artists/${artistId}`, {
        method: "DELETE",
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (res.ok) {
        alert("✅ Conta excluída com sucesso! Seus dados foram removidos da plataforma.");
        localStorage.removeItem("authToken");
        localStorage.removeItem("artistData");
        router.push("/");
      } else {
        const data = await res.json();
        alert(data.message || "Erro ao excluir conta. Tente novamente.");
      }
    } catch (error) {
      console.error(error);
      alert("Erro ao conectar com o servidor.");
    } finally {
      setDeleteLoading(false);
      setShowDeleteConfirm(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1e3a8a] mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando seus dados...</p>
        </div>
      </div>
    );
  }

  if (!artist) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Acesso Restrito</h2>
          <p className="text-gray-600 mb-6">Você precisa estar logado para acessar esta página.</p>
          <a href="/artistLogin" className="bg-[#1e3a8a] text-white px-6 py-3 rounded hover:bg-[#15306e] transition inline-block">
            Fazer Login
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-[#1e3a8a] text-white px-4 lg:px-40 py-4">
        <div className="flex items-center gap-4">
          <button onClick={() => router.push("/dashboard")} className="hover:opacity-80 transition">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-xl font-bold">Configurações</h1>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-4">
              <button
                onClick={() => setActiveTab('profile')}
                className={`w-full text-left px-4 py-3 rounded-lg mb-2 transition ${
                  activeTab === 'profile' 
                    ? 'bg-[#1e3a8a] text-white' 
                    : 'hover:bg-gray-100'
                }`}
              >
                👤 Meu Perfil
              </button>
              <button
                onClick={() => setActiveTab('edit')}
                className={`w-full text-left px-4 py-3 rounded-lg mb-2 transition ${
                  activeTab === 'edit' 
                    ? 'bg-[#1e3a8a] text-white' 
                    : 'hover:bg-gray-100'
                }`}
              >
                ✏️ Editar Perfil
              </button>
              <button
                onClick={() => setActiveTab('delete')}
                className={`w-full text-left px-4 py-3 rounded-lg transition ${
                  activeTab === 'delete' 
                    ? 'bg-red-600 text-white' 
                    : 'hover:bg-red-50 text-red-600'
                }`}
              >
                🗑️ Excluir Conta
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-md p-6">
              {activeTab === 'profile' && (
                <div>
                  <h2 className="text-2xl font-bold text-[#1e3a8a] mb-6">Meu Perfil</h2>
                  
                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-8">
                    {artist.profilePicture ? (
                      <img 
                        src={artist.profilePicture} 
                        alt={artist.name}
                        className="w-32 h-32 rounded-full object-cover border-4 border-[#1e3a8a] shadow-lg"
                      />
                    ) : (
                      <div className="w-32 h-32 rounded-full bg-[#1e3a8a] flex items-center justify-center text-white text-5xl font-bold shadow-lg">
                        {artist.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                    
                    <div className="flex-1 text-center sm:text-left">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{artist.name}</h3>
                      <p className="text-gray-600 mb-1">{artist.email}</p>
                      <p className="text-gray-600">{artist.phone}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-sm font-semibold text-gray-700">Identidade de Gênero</label>
                      <p className="text-gray-900">{artist.gender}</p>
                    </div>
                    
                    {artist.birthDate && (
                      <div>
                        <label className="text-sm font-semibold text-gray-700">Data de Nascimento</label>
                          <p className="text-gray-900">
                            {new Date(artist.birthDate + 'T12:00:00').toLocaleDateString('pt-BR')}
                          </p>
                      </div>
                    )}

                    <div className="md:col-span-2">
                      <label className="text-sm font-semibold text-gray-700">Categorias</label>
                      <div className="flex gap-2 flex-wrap mt-2">
                        {artist.categories && artist.categories.length > 0 ? (
                          artist.categories.map((cat) => (
                            <span key={cat} className="bg-[#1e3a8a] text-white px-3 py-1 rounded-full text-sm">
                              {cat}
                            </span>
                          ))
                        ) : (
                          <span className="text-gray-500 text-sm">Nenhuma categoria</span>
                        )}
                      </div>
                    </div>

                    <div className="md:col-span-2">
                      <label className="text-sm font-semibold text-gray-700">Marcadores Sociais</label>
                      <ul className="mt-2 space-y-1">
                        {artist.lgbtqiapn && <li className="text-gray-900">✓ LGBTQIA+</li>}
                        {artist.black && <li className="text-gray-900">✓ Pessoa Negra</li>}
                        {artist.indigenous && <li className="text-gray-900">✓ Pessoa Indígena</li>}
                        {artist.pcd && <li className="text-gray-900">✓ Pessoa com Deficiência (PcD)</li>}
                        {!artist.lgbtqiapn && !artist.black && !artist.indigenous && !artist.pcd && (
                          <li className="text-gray-500">Nenhum marcador informado</li>
                        )}
                      </ul>
                    </div>

                    {artist.portfolioLink && (
                      <div>
                        <label className="text-sm font-semibold text-gray-700">Portfólio</label>
                        <a href={artist.portfolioLink} target="_blank" rel="noopener noreferrer" className="text-[#1e3a8a] hover:underline block truncate">
                          {artist.portfolioLink}
                        </a>
                      </div>
                    )}

                    {artist.resumeLink && (
                      <div>
                        <label className="text-sm font-semibold text-gray-700">Currículo</label>
                        <a href={artist.resumeLink} target="_blank" rel="noopener noreferrer" className="text-[#1e3a8a] hover:underline block truncate">
                          {artist.resumeLink}
                        </a>
                      </div>
                    )}

                    {artist.socialLink && (
                      <div className="md:col-span-2">
                        <label className="text-sm font-semibold text-gray-700">Rede Social</label>
                        <a href={artist.socialLink} target="_blank" rel="noopener noreferrer" className="text-[#1e3a8a] hover:underline block truncate">
                          {artist.socialLink}
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'edit' && (
                <div>
                  <h2 className="text-2xl font-bold text-[#1e3a8a] mb-6">Editar Perfil</h2>
                  
                  <div className="space-y-6">
                    {/* Foto de Perfil */}
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
                    </div>

                    {/* Nome */}
                    <div>
                      <label className="block font-semibold text-gray-700 mb-2">Nome Completo *</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]"
                        required
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block font-semibold text-gray-700 mb-2">E-mail *</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]"
                        required
                      />
                    </div>

                    {/* Telefone */}
                    <div>
                      <label className="block font-semibold text-gray-700 mb-2">Telefone / WhatsApp *</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                        placeholder="(00) 00000-0000"
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]"
                        required
                      />
                    </div>

                    {/* Data de Nascimento */}
                    <div>
                      <label className="block font-semibold text-gray-700 mb-2">Data de Nascimento *</label>
                      <input
                        type="date"
                        value={formData.birthDate}
                        onChange={(e) => setFormData(prev => ({ ...prev, birthDate: e.target.value }))}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]"
                        required
                      />
                    </div>

                    {/* Gênero */}
                    <div>
                      <label className="block font-semibold text-gray-700 mb-2">Identidade de Gênero *</label>
                      <select 
                        value={formData.gender}
                        onChange={(e) => setFormData(prev => ({ ...prev, gender: e.target.value }))}
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

                    {/* Marcadores Sociais */}
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <p className="font-semibold text-gray-700 mb-4">Marcadores Sociais (opcional)</p>
                      <div className="space-y-3">
                        <label className="flex items-center gap-3 cursor-pointer hover:bg-white p-3 rounded transition">
                          <input 
                            type="checkbox" 
                            checked={formData.lgbtqiapn}
                            onChange={(e) => setFormData(prev => ({ ...prev, lgbtqiapn: e.target.checked }))}
                            className="w-5 h-5 text-[#1e3a8a] rounded"
                          />
                          <span className="text-gray-700">Pessoa LGBTQIAPN+</span>
                        </label>
                        <label className="flex items-center gap-3 cursor-pointer hover:bg-white p-3 rounded transition">
                          <input 
                            type="checkbox" 
                            checked={formData.black}
                            onChange={(e) => setFormData(prev => ({ ...prev, black: e.target.checked }))}
                            className="w-5 h-5 text-[#1e3a8a] rounded"
                          />
                          <span className="text-gray-700">Pessoa negra (pretas e pardas)</span>
                        </label>
                        <label className="flex items-center gap-3 cursor-pointer hover:bg-white p-3 rounded transition">
                          <input 
                            type="checkbox" 
                            checked={formData.indigenous}
                            onChange={(e) => setFormData(prev => ({ ...prev, indigenous: e.target.checked }))}
                            className="w-5 h-5 text-[#1e3a8a] rounded"
                          />
                          <span className="text-gray-700">Pessoa indígena</span>
                        </label>
                        <label className="flex items-center gap-3 cursor-pointer hover:bg-white p-3 rounded transition">
                          <input 
                            type="checkbox" 
                            checked={formData.pcd}
                            onChange={(e) => setFormData(prev => ({ ...prev, pcd: e.target.checked }))}
                            className="w-5 h-5 text-[#1e3a8a] rounded"
                          />
                          <span className="text-gray-700">Pessoa com deficiência</span>
                        </label>
                      </div>
                    </div>

                    {/* Categorias */}
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <p className="font-semibold text-gray-700 mb-4">
                        Categorias Artísticas *
                        {formData.categories.length > 0 && (
                          <span className="text-[#F59E0B] ml-2">({formData.categories.length} selecionadas)</span>
                        )}
                      </p>
                      <div className="grid grid-cols-2 gap-3">
                        {["Arquitetura", "Arte digital", "Artesanato", "Cinema", "Dança", "Design", "Escultura", "Fotografia", "História em quadrinhos", "Jogos eletrônicos", "Literatura", "Música", "Pintura", "Teatro"].map((cat) => (
                          <label key={cat} className="flex items-center gap-3 cursor-pointer hover:bg-white p-3 rounded transition">
                            <input 
                              type="checkbox" 
                              checked={formData.categories.includes(cat)}
                              onChange={() => handleCategoryToggle(cat)}
                              className="w-5 h-5 text-[#1e3a8a] rounded"
                            />
                            <span className="text-gray-700">{cat}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Links */}
                    <div>
                      <label className="block font-semibold text-gray-700 mb-2">Link do Portfólio *</label>
                      <input
                        type="url"
                        value={formData.portfolioLink}
                        onChange={(e) => setFormData(prev => ({ ...prev, portfolioLink: e.target.value }))}
                        placeholder="https://seu-portfolio.com"
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]"
                        required
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-gray-700 mb-2">Link do Currículo *</label>
                      <input
                        type="url"
                        value={formData.resumeLink}
                        onChange={(e) => setFormData(prev => ({ ...prev, resumeLink: e.target.value }))}
                        placeholder="https://seu-curriculo.com"
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]"
                        required
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-gray-700 mb-2">Link da Rede Social</label>
                      <input
                        type="url"
                        value={formData.socialLink}
                        onChange={(e) => setFormData(prev => ({ ...prev, socialLink: e.target.value }))}
                        placeholder="https://instagram.com/seu-perfil"
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]"
                      />
                    </div>

                    {/* Botões */}
                    <div className="flex gap-4 pt-4">
                      <button
                        type="button"
                        onClick={() => setActiveTab('profile')}
                        className="flex-1 bg-gray-300 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-400 transition font-semibold"
                      >
                        Cancelar
                      </button>
                      <button
                        onClick={handleUpdateProfile}
                        disabled={editLoading}
                        className="flex-1 bg-[#F59E0B] text-white px-6 py-3 rounded-lg hover:bg-[#D97706] transition font-semibold disabled:opacity-50"
                      >
                        {editLoading ? "Salvando..." : "Salvar Alterações"}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'delete' && (
                <div>
                  <h2 className="text-2xl font-bold text-red-600 mb-6">Excluir Conta</h2>
                  
                  <div className="bg-red-50 border-l-4 border-red-600 p-4 mb-6">
                    <div className="flex">
                      <svg className="w-6 h-6 text-red-600 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      <div>
                        <h3 className="text-red-800 font-semibold mb-2">⚠️ Atenção!</h3>
                        <p className="text-red-700 text-sm">
                          Esta ação é <strong>irreversível</strong>. Todos os seus dados serão permanentemente excluídos de nossa plataforma conforme seus direitos LGPD.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 mb-6">
                    <p className="text-gray-700 font-semibold">Ao excluir sua conta, você perderá:</p>
                    <ul className="list-disc list-inside space-y-2 text-gray-600">
                      <li>Seu perfil público e informações pessoais</li>
                      <li>Suas categorias artísticas e marcadores sociais</li>
                      <li>Links do portfólio, currículo e redes sociais</li>
                      <li>Acesso à plataforma Nós Cultural</li>
                      <li>Visibilidade para produtores e público</li>
                    </ul>
                  </div>

                  {!showDeleteConfirm ? (
                    <button
                      onClick={() => setShowDeleteConfirm(true)}
                      className="bg-red-600 text-white px-6 py-3 rounded hover:bg-red-700 transition font-semibold"
                    >
                      Excluir Minha Conta
                    </button>
                  ) : (
                    <div className="space-y-4">
                      <p className="font-semibold text-gray-900 text-lg">Tem certeza absoluta?</p>
                      <p className="text-gray-600">Digite <strong>EXCLUIR</strong> para confirmar:</p>
                      <div className="flex gap-4">
                        <button
                          onClick={handleDelete}
                          disabled={deleteLoading}
                          className="bg-red-600 text-white px-6 py-3 rounded hover:bg-red-700 transition font-semibold disabled:opacity-50"
                        >
                          {deleteLoading ? "Excluindo..." : "Sim, Excluir Permanentemente"}
                        </button>
                        <button
                          onClick={() => setShowDeleteConfirm(false)}
                          className="bg-gray-300 text-gray-800 px-6 py-3 rounded hover:bg-gray-400 transition font-semibold"
                        >
                          Cancelar
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}