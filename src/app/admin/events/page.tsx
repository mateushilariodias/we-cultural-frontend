'use client';
import { useState } from 'react';
import { API_URL } from '@/config/api';

export default function EventsCMS() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    dayOfWeek: '',
    time: '',
    location: '',
    address: '',
    details: '',
    dates: '',
    artist: '',
    link: '',
    instagramLink: '',
    facebookLink: '',
    color: 'from-blue-500 to-cyan-500',
  });

  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const formDataToSend = new FormData();

      // Adicionar campos de texto
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('date', formData.date);
      formDataToSend.append('dayOfWeek', formData.dayOfWeek);
      formDataToSend.append('time', formData.time);
      formDataToSend.append('location', formData.location);
      formDataToSend.append('address', formData.address);
      formDataToSend.append('artist', formData.artist);
      formDataToSend.append('link', formData.link);
      formDataToSend.append('color', formData.color);

      // Adicionar arrays
      if (formData.details) {
        const detailsArray = formData.details.split('\n').filter(d => d.trim());
        formDataToSend.append('details', JSON.stringify(detailsArray));
      }

      if (formData.dates) {
        const datesArray = formData.dates.split('\n').filter(d => d.trim());
        formDataToSend.append('dates', JSON.stringify(datesArray));
      }

      // Adicionar redes sociais
      const social = {
        instagram: formData.instagramLink,
        facebook: formData.facebookLink,
      };
      formDataToSend.append('social', JSON.stringify(social));

      // Adicionar imagem se houver
      if (image) {
        formDataToSend.append('image', image);
      }

      const response = await fetch(`${API_URL}/api/events`, {
        method: 'POST',
        body: formDataToSend,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Erro ao criar evento');
      }

      setSuccess('✅ Evento criado com sucesso!');
      setFormData({
        title: '',
        description: '',
        date: '',
        dayOfWeek: '',
        time: '',
        location: '',
        address: '',
        details: '',
        dates: '',
        artist: '',
        link: '',
        instagramLink: '',
        facebookLink: '',
        color: 'from-blue-500 to-cyan-500',
      });
      setImage(null);
      setImagePreview('');
    } catch (err) {
      setError(`❌ Erro: ${(err as Error).message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-[#1e3a8a] text-white px-4 lg:px-40 py-3">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Nós Cultural - Admin</h1>
          <nav className="flex gap-4">
            <a href="/schedule" className="hover:underline">Ver Programação</a>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 px-4 lg:px-40 py-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#1e3a8a] mb-8">📅 Cadastrar Novo Evento</h2>

          {success && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">{success}</div>}
          {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">{error}</div>}

          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8 space-y-6">
            
            {/* Título */}
            <div>
              <label className="block font-semibold text-gray-700 mb-2">Título do Evento *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Ex: Leitura Dramática 40+"
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]"
                required
              />
            </div>

            {/* Descrição */}
            <div>
              <label className="block font-semibold text-gray-700 mb-2">Descrição *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Descreva o evento em detalhes..."
                rows={4}
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]"
                required
              />
            </div>

            {/* Imagem */}
            <div>
              <label className="block font-semibold text-gray-700 mb-2">Imagem do Evento</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full border border-gray-300 rounded px-4 py-2"
              />
              {imagePreview && (
                <div className="mt-4">
                  <p className="text-sm text-gray-600 mb-2">Prévia:</p>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={imagePreview} alt="Preview" className="max-w-xs h-auto rounded" />
                </div>
              )}
            </div>

            {/* Data e Horário */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block font-semibold text-gray-700 mb-2">Data (DD/MM/AAAA) *</label>
                <input
                  type="text"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  placeholder="20/03/2026"
                  className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-2">Dia da Semana *</label>
                <select
                  name="dayOfWeek"
                  value={formData.dayOfWeek}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]"
                  required
                >
                  <option value="">Selecione...</option>
                  <option value="segunda-feira">Segunda-feira</option>
                  <option value="terça-feira">Terça-feira</option>
                  <option value="quarta-feira">Quarta-feira</option>
                  <option value="quinta-feira">Quinta-feira</option>
                  <option value="sexta-feira">Sexta-feira</option>
                  <option value="sábado">Sábado</option>
                  <option value="domingo">Domingo</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-2">Horário (HH:MM) *</label>
                <input
                  type="text"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  placeholder="19:30"
                  className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]"
                  required
                />
              </div>
            </div>

            {/* Local */}
            <div>
              <label className="block font-semibold text-gray-700 mb-2">Local *</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Ex: Casa do Artista Francano"
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]"
                required
              />
            </div>

            {/* Endereço */}
            <div>
              <label className="block font-semibold text-gray-700 mb-2">Endereço Completo *</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Rua, número - Bairro, Cidade - Estado"
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]"
                required
              />
            </div>

            {/* Detalhes */}
            <div>
              <label className="block font-semibold text-gray-700 mb-2">Detalhes (um por linha)</label>
              <textarea
                name="details"
                value={formData.details}
                onChange={handleChange}
                placeholder="Detalhe 1&#10;Detalhe 2&#10;Detalhe 3"
                rows={3}
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]"
              />
            </div>

            {/* Datas Múltiplas */}
            <div>
              <label className="block font-semibold text-gray-700 mb-2">Datas Múltiplas (um por linha)</label>
              <textarea
                name="dates"
                value={formData.dates}
                onChange={handleChange}
                placeholder="20/3 (sexta)&#10;21/3 (sábado)&#10;22/3 (domingo)"
                rows={3}
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]"
              />
            </div>

            {/* Artista/Realização */}
            <div>
              <label className="block font-semibold text-gray-700 mb-2">Artista/Realização</label>
              <input
                type="text"
                name="artist"
                value={formData.artist}
                onChange={handleChange}
                placeholder="Ex: Cia. Antares"
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]"
              />
            </div>

            {/* Link */}
            <div>
              <label className="block font-semibold text-gray-700 mb-2">Link do Evento</label>
              <input
                type="url"
                name="link"
                value={formData.link}
                onChange={handleChange}
                placeholder="https://exemplo.com/evento"
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]"
              />
            </div>

            {/* Redes Sociais */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-gray-700 mb-2">Instagram</label>
                <input
                  type="url"
                  name="instagramLink"
                  value={formData.instagramLink}
                  onChange={handleChange}
                  placeholder="https://instagram.com/..."
                  className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-2">Facebook</label>
                <input
                  type="url"
                  name="facebookLink"
                  value={formData.facebookLink}
                  onChange={handleChange}
                  placeholder="https://facebook.com/..."
                  className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]"
                />
              </div>
            </div>

            {/* Cor */}
            <div>
              <label className="block font-semibold text-gray-700 mb-2">Cor (Gradiente)</label>
              <select
                name="color"
                value={formData.color}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a]"
              >
                <option value="from-purple-500 to-pink-500">Roxo → Rosa</option>
                <option value="from-blue-500 to-cyan-500">Azul → Ciano</option>
                <option value="from-green-500 to-emerald-500">Verde → Esmeralda</option>
                <option value="from-red-500 to-rose-500">Vermelho → Rose</option>
                <option value="from-yellow-500 to-orange-500">Amarelo → Laranja</option>
                <option value="from-pink-600 to-purple-600">Rosa → Roxo</option>
              </select>
            </div>

            {/* Botão Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#1e3a8a] text-white px-6 py-3 rounded font-semibold hover:opacity-90 disabled:opacity-50 transition"
            >
              {loading ? '⏳ Cadastrando...' : '✅ Cadastrar Evento'}
            </button>
          </form>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#1e3a8a] text-white text-center p-4 mt-12">
        <p>© 2025 <strong>Nós Cultural</strong> - Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}