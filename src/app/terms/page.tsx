import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Termos de Uso",
  description: "Leia os termos de uso da plataforma Nós Cultural e saiba seus direitos e responsabilidades.",
  alternates: { canonical: "/termos" },
};

export default function TermsOfUse() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-[#1e3a8a] text-white px-4 lg:px-40 py-3">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Nós Cultural</h1>
          <nav className="flex gap-4">
            <Link href="/" className="hover:underline">Home</Link>
            <a href="/busca" className="hover:underline">Ver Cadastros</a>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 bg-gray-50 py-12 px-4">
        <article className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8 lg:p-12">
          <h1 className="text-4xl font-bold text-[#1e3a8a] mb-4">Termos de Uso</h1>
          <p className="text-gray-600 mb-8">Última atualização: 28 de maio de 2026</p>
          
          <div className="prose prose-lg max-w-none text-gray-700">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[#1e3a8a] mb-4">1. Aceitação dos Termos</h2>
              <p className="mb-4">
                Bem-vindo ao Nós Cultural! Ao acessar e usar nossa plataforma, você concorda em cumprir e estar 
                vinculado a estes Termos de Uso. Se você não concorda com qualquer parte destes termos, não 
                deve utilizar nossos serviços.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[#1e3a8a] mb-4">2. Descrição do Serviço</h2>
              <p className="mb-4">
                O Nós Cultural é uma plataforma digital que conecta artistas, coletivos e equipamentos culturais. 
                Oferecemos:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Cadastro e gerenciamento de perfis artísticos</li>
                <li>Sistema de busca e descoberta de profissionais da cultura</li>
                <li>Espaço para divulgação de portfólios e currículos</li>
                <li>Conexão entre artistas, coletivos e equipamentos culturais</li>
                <li>Estatísticas sobre representatividade cultural</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[#1e3a8a] mb-4">3. Elegibilidade</h2>
              <p className="mb-4">
                Para usar o Nós Cultural, você deve:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Ter pelo menos 18 anos de idade</li>
                <li>Fornecer informações verdadeiras e precisas</li>
                <li>Manter a confidencialidade de sua senha</li>
                <li>Ser responsável por todas as atividades em sua conta</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[#1e3a8a] mb-4">4. Cadastro e Conta</h2>
              <p className="mb-4">Ao criar uma conta, você concorda em:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Fornecer informações completas e precisas durante o cadastro</li>
                <li>Atualizar suas informações quando necessário</li>
                <li>Manter a segurança de sua senha e credenciais de acesso</li>
                <li>Notificar-nos imediatamente sobre qualquer uso não autorizado de sua conta</li>
                <li>Não compartilhar sua conta com terceiros</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[#1e3a8a] mb-4">5. Conduta do Usuário</h2>
              <p className="mb-4">Você concorda em NÃO:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Publicar conteúdo falso, enganoso ou fraudulento</li>
                <li>Violar direitos autorais ou propriedade intelectual de terceiros</li>
                <li>Usar a plataforma para fins ilegais ou não autorizados</li>
                <li>Assediar, intimidar ou discriminar outros usuários</li>
                <li>Tentar acessar contas de outros usuários sem autorização</li>
                <li>Enviar spam, malware ou conteúdo malicioso</li>
                <li>Coletar dados de outros usuários sem consentimento</li>
                <li>Fazer engenharia reversa ou tentar comprometer a segurança da plataforma</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[#1e3a8a] mb-4">6. Conteúdo do Usuário</h2>
              <p className="mb-4">Sobre o conteúdo que você publica na plataforma:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li><strong>Propriedade:</strong> Você mantém todos os direitos sobre o conteúdo que publica</li>
                <li><strong>Licença:</strong> Ao publicar, você nos concede uma licença não exclusiva para exibir, armazenar e distribuir seu conteúdo na plataforma</li>
                <li><strong>Responsabilidade:</strong> Você é responsável por garantir que possui os direitos necessários sobre todo conteúdo que publica</li>
                <li><strong>Moderação:</strong> Reservamos o direito de remover conteúdo que viole estes termos</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[#1e3a8a] mb-4">7. Propriedade Intelectual</h2>
              <p className="mb-4">
                Todo o conteúdo da plataforma Nós Cultural, incluindo design, código, logotipos e textos, 
                é protegido por direitos autorais e outras leis de propriedade intelectual. Você não pode:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Copiar, modificar ou distribuir nosso código ou design</li>
                <li>Usar nosso nome ou marca sem autorização</li>
                <li>Criar trabalhos derivados de nossa plataforma</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[#1e3a8a] mb-4">8. Limitação de Responsabilidade</h2>
              <p className="mb-4">
                O Nós Cultural é fornecido &quot;como está&quot; e &quot;conforme disponível&quot;. Não garantimos que:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>A plataforma estará sempre disponível ou livre de erros</li>
                <li>As informações fornecidas pelos usuários sejam precisas ou confiáveis</li>
                <li>O uso da plataforma atenderá às suas expectativas específicas</li>
              </ul>
              <p className="mb-4">
                Não somos responsáveis por:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Danos diretos ou indiretos resultantes do uso da plataforma</li>
                <li>Interações entre usuários fora da plataforma</li>
                <li>Perda de dados ou interrupção de serviço</li>
                <li>Conteúdo de terceiros ou links externos</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[#1e3a8a] mb-4">9. Modificações e Suspensão</h2>
              <p className="mb-4">Reservamos o direito de:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Modificar, suspender ou descontinuar qualquer parte da plataforma a qualquer momento</li>
                <li>Suspender ou encerrar contas que violem estes termos</li>
                <li>Atualizar estes Termos de Uso periodicamente</li>
                <li>Modificar recursos ou funcionalidades da plataforma</li>
              </ul>
              <p className="mb-4">
                Notificaremos você sobre mudanças significativas por e-mail ou através de avisos na plataforma.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[#1e3a8a] mb-4">10. Rescisão</h2>
              <p className="mb-4">
                Você pode encerrar sua conta a qualquer momento através das configurações da plataforma. 
                Podemos encerrar ou suspender seu acesso imediatamente, sem aviso prévio, se você:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Violar estes Termos de Uso</li>
                <li>Fornecer informações falsas ou enganosas</li>
                <li>Envolver-se em atividades fraudulentas ou ilegais</li>
                <li>Prejudicar outros usuários ou a plataforma</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[#1e3a8a] mb-4">11. Lei Aplicável</h2>
              <p className="mb-4">
                Estes Termos de Uso são regidos pelas leis brasileiras. Qualquer disputa será resolvida 
                nos tribunais competentes do Brasil.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[#1e3a8a] mb-4">12. Disposições Gerais</h2>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li><strong>Integralidade:</strong> Estes termos constituem o acordo completo entre você e o Nós Cultural</li>
                <li><strong>Divisibilidade:</strong> Se alguma cláusula for considerada inválida, as demais continuam em vigor</li>
                <li><strong>Renúncia:</strong> A falha em fazer cumprir qualquer direito não constitui renúncia a esse direito</li>
                <li><strong>Cessão:</strong> Você não pode transferir seus direitos ou obrigações sob estes termos</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[#1e3a8a] mb-4">13. Contato</h2>
              <p className="mb-4">
                Para dúvidas, sugestões ou reportar violações destes termos, entre em contato:
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded p-4">
                <p className="mb-2"><strong>E-mail:</strong> nosculturaloficial@gmail.com</p>
                <p className="mb-2"><strong>Suporte:</strong> nosculturaloficial@gmail.com</p>
                <p><strong>Equipe:</strong> Nós Cultural</p>
              </div>
            </section>

            <section className="mt-8 p-4 bg-gray-100 rounded">
              <p className="text-sm text-gray-600">
                Ao usar a plataforma Nós Cultural, você reconhece que leu, entendeu e concorda em estar 
                vinculado a estes Termos de Uso e à nossa Política de Privacidade.
              </p>
            </section>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}