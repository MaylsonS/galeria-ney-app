import { Link } from "react-router-dom";
import type { Obra } from "../../types/obra";

interface MusicSectionProps {
  obras: Obra[];
}

export function MusicSection({ obras }: MusicSectionProps) {
  // Se não houver músicas cadastradas na API, não renderiza o bloco salmão inteiro
  if (obras.length === 0) return null;

  return (
    <section className="bg-[#E28765] w-full py-20 mt-8">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex justify-between items-end mb-12">
          <h2 className="text-4xl font-serif font-black uppercase text-white tracking-tighter shadow-sm">
            Faixas Disponíveis
          </h2>
          <Link
            to="/galeria?tipo=AUDIO_SPOTIFY"
            className="text-xs font-bold uppercase tracking-widest text-white hover:opacity-80"
          >
            View Gallery →
          </Link>
        </div>

        {/* Players do Spotify Renderizados Dinamicamente */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {obras.slice(0, 4).map((obra) => (
            <iframe
              key={obra.id}
              src={obra.urlEmbed}
              title={obra.titulo}
              className="w-full h-[152px] rounded-xl shadow-lg"
              allow="encrypted-media; autoplay; fullscreen"
              loading="lazy"
            />
          ))}
        </div>
      </div>
    </section>
  );
}