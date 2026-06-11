import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Agenda Cultural de Franca, SP — Eventos e Atividades",
  description:
    "Confira a agenda de eventos culturais de Franca, SP — shows de música, espetáculos de teatro, exposições de arte, apresentações de dança e muito mais no Nós Cultural.",
  alternates: { canonical: "/agenda" },
};

const scheduleSchema = {
  "@context": "https://schema.org",
  "@type": "EventSeries",
  name: "Programação Cultural Semanal de Franca, SP",
  description:
    "Agenda semanal de eventos culturais de Franca, SP — shows, teatro, exposições, dança e mais, reunidos pelo Nós Cultural.",
  url: "https://we-cultural-frontend.vercel.app/agenda",
  organizer: {
    "@type": "Organization",
    "@id": "https://we-cultural-frontend.vercel.app/#organization",
    name: "Nós Cultural",
  },
  location: {
    "@type": "Place",
    name: "Franca, SP",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Franca",
      addressRegion: "SP",
      addressCountry: "BR",
    },
  },
};

export default function ScheduleLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(scheduleSchema) }}
      />
      {children}
    </>
  );
}
