import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { API_ENDPOINTS } from "@/config/api";
import Breadcrumb from "@/components/Breadcrumb";
import ArtistCard from "@/components/cards/ArtistCard";
import { fetchAllArtists } from "@/lib/fetchData";
import type { Artist } from "@/types";

async function getArtist(id: string): Promise<Artist | null> {
  try {
    const res = await fetch(API_ENDPOINTS.artistById(id), {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const artist = await getArtist(id);

  if (!artist) {
    return { title: "Artista não encontrado" };
  }

  const categories = artist.categories?.join(", ");
  return {
    title: `${artist.name} — Artista em Franca, SP`,
    description: `Conheça o perfil de ${artist.name}${
      categories ? `, artista de ${categories}` : ""
    }, na plataforma Nós Cultural de Franca.`,
    alternates: { canonical: `/artista/${id}` },
  };
}

export default async function ArtistProfile({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [artist, allArtists] = await Promise.all([
    getArtist(id),
    fetchAllArtists(),
  ]);

  if (!artist) {
    return <p className="p-6 text-xl text-red-500">Artista não encontrado.</p>;
  }

  const related = allArtists
    .filter(
      (a) =>
        a._id !== id &&
        a.categories?.some((c) => artist.categories?.includes(c))
    )
    .slice(0, 4);

  const sameAs = [artist.socialLink, artist.portfolioLink].filter(Boolean);
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: artist.name,
    url: `https://we-cultural-frontend.vercel.app/artista/${id}`,
    ...(artist.profilePicture && { image: artist.profilePicture }),
    ...(artist.email && { email: `mailto:${artist.email}` }),
    ...(artist.phone && { telephone: artist.phone }),
    ...(artist.categories?.[0] && { jobTitle: artist.categories[0] }),
    ...(sameAs.length && { sameAs }),
    workLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Franca",
        addressRegion: "SP",
        addressCountry: "BR",
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      {/* Header */}
      <header className="bg-[#1e3a8a] text-white px-4 lg:px-40 py-4">
        <div className="flex items-center gap-4">
          <Link href="/busca" className="hover:opacity-80 transition">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <span className="text-xl font-bold">Perfil do Artista</span>
        </div>
      </header>

      <Breadcrumb
        items={[
          { label: "Início", href: "/" },
          { label: "Busca", href: "/busca" },
          { label: artist.name },
        ]}
      />

      <div className="px-4 lg:px-40 py-6 lg:py-10">
        <div className="max-w-3xl mx-auto bg-white p-4 lg:p-6 rounded-xl shadow-lg">
          {/* Profile Header */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 mb-6">
            {artist.profilePicture ? (
              <Image
                src={artist.profilePicture}
                alt={artist.name}
                width={160}
                height={160}
                className="w-32 h-32 lg:w-40 lg:h-40 rounded-full object-cover shadow-lg border-4 border-[#1e3a8a]"
              />
            ) : (
              <div className="w-32 h-32 lg:w-40 lg:h-40 rounded-full bg-[#1e3a8a] flex items-center justify-center text-white text-5xl font-bold shadow-lg">
                {artist.name.charAt(0).toUpperCase()}
              </div>
            )}

            <div className="flex-1 text-center sm:text-left w-full">
              <h1 className="text-2xl lg:text-3xl font-bold text-[#1e3a8a] mb-3">
                {artist.name}
              </h1>

              <div className="space-y-2 text-sm lg:text-base">
                <div className="flex flex-col sm:flex-row sm:items-center gap-1">
                  <strong className="text-gray-700">Email:</strong>
                  <a href={`mailto:${artist.email}`} className="text-[#1e3a8a] hover:underline break-all">
                    {artist.email}
                  </a>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-1">
                  <strong className="text-gray-700">Telefone:</strong>
                  <a href={`tel:${artist.phone}`} className="text-[#1e3a8a] hover:underline">
                    {artist.phone}
                  </a>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-1">
                  <strong className="text-gray-700">Identidade de Gênero:</strong>
                  <span className="text-gray-600">{artist.gender}</span>
                </div>
              </div>
            </div>
          </div>

          <hr className="my-6 border-gray-200" />

          {/* Categorias */}
          <div className="mb-6">
            <h2 className="text-xl lg:text-2xl font-semibold text-[#1e3a8a] mb-3">Categorias</h2>
            <div className="flex gap-2 flex-wrap">
              {artist.categories && artist.categories.length > 0 ? (
                artist.categories.map((c: string) => (
                  <span
                    key={c}
                    className="bg-[#1e3a8a] text-white px-3 py-1 rounded-full text-xs lg:text-sm shadow-sm"
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

          {/* Marcadores Sociais */}
          <div className="mb-6">
            <h2 className="text-xl lg:text-2xl font-semibold text-[#1e3a8a] mb-3">Marcadores Sociais</h2>
            <ul className="space-y-2 text-sm lg:text-base">
              {artist.lgbtqiapn && (
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#10B981] rounded-full"></span>
                  LGBTQIA+
                </li>
              )}
              {artist.black && (
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#3B82F6] rounded-full"></span>
                  Pessoa Negra
                </li>
              )}
              {artist.indigenous && (
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#F59E0B] rounded-full"></span>
                  Pessoa Indígena
                </li>
              )}
              {artist.pcd && (
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#EF4444] rounded-full"></span>
                  Pessoa com Deficiência (PcD)
                </li>
              )}
              {!artist.lgbtqiapn && !artist.black && !artist.indigenous && !artist.pcd && (
                <li className="text-gray-500">Nenhum marcador social informado</li>
              )}
            </ul>
          </div>

          <hr className="my-6 border-gray-200" />

          {/* Links */}
          <div className="space-y-4">
            <h2 className="text-xl lg:text-2xl font-semibold text-[#1e3a8a] mb-3">Links</h2>

            {artist.portfolioLink && (
              <a
                href={artist.portfolioLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition group"
              >
                <div className="w-10 h-10 bg-[#1e3a8a] rounded-full flex items-center justify-center text-white group-hover:scale-110 transition">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900">Portfólio</p>
                  <p className="text-sm text-gray-500 truncate">Visualizar trabalhos</p>
                </div>
                <svg className="w-5 h-5 text-gray-400 group-hover:text-[#1e3a8a] transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            )}

            {artist.resumeLink && (
              <a
                href={artist.resumeLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition group"
              >
                <div className="w-10 h-10 bg-[#10B981] rounded-full flex items-center justify-center text-white group-hover:scale-110 transition">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900">Currículo</p>
                  <p className="text-sm text-gray-500 truncate">Visualizar currículo artístico</p>
                </div>
                <svg className="w-5 h-5 text-gray-400 group-hover:text-[#10B981] transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            )}

            {artist.socialLink && (
              <a
                href={artist.socialLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition group"
              >
                <div className="w-10 h-10 bg-[#F59E0B] rounded-full flex items-center justify-center text-white group-hover:scale-110 transition">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900">Rede Social</p>
                  <p className="text-sm text-gray-500 truncate">Conectar-se</p>
                </div>
                <svg className="w-5 h-5 text-gray-400 group-hover:text-[#F59E0B] transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            )}
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="px-4 lg:px-40 pb-12">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-xl font-bold text-[#1e3a8a] mb-4">
              Artistas Relacionados em Franca, SP
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {related.map((a) => (
                <ArtistCard key={a._id} artist={a} />
              ))}
            </div>
            <div className="mt-5 text-center">
              <Link
                href={`/busca?category=${encodeURIComponent(artist.categories?.[0] ?? "")}`}
                className="text-sm text-[#1e3a8a] hover:underline font-semibold"
              >
                Ver todos os artistas de {artist.categories?.[0]} →
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
