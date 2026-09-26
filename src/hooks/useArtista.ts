import { useState, useEffect } from "react";
import { buscarArtista } from "../services/artistaService";
import type { Artista } from "../types/artista";

export function useArtista(id: string | undefined) {
  const [artista, setArtista] = useState<Artista | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    async function carregarArtista() {
      try {
        setCarregando(true);

        // Chama o service que faz o trabalho duplo (busca o Usuário + Obras e formata tudo)
        const dadosArtista = await buscarArtista(id!);

        setArtista(dadosArtista);
        setErro(null);
      } catch (err) {
        console.error(err);
        setErro("Falha ao carregar as informações do artista.");
      } finally {
        setCarregando(false);
      }
    }

    carregarArtista();
  }, [id]);

  return { artista, carregando, erro };
}