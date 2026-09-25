// src/components/artista/FaixasDisponiveis.tsx
import { Link } from "react-router-dom";
import type { Obra } from "../../types/obra";

interface FaixasDisponiveisProps {
  faixas: Obra[];
}

export function FaixasDisponiveis({ faixas }: FaixasDisponiveisProps) {
  if (!faixas || faixas.length === 0) return null;

  return (
    <section className="relative w-full border-t border-[rgba(218,162,101,0.05)] bg-[#DD8866] py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">

        {/* Cabeçalho */}
        <div className="relative mb-16 flex items-start justify-between">
          <h2 className="z-10 font-['Angkor'] text-[74px] font-normal uppercase leading-[88px] tracking-[1px] text-[#D4E8D4] opacity-90 w-1/2">
            Faixas<br/>Disponíveis
          </h2>
          <Link
            to="/galeria?tipo=AUDIO_SPOTIFY"
            className="z-10 flex items-center gap-3 font-['Manrope'] text-[20px] font-black uppercase leading-[28px] tracking-[2px] text-[#1C1B1B] hover:text-white transition-colors"
          >
            View Gallery
            <span className="flex h-5 w-5 items-center justify-center bg-[#1C1B1B] text-white">
              →
            </span>
          </Link>
        </div>

        {/* Players do Spotify */}
        <div className="relative z-20 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Card Principal da Esquerda */}
          {faixas[0] && (
            <div className="flex h-[350px] items-center justify-center overflow-hidden rounded-[24px] bg-[#B91C1C] p-8 shadow-2xl">
               <iframe
                  src={faixas[0].urlEmbed}
                  className="h-[152px] w-full rounded-xl"
                  allow="encrypted-media; autoplay; clipboard-write; fullscreen"
                  loading="lazy"
                />
            </div>
          )}

          {/* Grid de Faixas Menores à Direita */}
          <div className="flex flex-col justify-center gap-6">
            {faixas.slice(1, 3).map((faixa) => (
              <iframe
                key={faixa.id}
                src={faixa.urlEmbed}
                title={faixa.titulo}
                className="h-[152px] w-full rounded-[16px] bg-[#282828] shadow-lg"
                allow="encrypted-media; autoplay; clipboard-write; fullscreen"
                loading="lazy"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}