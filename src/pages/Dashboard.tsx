import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export function Dashboard() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl font-black uppercase text-ink">
          Painel Administrativo
        </h1>
        <button
          onClick={handleLogout}
          className="rounded-md border-2 border-ink px-6 py-2 font-display font-bold text-ink"
        >
          Sair
        </button>
      </div>
      <p className="mt-4 font-body text-body">
        Em construção — o CRUD de obras (cadastrar, editar, excluir) entra na
        próxima fase.
      </p>
    </main>
  );
}
