import api from "./api";
import type { LoginResponse } from "../types/auth";

export async function login(
  loginUsuario: string,
  senha: string,
): Promise<LoginResponse> {
  const { data } = await api.post<LoginResponse>("/auth/login", {
    login: loginUsuario,
    senha,
  });
  return data;
}

// NOVO: Função para cadastrar o usuário enviando FormData
export async function cadastrarUsuario(formData: FormData): Promise<void> {
  // Apenas chamamos a rota, o token será injetado automaticamente pelo interceptor de requisição.
  // Se o token for apagado no DevTools, a API devolve 403 e o interceptor de resposta acima assume o controle.
  await api.post("/auth/register", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}