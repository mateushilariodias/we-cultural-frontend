export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || 'https://we-cultural-backend.onrender.com';

export const API_ENDPOINTS = {
  // Auth
  login: `${API_URL}/api/auth/login`,
  me: `${API_URL}/api/auth/me`,

  // Health
  health: `${API_URL}/api/health`,

  // Stats
  stats: `${API_URL}/api/stats`,

  // Artists
  artists: `${API_URL}/api/artists`,
  artistById: (id: string) => `${API_URL}/api/artists/${id}`,
  artistSearch: (query: string) => `${API_URL}/api/artists/search?query=${encodeURIComponent(query)}`,

  // Collectives
  collectives: `${API_URL}/api/collectives`,
  collectiveById: (id: string) => `${API_URL}/api/collectives/${id}`,

  // Equipments
  equipments: `${API_URL}/api/equipments`,
  equipmentById: (id: string) => `${API_URL}/api/equipments/${id}`,

  // Generic builder (use sparingly — prefer named endpoints above)
  getEndpoint: (path: string) => `${API_URL}${path}`,
};
