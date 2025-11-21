// Cliente/src/componentes/layout/Layout.js
import React from "react";
import Header from "./Header";
import PanelLateral from "./PanelLateral";
import Footer from "./Footer";
import "../../estilos/layout/Layout.css";

function Layout({ children }) {
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  return (
    <div className="layout-container">
      <Header />
      <div className="contenido-principal">
        <PanelLateral rol={usuario?.rol} />
        <div className="contenido">{children}</div>
      </div>
      <Footer />
    </div>
  );
}

export default Layout;


