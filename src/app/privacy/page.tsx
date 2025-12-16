export default function PrivacyPolicy() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-[#1e3a8a] text-white px-4 lg:px-40 py-3">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Nós Cultural</h1>
          <nav className="flex gap-4">
            <a href="/" className="hover:underline">Home</a>
            <a href="/search" className="hover:underline">Ver Artistas</a>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 bg-gray-50 py-12 px-4">
        <article className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8 lg:p-12">
          <h1 className="text-4xl font-bold text-[#1e3a8a] mb-4">Política de Privacidade</h1>
          <p className="text-gray-600 mb-8">Última atualização: {new Date().toLocaleDateString('pt-BR')}</p>
          
          <div className="prose prose-lg max-w-none text-gray-700">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[#1e3a8a] mb-4">1. Introdução</h2>
              <p className="mb-4">
                A plataforma Nós Cultural respeita a privacidade de seus usuários e está comprometida em proteger 
                as informações pessoais que você compartilha conosco. Esta Política de Privacidade descreve como 
                coletamos, usamos, armazenamos e protegemos seus dados.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[#1e3a8a] mb-4">2. Informações que Coletamos</h2>
              <p className="mb-4">Coletamos as seguintes informações:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li><strong>Dados de Cadastro:</strong> Nome, e-mail, telefone, data de nascimento</li>
                <li><strong>Dados Profissionais:</strong> Categorias artísticas, links de portfólio, currículo</li>
                <li><strong>Dados Demográficos:</strong> Gênero, identificações de grupos (LGBTQIAPN+, negro, indígena, PCD)</li>
                <li><strong>Mídia:</strong> Fotos de perfil e imagens enviadas</li>
                <li><strong>Dados de Navegação:</strong> Endereço IP, tipo de navegador, páginas visitadas</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[#1e3a8a] mb-4">3. Como Usamos suas Informações</h2>
              <p className="mb-4">Utilizamos suas informações para:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Criar e gerenciar sua conta na plataforma</li>
                <li>Permitir que você cadastre e atualize seu perfil artístico</li>
                <li>Facilitar a busca e conexão entre artistas, coletivos e equipamentos culturais</li>
                <li>Enviar notificações importantes sobre sua conta</li>
                <li>Melhorar nossos serviços e desenvolver novos recursos</li>
                <li>Gerar estatísticas agregadas e anônimas sobre o uso da plataforma</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[#1e3a8a] mb-4">4. Compartilhamento de Dados</h2>
              <p className="mb-4">
                Nós <strong>não vendemos</strong> suas informações pessoais. Seus dados podem ser compartilhados apenas nas 
                seguintes situações:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li><strong>Informações Públicas:</strong> Dados do seu perfil artístico são visíveis para outros usuários da plataforma</li>
                <li><strong>Prestadores de Serviço:</strong> Compartilhamos dados com serviços de hospedagem (como Render/Railway) e armazenamento de imagens (Cloudinary)</li>
                <li><strong>Requisitos Legais:</strong> Quando exigido por lei ou ordem judicial</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[#1e3a8a] mb-4">5. Segurança dos Dados</h2>
              <p className="mb-4">
                Implementamos medidas de segurança para proteger suas informações:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Senhas são criptografadas usando bcrypt</li>
                <li>Conexões protegidas por HTTPS/SSL</li>
                <li>Acesso restrito aos dados pessoais</li>
                <li>Monitoramento regular de vulnerabilidades</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[#1e3a8a] mb-4">6. Seus Direitos</h2>
              <p className="mb-4">Você tem direito a:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li><strong>Acessar:</strong> Visualizar os dados que temos sobre você</li>
                <li><strong>Corrigir:</strong> Atualizar informações incorretas ou desatualizadas</li>
                <li><strong>Excluir:</strong> Solicitar a exclusão de sua conta e dados pessoais</li>
                <li><strong>Portabilidade:</strong> Receber seus dados em formato estruturado</li>
                <li><strong>Revogar Consentimento:</strong> Retirar permissões concedidas anteriormente</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[#1e3a8a] mb-4">7. Cookies e Tecnologias Similares</h2>
              <p className="mb-4">
                Utilizamos cookies e tecnologias de armazenamento local (localStorage) para:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Manter você conectado à plataforma</li>
                <li>Lembrar suas preferências</li>
                <li>Melhorar a experiência de navegação</li>
              </ul>
              <p className="mb-4">
                Você pode configurar seu navegador para bloquear cookies, mas isso pode afetar o funcionamento da plataforma.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[#1e3a8a] mb-4">8. Retenção de Dados</h2>
              <p className="mb-4">
                Mantemos suas informações pelo tempo necessário para fornecer nossos serviços e cumprir 
                obrigações legais. Quando você exclui sua conta, seus dados são removidos de nossos sistemas 
                em até 30 dias, exceto informações que devemos manter por lei.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[#1e3a8a] mb-4">9. Menores de Idade</h2>
              <p className="mb-4">
                Nossa plataforma é destinada a usuários maiores de 18 anos. Não coletamos intencionalmente 
                informações de menores de idade. Se você acredita que coletamos dados de um menor, 
                entre em contato conosco imediatamente.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[#1e3a8a] mb-4">10. Alterações nesta Política</h2>
              <p className="mb-4">
                Podemos atualizar esta Política de Privacidade periodicamente. Notificaremos você sobre 
                mudanças significativas por e-mail ou através de avisos na plataforma. A data da última 
                atualização está indicada no topo desta página.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[#1e3a8a] mb-4">11. Contato</h2>
              <p className="mb-4">
                Para exercer seus direitos, fazer perguntas ou reportar preocupações sobre privacidade, 
                entre em contato conosco:
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded p-4">
                <p className="mb-2"><strong>E-mail:</strong> nosculturaloficial@gmail.com</p>
                <p><strong>Responsável:</strong> Equipe Nós Cultural</p>
              </div>
            </section>

            <section className="mt-8 p-4 bg-gray-100 rounded">
              <p className="text-sm text-gray-600">
                Ao utilizar a plataforma Nós Cultural, você concorda com os termos desta Política de Privacidade 
                e com nossa coleta e uso de informações conforme descrito acima.
              </p>
            </section>
          </div>
        </article>
      </main>

      {/* Footer */}
      <footer className="bg-[#1e3a8a] text-white text-center p-6">
        <div className="max-w-4xl mx-auto">
          <p className="mb-2">© 2025 <strong>Nós Cultural</strong> - Todos os direitos reservados.</p>
          <div className="flex justify-center gap-4 text-sm">
            <a href="/privacy" className="hover:underline">Política de Privacidade</a>
            <span>•</span>
            <a href="/terms" className="hover:underline">Termos de Uso</a>
          </div>
        </div>
      </footer>
    </div>
  );
}