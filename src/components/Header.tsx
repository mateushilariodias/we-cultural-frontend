"use client";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full fixed z-50 bg-bluePrimary text-white px-4 lg:px-76 py-6 flex justify-between items-center">
      {/* Logo */}
      <h1 className="text-2xl font-bold">Nós Cultural</h1>

      {/* Menu desktop */}
      <nav className="hidden md:flex gap-6 items-center">
        <a href="/search" className="hover:underline">Ver Artistas</a>
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
      </nav>

      {/* Botão menu mobile */}
      <button
        className="md:hidden"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      {/* Menu mobile */}
      {menuOpen && (
        <div className="bg-bluePrimary absolute top-14 left-0 w-full flex flex-col gap-4 p-4 md:hidden">
          <a href="/search" className="hover:underline">Ver Artistas</a>
          <a href="/artistRegistration" className="bg-yellow-500 px-4 py-2 rounded hover:bg-yellow-600 text-center">
            Cadastrar Artista
          </a>
          <a href="/artistLogin" className="border border-white px-4 py-2 rounded hover:bg-white hover:text-black text-center">
            Login de Artista
          </a>
            <a href="/equipmentRegistration" className="bg-yellow-500 px-4 py-2 rounded hover:bg-yellow-600 text-center">
            Cadastrar Espaço
          </a>
          <a href="/artiequipmentLoginstLogin" className="border border-white px-4 py-2 rounded hover:bg-white hover:text-black text-center">
            Login de Espaço
          </a>
        </div>
      )}
    </header>
  );
}
