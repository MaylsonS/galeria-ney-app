import { Link } from "react-router-dom";
import type { Obra } from "../../types/obra";

interface FaixasDisponiveisProps {
  faixas: Obra[];
}

export function FaixasDisponiveis({ faixas }: FaixasDisponiveisProps) {
  const temFaixas = faixas && faixas.length > 0;

  return (
    <section className="relative w-full border-t border-[rgba(218,162,101,0.05)] bg-[#DD8866] py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">

        {/* Cabeçalho */}
        <div className="relative mb-16 flex flex-col md:flex-row items-start justify-between gap-6 z-20">
          <h2 className="font-['Angkor'] text-[50px] md:text-[74px] font-normal uppercase leading-[1.1] tracking-[1px] text-[#D4E8D4] opacity-90 md:w-1/2">
            Faixas<br/>Disponíveis
          </h2>
          <Link to="/galeria?tipo=AUDIO_SPOTIFY" className="mt-4 md:mt-0 flex items-center gap-3 font-['Manrope'] text-[20px] font-black uppercase leading-[28px] tracking-[2px] text-[#1C1B1B] hover:text-white transition-colors">
            View Gallery
            <span className="flex h-5 w-5 items-center justify-center bg-[#1C1B1B] text-white">→</span>
          </Link>
        </div>

        {/* Renderização Condicional: Mostra os Players OU a mensagem de vazio */}
        {temFaixas ? (
          <div className="relative z-20 grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Player Principal em Destaque Vermelho */}
            {faixas[0] && (
              <div className="flex h-[350px] items-center justify-center overflow-hidden rounded-[24px] bg-[#B91C1C] p-8 shadow-2xl">
                 <iframe
                    src={faixas[0].urlEmbed}
                    className="h-[152px] w-full rounded-xl border-none"
                    allow="encrypted-media; autoplay; clipboard-write; fullscreen"
                    loading="lazy"
                  />
              </div>
            )}

            {/* Players Secundários Escuros */}
            <div className="flex flex-col justify-center gap-6">
              {faixas[1] && (
                <iframe src={faixas[1].urlEmbed} className="h-[152px] w-full rounded-[16px] bg-[#282828] shadow-lg border-none" allow="encrypted-media; autoplay; clipboard-write; fullscreen" loading="lazy" />
              )}
              {faixas[2] && (
                <iframe src={faixas[2].urlEmbed} className="h-[152px] w-full rounded-[16px] bg-[#282828] shadow-lg border-none" allow="encrypted-media; autoplay; clipboard-write; fullscreen" loading="lazy" />
              )}
            </div>
          </div>
        ) : (
          /* Empty State (Estado Vazio) */
          <div className="relative z-20 flex h-[250px] w-full items-center justify-center rounded-[24px] border-2 border-dashed border-[#D4E8D4]/30 bg-black/5 backdrop-blur-sm">
            <p className="font-['Manrope'] text-[18px] font-bold uppercase tracking-[2px] text-[#D4E8D4]/80 text-center px-4">
              Nenhuma música cadastrada para esse artista.
            </p>
          </div>
        )}

      </div>
    </section>
  );
}