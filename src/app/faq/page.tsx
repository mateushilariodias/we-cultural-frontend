import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "FAQ — Perguntas Frequentes sobre o Nós Cultural de Franca, SP",
  description:
    "Tire suas dúvidas sobre o Nós Cultural: como se cadastrar, quem pode participar, como funciona a busca, privacidade, agenda de eventos e muito mais.",
  alternates: { canonical: "/perguntas-frequentes" },
};

const faqs = [
  {
    grupo: "Sobre a Plataforma",
    items: [
      {
        q: "O que é o Nós Cultural?",
        a: "O Nós Cultural é uma plataforma cultural gratuita de Franca, SP, que conecta artistas independentes, coletivos culturais e espaços como galerias de arte e teatros. O objetivo é dar visibilidade à cena cultural local e facilitar o encontro entre quem produz e quem consome cultura na cidade.",
      },
      {
        q: "O Nós Cultural é gratuito?",
        a: "Sim, 100% gratuito. Não há mensalidade, taxa de cadastro ou qualquer cobrança para artistas, coletivos ou espaços culturais. A plataforma é mantida como serviço público à comunidade artística de Franca.",
      },
      {
        q: "Quem criou o Nós Cultural?",
        a: "O Nós Cultural foi desenvolvido como iniciativa independente para mapear e valorizar a cena cultural de Franca, SP. A plataforma reúne artistas de todas as linguagens, coletivos culturais e equipamentos culturais (teatros, galerias, estúdios e centros culturais) da cidade.",
      },
    ],
  },
  {
    grupo: "Cadastro de Artistas",
    items: [
      {
        q: "Quem pode se cadastrar como artista?",
        a: "Qualquer pessoa que atue na cena cultural de Franca, SP, seja profissional ou amadora, pode se cadastrar. Músicos, atores, fotógrafos, artistas plásticos, escritores, dançarinos, cineastas, designers e artistas de qualquer outra linguagem são bem-vindos.",
      },
      {
        q: "Como me cadastrar como artista no Nós Cultural?",
        a: "Acesse a página de cadastro, preencha seu nome, e-mail, telefone, identidade de gênero, categorias artísticas e links para portfólio, redes sociais e currículo. O processo leva menos de 5 minutos e é 100% gratuito. Após o cadastro, seu perfil aparece automaticamente na busca da plataforma.",
      },
      {
        q: "Preciso ser artista profissional para me cadastrar?",
        a: "Não. O Nós Cultural recebe artistas profissionais e amadores. O único critério é fazer parte da cena cultural de Franca, SP — seja atuando em shows, exposições, teatro, literatura, fotografia ou qualquer outra manifestação artística.",
      },
      {
        q: "Posso cadastrar mais de uma categoria artística?",
        a: "Sim. Você pode selecionar quantas categorias quiser no seu perfil. Se você faz música e fotografia ao mesmo tempo, por exemplo, seu perfil aparecerá nos resultados de busca para ambas as categorias.",
      },
      {
        q: "Como faço para atualizar meu perfil depois do cadastro?",
        a: "Acesse o painel do artista com seu e-mail e senha. Em 'Configurações do Perfil' você pode editar foto, categorias, links e todas as informações do seu cadastro a qualquer momento.",
      },
    ],
  },
  {
    grupo: "Coletivos e Espaços Culturais",
    items: [
      {
        q: "Como cadastrar um coletivo cultural?",
        a: "Coletivos culturais podem criar perfil próprio na plataforma, com nome, descrição, categorias, número de membros e links de redes sociais. O cadastro de coletivos é feito pela página de login de coletivos, separado do cadastro de artistas individuais.",
      },
      {
        q: "O que é um 'espaço cultural' no Nós Cultural?",
        a: "Espaços culturais (também chamados de 'equipamentos culturais') são lugares físicos onde acontece cultura em Franca: teatros, galerias de arte, museus, centros culturais, estúdios de ensaio, livrarias, casas de show e espaços similares. Esses locais podem ter perfil próprio na plataforma com endereço, CNPJ, categorias e link para o website.",
      },
    ],
  },
  {
    grupo: "Busca e Visibilidade",
    items: [
      {
        q: "Como meu perfil aparece na busca?",
        a: "Seu perfil aparece automaticamente na página de busca do Nós Cultural quando alguém pesquisa pelo seu nome ou pela sua categoria artística. Perfis com foto, categorias e links preenchidos tendem a ter mais destaque. A busca também está indexada no Google — quem pesquisar seu nome + 'Franca' pode encontrar seu perfil.",
      },
      {
        q: "Posso contratar artistas pelo Nós Cultural?",
        a: "O Nós Cultural não funciona como marketplace de contratação, mas disponibiliza o contato (e-mail e telefone) de cada artista cadastrado. Quem quiser contratar um artista pode entrar em contato diretamente pelo perfil deles na plataforma.",
      },
    ],
  },
  {
    grupo: "Agenda de Eventos",
    items: [
      {
        q: "Como funciona a agenda cultural?",
        a: "A agenda exibe os eventos culturais da semana corrente em Franca, SP. É atualizada automaticamente toda segunda-feira com os novos eventos cadastrados. Cada evento pode ter data, horário, local, descrição, imagem e links para mais informações.",
      },
      {
        q: "Como cadastrar um evento na agenda?",
        a: "O cadastro de eventos é feito pelo painel administrativo da plataforma. Artistas e espaços com perfil ativo podem solicitar a inclusão de seus eventos entrando em contato com a plataforma.",
      },
      {
        q: "Posso ver eventos de meses anteriores?",
        a: "A agenda exibe os eventos da semana atual. Eventos passados não ficam disponíveis na listagem principal, mas podem ser encontrados pelo Google se já foram indexados anteriormente.",
      },
    ],
  },
  {
    grupo: "Privacidade e Dados",
    items: [
      {
        q: "Meus dados são públicos no perfil?",
        a: "Sim. Nome, e-mail, telefone, categorias artísticas, identidade de gênero, marcadores sociais e links são exibidos publicamente no seu perfil. O objetivo é que quem busca artistas possa entrar em contato diretamente. Se você não quiser que alguma informação seja pública, simplesmente não a preencha no cadastro.",
      },
      {
        q: "Como solicitar a exclusão do meu cadastro?",
        a: "Você pode excluir seu perfil a qualquer momento através do painel do artista em 'Configurações'. Para mais detalhes sobre privacidade e remoção de dados, consulte nossa Política de Privacidade.",
      },
    ],
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.flatMap((grupo) =>
    grupo.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    }))
  ),
};

