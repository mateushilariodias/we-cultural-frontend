"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, Home, Users, Calendar, HelpCircle, Clapperboard, ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const QUICK_LINKS = [
  {
    href: "/",
    label: "Início",
    description: "Voltar para a página inicial",
    Icon: Home,
  },
  {
    href: "/busca",
    label: "Ver Cadastros",
    description: "Explore artistas e espaços",
    Icon: Search,
  },
  {
    href: "/artistas-de-franca",
    label: "Artistas de Franca",
    description: "Conheça os artistas da cidade",
    Icon: Users,
  },
  {
    href: "/cultura-franca/coletivos",
    label: "Coletivos",
    description: "Grupos e coletivos culturais",
    Icon: Clapperboard,
  },
  {
    href: "/agenda",
    label: "Agenda Cultural",
    description: "Eventos e apresentações",
    Icon: Calendar,
  },
  {
    href: "/perguntas-frequentes",
    label: "Perguntas Frequentes",
    description: "Tire suas dúvidas",
    Icon: HelpCircle,
  },
];

export default function NotFound() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    router.push(trimmed ? `/busca?q=${encodeURIComponent(trimmed)}` : "/busca");
  };

  return (
    <>
      <Header />

      <main className="min-h-screen flex flex-col items-center justify-center px-4 pt-32 pb-20 bg-gray-50">
        {/* Número 404 */}
        <div className="text-center mb-10">
          <p className="text-[10rem] leading-none font-extrabold text-bluePrimary select-none">
            4<span className="text-yellow-500">0</span>4
          </p>
          <div className="h-1 w-20 bg-yellowPrimary mx-auto rounded mb-5" />
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">
            Página não encontrada
          </h1>
          <p className="text-gray-500 mt-3 max-w-md mx-auto text-base leading-relaxed">
            A página que você está procurando pode ter sido movida, renomeada
            ou simplesmente não existe. Mas a cena cultural de Franca está
            esperando por você!
          </p>
        </div>

        {/* Barra de busca */}
        <form onSubmit={handleSearch} className="w-full max-w-lg mb-14">
          <div className="relative flex items-center shadow-sm">
            <Search
              size={18}
              className="absolute left-4 text-gray-400 pointer-events-none"
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar artistas, espaços, coletivos…"
              className="w-full pl-11 pr-28 py-3.5 border-2 border-gray-200 rounded-lg bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:border-bluePrimary transition"
            />
            <button
              type="submit"
              className="absolute right-2 bg-bluePrimary text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-blueSecondary transition"
            >
              Buscar
            </button>
          </div>
        </form>

        {/* Links úteis */}
        <div className="w-full max-w-2xl">
          <p className="text-center text-xs font-semibold text-gray-400 uppercase tracking-widest mb-5">
            Links úteis
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {QUICK_LINKS.map(({ href, label, description, Icon }) => (
              <Link
                key={href}
                href={href}
                className="flex flex-col gap-1.5 p-4 bg-white border-2 border-gray-100 rounded-lg hover:border-bluePrimary hover:bg-blue-50 transition group"
              >
                <div className="flex items-center gap-2">
                  <Icon
                    size={15}
                    className="text-bluePrimary shrink-0 group-hover:scale-110 transition-transform"
                  />
                  <span className="font-semibold text-gray-800 text-sm leading-tight">
                    {label}
                  </span>
                </div>
                <p className="text-xs text-gray-400 leading-snug">
                  {description}
                </p>
              </Link>
            ))}
          </div>
        </div>

        {/* Voltar */}
        <button
          onClick={() => router.back()}
          className="mt-10 flex items-center gap-2 text-gray-400 hover:text-bluePrimary transition text-sm"
        >
          <ArrowLeft size={15} />
          Voltar à página anterior
        </button>
      </main>

      <Footer />
    </>
  );
}
