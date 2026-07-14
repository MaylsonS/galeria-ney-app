import type { Obra } from "./obra";

export interface EstatisticaArtista {
  valor: string; // ex: "42+", "12k"
  label: string; // ex: "VIDEOS PROJETOS"
  cor?: string; // classe tailwind opcional para a cor do número
}

export interface FaixaMusical {
  id: string;
  titulo: string;
  artista: string;
  urlEmbedSpotify: string; // link de embed do Spotify (open.spotify.com/embed/...)
  duracao?: string; // "02:22"
  capaUrl?: string;
}

export interface VideoProjeto {
  id: string;
  titulo: string;
  categoria: string; // "MOTION GRAPHICS / 2026"
  thumbnailUrl: string;
  duracao?: string; // "00:15"
  urlEmbedYoutube?: string;
}

export interface Artista {
  id: string;
  nome: string; // "vterrajr"
  nomeExibicao: string; // "PROJETOS"
  tagline: string;
  descricao: string;
  avatarUrl: string;
  estatisticas: EstatisticaArtista[];
  obras: Obra[];
  faixas: FaixaMusical[];
  videos: VideoProjeto[];
}
