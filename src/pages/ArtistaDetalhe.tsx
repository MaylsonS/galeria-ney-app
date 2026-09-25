// src/pages/ArtistaDetalhe.tsx
import { useParams } from "react-router-dom";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { useArtista } from "../hooks/useArtista";
import { ArtistaHero } from "../components/artista/ArtistaHero";
import { PrintsCarousel } from "../components/artista/PrintsCarousel";
import { FaixasDisponiveis } from "../components/artista/FaixasDisponiveis";
import { VideosSection } from "../components/artista/VideosSection";
import type { Artista } from "../types/artista";
import type { Obra } from "../types/obra";

export function ArtistaDetalhe() {
  const { id } = useParams<{ id: string }>();
  const { artista, carregando, erro } = useArtista(id);

  const artistaVisualizacao: Artista = artista?.nome ? artista : {
    id: id || "1",
    nome: "VTERRAJR",
    nomeExibicao: "PROJETOS",
    avatarUrl: "https://i.pravatar.cc/500?img=11",
    tagline: "Exploration of urban neon aesthetics, cybernetic character design, and aggressive street-art textures. A fusion of motion, music, and digital illustration.",
    descricao: "",
    estatisticas: [
      { valor: "42+", label: "VIDEOS PROJETOS", cor: "#A67B5B" },
      { valor: "12k", label: "DESENHOS FOLLOWERS", cor: "#5C7351" },
      { valor: "12k", label: "SONS FOLLOWERS", cor: "#E28765" }
    ],
    obras: [], faixas: [], videos: []
  };

  const todasObras: Obra[] = artista?.obras || [];

  const prints = todasObras.filter(o => o.tipo === "IMAGEM");
  const audios = todasObras.filter(o => o.tipo === "AUDIO_SPOTIFY");
  const videos = todasObras.filter(o => o.tipo === "VIDEO_YOUTUBE");

  return (
    <>
      <Navbar />
      {carregando && (
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
          <div className="h-[327px] w-[327px] animate-pulse rounded-full bg-gray-100" />
        </div>
      )}

      {!carregando && (
        <main>
          {erro && (
            <div className="bg-red-50 p-3 text-center text-red-600 font-bold text-sm">
              🔌 API Offline: Exibindo layout de demonstração.
            </div>
          )}

          <ArtistaHero artista={artistaVisualizacao} />

          <PrintsCarousel
            artistaNome={artistaVisualizacao.nome}
            obras={prints}
          />

          <FaixasDisponiveis faixas={audios} />

          <VideosSection videos={videos} />
        </main>
      )}
      <Footer />
    </>
  );
}