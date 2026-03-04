'use client';

import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function FooterSection() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-bluePrimary text-white py-16 px-4 lg:px-40">
      <div className="max-w-7xl mx-auto">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold mb-4">Nós Cultural</h3>
            <p className="text-white text-opacity-80 text-base">
              Conectando artistas, coletivos e espaços culturais de Franca.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold mb-4">Navegação</h3>
            <ul className="space-y-2 text-base text-white text-opacity-80">
              <li><a href="/search" className="hover:text-yellow-300 transition">Ver Artistas</a></li>
              <li><a href="/artistRegistration" className="hover:text-yellow-300 transition">Cadastrar Artista</a></li>
              <li><a href="/artistLogin" className="hover:text-yellow-300 transition">Login de Artista</a></li>
              {/* <li><a href="/blog" className="hover:text-yellow-300 transition">Blog</a></li> */}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-bold mb-4">Recursos</h3>
            <ul className="space-y-2 text-base text-white text-opacity-80">
              {/* <li><a href="#" className="hover:text-yellow-300 transition">Como Funciona</a></li> */}
              {/* <li><a href="#" className="hover:text-yellow-300 transition">FAQ</a></li> */}
              <li><a href="artistLogin" className="hover:text-yellow-300 transition">Dashboard</a></li>
              {/* <li><a href="#" className="hover:text-yellow-300 transition">Estatísticas</a></li> */}
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
            <a href="/privacy" className="hover:text-yellow-300 transition">Privacidade</a>
            <a href="/terms" className="hover:text-yellow-300 transition">Termos</a>
            {/* <a href="/lgpd" className="hover:text-yellow-300 transition">LGPD</a> */}
          </div>
        </div>
      </div>
    </footer>
  );
}
