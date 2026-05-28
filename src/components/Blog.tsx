'use client';

export default function BlogSection() {
  return (
    <section className="py-20 px-4 lg:px-40 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[#1e3a8a] mb-4">
            Blog &amp; Notícias
          </h2>
        </div>

        <div className="bg-gradient-to-r from-purple-50 via-blue-50 to-purple-50 border-2 border-purple-200 rounded-lg p-8 mb-12">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-[#1e3a8a] mb-3">Em Breve: Novo Conteúdo</h3>
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
                Ver Programação Cultural da Semana
              </a>
              <a
                href="https://www.instagram.com/macarte_oficial/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-white text-[#1e3a8a] font-semibold border-2 border-[#1e3a8a] rounded hover:bg-[#1e3a8a] hover:text-white transition"
              >
                Acompanhe Nossas Redes
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
