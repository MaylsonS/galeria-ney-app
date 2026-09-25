// src/components/artista/VideosSection.tsx
import { Link } from "react-router-dom";
import type { Obra } from "../../types/obra";

interface VideosSectionProps {
  videos: Obra[];
}

export function VideosSection({ videos }: VideosSectionProps) {
  const listaVideos = Array.isArray(videos) ? videos : [];
  if (listaVideos.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-10 py-24 bg-[#FAFAFA]">
      <div className="flex justify-between items-end mb-12 border-b border-gray-200 pb-6">
        <h2 className="text-5xl font-serif font-black uppercase text-gray-900 tracking-tighter">
          Videos
        </h2>
        <Link
          to="/galeria?tipo=VIDEO_YOUTUBE"
          className="text-xs font-bold uppercase tracking-widest text-black hover:opacity-70 flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
          View Gallery <span>→</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {listaVideos.slice(0, 2).map((video) => (
          <div key={video.id} className="flex flex-col gap-4 group">
            <div className="aspect-video rounded-3xl overflow-hidden bg-black relative shadow-lg">
              <iframe
                src={video.urlEmbed}
                title={video.titulo}
                className="w-full h-full opacity-90 group-hover:opacity-100 transition-opacity"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="flex justify-between items-start pt-2 px-2">
              <div>
                <h3 className="font-serif text-2xl font-black uppercase tracking-tight text-gray-900">{video.titulo}</h3>
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1">
                  Motion Graphics / 2026
                </p>
              </div>
              <button className="text-gray-400 hover:text-black">
                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path></svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}