export default function FaqPage() {
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
            <Link href="/como-funciona" className="hover:underline">Como Funciona</Link>
          </nav>
        </div>
      </header>

      <Breadcrumb items={[
        { label: "Início", href: "/" },
        { label: "Perguntas Frequentes" },
      ]} />

      {/* Hero */}
      <section className="bg-[#1e3a8a] text-white px-4 lg:px-40 py-12">
        <div className="max-w-3xl">
          <h1 className="text-3xl lg:text-4xl font-bold mb-3">
            Perguntas Frequentes
          </h1>
          <p className="text-blue-200">
            Dúvidas sobre o Nós Cultural? Encontre respostas sobre cadastro, busca,
            agenda de eventos, privacidade e mais.
          </p>
        </div>
      </section>

      <div className="px-4 lg:px-40 py-12">
        <div className="max-w-3xl mx-auto space-y-12">
          {faqs.map((grupo) => (
            <section key={grupo.grupo}>
              <h2 className="text-xl font-bold text-[#1e3a8a] mb-5 pb-2 border-b-2 border-[#1e3a8a]/20">
                {grupo.grupo}
              </h2>
              <div className="space-y-4">
                {grupo.items.map((item) => (
                  <details
                    key={item.q}
                    className="bg-white rounded-xl border border-gray-200 group"
                  >
                    <summary className="p-5 cursor-pointer font-semibold text-[#1e3a8a] list-none flex items-center justify-between gap-3 hover:bg-gray-50 rounded-xl transition">
                      <span>{item.q}</span>
                      <svg
                        className="w-5 h-5 flex-shrink-0 text-gray-400 group-open:rotate-180 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </summary>
                    <div className="px-5 pb-5">
                      <p className="text-gray-600 leading-relaxed text-sm">{item.a}</p>
                    </div>
                  </details>
                ))}
              </div>
            </section>
          ))}

          {/* Links úteis */}
          <section className="bg-[#1e3a8a] text-white rounded-xl p-8">
            <h2 className="text-xl font-bold mb-4">Ainda tem dúvidas?</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { href: "/como-funciona", label: "Guia de Cadastro Passo a Passo" },
                { href: "/artistas-de-franca", label: "Ver Artistas de Franca" },
                { href: "/agenda", label: "Agenda Cultural da Semana" },
                { href: "/privacidade", label: "Política de Privacidade" },
              ].map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-3 rounded-lg transition text-sm font-semibold"
                >
                  <span>→</span> {l.label}
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
}
