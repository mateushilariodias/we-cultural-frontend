"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

interface Equipment {
  _id: string;
  name: string;
  cnpj: string;
  foundationYear?: string;
  responsible: string;
  phone: string;
  email: string;
  website?: string;
  rua: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
  category: string[];
  description?: string;
  logo?: string;
}

export default function EquipmentDashboard() {
  const params = useParams();
  const router = useRouter();
  const equipmentId = params.id as string;
  
  const [activeTab, setActiveTab] = useState("overview");
  const [equipment, setEquipment] = useState<Equipment | null>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<Partial<Equipment>>({});

  // Buscar dados do equipamento
  useEffect(() => {
    const fetchEquipment = async () => {
      try {
        const res = await fetch(`${API_URL}/api/equipments/${equipmentId}`);
        if (!res.ok) throw new Error('Equipamento não encontrado');
        const data = await res.json();
        setEquipment(data);
        setFormData(data);
      } catch (error) {
        console.error('Erro ao buscar equipamento:', error);
        alert('Erro ao carregar dados do equipamento');
        router.push('/');
      } finally {
        setLoading(false);
      }
    };

    fetchEquipment();
  }, [equipmentId, router]);

  const handleSave = async () => {
    try {
      const res = await fetch(`${API_URL}/api/equipments/${equipmentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Erro ao atualizar');
      
      const updated = await res.json();
      setEquipment(updated);
      alert('✅ Equipamento atualizado com sucesso!');
    } catch (error) {
      console.error('Erro ao atualizar:', error);
      alert('❌ Erro ao atualizar equipamento');
    }
  };

  const handleDelete = async () => {
    if (!confirm('⚠️ Tem certeza que deseja excluir este equipamento? Esta ação não pode ser desfeita.')) {
      return;
    }

    try {
      const res = await fetch(`${API_URL}/api/equipments/${equipmentId}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Erro ao excluir');
      
      alert('✅ Equipamento excluído com sucesso!');
      router.push('/');
    } catch (error) {
      console.error('Erro ao excluir:', error);
      alert('❌ Erro ao excluir equipamento');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('equipmentToken');
    localStorage.removeItem('equipmentData');
    router.push('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-700 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!equipment) return null;

  const tabs = [
    { id: "overview", label: "Visão Geral", icon: "📊" },
    { id: "edit", label: "Editar Perfil", icon: "✏️" },
    { id: "location", label: "Localização", icon: "📍" },
    { id: "settings", label: "Configurações", icon: "⚙️" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-purple-700 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-lg bg-purple-100 flex items-center justify-center overflow-hidden">
                {equipment.logo ? (
                  <img src={equipment.logo} alt="Logo" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-3xl">🏛️</span>
                )}
              </div>
              <div>
                <h1 className="text-2xl font-bold">{equipment.name}</h1>
                <p className="text-purple-100">Dashboard do Equipamento Cultural</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleLogout}
                className="bg-purple-800 text-white px-4 py-2 rounded-lg hover:bg-purple-900 transition font-semibold"
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
                    ? "text-purple-700 border-b-4 border-purple-700"
                    : "text-gray-600 hover:text-purple-600"
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
                    <p className="text-gray-600 text-sm">Categorias</p>
                    <p className="text-3xl font-bold text-purple-700">{equipment.category.length}</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl">🎭</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Fundação</p>
                    <p className="text-3xl font-bold text-purple-700">{equipment.foundationYear || 'N/A'}</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl">📅</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">Status</p>
                    <p className="text-xl font-bold text-purple-700">Ativo</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-2xl">✅</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Informações do Equipamento */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Sobre o Equipamento</h2>
              <div className="space-y-4">
                {equipment.description && (
                  <div>
                    <p className="text-sm text-gray-600">Descrição</p>
                    <p className="text-gray-800">{equipment.description}</p>
                  </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">CNPJ</p>
                    <p className="text-gray-800">{equipment.cnpj}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Responsável</p>
                    <p className="text-gray-800">{equipment.responsible}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Telefone</p>
                    <p className="text-gray-800">{equipment.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">E-mail</p>
                    <p className="text-gray-800">{equipment.email}</p>
                  </div>
                </div>
                {equipment.website && (
                  <div>
                    <p className="text-sm text-gray-600">Website</p>
                    <a href={equipment.website} target="_blank" rel="noopener noreferrer" className="text-purple-700 hover:underline">
                      {equipment.website}
                    </a>
                  </div>
                )}
                <div>
                  <p className="text-sm text-gray-600 mb-2">Categorias</p>
                  <div className="flex flex-wrap gap-2">
                    {equipment.category.map(cat => (
                      <span key={cat} className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">
                        {cat}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Ações Rápidas */}
            <div className="bg-gradient-to-r from-purple-700 to-purple-900 rounded-xl shadow-md p-6 text-white">
              <h2 className="text-xl font-bold mb-4">🚀 Ações Rápidas</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button 
                  onClick={() => setActiveTab('edit')}
                  className="bg-white text-purple-700 px-4 py-3 rounded-lg hover:bg-purple-50 transition font-semibold text-left"
                >
                  ✏️ Editar Informações
                </button>
                <button 
                  onClick={() => setActiveTab('location')}
                  className="bg-white text-purple-700 px-4 py-3 rounded-lg hover:bg-purple-50 transition font-semibold text-left"
                >
                  📍 Ver Localização
                </button>
                <button 
                  onClick={() => setActiveTab('settings')}
                  className="bg-white text-purple-700 px-4 py-3 rounded-lg hover:bg-purple-50 transition font-semibold text-left"
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
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Editar Informações do Equipamento</h2>
            <div className="space-y-6">
              <div>
                <label className="block font-semibold text-gray-700 mb-2">Nome do Equipamento</label>
                <input
                  type="text"
                  value={formData.name || ''}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-2">Descrição</label>
                <textarea
                  value={formData.description || ''}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  rows={4}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-semibold text-gray-700 mb-2">CNPJ</label>
                  <input
                    type="text"
                    value={formData.cnpj || ''}
                    onChange={(e) => setFormData({...formData, cnpj: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-600"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-2">Responsável</label>
                  <input
                    type="text"
                    value={formData.responsible || ''}
                    onChange={(e) => setFormData({...formData, responsible: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-600"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-2">Telefone</label>
                  <input
                    type="tel"
                    value={formData.phone || ''}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-600"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-2">E-mail</label>
                  <input
                    type="email"
                    value={formData.email || ''}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-600"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-2">Website</label>
                <input
                  type="url"
                  value={formData.website || ''}
                  onChange={(e) => setFormData({...formData, website: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>

              <div className="flex gap-4">
                <button 
                  onClick={handleSave}
                  className="flex-1 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition font-semibold"
                >
                  💾 Salvar Alterações
                </button>
                <button 
                  onClick={() => setFormData(equipment)}
                  className="bg-gray-300 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-400 transition font-semibold"
                >
                  ❌ Cancelar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* LOCALIZAÇÃO */}
        {activeTab === "location" && (
          <div className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">📍 Localização</h2>
            <div className="space-y-4">
              <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                <p className="text-lg font-semibold text-purple-900 mb-2">Endereço Completo</p>
                <p className="text-gray-700">
                  {equipment.rua}<br />
                  {equipment.bairro}<br />
                  {equipment.cidade} - {equipment.estado}<br />
                  CEP: {equipment.cep}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                <div>
                  <label className="block font-semibold text-gray-700 mb-2">Rua</label>
                  <input
                    type="text"
                    value={formData.rua || ''}
                    onChange={(e) => setFormData({...formData, rua: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-600"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-2">Bairro</label>
                  <input
                    type="text"
                    value={formData.bairro || ''}
                    onChange={(e) => setFormData({...formData, bairro: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-600"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-2">Cidade</label>
                  <input
                    type="text"
                    value={formData.cidade || ''}
                    onChange={(e) => setFormData({...formData, cidade: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-600"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-2">Estado</label>
                  <input
                    type="text"
                    value={formData.estado || ''}
                    onChange={(e) => setFormData({...formData, estado: e.target.value})}
                    maxLength={2}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-600"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-2">CEP</label>
                  <input
                    type="text"
                    value={formData.cep || ''}
                    onChange={(e) => setFormData({...formData, cep: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-600"
                  />
                </div>
              </div>

              <button 
                onClick={handleSave}
                className="w-full bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition font-semibold mt-4"
              >
                💾 Atualizar Endereço
              </button>
            </div>
          </div>
        )}

        {/* CONFIGURAÇÕES */}
        {activeTab === "settings" && (
          <div className="space-y-6">
            <div className="bg-red-50 border-2 border-red-200 rounded-xl shadow-md p-8">
              <h2 className="text-2xl font-bold text-red-700 mb-4">⚠️ Zona de Perigo</h2>
              <p className="text-gray-700 mb-6">
                Ao excluir o equipamento cultural, todos os dados serão permanentemente removidos. Esta ação não pode ser desfeita.
              </p>
              <button 
                onClick={handleDelete}
                className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition font-semibold"
              >
                🗑️ Excluir Equipamento
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}