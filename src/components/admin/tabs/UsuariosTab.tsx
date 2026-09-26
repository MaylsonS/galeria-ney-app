import { useEffect, useState, useRef, DragEvent } from "react";
import api from "../../../services/api";
import { LABEL, INPUT, COL_HEADER } from "../AdminStyles";

export function UsuariosTab() {
  const [usuarios, setUsuarios] = useState<any[]>([]);
  const [modalAberto, setModalAberto] = useState(false);
  const [usuarioEditandoId, setUsuarioEditandoId] = useState<string | null>(null);

  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");
  const [role, setRole] = useState("USER");
  const [descricao, setDescricao] = useState("");

  const [fotoFile, setFotoFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const [salvando, setSalvando] = useState(false);

  useEffect(() => {
    carregarUsuarios();
  }, []);

  async function carregarUsuarios() {
    try {
      const response = await api.get("/artistas");
      setUsuarios(response.data);
    } catch (error) {
      console.error("Erro ao carregar usuários", error);
    }
  }

  function abrirModalCriacao() {
    setUsuarioEditandoId(null);
    setLogin(""); setSenha(""); setRole("USER"); setDescricao("");
    setFotoFile(null); setPreviewUrl(null);
    setModalAberto(true);
  }

  function abrirModalEdicao(usuario: any) {
    setUsuarioEditandoId(usuario.id);
    setLogin(usuario.login);
    setSenha(""); // A senha vem vazia por segurança. Se digitar, ela atualiza.
    setRole(usuario.role || "USER");
    setDescricao(usuario.descricao || "");
    setFotoFile(null);
    setPreviewUrl(usuario.fotoPerfil || null);
    setModalAberto(true);
  }

  function fecharModal() {
    setModalAberto(false);
    setUsuarioEditandoId(null);
    setPreviewUrl(null);
    setFotoFile(null);
  }

  function handleFileChange(novoArquivo: File) {
    if (!novoArquivo.type.startsWith("image/")) {
      alert("Por favor, selecione apenas arquivos de imagem.");
      return;
    }
    const url = URL.createObjectURL(novoArquivo);
    setFotoFile(novoArquivo);
    setPreviewUrl(url);
  }

  function handleDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragging(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped && dropped.type.startsWith("image/")) handleFileChange(dropped);
  }

  async function handleSalvarUsuario() {
    // Se for criação, a senha é obrigatória. Se for edição, a senha é opcional.
    if (!login.trim()) return;
    if (!usuarioEditandoId && !senha.trim()) return;

    setSalvando(true);

    try {
      const formData = new FormData();
      formData.append("login", login);
      formData.append("role", role);
      if (senha) formData.append("senha", senha);
      if (descricao) formData.append("descricao", descricao);
      if (fotoFile) formData.append("foto", fotoFile);

      if (usuarioEditandoId) {
        // Fluxo de Edição
        await api.put(`/auth/usuarios/${usuarioEditandoId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        // Fluxo de Criação
        await api.post("/auth/register", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      fecharModal();
      carregarUsuarios();
    } catch (error) {
      alert("Erro ao salvar usuário. Verifique os dados e tente novamente.");
    } finally {
      setSalvando(false);
    }
  }

  function formatarNome(email: string) {
    if (!email) return "Usuário";
    const parteNome = email.split('@')[0];
    return parteNome.split(/[._-]/).map(p => p.charAt(0).toUpperCase() + p.slice(1)).join(' ');
  }

  const isFormValido = login.trim() !== "" && (usuarioEditandoId ? true : senha.trim() !== "");

  return (
    <div style={{ width: "100%", background: "#fff", borderRadius: 8, border: "1px solid #EAEAEA", overflow: "hidden" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 24px", borderBottom: "1px solid #EAEAEA" }}>
        <div style={{ flex: 1 }} />
        <h2 style={{ flex: 1, textAlign: "center", fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 800, letterSpacing: "1px", textTransform: "uppercase", margin: 0 }}>Gerenciamento de Usuários</h2>
        <div style={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
          <button onClick={abrirModalCriacao} style={{ background: "#000", color: "#fff", border: "none", padding: "10px 16px", borderRadius: 6, fontWeight: 700, fontSize: 11, cursor: "pointer" }}>+ NOVO USUÁRIO</button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "2fr 2.5fr 1fr 1.5fr", padding: "16px 24px", borderBottom: "1px solid #EAEAEA", background: "#FAFAFA" }}>
        <span style={{ fontSize: 11, fontWeight: 700, color: "#666", letterSpacing: "0.5px" }}>NOME</span>
        <span style={{ fontSize: 11, fontWeight: 700, color: "#666", letterSpacing: "0.5px" }}>E-MAIL</span>
        <span style={{ fontSize: 11, fontWeight: 700, color: "#666", letterSpacing: "0.5px" }}>ACESSO</span>
        <span style={{ fontSize: 11, fontWeight: 700, color: "#666", letterSpacing: "0.5px", textAlign: "right" }}>AÇÕES</span>
      </div>

      {usuarios.map(u => (
        <div key={u.id} style={{ display: "grid", gridTemplateColumns: "2fr 2.5fr 1fr 1.5fr", padding: "20px 24px", borderBottom: "1px solid #EAEAEA", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#F5F5F5", overflow: "hidden", border: "1px solid #EAEAEA" }}>
              {u.fotoPerfil ? <img src={u.fotoPerfil} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <span style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", fontSize: 12, color: "#999" }}>?</span>}
            </div>
            <span style={{ fontSize: 14, fontWeight: 700, color: "#111" }}>{formatarNome(u.login)}</span>
          </div>
          <span style={{ fontSize: 14, color: "#555" }}>{u.login}</span>
          <div><span style={{ background: "#F0F0F0", padding: "6px 12px", borderRadius: 12, fontSize: 12, fontWeight: 700, color: "#111", textTransform: "capitalize" }}>{u.role === "ADMIN" ? "Admin" : "User"}</span></div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 36, height: 20, background: "#000", borderRadius: 10, position: "relative" }}><div style={{ width: 16, height: 16, background: "#fff", borderRadius: "50%", position: "absolute", top: 2, right: 2 }} /></div>
              <span style={{ fontSize: 11, fontWeight: 700, color: "#111" }}>ATIVO</span>
            </div>
            <button onClick={() => abrirModalEdicao(u)} style={{ border: "1px solid #EAEAEA", background: "transparent", padding: "6px 16px", borderRadius: 16, fontSize: 11, fontWeight: 700, cursor: "pointer", color: "#444" }}>✏️ EDITAR</button>
          </div>
        </div>
      ))}

      <div style={{ display: "flex", justifyContent: "space-between", padding: "20px 24px", background: "#FAFAFA" }}>
        <span style={{ fontSize: 11, fontWeight: 700, color: "#666", letterSpacing: "0.5px" }}>{usuarios.length} USUÁRIOS REGISTRADOS</span>
        <span style={{ fontSize: 11, fontWeight: 800, color: "#8B5E34", letterSpacing: "0.5px" }}>CONTROLE DE ACESSO SINCRONIZADO</span>
      </div>

      {modalAberto && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(2px)", padding: 20 }}>
          <div style={{ background: "#fff", width: "100%", maxWidth: 800, maxHeight: "90vh", overflowY: "auto", borderRadius: 12, padding: 32, boxShadow: "0 10px 25px rgba(0,0,0,0.1)", display: "flex", gap: 32 }}>

            {/* Coluna Esquerda: Formulário */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 16 }}>
              <h3 style={{ margin: "0 0 8px", fontSize: 18, fontWeight: 800, fontFamily: "'Inter', sans-serif" }}>
                {usuarioEditandoId ? "Editar Usuário" : "Novo Usuário"}
              </h3>
              <div><label style={LABEL}>E-mail de Acesso</label><input style={{...INPUT, border: "1px solid #EAEAEA"}} value={login} onChange={e => setLogin(e.target.value)} placeholder="email@dominio.com" /></div>

              <div>
                <label style={LABEL}>Senha</label>
                <input style={{...INPUT, border: "1px solid #EAEAEA"}} type="password" value={senha} onChange={e => setSenha(e.target.value)} placeholder={usuarioEditandoId ? "Deixe em branco para não alterar" : "••••••••"} />
              </div>

              <div>
                <label style={LABEL}>Foto de Perfil</label>
                <div
                  onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={handleDrop}
                  onClick={() => inputRef.current?.click()}
                  style={{ height: 100, borderRadius: 8, background: isDragging ? "#EDEEEF" : "#F8F9FA", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", cursor: "pointer", border: isDragging ? "2px dashed #000" : "1px solid #EAEAEA" }}
                >
                  {fotoFile ? (
                    <span style={{ fontSize: 13, fontWeight: 700, color: "#000" }}>{fotoFile.name}</span>
                  ) : (
                    <span style={{ fontSize: 12, color: "#444" }}>Arraste uma foto ou clique</span>
                  )}
                </div>
                <input ref={inputRef} type="file" accept="image/png,image/jpeg,image/jpg" style={{ display: "none" }} onChange={(e) => { if (e.target.files?.[0]) handleFileChange(e.target.files[0]); }} />
              </div>

              <div><label style={LABEL}>Descrição / Bio</label><textarea style={{...INPUT, border: "1px solid #EAEAEA", height: "auto", padding: "11px 12px", resize: "none"}} rows={3} value={descricao} onChange={e => setDescricao(e.target.value)} placeholder="Fale um pouco sobre o artista..." /></div>
              <div><label style={LABEL}>Permissão (Role)</label><select style={{...INPUT, border: "1px solid #EAEAEA"}} value={role} onChange={e => setRole(e.target.value)}><option value="USER">Usuário (User)</option><option value="ADMIN">Administrador (Admin)</option></select></div>

              <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
                <button onClick={fecharModal} style={{ flex: 1, padding: "12px", background: "#F3F4F5", border: "none", borderRadius: 8, fontWeight: 700, cursor: "pointer" }}>Cancelar</button>
                <button onClick={handleSalvarUsuario} disabled={salvando || !isFormValido} style={{ flex: 1, padding: "12px", background: "#000", color: "#fff", border: "none", borderRadius: 8, fontWeight: 700, cursor: "pointer", opacity: (!isFormValido || salvando) ? 0.5 : 1 }}>
                  {salvando ? "Salvando..." : (usuarioEditandoId ? "Salvar Alterações" : "Criar Usuário")}
                </button>
              </div>
            </div>

            {/* Coluna Direita: Preview do Perfil */}
            <div style={{ flex: 1, background: "#FAFAFA", borderRadius: 12, border: "1px solid #EAEAEA", padding: 32, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
              <p style={COL_HEADER}>Preview do Perfil</p>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 24, width: "100%", marginTop: 16 }}>
                <div style={{ width: 180, height: 180, borderRadius: "50%", background: "#EAEAEA", overflow: "hidden", boxShadow: "0 10px 25px rgba(0,0,0,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {previewUrl ? (
                    <img src={previewUrl} alt="Preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  ) : (
                    <span style={{ fontSize: 12, color: "#999" }}>Sem Foto</span>
                  )}
                </div>
                <div style={{ textAlign: "center" }}>
                  <h3 style={{ fontFamily: "'Abril Fatface', serif", fontSize: 28, color: "#1C1B1B", margin: 0, textTransform: "uppercase" }}>
                    {formatarNome(login)} <span style={{ color: "#A67B5B" }}>PROJETOS</span>
                  </h3>
                  <p style={{ fontFamily: "'Manrope', sans-serif", fontSize: 14, color: "#4A4A49", marginTop: 12, lineHeight: "1.6", maxWidth: 280, marginInline: "auto", wordBreak: "break-word" }}>
                    {descricao || "A biografia do artista aparecerá aqui na página pública."}
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}