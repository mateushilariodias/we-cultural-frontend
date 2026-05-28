"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { API_ENDPOINTS } from "@/config/api";
import {
  PieChart, Pie, Cell, Tooltip, Legend,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer
} from "recharts";

interface Artist {
  id: string;
  _id?: string;
  name: string;
  email: string;
  profilePicture?: string;
}

const COLORS = {
  primary: ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'],
  diversity: ['#10B981', '#3B82F6', '#F59E0B', '#EF4444']
};

interface Totais {
  totalArtistas: number;
  totalColetivos: number;
  totalEquipamentos: number;
}

interface ArtistaPorGenero {
  genero: string;
  _count: { genero: number };
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
  const router = useRouter();
  const { logout } = useAuth();
  const [artist, setArtist] = useState<Artist | null>(null);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  useEffect(() => {
    const cached = localStorage.getItem("artistData");
    if (cached) {
      try {
        setArtist(JSON.parse(cached));
      } catch {
        // ignore parse error
      }
    }
  }, []);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const res = await fetch(API_ENDPOINTS.stats);

        if (!res.ok) throw new Error('Erro ao carregar estatísticas');

        const data = await res.json();
        setStats(data);
        setLoading(false);
      } catch (err) {
        console.error("Erro ao carregar stats:", err);
        setError("Erro ao carregar estatísticas");
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  if (loading) {
    return (
      <div className="flex flex-col w-full min-h-screen">
        <header className="bg-[#1e3a8a] text-white px-4 lg:px-40 py-3 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Nós Cultural</h1>
        </header>
        <div className="flex-1 flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1e3a8a] mx-auto mb-4"></div>
            <p className="text-gray-600">Carregando estatísticas...</p>
          </div>
        </div>
        <footer className="bg-[#1e3a8a] text-white text-center p-4">
          <p>© 2026 <strong>Nós Cultural</strong> - Todos os direitos reservados.</p>
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
          <p>© 2026 <strong>Nós Cultural</strong> - Todos os direitos reservados.</p>
        </footer>
      </div>
    );
  }

  if (!stats) return null;

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
      <header className="bg-[#1e3a8a] text-white px-4 lg:px-40 py-3">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold hover:opacity-90 transition">Nós Cultural</Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-6 items-center">
            <a href="/search" className="hover:underline">Ver Cadastros</a>

            {!artist ? (
              <>
                <a href="/artistRegistration" className="bg-[#F59E0B] px-4 py-2 rounded hover:bg-[#D97706] transition">
                  Cadastrar Artista
                </a>
                <a href="/artistLogin" className="border border-white px-4 py-2 rounded hover:bg-white hover:text-[#1e3a8a] transition">
                  Login de Artista
                </a>
              </>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                  className="w-10 h-10 rounded-full border-2 border-white hover:border-[#F59E0B] transition overflow-hidden"
                  title={artist.name}
                >
                  {artist.profilePicture ? (
                    <Image
                      src={artist.profilePicture}
                      alt={artist.name}
                      fill
                      sizes="40px"
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-white text-[#1e3a8a] flex items-center justify-center font-bold">
                      {artist.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                </button>

                {profileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white text-gray-800 rounded-lg shadow-lg py-2 z-50">
                    <div className="px-4 py-3 border-b">
                      <p className="font-semibold text-gray-900">{artist.name}</p>
                      <p className="text-sm text-gray-500 truncate">{artist.email}</p>
                    </div>
                    <a
                      href={`/dashboard/${artist.id}/artistSettings`}
                      className="block px-4 py-2 hover:bg-gray-100 transition"
                    >
                      ⚙️ Configurações
                    </a>
                    <a
                      href={`/dashboard/${artist.id}/collectiveRegistration`}
                      className="block px-4 py-2 hover:bg-gray-100 transition"
                    >
                      📝 Cadastrar Coletivo
                    </a>
                    <a
                      href={`/dashboard/${artist.id}/collectiveLogin`}
                      className="block px-4 py-2 hover:bg-gray-100 transition"
                    >
                      📝 Login de Coletivo
                    </a>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100 transition"
                    >
                      🚪 Sair
                    </button>
                  </div>
                )}
              </div>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden mt-4 flex flex-col gap-3 pb-4">
            {artist && (
              <div className="flex items-center gap-3 pb-3 border-b border-white/30">
                {artist.profilePicture ? (
                  <Image
                    src={artist.profilePicture}
                    alt={artist.name}
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded-full object-cover border-2 border-white"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-white text-[#1e3a8a] flex items-center justify-center font-bold text-lg">
                    {artist.name.charAt(0).toUpperCase()}
                  </div>
                )}
                <div>
                  <p className="font-semibold">{artist.name}</p>
                  <p className="text-xs text-white/80 truncate">{artist.email}</p>
                </div>
              </div>
            )}
            
            <a href="/search" className="hover:underline py-2">Ver Cadastros</a>
            
            {!artist ? (
              <>
                <a href="/artistRegistration" className="bg-[#F59E0B] px-4 py-2 rounded hover:bg-[#D97706] transition text-center">
                  Cadastrar Artista
                </a>
                <a href="/artistLogin" className="border border-white px-4 py-2 rounded hover:bg-white hover:text-[#1e3a8a] transition text-center">
                  Login de Artista
                </a>
              </>
            ) : (
              <>
                <hr className="border-white/30" />
                <a href={`/dashboard/${artist.id}/artistSettings`} className="hover:underline py-2">⚙️ Configurações</a>
                <button onClick={handleLogout} className="text-left hover:underline py-2">🚪 Sair</button>
              </>
            )}
          </nav>
        )}
      </header>

      <main className="flex-1 bg-gray-50 py-8 lg:py-12">
        <div className="max-w-6xl mx-auto px-4 lg:px-8">
          <div className="mb-8 text-center lg:text-left">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-2">Dashboard Geral</h1>
            <p className="text-lg text-gray-600">Estatísticas do cenário cultural Francano</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-[#1e3a8a]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm font-medium">Total de Artistas</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totais.totalArtistas}</p>
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
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totais.totalColetivos}</p>
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
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totais.totalEquipamentos}</p>
                </div>
                <div className="bg-yellow-100 rounded-full p-3">
                  <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Distribuição por Gênero</h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={generoData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={(props: unknown) => {
                      const { name, percent } = props as { name: string; percent: number };
                      return `${name}: ${(percent * 100).toFixed(0)}%`;
                    }}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {generoData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS.primary[index % COLORS.primary.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Distribuição por Faixa Etária</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={faixaEtariaData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="faixa" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="quantidade" fill="#1e3a8a">
                    {faixaEtariaData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS.primary[index % COLORS.primary.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Indicadores de Diversidade</h2>
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

          {stats.topCategorias && stats.topCategorias.length > 0 && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Top 5 Categorias</h2>
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
                          style={{ width: `${(cat.total / stats.totais.totalArtistas) * 100}%` }}
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

      <footer className="bg-[#1e3a8a] text-white text-center p-4">
        <p>© 2026 <strong>Nós Cultural</strong> - Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}