"use client";

import { use, useEffect, useState } from "react";
import Image from "next/image";
import { API_ENDPOINTS } from "@/config/api";

interface Collective {
  _id: string;
  name: string;
  phone: string;
  socialLink?: string;
  profilePicture?: string;
  numMembers: number;
  memberNames?: string[];
  categories?: string[];
  description?: string;
}

export default function CollectiveProfile({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [collective, setCollective] = useState<Collective | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCollective() {
      try {
        const res = await fetch(API_ENDPOINTS.collectiveById(id));
        const data = await res.json();
        setCollective(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchCollective();
  }, [id]);

  if (loading) return <p className="p-6 text-xl text-[#1e3a8a]">Carregando...</p>;
  if (!collective) return <p className="p-6 text-xl text-red-500">Coletivo não encontrado.</p>;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-[#7c3aed] text-white px-4 lg:px-40 py-4">
        <div className="flex items-center gap-4">
          <a href="/search" className="hover:opacity-80 transition">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </a>
          <h1 className="text-xl font-bold">Perfil do Coletivo</h1>
        </div>
      </header>

      <div className="px-4 lg:px-40 py-6 lg:py-10">
        <div className="max-w-3xl mx-auto bg-white p-4 lg:p-6 rounded-xl shadow-lg">

          {/* Profile Header */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 mb-6">
            {collective.profilePicture ? (
              <Image
                src={collective.profilePicture}
                alt={collective.name}
                width={160}
                height={160}
                className="w-32 h-32 lg:w-40 lg:h-40 rounded-full object-cover shadow-lg border-4 border-[#7c3aed]"
              />
            ) : (
              <div className="w-32 h-32 lg:w-40 lg:h-40 rounded-full bg-[#7c3aed] flex items-center justify-center text-white text-5xl font-bold shadow-lg">
                {collective.name.charAt(0).toUpperCase()}
              </div>
            )}

            <div className="flex-1 text-center sm:text-left w-full">
              <h1 className="text-2xl lg:text-3xl font-bold text-[#7c3aed] mb-3">
                {collective.name}
              </h1>
              <div className="space-y-2 text-sm lg:text-base">
                <div className="flex flex-col sm:flex-row sm:items-center gap-1">
                  <strong className="text-gray-700">Telefone:</strong>
                  <a href={`tel:${collective.phone}`} className="text-[#7c3aed] hover:underline">
                    {collective.phone}
                  </a>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-1">
                  <strong className="text-gray-700">Nº de membros:</strong>
                  <span className="text-gray-600">{collective.numMembers}</span>
                </div>
              </div>
            </div>
          </div>

          <hr className="my-6 border-gray-200" />

          {/* Descrição */}
          {collective.description && (
            <>
              <div className="mb-6">
                <h2 className="text-xl lg:text-2xl font-semibold text-[#7c3aed] mb-3">Sobre o Coletivo</h2>
                <p className="text-gray-600 leading-relaxed">{collective.description}</p>
              </div>
              <hr className="my-6 border-gray-200" />
            </>
          )}

          {/* Categorias */}
          <div className="mb-6">
            <h2 className="text-xl lg:text-2xl font-semibold text-[#7c3aed] mb-3">Categorias</h2>
            <div className="flex gap-2 flex-wrap">
              {collective.categories && collective.categories.length > 0 ? (
                collective.categories.map((c) => (
                  <span
                    key={c}
                    className="bg-[#7c3aed] text-white px-3 py-1 rounded-full text-xs lg:text-sm shadow-sm"
                  >
                    {c}
                  </span>
                ))
              ) : (
                <p className="text-gray-500 text-sm">Nenhuma categoria informada</p>
              )}
            </div>
          </div>

          <hr className="my-6 border-gray-200" />

          {/* Membros */}
          {collective.memberNames && collective.memberNames.length > 0 && (
            <>
              <div className="mb-6">
                <h2 className="text-xl lg:text-2xl font-semibold text-[#7c3aed] mb-3">Membros</h2>
                <ul className="space-y-2">
                  {collective.memberNames.map((member, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm lg:text-base text-gray-700">
                      <span className="w-2 h-2 bg-[#7c3aed] rounded-full flex-shrink-0"></span>
                      {member}
                    </li>
                  ))}
                </ul>
              </div>
              <hr className="my-6 border-gray-200" />
            </>
          )}

          {/* Links */}
          {collective.socialLink && (
            <div className="space-y-4">
              <h2 className="text-xl lg:text-2xl font-semibold text-[#7c3aed] mb-3">Links</h2>
              <a
                href={collective.socialLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition group"
              >
                <div className="w-10 h-10 bg-[#7c3aed] rounded-full flex items-center justify-center text-white group-hover:scale-110 transition">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900">Rede Social</p>
                  <p className="text-sm text-gray-500 truncate">Conectar-se</p>
                </div>
                <svg className="w-5 h-5 text-gray-400 group-hover:text-[#7c3aed] transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          )}

        </div>
      </div>

      <footer className="bg-[#7c3aed] text-white text-center p-6 mt-20">
        <p>© 2026 <strong>Nós Cultural</strong> - Todos os direitos reservados.</p>
        <div className="flex justify-center gap-6 mt-4 text-sm">
          <a href="/privacy" className="hover:underline">Política de Privacidade</a>
          <a href="/terms" className="hover:underline">Termos de Uso</a>
        </div>
      </footer>
    </div>
  );
}