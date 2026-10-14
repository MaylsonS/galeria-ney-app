import { useState } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { useArtista } from "../hooks/useArtista";

export function ArtistaGaleria() {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Pega o tipo na URL (IMAGEM, AUDIO_SPOTIFY, VIDEO_YOUTUBE). Se não tiver, o padrão é IMAGEM.
  const tipo = searchParams.get("tipo") || "IMAGEM";
  const [busca, setBusca] = useState("");

  const { artista, carregando, erro } = useArtista(id);

  if (carregando) {
    return (
      <>
        <Navbar />
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="h-16 w-16 animate-spin rounded-full border-4 border-gray-300 border-t-black" />
        </div>
        <Footer />
      </>
    );
  }

  if (erro || !artista) {
    return (
      <>
        <Navbar />
        <div className="flex min-h-[60vh] items-center justify-center text-red-600 font-bold">
          Artista não encontrado.
        </div>
        <Footer />
      </>
    );
  }

  // Filtra as obras pelo tipo e pelo texto digitado na barra de pesquisa
  const obrasFiltradas = (artista.obras || []).filter((obra) => {
    const matchTipo = obra.tipo === tipo;
    const matchBusca = obra.titulo.toLowerCase().includes(busca.toLowerCase());
    return matchTipo && matchBusca;
  });

  const TITULOS: Record<string, string> = {
    IMAGEM: "Todas as Prints",
    AUDIO_SPOTIFY: "Todas as Faixas",
    VIDEO_YOUTUBE: "Todos os Vídeos"
  };

  const tituloDaPagina = TITULOS[tipo] || "Galeria";

  return (
    <>
      <Navbar />
      <main className="mx-auto min-h-screen max-w-7xl px-6 py-12 lg:px-10">

        {/* Cabeçalho, Botão Voltar e Busca */}
        <div className="relative mb-16 flex flex-col items-center justify-center text-center">

          <button
            onClick={() => navigate(-1)}
            className="absolute left-0 top-0 rounded-full bg-[#756A63] px-6 py-2 text-sm font-bold text-white shadow-md transition-colors hover:bg-[#5a514b]"
          >
            ← Voltar
          </button>

          <h1 className="mt-16 font-['Angkor'] text-5xl uppercase tracking-wide text-[#5C5C5C] md:mt-0 md:text-6xl">
            {tituloDaPagina}
          </h1>

          <p className="mt-3 text-sm font-light text-gray-500">
            Selection of recent works across disciplines.
          </p>

          <div className="relative mt-8 w-full max-w-md">
            <input
              type="text"
              placeholder="Pesquisar por título..."
              value={busca}
              onChange={e => setBusca(e.target.value)}
              className="w-full rounded-full border border-gray-300 py-3 pl-6 pr-12 outline-none transition-colors focus:border-gray-500"
            />
            <svg className="absolute right-5 top-3.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Feedback visual se a busca não retornar nada */}
        {obrasFiltradas.length === 0 && (
          <div className="flex h-40 items-center justify-center text-gray-400 font-medium">
            Nenhuma obra encontrada para "{busca}".
          </div>
        )}

        {/*
            RENDERIZAÇÃO INTELIGENTE DO LAYOUT
            Se for imagem: usa layout Masonry (columns). Se for mídia (iframe), usa Grid para não cortar o player.
        */}
        {tipo === "IMAGEM" ? (
          <div className="columns-1 gap-8 space-y-8 sm:columns-2 lg:columns-3">
            {obrasFiltradas.map(obra => (
              <div key={obra.id} className="break-inside-avoid flex flex-col items-center">
                <img
                  src={obra.urlEmbed}
                  alt={obra.titulo}
                  className="w-full rounded-3xl object-cover shadow-lg transition-transform duration-300 hover:scale-[1.02]"
                />
                <span className="mt-4 inline-block rounded-md bg-[#ECF2E8] px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#5C7351]">
                  • {artista.nome}
                </span>
                <h3 className="mt-2 text-center font-serif text-xl font-bold text-gray-800">
                  {obra.titulo}
                </h3>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {obrasFiltradas.map(obra => (
              <div key={obra.id} className="flex flex-col items-center">
                <div className="w-full h-[250px] overflow-hidden rounded-2xl shadow-lg bg-[#282828]">
                  <iframe
                    src={obra.urlEmbed}
                    className="h-full w-full border-none"
                    allow="encrypted-media; autoplay; clipboard-write; fullscreen"
                    loading="lazy"
                  />
                </div>
                <span className="mt-4 inline-block rounded-md bg-[#ECF2E8] px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#5C7351]">
                  • {artista.nome}
                </span>
                <h3 className="mt-2 text-center font-serif text-xl font-bold text-gray-800">
                  {obra.titulo}
                </h3>
              </div>
            ))}
          </div>
        )}

      </main>
      <Footer />
    </>
  );
}