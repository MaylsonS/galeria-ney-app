import api from "./api";
import type { Artista } from "../types/artista";

export async function buscarArtista(id: string): Promise<Artista> {
  const { data: usuario } = await api.get(`/artistas/${id}`);
  const { data: obrasPage } = await api.get(`/obras/autor/${id}?size=100`);

  const obras = obrasPage.content || obrasPage || [];

  const parteNome = usuario.login.split('@')[0];
  const nomeFormatado = parteNome.split(/[._-]/).map((p: string) => p.charAt(0).toUpperCase() + p.slice(1)).join(' ');

  const prints = obras.filter((o: any) => o.tipo === "IMAGEM");
  const faixas = obras.filter((o: any) => o.tipo === "AUDIO_SPOTIFY");
  const videos = obras.filter((o: any) => o.tipo === "VIDEO_YOUTUBE");

  return {
    id: usuario.id,
    nome: nomeFormatado,
    nomeExibicao: "PROJETOS",
    tagline: "DIGITAL PORTFOLIO 2026",
    descricao: usuario.descricao || "A biografia do artista aparecerá aqui na página pública.",
    avatarUrl: usuario.fotoPerfil || "https://via.placeholder.com/600x800?text=Sem+Foto",
    estatisticas: [
      { valor: String(videos.length), label: "VÍDEOS" },
      { valor: String(prints.length), label: "PRINTS" },
      { valor: String(faixas.length), label: "ÁUDIOS" }
    ],
    obras: obras, // Repassa todas as obras brutas para o seu ArtistaDetalhe filtrar
    faixas: [],
    videos: []
  };
}