'use client';

import Link from 'next/link';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function FooterSection() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-bluePrimary text-white py-16 px-4 lg:px-40">
      <div className="max-w-7xl mx-auto">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold mb-4">Nós Cultural</h3>
            <p className="text-white text-opacity-80 text-base">
              Conectando artistas, coletivos e espaços culturais de Franca.
            </p>
          </div>

          {/* Explorar */}
          <div>
            <h3 className="font-bold mb-4">Explorar</h3>
            <ul className="space-y-2 text-base text-white text-opacity-80">
              <li><Link href="/busca" className="hover:text-yellow-300 transition">Ver Cadastros</Link></li>
              <li><Link href="/artistas-de-franca" className="hover:text-yellow-300 transition">Artistas de Franca</Link></li>
              <li><Link href="/cultura-franca" className="hover:text-yellow-300 transition">Cultura de Franca</Link></li>
              <li><Link href="/agenda" className="hover:text-yellow-300 transition">Agenda Cultural</Link></li>
            </ul>
          </div>

          {/* Participe */}
          <div>
            <h3 className="font-bold mb-4">Participe</h3>
            <ul className="space-y-2 text-base text-white text-opacity-80">
              <li><Link href="/cadastro-de-artista" className="hover:text-yellow-300 transition">Cadastrar Artista</Link></li>
              <li><Link href="/entrar" className="hover:text-yellow-300 transition">Login de Artista</Link></li>
              <li><Link href="/cadastro-de-espaco" className="hover:text-yellow-300 transition">Cadastrar Espaço</Link></li>
              <li><Link href="/entrar-espaco" className="hover:text-yellow-300 transition">Login de Espaço</Link></li>
            </ul>
          </div>

          {/* Recursos */}
          <div>
            <h3 className="font-bold mb-4">Recursos</h3>
            <ul className="space-y-2 text-base text-white text-opacity-80">
              <li><Link href="/como-funciona" className="hover:text-yellow-300 transition">Como Funciona</Link></li>
              <li><Link href="/cenario-cultural" className="hover:text-yellow-300 transition">Cenário Cultural</Link></li>
              <li><Link href="/perguntas-frequentes" className="hover:text-yellow-300 transition">Perguntas Frequentes</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold mb-4">Contato</h3>
            <div className="space-y-3 text-base text-white text-opacity-80">
              <a href="mailto:nosculturaloficial@gmail.com" className="flex items-center gap-2 hover:text-yellow-300 transition">
                <Mail className="w-4 h-4" />
                nosculturaloficial@gmail.com
              </a>
              <a href="tel:+551699119-0429" className="flex items-center gap-2 hover:text-yellow-300 transition">
                <Phone className="w-4 h-4" />
                (16) 99119-0429
              </a>
              <p className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Franca, SP - Brasil
              </p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-white bg-opacity-10 mb-8"></div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white text-opacity-80">
          <p>© {currentYear} <strong>Nós Cultural</strong> - Todos os direitos reservados.</p>
          <div className="flex gap-6">
            <Link href="/privacidade" className="hover:text-yellow-300 transition">Privacidade</Link>
            <Link href="/termos" className="hover:text-yellow-300 transition">Termos</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
