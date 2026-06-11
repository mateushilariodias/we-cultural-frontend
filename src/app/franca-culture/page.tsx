import type { Metadata } from "next";
import Link from "next/link";
import { fetchAllArtists, fetchAllCollectives, fetchAllEquipments } from "@/lib/fetchData";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Cena Cultural de Franca, SP — O que Está Acontecendo",
  description:
    "Descubra a cena cultural de Franca, SP: espaços culturais, coletivos artísticos, agenda de eventos e muito mais. Tudo em um só lugar no Nós Cultural.",
  alternates: { canonical: "/cultura-franca" },
};

export default async function CulturaFrancaPilar() {
  const [artists, collectives, equipments] = await Promise.all([
    fetchAllArtists(),
    fetchAllCollectives(),
    fetchAllEquipments(),
  ]);

  const sections = [
    {
      href: "/cultura-franca/teatros-e-espacos",
      emoji: "🏛️",
      title: "Teatros e Espaços Culturais",
      desc: `${equipments.length} espaço${equipments.length !== 1 ? "s" : ""} cadastrado${equipments.length !== 1 ? "s" : ""} — galerias de arte, teatros, estúdios e centros culturais de Franca.`,
    },
    {
      href: "/cultura-franca/coletivos",
      emoji: "🤝",
      title: "Coletivos Culturais",
      desc: `${collectives.length} coletivo${collectives.length !== 1 ? "s" : ""} cadastrado${collectives.length !== 1 ? "s" : ""} — grupos artísticos e iniciativas culturais colaborativas de Franca.`,
    },
    {
      href: "/cultura-franca/agenda",
      emoji: "📅",
      title: "Agenda Cultural de Franca",
      desc: "Shows, espetáculos de teatro, exposições de arte, saraus, dança e eventos culturais na cidade.",
    },
  ];

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
      <section className="bg-gradient-to-br from-[#1e3a8a] to-[#7c3aed] text-white px-4 lg:px-40 py-16">
        <div className="max-w-4xl">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            Cena Cultural de Franca, SP — O que Está Acontecendo
          </h1>
          <p className="text-lg text-blue-200 mb-4">
            Franca tem uma cena cultural ativa e diversa. No Nós Cultural centralizamos tudo:
            artistas independentes, coletivos artísticos, espaços como galerias de arte e teatros,
            e a agenda de eventos culturais da cidade.
          </p>
          <div className="flex gap-6 text-center mt-8 flex-wrap">
            <div>
              <p className="text-3xl font-bold text-yellow-400">{artists.length}</p>
              <p className="text-sm text-blue-200">Artistas</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-yellow-400">{collectives.length}</p>
              <p className="text-sm text-blue-200">Coletivos</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-yellow-400">{equipments.length}</p>
              <p className="text-sm text-blue-200">Espaços Culturais</p>
            </div>
          </div>
        </div>
      </section>

      <div className="px-4 lg:px-40 py-12">
        {/* Seções */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-[#1e3a8a] mb-6">Explorar a Cultura de Franca</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {sections.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className="p-6 bg-white rounded-xl border-2 border-gray-200 hover:border-[#1e3a8a] hover:shadow-md transition group"
              >
                <p className="text-4xl mb-3">{s.emoji}</p>
                <h3 className="text-xl font-bold text-[#1e3a8a] group-hover:text-[#F59E0B] transition mb-2">{s.title}</h3>
                <p className="text-sm text-gray-600">{s.desc}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Sobre a cena */}
        <section className="bg-white rounded-xl p-8 border border-gray-200 mb-12">
          <h2 className="text-2xl font-bold text-[#1e3a8a] mb-4">Por que Franca tem uma Cena Cultural Rica?</h2>
          <div className="grid md:grid-cols-2 gap-6 text-gray-600">
            <div>
              <h3 className="font-bold text-[#1e3a8a] mb-2">Diversidade Artística</h3>
              <p>A cidade conta com artistas atuando em música, teatro, dança, cinema, fotografia,
              artes plásticas, literatura e outras linguagens culturais. Essa diversidade reflete
              a vitalidade criativa da população francana.</p>
            </div>
            <div>
              <h3 className="font-bold text-[#1e3a8a] mb-2">Inclusão e Diversidade</h3>
              <p>O Nós Cultural valoriza artistas LGBTQIA+, negros, indígenas e pessoas com
              deficiência, promovendo uma cena cultural plural e representativa da diversidade
              de Franca, SP.</p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center bg-[#1e3a8a] text-white rounded-xl p-10">
          <h2 className="text-2xl font-bold mb-3">Faça parte da cena cultural de Franca</h2>
          <p className="text-blue-200 mb-6">Cadastre-se gratuitamente e ganhe visibilidade na plataforma.</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/cadastro-de-artista" className="bg-[#F59E0B] text-black font-bold px-6 py-3 rounded-lg hover:bg-yellow-400 transition">
              Cadastrar como Artista
            </Link>
            <Link href="/busca" className="border border-white px-6 py-3 rounded-lg hover:bg-white hover:text-[#1e3a8a] transition font-semibold">
              Explorar Cadastros
            </Link>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
