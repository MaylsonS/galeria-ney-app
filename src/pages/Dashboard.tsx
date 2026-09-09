import { useState, useRef, FormEvent, DragEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import { criarObraImagem } from "../services/obraService";

export function Dashboard() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Estados do formulário e UI
  const [arquivo, setArquivo] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  // --- Handlers de Drag and Drop ---
  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processarArquivo(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processarArquivo(e.target.files[0]);
    }
  };

  const processarArquivo = (file: File) => {
    if (!file.type.startsWith("image/")) {
      setErro("Por favor, selecione apenas arquivos de imagem.");
      return;
    }
    setArquivo(file);
    setPreviewUrl(URL.createObjectURL(file));
    setErro(null);
  };

  // --- Handler de Submit Integrado com seu Service ---
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!arquivo) {
      setErro("Você precisa selecionar uma imagem para fazer o upload.");
      return;
    }
    if (!titulo.trim()) {
      setErro("O título é obrigatório.");
      return;
    }

    setSalvando(true);
    setErro(null);

    try {
      // Cria a estrutura que o Axios enviará como multipart/form-data
      const formData = new FormData();
      formData.append("titulo", titulo);
      formData.append("descricao", descricao);
      formData.append("arquivo", arquivo);

      await criarObraImagem(formData);

      alert("Obra publicada com sucesso!");

      // Limpar formulário
      setArquivo(null);
      setPreviewUrl(null);
      setTitulo("");
      setDescricao("");

      // Opcional: Voltar para a galeria do artista
      // navigate("/galeria");
    } catch (error: any) {
      // Pega a mensagem de erro do backend (TratadorDeErros do Spring Boot)
      const mensagemErro = error.response?.data?.[0]?.mensagem || "Erro inesperado ao salvar a obra.";
      setErro(mensagemErro);
    } finally {
      setSalvando(false);
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-[#1a1a1a] pb-16">
      {/* HEADER SIMPLIFICADO */}
      <header className="flex justify-between items-center py-4 px-8 border-b border-gray-200">
        <Link
          to="/"
          className="font-bold uppercase tracking-wide text-sm hover:text-[#a67c66] transition-colors cursor-pointer"
        >
          Nós Temos Nós Mesmos
        </Link>
        <div className="flex items-center gap-4">
          <span className="flex items-center text-xs font-medium text-gray-500 uppercase tracking-widest">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span> Online
          </span>
          <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center text-white">
             <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-8 mt-12">
        {/* TÍTULO */}
        <h1 className="text-6xl md:text-7xl font-black uppercase leading-none text-[#5c6e61]">
          Painel <br />
          <span className="text-[#a67c66]">Administrativo</span>
        </h1>

        {/* ABAS DE NAVEGAÇÃO */}
        <div className="flex gap-4 mt-12 mb-16 border-b border-gray-200 pb-1">
          <button className="bg-black text-white px-6 py-3 rounded-t-md text-xs font-bold tracking-widest flex items-center gap-2">
            <span className="w-3 h-3 bg-white block"></span> IMAGEM
          </button>
          <button className="bg-gray-50 text-gray-400 px-6 py-3 rounded-t-md text-xs font-bold tracking-widest flex items-center gap-2 hover:bg-gray-100 hover:text-gray-600 transition">
            MÚSICAS
          </button>
          <button className="bg-gray-50 text-gray-400 px-6 py-3 rounded-t-md text-xs font-bold tracking-widest flex items-center gap-2 hover:bg-gray-100 hover:text-gray-600 transition">
            VÍDEOS
          </button>
          <button className="bg-gray-50 text-gray-400 px-6 py-3 rounded-t-md text-xs font-bold tracking-widest flex items-center gap-2 hover:bg-gray-100 hover:text-gray-600 transition">
            USUÁRIOS
          </button>
        </div>

        {erro && (
          <div className="mb-8 p-4 bg-red-50 text-red-700 font-medium border border-red-200 rounded text-sm">
            {erro}
          </div>
        )}

        {/* GRID PRINCIPAL (3 COLUNAS) */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* COLUNA 1: PREVIEW */}
          <div className="flex flex-col">
            <h3 className="text-[11px] font-bold uppercase tracking-widest text-center mb-6 text-black">Preview do Conteúdo</h3>
            <div className="bg-gray-100 flex-1 aspect-[3/4] flex flex-col relative overflow-hidden rounded-md border border-gray-200">
              {previewUrl ? (
                <>
                  <img src={previewUrl} alt="Preview" className="absolute inset-0 w-full h-full object-cover p-4 shadow-sm" />
                  <div className="relative mt-auto z-10 bg-black/80 backdrop-blur-sm p-5 text-white w-full border-t-4 border-gray-600">
                    <p className="text-[9px] uppercase tracking-widest text-[#a67c66] mb-1 font-bold">Série Manifesto</p>
                    <h4 className="font-medium text-lg leading-tight truncate">{titulo || "Título da Obra"}</h4>
                    <p className="text-[10px] text-gray-400 mt-1">3500 × 4375 px • 300 DPI</p>
                  </div>
                </>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm font-medium">
                  Nenhuma imagem<br/>selecionada
                </div>
              )}
            </div>
            {/* Indicadores Visuais do Protótipo */}
            <div className="flex justify-center gap-1 mt-4">
               <span className="w-2 h-2 rounded-full bg-black"></span>
               <span className="w-2 h-2 rounded-full border border-black"></span>
               <span className="w-2 h-2 rounded-full border border-black"></span>
               <span className="w-2 h-2 rounded-full border border-black"></span>
            </div>
            <div className="flex justify-between text-[9px] font-bold text-gray-400 mt-4 tracking-widest uppercase">
              <span>Enquadramento: 4:5 Poster</span>
              <span>1 de 4 Matrizes</span>
            </div>
          </div>

          {/* COLUNA 2: DROPZONE */}
          <div className="flex flex-col">
            <h3 className="text-[11px] font-bold uppercase tracking-widest text-center mb-6 text-black">Upload de Imagem</h3>
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`flex-1 flex flex-col items-center justify-center p-8 bg-gray-50 transition-colors
                ${isDragging ? "border-2 border-black bg-gray-100" : "border border-transparent"}`}
            >
              <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mb-6 text-black">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 19V5"/><path d="M5 12l7-7 7 7"/></svg>
              </div>
              <p className="font-medium text-sm text-center text-black mb-1">Arraste e solte arquivos aqui</p>
              <p className="text-[11px] text-gray-400 text-center mb-10">Formatos: PNG, JPG, JPEG (máx. 10MB)</p>

              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                accept="image/png, image/jpeg, image/jpg"
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="bg-white border border-gray-200 px-6 py-3 text-[10px] font-bold tracking-widest shadow-sm hover:border-black transition uppercase text-black"
              >
                Selecionar Arquivo
              </button>
            </div>
            {/* Indicadores Visuais do Protótipo */}
            <div className="flex justify-between text-[9px] font-bold text-gray-400 mt-12 tracking-widest uppercase border-t border-gray-200 pt-4">
              <span>Protocolo: RAW-ARCH-01</span>
              <span>Pronto para envio</span>
            </div>
          </div>

          {/* COLUNA 3: FORMULÁRIO */}
          <div className="flex flex-col">
            <h3 className="text-[11px] font-bold uppercase tracking-widest text-center mb-6 text-black">Detalhes do Conteúdo</h3>
            <div className="flex flex-col gap-6 flex-1">

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-black mb-3">Título</label>
                <input
                  type="text"
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                  placeholder="Ex: Construção e Afeto em Chumbo"
                  className="w-full bg-gray-50 border border-gray-100 p-3 focus:outline-none focus:border-black focus:bg-white transition text-sm text-black"
                  required
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-black mb-3">Ano de Produção</label>
                <input
                  type="text"
                  placeholder="2024"
                  className="w-1/3 bg-gray-50 border border-gray-100 p-3 focus:outline-none focus:border-black focus:bg-white transition text-sm text-black"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-black mb-3">Descrição</label>
                <textarea
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                  placeholder="Estudo sobre a densidade matérica e as tensões políticas da permanência espacial nas periferias urbanas..."
                  rows={5}
                  className="w-full bg-transparent border border-transparent p-0 focus:outline-none text-sm resize-none text-gray-600 leading-relaxed"
                />
              </div>

              <div className="mt-auto">
                <button
                  type="submit"
                  disabled={salvando}
                  className="w-full bg-black text-white py-4 text-[11px] font-bold tracking-widest uppercase flex justify-center items-center gap-2 hover:bg-[#a67c66] transition-colors disabled:opacity-50 rounded-md"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                  {salvando ? "Publicando..." : "Salvar e Publicar"}
                </button>
                <p className="text-[9px] text-center text-gray-500 mt-4 uppercase tracking-widest font-bold">
                  Certificação em Registro • Licença Coletiva
                </p>
              </div>

            </div>
          </div>

        </form>
      </main>

      {/* FOOTER */}
      <footer className="max-w-7xl mx-auto px-8 mt-24 border-t border-gray-200 pt-6 flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-gray-400">
        <span className="text-black">Nós Temos Nós Mesmos <span className="text-gray-400 font-normal ml-2">— Portfólio & Arquivo</span></span>
        <span>© 2026 Maylson Dev. All Rights Reserved.</span>
      </footer>
    </div>
  );
}