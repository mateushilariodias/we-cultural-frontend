import type { Metadata } from "next";
import SearchClient from "./SearchClient";

export const metadata: Metadata = {
  title: "Encontrar Artistas e Espaços Culturais em Franca",
  description:
    "Encontre artistas de Franca, SP por categoria: música, teatro, dança, cinema, fotografia e mais. Descubra também coletivos culturais e espaços como galerias de arte e teatros.",
  alternates: { canonical: "/busca" },
};

export default function SearchPage() {
  return <SearchClient />;
}
