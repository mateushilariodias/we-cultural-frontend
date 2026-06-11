import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Agenda Cultural de Franca, SP — Eventos, Shows e Espetáculos",
  description:
    "Confira a agenda de eventos culturais de Franca, SP: shows de música, espetáculos de teatro, exposições de arte, saraus, dança e muito mais no Nós Cultural.",
  alternates: { canonical: "/cultura-franca/agenda" },
};

const tiposDeEvento = [
  { emoji: "🎵", tipo: "Shows e Concertos", desc: "Apresentações musicais de artistas e bandas de Franca" },
  { emoji: "🎭", tipo: "Teatro e Dança", desc: "Espetáculos teatrais e apresentações de dança na cidade" },
  { emoji: "🖼️", tipo: "Exposições de Arte", desc: "Mostras e exposições de artistas plásticos locais" },
  { emoji: "📖", tipo: "Literatura e Saraus", desc: "Saraus, lançamentos de livros e noites literárias" },
  { emoji: "🎬", tipo: "Cinema e Audiovisual", desc: "Mostras de cinema e produções audiovisuais independentes" },
  { emoji: "🎪", tipo: "Festivais Culturais", desc: "Festivais e feiras culturais que acontecem em Franca" },
];

export default function AgendaPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-[#1e3a8a] text-white px-4 lg:px-40 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold hover:opacity-90 transition">Nós Cultural</Link>
          <nav className="flex gap-4 text-sm">
            <Link href="/agenda" className="hover:underline">Agenda</Link>
            <Link href="/entrar" className="hover:underline">Login</Link>
          </nav>
        </div>
      </header>

      <Breadcrumb items={[
        { label: "Início", href: "/" },
        { label: "Cultura de Franca", href: "/cultura-franca" },
        { label: "Agenda Cultural" },
      ]} />

      <section className="bg-[#1e3a8a] text-white px-4 lg:px-40 py-12">
        <h1 className="text-3xl lg:text-4xl font-bold mb-3">
          Agenda Cultural de Franca, SP
        </h1>
        <p className="text-blue-200 max-w-2xl">
          Eventos culturais, shows de música, espetáculos de teatro, exposições de arte,
          saraus e muito mais acontecendo em Franca, SP. Acompanhe a agenda cultural da cidade
          e não perca nenhum evento.
        </p>
        <Link href="/agenda" className="inline-block mt-6 bg-[#F59E0B] text-black font-bold px-6 py-3 rounded-lg hover:bg-yellow-400 transition">
          Ver agenda completa →
        </Link>
      </section>

      <div className="px-4 lg:px-40 py-12">
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[#1e3a8a] mb-6">Tipos de Eventos Culturais em Franca</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {tiposDeEvento.map((e) => (
              <div key={e.tipo} className="bg-white rounded-xl border border-gray-200 p-5">
                <p className="text-3xl mb-3">{e.emoji}</p>
                <h3 className="font-bold text-[#1e3a8a] mb-2">{e.tipo}</h3>
                <p className="text-sm text-gray-600">{e.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-[#1e3a8a] text-white rounded-xl p-8 text-center">
          <h2 className="text-xl font-bold mb-3">Acesse a Agenda Completa</h2>
          <p className="text-blue-200 mb-6">
            Veja todos os eventos culturais cadastrados na plataforma Nós Cultural.
          </p>
          <Link href="/agenda" className="bg-[#F59E0B] text-black font-bold px-6 py-3 rounded-lg hover:bg-yellow-400 transition inline-block">
            Ver agenda de eventos →
          </Link>
        </section>
      </div>

      <Footer />
    </div>
  );
}
