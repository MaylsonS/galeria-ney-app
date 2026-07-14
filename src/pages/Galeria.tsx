import { useSearchParams } from "react-router-dom";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { useObras } from "../hooks/useObras";
import type { TipoObra } from "../types/obra";

const LABEL_TIPO: Record<TipoObra, string> = {
  IMAGEM: "Imagem",
  VIDEO_YOUTUBE: "Vídeo",
  AUDIO_SPOTIFY: "Áudio",
};

export function Galeria() {
  const [searchParams] = useSearchParams();
  const tipoFiltro = searchParams.get("tipo") as TipoObra | null;

  const { obras, carregando } = useObras();

  const obrasFiltradas = tipoFiltro
    ? obras.filter((obra) => obra.tipo === tipoFiltro)
    : obras;

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <h1 className="font-display text-4xl font-black uppercase text-ink">
          Galeria
        </h1>

        <div className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {carregando &&
            [1, 2, 3].map((n) => (
              <div
                key={n}
                className="aspect-[4/5] animate-pulse rounded-2xl bg-[#F5F5F5]"
              />
            ))}

          {!carregando && obrasFiltradas.length === 0 && (
            <p className="col-span-full font-body text-body">
              Nenhuma obra encontrada por aqui ainda.
            </p>
          )}

          {!carregando &&
            obrasFiltradas.map((obra) => (
              <div key={obra.id}>
                <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-[#F5F5F5]">
                  {obra.tipo === "IMAGEM" ? (
                    <img
                      src={obra.urlEmbed}
                      alt={obra.titulo}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <iframe
                      src={obra.urlEmbed}
                      title={obra.titulo}
                      className="h-full w-full"
                      allow="encrypted-media; autoplay; fullscreen"
                    />
                  )}
                </div>
                <p className="mt-3 font-body text-xs font-black uppercase tracking-[2px] text-ochre">
                  {LABEL_TIPO[obra.tipo] ?? obra.tipo}
                </p>
                <h3 className="mt-1 font-display text-xl font-bold text-ink">
                  {obra.titulo}
                </h3>
              </div>
            ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
