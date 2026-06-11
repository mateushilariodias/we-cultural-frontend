/** @type {import('next-sitemap').IConfig} */

const SITE_URL = 'https://we-cultural-frontend.vercel.app';
const API_URL = 'https://we-cultural-backend.onrender.com';

/** @param {string} url */
async function fetchIds(url) {
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(15000) });
    if (!res.ok) return [];
    const data = await res.json();
    return (Array.isArray(data) ? data : (data.data ?? [])).map((item) => item._id).filter(Boolean);
  } catch (err) {
    console.warn(`[sitemap] Failed to fetch ${url}:`, err.message);
    return [];
  }
}

module.exports = {
  siteUrl: SITE_URL,
  generateRobotsTxt: false,
  exclude: [
    // Pastas internas (inglês)
    '/artistLogin', '/artistRegistration',
    '/equipmentLogin', '/equipmentRegistration',
    '/forgotPassword', '/resetPassword',
    '/dashboard', '/dashboard/*',
    '/collectiveSettings', '/collectiveSettings/*',
    '/equipmentSettings', '/equipmentSettings/*',
    '/perfil', '/perfil/*',
    '/admin', '/admin/*',
    '/api/*',
    // URLs públicas (português) — também não indexadas
    '/entrar', '/cadastro-de-artista',
    '/entrar-espaco', '/cadastro-de-espaco',
    '/recuperar-senha', '/redefinir-senha',
    '/painel', '/painel/*',
    '/configuracoes', '/configuracoes/*',
  ],
  transform: async (config, path) => {
    const now = new Date().toISOString();

    // Pasta interna → URL pública (português)
    const INTERNAL_TO_PT = {
      // Fase 1
      '/search':   '/busca',
      '/schedule': '/agenda',
      '/privacy':  '/privacidade',
      '/terms':    '/termos',
      '/faq':      '/perguntas-frequentes',
      // Fase 2 — raízes
      '/artists-franca':   '/artistas-de-franca',
      '/franca-culture':   '/cultura-franca',
      '/how-it-works':     '/como-funciona',
      '/cultural-scene':   '/cenario-cultural',
      // Fase 2 — subpastas de artists-franca
      '/artists-franca/musicians':     '/artistas-de-franca/musicos',
      '/artists-franca/actors':        '/artistas-de-franca/atores',
      '/artists-franca/visual-artists':'/artistas-de-franca/artistas-plasticos',
      '/artists-franca/photographers': '/artistas-de-franca/fotografos',
      '/artists-franca/writers':       '/artistas-de-franca/escritores',
      // Fase 2 — subpastas de franca-culture
      '/franca-culture/events':              '/cultura-franca/agenda',
      '/franca-culture/collectives':         '/cultura-franca/coletivos',
      '/franca-culture/theaters-and-spaces': '/cultura-franca/teatros-e-espacos',
    };

    // Rotas dinâmicas — emitidas via additionalPaths, ignora aqui
    if (
      path.startsWith('/artist/') || path.startsWith('/collective/') || path.startsWith('/equipment/') ||
      path.startsWith('/artists-franca/') && path.split('/').length > 3 ||
      path.startsWith('/franca-culture/') && path.split('/').length > 3
    ) {
      return null;
    }

    const loc = INTERNAL_TO_PT[path] ?? path;

    if (loc === '/') {
      return { loc, changefreq: 'monthly', priority: 1.0, lastmod: now };
    }
    if (loc === '/busca') {
      return { loc, changefreq: 'daily', priority: 0.9, lastmod: now };
    }
    if (loc === '/agenda') {
      return { loc, changefreq: 'daily', priority: 0.7, lastmod: now };
    }
    if (loc === '/privacidade' || loc === '/termos') {
      return { loc, changefreq: 'yearly', priority: 0.3, lastmod: now };
    }
    if (['/artistas-de-franca', '/cultura-franca', '/como-funciona', '/cenario-cultural'].includes(loc)) {
      return { loc, changefreq: 'weekly', priority: 0.8, lastmod: now };
    }
    if (loc === '/perguntas-frequentes') {
      return { loc, changefreq: 'monthly', priority: 0.7, lastmod: now };
    }
    if (loc.startsWith('/artistas-de-franca/') || loc.startsWith('/cultura-franca/')) {
      return { loc, changefreq: 'weekly', priority: 0.7, lastmod: now };
    }
    return { loc, changefreq: 'monthly', priority: 0.5, lastmod: now };
  },
  additionalPaths: async () => {
    const now = new Date().toISOString();
    const entries = [];

    const [artistIds, collectiveIds, equipmentIds] = await Promise.all([
      fetchIds(`${API_URL}/api/artists?limit=1000`),
      fetchIds(`${API_URL}/api/collectives?limit=1000`),
      fetchIds(`${API_URL}/api/equipments?limit=1000`),
    ]);

    for (const id of artistIds) {
      entries.push({ loc: `/artista/${id}`, changefreq: 'weekly', priority: 0.8, lastmod: now });
    }
    for (const id of collectiveIds) {
      entries.push({ loc: `/coletivo/${id}`, changefreq: 'weekly', priority: 0.8, lastmod: now });
    }
    for (const id of equipmentIds) {
      entries.push({ loc: `/espaco/${id}`, changefreq: 'weekly', priority: 0.7, lastmod: now });
    }

    console.log(`[sitemap] Dynamic entries: ${artistIds.length} artists, ${collectiveIds.length} collectives, ${equipmentIds.length} equipments`);
    return entries;
  },
};
