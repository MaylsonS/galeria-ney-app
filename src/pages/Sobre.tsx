import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";

export function Sobre() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-3xl px-6 py-24">
        <h1 className="font-display text-4xl font-black uppercase text-ink">
          Sobre o Artista
        </h1>
        <p className="mt-6 font-body text-body">
          Conteúdo em construção — espaço reservado pra biografia, bastidores
          e contato.
        </p>
      </main>
      <Footer />
    </>
  );
}
