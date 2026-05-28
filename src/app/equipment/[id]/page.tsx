"use client";

import { use, useEffect, useState } from "react";
import Image from "next/image";
import { API_ENDPOINTS } from "@/config/api";

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
  category?: string[];
  description?: string;
  logo?: string;
}

export default function EquipmentProfile({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [equipment, setEquipment] = useState<Equipment | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEquipment() {
      try {
        const res = await fetch(API_ENDPOINTS.equipmentById(id));
        const data = await res.json();
        setEquipment(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchEquipment();
  }, [id]);

  if (loading) return <p className="p-6 text-xl text-[#059669]">Carregando...</p>;
  if (!equipment) return <p className="p-6 text-xl text-red-500">Espaço não encontrado.</p>;

  const enderecoCompleto = [
    equipment.rua,
    equipment.bairro,
    equipment.cidade,
    equipment.estado,
    equipment.cep,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-[#059669] text-white px-4 lg:px-40 py-4">
        <div className="flex items-center gap-4">
          <a href="/search" className="hover:opacity-80 transition">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </a>
          <h1 className="text-xl font-bold">Perfil do Espaço Cultural</h1>
        </div>
      </header>

      <div className="px-4 lg:px-40 py-6 lg:py-10">
        <div className="max-w-3xl mx-auto bg-white p-4 lg:p-6 rounded-xl shadow-lg">

          {/* Profile Header */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 mb-6">
            {equipment.logo ? (
              <Image
                src={equipment.logo}
                alt={equipment.name}
                width={160}
                height={160}
                className="w-32 h-32 lg:w-40 lg:h-40 rounded-full object-cover shadow-lg border-4 border-[#059669]"
              />
            ) : (
              <div className="w-32 h-32 lg:w-40 lg:h-40 rounded-full bg-[#059669] flex items-center justify-center text-white text-5xl font-bold shadow-lg">
                {equipment.name.charAt(0).toUpperCase()}
              </div>
            )}

            <div className="flex-1 text-center sm:text-left w-full">
              <h1 className="text-2xl lg:text-3xl font-bold text-[#059669] mb-3">
                {equipment.name}
              </h1>
              <div className="space-y-2 text-sm lg:text-base">
                <div className="flex flex-col sm:flex-row sm:items-center gap-1">
                  <strong className="text-gray-700">Responsável:</strong>
                  <span className="text-gray-600">{equipment.responsible}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-1">
                  <strong className="text-gray-700">Email:</strong>
                  <a href={`mailto:${equipment.email}`} className="text-[#059669] hover:underline break-all">
                    {equipment.email}
                  </a>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-1">
                  <strong className="text-gray-700">Telefone:</strong>
                  <a href={`tel:${equipment.phone}`} className="text-[#059669] hover:underline">
                    {equipment.phone}
                  </a>
                </div>
                {equipment.foundationYear && (
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1">
                    <strong className="text-gray-700">Fundação:</strong>
                    <span className="text-gray-600">{equipment.foundationYear}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <hr className="my-6 border-gray-200" />

          {/* Descrição */}
          {equipment.description && (
            <>
              <div className="mb-6">
                <h2 className="text-xl lg:text-2xl font-semibold text-[#059669] mb-3">Sobre o Espaço</h2>
                <p className="text-gray-600 leading-relaxed">{equipment.description}</p>
              </div>
              <hr className="my-6 border-gray-200" />
            </>
          )}

          {/* Categorias */}
          <div className="mb-6">
            <h2 className="text-xl lg:text-2xl font-semibold text-[#059669] mb-3">Categorias</h2>
            <div className="flex gap-2 flex-wrap">
              {equipment.category && equipment.category.length > 0 ? (
                equipment.category.map((c) => (
                  <span
                    key={c}
                    className="bg-[#059669] text-white px-3 py-1 rounded-full text-xs lg:text-sm shadow-sm"
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

          {/* Endereço */}
          <div className="mb-6">
            <h2 className="text-xl lg:text-2xl font-semibold text-[#059669] mb-3">Endereço</h2>
            <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 bg-[#059669] rounded-full flex items-center justify-center text-white flex-shrink-0">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <p className="text-gray-700 text-sm lg:text-base">{enderecoCompleto}</p>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(enderecoCompleto)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#059669] text-sm hover:underline mt-1 inline-block"
                >
                  Ver no Google Maps →
                </a>
              </div>
            </div>
          </div>

          <hr className="my-6 border-gray-200" />

          {/* Informações Legais */}
          <div className="mb-6">
            <h2 className="text-xl lg:text-2xl font-semibold text-[#059669] mb-3">Informações</h2>
            <div className="space-y-2 text-sm lg:text-base">
              <div className="flex flex-col sm:flex-row sm:items-center gap-1">
                <strong className="text-gray-700">CNPJ:</strong>
                <span className="text-gray-600">{equipment.cnpj}</span>
              </div>
            </div>
          </div>

          {/* Links */}
          {equipment.website && (
            <>
              <hr className="my-6 border-gray-200" />
              <div className="space-y-4">
                <h2 className="text-xl lg:text-2xl font-semibold text-[#059669] mb-3">Links</h2>
                <a
                  href={equipment.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition group"
                >
                  <div className="w-10 h-10 bg-[#059669] rounded-full flex items-center justify-center text-white group-hover:scale-110 transition">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900">Website</p>
                    <p className="text-sm text-gray-500 truncate">{equipment.website}</p>
                  </div>
                  <svg className="w-5 h-5 text-gray-400 group-hover:text-[#059669] transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </>
          )}

        </div>
      </div>

      <footer className="bg-[#059669] text-white text-center p-6 mt-20">
        <p>© 2026 <strong>Nós Cultural</strong> - Todos os direitos reservados.</p>
        <div className="flex justify-center gap-6 mt-4 text-sm">
          <a href="/privacy" className="hover:underline">Política de Privacidade</a>
          <a href="/terms" className="hover:underline">Termos de Uso</a>
        </div>
      </footer>
    </div>
  );
}