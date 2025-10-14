"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";

export default function Dashboard() {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    axios.get("http://localhost:5000/api/stats").then((res) => setStats(res.data));
  }, []);

  if (!stats) return <p>Carregando...</p>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard Geral</h1>

      {/* Totais */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="p-4 bg-white shadow rounded">Artistas: {stats.totais.totalArtistas}</div>
        <div className="p-4 bg-white shadow rounded">Coletivos: {stats.totais.totalColetivos}</div>
        <div className="p-4 bg-white shadow rounded">Equipamentos: {stats.totais.totalEquipamentos}</div>
      </div>

      {/* Artistas por gênero */}
      <h2 className="text-xl font-semibold mb-2">Distribuição por Gênero</h2>
      <PieChart width={400} height={300}>
        <Pie
          data={stats.artistasPorGenero.map((g: any) => ({ name: g.genero, value: g._count.genero }))}
          cx="50%"
          cy="50%"
          outerRadius={100}
          dataKey="value"
          label
        >
          {["#0088FE", "#FF8042", "#00C49F"].map((color, index) => (
            <Cell key={index} fill={color} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>

      {/* Faixa etária */}
      <h2 className="text-xl font-semibold mt-8 mb-2">Distribuição por Faixa Etária</h2>
      <BarChart width={500} height={300} data={Object.entries(stats.artistasFaixaEtaria).map(([k, v]) => ({ faixa: k, qtd: v }))}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="faixa" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="qtd" fill="#8884d8" />
      </BarChart>

      {/* Diversidade */}
      <h2 className="text-xl font-semibold mt-8 mb-2">Diversidade</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-white shadow rounded">LGBTQIAPN+: {stats.artistasDiversidade.lgbtqiapn}</div>
        <div className="p-4 bg-white shadow rounded">Negros: {stats.artistasDiversidade.negros}</div>
        <div className="p-4 bg-white shadow rounded">Indígenas: {stats.artistasDiversidade.indigenas}</div>
        <div className="p-4 bg-white shadow rounded">PCD: {stats.artistasDiversidade.pcd}</div>
      </div>
    </div>
  );
}
