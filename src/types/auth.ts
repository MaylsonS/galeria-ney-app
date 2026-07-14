export type Role = "ADMIN" | "USER";

export interface AuthContextValue {
  token: string | null;
  role: Role | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (novoToken: string, novaRole: Role) => void;
  logout: () => void;
}

export interface LoginResponse {
  token: string;
  role: Role;
}
