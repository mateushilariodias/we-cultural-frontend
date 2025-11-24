"use client";

import { use, useEffect, useState } from "react";
import { API_ENDPOINTS } from "@/config/api";

interface Artist {
  _id: string;
  name: string;
  email: string;
  phone: string;
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

export default function ArtistProfile({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = use(params);
  const [artist, setArtist] = useState<Artist | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchArtist() {
      try {
        const res = await fetch(API_ENDPOINTS.artistById(id));
        const data = await res.json();
        setArtist(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchArtist();
  }, [id]);

  if (loading) return <p className="p-6 text-xl text-bluePrimary">Carregando...</p>;
  if (!artist) return <p className="p-6 text-xl text-red-500">Artista não encontrado.</p>;

  return (
    <div className="px-4 lg:px-40 py-10 min-h-screen bg-white text-black">
      <div className="max-w-3xl mx-auto bg-gray-100 p-6 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-bluePrimary mb-6">{artist.name}</h1>

        <div className="flex items-center gap-6 mb-6">
          {artist.profilePicture && (
            <img
              src={artist.profilePicture}
              alt={artist.name}
              className="w-40 h-40 rounded-full object-cover shadow border-2 border-bluePrimary"
            />
          )}

          <div className="text-lg">
            <p><strong>Email:</strong> {artist.email}</p>
            <p><strong>Telefone:</strong> {artist.phone}</p>
            <p><strong>Identidade de Gênero:</strong> {artist.gender}</p>
          </div>
        </div>

        <hr className="my-6" />

        {/* Categorias */}
        <div>
          <h2 className="text-2xl font-semibold text-bluePrimary mb-2">Categorias</h2>
          <div className="flex gap-2 flex-wrap">
            {artist.categories?.map((c: string) => (
              <span
                key={c}
                className="bg-bluePrimary text-white px-3 py-1 rounded-full text-sm shadow"
              >
                {c}
              </span>
            ))}
          </div>
        </div>

        <hr className="my-6" />

        {/* Marcadores Sociais */}
        <div>
          <h2 className="text-2xl font-semibold text-bluePrimary mb-2">Marcadores Sociais</h2>

          <ul className="list-disc ml-6 text-lg">
            {artist.lgbtqiapn && <li>LGBTQIA+</li>}
            {artist.black && <li>Pessoa Negra</li>}
            {artist.indigenous && <li>Pessoa Indígena</li>}
            {artist.pcd && <li>Pessoa com Deficiência (PcD)</li>}
            {!artist.lgbtqiapn && !artist.black && !artist.indigenous && !artist.pcd && (
              <li className="opacity-60">Nenhum marcador social informado</li>
            )}
          </ul>
        </div>

        <hr className="my-6" />

        {/* Links */}
        <div className="flex flex-col gap-4 text-lg">
          <div>
            <strong>Portfólio:</strong>
            <a href={artist.portfolioLink} target="_blank" rel="noopener noreferrer" className="ml-2 text-bluePrimary underline">
              Abrir
            </a>
          </div>

          <div>
            <strong>Currículo:</strong>
            <a href={artist.resumeLink} target="_blank" rel="noopener noreferrer" className="ml-2 text-bluePrimary underline">
              Abrir
            </a>
          </div>

          {artist.socialLink && (
            <div>
              <strong>Rede Social:</strong>
              <a href={artist.socialLink} target="_blank" rel="noopener noreferrer" className="ml-2 text-bluePrimary underline">
                Abrir
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}