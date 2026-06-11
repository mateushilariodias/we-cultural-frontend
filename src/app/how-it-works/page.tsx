import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Como se Cadastrar no Nós Cultural — Guia Completo para Artistas",
  description:
    "Aprenda como se cadastrar no Nós Cultural gratuitamente: artistas de Franca, SP, coletivos e espaços culturais. Guia passo a passo da plataforma cultural.",
  alternates: { canonical: "/como-funciona" },
};

const passos = [
  {
    num: "01",
    titulo: "Escolha seu tipo de cadastro",
    desc: "Você pode se cadastrar como Artista Individual, Coletivo Cultural ou Espaço Cultural (galerias, teatros, estúdios). O cadastro é 100% gratuito e leva menos de 5 minutos.",
    links: [
      { href: "/cadastro-de-artista", label: "Cadastrar como Artista" },
      { href: "/cadastro-de-espaco", label: "Cadastrar Espaço Cultural" },
    ],
  },
  {
    num: "02",
    titulo: "Preencha seu perfil",
    desc: "Adicione seu nome, foto de perfil, categorias artísticas (música, teatro, dança, fotografia, etc.), links para portfólio, redes sociais e currículo artístico. Quanto mais completo, melhor sua visibilidade.",
    links: [],
  },
  {
    num: "03",
    titulo: "Seja encontrado",
    desc: "Seu perfil aparece na busca do Nós Cultural para quem pesquisar artistas, coletivos ou espaços em Franca, SP. Pessoas e instituições que buscam artistas locais poderão encontrar você.",
    links: [{ href: "/busca", label: "Ver como ficam os perfis" }],
  },
  {
    num: "04",
    titulo: "Acesse o Dashboard",
    desc: "Após o cadastro, você tem acesso a um dashboard com estatísticas sobre a cena cultural de Franca: distribuição por gênero, categorias mais representadas, diversidade e muito mais.",
    links: [],
  },
];

const categorias = [
  "Música", "Teatro", "Dança", "Cinema", "Fotografia", "Pintura",
  "Escultura", "Literatura", "Arte Digital", "Artesanato", "Design", "Arquitetura",
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "O cadastro é realmente gratuito?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sim, 100% gratuito. Não há taxas, mensalidades ou cobrança de nenhum tipo. A plataforma é mantida para servir a comunidade artística de Franca.",
      },
    },
    {
      "@type": "Question",
      name: "Quem pode se cadastrar?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Artistas de qualquer área (música, teatro, dança, cinema, fotografia, artes plásticas, literatura, etc.), coletivos culturais e espaços como teatros, galerias de arte e estúdios de Franca, SP.",
      },
    },
    {
      "@type": "Question",
      name: "Preciso ser artista profissional?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Não. Tanto artistas profissionais quanto amadores podem se cadastrar. O importante é fazer parte da cena cultural de Franca, SP.",
      },
    },
    {
      "@type": "Question",
      name: "Como meu perfil aparece na busca?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Seu perfil aparece automaticamente na página de busca do Nós Cultural quando alguém pesquisa pelo seu nome ou pela sua categoria artística.",
      },
    },
  ],
};

