import { useState } from "react";
import { Link } from "react-router-dom";
import type { Obra } from "../../types/obra";

interface PrintsCarouselProps {
  artistaNome: string;
  obras: Obra[];
}

export function PrintsCarousel({ artistaNome, obras }: PrintsCarouselProps) {
  const [indice, setIndice] = useState(0);

  // MOCK: Se não tiver obras cadastradas, injetamos 3 imagens placeholder para o carrossel funcionar e mostrar o layout
  const listaObras = obras.length >= 3 ? obras : [
    { id: "m1", titulo: "Glitch Beats & Urban Echoes", urlEmbed: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop" },
    { id: "m2", titulo: "Digital Decay (2024)", urlEmbed: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?q=80&w=1000&auto=format&fit=crop" },
    { id: "m3", titulo: "Neon Syntax", urlEmbed: "https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=1000&auto=format&fit=crop" }
  ] as Obra[];

  const anterior = () => setIndice((atual) => (atual - 1 + listaObras.length) % listaObras.length);
  const proximo = () => setIndice((atual) => (atual + 1) % listaObras.length);

  const obraAtual = listaObras[indice];
  const obraAnterior = listaObras[(indice - 1 + listaObras.length) % listaObras.length];
  const obraProxima = listaObras[(indice + 1) % listaObras.length];

  return (
    <section className="relative w-full overflow-hidden bg-white px-6 py-24 lg:px-10">
      <div className="mx-auto max-w-7xl">

        {/* Cabeçalho com espaçamento generoso (mb-24) */}
        <div className="mb-24 flex flex-col sm:flex-row sm:items-end justify-between gap-6 relative z-20">
          <div>
            <h2 className="font-['Spicy_Rice'] text-[40px] md:text-[60px] font-normal uppercase leading-[1.1] tracking-[2px] text-[#1C1B1B] opacity-70">
              Todas As Prints
            </h2>
            <p className="mt-2 font-['Manrope'] text-[20px] leading-[28px] text-[#4A4A49]">
              Selection of recent works across disciplines.
            </p>
          </div>
          <Link to="/galeria?tipo=IMAGEM" className="flex items-center gap-3 font-['Manrope'] text-[20px] font-black uppercase leading-[28px] tracking-[2px] text-[#1C1B1B] hover:opacity-70">
            View Gallery
            <span className="flex h-5 w-5 items-center justify-center bg-[#1C1B1B] text-white">→</span>
          </Link>
        </div>

        {/* Container do Carrossel com Efeito Vazado */}
        <div className="relative flex h-[600px] w-full items-center justify-center">

          {/* Imagem Esquerda (Anterior) */}
          <div className="absolute left-0 -translate-x-[50%] md:-translate-x-[30%] z-0 h-[400px] w-[500px] opacity-40 transition-all duration-500">
            <div className="h-full w-full rounded-[16px] bg-[#F5F5F5] p-4 shadow-inner">
               <img src={obraAnterior?.urlEmbed} className="h-full w-full object-cover rounded-xl" alt="Anterior" />
            </div>
          </div>

          {/* Seta Esquerda */}
          <button onClick={anterior} className="absolute left-[10px] md:left-[50px] z-30 flex h-[60px] w-[60px] md:h-[80px] md:w-[80px] items-center justify-center rounded-[12px] border-2 border-white bg-black/40 text-white shadow-xl backdrop-blur-md transition hover:bg-black/80">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/></svg>
          </button>

          {/* Imagem Central (Ativa) */}
          <div className="z-20 flex w-full max-w-[659px] flex-col items-center transition-all duration-500">
             <div className="h-[400px] md:h-[495px] w-full rounded-[28px] bg-white shadow-2xl overflow-hidden border border-gray-100">
               <img src={obraAtual?.urlEmbed} alt={obraAtual?.titulo} className="h-full w-full object-cover" />
             </div>

             <div className="mt-8 flex flex-col items-center text-center bg-white/80 backdrop-blur-sm px-8 py-4 rounded-2xl">
               <span className="inline-flex items-center gap-2 rounded-[12px] border border-[rgba(97,194,73,0.3)] bg-[rgba(146,190,86,0.2)] px-4 py-2 font-['Manrope'] text-[15px] md:text-[19px] font-black uppercase tracking-[2.4px] text-[#7B5800]">
                 <span className="h-2 w-2 rounded-full bg-[#7B5800]"></span>
                 {artistaNome}
               </span>
               <h3 className="mt-4 font-['Space_Grotesk'] text-[24px] md:text-[30px] font-bold leading-[36px] text-[#1C1B1B]">
                 {obraAtual?.titulo}
               </h3>
             </div>
          </div>

          {/* Seta Direita */}
          <button onClick={proximo} className="absolute right-[10px] md:right-[50px] z-30 flex h-[60px] w-[60px] md:h-[80px] md:w-[80px] items-center justify-center rounded-[12px] border-2 border-white bg-black/40 text-white shadow-xl backdrop-blur-md transition hover:bg-black/80">
             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
          </button>

          {/* Imagem Direita (Próxima) */}
          <div className="absolute right-0 translate-x-[50%] md:translate-x-[30%] z-0 h-[400px] w-[500px] opacity-40 transition-all duration-500">
             <div className="h-full w-full rounded-[16px] bg-[#F5F5F5] p-4 shadow-inner">
               <img src={obraProxima?.urlEmbed} className="h-full w-full object-cover rounded-xl" alt="Próxima" />
             </div>
          </div>

        </div>
      </div>
    </section>
  );
}