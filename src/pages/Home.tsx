import { useEffect, useState } from "react";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { Hero } from "../components/home/Hero";
import { GallerySection } from "../components/home/GallerySection";
import { useObras } from "../hooks/useObras";
import api from "../services/api";
import type { Obra } from "../types/obra";

export function Home() {
  const [artistas, setArtistas] = useState<any[]>([]);
  const { obras, carregando: carregandoObras, erro } = useObras();

  // Busca todos os artistas ativos no banco de dados
  useEffect(() => {
    api.get("/artistas")
      .then(res => setArtistas(res.data))
      .catch(console.error);
  }, []);

  const listaObrasBruta: Obra[] = obras?.content && Array.isArray(obras.content)
    ? obras.content
    : (Array.isArray(obras) ? obras : []);

  // Junta a lista de artistas com a capa (última imagem enviada por eles)
  const montarCardsDeArtistas = (): Obra[] => {
    return artistas.map(artista => {
      // Como a API já traz as obras da mais recente para a mais antiga, o primeiro 'find' acha a última!
      const ultimaObra = listaObrasBruta.find(o => o.autorId === artista.id && o.tipo === "IMAGEM");

      const parteNome = artista.login.split('@')[0];
      const nomeFormatado = parteNome.split(/[._-]/).map((p: string) => p.charAt(0).toUpperCase() + p.slice(1)).join(' ');

      // Montamos um objeto "Fake Obra" para que a GallerySection consiga renderizar sem precisar alterar o código dela
      return {
        id: artista.id,
        titulo: nomeFormatado,
        tipo: "PORTFÓLIO" as any, // Label que vai aparecer em cima do nome
        urlEmbed: ultimaObra?.urlEmbed || ultimaObra?.urlMidia || artista.fotoPerfil || "https://via.placeholder.com/600x800?text=Sem+Obras",
        autorId: artista.id,
        autorLogin: artista.login,
      } as Obra;
    });
  };

  const artistasCards = montarCardsDeArtistas();
  const carregandoGeral = carregandoObras || (artistas.length === 0 && !erro);

  return (
    <>
      <Navbar />
      <main>
        <Hero totalObras={artistas.length} carregando={carregandoGeral} erro={erro} />
        <GallerySection obras={artistasCards} carregando={carregandoGeral} erro={erro} />
      </main>
      <Footer />
    </>
  );
}