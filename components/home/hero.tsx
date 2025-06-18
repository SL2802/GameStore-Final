import HomeButtons from "./home-buttons";
import Image from "next/image";
import HomeLogin from "./home-login";

export function HeroSection() {
  return (
    <>
      <header className="flex justify-between pt-4 px-4 mx-auto max-w-screen-xl md:flex md:space-x-6">
        <Image
          src="/game-logo.jpg"
          width={50}
          height={50}
          alt="logo"
          className="rounded-md"
        />
        <HomeLogin />
      </header>
      <section className="mt-24 mx-auto max-w-screen-xl pb-4 px-8">
        <div className="text-center space-y-4">
          <h1 className="font-bold text-4xl md:text-5xl text-center">
            Bem-vindo à <span className="text-primary">Gamestore</span>
          </h1>
          <p className="text-gray-500 max-w-xl mx-auto mt-4 text-lg leading-relaxed text-center">
            A loja perfeita para gamers!
            <br />
            Aqui você encontra os melhores jogos, periféricos e acessórios para
            elevar sua experiência ao próximo nível.
          </p>
        </div>
        <HomeButtons />
      </section>
    </>
  );
}
