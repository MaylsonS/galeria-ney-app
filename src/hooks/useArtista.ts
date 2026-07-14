import { useEffect, useState } from "react";
import { buscarArtista } from "../services/artistaService";
import type { Artista } from "../types/artista";

interface UseArtistaResult {
  artista: Artista | null;
  carregando: boolean;
  erro: unknown;
}

/**
 * Busca os dados de um artista (perfil, obras, faixas e vídeos) na API.
 * Mesmo padrão do useObras: dado, carregando e erro.
 */
export function useArtista(id: string | undefined): UseArtistaResult {
  const [artista, setArtista] = useState<Artista | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<unknown>(null);

  useEffect(() => {
    if (!id) {
      setCarregando(false);
      return;
    }

    let ativo = true;

    async function buscar() {
      setCarregando(true);
      setErro(null);
      try {
        const dados = await buscarArtista(id as string);
        if (ativo) setArtista(dados);
      } catch (erroRequisicao) {
        if (ativo) setErro(erroRequisicao);
      } finally {
        if (ativo) setCarregando(false);
      }
    }

    buscar();

    return () => {
      ativo = false;
    };
  }, [id]);

  return { artista, carregando, erro };
}
