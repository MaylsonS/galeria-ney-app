import { Link } from "react-router-dom";
import type { Obra } from "../../types/obra";

interface GallerySectionProps {
  obras: Obra[];
  carregando: boolean;
  erro: string | null;
}

export function GallerySection({ obras, carregando, erro }: GallerySectionProps) {
  // Helper para exibir o nome do artista limpo (caso venha apenas o email no login)
  const formatarNomeArtista = (login: string) => {
    if (!login) return "ARTISTA DESCONHECIDO";
    return login.split("@")[0].toUpperCase();
  };

  return (
    <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
      {/* Cabeçalho da Seção */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-6">
        <div>
          <h2 className="text-4xl font-black uppercase tracking-tight text-black mb-2">
            The Underground
          </h2>
          <p className="text-sm text-gray-500 font-medium">
            Selection of recent works across disciplines.
          </p>
        </div>
        <Link
          to="/galeria"
          className="text-xs font-bold uppercase tracking-widest text-black hover:text-[#5c6e61] transition-colors flex items-center gap-2"
        >
          View Gallery <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>

      {/* Tratamento de Estados */}
      {carregando && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[1, 2].map((n) => (
            <div key={n} className="aspect-[4/5] animate-pulse rounded-2xl bg-gray-100" />
          ))}
        </div>
      )}

      {!carregando && erro && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center text-sm font-bold text-red-600">
          Não foi possível carregar as obras no momento.
        </div>
      )}

      {/* Grid de Obras (Limite de 2 para manter a estética do design original, se desejar) */}
      {!carregando && !erro && obras.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {obras.slice(0, 2).map((obra) => (
            <article key={obra.id} className="flex flex-col gap-4 group cursor-pointer">
              {/* Imagem */}
              <div className="aspect-[4/5] overflow-hidden rounded-xl bg-black">
                <img
                  src={obra.urlEmbed}
                  alt={obra.titulo}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-95 group-hover:opacity-100"
                />
              </div>

              {/* Metadados: Badge do Artista e Título */}
              <div className="flex flex-col items-start gap-2">
                <span className="inline-flex items-center gap-2 rounded-md border border-[#D5E0D0] bg-[#ECF2E8] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#5C7351]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#5C7351]" aria-hidden="true"></span>
                  {formatarNomeArtista(obra.autorLogin)}
                </span>

                <h3 className="text-xl font-bold text-black tracking-tight leading-tight">
                  {obra.titulo}
                </h3>
              </div>
            </article>
          ))}
        </div>
      )}

      {!carregando && !erro && obras.length === 0 && (
        <p className="text-gray-500 font-medium">Nenhum artista publicou imagens recentemente.</p>
      )}
    </section>
  );
}