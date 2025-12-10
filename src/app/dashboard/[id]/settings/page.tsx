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
                        <p className="text-gray-900">{new Date(artist.birthDate).toLocaleDateString('pt-BR')}</p>
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
                  <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
                    <p className="text-blue-700">
                      🚧 <strong>Funcionalidade em desenvolvimento</strong>
                    </p>
                    <p className="text-blue-600 text-sm mt-2">
                      Em breve você poderá editar suas informações diretamente por aqui. 
                    </p>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Por enquanto, entre em contato conosco para fazer alterações no seu perfil:
                  </p>
                  <div className="space-y-2 mb-6">
                    <p className="text-gray-700">📧 <strong>E-mail:</strong> gabriel.ssmc@outlook.com</p>
                    <p className="text-gray-700">📱 <strong>Telefone:</strong> (16) 99119-0429</p>
                  </div>
                  <a 
                    href="mailto:gabriel.ssmc@outlook.com?subject=Solicitação de alteração de perfil - Nós Cultural"
                    className="inline-block bg-[#1e3a8a] text-white px-6 py-3 rounded hover:bg-[#15306e] transition"
                  >
                    Enviar E-mail de Suporte
                  </a>
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