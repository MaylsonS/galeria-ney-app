import { Link } from "react-router-dom";
import type { Obra, TipoObra } from "../../types/obra";

const LABEL_TIPO: Record<TipoObra, string> = {
  IMAGEM: "Imagem",
  VIDEO_YOUTUBE: "Vídeo",
  AUDIO_SPOTIFY: "Áudio",
};

function MidiaObra({ obra }: { obra: Obra }) {
  if (obra.tipo === "IMAGEM") {
    return (
      <img
        src={obra.urlEmbed}
        alt={obra.titulo}
        className="h-full w-full object-cover"
      />
    );
  }

  // Vídeo do YouTube ou faixa do Spotify: ambos usam o link de embed
  // já convertido pelo back-end (Fase 2 do nosso roadmap).
  return (
    <iframe
      src={obra.urlEmbed}
      title={obra.titulo}
      className="h-full w-full"
      allow="encrypted-media; autoplay; fullscreen"
    />
  );
}

function CardObra({ obra }: { obra: Obra }) {
  return (
    <div>
      <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-[#F5F5F5]">
        <MidiaObra obra={obra} />
      </div>
      <div className="mt-4">
        <span className="inline-flex items-center gap-3 rounded-xl border border-[rgba(97,194,73,0.3)] bg-[rgba(186,231,123,0.2)] px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-ochre" />
          <span className="font-display text-xs font-black uppercase tracking-[2.4px] text-ochre">
            {LABEL_TIPO[obra.tipo] ?? obra.tipo}
          </span>
        </span>
        <h3 className="mt-3 font-display text-2xl font-bold text-ink sm:text-3xl">
          {obra.titulo}
        </h3>
      </div>
    </div>
  );
}

interface GallerySectionProps {
  obras: Obra[];
  carregando: boolean;
}

export function GallerySection({ obras, carregando }: GallerySectionProps) {
  return (
    <section
      id="galeria"
      className="mx-auto max-w-7xl border-t border-black/5 px-6 py-20 lg:px-10"
    >
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="font-display text-3xl font-bold uppercase text-ink sm:text-4xl">
            The Underground
          </h2>
          <p className="mt-2 font-body text-body">
            Seleção dos trabalhos mais recentes.
          </p>
        </div>
        <Link
          to="/galeria"
          className="font-display text-sm font-black uppercase tracking-[1px] text-ink hover:opacity-70"
        >
          Ver Galeria →
        </Link>
      </div>

      <div className="mt-12 grid gap-10 sm:grid-cols-2">
        {carregando && (
          <>
            <div className="aspect-[4/5] animate-pulse rounded-2xl bg-[#F5F5F5]" />
            <div className="aspect-[4/5] animate-pulse rounded-2xl bg-[#F5F5F5]" />
          </>
        )}

        {!carregando && obras.length === 0 && (
          <p className="col-span-full font-body text-body">
            Em breve as primeiras obras vão aparecer aqui.
          </p>
        )}

        {!carregando &&
          obras.slice(0, 2).map((obra) => <CardObra key={obra.id} obra={obra} />)}
      </div>
    </section>
  );
}
