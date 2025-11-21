import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PaginaEntrada from "./componentes/PaginaEntrada";
import Login from "./componentes/autenticación/Login";
import Registro from "./componentes/autenticación/Registro";
import RutaPrivada from "./componentes/layout/RutaPrivada";
import Inicio from "./componentes/paginas/Inicio";
import Cursos from "./componentes/paginas/Cursos";
import Perfil from "./componentes/paginas/Perfil";
import CursosProgreso from "./componentes/paginas/CursosProgreso";
import Ayuda from "./componentes/paginas/Ayuda";
import Administrador from "./componentes/paginas/Administrador";
import Layout from "./componentes/layout/Layout";

function App() {
  return (
    <Router>
      <Routes>
        {/* Páginas públicas */}
        <Route path="/" element={<PaginaEntrada />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />

        {/* Páginas privadas protegidas */}
        <Route path="/inicio" element={<RutaPrivada><Layout><Inicio /></Layout></RutaPrivada>}/>
        <Route path="/cursos" element={<RutaPrivada><Layout><Cursos /></Layout></RutaPrivada>}/>
        <Route path="/perfil" element={<RutaPrivada><Layout><Perfil /></Layout></RutaPrivada>}/>
        <Route path="/cursos-en-progreso" element={<RutaPrivada><Layout><CursosProgreso /></Layout></RutaPrivada>}/>
        <Route path="/ayuda" element={<RutaPrivada><Layout><Ayuda /></Layout></RutaPrivada>}/>
        <Route path="/administrador" element={<RutaPrivada rol="admin"><Layout><Administrador /></Layout></RutaPrivada>}/>
      </Routes>
    </Router>
  );
}

export default App;



