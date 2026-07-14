export function Footer() {
  const anoAtual = new Date().getFullYear();

  return (
    <footer className="border-t border-black/5 bg-footer py-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-2 px-6 text-center">
        <p className="font-display text-2xl font-black uppercase tracking-[-1px] text-ink">
          Nós Temos Nós Mesmos
        </p>
        <p className="font-body text-sm text-body">
          © {anoAtual} Maylson Dev. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
