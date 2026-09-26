import { useState } from "react";
import { AdminHeader } from "../components/admin/AdminHeader";
import { AdminFooter } from "../components/admin/AdminFooter";
import { TabNav } from "../components/admin/TabNav";
import { ImagemTab } from "../components/admin/tabs/ImagemTab";
import { LinkTab } from "../components/admin/tabs/LinkTab";
import { UsuariosTab } from "../components/admin/tabs/UsuariosTab";

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