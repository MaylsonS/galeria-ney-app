import type { VideoProjeto } from "../../types/artista";

function CardVideo({ video }: { video: VideoProjeto }) {
  return (
    <div className="w-full flex-shrink-0 sm:w-[45%] lg:w-[32%]">
      <div className="relative aspect-video overflow-hidden rounded-xl bg-[#F3F3F3] shadow-lg">
        <img
          src={video.thumbnailUrl}
          alt={video.titulo}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/10">
          <div className="flex h-20 w-20 items-center justify-center rounded-xl border-2 border-white bg-black/40 backdrop-blur-md">
            <div className="ml-1 h-0 w-0 border-y-[14px] border-l-[22px] border-y-transparent border-l-white" />
          </div>
        </div>
        {video.duracao && (
          <span className="absolute right-6 top-5 rounded bg-black/70 px-3 py-1 font-mono text-sm tracking-[1.4px] text-white backdrop-blur-sm">
            {video.duracao}
          </span>
        )}
      </div>

      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <h3 className="font-display text-2xl font-bold uppercase text-ink">
            {video.titulo}
          </h3>
          <p className="mt-1 font-mono text-xs tracking-[1.4px] text-[#5F5E5E]">
            {video.categoria}
          </p>
        </div>
        <button
          aria-label="Compartilhar vídeo"
          className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-[#434843] hover:bg-black/5"
        >
          ↗
        </button>
      </div>
    </div>
  );
}

export function VideosSection({ videos }: { videos: VideoProjeto[] }) {
  if (videos.length === 0) return null;

  return (
    <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="font-display text-4xl font-black uppercase text-ink">
          Videos
        </h2>
        <a
          href="#"
          className="flex items-center gap-2 font-display text-sm font-black uppercase tracking-[1px] text-ochre hover:opacity-70"
        >
          🎬 Ver Galeria →
        </a>
      </div>

      <div className="mt-10 flex gap-8 overflow-x-auto pb-4">
        {videos.map((video) => (
          <CardVideo key={video.id} video={video} />
        ))}
      </div>
    </section>
  );
}
