import { Link, useParams } from "react-router-dom";
import type { Obra } from "../../types/obra";

interface PrintsCarouselProps {
  artistaNome: string;
  obras: Obra[];
}

export function PrintsCarousel({ artistaNome, obras }: PrintsCarouselProps) {
  const { id } = useParams<{ id: string }>();

  // Oculta a seção se o artista não possuir imagens cadastradas
  if (!obras || obras.length === 0) return null;

  return (
    <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="font-serif text-4xl font-black uppercase tracking-tight text-gray-800">
            Todas as Prints
          </h2>
          <p className="mt-2 text-sm font-light text-gray-500">
            Selection of recent works across disciplines.
          </p>
        </div>
        <Link
          to={`/artista/${id}/galeria?tipo=IMAGEM`}
          className="text-xs font-bold uppercase tracking-widest text-gray-800 hover:text-gray-500 transition-colors"
        >
          VIEW GALLERY ▤
        </Link>
      </div>

      {/* Container de rolagem horizontal mapeando os dados reais */}
      <div className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory">
        {obras.map((obra) => (
          <div key={obra.id} className="min-w-[280px] md:min-w-[400px] flex-none snap-center flex flex-col items-center">
            <div className="h-[300px] md:h-[400px] w-full overflow-hidden rounded-2xl shadow-lg">
              <img
                src={obra.urlEmbed}
                alt={obra.titulo}
                className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>

            <div className="mt-6 flex flex-col items-center text-center">
              <span className="inline-block rounded-md bg-[#ECF2E8] px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#5C7351]">
                • {artistaNome}
              </span>
              <h3 className="mt-3 font-serif text-xl font-bold text-gray-800">
                {obra.titulo}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}