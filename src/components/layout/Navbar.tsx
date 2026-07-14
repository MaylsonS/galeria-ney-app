import { Link } from "react-router-dom";

interface NavLink {
  label: string;
  to: string;
}

const LINKS: NavLink[] = [
  { label: "Arte", to: "/galeria?tipo=IMAGEM" },
  { label: "Vídeos", to: "/galeria?tipo=VIDEO_YOUTUBE" },
  { label: "Música", to: "/galeria?tipo=AUDIO_SPOTIFY" },
  { label: "Sobre", to: "/sobre" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-white/80 backdrop-blur-sm">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">
        <Link
          to="/"
          className="font-display text-xl font-black uppercase tracking-[-1px] text-ochre sm:text-2xl"
        >
          Nós Temos Nós Mesmos
        </Link>

        <nav className="hidden items-center gap-10 md:flex">
          {LINKS.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className="font-display text-base font-bold text-ink transition-opacity hover:opacity-70"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          to="/login"
          className="rounded-full bg-[#232020] px-6 py-2 font-body text-sm font-bold text-[#E9E3E3] transition-opacity hover:opacity-90"
        >
          Login
        </Link>
      </div>
    </header>
  );
}
