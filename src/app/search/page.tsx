"use client";

import { useState } from "react";
import axios from "axios";
import Link from "next/link";

interface Result {
  id: string;
  type: "artist" | "collective" | "equipment";
  name: string;
  profilePicture?: string;
}

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const { data } = await axios.get<Result[]>(`http://localhost:5000/api/search?q=${query}`);
      setResults(data);
    } catch (err) {
      console.error("Erro ao buscar:", err);
    }
    setLoading(false);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Buscar artistas, coletivos e equipamentos</h1>
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Digite um nome..."
          className="flex-1 border rounded-lg p-2"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Buscar
        </button>
      </div>

      {loading && <p>Carregando...</p>}

      <div className="grid grid-cols-1 gap-4">
        {results.map((item) => (
          <Link
            key={item.id}
            href={`/perfil/${item.id}?type=${item.type}`}
            className="flex items-center gap-4 border p-3 rounded-lg hover:bg-gray-100"
          >
            <img
              src={item.profilePicture || "/default-avatar.png"}
              alt={item.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <p className="font-semibold">{item.name}</p>
              <p className="text-sm text-gray-500">
                {item.type === "artist" ? "Artista" : item.type === "collective" ? "Coletivo" : "Equipamento"}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
