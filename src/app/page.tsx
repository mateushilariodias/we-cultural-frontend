import type { Metadata } from "next";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import About from "@/components/About";
import Categories from "@/components/Categories";
import Cta from "@/components/Cta";
import Blog from "@/components/Blog";

const SITE_URL = "https://we-cultural-frontend.vercel.app";

const siteSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Nós Cultural",
      url: SITE_URL,
      description:
        "Plataforma cultural gratuita que conecta artistas de Franca, SP, coletivos culturais e espaços como galerias de arte e teatros.",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Franca",
        addressRegion: "SP",
        addressCountry: "BR",
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Nós Cultural",
      publisher: { "@id": `${SITE_URL}/#organization` },
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${SITE_URL}/busca?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

export const metadata: Metadata = {
  title: {
    absolute: "Nós Cultural — Artistas e Cultura de Franca, SP",
  },
  description:
    "Plataforma cultural gratuita que conecta artistas de Franca, SP, coletivos culturais e espaços como galerias de arte e teatros. Cadastre-se e faça parte da cena cultural de Franca.",
  alternates: { canonical: "/" },
  openGraph: {
    url: SITE_URL,
    title: "Nós Cultural — Artistas e Cultura de Franca, SP",
    description:
      "Plataforma cultural gratuita que conecta artistas de Franca, SP, coletivos culturais e espaços como galerias de arte e teatros. Cadastre-se e faça parte da cena cultural de Franca.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Nós Cultural — Plataforma Cultural de Franca, SP",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nós Cultural — Artistas e Cultura de Franca, SP",
    description:
      "Plataforma cultural gratuita que conecta artistas de Franca, SP, coletivos culturais e espaços como galerias de arte e teatros.",
    images: ["/og-image.jpg"],
  },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(siteSchema) }}
      />
      <div className="relative flex flex-col w-full min-h-screen">
        <Header />
        <Hero />
        <About />
        <Categories />
        <Cta />
        <Blog />
      </div>
      <Footer />
    </>
  );
}
