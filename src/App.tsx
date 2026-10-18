import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Galeria } from "./pages/Galeria";
import { Sobre } from "./pages/Sobre";
import { ArtistaDetalhe } from "./pages/ArtistaDetalhe";
import { ArtistaGaleria } from "./pages/ArtistaGaleria";
import { ObraDetalhe } from "./pages/ObraDetalhe"; // <-- 1. Importe a nova tela
import { Dashboard } from "./pages/Dashboard";
import { PrivateRoute } from "./routes/PrivateRoute";

function App() {
  return (
    <Routes>
      {/* Rotas públicas: qualquer visitante acessa, sem login */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/galeria" element={<Galeria />} />
      <Route path="/sobre" element={<Sobre />} />
      <Route path="/artista/:id" element={<ArtistaDetalhe />} />

      <Route path="/artista/:id/galeria" element={<ArtistaGaleria />} />

      {/* 2. Adicione a rota da Obra Detalhada */}
            <Route path="/obra/:id" element={<ObraDetalhe />} />

      {/* Rota privada: Qualquer usuário logado (ADMIN ou USER) acessa o painel */}
      <Route element={<PrivateRoute />}>
        <Route path="/admin" element={<Dashboard />} />
      </Route>
    </Routes>
  );
}

export default App;