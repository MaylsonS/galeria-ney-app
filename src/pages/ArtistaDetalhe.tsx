import { useParams } from "react-router-dom";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { useArtista } from "../hooks/useArtista";
import { ArtistaHero } from "../components/artista/ArtistaHero";
import { PrintsCarousel } from "../components/artista/PrintsCarousel";
import { FaixasDisponiveis } from "../components/artista/FaixasDisponiveis";
import { VideosSection } from "../components/artista/VideosSection";
import type { Obra } from "../types/obra";

export function ArtistaDetalhe() {
  const { id } = useParams<{ id: string }>();
  const { artista, carregando, erro } = useArtista(id);

  if (carregando) {
    return (
      <>
        <Navbar />
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 flex justify-center">
          <div className="h-[327px] w-[327px] animate-pulse rounded-full bg-[#F5F5F5]" />
        </div>
        <Footer />
      </>
    );
  }

  // Extrai as obras reais do banco de dados (se houver erro, assume lista vazia)
  const todasObras: Obra[] = artista?.obras || [];

  // Separação lógica para alimentar cada componente com seu tipo específico
  const prints = todasObras.filter((o) => o.tipo === "IMAGEM");
  const audios = todasObras.filter((o) => o.tipo === "AUDIO_SPOTIFY");
  const videos = todasObras.filter((o) => o.tipo === "VIDEO_YOUTUBE");

  return (
    <>
      <Navbar />
      <main>
        {erro && (
          <div className="bg-red-50 p-3 text-center text-red-600 font-bold text-sm">
            {erro}
          </div>
        )}

        {/* Passa o objeto artista (criado no useArtista) com as estatísticas dinâmicas */}
        {artista && <ArtistaHero artista={artista} />}

        {/* Obras filtradas repassadas aos componentes visuais */}
        <PrintsCarousel artistaNome={artista?.nome || "ARTISTA"} obras={prints} />

        <FaixasDisponiveis faixas={audios} />

        <VideosSection videos={videos} />
      </main>
      <Footer />
    </>
  );
}