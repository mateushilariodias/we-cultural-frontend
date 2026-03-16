'use client';

import React from 'react';

const blogPosts = [
  {
    id: '1',
    title: 'Conheça a Nós Cultural',
    excerpt: 'Descubra como a Nós Cultural está centralizando artistas, coletivos e espaços culturais em uma única plataforma.',
    date: '15 Jan 2026',
    category: 'Destaque',
    icon: '🎨',
    gradient: 'from-blue-600 to-purple-600'
  },
  {
    id: '2',
    title: 'Como Formar um Coletivo Artístico',
    excerpt: 'Dicas práticas para artistas que desejam criar ou participar de coletivos e multiplicar seus projetos.',
    date: '12 Jan 2026',
    category: 'Tutorial',
    icon: '🎭',
    gradient: 'from-green-600 to-emerald-600'
  },
  {
    id: '3',
    title: 'Espaços Culturais de Franca',
    excerpt: 'Conheça os principais estúdios, galerias, teatros e espaços onde a cultura acontece em Franca.',
    date: '10 Jan 2026',
    category: 'Descoberta',
    icon: '🗺️',
    gradient: 'from-orange-600 to-red-600'
  }
];

export default function BlogSection() {
  return (
    <section className="py-20 px-4 lg:px-40 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[#1e3a8a] mb-4">
            📚 Blog & Notícias
          </h2>
          {/* <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Artigos, dicas e histórias sobre a comunidade artística de Franca. Novas postagens estão sendo criadas!
          </p> */}
        </div>

        {/* Blog Cards Grid */}
        {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {blogPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden hover:shadow-xl hover:border-[#1e3a8a] transition-all duration-300 flex flex-col"
            >
              <div className={`w-full h-48 bg-gradient-to-br ${post.gradient} flex items-center justify-center`}>
                <p className="text-6xl">{post.icon}</p>
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <span className="inline-block w-fit px-3 py-1 bg-blue-100 text-[#1e3a8a] text-xs font-bold rounded mb-3">
                  {post.category}
                </span>
                
                <h3 className="text-lg font-bold text-[#1e3a8a] mb-3 leading-tight hover:text-purple-600 transition">
                  {post.title}
                </h3>
                
                <p className="text-gray-600 text-sm mb-4 flex-grow">
                  {post.excerpt}
                </p>
                
                <p className="text-xs text-gray-500 mb-4">{post.date}</p>
                
                <a 
                  href="/schedule" 
                  className="inline-block text-[#1e3a8a] font-semibold hover:text-purple-600 transition text-sm"
                >
                  Ler Mais →
                </a>
              </div>
            </div>
          ))}
        </div> */}

        {/* Coming Soon Banner */}
        <div className="bg-gradient-to-r from-purple-50 via-blue-50 to-purple-50 border-2 border-purple-200 rounded-lg p-8 mb-12">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-[#1e3a8a] mb-3">✨ Em Breve: Novo Conteúdo</h3>
            <p className="text-gray-700 mb-6">
              Estamos criando artigos, dicas e histórias exclusivas sobre a comunidade artística de Franca. 
              <br />
              Confira também nossa programação cultural semanal!
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <a
                href="/schedule"
                className="px-6 py-3 bg-[#1e3a8a] text-white font-semibold rounded hover:opacity-90 transition"
              >
                🗓️ Ver Programação Cultural Completa da Semana
              </a>
              <a 
                href='https://www.instagram.com/mateushilariodias/'
                className="px-6 py-3 bg-white text-[#1e3a8a] font-semibold border-2 border-[#1e3a8a] rounded hover:bg-[#1e3a8a] hover:text-white transition"
              >
                🔔 Acompanhe Nossas Redes
              </a>
            </div>
          </div>
        </div>

        {/* View All Button */}
        {/* <div className="text-center">
          <a
            href="/schedule"
            className="inline-block px-8 py-4 bg-[#1e3a8a] text-white font-semibold rounded-lg hover:opacity-90 transition text-lg shadow-md hover:shadow-lg"
          >
            Ver Programação Completa da Semana →
          </a>
        </div> */}
      </div>
    </section>
  );
}