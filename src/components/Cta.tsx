'use client';

export default function CTASection() {
  return (
    <section className="py-20 px-4 lg:px-40 bg-white">
      <div className="max-w-5xl mx-auto">
        
        <div className="bg-gradient-to-r from-bluePrimary to-greenPrimary rounded-lg p-12 text-white">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            
            {/* Left - Content */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold leading-tight">
                Pronto para fazer parte da comunidade?
              </h2>
              <p className="text-white text-opacity-90 text-lg">
                Cadastre-se como artista, forme um coletivo ou registre seu espaço cultural. 
                Ganhe visibilidade e conecte-se com profissionais da sua região.
              </p>

              {/* Quick Links */}
              <div className="space-y-3 pt-4 text-center">
                {[
                  { label: 'Sou Artista', href: '/cadastro-de-artista', icon: true },
                  { label: 'Tenho um Espaço Cultural', href: '/cadastro-de-espaco', icon: true },
                  { label: 'Quero Conhecer Artistas', href: '/busca', icon: false }
                ].map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    className={`block p-3 rounded transition ${
                      link.icon 
                        ? 'bg-yellow-500 bg-opacity-20 hover:bg-opacity-30 text-white font-semibold'
                        : 'text-white opacity-90 hover:opacity-100 underline'
                    }`}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Right - Stats */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { symbol: '+', label: 'Visibilidade' },
                { symbol: '+', label: 'Conectividade' },
                { symbol: '+', label: 'Oportunidades' },
                { symbol: '+', label: 'Desenvolvimento' }
              ].map((stat, index) => (
                <div key={index} className="bg-greenPrimary bg-opacity-10 rounded p-4 text-center">
                  <p className="text-3xl font-bold text-yellow-300">{stat.symbol}</p>
                  <p className="text-sm text-white text-opacity-80 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Garantia */}
        <div className="text-center mt-12">
          <p className="text-gray-600">
            ✓ 100% gratuito • ✓ Sem intermediários • ✓ Dados públicos para visibilidade
          </p>
        </div>
      </div>
    </section>
  );
}