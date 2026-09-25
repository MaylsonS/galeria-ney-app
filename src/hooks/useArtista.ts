import { useState, useEffect } from "react";
import api from "../services/api"; // Ajuste o caminho de importação se necessário
import type { Artista } from "../types/artista";
import type { Obra } from "../types/obra";

export function useArtista(id: string | undefined) {
  const [artista, setArtista] = useState<Artista | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    async function carregarArtista() {
      try {
        setCarregando(true);

        // Dispara a requisição para buscar as obras do autor (agora liberada no Spring Security)
        const response = await api.get(`/obras/autor/${id}`);

        // Extrai a lista do objeto Page do Spring Boot, ou fallback para array simples
        const listaObras: Obra[] = response.data?.content || response.data || [];

        // Extrai o nome do artista baseado no login da primeira obra encontrada
        const autorLogin = listaObras.length > 0 ? listaObras[0].autorLogin : "Artista";
        const nomeFormatado = autorLogin.split("@")[0].toUpperCase();

        // Constrói o objeto do Artista contando dinamicamente os tipos de obras
        const artistaMontado: Artista = {
          id: id,
          nome: nomeFormatado,
          nomeExibicao: "PROJETOS",
          avatarUrl: "https://i.pravatar.cc/500?img=11", // URL fixa até implementar upload de avatar
          tagline: "Exploration of urban neon aesthetics, cybernetic character design, and aggressive street-art textures. A fusion of motion, music, and digital illustration.",
          descricao: "",
          estatisticas: [
            {
              valor: String(listaObras.filter(o => o.tipo === 'VIDEO_YOUTUBE').length),
              label: "VÍDEOS", cor: "#A67B5B"
            },
            {
              valor: String(listaObras.filter(o => o.tipo === 'IMAGEM').length),
              label: "PRINTS", cor: "#5C7351"
            },
            {
              valor: String(listaObras.filter(o => o.tipo === 'AUDIO_SPOTIFY').length),
              label: "ÁUDIOS", cor: "#E28765"
            }
          ],
          obras: listaObras,
          faixas: [], // Deixamos vazios porque o ArtistaDetalhe.tsx já filtra de 'obras'
          videos: []  // Deixamos vazios porque o ArtistaDetalhe.tsx já filtra de 'obras'
        };

        setArtista(artistaMontado);
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