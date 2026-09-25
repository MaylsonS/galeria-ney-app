// src/components/artista/ArtistaHero.tsx
import type { Artista } from "../../types/artista";
import { Badge } from "../ui/Badge"; // Ajuste o path se necessário

export function ArtistaHero({ artista }: { artista: Artista }) {
  return (
    <section className="mx-auto max-w-7xl px-6 pb-16 pt-14 lg:px-10">
      <div className="grid gap-10 lg:grid-cols-[327px_1fr] items-center">
        <img
          src={artista?.avatarUrl || "https://i.pravatar.cc/500"}
          alt={artista?.nome}
          className="h-[327px] w-[327px] rounded-full object-cover shadow-sm"
        />

        <div className="flex flex-col justify-center">
          <div className="mb-4">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#ECF2E8] px-4 py-1 text-xs font-bold uppercase tracking-widest text-[#5C7351]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#5C7351]"></span>
              Digital Portfolio 2026
            </span>
          </div>

          <h1 className="font-serif text-5xl font-black uppercase leading-tight text-gray-800">
            {artista?.nome || "ARTISTA"}{" "}
            <span className="text-[#A67B5B]">{artista?.nomeExibicao || "PROJETOS"}</span>
          </h1>

          <p className="mt-4 max-w-2xl text-lg font-light tracking-wide text-gray-600">
            {artista?.tagline}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button className="rounded-full bg-black px-8 py-3 text-sm font-bold text-white transition-opacity hover:opacity-90">
              Explore Work
            </button>
            <button className="rounded-full border-2 border-black px-8 py-3 text-sm font-bold text-black transition-opacity hover:opacity-70">
              About Me
            </button>
          </div>

          <div className="mt-12 flex flex-wrap gap-12 border-t border-gray-200 pt-8">
            {(artista?.estatisticas || []).map((stat) => (
              <div key={stat.label}>
                <p className="font-serif text-3xl font-black" style={{ color: stat.cor }}>
                  {stat.valor}
                </p>
                <p className="mt-1 text-[9px] font-bold uppercase tracking-widest text-gray-800">
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