export default function ComoFuncionaPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <header className="bg-[#1e3a8a] text-white px-4 lg:px-40 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold hover:opacity-90 transition">Nós Cultural</Link>
          <nav className="flex gap-4 text-sm">
            <Link href="/busca" className="hover:underline">Buscar</Link>
            <Link href="/cadastro-de-artista" className="hover:underline">Cadastrar</Link>
          </nav>
        </div>
      </header>

      <Breadcrumb items={[
        { label: "Início", href: "/" },
        { label: "Como Funciona" },
      ]} />

      {/* Hero */}
      <section className="bg-[#1e3a8a] text-white px-4 lg:px-40 py-16">
        <div className="max-w-3xl">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            Como se Cadastrar no Nós Cultural — Guia Completo
          </h1>
          <p className="text-lg text-blue-200 mb-6">
            O Nós Cultural é a plataforma cultural gratuita de Franca, SP que conecta artistas,
            coletivos culturais e espaços como galerias de arte e teatros. Cadastre-se em minutos
            e ganhe visibilidade na cena cultural francana.
          </p>
          <Link href="/cadastro-de-artista" className="inline-block bg-[#F59E0B] text-black font-bold px-6 py-3 rounded-lg hover:bg-yellow-400 transition">
            Cadastrar grátis agora →
          </Link>
        </div>
      </section>

      <div className="px-4 lg:px-40 py-12">
        {/* Passos */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-[#1e3a8a] mb-8 text-center">Passo a Passo do Cadastro</h2>
          <div className="space-y-6">
            {passos.map((p) => (
              <div key={p.num} className="bg-white rounded-xl border border-gray-200 p-6 flex gap-5 items-start">
                <div className="w-14 h-14 bg-[#F59E0B] rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-[#1e3a8a] font-bold text-xl">{p.num}</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-[#1e3a8a] mb-2">{p.titulo}</h3>
                  <p className="text-gray-600 mb-3">{p.desc}</p>
                  {p.links.length > 0 && (
                    <div className="flex gap-3 flex-wrap">
                      {p.links.map((l) => (
                        <Link key={l.href} href={l.href} className="text-sm bg-[#1e3a8a] text-white px-4 py-2 rounded-lg hover:bg-[#15306e] transition font-semibold">
                          {l.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Categorias */}
        <section className="mb-16 bg-white rounded-xl border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-[#1e3a8a] mb-4">Categorias Artísticas Aceitas</h2>
          <p className="text-gray-600 mb-6">
            O Nós Cultural aceita artistas de todas as linguagens criativas. Você pode selecionar
            uma ou mais categorias para seu perfil:
          </p>
          <div className="flex flex-wrap gap-2">
            {categorias.map((cat) => (
              <span key={cat} className="bg-[#1e3a8a]/10 text-[#1e3a8a] px-4 py-2 rounded-full text-sm font-medium">
                {cat}
              </span>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-[#1e3a8a] mb-6">Perguntas Frequentes</h2>
          <div className="space-y-4">
            {[
              { q: "O cadastro é realmente gratuito?", a: "Sim, 100% gratuito. Não há taxas, mensalidades ou cobrança de nenhum tipo. A plataforma é mantida para servir a comunidade artística de Franca." },
              { q: "Quem pode se cadastrar?", a: "Artistas de qualquer área (música, teatro, dança, cinema, fotografia, artes plásticas, literatura, etc.), coletivos culturais e espaços como teatros, galerias de arte e estúdios de Franca, SP." },
              { q: "Preciso ser artista profissional?", a: "Não. Tanto artistas profissionais quanto amadores podem se cadastrar. O importante é fazer parte da cena cultural de Franca, SP." },
              { q: "Como meu perfil aparece na busca?", a: "Seu perfil aparece automaticamente na página de busca do Nós Cultural quando alguém pesquisa pelo seu nome ou pela sua categoria artística." },
            ].map((item) => (
              <div key={item.q} className="bg-white rounded-xl border border-gray-200 p-5">
                <h3 className="font-bold text-[#1e3a8a] mb-2">{item.q}</h3>
                <p className="text-gray-600 text-sm">{item.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA final */}
        <section className="text-center bg-[#1e3a8a] text-white rounded-xl p-10">
          <h2 className="text-2xl font-bold mb-3">Pronto para se cadastrar?</h2>
          <p className="text-blue-200 mb-6">É gratuito, rápido e aumenta sua visibilidade na cena cultural de Franca, SP.</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/cadastro-de-artista" className="bg-[#F59E0B] text-black font-bold px-6 py-3 rounded-lg hover:bg-yellow-400 transition">
              Cadastrar como Artista
            </Link>
            <Link href="/cadastro-de-espaco" className="border border-white px-6 py-3 rounded-lg hover:bg-white hover:text-[#1e3a8a] transition font-semibold">
              Cadastrar Espaço Cultural
            </Link>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
