// src/components/artista/PrintsCarousel.tsx
import { useState } from "react";
import { Link } from "react-router-dom";
import type { Obra } from "../../types/obra";

interface PrintsCarouselProps {
  artistaNome: string;
  obras: Obra[];
}

export function PrintsCarousel({ artistaNome, obras }: PrintsCarouselProps) {
  const [indice, setIndice] = useState(0);
  const listaObras = Array.isArray(obras) ? obras : [];

  const anterior = () => setIndice((atual) => (atual - 1 + listaObras.length) % listaObras.length);
  const proximo = () => setIndice((atual) => (atual + 1) % listaObras.length);

  if (listaObras.length === 0) return null;

  const obraAtual = listaObras[indice];
  const obraAnterior = listaObras[(indice - 1 + listaObras.length) % listaObras.length];
  const obraProxima = listaObras[(indice + 1) % listaObras.length];

  return (
    <section className="relative overflow-hidden bg-[#F5F5F5]/30 px-6 py-20 lg:px-10">
      <div className="mx-auto max-w-7xl">
        {/* Cabeçalho */}
        <div className="mb-12 flex items-end justify-between">
          <div>
            <h2 className="font-['Spicy_Rice'] text-[60px] font-normal uppercase leading-[60px] tracking-[2px] text-[#1C1B1B] opacity-70">
              Todas As Prints
            </h2>
            <p className="mt-2 font-['Manrope'] text-[20px] leading-[28px] text-[#4A4A49]">
              Selection of recent works across disciplines.
            </p>
          </div>
          <Link
            to="/galeria?tipo=IMAGEM"
            className="flex items-center gap-3 font-['Manrope'] text-[20px] font-black uppercase leading-[28px] tracking-[2px] text-[#1C1B1B] hover:opacity-70"
          >
            View Gallery
            <span className="flex h-5 w-5 items-center justify-center bg-[#1C1B1B] text-white">
              →
            </span>
          </Link>
        </div>

        {/* Área do Carrossel (Flexbox para imitar o overlap do Figma) */}
        <div className="relative flex h-[680px] w-full items-center justify-center">

          {/* Obra Anterior (Cortada à Esquerda) */}
          <div className="absolute -left-[320px] top-[40px] z-0 hidden w-[594px] md:block opacity-60">
            <div className="h-[421px] rounded-[16px] bg-[#F5F5F5] p-6 shadow-sm">
               <img src={obraAnterior?.urlEmbed} className="h-full w-full object-cover mix-blend-saturation" alt="Anterior" />
            </div>
          </div>

          {/* Botão Anterior */}
          <button onClick={anterior} className="absolute left-[20px] z-20 flex h-[80px] w-[80px] items-center justify-center rounded-[12px] border-2 border-white bg-black/40 text-white shadow-xl backdrop-blur-md transition hover:bg-black/60">
            <svg width="22" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/></svg>
          </button>

          {/* Obra Central (Ativa) */}
          <div className="z-10 flex w-full max-w-[659px] flex-col items-center">
             <div className="h-[495px] w-full rounded-[28px] bg-white shadow-lg overflow-hidden">
               <img src={obraAtual?.urlEmbed} alt={obraAtual?.titulo} className="h-full w-full object-cover" />
             </div>

             <div className="mt-8 flex flex-col items-center text-center">
               <span className="inline-flex items-center gap-2 rounded-[12px] border border-[rgba(97,194,73,0.3)] bg-[rgba(146,190,86,0.2)] px-4 py-2 font-['Manrope'] text-[19px] font-black uppercase tracking-[2.4px] text-[#7B5800]">
                 <span className="h-2 w-2 rounded-full bg-[#7B5800]"></span>
                 {artistaNome}
               </span>
               <h3 className="mt-4 font-['Space_Grotesk'] text-[30px] font-bold leading-[36px] text-[#1C1B1B]">
                 {obraAtual?.titulo}
               </h3>
             </div>
          </div>

          {/* Botão Próximo */}
          <button onClick={proximo} className="absolute right-[20px] z-20 flex h-[80px] w-[80px] items-center justify-center rounded-[12px] border-2 border-white bg-black/40 text-white shadow-xl backdrop-blur-md transition hover:bg-black/60">
             <svg width="22" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
          </button>

          {/* Obra Próxima (Cortada à Direita) */}
          <div className="absolute -right-[320px] top-[40px] z-0 hidden w-[594px] md:block opacity-60">
             <div className="h-[421px] rounded-[16px] bg-[#F5F5F5] p-6 shadow-sm">
               <img src={obraProxima?.urlEmbed} className="h-full w-full object-cover mix-blend-saturation" alt="Próxima" />
             </div>
          </div>

        </div>
      </div>
    </section>
  );
}