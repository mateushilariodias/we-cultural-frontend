import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative w-full bg-greenPrimary text-white py-40 lg:pt-52 lg:pb-40 px-4 lg:px-40">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-8">

        <div className="flex-1 text-center lg:text-left">
          <h1 className="text-4xl lg:text-5xl font-bold mb-12">
            Conectando <span className="text-yellow-500">Artistas</span> e a Cultura de Franca, SP
          </h1>
          <p className="text-lg mb-6">
            O <strong>Nós Cultural</strong> é a plataforma cultural gratuita onde artistas de Franca, SP —
            das artes visuais à música, do teatro à dança — cadastram seus perfis, mostram
            seus trabalhos e se conectam com o público.
          </p>
          <p className="text-lg mb-12">
            Completamente gratuito, promovemos a diversidade e a visibilidade da cena cultural
            de Franca — conectando artistas independentes, coletivos culturais e espaços como
            galerias de arte, teatros e estúdios. Conheça as estatísticas do cenário cultural
            francano no dashboard.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link
              href="/cadastro-de-artista"
              className="bg-yellow-500 text-black px-6 py-3 rounded font-semibold hover:bg-yellow-600 transition"
            >
              Cadastrar-se como Artista
            </Link>
            <Link
              href="/busca"
              className="border border-white px-6 py-3 rounded font-semibold hover:bg-white hover:text-black transition"
            >
              Ver Cadastros
            </Link>
          </div>
        </div>

        <div className="flex-1 flex justify-center">
          <Image
            src="/franca-mapa-bandeira.jpg"
            alt="Mapa e bandeira de Franca, SP"
            width={300}
            height={300}
            priority
            className="w-full max-w-md"
          />
        </div>
      </div>
    </section>
  );
}
