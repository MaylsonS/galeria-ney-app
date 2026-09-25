import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { Hero } from "../components/home/Hero";
import { GallerySection } from "../components/home/GallerySection";
import { useObras } from "../hooks/useObras";
import type { Obra } from "../types/obra";

export function Home() {
  const { obras, carregando, erro } = useObras();

  const listaObrasBruta: Obra[] = obras?.content && Array.isArray(obras.content)
    ? obras.content
    : (Array.isArray(obras) ? obras : []);

  const extrairObrasUnicasPorArtista = (obrasLista: Obra[]) => {
    const obrasImagem = obrasLista.filter(obra => obra.tipo === "IMAGEM");
    const obrasPorArtista = new Map<string, Obra>();

    // Invertemos o array para garantir que as inserções mais recentes
    // sobrescrevam as antigas, resolvendo o empate de envios no mesmo dia.
    for (const obra of [...obrasImagem].reverse()) {
      obrasPorArtista.set(obra.autorId, obra);
    }

    // Como invertemos antes, revertemos no final para manter a ordem decrescente global
    return Array.from(obrasPorArtista.values()).reverse();
  };

  const obrasFiltradas = extrairObrasUnicasPorArtista(listaObrasBruta);

  return (
    <>
      <Navbar />
      <main>
        <Hero totalObras={listaObrasBruta.length} carregando={carregando} erro={erro} />
        <GallerySection obras={obrasFiltradas} carregando={carregando} erro={erro} />
      </main>
      <Footer />
    </>
  );
}