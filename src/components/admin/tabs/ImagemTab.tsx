import { useState } from "react";
import { criarObraImagem } from "../../../services/obraService";
import { PreviewPanel, UploadZone, ObraForm } from "../MediaForms";

export function ImagemTab() {
  // Alterado de arquivo único para Arrays
  const [files, setFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [anoProducao, setAnoProducao] = useState(String(new Date().getFullYear()));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{tipo: 'success'|'error', mensagem: string} | null>(null);

  // Função adaptada para receber e mapear o array de arquivos
  function handleFilesChange(novosArquivos: File[]) {
    // Validação de segurança dupla
    const arquivosValidos = novosArquivos.filter(f => f.type.startsWith("image/") || f.type.startsWith("video/"));

    if (arquivosValidos.length !== novosArquivos.length) {
      setFeedback({ tipo: "error", mensagem: "Alguns arquivos foram ignorados. Apenas imagens e vídeos MP4 são permitidos." });
    } else {
      setFeedback(null);
    }

    setFiles(arquivosValidos);

    // Limpa as URLs antigas da memória do navegador para evitar vazamento de RAM
    previewUrls.forEach(url => URL.revokeObjectURL(url));

    // Gera as novas URLs de visualização
    const novasUrls = arquivosValidos.map(f => URL.createObjectURL(f));
    setPreviewUrls(novasUrls);
  }

  async function handleSubmit() {
    if (files.length === 0 || !titulo.trim()) return;
    setIsSubmitting(true);
    setFeedback(null);

    try {
      const formData = new FormData();
      formData.append("titulo", titulo);
      formData.append("descricao", descricao);
      if (anoProducao) formData.append("anoProducao", anoProducao);

      // Anexa todos os arquivos selecionados no FormData usando a chave "arquivos" (no plural)
      files.forEach(file => {
        formData.append("arquivos", file);
      });

      await criarObraImagem(formData);

      setFeedback({ tipo: "success", mensagem: "Obra publicada com sucesso!" });
      setFiles([]);
      setPreviewUrls([]);
      setTitulo("");
      setDescricao("");
    } catch (error: any) {
      const mensagemErro = error.response?.data?.[0]?.mensagem || "Erro inesperado ao salvar a obra.";
      setFeedback({ tipo: "error", mensagem: mensagemErro });
    } finally {
      setIsSubmitting(false);
    }
  }

  // A submissão só é liberada se houver pelo menos 1 arquivo
  const canSubmit = files.length > 0 && titulo.trim().length > 0;

  return (
    <div>
      {feedback && (
        <div style={{ marginBottom: 24, padding: "12px 16px", borderRadius: 8, background: feedback.tipo === "success" ? "rgba(186,231,123,0.2)" : "#FEF2F2", color: feedback.tipo === "success" ? "#3a6b00" : "#B91C1C", fontWeight: 600 }}>
          {feedback.mensagem}
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
        {/* Passando as props atualizadas para os componentes do MediaForms */}
        <PreviewPanel previewUrls={previewUrls} titulo={titulo} />
        <UploadZone files={files} onFilesChange={handleFilesChange} isReady={canSubmit} />
        <ObraForm
          titulo={titulo}
          descricao={descricao}
          anoProducao={anoProducao}
          isSubmitting={isSubmitting}
          canSubmit={canSubmit}
          onTituloChange={setTitulo}
          onDescricaoChange={setDescricao}
          onAnoChange={setAnoProducao}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}