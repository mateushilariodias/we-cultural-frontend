"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

interface Collective {
  _id: string;
  name: string;
  description: string;
  phone: string;
  socialLink: string;
  numMembers: number;
  memberNames: string[];
  categories: string[];
  profilePicture?: string;
}

export default function CollectiveDashboard() {
  const params = useParams();
  const router = useRouter();
  const collectiveId = params.id as string;
  
  const [activeTab, setActiveTab] = useState("overview");
  const [collective, setCollective] = useState<Collective | null>(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState<Partial<Collective>>({});

  // Buscar dados do coletivo
  useEffect(() => {
    const fetchCollective = async () => {
      try {
        const res = await fetch(`${API_URL}/api/collectives/${collectiveId}`);
        if (!res.ok) throw new Error('Coletivo não encontrado');
        const data = await res.json();
        setCollective(data);
        setFormData(data);
      } catch (error) {
        console.error('Erro ao buscar coletivo:', error);
        alert('Erro ao carregar dados do coletivo');
        router.push('/');
      } finally {
        setLoading(false);
      }
    };

    fetchCollective();
  }, [collectiveId, router]);

  const handleSave = async () => {
    try {
      const res = await fetch(`${API_URL}/api/collectives/${collectiveId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Erro ao atualizar');
      
      const updated = await res.json();
      setCollective(updated);
      setEditMode(false);
      alert('✅ Coletivo atualizado com sucesso!');
    } catch (error) {
      console.error('Erro ao atualizar:', error);
      alert('❌ Erro ao atualizar coletivo');
    }
  };

  const handleDelete = async () => {
    if (!confirm('⚠️ Tem certeza que deseja excluir este coletivo? Esta ação não pode ser desfeita.')) {
      return;
    }

    try {
      const res = await fetch(`${API_URL}/api/collectives/${collectiveId}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Erro ao excluir');
      
      alert('✅ Coletivo excluído com sucesso!');
      router.push('/');
    } catch (error) {
      console.error('Erro ao excluir:', error);
      alert('❌ Erro ao excluir coletivo');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('collectiveToken');
    localStorage.removeItem('collectiveData');
    router.push('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-700 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!collective) return null;

  const tabs = [
    { id: "overview", label: "Visão Geral", icon: "📊" },
    { id: "edit", label: "Editar Perfil", icon: "✏️" },
    { id: "members", label: "Membros", icon: "👥" },
    { id: "settings", label: "Configurações", icon: "⚙️" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-green-700 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center overflow-hidden">
                {collective.profilePicture ? (
                  <img src={collective.profilePicture} alt="Logo" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-3xl">👥</span>
                )}
              </div>
              <div>
                <h1 className="text-2xl font-bold">{collective.name}</h1>
                <p className="text-green-100">Dashboard do Coletivo</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleLogout}
                className="bg-green-800 text-white px-4 py-2 rounded-lg hover:bg-green-900 transition font-semibold"
              >
                🚪 Sair
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white border-b shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-2 overflow-x-auto">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-4 font-semibold whitespace-nowrap transition ${
                  activeTab === tab.id
                    ? "text-green-700 border-b-4 border-green-700"
                    : "text-gray-600 hover:text-green-600"
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* VISÃO GERAL */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Membros</p>
                    <p className="text-3xl font-bold text-green-700">{collective.numMembers}</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl">👥</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Categorias</p>
                    <p className="text-3xl font-bold text-green-700">{collective.categories.length}</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl">🎨</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Status</p>
                    <p className="text-xl font-bold text-green-700">Ativo</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl">✅</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Informações do Coletivo */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Sobre o Coletivo</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600">Descrição</p>
                  <p className="text-gray-800">{collective.description}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Telefone</p>
                    <p className="text-gray-800">{collective.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Rede Social</p>
                    <a href={collective.socialLink} target="_blank" rel="noopener noreferrer" className="text-green-700 hover:underline">
                      {collective.socialLink}
                    </a>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-2">Categorias Artísticas</p>
                  <div className="flex flex-wrap gap-2">
                    {collective.categories.map(cat => (
                      <span key={cat} className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                        {cat}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Ações Rápidas */}
            <div className="bg-gradient-to-r from-green-700 to-green-900 rounded-xl shadow-md p-6 text-white">
              <h2 className="text-xl font-bold mb-4">🚀 Ações Rápidas</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button 
                  onClick={() => setActiveTab('edit')}
                  className="bg-white text-green-700 px-4 py-3 rounded-lg hover:bg-green-50 transition font-semibold text-left"
                >
                  ✏️ Editar Informações
                </button>
                <button 
                  onClick={() => setActiveTab('members')}
                  className="bg-white text-green-700 px-4 py-3 rounded-lg hover:bg-green-50 transition font-semibold text-left"
                >
                  👥 Gerenciar Membros
                </button>
                <button 
                  onClick={() => setActiveTab('settings')}
                  className="bg-white text-green-700 px-4 py-3 rounded-lg hover:bg-green-50 transition font-semibold text-left"
                >
                  ⚙️ Configurações
                </button>
              </div>
            </div>
          </div>
        )}

        {/* EDITAR PERFIL */}
        {activeTab === "edit" && (
          <div className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Editar Informações do Coletivo</h2>
            <div className="space-y-6">
              <div>
                <label className="block font-semibold text-gray-700 mb-2">Nome do Coletivo</label>
                <input
                  type="text"
                  value={formData.name || ''}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-600"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-2">Descrição</label>
                <textarea
                  value={formData.description || ''}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  rows={4}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-600"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-semibold text-gray-700 mb-2">Telefone</label>
                  <input
                    type="tel"
                    value={formData.phone || ''}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-600"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-2">Rede Social</label>
                  <input
                    type="url"
                    value={formData.socialLink || ''}
                    onChange={(e) => setFormData({...formData, socialLink: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-600"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-2">Número de Membros</label>
                <input
                  type="number"
                  value={formData.numMembers || 0}
                  onChange={(e) => setFormData({...formData, numMembers: parseInt(e.target.value)})}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-600"
                />
              </div>

              <div className="flex gap-4">
                <button 
                  onClick={handleSave}
                  className="flex-1 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition font-semibold"
                >
                  💾 Salvar Alterações
                </button>
                <button 
                  onClick={() => {
                    setFormData(collective);
                    setEditMode(false);
                  }}
                  className="bg-gray-300 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-400 transition font-semibold"
                >
                  ❌ Cancelar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* MEMBROS */}
        {activeTab === "members" && (
          <div className="bg-white rounded-xl shadow-md p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Membros do Coletivo</h2>
              <p className="text-gray-600">Total: <strong>{collective.numMembers}</strong> membros</p>
            </div>
            {collective.memberNames && collective.memberNames.length > 0 ? (
              <div className="space-y-3">
                {collective.memberNames.map((member, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-green-700 font-bold">{member[0]?.toUpperCase()}</span>
                      </div>
                      <span className="font-medium text-gray-800">{member}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <p className="text-xl mb-2">👥</p>
                <p>Nenhum membro cadastrado ainda</p>
              </div>
            )}
          </div>
        )}

        {/* CONFIGURAÇÕES */}
        {activeTab === "settings" && (
          <div className="space-y-6">
            <div className="bg-red-50 border-2 border-red-200 rounded-xl shadow-md p-8">
              <h2 className="text-2xl font-bold text-red-700 mb-4">⚠️ Zona de Perigo</h2>
              <p className="text-gray-700 mb-6">
                Ao excluir o coletivo, todos os dados serão permanentemente removidos. Esta ação não pode ser desfeita.
              </p>
              <button 
                onClick={handleDelete}
                className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition font-semibold"
              >
                🗑️ Excluir Coletivo
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}