import { useRef, useState, DragEvent } from "react";
import { CARD, COL_HEADER, LABEL, INPUT } from "./AdminStyles";

export function PreviewPanel({ previewUrl, titulo }: { previewUrl: string | null; titulo: string }) {
  return (
    <div style={CARD}>
      <p style={COL_HEADER}>Preview do Conteúdo</p>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "8px 0", gap: 0 }}>
        <div style={{ position: "relative", flex: 1, borderRadius: 8, overflow: "hidden", background: "#EDEEEF", boxShadow: "inset 0 2px 4px rgba(0,0,0,0.05)" }}>
          {previewUrl ? (
            <>
              <img src={previewUrl} alt={titulo || "Preview"} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(0deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 50%)", opacity: 0.8 }} />
              <div style={{ position: "absolute", bottom: 16, left: 16, right: 16, paddingTop: 6 }}>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "1.1px", textTransform: "uppercase", color: "#FECAA5", margin: 0 }}>Série Manifesto</p>
                <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 18, fontWeight: 700, letterSpacing: "-0.45px", color: "#fff", margin: "2px 0 0" }}>{titulo || "Sem título"}</p>
              </div>
            </>
          ) : (
            <div style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 8 }}>
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none"><rect x="2" y="2" width="36" height="36" rx="4" stroke="#C4C4C4" strokeWidth="2" /><path d="M2 28l10-12 8 9 6-6 12 9" stroke="#C4C4C4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><circle cx="12" cy="14" r="3" fill="#C4C4C4" /></svg>
              <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: "#C4C4C4", textAlign: "center", margin: 0 }}>Nenhuma imagem<br />Faça o upload ao lado</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function UploadZone({ file, onFileChange, isReady }: { file: File | null; onFileChange: (file: File) => void; isReady: boolean }) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault(); setIsDragging(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped && dropped.type.startsWith("image/")) onFileChange(dropped);
  }

  return (
    <div style={CARD}>
      <p style={COL_HEADER}>Upload de Imagem</p>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "8px 0" }}>
        <div onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }} onDragLeave={() => setIsDragging(false)} onDrop={handleDrop} onClick={() => inputRef.current?.click()} style={{ flex: 1, borderRadius: 8, background: isDragging ? "#EDEEEF" : "#F3F4F5", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", cursor: "pointer", border: isDragging ? "2px dashed #000" : "none" }}>
          {file ? (
            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, fontWeight: 700, color: "#000", margin: 0, textAlign: "center" }}>{file.name}</p>
          ) : (
            <>
              <div style={{ width: 56, height: 56, borderRadius: "50%", background: "#E1E3E4", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                <svg width="19" height="19" viewBox="0 0 19 19" fill="none"><path d="M9.5 13V4M9.5 4L6 7.5M9.5 4L13 7.5" stroke="#000" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /><path d="M2 14v1a2 2 0 002 2h11a2 2 0 002-2v-1" stroke="#000" strokeWidth="1.6" strokeLinecap="round" /></svg>
              </div>
              <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, fontWeight: 700, color: "#000", margin: 0, textAlign: "center" }}>{isDragging ? "Solte aqui" : "Arraste e solte arquivos aqui"}</p>
              <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: "#444748", margin: "12px 0 0", textAlign: "center" }}>Formatos: PNG, JPG, JPEG (máx. 10MB)</p>
            </>
          )}
        </div>
        <input ref={inputRef} type="file" accept="image/png,image/jpeg,image/jpg" style={{ display: "none" }} onChange={(e) => { if (e.target.files?.[0]) onFileChange(e.target.files[0]); }} />
      </div>
    </div>
  );
}

export function ObraForm({ titulo, descricao, anoProducao, isSubmitting, canSubmit, onTituloChange, onDescricaoChange, onAnoChange, onSubmit }: any) {
  return (
    <div style={CARD}>
      <p style={COL_HEADER}>Detalhes do Conteúdo</p>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "8px 0" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div>
            <label style={LABEL}>Título <span style={{ color: "#7C5639" }}>*</span></label>
            <input type="text" value={titulo} onChange={(e) => onTituloChange(e.target.value)} placeholder="Nome da obra" style={{ ...INPUT, background: "#fff", border: "1px solid rgba(0,0,0,0.05)" }} />
          </div>
          <div>
            <label style={{ ...LABEL, color: "#444748" }}>Ano de Produção</label>
            <input type="text" value={anoProducao} onChange={(e) => onAnoChange(e.target.value)} maxLength={4} style={{ ...INPUT, background: "#F3F4F5", width: "50%" }} />
          </div>
          <div>
            <label style={LABEL}>Descrição</label>
            <textarea value={descricao} onChange={(e) => onDescricaoChange(e.target.value)} rows={7} placeholder="Descreva a obra, técnica utilizada..." style={{ width: "100%", borderRadius: 8, border: "1px solid rgba(0,0,0,0.05)", background: "#fff", padding: "11px 12px", outline: "none", resize: "none", fontFamily: "'Inter', sans-serif" }} />
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, paddingTop: 16, borderTop: "1px solid rgba(0,0,0,0.05)" }}>
          <button onClick={onSubmit} disabled={!canSubmit || isSubmitting} style={{ width: "100%", height: 42, borderRadius: 8, border: "none", background: "#000", color: "#fff", fontWeight: 700, textTransform: "uppercase", cursor: canSubmit && !isSubmitting ? "pointer" : "not-allowed", opacity: !canSubmit || isSubmitting ? 0.4 : 1 }}>
            {isSubmitting ? "Publicando..." : "Salvar e Publicar"}
          </button>
        </div>
      </div>
    </div>
  );
}