import { API_URL } from "@/config/api";
import ScheduleClient, { type EventItem, type WeekInfo } from "./ScheduleClient";

async function getEvents(): Promise<{ events: EventItem[]; week: WeekInfo | null }> {
  try {
    const res = await fetch(`${API_URL}/api/events`, { next: { revalidate: 3600 } });
    if (!res.ok) return { events: [], week: null };
    const data = await res.json();
    return {
      events: Array.isArray(data.events) ? data.events : [],
      week: data.week ?? null,
    };
  } catch {
    return { events: [], week: null };
  }
}

export default async function WeeklyProgramming() {
  const { events, week } = await getEvents();

  const sortedEvents = [...events].sort((a, b) => {
    const ta = a.date ? new Date(a.date).getTime() : Infinity;
    const tb = b.date ? new Date(b.date).getTime() : Infinity;
    return ta - tb;
  });

  const eventSchemas = sortedEvents
    .filter((e) => e.date)
    .map((event) => ({
      "@context": "https://schema.org",
      "@type": "Event",
      name: event.title,
      ...(event.description && { description: event.description }),
      startDate: event.date,
      ...(event.image && { image: event.image }),
      ...(event.link && { url: event.link }),
      location: {
        "@type": "Place",
        name: event.location ?? "Franca, SP",
        address: {
          "@type": "PostalAddress",
          ...(event.address && { streetAddress: event.address }),
          addressLocality: "Franca",
          addressRegion: "SP",
          addressCountry: "BR",
        },
      },
      organizer: {
        "@type": "Organization",
        "@id": "https://we-cultural-frontend.vercel.app/#organization",
        name: "Nós Cultural",
      },
    }));

  return (
    <>
      {eventSchemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <ScheduleClient events={sortedEvents} week={week} />
    </>
  );
}
