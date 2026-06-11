import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "we-cultural-backend.onrender.com" },
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "*.amazonaws.com" },
    ],
  },
  async rewrites() {
    return [
      // ── Fase 1: páginas com pasta inglesa já existente ──────────────────
      { source: "/busca",            destination: "/search" },
      { source: "/busca/:path*",     destination: "/search/:path*" },
      { source: "/agenda",           destination: "/schedule" },
      { source: "/artista/:id",      destination: "/artist/:id" },
      { source: "/coletivo/:id",     destination: "/collective/:id" },
      { source: "/espaco/:id",       destination: "/equipment/:id" },
      { source: "/privacidade",      destination: "/privacy" },
      { source: "/termos",           destination: "/terms" },
      { source: "/perguntas-frequentes", destination: "/faq" },

      // ── Auth + área logada ───────────────────────────────────────────────
      { source: "/entrar",               destination: "/artist-login" },
      { source: "/cadastro-de-artista",  destination: "/artist-registration" },
      { source: "/entrar-espaco",        destination: "/equipment-login" },
      { source: "/cadastro-de-espaco",   destination: "/equipment-registration" },
      { source: "/recuperar-senha",      destination: "/forgot-password" },
      { source: "/redefinir-senha",      destination: "/reset-password" },
      { source: "/perfil/:id",           destination: "/profile/:id" },

      // ── Dashboard: sub-rotas em português (antes do wildcard) ────────────
      { source: "/painel/:id/configuracoes-artista", destination: "/dashboard/:id/artist-settings" },
      { source: "/painel/:id/cadastro-coletivo",     destination: "/dashboard/:id/collective-registration" },
      { source: "/painel/:id/login-coletivo",        destination: "/dashboard/:id/collective-login" },
      { source: "/painel/:id/:path*",    destination: "/dashboard/:id/:path*" },
      { source: "/painel/:id",           destination: "/dashboard/:id" },
      { source: "/configuracoes/coletivo/:id", destination: "/collective-settings/:id" },
      { source: "/configuracoes/espaco/:id",   destination: "/equipment-settings/:id" },

      // ── Fase 2: pastas renomeadas para inglês ────────────────────────────
      // artistas-de-franca → artists-franca
      { source: "/artistas-de-franca/artistas-plasticos", destination: "/artists-franca/visual-artists" },
      { source: "/artistas-de-franca/atores",             destination: "/artists-franca/actors" },
      { source: "/artistas-de-franca/escritores",         destination: "/artists-franca/writers" },
      { source: "/artistas-de-franca/fotografos",         destination: "/artists-franca/photographers" },
      { source: "/artistas-de-franca/musicos",            destination: "/artists-franca/musicians" },
      { source: "/artistas-de-franca",                    destination: "/artists-franca" },

      // cultura-franca → franca-culture
      { source: "/cultura-franca/agenda",           destination: "/franca-culture/events" },
      { source: "/cultura-franca/coletivos",        destination: "/franca-culture/collectives" },
      { source: "/cultura-franca/teatros-e-espacos",destination: "/franca-culture/theaters-and-spaces" },
      { source: "/cultura-franca",                  destination: "/franca-culture" },

      // páginas individuais
      { source: "/como-funciona",    destination: "/how-it-works" },
      { source: "/cenario-cultural", destination: "/cultural-scene" },
    ];
  },

  async redirects() {
    return [
      // ── Fase 1: URLs inglesas fechadas com 301 ───────────────────────────
      { source: "/search",            destination: "/busca",           permanent: true },
      { source: "/schedule",          destination: "/agenda",          permanent: true },
      { source: "/artist/:id",        destination: "/artista/:id",     permanent: true },
      { source: "/collective/:id",    destination: "/coletivo/:id",    permanent: true },
      { source: "/equipment/:id",     destination: "/espaco/:id",      permanent: true },
      { source: "/privacy",           destination: "/privacidade",     permanent: true },
      { source: "/terms",             destination: "/termos",          permanent: true },
      { source: "/faq",               destination: "/perguntas-frequentes", permanent: true },

      // ── Auth + área logada ───────────────────────────────────────────────
      // camelCase legacy (cache de bots/histórico)
      { source: "/artistLogin",          destination: "/entrar",              permanent: true },
      { source: "/artistRegistration",   destination: "/cadastro-de-artista", permanent: true },
      { source: "/equipmentLogin",       destination: "/entrar-espaco",       permanent: true },
      { source: "/equipmentRegistration",destination: "/cadastro-de-espaco",  permanent: true },
      { source: "/forgotPassword",       destination: "/recuperar-senha",     permanent: true },
      { source: "/resetPassword",        destination: "/redefinir-senha",     permanent: true },
      { source: "/collectiveSettings/:id", destination: "/configuracoes/coletivo/:id", permanent: true },
      { source: "/equipmentSettings/:id",  destination: "/configuracoes/espaco/:id",  permanent: true },
      // kebab-case inglês nunca acessível diretamente
      { source: "/artist-login",         destination: "/entrar",              permanent: true },
      { source: "/artist-registration",  destination: "/cadastro-de-artista", permanent: true },
      { source: "/equipment-login",      destination: "/entrar-espaco",       permanent: true },
      { source: "/equipment-registration",destination: "/cadastro-de-espaco", permanent: true },
      { source: "/forgot-password",      destination: "/recuperar-senha",     permanent: true },
      { source: "/reset-password",       destination: "/redefinir-senha",     permanent: true },
      { source: "/collective-settings/:id", destination: "/configuracoes/coletivo/:id", permanent: true },
      { source: "/equipment-settings/:id",  destination: "/configuracoes/espaco/:id",  permanent: true },
      { source: "/profile/:id",          destination: "/perfil/:id",          permanent: true },
      // dashboard (inglês nunca acessível diretamente)
      { source: "/dashboard/:id/:path*", destination: "/painel/:id/:path*",  permanent: true },
      { source: "/dashboard/:id",        destination: "/painel/:id",         permanent: true },

      // ── Fase 2: novas pastas inglesas nunca acessíveis diretamente ───────
      { source: "/artists-franca/:path*",      destination: "/artistas-de-franca/:path*", permanent: true },
      { source: "/artists-franca",             destination: "/artistas-de-franca",        permanent: true },
      { source: "/franca-culture/:path*",      destination: "/cultura-franca/:path*",    permanent: true },
      { source: "/franca-culture",             destination: "/cultura-franca",           permanent: true },
      { source: "/how-it-works",              destination: "/como-funciona",             permanent: true },
      { source: "/cultural-scene",            destination: "/cenario-cultural",          permanent: true },
    ];
  },

  async headers() {
    return [
      {
        // Static assets in /public — long cache with revalidation window
        source: "/:path*.(jpg|jpeg|png|gif|svg|ico|webp|woff2|woff)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=2592000",
          },
        ],
      },
      {
        // Next.js build output — immutable (hash-named, safe to cache forever)
        source: "/_next/static/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
