import { Link } from "react-router-dom";
import { Badge } from "../ui/Badge";
import capaPrincipal from "../../assets/capa-principal.jpg";

interface HeroProps {
  totalObras: number;
  carregando: boolean;
}

export function Hero({ totalObras, carregando }: HeroProps) {
  return (
    <section className="mx-auto max-w-7xl px-6 pt-16 pb-20 lg:px-10 lg:pt-24">
      <div className="grid items-center gap-16 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <Badge>Portfólio Digital 2026</Badge>

          <h1 className="mt-6 font-display text-5xl font-black uppercase leading-[0.95] tracking-[-2px] text-ink sm:text-6xl lg:text-7xl">
            <span className="text-terracotta">Conheça</span> os projetos de{" "}
            <span className="text-terracotta">Nós Temos Nós Mesmos</span>
          </h1>

          <p className="mt-8 max-w-md font-body text-lg font-light text-body">
            Exploração de estéticas urbanas, design de personagens e texturas
            de arte de rua. Uma fusão de movimento, música e ilustração
            digital.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-6">
            <a
              href="#galeria"
              className="rounded-md bg-ink px-12 py-5 font-display text-lg font-black text-white transition-opacity hover:opacity-90"
            >
              Ver Trabalhos
            </a>
            <Link
              to="/sobre"
              className="rounded-md border-2 border-ink px-12 py-5 font-display text-lg font-black text-ink transition-opacity hover:opacity-70"
            >
              Sobre Mim
            </Link>
          </div>

          <div className="mt-12 flex gap-16">
            <div>
              <p className="font-display text-4xl font-bold text-ochre">
                {carregando ? "—" : `${totalObras}+`}
              </p>
              <p className="mt-1 font-body text-sm font-black uppercase tracking-[1.4px] text-body">
                Projetos
              </p>
            </div>
            <div>
              <p className="font-display text-4xl font-bold text-teal">12k</p>
              <p className="mt-1 font-body text-sm font-black uppercase tracking-[1.4px] text-body">
                Seguidores
              </p>
            </div>
          </div>
        </div>

        <div className="aspect-square overflow-hidden rounded-3xl">
          <img
            src={capaPrincipal}
            alt="Capa principal de Nós Temos Nós Mesmos"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
