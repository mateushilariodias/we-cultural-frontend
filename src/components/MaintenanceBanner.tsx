export default function MaintenanceBanner() {
  return (
    <div className="bg-gray-100 text-gray-800 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-32 py-4 sm:py-5">
        <div className="flex items-start gap-3 sm:gap-4">
          
          {/* Ícone */}
          <div className="flex-shrink-0 text-yellow-500 mt-0.5">
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>

          {/* Conteúdo */}
          <div className="flex-1 space-y-1.5 sm:space-y-2">
            <h3 className="text-sm sm:text-base font-semibold leading-snug">
              🎄 Aviso de Recesso de Final de Ano
            </h3>

            <p className="text-xs sm:text-sm text-gray-600">
              <strong>Período:</strong> 18/12/2024 até 04/01/2025
            </p>

            <p className="text-xs sm:text-sm leading-relaxed text-gray-700">
              A plataforma <strong>Nós Cultural</strong> está em fase de desenvolvimento.
              Algumas funcionalidades serão implementadas a partir de{" "}
              <strong>05 de janeiro de 2025</strong>.
            </p>

            {/* Status */}
            <div className="pt-1 flex flex-wrap gap-2">
              <span className="inline-flex items-center bg-gray-200 text-gray-700 px-2.5 py-0.5 rounded-full text-[11px] sm:text-xs font-medium">
                ✨ Cadastros funcionando
              </span>
              <span className="inline-flex items-center bg-gray-200 text-gray-700 px-2.5 py-0.5 rounded-full text-[11px] sm:text-xs font-medium">
                👀 Busca ativa
              </span>
              <span className="inline-flex items-center bg-gray-200 text-gray-700 px-2.5 py-0.5 rounded-full text-[11px] sm:text-xs font-medium">
                ⚙️ Algumas edições em desenvolvimento
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
