'use client';
import { useEffect, useState } from "react";
import { 
  PieChart, Pie, Cell, Tooltip, Legend, 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer 
} from "recharts";

const COLORS = {
  primary: ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'],
  diversity: ['#10B981', '#3B82F6', '#F59E0B', '#EF4444']
};

// Definir interfaces para os tipos
interface Totais {
  totalArtistas: number;
  totalColetivos: number;
  totalEquipamentos: number;
}

interface ArtistaPorGenero {
  genero: string;
  _count: {
    genero: number;
  };
}

interface ArtistaDiversidade {
  lgbtqiapn: number;
  negros: number;
  indigenas: number;
  pcd: number;
}

interface TopCategoria {
  categoria: string;
  total: number;
}

interface Stats {
  totais: Totais;
  artistasPorGenero: ArtistaPorGenero[];
  artistasFaixaEtaria: Record<string, number>;
  artistasDiversidade: ArtistaDiversidade;
  topCategorias?: TopCategoria[];
}

export default function Dashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/stats")
      .then((res) => res.json())
      .then((data: Stats) => {
        setStats(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erro ao carregar stats:", err);
        setError("Erro ao carregar estatísticas");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col w-full min-h-screen">
        {/* Header */}
        <header className="bg-[#1e3a8a] text-white px-4 lg:px-40 py-3 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Nós Cultural</h1>
          <nav className="flex gap-6 items-center">
            <a href="/search" className="hover:underline">Ver Artistas</a>
            <a href="/artistRegistration" className="bg-yellow-500 px-4 py-2 rounded hover:bg-yellow-600">
              Cadastrar Artista
            </a>
            <a href="/artistLogin" className="border border-white px-4 py-2 rounded hover:bg-white hover:text-black">
              Login de Artista
            </a>
          </nav>
        </header>

        {/* Loading */}
        <div className="flex-1 flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1e3a8a] mx-auto mb-4"></div>
            <p className="text-gray-600">Carregando estatísticas...</p>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-[#1e3a8a] text-white text-center p-4">
          <p>© 2025 <strong>Nós Cultural</strong> - Todos os direitos reservados.</p>
        </footer>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col w-full min-h-screen">
        <header className="bg-[#1e3a8a] text-white px-4 lg:px-40 py-3 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Nós Cultural</h1>
        </header>
        <div className="flex-1 flex items-center justify-center bg-gray-50">
          <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded">
            {error}
          </div>
        </div>
        <footer className="bg-[#1e3a8a] text-white text-center p-4">
          <p>© 2025 <strong>Nós Cultural</strong> - Todos os direitos reservados.</p>
        </footer>
      </div>
    );
  }

  if (!stats) return null;

  // Preparar dados para os gráficos
  const generoData = stats.artistasPorGenero.map((g) => ({
    name: g.genero || "Não informado",
    value: g._count.genero,
  }));

  const faixaEtariaData = Object.entries(stats.artistasFaixaEtaria).map(([faixa, qtd]) => ({
    faixa,
    quantidade: qtd,
  }));

  const diversidadeData = [
    { name: "LGBTQIAPN+", value: stats.artistasDiversidade.lgbtqiapn },
    { name: "Negros", value: stats.artistasDiversidade.negros },
    { name: "Indígenas", value: stats.artistasDiversidade.indigenas },
    { name: "PCD", value: stats.artistasDiversidade.pcd },
  ];

  return (
    <div className="flex flex-col w-full min-h-screen">
      {/* Header */}
      <header className="bg-[#1e3a8a] text-white px-4 lg:px-40 py-3 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Nós Cultural</h1>
        <nav className="hidden md:flex gap-6 items-center">
          <a href="/search" className="hover:underline">Ver Artistas</a>
          <a href="/artistRegistration" className="bg-yellow-500 px-4 py-2 rounded hover:bg-yellow-600">
            Cadastrar Artista
          </a>
          <a href="/artistLogin" className="border border-white px-4 py-2 rounded hover:bg-white hover:text-black">
            Login de Artista
          </a>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1 bg-gray-50 py-8 lg:py-12">
        <div className="max-w-6xl mx-auto px-4 lg:px-8">
          {/* Título */}
          <div className="mb-8 text-center lg:text-left">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-2">
              Dashboard Geral
            </h1>
            <p className="text-lg text-gray-600">
              Estatísticas do cenário cultural Francano
            </p>
          </div>

          {/* Cards de Totais */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-[#1e3a8a]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm font-medium">Total de Artistas</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">
                    {stats.totais.totalArtistas}
                  </p>
                </div>
                <div className="bg-blue-100 rounded-full p-3">
                  <svg className="w-8 h-8 text-[#1e3a8a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-600">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm font-medium">Coletivos</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">
                    {stats.totais.totalColetivos}
                  </p>
                </div>
                <div className="bg-green-100 rounded-full p-3">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-yellow-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm font-medium">Equipamentos</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">
                    {stats.totais.totalEquipamentos}
                  </p>
                </div>
                <div className="bg-yellow-100 rounded-full p-3">
                  <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Gráficos */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Distribuição por Gênero */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Distribuição por Gênero
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={generoData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {generoData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS.primary[index % COLORS.primary.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Faixa Etária */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Distribuição por Faixa Etária
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={faixaEtariaData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="faixa" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="quantidade" fill="#1e3a8a">
                    {faixaEtariaData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS.primary[index % COLORS.primary.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Cards de Diversidade */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Indicadores de Diversidade
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {diversidadeData.map((item, index) => (
                <div 
                  key={item.name}
                  className="p-4 rounded-lg border-2 hover:shadow-lg transition-shadow"
                  style={{ borderColor: COLORS.diversity[index] }}
                >
                  <p className="text-sm text-gray-600 font-medium">{item.name}</p>
                  <p className="text-3xl font-bold mt-2" style={{ color: COLORS.diversity[index] }}>
                    {item.value}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {stats.totais.totalArtistas > 0 
                      ? ((item.value / stats.totais.totalArtistas) * 100).toFixed(1) 
                      : 0}% do total
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Top Categorias */}
          {stats.topCategorias && stats.topCategorias.length > 0 && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Top 5 Categorias
              </h2>
              <div className="space-y-3">
                {stats.topCategorias.map((cat, index) => (
                  <div key={cat.categoria} className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-[#1e3a8a] bg-opacity-10 flex items-center justify-center text-[#1e3a8a] font-bold text-sm mr-3">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold text-gray-900">{cat.categoria}</span>
                        <span className="text-gray-600 font-bold">{cat.total}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-[#1e3a8a] h-2 rounded-full transition-all"
                          style={{ 
                            width: `${(cat.total / stats.totais.totalArtistas) * 100}%` 
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#1e3a8a] text-white text-center p-4">
        <p>© 2025 <strong>Nós Cultural</strong> - Todos os direitos reservados.</p>
        <p className="mt-2">
          <a href="/equipmentRegistration" className="hover:underline">Cadastrar Equipamento</a>
        </p>
      </footer>
    </div>
  );
}