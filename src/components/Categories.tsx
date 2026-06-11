'use client';

import React from 'react';
import { 
  Palette, 
  Music, 
  BookOpen, 
  Clapperboard, 
  Gamepad2, 
  Camera,
  Brush,
  Theater,
  Zap,
  Hammer,
  Figma
} from 'lucide-react';

const categories = [
  { id: 'arquitetura', name: 'Arquitetura', icon: Figma },
  { id: 'arte-digital', name: 'Arte Digital', icon: Zap },
  { id: 'artesanato', name: 'Artesanato', icon: Hammer },
  { id: 'cinema', name: 'Cinema', icon: Clapperboard },
  { id: 'danca', name: 'Dança', icon: Theater },
  { id: 'design', name: 'Design', icon: Palette },
  { id: 'escultura', name: 'Escultura', icon: Brush },
  { id: 'fotografia', name: 'Fotografia', icon: Camera },
  { id: 'quadrinhos', name: 'História em Quadrinhos', icon: BookOpen },
  { id: 'jogos', name: 'Jogos Eletrônicos', icon: Gamepad2 },
  { id: 'literatura', name: 'Literatura', icon: BookOpen },
  { id: 'musica', name: 'Música', icon: Music },
  { id: 'pintura', name: 'Pintura', icon: Palette },
  { id: 'teatro', name: 'Teatro', icon: Theater },
];

export default function CategoriesSection() {
  return (
    <section className="py-20 px-4 lg:px-40 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-bluePrimary mb-4">
            Categorias Artísticas em Franca, SP
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Explore artistas de música, teatro, dança, cinema, fotografia e outras linguagens
            culturais de Franca, SP. Encontre coletivos e espaços culturais por categoria.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <a
                key={category.id}
                href={`/busca?category=${category.id}`}
                className="group flex flex-col items-center justify-center p-4 rounded-lg border-2 border-gray-200 bg-white hover:border-bluePrimary hover:bg-blue-50 transition-all duration-300 cursor-pointer"
              >
                <Icon className="w-8 h-8 text-bluePrimary mb-3 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-semibold text-bluePrimary text-center group-hover:text-greenPrimary transition-colors">
                  {category.name}
                </span>
              </a>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-6">
            Quer adicionar sua categoria? Cadastre-se e faça parte do nosso ecossistema.
          </p>
          <a
            href="/cadastro-de-artista"
            className="inline-block px-8 py-3 bg-greenPrimary text-white font-semibold rounded hover:bg-opacity-90 transition"
          >
            Cadastrar Agora
          </a>
        </div>
      </div>
    </section>
  );
}