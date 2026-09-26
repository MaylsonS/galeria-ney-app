import { Link } from "react-router-dom";

export function AdminHeader() {
  return (
    <header style={{ position: "sticky", top: 0, zIndex: 50, width: "100%", background: "rgba(248,249,250,0.9)", backdropFilter: "blur(6px)", boxShadow: "0 1px 8px rgba(0,0,0,0.04)", borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 64, padding: "0 24px", maxWidth: 1440, margin: "0 auto" }}>
        <Link to="/" style={{ fontFamily: "'Montserrat', 'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 18, letterSpacing: "-0.45px", textTransform: "uppercase", color: "#000", textDecoration: "none" }}>
          Nós Temos Nós Mesmos
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#EDEEEF", borderRadius: 9999, padding: "4px 12px", fontSize: 11, fontWeight: 600, letterSpacing: "0.22px", color: "#444748" }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#000", display: "inline-block" }} />
            Online
          </span>
          <button style={{ width: 32, height: 32, borderRadius: "50%", background: "#000", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }} title="Perfil">
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><circle cx="6.5" cy="3.5" r="2.5" stroke="white" strokeWidth="1.3" /><path d="M1.5 12c0-2.485 2.239-4.5 5-4.5s5 2.015 5 4.5" stroke="white" strokeWidth="1.3" strokeLinecap="round" /></svg>
          </button>
        </div>
      </div>
    </header>
  );
}