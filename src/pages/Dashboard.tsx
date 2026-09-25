import { useEffect, useRef, useState, DragEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { criarObraImagem } from "../services/obraService";

// ============================================================================
// 1. COMPONENTES VISUAIS BASE (Header, TabNav, Footer)
// ============================================================================

export function AdminHeader() {
  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        width: "100%",
        background: "rgba(248,249,250,0.9)",
        backdropFilter: "blur(6px)",
        boxShadow: "0 1px 8px rgba(0,0,0,0.04)",
        borderBottom: "1px solid rgba(0,0,0,0.05)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 64,
          padding: "0 24px",
          maxWidth: 1440,
          margin: "0 auto"
        }}
      >
        <Link
          to="/"
          style={{
            fontFamily: "'Montserrat', 'Space Grotesk', sans-serif",
            fontWeight: 800,
            fontSize: 18,
            letterSpacing: "-0.45px",
            textTransform: "uppercase",
            color: "#000",
            textDecoration: "none"
          }}
        >
          Nós Temos Nós Mesmos
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              background: "#EDEEEF",
              borderRadius: 9999,
              padding: "4px 12px",
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.22px",
              color: "#444748",
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#000",
                display: "inline-block",
              }}
            />
            Online
          </span>
          <button
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              background: "#000",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            title="Perfil"
          >
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <circle cx="6.5" cy="3.5" r="2.5" stroke="white" strokeWidth="1.3" />
              <path d="M1.5 12c0-2.485 2.239-4.5 5-4.5s5 2.015 5 4.5" stroke="white" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}

function AdminFooter() {
  return (
    <footer
      style={{
        background: "#F3F4F5",
        borderTop: "1px solid rgba(0,0,0,0.05)",
        marginTop: "auto",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: 90,
          padding: "0 24px",
          maxWidth: 1440,
          margin: "0 auto"
        }}
      >
        <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
          <span style={{ fontFamily: "'Montserrat', 'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 18, letterSpacing: "-0.45px", textTransform: "uppercase", color: "#000" }}>
            Nós Temos Nós Mesmos
          </span>
          <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 11, letterSpacing: "0.55px", textTransform: "uppercase", color: "#7C5639" }}>
            — Portfólio &amp; Arquivo
          </span>
        </div>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: "#444748", margin: 0 }}>
          © {new Date().getFullYear()} Maylson da Silva Rodrigues. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}

