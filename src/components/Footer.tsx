'use client';
export default function Footer() {
  return (
    <footer className="bg-bluePrimary text-white text-center p-4">
      <p>&copy; {new Date().getFullYear()} <strong>Nós Cultural</strong> - Todos os direitos reservados.</p>
      {/* <p><a href="/equipmentRegistration" className="hover:underline">Cadastrar Equipamento</a></p>
      <p><a href="/equipmentLogin" className="hover:underline">Cadastrar Equipamento</a></p> */}
    </footer>
  );
}
