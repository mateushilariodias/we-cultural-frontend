import type { Metadata } from "next";
import Link from "next/link";
import { fetchAllCollectives } from "@/lib/fetchData";
import CollectiveCard from "@/components/cards/CollectiveCard";
import Breadcrumb from "@/components/Breadcrumb";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Coletivos Culturais de Franca, SP — Grupos Artísticos e Iniciativas",
  description:
    "Conheça os coletivos culturais de Franca, SP: grupos artísticos, iniciativas colaborativas e projetos coletivos cadastrados no Nós Cultural.",
  alternates: { canonical: "/cultura-franca/coletivos" },
};

export default async function ColetivosPage() {
  const coletivos = await fetchAllCollectives();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-[#7c3aed] text-white px-4 lg:px-40 py-4">
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
        { label: "Cultura de Franca", href: "/cultura-franca" },
        { label: "Coletivos Culturais" },
      ]} />

      <section className="bg-[#7c3aed] text-white px-4 lg:px-40 py-12">
        <h1 className="text-3xl lg:text-4xl font-bold mb-3">
          Coletivos Culturais de Franca, SP
        </h1>
        <p className="text-purple-200 max-w-2xl">
          Grupos artísticos, coletivos independentes e iniciativas culturais colaborativas
          de Franca, SP. Conheça os coletivos cadastrados no Nós Cultural e descubra projetos
          que promovem a arte e a cultura na cidade.
        </p>
      </section>

      <div className="px-4 lg:px-40 py-10">
        {coletivos.length > 0 ? (
          <>
            <p className="text-gray-600 mb-6">{coletivos.length} coletivo{coletivos.length !== 1 ? "s" : ""} cultural{coletivos.length !== 1 ? "is" : ""} em Franca, SP</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {coletivos.map((c) => <CollectiveCard key={c._id} collective={c} />)}
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <p className="text-2xl mb-2">🤝</p>
            <h2 className="text-xl font-bold text-gray-700 mb-2">Nenhum coletivo cadastrado ainda</h2>
            <p className="text-gray-500 mb-6">Seja o primeiro coletivo cultural de Franca a se cadastrar!</p>
            <Link href="/cadastro-de-artista" className="bg-[#7c3aed] text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition">
              Cadastrar coletivo
            </Link>
          </div>
        )}

        <div className="mt-12 p-6 bg-white rounded-xl border border-gray-200">
          <h2 className="text-xl font-bold text-[#7c3aed] mb-3">Você faz parte de um coletivo cultural em Franca?</h2>
          <p className="text-gray-600 mb-4">
            Coletivos artísticos, grupos de teatro, bandas e outras iniciativas culturais colaborativas
            podem se cadastrar gratuitamente no Nós Cultural para ganhar visibilidade em Franca, SP.
          </p>
          <Link href="/cadastro-de-artista" className="inline-block bg-[#F59E0B] text-black font-bold px-5 py-2.5 rounded-lg hover:bg-yellow-400 transition">
            Cadastrar coletivo grátis
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
