import { Link } from "react-router-dom";
import type { Obra } from "../../types/obra";

interface VideosSectionProps {
  videos: Obra[];
}

export function VideosSection({ videos }: VideosSectionProps) {
  // Oculta a sessão se a API não retornar vídeos
  if (!videos || videos.length === 0) return null;

  return (
    <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10 bg-white">
      <div className="mb-12 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 border-b border-gray-200 pb-6">
        <h2 className="font-['Archivo_Black'] text-[42px] font-normal uppercase leading-none tracking-[1px] text-[#1A1C1C]">
          Videos
        </h2>
        <Link to="/galeria?tipo=VIDEO_YOUTUBE" className="font-['Manrope'] text-[20px] font-black uppercase tracking-[2px] text-[#1C1B1B] hover:opacity-70 flex items-center gap-3">
          <div className="h-5 w-5 bg-[#80552C]"></div>
          View Gallery
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        {/* Renderiza apenas os 2 últimos vídeos enviados */}
        {videos.slice(0, 2).map((video) => (
          <div key={video.id} className="group flex flex-col gap-4">

            <div className="relative overflow-hidden rounded-[24px] bg-[#F3F3F3] p-4 shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1)]">
              <div className="relative z-10 aspect-video w-full overflow-hidden rounded-2xl bg-black">
                <iframe
                  src={video.urlEmbed}
                  title={video.titulo}
                  className="h-full w-full border-none opacity-90 transition-opacity group-hover:opacity-100"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>

            <div className="flex items-start justify-between px-2 pt-2">
              <div>
                <h3 className="font-['Anton'] text-[30px] font-normal uppercase leading-[36px] text-[#1A1C1C]">
                  {video.titulo}
                </h3>
                <p className="mt-1 font-['JetBrains_Mono'] text-[14px] font-normal tracking-[1.4px] text-[#5F5E5E]">
                  MOTION GRAPHICS / 2026
                </p>
              </div>
              <button className="flex h-[36px] w-[34px] items-center justify-center rounded bg-gray-200 text-[#434843] hover:text-black">
                 <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/></svg>
              </button>
            </div>

          </div>
        ))}
      </div>
    </section>
  );
}