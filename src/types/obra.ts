export type TipoObra = "IMAGEM" | "VIDEO_YOUTUBE" | "AUDIO_SPOTIFY";

export interface Obra {
  id: string;
  titulo: string;
  tipo: TipoObra;
  urlEmbed: string;
  artistaId?: string; // usado para linkar o card ao perfil do artista
  artistaNome?: string; // nome exibido no badge (ex: "Victor Terra")
  // adicione aqui outros campos que a API retorna (ex: descricao, criadoEm...)
}

export interface CriarObraDados {
  titulo: string;
  tipo: TipoObra;
  urlEmbed: string;
}
