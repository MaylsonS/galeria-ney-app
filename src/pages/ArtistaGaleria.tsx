import { useState, useEffect } from "react";
import { useParams, useSearchParams, useNavigate, Link } from "react-router-dom";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { useArtista } from "../hooks/useArtista";
import api from "../services/api";
import type { Obra } from "../types/obra";

export function ArtistaGaleria() {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const tipo = searchParams.get("tipo") || "IMAGEM";

  const [busca, setBusca] = useState("");
  const [buscaDebounce, setBuscaDebounce] = useState("");
  const [obrasDaGaleria, setObrasDaGaleria] = useState<Obra[]>([]);
  const [pagina, setPagina] = useState(0);
  const [temMais, setTemMais] = useState(true);
  const [buscando, setBuscando] = useState(false);

  const { artista, carregando: carregandoArtista } = useArtista(id);

  // EFEITO 1: Debounce Seguro. Atualiza o termo E zera a página no mesmo exato momento
  useEffect(() => {
    const timer = setTimeout(() => {
      setBuscaDebounce(busca);
      setPagina(0); // Reseta a paginação ao digitar
    }, 500);
    return () => clearTimeout(timer);
  }, [busca]);

  // EFEITO 2: Trocar de Aba (Imagem -> Vídeo) zera a página
  useEffect(() => {
    setPagina(0);
  }, [tipo]);

  // EFEITO 3: Buscar Obras Blindado contra Race Conditions
  useEffect(() => {
    let requisicaoAtiva = true; // Flag de proteção

    async function fetchObras() {
      setBuscando(true);

      try {
        const response = await api.get(`/obras/autor/${id}`, {
          params: {
            page: pagina,
            size: 12,
            tipo: tipo,
            termo: buscaDebounce || undefined
          }
        });

        // Se o usuário digitou outra coisa enquanto essa resposta não chegava, nós a descartamos!
        if (!requisicaoAtiva) return;

        const novasObras = response.data.content || [];

        setObrasDaGaleria(prev => pagina === 0 ? novasObras : [...prev, ...novasObras]);
        setTemMais(!response.data.last);

      } catch (error) {
        console.error("Erro ao buscar obras da galeria:", error);
      } finally {
        if (requisicaoAtiva) setBuscando(false);
      }
    }

    if (id) fetchObras();

    // Cleanup Function: Quando o efeito for rodar de novo, cancela a requisição atual
    return () => {
      requisicaoAtiva = false;
    };
  }, [id, tipo, buscaDebounce, pagina]);


  if (carregandoArtista) {
    return (
      <><Navbar /><div className="flex min-h-[60vh] items-center justify-center"><div className="h-16 w-16 animate-spin rounded-full border-4 border-gray-300 border-t-black" /></div><Footer /></>
    );
  }

  const TITULOS: Record<string, string> = {
    IMAGEM: "Todas as Prints",
    AUDIO_SPOTIFY: "Todas as Faixas",
    VIDEO_YOUTUBE: "Todos os Vídeos"
  };

  return (
    <>
      <Navbar />
      <main className="mx-auto min-h-screen max-w-7xl px-6 py-12 lg:px-10">

        <div className="relative mb-16 flex flex-col items-center justify-center text-center">
          <button
            onClick={() => navigate(`/artista/${id}`)}
            className="absolute left-0 top-0 rounded-full bg-[#756A63] px-6 py-2 text-sm font-bold text-white shadow-md transition-colors hover:bg-[#5a514b]"
          >
            ← Voltar
          </button>

          <h1 className="mt-16 font-['Angkor'] text-5xl uppercase tracking-wide text-[#5C5C5C] md:mt-0 md:text-6xl">
            {TITULOS[tipo] || "Galeria"}
          </h1>

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

        {obrasDaGaleria.length === 0 && !buscando && (
          <div className="flex h-40 items-center justify-center text-gray-400 font-medium">
            Nenhuma obra encontrada.
          </div>
        )}

        {tipo === "IMAGEM" ? (
          <div className="columns-1 gap-8 space-y-8 sm:columns-2 lg:columns-3">
            {obrasDaGaleria.map(obra => (
              <div key={obra.id} className="break-inside-avoid flex flex-col items-center">
                <Link to={`/obra/${obra.id}`} className="w-full">
                  <img src={obra.urlEmbed} alt={obra.titulo} className="w-full rounded-3xl object-cover shadow-lg transition-transform duration-300 hover:scale-[1.02]" />
                </Link>
                <span className="mt-4 inline-block rounded-md bg-[#ECF2E8] px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#5C7351]">
                  • {artista?.nome}
                </span>
                <Link to={`/obra/${obra.id}`}>
                  <h3 className="mt-2 text-center font-serif text-xl font-bold text-gray-800 hover:text-[#A67B5B] transition-colors">{obra.titulo}</h3>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {obrasDaGaleria.map(obra => (
              <div key={obra.id} className="flex flex-col items-center">
                <div className="relative w-full h-[250px] overflow-hidden rounded-2xl shadow-lg bg-[#282828] group">
                  <iframe src={obra.urlEmbed} className="h-full w-full border-none" allow="encrypted-media" loading="lazy" />
                  <Link to={`/obra/${obra.id}`} className="absolute inset-0 z-10 cursor-pointer bg-black/0 transition-colors group-hover:bg-white/10" />
                </div>
                <span className="mt-4 inline-block rounded-md bg-[#ECF2E8] px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#5C7351]">
                  • {artista?.nome}
                </span>
                <Link to={`/obra/${obra.id}`}>
                  <h3 className="mt-2 text-center font-serif text-xl font-bold text-gray-800 hover:text-[#A67B5B] transition-colors">{obra.titulo}</h3>
                </Link>
              </div>
            ))}
          </div>
        )}

        {temMais && obrasDaGaleria.length > 0 && (
          <div className="mt-16 flex justify-center">
            <button
              onClick={() => setPagina(prev => prev + 1)}
              disabled={buscando}
              className="rounded-full border-2 border-black px-10 py-3 text-sm font-bold uppercase tracking-widest text-black transition-colors hover:bg-black hover:text-white disabled:opacity-50"
            >
              {buscando ? "Carregando..." : "Carregar Mais Obras"}
            </button>
          </div>
        )}

      </main>
      <Footer />
    </>
  );
}