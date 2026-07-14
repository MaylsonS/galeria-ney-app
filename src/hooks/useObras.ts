import { useEffect, useState } from "react";
import { listarObras } from "../services/obraService";
import type { Obra } from "../types/obra";

interface UseObrasResult {
  obras: Obra[];
  carregando: boolean;
  erro: unknown;
}

/**
 * Busca a lista de obras na API.
 * Encapsula 3 estados que toda busca assíncrona precisa: o dado em si,
 * se ainda está carregando, e se algo deu errado.
 */
export function useObras(termo?: string): UseObrasResult {
  const [obras, setObras] = useState<Obra[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<unknown>(null);

  useEffect(() => {
    // Esse "flag" evita uma classe de bug comum: se o componente for
    // desmontado (ex: usuário trocou de página) antes da resposta chegar,
    // a gente ignora o resultado em vez de tentar atualizar um estado
    // que não existe mais.
    let ativo = true;

    async function buscar() {
      setCarregando(true);
      setErro(null);
      try {
        const dados = await listarObras(termo);
        if (ativo) setObras(dados);
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
  }, [termo]); // refaz a busca sempre que o termo de filtro mudar

  return { obras, carregando, erro };
}
