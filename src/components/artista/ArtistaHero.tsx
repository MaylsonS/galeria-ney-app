import { Link } from "react-router-dom";
import type { Artista } from "../../types/artista";
import { Badge } from "../ui/Badge";

export function ArtistaHero({ artista }: { artista: Artista }) {
  return (
    <section className="mx-auto max-w-7xl px-6 pb-16 pt-14 lg:px-10">
      <Link
        to="/"
        className="mb-12 inline-flex items-center text-xs font-bold uppercase tracking-wider text-gray-500 transition hover:text-black"
      >
        ← Voltar para Home
      </Link>

      <div className="grid gap-10 lg:grid-cols-[327px_1fr] items-center">
        <img
          src={artista?.avatarUrl || "https://i.pravatar.cc/500"}
          alt={artista?.nome}
          className="h-[327px] w-[327px] rounded-[100px] object-cover opacity-95 shadow-sm"
        />

        <div className="flex flex-col justify-center">
          {/* Badge movido para dentro da coluna de texto, removendo o mb-6 excessivo */}
          <div className="mb-4">
            <Badge>Digital Portfolio 2026</Badge>
          </div>

          <h1 className="font-display text-4xl font-black uppercase leading-tight text-body sm:text-5xl">
            {artista?.nome || "ARTISTA"}{" "}
            <span className="text-[#A67B5B]">{artista?.nomeExibicao || "PROJETOS"}</span>
          </h1>

          <p className="mt-4 max-w-xl font-body text-lg font-light tracking-wide text-gray-600">
            {artista?.tagline || "Nenhuma biografia disponível no momento."}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <button className="rounded-full bg-ink px-10 py-5 font-display text-base font-black text-white transition-opacity hover:opacity-90">
              Explore Work
            </button>
            <button className="rounded-full border-2 border-ink px-10 py-5 font-display text-base font-black text-ink transition-opacity hover:opacity-70">
              About Me
            </button>
          </div>

          <div className="mt-10 flex flex-wrap gap-10 border-t border-[#C3C8C1] pt-8">
            {(artista?.estatisticas || []).map((stat) => (
              <div key={stat.label}>
                <p
                  className="font-display text-3xl font-bold"
                  style={{ color: stat.cor ?? "#A67B5B" }}
                >
                  {stat.valor}
                </p>
                <p className="mt-1 font-mono text-xs font-bold uppercase tracking-[1.2px] text-[#434843]">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}