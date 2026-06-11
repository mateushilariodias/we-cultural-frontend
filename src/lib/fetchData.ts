import type { Artist, Collective, Equipment } from "@/types";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://we-cultural-backend.onrender.com";

const OPTS = { next: { revalidate: 3600 } } as const;

export async function fetchAllArtists(): Promise<Artist[]> {
  try {
    const res = await fetch(`${API_URL}/api/artists?limit=1000`, OPTS);
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : (data.data ?? []);
  } catch {
    return [];
  }
}

export async function fetchArtistsByCategory(categories: string[]): Promise<Artist[]> {
  const all = await fetchAllArtists();
  return all.filter((a) =>
    a.categories?.some((c) =>
      categories.some((cat) => c.toLowerCase().includes(cat.toLowerCase()))
    )
  );
}

export async function fetchAllCollectives(): Promise<Collective[]> {
  try {
    const res = await fetch(`${API_URL}/api/collectives?limit=1000`, OPTS);
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : (data.data ?? []);
  } catch {
    return [];
  }
}

export async function fetchAllEquipments(): Promise<Equipment[]> {
  try {
    const res = await fetch(`${API_URL}/api/equipments?limit=1000`, OPTS);
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : (data.data ?? []);
  } catch {
    return [];
  }
}
