import { Link } from "react-router-dom";
import type { Obra, TipoObra } from "../../types/obra";

const LABEL_TIPO: Record<TipoObra, string> = {
  IMAGEM: "Imagem",
  VIDEO_YOUTUBE: "Vídeo",
  AUDIO_SPOTIFY: "Áudio",
};

function MidiaObra({ obra }: { obra: Obra }) {
  if (obra.tipo === "IMAGEM") {
    return <img src={obra.urlEmbed} alt={obra.titulo} className="h-full w-full object-cover" />;
  }
  return <iframe src={obra.urlEmbed} title={obra.titulo} className="h-full w-full" allow="encrypted-media; autoplay; fullscreen" />;
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
  obras?: Obra[];
  carregando: boolean;
  erro?: unknown;
}

export function GallerySection({ obras = [], carregando, erro }: GallerySectionProps) {
  const listaObras = Array.isArray(obras) ? obras : [];

  return (
    <section id="galeria" className="mx-auto max-w-7xl border-t border-black/5 px-6 py-20 lg:px-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="font-display text-3xl font-bold uppercase text-ink sm:text-4xl">
            The Underground
          </h2>
          <p className="mt-2 font-body text-body">
            Seleção dos trabalhos mais recentes.
          </p>
        </div>
        <Link to="/artista/1" className="font-display text-sm font-black uppercase tracking-[1px] text-ink hover:opacity-70">
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

        {!carregando && erro && (
          <div className="col-span-full flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-red-200 bg-red-50/50 py-16 text-center">
            <span className="text-4xl mb-4">🔌</span>
            <h3 className="font-display text-lg font-black uppercase tracking-widest text-red-600">
              Backend Desconectado
            </h3>
            <p className="mt-2 max-w-md font-body text-sm font-medium text-red-500">
              Ligue sua API Spring Boot para carregar e exibir os projetos da galeria.
            </p>
          </div>
        )}

        {!carregando && !erro && listaObras.length === 0 && (
          <p className="col-span-full font-body text-body">
            Em breve as primeiras obras vão aparecer aqui.
          </p>
        )}

        {!carregando && !erro &&
          listaObras.slice(0, 2).map((obra) => <CardObra key={obra.id} obra={obra} />)}
      </div>
    </section>
  );
}