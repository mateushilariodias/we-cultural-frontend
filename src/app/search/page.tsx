"use client";

import { useEffect, useState } from "react";

// Definir o tipo do artista
interface Artist {
  _id: string;
  name: string;
  profilePicture?: string;
  categories?: string[];
  email?: string;
  phone?: string;
}

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [allArtists, setAllArtists] = useState<Artist[]>([]);
  const [filteredArtists, setFilteredArtists] = useState<Artist[]>([]);
  const [loading, setLoading] = useState(true);

  // Carregar TODOS os artistas ao montar o componente
  useEffect(() => {
    loadAllArtists();
  }, []);

  // Filtrar artistas conforme o usuário digita
  useEffect(() => {
    if (!query.trim()) {
      setFilteredArtists(allArtists);
      return;
    }

    const searchTerm = query.toLowerCase();
    const filtered = allArtists.filter((artist) => {
      // Buscar por nome
      const matchName = artist.name.toLowerCase().includes(searchTerm);
      
      // Buscar por categorias
      const matchCategory = artist.categories?.some(cat => 
        cat.toLowerCase().includes(searchTerm)
      );

      return matchName || matchCategory;
    });

    setFilteredArtists(filtered);
  }, [query, allArtists]);

  async function loadAllArtists() {
    try {
      setLoading(true);
      
      const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
      const res = await fetch(`${BACKEND_URL}/api/artists`);

      if (!res.ok) {
        throw new Error('Erro ao carregar artistas');
      }

      const data = await res.json();

      if (Array.isArray(data)) {
        setAllArtists(data);
        setFilteredArtists(data);
      } else {
        setAllArtists([]);
        setFilteredArtists([]);
      }
    } catch (err) {
      console.error('Erro ao carregar artistas:', err);
      setAllArtists([]);
      setFilteredArtists([]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-[#1e3a8a] text-white px-4 lg:px-40 py-4">
        <div className="flex items-center justify-between">
          <a href="/" className="text-2xl font-bold hover:opacity-90 transition">
            Nós Cultural
          </a>
          <nav className="flex gap-4">
            <a href="/artistLogin" className="hover:underline">Login</a>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <div className="px-4 lg:px-40 py-10">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[#1e3a8a] mb-2">
            Artistas de Franca
          </h1>
          <p className="text-gray-600">
            {loading 
              ? "Carregando..." 
              : `${allArtists.length} artista${allArtists.length !== 1 ? 's' : ''} cadastrado${allArtists.length !== 1 ? 's' : ''}`
            }
          </p>
        </div>

        {/* 🔍 Campo de busca */}
        <div className="mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar por nome ou categoria artística..."
              className="w-full px-4 py-4 pl-12 rounded-xl border-2 border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a8a] focus:border-transparent text-gray-800 text-lg"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <svg 
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          {/* Contador de resultados filtrados */}
          {query.trim() && (
            <p className="mt-3 text-gray-600 text-sm">
              {filteredArtists.length === 0 
                ? 'Nenhum resultado encontrado' 
                : `${filteredArtists.length} resultado${filteredArtists.length !== 1 ? 's' : ''} encontrado${filteredArtists.length !== 1 ? 's' : ''}`
              }
            </p>
          )}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1e3a8a] mb-4"></div>
            <p className="text-gray-600">Carregando artistas...</p>
          </div>
        )}

        {/* Grid de Artistas */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArtists.map((artist) => (
              <a
                key={artist._id}
                href={`/artist/${artist._id}`}
                className="bg-white border-2 border-gray-200 rounded-xl shadow-sm hover:shadow-lg hover:border-[#1e3a8a] transition-all duration-200 overflow-hidden group"
              >
                {/* Imagem do Artista */}
                <div className="relative h-48 bg-gradient-to-br from-[#1e3a8a] to-[#0f172a] overflow-hidden">
                  {artist.profilePicture ? (
                    <img
                      src={artist.profilePicture}
                      alt={artist.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white text-4xl font-bold">
                        {artist.name.charAt(0).toUpperCase()}
                      </div>
                    </div>
                  )}
                </div>

                {/* Informações do Artista */}
                <div className="p-5">
                  <h2 className="text-xl font-bold text-[#1e3a8a] mb-2 group-hover:text-[#F59E0B] transition-colors">
                    {artist.name}
                  </h2>

                  {/* Categorias */}
                  {artist.categories && artist.categories.length > 0 ? (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {artist.categories.slice(0, 3).map((cat, idx) => (
                        <span 
                          key={idx}
                          className="text-xs bg-[#1e3a8a]/10 text-[#1e3a8a] px-3 py-1 rounded-full font-medium"
                        >
                          {cat}
                        </span>
                      ))}
                      {artist.categories.length > 3 && (
                        <span className="text-xs text-gray-500 px-2 py-1">
                          +{artist.categories.length - 3}
                        </span>
                      )}
                    </div>
                  ) : (
                    <p className="text-gray-400 text-sm mb-3 italic">Sem categorias</p>
                  )}

                  {/* Ícones de Contato */}
                  <div className="flex gap-3 pt-3 border-t border-gray-100">
                    {artist.email && (
                      <div className="flex items-center gap-1 text-gray-500 text-xs">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        E-mail
                      </div>
                    )}
                    {artist.phone && (
                      <div className="flex items-center gap-1 text-gray-500 text-xs">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        Telefone
                      </div>
                    )}
                  </div>

                  {/* Call to Action */}
                  <div className="mt-4 flex items-center justify-between text-[#1e3a8a] font-semibold text-sm group-hover:text-[#F59E0B] transition-colors">
                    <span>Ver perfil completo</span>
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}

        {/* Mensagem quando não há resultados */}
        {!loading && filteredArtists.length === 0 && (
          <div className="text-center py-20">
            <div className="mb-6">
              <svg className="w-24 h-24 mx-auto text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            {query.trim() ? (
              <>
                <h3 className="text-2xl font-bold text-gray-700 mb-2">
                  Nenhum artista encontrado
                </h3>
                <p className="text-gray-500 mb-6">
                  Não encontramos artistas para <strong>&quot;{query}&quot;</strong>
                </p>
                <button 
                  onClick={() => setQuery('')}
                  className="bg-[#1e3a8a] text-white px-6 py-3 rounded-lg hover:bg-[#15306e] transition font-semibold"
                >
                  Limpar busca
                </button>
              </>
            ) : (
              <>
                <h3 className="text-2xl font-bold text-gray-700 mb-2">
                  Nenhum artista cadastrado ainda
                </h3>
                <p className="text-gray-500 mb-6">
                  Seja o primeiro a se cadastrar na plataforma!
                </p>
                <a 
                  href="/artistRegistration"
                  className="inline-block bg-[#F59E0B] text-white px-6 py-3 rounded-lg hover:bg-[#D97706] transition font-semibold"
                >
                  Cadastrar-se
                </a>
              </>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-[#1e3a8a] text-white text-center p-6 mt-20">
        <p>© 2026 <strong>Nós Cultural</strong> - Todos os direitos reservados.</p>
        <div className="flex justify-center gap-6 mt-4 text-sm">
          <a href="/privacy" className="hover:underline">Política de Privacidade</a>
          <a href="/terms" className="hover:underline">Termos de Uso</a>
        </div>
      </footer>
    </div>
  );
}