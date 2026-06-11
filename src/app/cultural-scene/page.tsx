import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import { API_ENDPOINTS } from "@/config/api";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Cenário Cultural de Franca em Números — Dados e Estatísticas",
  description:
    "Conheça o perfil da cena cultural de Franca, SP em dados: quantos artistas, quais as categorias mais representadas, diversidade e muito mais. Fonte: plataforma Nós Cultural.",
  alternates: { canonical: "/cenario-cultural" },
};

interface Stats {
  totais: { totalArtistas: number; totalColetivos: number; totalEquipamentos: number };
  artistasPorGenero: Array<{ genero: string; _count: { genero: number } }>;
  artistasFaixaEtaria: Record<string, number>;
  artistasDiversidade: { lgbtqiapn: number; negros: number; indigenas: number; pcd: number };
  topCategorias: Array<{ categoria: string; total: number }>;
}

async function getStats(): Promise<Stats | null> {
  try {
    const res = await fetch(API_ENDPOINTS.stats, { next: { revalidate: 3600 } });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export default async function CenarioCulturalPage() {
  const stats = await getStats();

  const totais = stats?.totais ?? { totalArtistas: 0, totalColetivos: 0, totalEquipamentos: 0 };
  const diversidade = stats?.artistasDiversidade ?? { lgbtqiapn: 0, negros: 0, indigenas: 0, pcd: 0 };
  const topCategorias = stats?.topCategorias ?? [];
  const faixas = stats?.artistasFaixaEtaria ?? {};
  const generos = stats?.artistasPorGenero ?? [];

  const totalArtistas = totais.totalArtistas || 1;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-[#1e3a8a] text-white px-4 lg:px-40 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold hover:opacity-90 transition">Nós Cultural</Link>
          <nav className="flex gap-4 text-sm">
            <Link href="/busca" className="hover:underline">Buscar</Link>
            <Link href="/artistas-de-franca" className="hover:underline">Artistas</Link>
          </nav>
        </div>
      </header>

      <Breadcrumb items={[
        { label: "Início", href: "/" },
        { label: "Cenário Cultural em Números" },
      ]} />

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#1e3a8a] to-[#0f172a] text-white px-4 lg:px-40 py-16">
        <div className="max-w-4xl">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            Cenário Cultural de Franca em Números
          </h1>
          <p className="text-lg text-blue-200 mb-6">
            Dados reais da plataforma Nós Cultural sobre a cena artística de Franca, SP:
            quem são os artistas, quais linguagens predominam, perfil de diversidade e muito mais.
            Dados atualizados em tempo real.
          </p>
          <div className="grid grid-cols-3 gap-6 mt-8">
            <div className="text-center">
              <p className="text-4xl font-bold text-yellow-400">{totais.totalArtistas}</p>
              <p className="text-sm text-blue-200 mt-1">Artistas</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-yellow-400">{totais.totalColetivos}</p>
              <p className="text-sm text-blue-200 mt-1">Coletivos</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-yellow-400">{totais.totalEquipamentos}</p>
              <p className="text-sm text-blue-200 mt-1">Espaços Culturais</p>
            </div>
          </div>
        </div>
      </section>

      <div className="px-4 lg:px-40 py-12 space-y-10">

        {/* Top categorias */}
        {topCategorias.length > 0 && (
          <section className="bg-white rounded-xl border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-[#1e3a8a] mb-2">Categorias Artísticas Mais Representadas</h2>
            <p className="text-gray-500 text-sm mb-6">Ranking das linguagens com mais artistas cadastrados</p>
            <div className="space-y-4">
              {topCategorias.map((cat, i) => {
                const pct = Math.round((cat.total / totalArtistas) * 100);
                return (
                  <div key={cat.categoria}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-semibold text-gray-800">
                        {i + 1}. {cat.categoria}
                      </span>
                      <span className="text-gray-500">{cat.total} artistas ({pct}%)</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-3">
                      <div
                        className="bg-[#1e3a8a] h-3 rounded-full"
                        style={{ width: `${Math.max(pct, 2)}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
            <p className="text-xs text-gray-400 mt-4">
              * Um artista pode ter mais de uma categoria. Percentual calculado sobre o total de artistas.
            </p>
          </section>
        )}

        {/* Diversidade */}
        <section className="bg-white rounded-xl border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-[#1e3a8a] mb-2">Perfil de Diversidade</h2>
          <p className="text-gray-500 text-sm mb-6">
            Artistas que se identificam com marcadores sociais de diversidade
          </p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { label: "LGBTQIA+", value: diversidade.lgbtqiapn, color: "bg-pink-500" },
              { label: "Pessoa Negra", value: diversidade.negros, color: "bg-blue-600" },
              { label: "Pessoa Indígena", value: diversidade.indigenas, color: "bg-amber-500" },
              { label: "PcD", value: diversidade.pcd, color: "bg-red-500" },
            ].map((item) => (
              <div key={item.label} className="text-center p-5 bg-gray-50 rounded-xl">
                <div className={`w-12 h-12 ${item.color} rounded-full mx-auto mb-3 flex items-center justify-center`}>
                  <span className="text-white font-bold text-lg">{item.value}</span>
                </div>
                <p className="font-semibold text-gray-800 text-sm">{item.label}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {totalArtistas > 0 ? Math.round((item.value / totais.totalArtistas) * 100) : 0}% dos artistas
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Faixas etárias */}
        {Object.keys(faixas).length > 0 && (
          <section className="bg-white rounded-xl border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-[#1e3a8a] mb-2">Faixa Etária dos Artistas</h2>
            <p className="text-gray-500 text-sm mb-6">Distribuição por idade dos artistas cadastrados</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {Object.entries(faixas).map(([faixa, qtd]) => (
                <div key={faixa} className="text-center p-4 bg-blue-50 rounded-xl">
                  <p className="text-3xl font-bold text-[#1e3a8a]">{qtd as number}</p>
                  <p className="text-sm text-gray-600 mt-1">{faixa} anos</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Gênero */}
        {generos.length > 0 && (
          <section className="bg-white rounded-xl border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-[#1e3a8a] mb-2">Distribuição por Identidade de Gênero</h2>
            <p className="text-gray-500 text-sm mb-6">Como os artistas de Franca se identificam</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {generos.map((g) => {
                const qtd = g._count?.genero ?? 0;
                return (
                  <div key={g.genero} className="p-4 bg-gray-50 rounded-xl">
                    <p className="text-2xl font-bold text-[#1e3a8a]">{qtd}</p>
                    <p className="text-sm text-gray-600 mt-1">{g.genero || "Não informado"}</p>
                    <p className="text-xs text-gray-400">
                      {totais.totalArtistas > 0 ? Math.round((qtd / totais.totalArtistas) * 100) : 0}%
                    </p>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Contexto editorial */}
        <section className="bg-white rounded-xl border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-[#1e3a8a] mb-4">Sobre os Dados</h2>
          <div className="grid md:grid-cols-2 gap-6 text-gray-600 text-sm leading-relaxed">
            <div>
              <h3 className="font-bold text-[#1e3a8a] mb-2">Fonte e Metodologia</h3>
              <p>
                Todos os dados são coletados diretamente dos cadastros voluntários realizados
                na plataforma <strong>Nós Cultural</strong>. Os artistas, coletivos e espaços
                culturais preenchem seus próprios perfis, garantindo que os dados reflitam
                a auto-identificação de cada agente cultural.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-[#1e3a8a] mb-2">Atualização</h3>
              <p>
                Os números são atualizados automaticamente a cada hora. O banco de dados reflete
                o estado atual da plataforma, incluindo novos cadastros e atualizações de perfil
                feitas pelos próprios artistas.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center bg-[#1e3a8a] text-white rounded-xl p-10">
          <h2 className="text-2xl font-bold mb-3">Contribua com esses números</h2>
          <p className="text-blue-200 mb-6">
            Se você é artista, faz parte de um coletivo ou gerencia um espaço cultural em Franca, SP,
            cadastre-se gratuitamente e apareça nessas estatísticas.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/cadastro-de-artista" className="bg-[#F59E0B] text-black font-bold px-6 py-3 rounded-lg hover:bg-yellow-400 transition">
              Cadastrar como Artista
            </Link>
            <Link href="/busca" className="border border-white px-6 py-3 rounded-lg hover:bg-white hover:text-[#1e3a8a] transition font-semibold">
              Explorar Perfis
            </Link>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
