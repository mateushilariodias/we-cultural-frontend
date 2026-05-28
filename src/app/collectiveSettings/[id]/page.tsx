"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { API_URL } from "@/config/api";

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

interface FormErrors {
  [key: string]: string;
}

export default function CollectiveDashboard() {
  const params = useParams();
  const router = useRouter();
  const collectiveId = params.id as string;
  
  const [activeTab, setActiveTab] = useState("overview");
  const [collective, setCollective] = useState<Collective | null>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<Partial<Collective>>({});
  const [errors, setErrors] = useState<FormErrors>({});
  const [newMemberName, setNewMemberName] = useState("");
  const [editingMemberId, setEditingMemberId] = useState<number | null>(null);
  const [editingMemberName, setEditingMemberName] = useState("");

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

  // ===== VALIDAÇÕES =====

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

  // Validar nome
  const isValidName = (name: string): boolean => {
    return name.length >= 3 && /^[a-zA-Z0-9\s\-áéíóúâêôãõçÁÉÍÓÚÂÊÔÃÕÇ]+$/.test(name);
  };

  // ===== FUNÇÕES DE MEMBROS =====

  const addMember = () => {
    const trimmedName = newMemberName.trim();
    
    // Validação
    if (!trimmedName) {
      alert("Por favor, insira o nome do membro");
      return;
    }

    if (!isValidName(trimmedName)) {
      alert("Nome deve ter mínimo 3 caracteres (apenas letras, números e hífens)");
      return;
    }

    if (collective?.memberNames.includes(trimmedName)) {
      alert("Este membro já está cadastrado");
      return;
    }

    // Adicionar membro
    const updatedMembers = [...(collective?.memberNames || []), trimmedName];
    setCollective(prev => prev ? { ...prev, memberNames: updatedMembers } : null);
    setFormData(prev => ({ ...prev, memberNames: updatedMembers }));
    setNewMemberName("");
  };

  const removeMember = (index: number) => {
    if (!collective) return;

    if (!confirm(`Tem certeza que deseja remover "${collective.memberNames[index]}"?`)) {
      return;
    }

    const updatedMembers = collective.memberNames.filter((_, i) => i !== index);
    setCollective(prev => prev ? { ...prev, memberNames: updatedMembers } : null);
    setFormData(prev => ({ ...prev, memberNames: updatedMembers }));
  };

  const startEditMember = (index: number) => {
    setEditingMemberId(index);
    setEditingMemberName(collective?.memberNames[index] || "");
  };

  const cancelEditMember = () => {
    setEditingMemberId(null);
    setEditingMemberName("");
  };

  const saveMemberEdit = (index: number) => {
    const trimmedName = editingMemberName.trim();

    if (!trimmedName) {
      alert("Nome não pode ser vazio");
      return;
    }

    if (!isValidName(trimmedName)) {
      alert("Nome deve ter mínimo 3 caracteres (apenas letras, números e hífens)");
      return;
    }

    if (collective && trimmedName !== collective.memberNames[index]) {
      if (collective.memberNames.includes(trimmedName)) {
        alert("Já existe um membro com este nome");
        return;
      }
    }

    if (!collective) return;

    const updatedMembers = [...collective.memberNames];
    updatedMembers[index] = trimmedName;
    setCollective(prev => prev ? { ...prev, memberNames: updatedMembers } : null);
    setFormData(prev => ({ ...prev, memberNames: updatedMembers }));
    setEditingMemberId(null);
    setEditingMemberName("");
  };

  // ===== SALVAR ALTERAÇÕES =====

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name || !formData.name.trim()) {
      newErrors.name = "Nome do coletivo é obrigatório";
    }

    if (!formData.description || formData.description.trim().length < 20) {
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
      newErrors.socialLink = "URL inválida";
    }

    if (!formData.numMembers || formData.numMembers < 1) {
      newErrors.numMembers = "Número mínimo de membros: 1";
    } else if (formData.numMembers > 999) {
      newErrors.numMembers = "Número máximo de membros: 999";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updateField = (field: keyof Collective, value: any) => {
    let formattedValue = value;

    if (field === 'phone') {
      formattedValue = formatPhone(value);
    } else if (field === 'numMembers') {
      const num = parseInt(value) || 1;
      formattedValue = Math.max(1, Math.min(999, num));
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-greenPrimary mx-auto mb-4"></div>
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
      <header className="bg-greenPrimary text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16 rounded-full bg-white bg-opacity-20 flex items-center justify-center overflow-hidden">
                {collective.profilePicture ? (
                  <Image src={collective.profilePicture} alt="Logo" fill sizes="64px" className="object-cover" />
                ) : (
                  <span className="text-3xl">👥</span>
                )}
              </div>
              <div>
                <h1 className="text-2xl font-bold">{collective.name}</h1>
                <p className="text-white text-opacity-80">Dashboard do Coletivo</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleLogout}
                className="bg-white bg-opacity-20 text-gray-600 px-4 py-2 rounded-lg hover:bg-opacity-30 transition font-semibold"
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
                    ? "text-greenPrimary border-b-4 border-greenPrimary"
                    : "text-gray-600 hover:text-greenPrimary"
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
                    <p className="text-3xl font-bold text-greenPrimary">{collective.numMembers}</p>
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
                    <p className="text-3xl font-bold text-greenPrimary">{collective.categories.length}</p>
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
                    <p className="text-xl font-bold text-greenPrimary">Ativo</p>
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
                    <a href={collective.socialLink} target="_blank" rel="noopener noreferrer" className="text-greenPrimary hover:underline">
                      {collective.socialLink}
                    </a>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-2">Categorias Artísticas</p>
                  <div className="flex flex-wrap gap-2">
                    {collective.categories.map(cat => (
                      <span key={cat} className="bg-green-100 text-greenPrimary px-3 py-1 rounded-full text-sm">
                        {cat}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Ações Rápidas */}
            <div className="bg-gradient-to-r from-greenPrimary to-[#1a5f3f] rounded-xl shadow-md p-6 text-white">
              <h2 className="text-xl font-bold mb-4">🚀 Ações Rápidas</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button 
                  onClick={() => setActiveTab('edit')}
                  className="bg-white text-greenPrimary px-4 py-3 rounded-lg hover:bg-green-50 transition font-semibold text-left"
                >
                  ✏️ Editar Informações
                </button>
                <button 
                  onClick={() => setActiveTab('members')}
                  className="bg-white text-greenPrimary px-4 py-3 rounded-lg hover:bg-green-50 transition font-semibold text-left"
                >
                  👥 Gerenciar Membros
                </button>
                <button 
                  onClick={() => setActiveTab('settings')}
                  className="bg-white text-greenPrimary px-4 py-3 rounded-lg hover:bg-green-50 transition font-semibold text-left"
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
                <label className="block font-semibold text-gray-700 mb-2">Nome do Coletivo *</label>
                <input
                  type="text"
                  value={formData.name || ''}
                  onChange={(e) => updateField('name', e.target.value)}
                  className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-greenPrimary ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-2">Descrição * (mínimo 20 caracteres)</label>
                <textarea
                  value={formData.description || ''}
                  onChange={(e) => updateField('description', e.target.value)}
                  rows={4}
                  className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-greenPrimary ${errors.description ? 'border-red-500' : 'border-gray-300'}`}
                />
                <p className="text-xs text-gray-500 mt-1">{formData.description?.length || 0} caracteres</p>
                {errors.description && <p className="text-red-600 text-sm mt-1">{errors.description}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-semibold text-gray-700 mb-2">Telefone *</label>
                  <input
                    type="tel"
                    value={formData.phone || ''}
                    onChange={(e) => updateField('phone', e.target.value)}
                    placeholder="(00) 00000-0000"
                    className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-greenPrimary ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.phone && <p className="text-red-600 text-sm mt-1">{errors.phone}</p>}
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-2">Rede Social *</label>
                  <input
                    type="url"
                    value={formData.socialLink || ''}
                    onChange={(e) => updateField('socialLink', e.target.value)}
                    placeholder="https://instagram.com/seu-coletivo"
                    className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-greenPrimary ${errors.socialLink ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.socialLink && <p className="text-red-600 text-sm mt-1">{errors.socialLink}</p>}
                </div>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-2">Número de Membros * (1-999)</label>
                <input
                  type="number"
                  min="1"
                  max="999"
                  value={formData.numMembers || 0}
                  onChange={(e) => updateField('numMembers', parseInt(e.target.value) || 1)}
                  className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-greenPrimary ${errors.numMembers ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.numMembers && <p className="text-red-600 text-sm mt-1">{errors.numMembers}</p>}
              </div>

              <div className="flex gap-4 pt-4">
                <button 
                  onClick={handleSave}
                  className="flex-1 bg-greenPrimary text-white px-6 py-3 rounded-lg hover:opacity-90 transition font-semibold"
                >
                  💾 Salvar Alterações
                </button>
                <button 
                  onClick={() => {
                    setFormData(collective);
                    setErrors({});
                  }}
                  className="bg-gray-300 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-400 transition font-semibold"
                >
                  ❌ Cancelar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* MEMBROS - MELHORADO */}
        {activeTab === "members" && (
          <div className="space-y-6">
            {/* Adicionar novo membro */}
            <div className="bg-white rounded-xl shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Adicionar Novo Membro</h2>
              <div className="flex gap-3">
                <div className="flex-1">
                  <input
                    type="text"
                    value={newMemberName}
                    onChange={(e) => setNewMemberName(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && addMember()}
                    placeholder="Digite o nome do membro"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-greenPrimary"
                  />
                </div>
                <button
                  onClick={addMember}
                  className="bg-greenPrimary text-white px-6 py-3 rounded-lg hover:opacity-90 transition font-semibold whitespace-nowrap"
                >
                  ➕ Adicionar
                </button>
              </div>
            </div>

            {/* Lista de membros */}
            <div className="bg-white rounded-xl shadow-md p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Membros do Coletivo</h2>
                <p className="text-gray-600">Total: <strong>{collective.memberNames?.length || 0}</strong> membros</p>
              </div>
              
              {collective.memberNames && collective.memberNames.length > 0 ? (
                <div className="space-y-3">
                  {collective.memberNames.map((member, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
                      <div className="flex items-center gap-3 flex-1">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-greenPrimary font-bold">{member[0]?.toUpperCase()}</span>
                        </div>
                        
                        {editingMemberId === idx ? (
                          <input
                            type="text"
                            value={editingMemberName}
                            onChange={(e) => setEditingMemberName(e.target.value)}
                            className="flex-1 border border-greenPrimary rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-greenPrimary"
                            autoFocus
                          />
                        ) : (
                          <span className="font-medium text-gray-800">{member}</span>
                        )}
                      </div>

                      <div className="flex gap-2">
                        {editingMemberId === idx ? (
                          <>
                            <button
                              onClick={() => saveMemberEdit(idx)}
                              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition text-sm font-semibold"
                            >
                              ✓ Salvar
                            </button>
                            <button
                              onClick={cancelEditMember}
                              className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition text-sm font-semibold"
                            >
                              ✕ Cancelar
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => startEditMember(idx)}
                              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition text-sm font-semibold"
                              title="Editar nome"
                            >
                              ✏️ Editar
                            </button>
                            <button
                              onClick={() => removeMember(idx)}
                              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition text-sm font-semibold"
                              title="Remover membro"
                            >
                              🗑️ Remover
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <p className="text-xl mb-2">👥</p>
                  <p>Nenhum membro cadastrado ainda</p>
                  <p className="text-sm mt-2">Comece adicionando o primeiro membro acima</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* CONFIGURAÇÕES */}
        {activeTab === "settings" && (
          <div className="space-y-6">
            <div className="bg-red-50 border-2 border-red-200 rounded-xl shadow-md p-8">
              <h2 className="text-2xl font-bold text-red-700 mb-4">⚠️ Zona de Perigo</h2>
              <p className="text-gray-700 mb-6">
                Ao excluir o coletivo, todos os dados incluindo membros serão permanentemente removidos. Esta ação não pode ser desfeita.
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