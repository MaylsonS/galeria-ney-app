export function AdminFooter() {
  return (
    <footer style={{ background: "#F3F4F5", borderTop: "1px solid rgba(0,0,0,0.05)", marginTop: "auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", height: 90, padding: "0 24px", maxWidth: 1440, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
          <span style={{ fontFamily: "'Montserrat', 'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 18, letterSpacing: "-0.45px", textTransform: "uppercase", color: "#000" }}>Nós Temos Nós Mesmos</span>
          <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 11, letterSpacing: "0.55px", textTransform: "uppercase", color: "#7C5639" }}>— Portfólio &amp; Arquivo</span>
        </div>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: "#444748", margin: 0 }}>© {new Date().getFullYear()} Maylson da Silva Rodrigues. All Rights Reserved.</p>
      </div>
    </footer>
  );
}