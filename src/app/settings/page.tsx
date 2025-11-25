"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { API_ENDPOINTS } from "@/config/api";

export default function ArtistSettings() {
  const router = useRouter();
  const { artist, logout, refreshArtist } = useAuth();
  const [activeTab, setActiveTab] = useState<'profile' | 'edit' | 'delete'>('profile');
  const [loading, setLoading] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  if (!artist) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Acesso Restrito</h2>
          <p className="text-gray-600 mb-6">Você precisa estar logado para acessar esta página.</p>
          <a href="/artistLogin" className="bg-[#1e3a8a] text-white px-6 py-3 rounded hover:bg-[#15306e] transition">
            Fazer Login
          </a>
        </div>
      </div>
    );
  }

  const handleDelete = async () => {
    if (!showDeleteConfirm) {
      setShowDeleteConfirm(true);
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(API_ENDPOINTS.artistById(artist._id), {
        method: "DELETE",
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (res.ok) {
        alert("Conta excluída com sucesso!");
        logout();
        router.push("/");
      } else {
        alert("Erro ao excluir conta. Tente novamente.");
      }
    } catch (error) {
      console.error(error);
      alert("Erro ao conectar com o servidor.");
    } finally {
      setLoading(false);
      setShowDeleteConfirm(false);
    }
  };

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
                        {artist.categories?.map((cat) => (
                          <span key={cat} className="bg-[#1e3a8a] text-white px-3 py-1 rounded-full text-sm">
                            {cat}
                          </span>
                        ))}
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
                  <p className="text-gray-600 mb-4">
                    Esta funcionalidade estará disponível em breve. Por enquanto, entre em contato com o suporte para fazer alterações.
                  </p>
                  <button className="bg-[#1e3a8a] text-white px-6 py-3 rounded hover:bg-[#15306e] transition">
                    Contatar Suporte
                  </button>
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
                        <h3 className="text-red-800 font-semibold mb-2">Atenção!</h3>
                        <p className="text-red-700 text-sm">
                          Esta ação é <strong>irreversível</strong>. Todos os seus dados serão permanentemente excluídos de nossa plataforma.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 mb-6">
                    <p className="text-gray-700">Ao excluir sua conta, você perderá:</p>
                    <ul className="list-disc list-inside space-y-2 text-gray-600">
                      <li>Seu perfil e informações pessoais</li>
                      <li>Suas categorias e marcadores sociais</li>
                      <li>Links do portfólio e currículo</li>
                      <li>Acesso à plataforma</li>
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
                      <p className="font-semibold text-gray-900">Tem certeza absoluta?</p>
                      <div className="flex gap-4">
                        <button
                          onClick={handleDelete}
                          disabled={loading}
                          className="bg-red-600 text-white px-6 py-3 rounded hover:bg-red-700 transition font-semibold disabled:opacity-50"
                        >
                          {loading ? "Excluindo..." : "Sim, Excluir Permanentemente"}
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