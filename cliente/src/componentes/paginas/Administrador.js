// Cliente/src/componentes/paginas/Administrador.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUsers, FaBook, FaUserCheck, FaCheckCircle } from "react-icons/fa";
import "../../estilos/Administrador.css";

function Administrador() {
  const navigate = useNavigate();

  const [totalUsuarios, setTotalUsuarios] = useState(0);
  const [usuariosActivos, setUsuariosActivos] = useState(0);

  // --- Fetch de estadísticas desde backend ---
  useEffect(() => {
    const fetchTotalUsuarios = async () => {
      try {
        const res = await fetch("http://localhost:3001/api/total-usuarios");
        const data = await res.json();
        setTotalUsuarios(data.totalUsuarios);
      } catch (err) {
        console.error("Error al obtener total de usuarios:", err);
      }
    };

    const fetchUsuariosActivos = async () => {
      try {
        const res = await fetch("http://localhost:3001/api/usuarios-activos");
        const data = await res.json();
        setUsuariosActivos(data.usuariosActivos);
      } catch (err) {
        console.error("Error al obtener usuarios activos:", err);
      }
    };

    fetchTotalUsuarios();
    fetchUsuariosActivos();

    // Actualizar usuarios activos cada 5 segundos
    const interval = setInterval(() => {
      fetchUsuariosActivos();
    }, 5000);

    return () => clearInterval(interval); // limpiar interval al desmontar
  }, []);

  const estadisticas = [
    { titulo: "Total Usuarios", valor: totalUsuarios, icono: <FaUsers /> },
    { titulo: "Total Cursos", valor: 12, icono: <FaBook /> }, // dato estático
    { titulo: "Usuarios Activos", valor: usuariosActivos, icono: <FaUserCheck /> },
    { titulo: "Cursos Completados", valor: 45, icono: <FaCheckCircle /> }, // dato estático
  ];

  const paneles = [
    { nombre: "Panel de Usuarios", ruta: "/panel-usuarios" },
    { nombre: "Panel de Cursos", ruta: "/panel-cursos" },
    { nombre: "Panel de Encuestas", ruta: "/panel-encuestas" },
    { nombre: "Panel de Mensajes", ruta: "/panel-mensajes" },
    { nombre: "Estadísticas Avanzadas", ruta: "/estadisticas-avanzadas" },
  ];

  return (
    <div className="contenedor-admin">
      {/* Encabezado */}
      <div className="encabezado-admin">
        <h1 className="titulo-admin">Zona de Administrador</h1>
        <img
          src={require("../../archivos/logo.png")}
          alt="Logo"
          className="logo-admin"
        />
      </div>

      {/* Tarjetas de estadísticas */}
      <div className="tarjetas-estadisticas">
        {estadisticas.map((item, index) => (
          <div key={index} className="tarjeta">
            <div className="icono-tarjeta">{item.icono}</div>
            <h3>{item.titulo}</h3>
            <p>{item.valor}</p>
          </div>
        ))}
      </div>

      {/* Botones de panel */}
      <div className="botones-panel">
        {paneles.map((panel, index) => (
          <button
            key={index}
            className="boton-panel"
            onClick={() => navigate(panel.ruta)}
          >
            {panel.nombre}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Administrador;

