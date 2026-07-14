import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { Hero } from "../components/home/Hero";
import { GallerySection } from "../components/home/GallerySection";
import { useObras } from "../hooks/useObras";

export function Home() {
  // Busca TODAS as obras uma única vez aqui. Tanto o contador de
  // estatísticas (Hero) quanto a prévia da galeria (GallerySection)
  // usam esse mesmo resultado — evita 2 chamadas idênticas à API.
  const { obras, carregando } = useObras();

  return (
    <>
      <Navbar />
      <main>
        <Hero totalObras={obras.length} carregando={carregando} />
        <GallerySection obras={obras} carregando={carregando} />
      </main>
      <Footer />
    </>
  );
}
