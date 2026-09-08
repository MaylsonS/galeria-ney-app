import { Link } from "react-router-dom";
import type { Obra } from "../../types/obra";

interface VideosSectionProps {
  videos: Obra[];
}

export function VideosSection({ videos }: VideosSectionProps) {
  // PROTEÇÃO: Garante que é um array
  const listaVideos = Array.isArray(videos) ? videos : [];

  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-10 py-24">
      <div className="flex justify-between items-end mb-12">
        <h2 className="text-3xl sm:text-4xl font-serif font-black uppercase text-gray-800 tracking-tighter">
          Videos
        </h2>
        <Link
          to="/galeria?tipo=VIDEO_YOUTUBE"
          className="text-xs font-bold uppercase tracking-widest text-ink hover:opacity-70"
        >
          View Gallery →
        </Link>
      </div>

      {/* CONDICIONAL: Renderiza o Empty State ou o Grid de vídeos */}
      {listaVideos.length === 0 ? (
        <div className="h-64 w-full rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 flex items-center justify-center">
          <p className="font-bold text-gray-400 uppercase tracking-widest text-sm">
            Nenhum vídeo cadastrado
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {listaVideos.slice(0, 2).map((video) => (
            <div
              key={video.id}
              className="aspect-video rounded-xl overflow-hidden bg-black relative shadow-md"
            >
              <iframe
                src={video.urlEmbed}
                title={video.titulo}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}