import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

interface PrivateRouteProps {
  apenasAdmin?: boolean;
}

/**
 * Protege rotas que exigem login (e, opcionalmente, role ADMIN).
 * Usa <Outlet /> do react-router: ele renderiza a rota filha real
 * quando a condição passa, sem precisar repetir esse componente em cada página.
 */
export function PrivateRoute({ apenasAdmin = false }: PrivateRouteProps) {
  const { isAuthenticated, isAdmin } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (apenasAdmin && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
