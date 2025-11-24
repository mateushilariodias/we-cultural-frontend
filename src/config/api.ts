// src/config/api.ts
export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://we-cultural-backend-production.up.railway.app';

export const API_ENDPOINTS = {
  // Auth
  login: `${API_URL}/api/auth/login`,
  
  // Stats
  stats: `${API_URL}/api/stats`,
  
  // Artists
  artists: `${API_URL}/api/artists`,
  artistSearch: (query: string) => `${API_URL}/api/artists/search?query=${query}`,
  artistById: (id: string) => `${API_URL}/api/artists/${id}`,
  
  // Generic endpoint builder
  getEndpoint: (path: string) => `${API_URL}${path}`,
};