import api from "./api";
import type { Obra, CriarObraDados } from "../types/obra";

export async function listarObras(termo?: string): Promise<Obra[]> {
  const { data } = await api.get<Obra[]>("/obras", {
    params: termo ? { termo } : {},
  });
  return data;
}

export async function criarObra(dados: CriarObraDados): Promise<Obra> {
  const { data } = await api.post<Obra>("/obras", dados);
  return data;
}

export async function criarObraImagem(formData: FormData): Promise<Obra> {
  const { data } = await api.post<Obra>("/obras/imagem", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
}

export async function atualizarObra(
  id: string,
  dados: Partial<CriarObraDados>,
): Promise<Obra> {
  const { data } = await api.put<Obra>(`/obras/${id}`, dados);
  return data;
}

export async function excluirObra(id: string): Promise<void> {
  await api.delete(`/obras/${id}`);
}
