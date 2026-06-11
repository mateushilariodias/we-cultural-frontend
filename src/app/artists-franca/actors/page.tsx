import type { Metadata } from "next";
import Link from "next/link";
import { fetchArtistsByCategory } from "@/lib/fetchData";
import ArtistCard from "@/components/cards/ArtistCard";
import Breadcrumb from "@/components/Breadcrumb";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Atores e Artistas de Teatro de Franca, SP",
  description:
    "Conheça atores, diretores e artistas cênicos de Franca, SP. Profissionais de teatro e cinema cadastrados no Nós Cultural.",
  alternates: { canonical: "/artistas-de-franca/atores" },
};

export default async function AtoresPage() {
  const atores = await fetchArtistsByCategory(["Teatro", "Cinema"]);

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
        { label: "Atores e Teatro" },
      ]} />

      <section className="bg-[#1e3a8a] text-white px-4 lg:px-40 py-12">
        <h1 className="text-3xl lg:text-4xl font-bold mb-3">
          Atores e Artistas de Teatro de Franca, SP
        </h1>
        <p className="text-blue-200 max-w-2xl">
          Atores, diretores, dramaturgos e profissionais de cinema de Franca, SP. O teatro
          francano tem uma tradição rica — conheça os artistas cênicos cadastrados na plataforma
          cultural gratuita Nós Cultural.
        </p>
      </section>

      <div className="px-4 lg:px-40 py-10">
        {atores.length > 0 ? (
          <>
            <p className="text-gray-600 mb-6">{atores.length} artista{atores.length !== 1 ? "s" : ""} de teatro e cinema em Franca, SP</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {atores.map((a) => <ArtistCard key={a._id} artist={a} />)}
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <p className="text-2xl mb-2">🎭</p>
            <h2 className="text-xl font-bold text-gray-700 mb-2">Nenhum ator cadastrado ainda</h2>
            <p className="text-gray-500 mb-6">Seja o primeiro ator de Franca a se cadastrar!</p>
            <Link href="/cadastro-de-artista" className="bg-[#1e3a8a] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#15306e] transition">
              Cadastrar como Ator
            </Link>
          </div>
        )}

        <div className="mt-12 p-6 bg-white rounded-xl border border-gray-200">
          <h2 className="text-xl font-bold text-[#1e3a8a] mb-3">Você atua em teatro ou cinema em Franca?</h2>
          <p className="text-gray-600 mb-4">
            Cadastre-se gratuitamente e apareça para produtores, diretores e o público que busca
            talentos cênicos em Franca, SP.
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
