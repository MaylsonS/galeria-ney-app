import { createContext, useState, type ReactNode } from "react";
import type { AuthContextValue, Role } from "../types/auth";

export const AuthContext = createContext<AuthContextValue | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  // Inicializa lendo do localStorage, assim um F5 na página não desloga o usuário.
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem("token"),
  );
  const [role, setRole] = useState<Role | null>(
    () => localStorage.getItem("role") as Role | null,
  );

  function login(novoToken: string, novaRole: Role) {
    localStorage.setItem("token", novoToken);
    localStorage.setItem("role", novaRole);
    setToken(novoToken);
    setRole(novaRole);
  }

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setToken(null);
    setRole(null);
  }

  const value: AuthContextValue = {
    token,
    role,
    isAuthenticated: !!token,
    isAdmin: role === "ADMIN",
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
