import { useState } from "react";
import { criarObraImagem } from "../../../services/obraService";
import { PreviewPanel, UploadZone, ObraForm } from "../MediaForms";

export function ImagemTab() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [anoProducao, setAnoProducao] = useState(String(new Date().getFullYear()));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{tipo: 'success'|'error', mensagem: string} | null>(null);

  function handleFileChange(novoArquivo: File) {
    if (!novoArquivo.type.startsWith("image/")) {
      setFeedback({ tipo: "error", mensagem: "Por favor, selecione apenas arquivos de imagem." });
      return;
    }
    const url = URL.createObjectURL(novoArquivo);
    setFile(novoArquivo);
    setPreviewUrl(url);
    setFeedback(null);
  }

  async function handleSubmit() {
    if (!file || !titulo.trim()) return;
    setIsSubmitting(true);
    setFeedback(null);

    try {
      const formData = new FormData();
      formData.append("titulo", titulo);
      formData.append("descricao", descricao);
      if (anoProducao) formData.append("anoProducao", anoProducao);
      formData.append("arquivo", file);

      await criarObraImagem(formData);

      setFeedback({ tipo: "success", mensagem: "Obra publicada com sucesso!" });
      setFile(null); setPreviewUrl(null); setTitulo(""); setDescricao("");
    } catch (error: any) {
      const mensagemErro = error.response?.data?.[0]?.mensagem || "Erro inesperado ao salvar a obra.";
      setFeedback({ tipo: "error", mensagem: mensagemErro });
    } finally {
      setIsSubmitting(false);
    }
  }

  const canSubmit = !!file && titulo.trim().length > 0;

  return (
    <div>
      {feedback && <div style={{ marginBottom: 24, padding: "12px 16px", borderRadius: 8, background: feedback.tipo === "success" ? "rgba(186,231,123,0.2)" : "#FEF2F2", color: feedback.tipo === "success" ? "#3a6b00" : "#B91C1C", fontWeight: 600 }}>{feedback.mensagem}</div>}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
        <PreviewPanel previewUrl={previewUrl} titulo={titulo} />
        <UploadZone file={file} onFileChange={handleFileChange} isReady={canSubmit} />
        <ObraForm titulo={titulo} descricao={descricao} anoProducao={anoProducao} isSubmitting={isSubmitting} canSubmit={canSubmit} onTituloChange={setTitulo} onDescricaoChange={setDescricao} onAnoChange={setAnoProducao} onSubmit={handleSubmit} />
      </div>
    </div>
  );
}