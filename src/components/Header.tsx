"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, UserCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { artist, loading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = () => {
    logout();
    setProfileMenuOpen(false);
    setMenuOpen(false);
    router.push("/");
  };

  return (
    <header className="w-full fixed z-50 bg-bluePrimary text-white px-4 lg:px-76 py-6 flex justify-between items-center">
      {/* Logo */}
      <Link href="/" className="text-2xl font-bold hover:opacity-90 transition">Nós Cultural</Link>

      {/* Menu desktop */}
      <nav className="hidden md:flex gap-6 items-center">
        <a href="/search" className="hover:underline">Ver Cadastros</a>

        {!mounted ? null : loading ? (
          <div className="w-10 h-10 rounded-full border-2 border-white/40 animate-pulse bg-white/10" />
        ) : !artist ? (
          <>
            <a href="/artistRegistration" className="bg-yellow-500 px-4 py-2 rounded hover:bg-yellow-600">
              Cadastrar Artista
            </a>
            <a href="/artistLogin" className="border border-white px-4 py-2 rounded hover:bg-white hover:text-black">
              Login de Artista
            </a>
            <a href="/equipmentRegistration" className="bg-yellow-500 px-4 py-2 rounded hover:bg-yellow-600">
              Cadastrar Espaço
            </a>
            <a href="/equipmentLogin" className="border border-white px-4 py-2 rounded hover:bg-white hover:text-black">
              Login de Espaço
            </a>
          </>
        ) : (
          <div className="relative">
            <button
              onClick={() => setProfileMenuOpen(!profileMenuOpen)}
              className="relative w-10 h-10 rounded-full border-2 border-white hover:border-yellow-400 transition overflow-hidden"
              title={artist.name}
            >
              {artist.profilePicture ? (
                <Image
                  src={artist.profilePicture}
                  alt={artist.name}
                  fill
                  sizes="40px"
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-white text-bluePrimary flex items-center justify-center font-bold">
                  {artist.name.charAt(0).toUpperCase()}
                </div>
              )}
            </button>

            {profileMenuOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white text-gray-800 rounded-lg shadow-lg py-2 z-50">
                <div className="px-4 py-3 border-b">
                  <p className="font-semibold text-gray-900">{artist.name}</p>
                  <p className="text-sm text-gray-500 truncate">{artist.email}</p>
                </div>
                <a
                  href={`/dashboard/${artist._id}`}
                  className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 transition"
                >
                  <UserCircle size={16} /> Dashboard
                </a>
                <a
                  href={`/dashboard/${artist._id}/artistSettings`}
                  className="block px-4 py-2 hover:bg-gray-100 transition"
                >
                  ⚙️ Configurações
                </a>
                <a
                  href={`/dashboard/${artist._id}/collectiveRegistration`}
                  className="block px-4 py-2 hover:bg-gray-100 transition"
                >
                  📝 Cadastrar Coletivo
                </a>
                <a
                  href={`/dashboard/${artist._id}/collectiveLogin`}
                  className="block px-4 py-2 hover:bg-gray-100 transition"
                >
                  📝 Login de Coletivo
                </a>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 transition"
                >
                  🚪 Sair
                </button>
              </div>
            )}
          </div>
        )}
      </nav>

      {/* Botão menu mobile */}
      <button
        className="md:hidden"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Menu mobile */}
      {menuOpen && (
        <div className="bg-bluePrimary absolute top-full left-0 w-full flex flex-col gap-4 p-4 md:hidden">
          {artist && (
            <div className="flex items-center gap-3 pb-3 border-b border-white/30">
              {artist.profilePicture ? (
                <Image
                  src={artist.profilePicture}
                  alt={artist.name}
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded-full object-cover border-2 border-white"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-white text-bluePrimary flex items-center justify-center font-bold">
                  {artist.name.charAt(0).toUpperCase()}
                </div>
              )}
              <div>
                <p className="font-semibold">{artist.name}</p>
                <p className="text-xs text-white/80 truncate">{artist.email}</p>
              </div>
            </div>
          )}

          <a href="/search" className="hover:underline">Ver Cadastros</a>

          {!mounted ? null : loading ? (
            <div className="h-8 w-32 rounded bg-white/10 animate-pulse" />
          ) : !artist ? (
            <>
              <a href="/artistRegistration" className="bg-yellow-500 px-4 py-2 rounded hover:bg-yellow-600 text-center">
                Cadastrar Artista
              </a>
              <a href="/artistLogin" className="border border-white px-4 py-2 rounded hover:bg-white hover:text-black text-center">
                Login de Artista
              </a>
              <a href="/equipmentRegistration" className="bg-yellow-500 px-4 py-2 rounded hover:bg-yellow-600 text-center">
                Cadastrar Espaço
              </a>
              <a href="/equipmentLogin" className="border border-white px-4 py-2 rounded hover:bg-white hover:text-black text-center">
                Login de Espaço
              </a>
            </>
          ) : (
            <>
              <a href={`/dashboard/${artist._id}`} className="hover:underline">Dashboard</a>
              <a href={`/dashboard/${artist._id}/artistSettings`} className="hover:underline">⚙️ Configurações</a>
              <a href={`/dashboard/${artist._id}/collectiveRegistration`} className="hover:underline">📝 Cadastrar Coletivo</a>
              <a href={`/dashboard/${artist._id}/collectiveLogin`} className="hover:underline">📝 Login de Coletivo</a>
              <button onClick={handleLogout} className="text-left hover:underline">🚪 Sair</button>
            </>
          )}
        </div>
      )}
    </header>
  );
}
