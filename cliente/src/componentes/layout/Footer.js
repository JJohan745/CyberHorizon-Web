// Cliente/src/componentes/layout/Footer.js
import React from "react";
import "../../estilos/layout/Footer.css";

function Footer() {
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  return (
    <footer className="footer-simple">
      <div className="footer-usuario">
        {usuario ? `Usuario: ${usuario.nombres}` : ""}
      </div>
      <div className="footer-texto">
        CyberHorizon &copy; {new Date().getFullYear()}
      </div>
    </footer>
  );
}

export default Footer;

