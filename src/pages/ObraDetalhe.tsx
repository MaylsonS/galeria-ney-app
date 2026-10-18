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

  useEffect(() => {
    async function carregarDados() {
      try {
        setCarregando(true);
        // 1. Busca os detalhes da obra específica
        const { data: obraData } = await api.get(`/obras/${id}`);
        setObra(obraData);

        if (obraData?.autorId) {
          // 2. Busca outras obras do MESMO ARTISTA
          const { data: autorPage } = await api.get(`/obras/autor/${obraData.autorId}?size=10`);
          const obrasDoAutor = (autorPage.content || autorPage || []).filter((o: Obra) => o.id !== id);

          // Pega no máximo 2 obras do mesmo autor
          const duasDoAutor = obrasDoAutor.slice(0, 2);

          // 3. Busca obras GLOBAIS para achar arte de OUTRO artista
          const { data: globalPage } = await api.get(`/obras?size=20`);
          const obrasGlobais = globalPage.content || globalPage || [];

          // Encontra 1 obra de qualquer artista diferente
          const obraOutroArtista = obrasGlobais.find((o: Obra) => o.autorId !== obraData.autorId);

          // 4. Monta o array final: [Autor, Outro, Autor]
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

    // Sempre rola a página para o topo ao trocar de obra
    window.scrollTo(0, 0);
    if (id) carregarDados();
  }, [id]);

  if (carregando) {
    return (
      <>
        <Navbar />
        <div className="flex min-h-[70vh] items-center justify-center">
          <div className="h-16 w-16 animate-spin rounded-full border-4 border-gray-300 border-t-black" />
        </div>
        <Footer />
      </>
    );
  }

  if (!obra) {
    return (
      <>
        <Navbar />
        <div className="flex min-h-[70vh] flex-col items-center justify-center gap-4">
          <h2 className="font-serif text-2xl font-bold text-gray-800">Obra não encontrada.</h2>
          <button onClick={() => navigate(-1)} className="text-sm font-bold uppercase tracking-widest underline">Voltar</button>
        </div>
        <Footer />
      </>
    );
  }

  const mockThumbnails = [
    { id: '1', url: obra.urlEmbed, active: true },
    { id: '2', url: null, active: false },
    { id: '3', url: null, active: false }
  ];

  return (
    <>
      <Navbar />
      <main className="mx-auto min-h-screen max-w-7xl px-6 py-12 lg:px-10">

        {/* Botão de Voltar Dinâmico (Ponto 1) */}
        <button
          onClick={() => navigate(`/artista/${obra.autorId}/galeria?tipo=${obra.tipo}`)}
          className="mb-8 inline-flex items-center gap-2 rounded-full bg-[#F5F5F5] px-6 py-2 text-sm font-bold uppercase tracking-widest text-gray-800 transition-colors hover:bg-gray-200"
        >
          ← Voltar para Galeria
        </button>

        {/* SEÇÃO PRINCIPAL: Mídia + Detalhes */}
        <div className="grid gap-12 lg:grid-cols-[1.8fr_1fr]">

          <div className="flex flex-col items-center">
            <div className="flex w-full gap-4 md:gap-6">

              {/* Miniaturas Laterais */}
              <div className="flex flex-col gap-3">
                {mockThumbnails.map((thumb) => (
                  <button
                    key={thumb.id}
                    className={`h-14 w-14 shrink-0 overflow-hidden rounded-lg md:h-20 md:w-20 transition-all ${
                      thumb.active ? "border-2 border-black shadow-md" : "border border-gray-200 opacity-60 hover:opacity-100"
                    } ${!thumb.url ? "bg-gray-100" : ""}`}
                  >
                    {thumb.url && obra.tipo === "IMAGEM" && (
                      <img src={thumb.url} alt="" className="h-full w-full object-cover" />
                    )}
                    {thumb.url && obra.tipo !== "IMAGEM" && (
                      <div className="flex h-full w-full items-center justify-center bg-black text-white">
                        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                      </div>
                    )}
                  </button>
                ))}
              </div>

              {/* Mídia Principal em Destaque */}
              <div className="flex-1 overflow-hidden rounded-[24px] bg-[#282828] shadow-2xl">
                {obra.tipo === "IMAGEM" ? (
                  <img
                    src={obra.urlEmbed}
                    alt={obra.titulo}
                    className="w-full object-cover h-full min-h-[400px]"
                    style={{ maxHeight: '75vh' }}
                  />
                ) : (
                  <div className="aspect-video w-full h-full min-h-[400px]">
                    <iframe
                      src={obra.urlEmbed}
                      className="h-full w-full border-none"
                      allow="encrypted-media; autoplay; clipboard-write; fullscreen"
                      loading="lazy"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="mt-8 flex gap-3">
              <span className="h-2.5 w-2.5 rounded-full bg-black opacity-80" />
              <span className="h-2.5 w-2.5 rounded-full border border-black opacity-40" />
              <span className="h-2.5 w-2.5 rounded-full border border-black opacity-40" />
            </div>
          </div>

          <div className="lg:sticky lg:top-32 lg:h-fit">
            <div className="flex items-start justify-between">
              <Link to={`/artista/${obra.autorId}`} className="inline-block rounded-full bg-[#ECF2E8] px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#5C7351] transition-transform hover:scale-105">
                • {obra.autorLogin.split('@')[0]}
              </Link>

              <button
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  alert("Link copiado para a área de transferência!");
                }}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors hover:bg-gray-200 hover:text-black"
                title="Compartilhar Obra"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
              </button>
            </div>

            <h1 className="mt-6 font-serif text-4xl font-black text-gray-800 md:text-5xl lg:text-6xl">
              {obra.titulo}
            </h1>

            <p className="mt-3 font-body text-sm font-bold uppercase tracking-widest text-[#A67B5B]">
              {obra.tipo.replace('_', ' ')} • {obra.dataPostagem?.split('-')[0] || new Date().getFullYear()}
            </p>

            <div className="mt-8 h-[1px] w-full bg-gray-200" />

            <p className="mt-8 font-body text-lg leading-relaxed text-gray-600 whitespace-pre-wrap">
              {obra.descricao || "Nenhuma descrição fornecida pelo artista para esta obra."}
            </p>
          </div>
        </div>

        {/* SEÇÃO INFERIOR: Continue Explorando (Ponto 2 e 3) */}
        {relacionadas.length > 0 && (
          <div className="mt-32 border-t border-gray-200 pt-16">
            <h2 className="mb-10 font-serif text-3xl font-black text-gray-800 md:text-4xl">
              Continue Explorando
            </h2>

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {relacionadas.map((relacionada) => (
                <div key={relacionada.id} className="group flex flex-col items-start">

                  {/* Container Clicável */}
                  <Link to={`/obra/${relacionada.id}`} className="w-full">
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-[#282828] shadow-md">

                      {relacionada.tipo === "IMAGEM" ? (
                        <img
                          src={relacionada.urlEmbed}
                          alt={relacionada.titulo}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="h-full w-full pointer-events-none">
                          <iframe
                            src={relacionada.urlEmbed}
                            className="h-full w-full border-none opacity-90 transition-opacity duration-300 group-hover:opacity-100"
                            allow="encrypted-media"
                            loading="lazy"
                          />
                        </div>
                      )}

                      {/* Overlay Transparente (Protege iframes) */}
                      <div className="absolute inset-0 z-10 bg-black/0 transition-colors group-hover:bg-white/5" />
                    </div>
                  </Link>

                  <div className="mt-4 flex w-full flex-col">
                    <div className="flex items-center gap-2">
                      <span className="inline-block rounded-md bg-[#ECF2E8] px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest text-[#5C7351]">
                        • {relacionada.autorLogin.split('@')[0]}
                      </span>
                    </div>

                    <Link to={`/obra/${relacionada.id}`} className="mt-2 w-fit">
                      <h3 className="font-serif text-xl font-bold text-gray-800 transition-colors hover:text-[#A67B5B]">
                        {relacionada.titulo}
                      </h3>
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