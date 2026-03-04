'use client';

import React from 'react';

const articles = [
  {
    id: '1',
    title: 'Conheça a Nós Cultural: a plataforma que está mudando a cultura de Franca',
    excerpt: 'Descubra como a Nós Cultural está centralizando artistas, coletivos e espaços culturais em uma única plataforma.',
    date: '15 Jan 2026',
    category: 'Destaque'
  },
  {
    id: '2',
    title: 'Como Formar um Coletivo Artístico Forte',
    excerpt: 'Dicas práticas para artistas que desejam criar ou participar de coletivos e multiplicar seus projetos.',
    date: '12 Jan 2026',
    category: 'Tutorial'
  },
  {
    id: '3',
    title: 'Espaços Culturais de Franca: um mapa para descobrir',
    excerpt: 'Conheça os principais estúdios, galerias, teatros e espaços onde a cultura acontece em Franca.',
    date: '10 Jan 2026',
    category: 'Descoberta'
  }
];

export default function BlogSection() {
  return (
    <section className="py-20 px-4 lg:px-40 bg-white">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-bluePrimary mb-4">
            Blog & Notícias
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Artigos, dicas e histórias sobre a comunidade artística de Franca.
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {articles.map((article) => (
            <article
              key={article.id}
              className="border-2 border-gray-200 rounded-lg p-6 hover:border-bluePrimary hover:shadow-lg transition"
            >
              <span className="inline-block px-3 py-1 bg-blue-100 text-bluePrimary text-xs font-bold rounded mb-4">
                {article.category}
              </span>
              
              <h3 className="text-lg font-bold text-bluePrimary mb-3 leading-tight">
                {article.title}
              </h3>
              
              <p className="text-gray-600 text-sm mb-4">
                {article.excerpt}
              </p>
              
              <p className="text-xs text-gray-500">{article.date}</p>
              
              <a href="#" className="inline-block mt-4 text-bluePrimary font-semibold hover:text-greenPrimary transition">
                Ler Mais →
              </a>
            </article>
          ))}
        </div>

        {/* View All */}
        <div className="text-center">
          <a
            href="/blog"
            className="inline-block px-6 py-3 bg-bluePrimary text-white font-semibold rounded hover:opacity-90 transition"
          >
            Ver Todos os Artigos
          </a>
        </div>
      </div>
    </section>
  );
}