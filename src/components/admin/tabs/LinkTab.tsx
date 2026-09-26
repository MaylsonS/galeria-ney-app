import { useState } from "react";
import { criarObra } from "../../../services/obraService";
import { INPUT } from "../AdminStyles";

export function LinkTab({ tipo }: { tipo: "AUDIO_SPOTIFY" | "VIDEO_YOUTUBE" }) {
  const config = tipo === "AUDIO_SPOTIFY" ? { label: "Faixa do Spotify", placeholder: "https://open.spotify.com/track/..." } : { label: "Vídeo do YouTube", placeholder: "https://www.youtube.com/watch?v=..." };
  const [titulo, setTitulo] = useState("");
  const [urlMidia, setUrlMidia] = useState("");
  const [descricao, setDescricao] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{tipo: 'success'|'error', mensagem: string} | null>(null);

  async function handleSubmit() {
    if (!titulo.trim() || !urlMidia.trim()) return;
    setIsSubmitting(true);
    setFeedback(null);

    try {
      await criarObra({ titulo, descricao, urlMidia, tipo });
      setFeedback({ tipo: "success", mensagem: "Conteúdo publicado com sucesso!" });
      setTitulo(""); setUrlMidia(""); setDescricao("");
    } catch (error: any) {
      const mensagemErro = error.response?.data?.[0]?.mensagem || "Ocorreu um erro ao registar a hiperligação.";
      setFeedback({ tipo: "error", mensagem: mensagemErro });
    } finally {
      setIsSubmitting(false);
    }
  }

  const canSubmit = titulo.trim().length > 0 && urlMidia.trim().length > 0;

  return (
    <div style={{ maxWidth: 560, margin: "0 auto", background: "#fff", borderRadius: 8, padding: 32, boxShadow: "0 1px 2px rgba(0,0,0,0.05)" }}>
      <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, fontWeight: 700, textTransform: "uppercase", textAlign: "center", marginBottom: 24 }}>{config.label}</p>
      {feedback && <div style={{ marginBottom: 20, padding: 12, borderRadius: 8, background: feedback.tipo === "success" ? "rgba(186,231,123,0.2)" : "#FEF2F2", color: feedback.tipo === "success" ? "#3a6b00" : "#B91C1C", fontWeight: 600 }}>{feedback.mensagem}</div>}
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <input type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} placeholder="Título da obra" style={INPUT} />
        <input type="url" value={urlMidia} onChange={(e) => setUrlMidia(e.target.value)} placeholder={config.placeholder} style={INPUT} />
        <textarea rows={4} value={descricao} onChange={(e) => setDescricao(e.target.value)} placeholder="Contexto da obra (opcional)" style={{ ...INPUT, height: "auto", padding: "11px 12px", resize: "none" }} />
        <button onClick={handleSubmit} disabled={!canSubmit || isSubmitting} style={{ height: 42, background: "#000", color: "#fff", fontWeight: 700, borderRadius: 8, cursor: canSubmit && !isSubmitting ? "pointer" : "not-allowed", opacity: !canSubmit || isSubmitting ? 0.4 : 1 }}>
          {isSubmitting ? "A carregar..." : "Salvar e Publicar"}
        </button>
      </div>
    </div>
  );
}