const TABS = [
  { id: "IMAGEM", label: "Imagem", icon: <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="1" y="1" width="12" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.4" /><path d="M1 10l3.5-4 2.5 3 2-2 3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /><circle cx="4" cy="5" r="1" fill="currentColor" /></svg> },
  { id: "MUSICAS", label: "Músicas", icon: <svg width="10" height="14" viewBox="0 0 10 14" fill="none"><path d="M3 11V2l7-2v9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /><circle cx="2" cy="11" r="2" stroke="currentColor" strokeWidth="1.4" /><circle cx="9" cy="9" r="2" stroke="currentColor" strokeWidth="1.4" /></svg> },
  { id: "VIDEOS", label: "Vídeos", icon: <svg width="14" height="11" viewBox="0 0 14 11" fill="none"><rect x="1" y="1" width="9" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.4" /><path d="M10 4l4-2v7l-4-2V4z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg> },
  { id: "USUARIOS", label: "Usuários", icon: <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><circle cx="6.5" cy="3.5" r="2.5" stroke="currentColor" strokeWidth="1.3" /><path d="M1.5 12c0-2.485 2.239-4.5 5-4.5s5 2.015 5 4.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" /></svg> },
];

export function TabNav({ activeTab, onChange }: { activeTab: string; onChange: (tab: string) => void }) {
  return (
    <div style={{ display: "flex", justifyContent: "center", gap: 12 }}>
      {TABS.map((tab) => {
        const isActive = tab.id === activeTab;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            style={{
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              width: 131, height: 54, borderRadius: 8, border: "none", cursor: "pointer",
              background: isActive ? "#000" : "#F7F3F3", color: isActive ? "#fff" : "#444748",
              fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 700,
              letterSpacing: "0.55px", textTransform: "uppercase",
              boxShadow: "0 1px 2px rgba(0,0,0,0.05)", transition: "all 0.15s",
            }}
          >
            <span style={{ color: isActive ? "#fff" : "#444748" }}>{tab.icon}</span>
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}

// ============================================================================
// 2. COMPONENTES DO FORMULÁRIO E PREVIEW
// ============================================================================

const CARD = { background: "#fff", borderRadius: "8px", boxShadow: "0 1px 2px rgba(0,0,0,0.05)", padding: 24, display: "flex", flexDirection: "column" as const, height: 603, position: "relative" as const };
const COL_HEADER = { fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.55px", textTransform: "uppercase" as const, color: "#000", textAlign: "center" as const, paddingBottom: 19, paddingTop: 7 };
const LABEL = { fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.55px", textTransform: "uppercase" as const, color: "#000", display: "block", marginBottom: 4 };
const INPUT = { width: "100%", height: 40, borderRadius: 8, border: "none", background: "#fff", boxShadow: "0 1px 2px rgba(0,0,0,0.05)", padding: "0 12px", fontFamily: "'Inter', sans-serif", fontSize: 14, color: "#191C1D", outline: "none", boxSizing: "border-box" as const };

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
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <rect x="2" y="2" width="36" height="36" rx="4" stroke="#C4C4C4" strokeWidth="2" />
                <path d="M2 28l10-12 8 9 6-6 12 9" stroke="#C4C4C4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="12" cy="14" r="3" fill="#C4C4C4" />
              </svg>
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
    e.preventDefault();
    setIsDragging(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped && dropped.type.startsWith("image/")) onFileChange(dropped);
  }

  return (
    <div style={CARD}>
      <p style={COL_HEADER}>Upload de Imagem</p>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "8px 0" }}>
        <div
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          style={{ flex: 1, borderRadius: 8, background: isDragging ? "#EDEEEF" : "#F3F4F5", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", cursor: "pointer", border: isDragging ? "2px dashed #000" : "none" }}
        >
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

// ============================================================================
// 3. LÓGICA DE INTEGRAÇÃO COM O BACK-END (SEU CONTEXTO ORIGINAL)
// ============================================================================

function ImagemTab() {
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

  // --- Função de Submit usando o seu serviço original ---
  async function handleSubmit() {
    if (!file || !titulo.trim()) return;
    setIsSubmitting(true);
    setFeedback(null);

    try {
      const formData = new FormData();
      formData.append("titulo", titulo);
      formData.append("descricao", descricao);
      // Se a sua API antiga não recebia anoProducao, pode remover esta linha.
      if (anoProducao) formData.append("anoProducao", anoProducao);
      formData.append("arquivo", file);

      // Chamada ao serviço que já estava a funcionar
      await criarObraImagem(formData);

      setFeedback({ tipo: "success", mensagem: "Obra publicada com sucesso!" });

      // Limpar os campos após o sucesso
      setFile(null);
      setPreviewUrl(null);
      setTitulo("");
      setDescricao("");
    } catch (error: any) {
      // Usa o formato de erro vindo do TratadorDeErros do Spring Boot
      const mensagemErro = error.response?.data?.[0]?.mensagem || "Erro inesperado ao salvar a obra.";
      setFeedback({ tipo: "error", mensagem: mensagemErro });
    } finally {
      setIsSubmitting(false);
    }
  }

  const canSubmit = !!file && titulo.trim().length > 0;

  return (
    <div>
      {feedback && (
        <div style={{ marginBottom: 24, padding: "12px 16px", borderRadius: 8, background: feedback.tipo === "success" ? "rgba(186,231,123,0.2)" : "#FEF2F2", color: feedback.tipo === "success" ? "#3a6b00" : "#B91C1C", fontWeight: 600 }}>
          {feedback.mensagem}
        </div>
      )}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
        <PreviewPanel previewUrl={previewUrl} titulo={titulo} />
        <UploadZone file={file} onFileChange={handleFileChange} isReady={canSubmit} />
        <ObraForm titulo={titulo} descricao={descricao} anoProducao={anoProducao} isSubmitting={isSubmitting} canSubmit={canSubmit} onTituloChange={setTitulo} onDescricaoChange={setDescricao} onAnoChange={setAnoProducao} onSubmit={handleSubmit} />
      </div>
    </div>
  );
}

function LinkTab({ tipo }: { tipo: "AUDIO_SPOTIFY" | "VIDEO_YOUTUBE" }) {
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
      const token = localStorage.getItem("token");
      const payload = { titulo, descricao, urlMidia, tipo: tipo === "AUDIO_SPOTIFY" ? "AUDIO" : "VIDEO" };

      const response = await fetch("http://localhost:8080/obras", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        body: JSON.stringify(payload)
      });

      if (!response.ok) throw new Error("Erro na submissão");

      setFeedback({ tipo: "success", mensagem: "Conteúdo publicado com sucesso!" });
      setTitulo(""); setUrlMidia(""); setDescricao("");
    } catch (error) {
      setFeedback({ tipo: "error", mensagem: "Ocorreu um erro ao registar a hiperligação." });
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

function UsuariosTab() {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div style={{ maxWidth: 360, background: "#fff", borderRadius: 8, boxShadow: "0 1px 2px rgba(0,0,0,0.05)", padding: 48, textAlign: "center" }}>
        <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, fontWeight: 700, textTransform: "uppercase", color: "#000", marginBottom: 8 }}>Gerenciamento de Usuários</p>
        <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: "#444748", lineHeight: "18px", margin: 0 }}>Aqui poderá criar acessos para outros artistas. Em breve.</p>
      </div>
    </div>
  );
}

// ============================================================================
// 4. ESTRUTURA PRINCIPAL (DASHBOARD)
// ============================================================================

export function Dashboard() {
  const [activeTab, setActiveTab] = useState("IMAGEM");

  return (
    <div style={{ minHeight: "100vh", background: "#F8F9FA", display: "flex", flexDirection: "column" }}>
      <AdminHeader />
      <main style={{ flex: 1, maxWidth: 1440, margin: "0 auto", width: "100%" }}>

        <div style={{ padding: "40px 32px 16px", textAlign: "center" }}>
          <h1 style={{ fontFamily: "'Source Code Pro', 'JetBrains Mono', monospace", fontWeight: 700, fontSize: 84, lineHeight: "96px", letterSpacing: "-0.01em", textTransform: "uppercase", margin: 0 }}>
            <span style={{ color: "#4A4A49" }}>Painel</span>
            <br />
            <span style={{ color: "#7C5639" }}>Administrativo</span>
          </h1>
        </div>

        <div style={{ padding: "16px 32px 32px", display: "flex", justifyContent: "center" }}>
          <TabNav activeTab={activeTab} onChange={setActiveTab} />
        </div>

        <div style={{ padding: "0 32px 64px" }}>
          {activeTab === "IMAGEM" && <ImagemTab />}
          {activeTab === "MUSICAS" && <LinkTab tipo="AUDIO_SPOTIFY" />}
          {activeTab === "VIDEOS" && <LinkTab tipo="VIDEO_YOUTUBE" />}
          {activeTab === "USUARIOS" && <UsuariosTab />}
        </div>
      </main>
      <AdminFooter />
    </div>
  );
}