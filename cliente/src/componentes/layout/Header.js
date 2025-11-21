// Cliente/src/componentes/layout/Header.js
import React from "react";
import "../../estilos/layout/Header.css"; 

function Header() {
  return (
    <header className="header-simple">
      <img
        src={require("../../archivos/logo.png")}
        alt="CyberHorizon Logo"
        className="logo-header"
      />
      <h1 className="nombre-header">CyberHorizon</h1>
    </header>
  );
}

export default Header;

