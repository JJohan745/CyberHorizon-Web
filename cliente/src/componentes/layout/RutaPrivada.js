// Cliente/src/componentes/layout/RutaPrivada.js
import React from "react";
import { Navigate } from "react-router-dom";

function RutaPrivada({ children, rol }) {
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  // Si no hay usuario, redirige al login
  if (!usuario) {
    return <Navigate to="/login" replace />;
  }

  // Si se especifica un rol y no coincide, redirige al inicio
  if (rol && usuario.rol !== rol) {
    return <Navigate to="/inicio" replace />;
  }

  // Si pasa todas las validaciones, renderiza la página
  return children;
}

export default RutaPrivada;

