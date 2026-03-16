"use client";
import { useState } from "react";

export default function WeeklyProgramming() {
  const [expandedEvent, setExpandedEvent] = useState<string | null>(null);
  const [shareMessage, setShareMessage] = useState<string>("");

  const handleShare = async (eventTitle: string) => {
    const shareUrl = "https://we-cultural-frontend.vercel.app/schedule";
    const shareText = `Confira este evento cultural: ${eventTitle}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: "Nós Cultural - Programação",
          text: shareText,
          url: shareUrl,
        });
      } catch (error) {
        console.log("Compartilhamento cancelado");
      }
    } else {
      // Fallback: copiar para clipboard
      navigator.clipboard.writeText(shareUrl).then(() => {
        setShareMessage("✅ Link copiado!");
        setTimeout(() => setShareMessage(""), 2000);
      });
    }
  };

  const events = [
    {
      id: "1",
      date: "17/03/2026",
      dayOfWeek: "terça-feira",
      time: "18:30",
      title: "Oficina Verso e Pirueta – Colagem - Recortes de Mim: Ancestralidade em Papel",
      location: "CIRRCO",
      address: "Av. Dr. Severino Márcio Pereira Meirelles, 2030 – Villagio Mundo Novo, Franca – SP",
      description:
        "Oficina gratuita voltada para mulheres da cidade de Franca. Uma imersão criativa que convida as participantes a refletirem sobre suas origens, ancestralidade e os legados transmitidos por mulheres que marcaram suas trajetórias. O projeto promove troca, fortalecimento de vínculos e reconhecimento da potência da experiência feminina.",
      details: [
        "Público exclusivo para mulheres",
        "Encontros semanais sempre das 18h30 às 20h30",
        "Imersão criativa sobre origens e ancestralidade",
        "Coordenação: Carla Bastianini e Mariana Morais",
        "Projeto Verso e Pirueta",
        "Gratuito (necessária inscrição prévia pelo Instagram @projetoversoepirueta)",
        "Realização: Secretaria de Esporte e Cultura de Franca - Bolsa Cultura",
        "Para esta vivência é importante disponibilidade para os encontros de 24 e 31 de março"
      ],
      social: {
        instagram: "https://www.instagram.com/projetoversoepirueta/"
      },
      color: "from-indigo-500 to-purple-500"
    },
    {
      id: "2",
      date: "20/03/2026",
      dayOfWeek: "sexta-feira",
      time: "19:30",
      title: "Leitura Dramática 40+",
      location: "Casa do Artista Francano",
      address: "Rua Dr. Alcindo Ribeiro Conrado, 1516 – Centro, Franca – SP",
      description:
        "Um trabalho lindo, fruto de um projeto que busca dar visibilidade à mulher nesse período tão significativo. Este projeto foi contemplado pelo Edital Bolsa Cultura, com apoio da Prefeitura Municipal de Franca e da FEAC.",
      details: [
        "Intérprete de libras presente",
        "Primeira apresentação",
        "Projeto contemplado pelo Edital Bolsa Cultura",
      ],
      social: {
        instagram: "https://www.instagram.com/projetocultural40mais/",
        facebook: "https://www.facebook.com/ProjetoCultural40Mais/",
      },
      color: "from-purple-500 to-pink-500",
    },
    {
      id: "3",
      date: "20/03/2026",
      dayOfWeek: "sexta-feira, sábado e domingo",
      time: "19:00",
      title: "Um Banquete para o Artista da Fome",
      location: "IPRA - Pontão de Cultura Pedra no Sapato",
      address: "R. Diogo Feijó, 1956 - Estação, Franca - SP",
      description:
        "Reestreia do espetáculo - uma comédia dramática que reflete sobre a relevância da cultura e dos artistas em nossa sociedade.",
      details: [
        "Convite gratuito (retirar com até 30 min de antecedência)",
        "Recomendação etária: 16 anos",
        "Sessão com Libras no sábado (21/3)",
      ],
      dates: ["20/3 (sexta)", "21/3 (sábado)", "22/3 (domingo)"],
      artist: "Cia. Antares",
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: "4",
      date: "21/03/2026",
      dayOfWeek: "sábado",
      time: "14:00",
      title: "Aulão de Impro",
      location: "Ponto de Cultura Espaço Nulo",
      address: "R. Maria Cândida de Vilhena, 530 - Jardim Dr. Antonio Petraglia, Franca - SP",
      description:
        "Primeiro aulão de improvisação teatral (de 4 encontros independentes) focado em jogos clássicos de improviso.",
      details: [
        "Estimula criatividade e espontaneidade",
        "Desenvolve habilidades de improvisação",
        "Preparação para o espetáculo Improkê",
        "Público: a partir de 16 anos",
        "Iniciantes e experientes bem-vindos",
      ],
      time_range: "14:00 - 18:00",
      link: "https://www.espaconulo.com/events/1-aulao-de-impro-21-03-26-improke",
      color: "from-green-500 to-emerald-500",
    },
    {
      id: "5",
      date: "21/03/2026",
      dayOfWeek: "sábado",
      time: "10:00",
      title: "Oficina: Borboletas - Histórias e Sons em Movimento",
      location: "SESI FRANCA e SESI PIRACICABA",
      description:
        "Imersão artística que integra contação de histórias, percepção sonora e investigação do ritmo no corpo.",
      details: [
        "Público: estudantes, educadores, artistas",
        "Processo criativo colaborativo",
        "Integra narrativa, som e movimento",
        "Diálogo com questões sociais, raciais e de gênero",
      ],
      link: "https://www.sesisp.org.br/agenda/agenda-oficinas-borboletas-historias-e-sons-em-movimento",
      color: "from-red-500 to-rose-500",
    },
    {
      id: "6",
      date: "21/03/2026",
      dayOfWeek: "sábado",
      time: "16:00",
      title: "Borboletas",
      location: "SESI FRANCA e SESI PIRACICABA",
      description:
        "Espetáculo que equilibra ludicidade e poesia para narrar as dificuldades enfrentadas por crianças periféricas.",
      details: [
        "Classificação: Livre",
        "Cia. Teatral Sonharteiros",
        "Teatro como instrumento de transformação social",
        "Temáticas: trabalho infantil, violência, desesperança",
      ],
      link: "https://www.sesisp.org.br/agenda/agenda-espetaculo-borboletas",
      color: "from-yellow-500 to-orange-500",
    }
  ];

  const sortedEvents = [...events].sort((a, b) => {
    const dateA = a.date === "Sem data confirmada" ? "99/99/9999" : a.date;
    const dateB = b.date === "Sem data confirmada" ? "99/99/9999" : b.date;
    return dateA.localeCompare(dateB);
  });

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <header className="bg-[#1e3a8a] text-white px-4 lg:px-40 py-3">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Nós Cultural</h1>
          <nav className="flex gap-4">
            <a href="/" className="hover:underline">Home</a>
            <a href="/search" className="hover:underline">Ver Artistas</a>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 px-4 lg:px-40 py-12">
        {/* Banner */}
        <div className="mb-12 relative h-64 bg-gradient-to-r from-[#1e3a8a] to-purple-700 rounded-lg overflow-hidden shadow-lg">
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-8">
            <h1 className="text-4xl font-bold mb-2">Programação Cultural</h1>
            <p className="text-xl opacity-90">Semana de 16 a 22 de Março de 2026</p>
          </div>
        </div>

        {/* Description */}
        <div className="mb-12 max-w-4xl">
          <p className="text-gray-700 text-lg leading-relaxed">
            Confira a programação cultural da semana em Franca! Apresentações teatrais, aulões de improvisação, 
            leituras dramáticas e muito mais aguardam você. Todos os eventos promovem inclusão, acessibilidade 
            (com intérpretes de libras) e acesso democrático à cultura.
          </p>
        </div>

        {/* Events Grid */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-[#1e3a8a] mb-8">Eventos da Semana</h2>

          {sortedEvents.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden border-l-4"
              style={{
                borderLeftColor: event.color.split(" ")[1] === "to-pink-500" ? "#ec4899" : 
                               event.color.split(" ")[1] === "to-cyan-500" ? "#06b6d4" :
                               event.color.split(" ")[1] === "to-emerald-500" ? "#10b981" :
                               event.color.split(" ")[1] === "to-orange-500" ? "#f97316" : "#f43f5e"
              }}
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm font-semibold text-white bg-[#1e3a8a] px-3 py-1 rounded-full">
                        {event.date}
                      </span>
                      <span className="text-sm text-gray-600">{event.dayOfWeek}</span>
                      {event.time && <span className="text-sm font-semibold text-gray-700">• {event.time}</span>}
                    </div>
                    <h3 className="text-2xl font-bold text-[#1e3a8a]">{event.title}</h3>
                  </div>
                </div>

                {/* Location */}
                <div className="mb-4 pb-4 border-b border-gray-200">
                  <p className="text-gray-600 mb-1">
                    <span className="font-semibold">📍 Local:</span> {event.location}
                  </p>
                  <p className="text-sm text-gray-500">{event.address}</p>
                </div>

                {/* Description */}
                <p className="text-gray-700 mb-4 leading-relaxed">{event.description}</p>

                {/* Details */}
                {event.details && event.details.length > 0 && (
                  <div className="mb-4">
                    <button
                      onClick={() => setExpandedEvent(expandedEvent === event.id ? null : event.id)}
                      className="text-[#1e3a8a] font-semibold hover:underline text-sm"
                    >
                      {expandedEvent === event.id ? "▼ Menos detalhes" : "▶ Mais detalhes"}
                    </button>

                    {expandedEvent === event.id && (
                      <div className="mt-3 pl-4 border-l-2 border-gray-300 space-y-2">
                        {event.details.map((detail, idx) => (
                          <p key={idx} className="text-gray-600 text-sm flex items-start gap-2">
                            <span className="text-[#1e3a8a] font-bold">✓</span>
                            {detail}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Multiple Dates */}
                {event.dates && (
                  <div className="mb-4 bg-gray-50 p-3 rounded">
                    <p className="font-semibold text-gray-700 mb-2">📅 Datas:</p>
                    <div className="space-y-1">
                      {event.dates.map((date, idx) => (
                        <p key={idx} className="text-gray-600 text-sm">• {date}</p>
                      ))}
                    </div>
                  </div>
                )}

                {/* Artist Info */}
                {event.artist && (
                  <p className="text-sm text-gray-600 mb-4">
                    <span className="font-semibold">🎭 Realização:</span> {event.artist}
                  </p>
                )}

                {/* Social Links */}
                {event.social && (
                  <div className="flex gap-4 mb-4">
                    {event.social.instagram && (
                      <a
                        href={event.social.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-pink-600 hover:text-pink-700 font-semibold text-sm"
                      >
                        📸 Instagram
                      </a>
                    )}
                    {event.social.facebook && (
                      <a
                        href={event.social.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-700 font-semibold text-sm"
                      >
                        📘 Facebook
                      </a>
                    )}
                  </div>
                )}

                {/* Action Button */}
                <div className="flex gap-3">
                  {event.link && (
                    <a
                      href={event.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#1e3a8a] text-white px-6 py-2 rounded font-semibold hover:bg-[#15306e] transition"
                    >
                      Saiba Mais
                    </a>
                  )}
                  <button
                    onClick={() => handleShare(event.title)}
                    className="bg-green-600 text-white px-6 py-2 rounded font-semibold hover:bg-green-700 transition"
                  >
                    🔗 Compartilhar
                  </button>
                </div>

                {shareMessage && (
                  <div className="mt-2 text-green-600 text-sm font-semibold">
                    {shareMessage}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Info Box */}
        <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-xl font-bold text-[#1e3a8a] mb-3">ℹ️ Informações Importantes</h3>
          <ul className="space-y-2 text-gray-700">
            <li>✓ A maioria dos eventos possuem acessibilidade com intérpretes de libras</li>
            <li>✓ Muitos eventos contam com apoio da Prefeitura Municipal de Franca e FEAC</li>
            <li>✓ A maioria dos eventos é gratuito - verifique com cada organizador</li>
            <li>✓ Recomendação etária: consulte cada evento para detalhes</li>
            <li>✓ Reserve seus ingressos com antecedência quando necessário</li>
          </ul>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#1e3a8a] text-white text-center p-4 mt-12">
        <p>© 2025 <strong>Nós Cultural</strong> - Todos os direitos reservados.</p>
        <p className="text-sm mt-2">Programação atualizada semanalmente</p>

        <p className="text-sm mt-3">
          Desenvolvido por{" "}
          <a
            href="https://www.instagram.com/marialuizaalves933"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-gray-200"
          >
            @marialuizaalves933
          </a>{" "}
          e{" "}
          <a
            href="https://www.instagram.com/mateushilariodias"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-gray-200"
          >
            @mateushilariodias
          </a>
        </p>
      </footer>
    </div>
  );
}