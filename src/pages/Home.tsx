import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { Hero } from "../components/home/Hero";
import { GallerySection } from "../components/home/GallerySection";
import { useObras } from "../hooks/useObras";

export function Home() {
  const { obras, carregando, erro } = useObras();

  const listaObrasSegura = Array.isArray(obras) ? obras : [];

  return (
    <>
      <Navbar />
      <main>
        <Hero totalObras={listaObrasSegura.length} carregando={carregando} erro={erro} />
        <GallerySection obras={listaObrasSegura} carregando={carregando} erro={erro} />
      </main>
      <Footer />
    </>
  );
}