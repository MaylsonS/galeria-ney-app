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
