import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { login as loginRequest } from "../services/authService";

export function Login() {
  const [loginValue, setLoginValue] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState<string | null>(null);
  const [enviando, setEnviando] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault(); // evita o reload de página padrão do <form>
    setErro(null);
    setEnviando(true);

    try {
      const { token, role } = await loginRequest(loginValue, senha);
      login(token, role); // guarda no AuthContext + localStorage
      navigate("/admin");
    } catch {
      setErro("Login ou senha incorretos.");
    } finally {
      setEnviando(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-2xl border border-black/10 p-8"
      >
        <h1 className="font-display text-2xl font-black uppercase text-ink">
          Login
        </h1>

        <label className="mt-6 block font-body text-sm font-bold text-ink">
          Usuário
          <input
            type="text"
            value={loginValue}
            onChange={(e) => setLoginValue(e.target.value)}
            required
            className="mt-2 w-full rounded-md border border-black/20 px-4 py-3 font-body outline-none focus:border-ink"
          />
        </label>

        <label className="mt-4 block font-body text-sm font-bold text-ink">
          Senha
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
            className="mt-2 w-full rounded-md border border-black/20 px-4 py-3 font-body outline-none focus:border-ink"
          />
        </label>

        {erro && <p className="mt-4 font-body text-sm text-red-600">{erro}</p>}

        <button
          type="submit"
          disabled={enviando}
          className="mt-6 w-full rounded-md bg-ink py-3 font-display font-black text-white disabled:opacity-50"
        >
          {enviando ? "Entrando..." : "Entrar"}
        </button>
      </form>
    </main>
  );
}
