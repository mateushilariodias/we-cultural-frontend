import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative w-full bg-greenPrimary text-white py-40 lg:pt-52 lg:pb-40 px-4 lg:px-40">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-8">

        <div className="flex-1 text-center lg:text-left">
          <h1 className="text-4xl lg:text-5xl font-bold mb-12">
            Conectando <span className="text-yellow-500">Artistas</span> e Cultura
          </h1>
          <p className="text-lg mb-6">
            A plataforma <strong>Nós Cultural</strong> é o espaço onde artistas de todas as áreas
            podem se cadastrar, mostrar seus trabalhos e se conectar com o público.
          </p>
          <p className="text-lg mb-12">
            O sistema é totalmente gratuito e visa promover a diversidade cultural, permitindo que
            artistas possuam maior visibilidade. É possível ver também, por meio do dashboard
            disponível, as estatísticas referentes aos artistas cadastrados, a respeito do cenário
            cultural Francano.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <a
              href="/artistRegistration"
              className="bg-yellow-500 text-black px-6 py-3 rounded font-semibold hover:bg-yellow-600 transition"
            >
              Cadastrar-se como Artista
            </a>
            <a
              href="/search"
              className="border border-white px-6 py-3 rounded font-semibold hover:bg-white hover:text-black transition"
            >
              Ver Cadastros
            </a>
          </div>
        </div>

        <div className="flex-1 flex justify-center">
          <Image
            src="https://contadores.contaazul.com/hs-fs/hubfs/Imported_Blog_Media/franca-mapa-e-bandeira.jpg?width=300&name=franca-mapa-e-bandeira.jpg"
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
