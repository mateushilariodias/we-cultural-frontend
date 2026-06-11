import type { Metadata } from "next";
import Link from "next/link";
import { fetchAllEquipments } from "@/lib/fetchData";
import EquipmentCard from "@/components/cards/EquipmentCard";
import Breadcrumb from "@/components/Breadcrumb";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Teatros e Espaços Culturais em Franca, SP — Galerias, Estúdios e Centros",
  description:
    "Conheça teatros, galerias de arte, estúdios e centros culturais de Franca, SP. Espaços culturais cadastrados na plataforma Nós Cultural.",
  alternates: { canonical: "/cultura-franca/teatros-e-espacos" },
};

export default async function TeatrosEEspacosPage() {
  const espacos = await fetchAllEquipments();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-[#059669] text-white px-4 lg:px-40 py-4">
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
        { label: "Teatros e Espaços Culturais" },
      ]} />

      <section className="bg-[#059669] text-white px-4 lg:px-40 py-12">
        <h1 className="text-3xl lg:text-4xl font-bold mb-3">
          Teatros e Espaços Culturais em Franca, SP
        </h1>
        <p className="text-green-100 max-w-2xl">
          Galerias de arte, teatros, estúdios, centros culturais e outros espaços para a
          prática e fruição da cultura em Franca, SP. Conheça os espaços cadastrados no
          Nós Cultural e descubra onde a cultura acontece na cidade.
        </p>
      </section>

      <div className="px-4 lg:px-40 py-10">
        {espacos.length > 0 ? (
          <>
            <p className="text-gray-600 mb-6">{espacos.length} espaço{espacos.length !== 1 ? "s" : ""} cultural{espacos.length !== 1 ? "is" : ""} em Franca, SP</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {espacos.map((e) => <EquipmentCard key={e._id} equipment={e} />)}
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <p className="text-2xl mb-2">🏛️</p>
            <h2 className="text-xl font-bold text-gray-700 mb-2">Nenhum espaço cadastrado ainda</h2>
            <p className="text-gray-500 mb-6">Seja o primeiro espaço cultural de Franca a se cadastrar!</p>
            <Link href="/cadastro-de-espaco" className="bg-[#059669] text-white px-6 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition">
              Cadastrar espaço cultural
            </Link>
          </div>
        )}

        <div className="mt-12 p-6 bg-white rounded-xl border border-gray-200">
          <h2 className="text-xl font-bold text-[#059669] mb-3">Você tem um espaço cultural em Franca?</h2>
          <p className="text-gray-600 mb-4">
            Teatros, galerias de arte, estúdios, centros comunitários e outros espaços podem
            se cadastrar gratuitamente no Nós Cultural para ganhar visibilidade e conectar com
            artistas de Franca, SP.
          </p>
          <Link href="/cadastro-de-espaco" className="inline-block bg-[#F59E0B] text-black font-bold px-5 py-2.5 rounded-lg hover:bg-yellow-400 transition">
            Cadastrar espaço grátis
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
