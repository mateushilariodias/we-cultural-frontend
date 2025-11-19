"use client";

import { useEffect, useState } from "react";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [artists, setArtists] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setArtists([]);
      return;
    }

    const timeout = setTimeout(() => {
      searchArtists(query);
    }, 400);

    return () => clearTimeout(timeout);
  }, [query]);

  async function searchArtists(text: string) {
    try {
      setLoading(true);

      const res = await fetch(
        `http://localhost:5000/api/artists/search?query=${text}`
      );

      const data = await res.json();

      if (Array.isArray(data)) {
        setArtists(data);
      } else if (Array.isArray(data.artists)) {
        setArtists(data.artists);
      } else {
        setArtists([]);
      }
    } catch (err) {
      console.error(err);
      setArtists([]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 lg:px-40 py-10">
      <h1 className="text-3xl font-bold text-bluePrimary mb-6">
        Buscar Artistas
      </h1>

      {/* 🔍 Campo de busca */}
      <input
        type="text"
        placeholder="Digite o nome do artista..."
        className="w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-bluePrimary text-gray-800"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {loading && (
        <p className="mt-4 text-bluePrimary font-medium">Buscando...</p>
      )}

      {/* Resultados */}
      <div className="flex flex-col gap-4 mt-6">
        {artists.map((artist) => (
          <a
            key={artist._id}
            href={`/artist/${artist._id}`}
            className="bg-white border border-gray-200 rounded-xl shadow hover:shadow-md hover:bg-gray-100 transition p-4 block"
          >
            <div className="flex items-center gap-4">
              {artist.profilePicture ? (
                <img
                  src={artist.profilePicture}
                  alt={artist.name}
                  className="w-16 h-16 rounded-full object-cover border border-gray-300"
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-bold">
                  ?
                </div>
              )}

              <div>
                <h2 className="text-lg font-semibold text-bluePrimary">
                  {artist.name}
                </h2>

                {/* Mostrar categorias em vez de gênero */}
                {artist.categories && artist.categories.length > 0 ? (
                  <p className="text-gray-600 text-sm">
                    {artist.categories.join(", ")}
                  </p>
                ) : (
                  <p className="text-gray-500 text-sm">Sem categorias</p>
                )}
              </div>
            </div>
          </a>
        ))}

        {/* Mensagem caso não encontre nada */}
        {!loading && query.trim() && artists.length === 0 && (
          <p className="text-gray-600 text-center mt-6">
            Nenhum artista encontrado para "<strong>{query}</strong>".
          </p>
        )}
      </div>
    </div>
  );
}