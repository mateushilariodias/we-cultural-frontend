"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { API_ENDPOINTS } from "@/config/api";
import type { Artist, Collective, Equipment } from "@/types";

type FilterType = "all" | "artists" | "collectives" | "equipments";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [allArtists, setAllArtists] = useState<Artist[]>([]);
  const [allCollectives, setAllCollectives] = useState<Collective[]>([]);
  const [allEquipments, setAllEquipments] = useState<Equipment[]>([]);
  const [filteredArtists, setFilteredArtists] = useState<Artist[]>([]);
  const [filteredCollectives, setFilteredCollectives] = useState<Collective[]>([]);
  const [filteredEquipments, setFilteredEquipments] = useState<Equipment[]>([]);
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAll();
  }, []);

  useEffect(() => {
    const term = query.toLowerCase().trim();

    if (!term) {
      setFilteredArtists(allArtists);
      setFilteredCollectives(allCollectives);
      setFilteredEquipments(allEquipments);
      return;
    }

    setFilteredArtists(
      allArtists.filter(
        (a) =>
          a.name.toLowerCase().includes(term) ||
          a.categories?.some((c) => c.toLowerCase().includes(term))
      )
    );

    setFilteredCollectives(
      allCollectives.filter(
        (c) =>
          c.name.toLowerCase().includes(term) ||
          c.categories?.some((cat) => cat.toLowerCase().includes(term))
      )
    );

    setFilteredEquipments(
      allEquipments.filter(
        (e) =>
          e.name.toLowerCase().includes(term) ||
          e.category?.some((cat) => cat.toLowerCase().includes(term))
      )
    );
  }, [query, allArtists, allCollectives, allEquipments]);

  async function loadAll() {
    try {
      setLoading(true);

      const [artistsRes, collectivesRes, equipmentsRes] = await Promise.all([
        fetch(API_ENDPOINTS.artists),
        fetch(API_ENDPOINTS.collectives),
        fetch(API_ENDPOINTS.equipments),
      ]);

      const artistsJson = artistsRes.ok ? await artistsRes.json() : {};
      const collectivesJson = collectivesRes.ok ? await collectivesRes.json() : {};
      const equipmentsJson = equipmentsRes.ok ? await equipmentsRes.json() : {};

      const artists = Array.isArray(artistsJson) ? artistsJson : (artistsJson.data ?? []);
      const collectives = Array.isArray(collectivesJson) ? collectivesJson : (collectivesJson.data ?? []);
      const equipments = Array.isArray(equipmentsJson) ? equipmentsJson : (equipmentsJson.data ?? []);

      setAllArtists(artists);
      setAllCollectives(collectives);
      setAllEquipments(equipments);
      setFilteredArtists(artists);
      setFilteredCollectives(collectives);
      setFilteredEquipments(equipments);
    } catch (err) {
      console.error("Erro ao carregar dados:", err);
    } finally {
      setLoading(false);
    }
  }

  const totalResults =
    filteredArtists.length + filteredCollectives.length + filteredEquipments.length;

  const filters: { key: FilterType; label: string; count: number }[] = [
    { key: "all", label: "Todos", count: totalResults },
    { key: "artists", label: "Artistas", count: filteredArtists.length },
    { key: "collectives", label: "Coletivos", count: filteredCollectives.length },
    { key: "equipments", label: "Espaços", count: filteredEquipments.length },
  ];

  function CategoryBadge({ label }: { label: string }) {
    return (
      <span className="text-xs bg-[#1e3a8a]/10 text-[#1e3a8a] px-3 py-1 rounded-full font-medium">
        {label}
      </span>
    );
  }

  function ArtistCard({ artist }: { artist: Artist }) {
    return (
      <a
        href={`/artist/${artist._id}`}
        className="bg-white border-2 border-gray-200 rounded-xl shadow-sm hover:shadow-lg hover:border-[#1e3a8a] transition-all duration-200 overflow-hidden group"
      >
        <div className="relative h-48 bg-gradient-to-br from-[#1e3a8a] to-[#0f172a] overflow-hidden">
          {artist.profilePicture ? (
            <Image
              src={artist.profilePicture}
              alt={artist.name}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center text-white text-4xl font-bold">
                {artist.name.charAt(0).toUpperCase()}
              </div>
            </div>
          )}
        </div>
        <div className="p-5">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-semibold uppercase tracking-wide">
              Artista
            </span>
          </div>
          <h2 className="text-xl font-bold text-[#1e3a8a] mb-2 group-hover:text-[#F59E0B] transition-colors">
            {artist.name}
          </h2>
          {artist.categories && artist.categories.length > 0 ? (
            <div className="flex flex-wrap gap-2 mb-3">
              {artist.categories.slice(0, 3).map((cat, idx) => (
                <CategoryBadge key={idx} label={cat} />
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
          <div className="mt-4 flex items-center justify-between text-[#1e3a8a] font-semibold text-sm group-hover:text-[#F59E0B] transition-colors">
            <span>Ver perfil completo</span>
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </a>
    );
  }

  function CollectiveCard({ collective }: { collective: Collective }) {
    return (
      <a
        href={`/collective/${collective._id}`}
        className="bg-white border-2 border-gray-200 rounded-xl shadow-sm hover:shadow-lg hover:border-[#1e3a8a] transition-all duration-200 overflow-hidden group"
      >
        <div className="relative h-48 bg-gradient-to-br from-[#7c3aed] to-[#4c1d95] overflow-hidden">
          {collective.profilePicture ? (
            <Image
              src={collective.profilePicture}
              alt={collective.name}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center text-white text-4xl font-bold">
                {collective.name.charAt(0).toUpperCase()}
              </div>
            </div>
          )}
        </div>
        <div className="p-5">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full font-semibold uppercase tracking-wide">
              Coletivo
            </span>
          </div>
          <h2 className="text-xl font-bold text-[#1e3a8a] mb-2 group-hover:text-[#F59E0B] transition-colors">
            {collective.name}
          </h2>
          {collective.categories && collective.categories.length > 0 ? (
            <div className="flex flex-wrap gap-2 mb-3">
              {collective.categories.slice(0, 3).map((cat, idx) => (
                <CategoryBadge key={idx} label={cat} />
              ))}
              {collective.categories.length > 3 && (
                <span className="text-xs text-gray-500 px-2 py-1">
                  +{collective.categories.length - 3}
                </span>
              )}
            </div>
          ) : (
            <p className="text-gray-400 text-sm mb-3 italic">Sem categorias</p>
          )}
          <div className="mt-4 flex items-center justify-between text-[#1e3a8a] font-semibold text-sm group-hover:text-[#F59E0B] transition-colors">
            <span>Ver perfil completo</span>
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </a>
    );
  }

  function EquipmentCard({ equipment }: { equipment: Equipment }) {
    return (
      <a
        href={`/equipment/${equipment._id}`}
        className="bg-white border-2 border-gray-200 rounded-xl shadow-sm hover:shadow-lg hover:border-[#1e3a8a] transition-all duration-200 overflow-hidden group"
      >
        <div className="relative h-48 bg-gradient-to-br from-[#059669] to-[#064e3b] overflow-hidden">
          {equipment.logo ? (
            <Image
              src={equipment.logo}
              alt={equipment.name}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center text-white text-4xl font-bold">
                {equipment.name.charAt(0).toUpperCase()}
              </div>
            </div>
          )}
        </div>
        <div className="p-5">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-semibold uppercase tracking-wide">
              Espaço
            </span>
          </div>
          <h2 className="text-xl font-bold text-[#1e3a8a] mb-2 group-hover:text-[#F59E0B] transition-colors">
            {equipment.name}
          </h2>
          {equipment.category && equipment.category.length > 0 ? (
            <div className="flex flex-wrap gap-2 mb-3">
              {equipment.category.slice(0, 3).map((cat, idx) => (
                <CategoryBadge key={idx} label={cat} />
              ))}
              {equipment.category.length > 3 && (
                <span className="text-xs text-gray-500 px-2 py-1">
                  +{equipment.category.length - 3}
                </span>
              )}
            </div>
          ) : (
            <p className="text-gray-400 text-sm mb-3 italic">Sem categorias</p>
          )}
          {(equipment.cidade || equipment.bairro) && (
            <p className="text-gray-500 text-xs mb-3">
              📍 {[equipment.bairro, equipment.cidade].filter(Boolean).join(", ")}
            </p>
          )}
          <div className="mt-4 flex items-center justify-between text-[#1e3a8a] font-semibold text-sm group-hover:text-[#F59E0B] transition-colors">
            <span>Ver perfil completo</span>
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </a>
    );
  }

  const showArtists = activeFilter === "all" || activeFilter === "artists";
  const showCollectives = activeFilter === "all" || activeFilter === "collectives";
  const showEquipments = activeFilter === "all" || activeFilter === "equipments";

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-[#1e3a8a] text-white px-4 lg:px-40 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold hover:opacity-90 transition">
            Nós Cultural
          </Link>
          <nav className="flex gap-4">
            <a href="/artistLogin" className="hover:underline">Login</a>
          </nav>
        </div>
      </header>

      <div className="px-4 lg:px-40 py-10">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[#1e3a8a] mb-2">
            Cultura de Franca
          </h1>
          <p className="text-gray-600">
            {loading
              ? "Carregando..."
              : `${allArtists.length} artista${allArtists.length !== 1 ? "s" : ""}, ${allCollectives.length} coletivo${allCollectives.length !== 1 ? "s" : ""} e ${allEquipments.length} espaço${allEquipments.length !== 1 ? "s" : ""} cadastrados`}
          </p>
        </div>

        {/* Campo de busca */}
        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar por nome ou categoria..."
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
          {query.trim() && (
            <p className="mt-3 text-gray-600 text-sm">
              {totalResults === 0
                ? "Nenhum resultado encontrado"
                : `${totalResults} resultado${totalResults !== 1 ? "s" : ""} encontrado${totalResults !== 1 ? "s" : ""}`}
            </p>
          )}
        </div>

        {/* Filtros por tipo */}
        <div className="flex flex-wrap gap-2 mb-8">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setActiveFilter(f.key)}
              className={`px-4 py-2 rounded-full text-sm font-semibold border-2 transition-all ${
                activeFilter === f.key
                  ? "bg-[#1e3a8a] text-white border-[#1e3a8a]"
                  : "bg-white text-gray-600 border-gray-300 hover:border-[#1e3a8a] hover:text-[#1e3a8a]"
              }`}
            >
              {f.label}
              <span className={`ml-2 text-xs px-1.5 py-0.5 rounded-full ${
                activeFilter === f.key ? "bg-white/20" : "bg-gray-100"
              }`}>
                {f.count}
              </span>
            </button>
          ))}
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1e3a8a] mb-4"></div>
            <p className="text-gray-600">Carregando...</p>
          </div>
        )}

        {/* Resultados */}
        {!loading && (
          <div className="space-y-10">
            {/* Artistas */}
            {showArtists && filteredArtists.length > 0 && (
              <section>
                {activeFilter === "all" && (
                  <h2 className="text-2xl font-bold text-[#1e3a8a] mb-4 flex items-center gap-2">
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full uppercase tracking-wide">Artistas</span>
                  </h2>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredArtists.map((a) => <ArtistCard key={a._id} artist={a} />)}
                </div>
              </section>
            )}

            {/* Coletivos */}
            {showCollectives && filteredCollectives.length > 0 && (
              <section>
                {activeFilter === "all" && (
                  <h2 className="text-2xl font-bold text-[#1e3a8a] mb-4">
                    <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full uppercase tracking-wide">Coletivos</span>
                  </h2>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredCollectives.map((c) => <CollectiveCard key={c._id} collective={c} />)}
                </div>
              </section>
            )}

            {/* Espaços */}
            {showEquipments && filteredEquipments.length > 0 && (
              <section>
                {activeFilter === "all" && (
                  <h2 className="text-2xl font-bold text-[#1e3a8a] mb-4">
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full uppercase tracking-wide">Espaços</span>
                  </h2>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredEquipments.map((e) => <EquipmentCard key={e._id} equipment={e} />)}
                </div>
              </section>
            )}

            {/* Nenhum resultado */}
            {totalResults === 0 && (
              <div className="text-center py-20">
                <svg className="w-24 h-24 mx-auto text-gray-300 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                {query.trim() ? (
                  <>
                    <h3 className="text-2xl font-bold text-gray-700 mb-2">Nenhum resultado encontrado</h3>
                    <p className="text-gray-500 mb-6">
                      Não encontramos nada para <strong>&quot;{query}&quot;</strong>
                    </p>
                    <button
                      onClick={() => setQuery("")}
                      className="bg-[#1e3a8a] text-white px-6 py-3 rounded-lg hover:bg-[#15306e] transition font-semibold"
                    >
                      Limpar busca
                    </button>
                  </>
                ) : (
                  <>
                    <h3 className="text-2xl font-bold text-gray-700 mb-2">Nada cadastrado ainda</h3>
                    <p className="text-gray-500 mb-6">Seja o primeiro a se cadastrar na plataforma!</p>
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