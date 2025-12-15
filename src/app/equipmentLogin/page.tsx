"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EquipamentLogin() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
      
      // Chamar endpoint de login do backend
      const res = await fetch(`${BACKEND_URL}/api/auth/collective/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Erro no login");
        setLoading(false);
        return;
      }

      // Salvar dados do coletivo
      localStorage.setItem("collectiveToken", "collective_logged_in");
      localStorage.setItem("collectiveData", JSON.stringify({
        id: data.collective.id,
        name: data.collective.name,
        profilePicture: data.collective.profilePicture,
      }));

      // Redirecionar para dashboard do coletivo
      router.push(`/collective/${data.collective.id}`);

    } catch (err) {
      console.error("Erro no login:", err);
      setError("Erro ao conectar com o servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-green-700 text-white px-4 lg:px-40 py-3">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Nós Cultural</h1>
          <nav className="flex gap-4">
            <a href="/" className="hover:underline">Home</a>
            <a href="/search" className="hover:underline">Ver Artistas</a>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center bg-gray-50 py-12">
        <section className="max-w-md w-full bg-white shadow-lg rounded-lg p-8 mx-4">
          <div className="text-center mb-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-green-700 mb-2">Login de Coletivo</h1>
            <p className="text-gray-600">Acesse o perfil do seu coletivo</p>
          </div>
          
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}
          
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label className="font-medium text-gray-700">Nome do Coletivo *</label>
              <input
                type="text"
                placeholder="Digite o nome do coletivo"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                disabled={loading}
              />
              <p className="text-xs text-gray-500 mt-1">Digite exatamente como foi cadastrado</p>
            </div>
            
            <div className="flex flex-col gap-1">
              <label className="font-medium text-gray-700">Senha *</label>
              <input
                type="password"
                placeholder="Digite a senha do coletivo"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                disabled={loading}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleSubmit(e);
                  }
                }}
              />
            </div>
            
            <button
              onClick={handleSubmit}
              className="bg-green-600 text-white px-4 py-3 rounded hover:bg-green-700 disabled:opacity-50 transition font-semibold mt-2"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Entrando...
                </span>
              ) : (
                "Entrar"
              )}
            </button>
          </div>
          
          <hr className="my-6 border-gray-300" />
          
          <p className="text-center text-gray-600">
            Não tem um coletivo cadastrado?{" "}
            <a href="/collectiveRegistration" className="text-green-600 hover:underline font-semibold">
              Cadastre aqui
            </a>
          </p>
          
          <div className="mt-4 bg-blue-50 border border-blue-200 rounded p-3">
            <p className="text-sm text-blue-700 text-center">
              <strong>ℹ️ Lembrete:</strong> Você precisa estar logado como artista para cadastrar um coletivo
            </p>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-green-700 text-white text-center p-4">
        <p>© 2025 <strong>Nós Cultural</strong> - Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}

// "use client";
// import { useState } from "react";
// import { useRouter } from "next/navigation";

// export default function EquipmentLogin() {
//   const router = useRouter();
//   const [name, setName] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     try {
//       const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
      
//       // Buscar todos os equipamentos
//       const res = await fetch(`${BACKEND_URL}/api/equipments`);
//       const equipments = await res.json();

//       // Encontrar equipamento por nome
//       const equipment = equipments.find((e: any) => 
//         e.name.toLowerCase() === name.toLowerCase()
//       );

//       if (!equipment) {
//         setError("Equipamento não encontrado");
//         setLoading(false);
//         return;
//       }

//       // Validar senha
//       const bcrypt = await import('bcryptjs');
//       const isValid = await bcrypt.compare(password, equipment.password);

//       if (!isValid) {
//         setError("Senha incorreta");
//         setLoading(false);
//         return;
//       }

//       // Salvar dados do equipamento
//       localStorage.setItem("equipmentToken", "equipment_logged_in");
//       localStorage.setItem("equipmentData", JSON.stringify({
//         id: equipment._id,
//         name: equipment.name,
//         logo: equipment.logo,
//       }));

//       // Redirecionar para perfil do equipamento
//       router.push(`/equipment/${equipment._id}`);

//     } catch (err) {
//       console.error("Erro no login:", err);
//       setError("Erro ao conectar com o servidor");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex flex-col min-h-screen">
//       {/* Header */}
//       <header className="bg-purple-700 text-white px-4 lg:px-40 py-3">
//         <div className="flex justify-between items-center">
//           <h1 className="text-2xl font-bold">Nós Cultural</h1>
//           <nav className="flex gap-4">
//             <a href="/" className="hover:underline">Home</a>
//             <a href="/search" className="hover:underline">Ver Artistas</a>
//           </nav>
//         </div>
//       </header>

//       {/* Main Content */}
//       <div className="flex-1 flex items-center justify-center bg-gray-50 py-12">
//         <section className="max-w-md w-full bg-white shadow-lg rounded-lg p-8 mx-4">
//           <div className="text-center mb-6">
//             <div className="w-20 h-20 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
//               <svg className="w-10 h-10 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
//               </svg>
//             </div>
//             <h1 className="text-3xl font-bold text-purple-700 mb-2">Login de Equipamento</h1>
//             <p className="text-gray-600">Acesse o perfil do seu equipamento cultural</p>
//           </div>
          
//           {error && (
//             <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
//               {error}
//             </div>
//           )}
          
//           <div className="flex flex-col gap-4">
//             <div className="flex flex-col gap-1">
//               <label className="font-medium text-gray-700">Nome do Equipamento *</label>
//               <input
//                 type="text"
//                 placeholder="Digite o nome do equipamento"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
//                 disabled={loading}
//               />
//               <p className="text-xs text-gray-500 mt-1">Digite exatamente como foi cadastrado</p>
//             </div>
            
//             <div className="flex flex-col gap-1">
//               <label className="font-medium text-gray-700">Senha *</label>
//               <input
//                 type="password"
//                 placeholder="Digite a senha"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
//                 disabled={loading}
//                 onKeyPress={(e) => {
//                   if (e.key === 'Enter') {
//                     handleSubmit(e);
//                   }
//                 }}
//               />
//             </div>
            
//             <button
//               onClick={handleSubmit}
//               className="bg-purple-600 text-white px-4 py-3 rounded hover:bg-purple-700 disabled:opacity-50 transition font-semibold mt-2"
//               disabled={loading}
//             >
//               {loading ? (
//                 <span className="flex items-center justify-center gap-2">
//                   <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                   </svg>
//                   Entrando...
//                 </span>
//               ) : (
//                 "Entrar"
//               )}
//             </button>
//           </div>
          
//           <hr className="my-6 border-gray-300" />
          
//           <p className="text-center text-gray-600">
//             Não tem um equipamento cadastrado?{" "}
//             <a href="/equipmentRegistration" className="text-purple-600 hover:underline font-semibold">
//               Cadastre aqui
//             </a>
//           </p>
          
//           <div className="mt-4 bg-blue-50 border border-blue-200 rounded p-3">
//             <p className="text-sm text-blue-700 text-center">
//               <strong>ℹ️ Acesso independente:</strong> Não é necessário ser artista para cadastrar um equipamento cultural
//             </p>
//           </div>
//         </section>
//       </div>

//       {/* Footer */}
//       <footer className="bg-purple-700 text-white text-center p-4">
//         <p>© 2025 <strong>Nós Cultural</strong> - Todos os direitos reservados.</p>
//       </footer>
//     </div>
//   );
// }