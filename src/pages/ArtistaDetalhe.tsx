import { useParams } from "react-router-dom";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { useArtista } from "../hooks/useArtista";
import { ArtistaHero } from "../components/artista/ArtistaHero";
import { PrintsCarousel } from "../components/artista/PrintsCarousel";
import { FaixasDisponiveis } from "../components/artista/FaixasDisponiveis";
import { VideosSection } from "../components/artista/VideosSection";
import type { Artista } from "../types/artista";

export function ArtistaDetalhe() {
  const { id } = useParams<{ id: string }>();
  const { artista, carregando, erro } = useArtista(id);

  // MOCK: Se não tiver artista ou der erro (backend off), usamos esses dados para renderizar a tela
  const artistaVisualizacao: Artista = artista?.nome ? artista : {
    id: "1",
    nome: "VTERRAJR",
    nomeExibicao: "PROJETOS",
    avatarUrl: "https://i.pravatar.cc/500?img=11",
    tagline: "Exploration of urban neon aesthetics, cybernetic character design, and aggressive street-art textures.",
    estatisticas: [
      { valor: "42+", label: "Projetos", cor: "#A67B5B" },
      { valor: "12k", label: "Seguidores", cor: "#14b8a6" }
    ],
    obras: [], faixas: [], videos: []
  };

  return (
    <>
      <Navbar />

      {carregando && (
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
          <div className="h-[327px] w-[327px] animate-pulse rounded-[100px] bg-[#F5F5F5]" />
        </div>
      )}

      {!carregando && (
        <main>
          {/* Alerta visual avisando que está offline */}
          {erro && (
            <div className="bg-red-50 p-3 text-center text-red-600 font-bold text-sm">
              🔌 API Offline: Exibindo layout de demonstração.
            </div>
          )}

          <ArtistaHero artista={artistaVisualizacao} />

          <PrintsCarousel
            artistaNome={artistaVisualizacao.nome}
            obras={artistaVisualizacao.obras}
          />

          <FaixasDisponiveis faixas={artistaVisualizacao.faixas} />

          <VideosSection videos={artistaVisualizacao.videos} />
        </main>
      )}

      <Footer />
    </>
  );
}