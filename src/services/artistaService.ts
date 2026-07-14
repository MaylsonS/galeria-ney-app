import api from "./api";
import type { Artista } from "../types/artista";

// Espera um endpoint no back-end: GET /artistas/{id}
// retornando o Artista com suas obras, faixas e vídeos já populados.
// Ajuste o caminho/shape aqui se o contrato da API for diferente.
export async function buscarArtista(id: string): Promise<Artista> {
  const { data } = await api.get<Artista>(`/artistas/${id}`);
  return data;
}
