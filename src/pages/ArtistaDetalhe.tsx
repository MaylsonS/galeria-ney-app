import { useParams, Link } from "react-router-dom";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { useArtista } from "../hooks/useArtista";
import { ArtistaHero } from "../components/artista/ArtistaHero";
import { PrintsCarousel } from "../components/artista/PrintsCarousel";
import { FaixasDisponiveis } from "../components/artista/FaixasDisponiveis";
import { VideosSection } from "../components/artista/VideosSection";

export function ArtistaDetalhe() {
  const { id } = useParams<{ id: string }>();
  const { artista, carregando, erro } = useArtista(id);

  return (
    <>
      <Navbar />

      {carregando && (
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
          <div className="h-[327px] w-[327px] animate-pulse rounded-[100px] bg-[#F5F5F5]" />
        </div>
      )}

      {!carregando && (erro || !artista) && (
        <div className="mx-auto max-w-7xl px-6 py-20 text-center lg:px-10">
          <p className="font-body text-body">
            Não foi possível encontrar esse artista.
          </p>
          <Link
            to="/"
            className="mt-4 inline-block font-display text-sm font-black uppercase tracking-[1px] text-ink hover:opacity-70"
          >
            ← Voltar para o início
          </Link>
        </div>
      )}

      {!carregando && artista && (
        <main>
          <ArtistaHero artista={artista} />
          <PrintsCarousel
            artistaNome={artista.nome}
            obras={artista.obras}
          />
          <FaixasDisponiveis faixas={artista.faixas} />
          <VideosSection videos={artista.videos} />
        </main>
      )}

      <Footer />
    </>
  );
}
