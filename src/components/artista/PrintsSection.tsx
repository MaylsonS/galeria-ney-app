import { Link } from "react-router-dom";
import type { Obra } from "../../types/obra";

interface PrintsSectionProps {
  obras: Obra[];
  artistaId: string;
}

export function PrintsSection({ obras, artistaId }: PrintsSectionProps) {
  return (
    <section className="max-w-7xl mx-auto px-8 py-16">
      <div className="flex justify-between items-end mb-8">
        <h2 className="text-4xl font-serif font-black uppercase text-gray-800 tracking-tighter">
          Todas as Prints
        </h2>
        <Link
          to={`/galeria?tipo=IMAGEM&artista=${artistaId}`}
          className="text-xs font-bold uppercase tracking-widest hover:opacity-70"
        >
          View Gallery →
        </Link>
      </div>

      {/* Grid ou Carrossel de Obras */}
      {obras.length === 0 ? (
        <div className="w-full bg-gray-50 h-96 rounded-xl flex items-center justify-center border border-gray-100">
          <span className="text-gray-400 font-bold">Nenhuma print cadastrada.</span>
        </div>
      ) : (
        <div className="flex gap-6 overflow-x-auto pb-4 snap-x">
          {obras.map((obra) => (
            <div key={obra.id} className="min-w-[300px] snap-center">
              <img
                src={obra.urlEmbed}
                alt={obra.titulo}
                className="h-96 w-full object-cover rounded-xl border border-gray-100"
              />
              <p className="mt-4 font-bold text-lg text-center">{obra.titulo}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}