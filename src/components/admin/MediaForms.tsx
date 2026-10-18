import { useRef, useState, DragEvent } from "react";
import { CARD, COL_HEADER, LABEL, INPUT } from "./AdminStyles";

// --- 1. PREVIEW PANEL ---
export function PreviewPanel({ previewUrls, titulo }: { previewUrls: string[]; titulo: string }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const safeIndex = activeIndex >= previewUrls.length ? 0 : activeIndex;
  const currentUrl = previewUrls[safeIndex];

  return (
    <div style={CARD}>
      <p style={COL_HEADER}>Preview do Conteúdo</p>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "8px 0", gap: 8 }}>

        <div style={{ position: "relative", flex: 1, borderRadius: 8, overflow: "hidden", background: "#EDEEEF", boxShadow: "inset 0 2px 4px rgba(0,0,0,0.05)" }}>
          {currentUrl ? (
            <>
              {currentUrl.includes("video") || currentUrl.endsWith(".mp4") ? (
                <video src={currentUrl} controls style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              ) : (
                <img src={currentUrl} alt={titulo || "Preview"} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              )}

              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(0deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 50%)", opacity: 0.8, pointerEvents: "none" }} />
              <div style={{ position: "absolute", bottom: 16, left: 16, right: 16, paddingTop: 6, pointerEvents: "none" }}>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "1.1px", textTransform: "uppercase", color: "#FECAA5", margin: 0 }}>Nova Obra</p>
                <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: 18, fontWeight: 700, letterSpacing: "-0.45px", color: "#fff", margin: "2px 0 0" }}>{titulo || "Sem título"}</p>
              </div>
            </>
          ) : (
            <div style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 8 }}>
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none"><rect x="2" y="2" width="36" height="36" rx="4" stroke="#C4C4C4" strokeWidth="2" /><path d="M2 28l10-12 8 9 6-6 12 9" stroke="#C4C4C4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><circle cx="12" cy="14" r="3" fill="#C4C4C4" /></svg>
              <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: "#C4C4C4", textAlign: "center", margin: 0 }}>Nenhuma mídia<br />Faça o upload ao lado</p>
            </div>
          )}
        </div>

        {previewUrls.length > 1 && (
          <div style={{ display: "flex", gap: 8, height: 60, overflowX: "auto", paddingBottom: 4 }}>
            {previewUrls.map((url, idx) => (
              <div
                key={idx}
                onClick={() => setActiveIndex(idx)}
                style={{
                  width: 60, height: "100%", flexShrink: 0, borderRadius: 6, overflow: "hidden", cursor: "pointer",
                  border: safeIndex === idx ? "2px solid #000" : "2px solid transparent",
                  opacity: safeIndex === idx ? 1 : 0.6,
                  transition: "all 0.2s",
                  position: "relative"
                }}
              >
                 {idx === 0 && (
                   <div style={{ position: "absolute", top: 0, left: 0, right: 0, background: "rgba(166, 123, 91, 0.9)", color: "#fff", fontSize: 8, fontWeight: "bold", textAlign: "center", zIndex: 10 }}>CAPA</div>
                 )}
                 {url.includes("video") || url.endsWith(".mp4") ? (
                    <video src={url} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                 ) : (
                    <img src={url} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                 )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// --- 2. UPLOAD ZONE COM REORDENAÇÃO E TAG "CAPA" ---
export function UploadZone({ files, onFilesChange }: { files: File[]; onFilesChange: (files: File[]) => void }) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragging(false);
    const dropped = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith("image/") || f.type.startsWith("video/"));
    if (dropped.length > 0) {
      onFilesChange([...files, ...dropped]);
    }
  }

  function removeFile(index: number, e: React.MouseEvent) {
    e.stopPropagation();
    const newFiles = [...files];
    newFiles.splice(index, 1);
    onFilesChange(newFiles);
  }

  // NOVA FUNÇÃO: Move o arquivo para cima (-1) ou para baixo (+1)
  function moveFile(index: number, direction: number, e: React.MouseEvent) {
    e.stopPropagation();
    if (index + direction < 0 || index + direction >= files.length) return;

    const newFiles = [...files];
    const temp = newFiles[index];
    newFiles[index] = newFiles[index + direction];
    newFiles[index + direction] = temp;

    onFilesChange(newFiles);
  }

  return (
    <div style={CARD}>
      <p style={COL_HEADER}>Upload de Mídia</p>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "8px 0", overflow: "hidden" }}>

        <div
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          style={{
            flex: files.length > 0 ? "none" : 1,
            minHeight: files.length > 0 ? 80 : "auto",
            borderRadius: 8,
            background: isDragging ? "#EDEEEF" : "#F3F4F5",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            border: isDragging ? "2px dashed #000" : "none",
            marginBottom: files.length > 0 ? 16 : 0,
            padding: 16
          }}
        >
          {files.length > 0 ? (
            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, fontWeight: 700, color: "#000", margin: 0, textAlign: "center" }}>
              + Adicionar mais mídias
            </p>
          ) : (
            <>
              <div style={{ width: 56, height: 56, borderRadius: "50%", background: "#E1E3E4", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                <svg width="19" height="19" viewBox="0 0 19 19" fill="none"><path d="M9.5 13V4M9.5 4L6 7.5M9.5 4L13 7.5" stroke="#000" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /><path d="M2 14v1a2 2 0 002 2h11a2 2 0 002-2v-1" stroke="#000" strokeWidth="1.6" strokeLinecap="round" /></svg>
              </div>
              <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, fontWeight: 700, color: "#000", margin: 0, textAlign: "center" }}>{isDragging ? "Solte aqui" : "Arraste e solte mídias aqui"}</p>
              <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: "#444748", margin: "12px 0 0", textAlign: "center" }}>Formatos: PNG, JPG, MP4 (máx. 10MB)</p>
            </>
          )}
        </div>

        {files.length > 0 && (
          <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 8 }}>
            {files.map((file, idx) => (
              <div key={idx} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 12px", background: "#fff", border: "1px solid rgba(0,0,0,0.05)", borderRadius: 6 }}>

                <div style={{ display: "flex", alignItems: "center", gap: 8, overflow: "hidden", flex: 1 }}>
                  {/* TAG DE CAPA NO PRIMEIRO ITEM */}
                  {idx === 0 && (
                    <span style={{ background: "#A67B5B", color: "#fff", fontSize: 9, fontWeight: 800, padding: "2px 6px", borderRadius: 4, letterSpacing: "0.5px" }}>
                      CAPA
                    </span>
                  )}
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: "#000", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {file.name}
                  </span>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  {/* Botão Subir */}
                  <button onClick={(e) => moveFile(idx, -1, e)} disabled={idx === 0} style={{ background: "none", border: "none", cursor: idx === 0 ? "not-allowed" : "pointer", opacity: idx === 0 ? 0.3 : 1, fontSize: 16 }}>
                    ↑
                  </button>

                  {/* Botão Descer */}
                  <button onClick={(e) => moveFile(idx, 1, e)} disabled={idx === files.length - 1} style={{ background: "none", border: "none", cursor: idx === files.length - 1 ? "not-allowed" : "pointer", opacity: idx === files.length - 1 ? 0.3 : 1, fontSize: 16 }}>
                    ↓
                  </button>

                  <div style={{ width: 1, height: 16, background: "#EAEAEA", margin: "0 4px" }} />

                  {/* Botão Remover */}
                  <button onClick={(e) => removeFile(idx, e)} style={{ background: "none", border: "none", cursor: "pointer", color: "#FF4D4D", fontWeight: 900, fontSize: 12 }}>
                    ✕
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}

        <input ref={inputRef} type="file" multiple accept="image/png,image/jpeg,image/jpg,video/mp4" style={{ display: "none" }} onChange={(e) => { if (e.target.files?.length) { onFilesChange([...files, ...Array.from(e.target.files)]); } }} />
      </div>
    </div>
  );
}

// --- 3. OBRA FORM COM PROTEÇÃO DE LIMITE NO TÍTULO ---
export function ObraForm({ titulo, descricao, anoProducao, isSubmitting, canSubmit, onTituloChange, onDescricaoChange, onAnoChange, onSubmit }: any) {
  return (
    <div style={CARD}>
      <p style={COL_HEADER}>Detalhes do Conteúdo</p>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "8px 0" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

          <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
              <label style={{...LABEL, marginBottom: 0}}>Título <span style={{ color: "#7C5639" }}>*</span></label>
              {/* Contador de caracteres para não estourar o banco de dados */}
              <span style={{ fontSize: 10, fontWeight: 600, color: titulo.length >= 20 ? "#FF4D4D" : "#999" }}>
                {titulo.length}/20
              </span>
            </div>
            <input
              type="text"
              value={titulo}
              onChange={(e) => onTituloChange(e.target.value)}
              placeholder="Nome da obra"
              maxLength={20} // Proteção contra o erro 500
              style={{ ...INPUT, background: "#fff", border: "1px solid rgba(0,0,0,0.05)" }}
            />
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