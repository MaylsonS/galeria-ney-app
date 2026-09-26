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
          <button key={tab.id} onClick={() => onChange(tab.id)} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, width: 131, height: 54, borderRadius: 8, border: "none", cursor: "pointer", background: isActive ? "#000" : "#F7F3F3", color: isActive ? "#fff" : "#444748", fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.55px", textTransform: "uppercase", boxShadow: "0 1px 2px rgba(0,0,0,0.05)", transition: "all 0.15s" }}>
            <span style={{ color: isActive ? "#fff" : "#444748" }}>{tab.icon}</span>
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}