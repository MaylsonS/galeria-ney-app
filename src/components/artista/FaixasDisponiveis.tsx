import type { FaixaMusical } from "../../types/artista";

export function FaixasDisponiveis({ faixas }: { faixas: FaixaMusical[] }) {
  if (faixas.length === 0) return null;

  return (
    <section className="bg-[#DD8866] px-6 py-16 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <h2 className="font-display text-5xl font-normal uppercase leading-tight text-[#D4E8D4] opacity-90 sm:text-6xl">
            Faixas
            <br />
            Disponíveis
          </h2>
          <a
            href="#"
            className="font-display text-sm font-black uppercase tracking-[1px] text-ink hover:opacity-70"
          >
            Ver Galeria →
          </a>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {faixas.map((faixa) => (
            <div key={faixa.id} className="overflow-hidden rounded-2xl">
              <iframe
                src={faixa.urlEmbedSpotify}
                title={faixa.titulo}
                className="h-[152px] w-full"
                allow="encrypted-media; autoplay; clipboard-write; fullscreen; picture-in-picture"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
