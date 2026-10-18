import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import api from "../services/api";
import type { Obra } from "../types/obra";

export function ObraDetalhe() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [obra, setObra] = useState<Obra | null>(null);
  const [relacionadas, setRelacionadas] = useState<Obra[]>([]);
  const [carregando, setCarregando] = useState(true);

  const [activeIndex, setActiveIndex] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    async function carregarDados() {
      try {
        setCarregando(true);
        const { data: obraData } = await api.get(`/obras/${id}`);
        setObra(obraData);
        setActiveIndex(0);

        if (obraData?.autorId) {
          const { data: autorPage } = await api.get(`/obras/autor/${obraData.autorId}?size=10`);
          const obrasDoAutor = (autorPage.content || autorPage || []).filter((o: Obra) => o.id !== id);
          const duasDoAutor = obrasDoAutor.slice(0, 2);

          const { data: globalPage } = await api.get(`/obras?size=20`);
          const obrasGlobais = globalPage.content || globalPage || [];
          const obraOutroArtista = obrasGlobais.find((o: Obra) => o.autorId !== obraData.autorId);

          const recomendacoes: Obra[] = [];
          if (duasDoAutor.length > 0) recomendacoes.push(duasDoAutor[0]);
          if (obraOutroArtista) recomendacoes.push(obraOutroArtista);
          if (duasDoAutor.length > 1) recomendacoes.push(duasDoAutor[1]);

          setRelacionadas(recomendacoes);
        }
      } catch (error) {
        console.error("Erro ao carregar detalhes da obra:", error);
      } finally {
        setCarregando(false);
      }
    }

    window.scrollTo(0, 0);
    if (id) carregarDados();
  }, [id]);

  const arrayMidias = obra ? [obra.urlEmbed, ...(obra.midias || [])] : [];
  const midiaDestaque = arrayMidias[activeIndex] || (obra ? obra.urlEmbed : "");

  const proximoSlide = () => setActiveIndex((prev) => (prev === arrayMidias.length - 1 ? 0 : prev + 1));
  const slideAnterior = () => setActiveIndex((prev) => (prev === 0 ? arrayMidias.length - 1 : prev - 1));

  // Navegação por Teclado na Tela Cheia
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isFullScreen) return;
      if (e.key === "Escape") setIsFullScreen(false);
      if (e.key === "ArrowRight") proximoSlide();
      if (e.key === "ArrowLeft") slideAnterior();
    };

    window.addEventListener("keydown", handleKeyDown);

    // Bloqueia o scroll da página enquanto a tela cheia estiver aberta
    if (isFullScreen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isFullScreen, arrayMidias.length]);

  if (carregando) {
    return (
      <><Navbar /><div className="flex min-h-[70vh] items-center justify-center"><div className="h-16 w-16 animate-spin rounded-full border-4 border-gray-300 border-t-black" /></div><Footer /></>
    );
  }

  if (!obra) {
    return (
      <><Navbar /><div className="flex min-h-[70vh] flex-col items-center justify-center gap-4"><h2 className="font-serif text-2xl font-bold text-gray-800">Obra não encontrada.</h2><button onClick={() => navigate(-1)} className="text-sm font-bold uppercase tracking-widest underline">Voltar</button></div><Footer /></>
    );
  }

  const isVideo = midiaDestaque.includes("video") || midiaDestaque.endsWith(".mp4");

  return (
    <>
      <Navbar />

      {/* --- OVERLAY DE TELA CHEIA (LIGHTBOX) --- */}
      {isFullScreen && obra.tipo === "IMAGEM" && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm">

          <button
            onClick={() => setIsFullScreen(false)}
            className="absolute right-6 top-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:bg-white/20 hover:scale-110"
            title="Fechar (Esc)"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>

          {arrayMidias.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); slideAnterior(); }}
                className="absolute left-6 top-1/2 z-50 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:bg-white/20 hover:scale-110"
                title="Anterior (Seta Esquerda)"
              >
                <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); proximoSlide(); }}
                className="absolute right-6 top-1/2 z-50 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:bg-white/20 hover:scale-110"
                title="Próxima (Seta Direita)"
              >
                <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
              </button>
            </>
          )}

          <div className="flex h-full w-full items-center justify-center p-4 md:p-16" onClick={() => setIsFullScreen(false)}>
            {isVideo ? (
               <video key={midiaDestaque} src={midiaDestaque} controls autoPlay loop className="max-h-[90vh] max-w-[90vw] object-contain drop-shadow-2xl" onClick={(e) => e.stopPropagation()} />
            ) : (
               <img key={midiaDestaque} src={midiaDestaque} alt={obra.titulo} className="max-h-[90vh] max-w-[90vw] object-contain drop-shadow-2xl cursor-zoom-out" onClick={(e) => { e.stopPropagation(); setIsFullScreen(false); }} />
            )}
          </div>
        </div>
      )}

      <main className="mx-auto min-h-screen max-w-7xl px-6 py-12 lg:px-10">

        <button
          onClick={() => navigate(`/artista/${obra.autorId}/galeria?tipo=${obra.tipo}`)}
          className="mb-8 inline-flex items-center gap-2 rounded-full bg-[#F5F5F5] px-6 py-2 text-sm font-bold uppercase tracking-widest text-gray-800 transition-colors hover:bg-gray-200"
        >
          ← Voltar para Galeria
        </button>

        <div className="grid items-start gap-12 lg:grid-cols-[1.8fr_1fr]">

          <div className="flex w-full flex-col items-center">
            <div className="flex w-full gap-4 md:gap-6">

              {/* Miniaturas Laterais */}
              {arrayMidias.length > 1 && (
                <div className="flex flex-col gap-3 shrink-0">
                  {arrayMidias.map((midiaUrl, index) => {
                    const isActive = activeIndex === index;
                    return (
                      <button
                        key={index}
                        onClick={() => setActiveIndex(index)}
                        className={`h-14 w-14 shrink-0 overflow-hidden rounded-lg md:h-20 md:w-20 transition-all ${
                          isActive ? "border-2 border-black shadow-md ring-2 ring-black ring-offset-2" : "border border-gray-200 opacity-70 hover:opacity-100 bg-white"
                        }`}
                      >
                        {midiaUrl.includes("video") || midiaUrl.endsWith(".mp4") ? (
                          <video src={midiaUrl} className="h-full w-full object-cover" />
                        ) : obra.tipo === "IMAGEM" ? (
                          <img src={midiaUrl} alt="" className="h-full w-full object-cover" />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center bg-black text-white">
                            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                          </div>
                        )}
                      </button>
                    )
                  })}
                </div>
              )}

              {/* Mídia Principal em Destaque: Layout Orgânico Perfeitamente Centralizado */}
              <div className="relative flex w-full flex-1 items-center justify-center group min-w-0">

                {obra.tipo === "IMAGEM" ? (
                  // w-fit e mx-auto garantem que o abraço seja ajustado e centralizado na tela
                  <div className="relative w-fit max-w-full mx-auto flex items-center justify-center">

                    <div
                      className="cursor-zoom-in transition-transform duration-300"
                      onClick={() => setIsFullScreen(true)}
                      title="Ampliar Imagem"
                    >
                      {isVideo ? (
                         <video key={midiaDestaque} src={midiaDestaque} autoPlay muted loop className="block w-auto h-auto max-w-full max-h-[500px] lg:max-h-[550px] object-contain rounded-[24px] drop-shadow-2xl" />
                      ) : (
                         <img key={midiaDestaque} src={midiaDestaque} alt={obra.titulo} className="block w-auto h-auto max-w-full max-h-[500px] lg:max-h-[550px] object-contain rounded-[24px] drop-shadow-2xl" />
                      )}
                    </div>

                    {/* Setas de Navegação coladas à imagem */}
                    {arrayMidias.length > 1 && (
                      <>
                        <button
                          onClick={(e) => { e.stopPropagation(); slideAnterior(); }}
                          className="absolute -left-4 md:-left-6 top-1/2 z-20 flex h-10 w-10 md:h-12 md:w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-black shadow-lg opacity-0 backdrop-blur-md transition-all hover:scale-110 hover:bg-white group-hover:opacity-100"
                        >
                          <svg className="h-5 w-5 md:h-6 md:w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); proximoSlide(); }}
                          className="absolute -right-4 md:-right-6 top-1/2 z-20 flex h-10 w-10 md:h-12 md:w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-black shadow-lg opacity-0 backdrop-blur-md transition-all hover:scale-110 hover:bg-white group-hover:opacity-100"
                        >
                          <svg className="h-5 w-5 md:h-6 md:w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                        </button>
                      </>
                    )}
                  </div>
                ) : (
                  <div className="flex w-full items-center justify-center">
                    <iframe src={midiaDestaque} className="aspect-video w-full max-w-3xl border-none rounded-[24px] shadow-2xl" allow="encrypted-media; autoplay; clipboard-write; fullscreen" loading="lazy" />
                  </div>
                )}
              </div>
            </div>

            {/* Bolinhas Dinâmicas (Dots) centralizadas */}
            {arrayMidias.length > 1 && (
              <div className="mt-8 flex gap-3">
                {arrayMidias.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveIndex(idx)}
                    className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${
                      activeIndex === idx
                        ? "scale-125 bg-black opacity-80"
                        : "border border-black bg-transparent opacity-30 hover:opacity-60"
                    }`}
                    aria-label={`Ir para a mídia ${idx + 1}`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* DETALHES DA OBRA */}
          <div className="lg:sticky lg:top-32 lg:h-fit">
            <div className="flex items-start justify-between">
              <Link to={`/artista/${obra.autorId}`} className="inline-block rounded-full bg-[#ECF2E8] px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#5C7351] transition-transform hover:scale-105">
                • {obra.autorLogin.split('@')[0]}
              </Link>

              <button
                onClick={() => { navigator.clipboard.writeText(window.location.href); alert("Link copiado!"); }}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors hover:bg-gray-200 hover:text-black"
                title="Partilhar Obra"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
              </button>
            </div>

            <h1 className="mt-6 font-serif text-4xl font-black text-gray-800 md:text-5xl lg:text-6xl">{obra.titulo}</h1>
            <p className="mt-3 font-body text-sm font-bold uppercase tracking-widest text-[#A67B5B]">{obra.tipo.replace('_', ' ')} • {obra.dataPostagem?.split('-')[0] || new Date().getFullYear()}</p>
            <div className="mt-8 h-[1px] w-full bg-gray-200" />
            <p className="mt-8 font-body text-lg leading-relaxed text-gray-600 whitespace-pre-wrap">{obra.descricao || "Nenhuma descrição fornecida pelo artista."}</p>
          </div>
        </div>

        {/* CONTINUE EXPLORANDO */}
        {relacionadas.length > 0 && (
          <div className="mt-32 border-t border-gray-200 pt-16">
            <h2 className="mb-10 font-serif text-3xl font-black text-gray-800 md:text-4xl">Continue Explorando</h2>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {relacionadas.map((relacionada) => (
                <div key={relacionada.id} className="group flex flex-col items-start">
                  <Link to={`/obra/${relacionada.id}`} className="w-full">
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-transparent transition-shadow hover:shadow-lg">
                      {relacionada.tipo === "IMAGEM" ? (
                        <img src={relacionada.urlEmbed} alt={relacionada.titulo} className="h-full w-full object-contain p-4 transition-transform duration-500 group-hover:scale-105 mix-blend-darken" />
                      ) : (
                        <div className="h-full w-full pointer-events-none p-4">
                          <iframe src={relacionada.urlEmbed} className="h-full w-full border-none opacity-90 transition-opacity duration-300 group-hover:opacity-100" allow="encrypted-media" loading="lazy" />
                        </div>
                      )}
                    </div>
                  </Link>
                  <div className="mt-4 flex w-full flex-col">
                    <div className="flex items-center gap-2">
                      <span className="inline-block rounded-md bg-[#ECF2E8] px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest text-[#5C7351]">
                        • {relacionada.autorLogin.split('@')[0]}
                      </span>
                    </div>
                    <Link to={`/obra/${relacionada.id}`} className="mt-2 w-fit">
                      <h3 className="font-serif text-xl font-bold text-gray-800 transition-colors hover:text-[#A67B5B]">{relacionada.titulo}</h3>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>
      <Footer />
    </>
  );
}