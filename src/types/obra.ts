export type TipoObra = "IMAGEM" | "VIDEO_YOUTUBE" | "AUDIO_SPOTIFY";

export interface Obra {
  id: string;
  titulo: string;
  descricao: string;
  tipo: string;
  urlMidia: string;
  urlEmbed: string;
  midias?: string[]; // <-- ADICIONE ESTA LINHA
  dataPostagem: string;
  autorId: string;
  autorLogin: string;
}

export interface CriarObraDados {
  titulo: string;
  tipo: TipoObra;
  urlEmbed: string;
}
