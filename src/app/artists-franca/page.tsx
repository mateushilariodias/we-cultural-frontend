import type { Metadata } from "next";
import Link from "next/link";
import { fetchAllArtists } from "@/lib/fetchData";
import ArtistCard from "@/components/cards/ArtistCard";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Artistas de Franca, SP — Guia Completo",
  description:
    "Conheça todos os artistas de Franca, SP cadastrados no Nós Cultural: músicos, atores, fotógrafos, artistas plásticos, escritores e muito mais.",
  alternates: { canonical: "/artistas-de-franca" },
};

const subcategorias = [
  { href: "/artistas-de-franca/musicos", label: "🎵 Músicos", desc: "Bandas, cantores e instrumentistas de Franca" },
  { href: "/artistas-de-franca/atores", label: "🎭 Atores e Teatro", desc: "Atores, diretores e artistas cênicos" },
  { href: "/artistas-de-franca/artistas-plasticos", label: "🎨 Artistas Plásticos", desc: "Pintores, escultores e artistas visuais" },
  { href: "/artistas-de-franca/fotografos", label: "📷 Fotógrafos", desc: "Fotógrafos profissionais e amadores" },
  { href: "/artistas-de-franca/escritores", label: "📖 Escritores", desc: "Poetas, romancistas e escritores locais" },
];

export default async function ArtistasDeFramcaPilar() {
  const artists = await fetchAllArtists();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-[#1e3a8a] text-white px-4 lg:px-40 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold hover:opacity-90 transition">Nós Cultural</Link>
          <nav className="flex gap-4 text-sm">
            <Link href="/busca" className="hover:underline">Buscar</Link>
            <Link href="/entrar" className="hover:underline">Login</Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-[#1e3a8a] text-white px-4 lg:px-40 py-16">
        <div className="max-w-4xl">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            Artistas de Franca, SP — Guia Completo
          </h1>
          <p className="text-lg text-blue-200 mb-6">
            A cena artística de Franca é diversa e vibrante. No Nós Cultural você encontra
            artistas independentes de todas as linguagens — da música ao teatro, da fotografia
            às artes plásticas. Atualmente são <strong className="text-white">{artists.length} artistas</strong> cadastrados
            na plataforma, representando a riqueza cultural da cidade.
          </p>
          <Link
            href="/cadastro-de-artista"
            className="inline-block bg-[#F59E0B] text-black font-bold px-6 py-3 rounded-lg hover:bg-yellow-400 transition"
          >
            Cadastrar meu perfil grátis
          </Link>
        </div>
      </section>

      <div className="px-4 lg:px-40 py-12">
        {/* Subcategorias */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-[#1e3a8a] mb-6">Explorar por Área</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {subcategorias.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className="p-5 bg-white rounded-xl border-2 border-gray-200 hover:border-[#1e3a8a] hover:shadow-md transition group"
              >
                <p className="text-lg font-bold text-[#1e3a8a] group-hover:text-[#F59E0B] transition mb-1">{s.label}</p>
                <p className="text-sm text-gray-600">{s.desc}</p>
              </Link>
            ))}
            <Link
              href="/busca"
              className="p-5 bg-white rounded-xl border-2 border-dashed border-gray-300 hover:border-[#1e3a8a] hover:shadow-md transition group"
            >
              <p className="text-lg font-bold text-gray-600 group-hover:text-[#1e3a8a] transition mb-1">🔍 Ver Todos</p>
              <p className="text-sm text-gray-500">Busca completa por nome ou categoria</p>
            </Link>
          </div>
        </section>

        {/* Grid de artistas */}
        <section>
          <h2 className="text-2xl font-bold text-[#1e3a8a] mb-6">
            Todos os Artistas de Franca ({artists.length})
          </h2>
          {artists.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {artists.map((a) => <ArtistCard key={a._id} artist={a} />)}
            </div>
          ) : (
            <p className="text-gray-500">Nenhum artista cadastrado ainda.</p>
          )}
        </section>
      </div>

      <Footer />
    </div>
  );
}
