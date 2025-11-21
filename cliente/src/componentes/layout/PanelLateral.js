import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHome, FaBook, FaChartLine, FaUser, FaQuestionCircle, FaSignOutAlt } from "react-icons/fa";
import { MdAdminPanelSettings, MdMenu } from "react-icons/md";
import "../../estilos/layout/PanelLateral.css";

function PanelLateral({ rol }) {
  const [abierto, setAbierto] = useState(true);
  const navigate = useNavigate();

  const toggleSidebar = () => setAbierto(!abierto);

  const cerrarSesion = () => {
    // Eliminamos usuario y token del localStorage
    localStorage.removeItem("usuario");
    localStorage.removeItem("token");
    navigate("/"); // Redirige a la página de entrada
  };

  return (
    <div className={`sidebar ${abierto ? "open" : "closed"}`}>
      <button className="toggle-btn" onClick={toggleSidebar}>
        <MdMenu size={24} />
      </button>

      {abierto && (
        <ul>
          <li><Link to="/inicio"><FaHome /> Inicio</Link></li>
          <li><Link to="/cursos"><FaBook /> Cursos</Link></li>
          <li><Link to="/perfil"><FaUser /> Perfil</Link></li>
          <li><Link to="/cursos-en-progreso"><FaChartLine /> Cursos en Progreso</Link></li>
          <li><Link to="/ayuda"><FaQuestionCircle /> Ayuda</Link></li>
          {rol === "admin" && <li><Link to="/administrador"><MdAdminPanelSettings /> Administrador</Link></li>}
          <li 
            onClick={cerrarSesion} 
            style={{ cursor: "pointer", display: "flex", alignItems: "center" }}
          >
            <FaSignOutAlt style={{ marginRight: "0.75rem" }} /> Cerrar Sesión
          </li>
        </ul>
      )}
    </div>
  );
}

export default PanelLateral;

