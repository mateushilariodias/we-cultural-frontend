"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";

export interface EventItem {
  _id: string;
  title: string;
  description?: string;
  date?: string;
  dayOfWeek?: string;
  time?: string;
  location?: string;
  address?: string;
  image?: string;
  color?: string;
  artist?: string;
  link?: string;
  details?: string[];
  dates?: string[];
  social?: { instagram?: string; facebook?: string };
}

export interface WeekInfo {
  start: string;
  end: string;
}

const formatDate = (raw: string | Date): string => {
  if (!raw) return "Sem data";
  const d = new Date(raw);
  if (isNaN(d.getTime())) return String(raw);
  return d.toLocaleDateString("pt-BR");
};

const getBorderColor = (colorClass: string): string => {
  const map: Record<string, string> = {
    "from-purple-500 to-pink-500": "#ec4899",
    "from-blue-500 to-cyan-500": "#06b6d4",
    "from-green-500 to-emerald-500": "#10b981",
    "from-red-500 to-rose-500": "#f43f5e",
    "from-yellow-500 to-orange-500": "#f97316",
    "from-pink-600 to-purple-600": "#a855f7",
  };
  return map[colorClass] ?? "#1e3a8a";
};

export default function ScheduleClient({
  events,
  week,
}: {
  events: EventItem[];
  week: WeekInfo | null;
}) {
  const [expandedEvent, setExpandedEvent] = useState<string | null>(null);
  const [shareMessage, setShareMessage] = useState<string>("");

  const handleShare = async (eventTitle: string) => {
    const shareUrl = "https://we-cultural-frontend.vercel.app/agenda";
    const shareText = `Confira este evento cultural: ${eventTitle}`;

    if (navigator.share) {
      try {
        await navigator.share({ title: "Nós Cultural - Programação", text: shareText, url: shareUrl });
      } catch {
        // cancelado pelo usuário
      }
    } else {
      await navigator.clipboard.writeText(shareUrl);
      setShareMessage("✅ Link copiado!");
      setTimeout(() => setShareMessage(""), 2000);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <header className="bg-[#1e3a8a] text-white px-4 lg:px-40 py-3">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Nós Cultural</h1>
          <nav className="flex gap-4">
            <Link href="/" className="hover:underline">Home</Link>
            <a href="/busca" className="hover:underline">Ver Cadastros</a>
          </nav>
        </div>
      </header>

      {/* Main */}
      <div className="flex-1 px-4 lg:px-40 py-12">
        {/* Banner */}
        <div className="mb-12 relative h-64 bg-gradient-to-r from-[#1e3a8a] to-purple-700 rounded-lg overflow-hidden shadow-lg flex items-center justify-center">
          <div className="text-white text-center p-8">
            <h1 className="text-4xl font-bold mb-2">Programação Cultural</h1>
            {week ? (
              <p className="text-xl opacity-90">Semana de {week.start} a {week.end}</p>
            ) : (
              <p className="text-xl opacity-90">Programação semanal de Franca, SP</p>
            )}
          </div>
        </div>

        {/* Resumo */}
        <div className="mb-12 max-w-4xl">
          <p className="text-gray-700 text-lg leading-relaxed">
            Confira a programação cultural da semana em Franca!
          </p>
          {events.length > 0 && (
            <p className="text-green-600 font-semibold mt-4">
              ✅ {events.length} evento(s) nesta semana
            </p>
          )}
          {events.length === 0 && (
            <p className="text-orange-600 font-semibold mt-4">
              ⏳ Nenhum evento cadastrado para esta semana
            </p>
          )}
        </div>

        {/* Lista */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-[#1e3a8a] mb-8">Eventos da Semana</h2>

          {events.length === 0 && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
              <p className="text-yellow-700">
                Nenhum evento cadastrado para esta semana. Verifique novamente na próxima semana!
              </p>
            </div>
          )}

          {events.map((event) => (
            <div
              key={event._id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden border-l-4"
              style={{ borderLeftColor: getBorderColor(event.color ?? "") }}
            >
              <div className="p-6">
                {/* Cabeçalho */}
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-4">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="text-sm font-semibold text-white bg-[#1e3a8a] px-3 py-1 rounded-full">
                        {event.date ? formatDate(event.date) : "Sem data"}
                      </span>
                      {event.dayOfWeek && (
                        <span className="text-sm text-gray-600">{event.dayOfWeek}</span>
                      )}
                      {event.time && (
                        <span className="text-sm font-semibold text-gray-700">• {event.time}</span>
                      )}
                    </div>
                    <h3 className="text-2xl font-bold text-[#1e3a8a]">{event.title}</h3>
                  </div>
                  {event.image && (
                    <div className="relative w-24 h-24 flex-shrink-0">
                      <Image
                        src={event.image}
                        alt={event.title}
                        fill
                        sizes="96px"
                        className="object-cover rounded"
                      />
                    </div>
                  )}
                </div>

                {/* Local */}
                <div className="mb-4 pb-4 border-b border-gray-200">
                  <p className="text-gray-600 mb-1">
                    <span className="font-semibold">📍 Local:</span> {event.location}
                  </p>
                  <p className="text-sm text-gray-500">{event.address}</p>
                </div>

                {/* Descrição */}
                <p className="text-gray-700 mb-4 leading-relaxed">{event.description}</p>

                {/* Detalhes expansíveis */}
                {event.details && event.details.length > 0 && (
                  <div className="mb-4">
                    <button
                      onClick={() =>
                        setExpandedEvent(expandedEvent === event._id ? null : event._id)
                      }
                      className="text-[#1e3a8a] font-semibold hover:underline text-sm"
                    >
                      {expandedEvent === event._id ? "▼ Menos detalhes" : "▶ Mais detalhes"}
                    </button>
                    {expandedEvent === event._id && (
                      <div className="mt-3 pl-4 border-l-2 border-gray-300 space-y-2">
                        {event.details.map((detail: string, idx: number) => (
                          <p key={idx} className="text-gray-600 text-sm flex items-start gap-2">
                            <span className="text-[#1e3a8a] font-bold">✓</span>
                            {detail}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Datas múltiplas */}
                {event.dates && event.dates.length > 0 && (
                  <div className="mb-4 bg-gray-50 p-3 rounded">
                    <p className="font-semibold text-gray-700 mb-2">📅 Datas:</p>
                    <div className="space-y-1">
                      {event.dates.map((date: string, idx: number) => (
                        <p key={idx} className="text-gray-600 text-sm">
                          • {formatDate(date)}
                        </p>
                      ))}
                    </div>
                  </div>
                )}

                {/* Artista */}
                {event.artist && (
                  <p className="text-sm text-gray-600 mb-4">
                    <span className="font-semibold">🎭 Realização:</span> {event.artist}
                  </p>
                )}

                {/* Redes sociais */}
                {event.social && (event.social.instagram || event.social.facebook) && (
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

                {/* Ações */}
                <div className="flex flex-wrap gap-3">
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
                  <p className="mt-2 text-green-600 text-sm font-semibold">{shareMessage}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Info box */}
        <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-xl font-bold text-[#1e3a8a] mb-3">ℹ️ Informações Importantes</h3>
          <ul className="space-y-2 text-gray-700">
            <li>✓ Programação atualiza automaticamente toda segunda-feira</li>
            <li>✓ Semana começa na segunda e termina no domingo</li>
            <li>✓ A maioria dos eventos possuem acessibilidade com intérpretes de libras</li>
            <li>✓ Muitos eventos contam com apoio da Prefeitura Municipal de Franca e FEAC</li>
            <li>✓ Reserve seus ingressos com antecedência quando necessário</li>
          </ul>
        </div>
      </div>

      <Footer />
    </div>
  );
}
