import { useState } from "react";
import { Link } from "react-router-dom";
import type { Obra } from "../../types/obra";

interface PrintsCarouselProps {
  artistaNome: string;
  obras: Obra[];
}

export function PrintsCarousel({ artistaNome, obras }: PrintsCarouselProps) {
  const [indice, setIndice] = useState(0);

  // PROTEÇÃO: Garante que é um array
  const listaObras = Array.isArray(obras) ? obras : [];

  const anterior = () =>
    setIndice((atual) => (atual - 1 + listaObras.length) % listaObras.length);
  const proximo = () => setIndice((atual) => (atual + 1) % listaObras.length);

  // Só tenta pegar a obra atual se existir alguma na lista
  const obraAtual = listaObras.length > 0 ? listaObras[indice] : null;

  return (
    <section className="border-t border-black/5 px-6 py-20 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-3xl font-bold uppercase text-ink sm:text-4xl">
              Todas as Prints
            </h2>
            <p className="mt-2 font-body text-body">
              Seleção de trabalhos recentes através de disciplinas.
            </p>
          </div>
          <Link
            to="/galeria?tipo=IMAGEM"
            className="font-display text-sm font-black uppercase tracking-[1px] text-ink hover:opacity-70"
          >
            Ver Galeria →
          </Link>
        </div>

        {/* CONDICIONAL: Renderiza o Empty State ou o Carrossel */}
        {listaObras.length === 0 ? (
          <div className="mt-12 h-96 w-full rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 flex items-center justify-center">
            <p className="font-bold text-gray-400 uppercase tracking-widest text-sm">
              Nenhuma obra cadastrada
            </p>
          </div>
        ) : (
          <div className="relative mt-12 flex items-center justify-center">
            <button
              onClick={anterior}
              aria-label="Print anterior"
              className="absolute left-0 z-10 hidden h-10 w-10 items-center justify-center text-2xl text-ink/60 hover:text-ink sm:flex"
            >
              ←
            </button>

            <div className="w-full max-w-xl">
              <div className="aspect-[4/5] overflow-hidden rounded-2xl bg-[#F5F5F5]">
                {obraAtual?.tipo === "IMAGEM" ? (
                  <img
                    src={obraAtual.urlEmbed}
                    alt={obraAtual.titulo}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <iframe
                    src={obraAtual?.urlEmbed}
                    title={obraAtual?.titulo}
                    className="h-full w-full"
                    allow="encrypted-media; autoplay; fullscreen"
                  />
                )}
              </div>

              <div className="mt-4 flex flex-col items-center text-center">
                <span className="inline-flex items-center gap-3 rounded-xl border border-[rgba(97,194,73,0.3)] bg-[rgba(146,190,86,0.2)] px-3 py-2">
                  <span className="h-2 w-2 rounded-full bg-ochre" />
                  <span className="font-body text-xs font-black uppercase tracking-[2.4px] text-ochre">
                    {artistaNome}
                  </span>
                </span>
                <h3 className="mt-3 font-display text-2xl font-bold text-ink sm:text-3xl">
                  {obraAtual?.titulo}
                </h3>
              </div>
            </div>

            <button
              onClick={proximo}
              aria-label="Próxima print"
              className="absolute right-0 z-10 hidden h-10 w-10 items-center justify-center text-2xl text-ink/60 hover:text-ink sm:flex"
            >
              →
            </button>
          </div>
        )}
      </div>
    </section>
  );
}