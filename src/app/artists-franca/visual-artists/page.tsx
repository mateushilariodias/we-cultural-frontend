import type { Metadata } from "next";
import Link from "next/link";
import { fetchArtistsByCategory } from "@/lib/fetchData";
import ArtistCard from "@/components/cards/ArtistCard";
import Breadcrumb from "@/components/Breadcrumb";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Artistas Plásticos de Franca, SP — Pintores, Escultores e Artistas Visuais",
  description:
    "Conheça pintores, escultores, artistas digitais e artesãos de Franca, SP. Artistas plásticos cadastrados na plataforma Nós Cultural.",
  alternates: { canonical: "/artistas-de-franca/artistas-plasticos" },
};

export default async function ArtistasPlasticosPage() {
  const artistas = await fetchArtistsByCategory([
    "Pintura", "Escultura", "Arte Digital", "Artesanato", "Design",
  ]);

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

      <Breadcrumb items={[
        { label: "Início", href: "/" },
        { label: "Artistas de Franca", href: "/artistas-de-franca" },
        { label: "Artistas Plásticos" },
      ]} />

      <section className="bg-[#1e3a8a] text-white px-4 lg:px-40 py-12">
        <h1 className="text-3xl lg:text-4xl font-bold mb-3">
          Artistas Plásticos de Franca, SP
        </h1>
        <p className="text-blue-200 max-w-2xl">
          Pintores, escultores, artistas digitais, designers e artesãos de Franca, SP.
          As artes visuais têm presença forte na cidade — conheça os artistas plásticos
          cadastrados no Nós Cultural e explore galerias de arte locais.
        </p>
      </section>

      <div className="px-4 lg:px-40 py-10">
        {artistas.length > 0 ? (
          <>
            <p className="text-gray-600 mb-6">{artistas.length} artista{artistas.length !== 1 ? "s" : ""} plástico{artistas.length !== 1 ? "s" : ""} em Franca, SP</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {artistas.map((a) => <ArtistCard key={a._id} artist={a} />)}
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <p className="text-2xl mb-2">🎨</p>
            <h2 className="text-xl font-bold text-gray-700 mb-2">Nenhum artista plástico cadastrado ainda</h2>
            <p className="text-gray-500 mb-6">Seja o primeiro artista plástico de Franca a se cadastrar!</p>
            <Link href="/cadastro-de-artista" className="bg-[#1e3a8a] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#15306e] transition">
              Cadastrar meu perfil grátis
            </Link>
          </div>
        )}

        <div className="mt-12 p-6 bg-white rounded-xl border border-gray-200">
          <h2 className="text-xl font-bold text-[#1e3a8a] mb-3">Você é artista plástico em Franca?</h2>
          <p className="text-gray-600 mb-4">
            Cadastre seu perfil gratuitamente e tenha visibilidade na galeria de arte virtual
            do Nós Cultural. Conecte-se com o público e outros profissionais criativos de Franca, SP.
          </p>
          <Link href="/cadastro-de-artista" className="inline-block bg-[#F59E0B] text-black font-bold px-5 py-2.5 rounded-lg hover:bg-yellow-400 transition">
            Cadastrar meu perfil grátis
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
