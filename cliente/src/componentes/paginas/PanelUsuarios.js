import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import "../../estilos/PanelUsuarios.css";

function PanelUsuarios() {
  const navegar = useNavigate();
  const [listaUsuarios, setListaUsuarios] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [busqueda, setBusqueda] = useState(""); // búsqueda
  const [paginaActual, setPaginaActual] = useState(1); // paginación
  const usuariosPorPagina = 5; // usuarios por página

  const token = localStorage.getItem("token");

  // --- Obtener usuarios ---
  useEffect(() => {
    const obtenerUsuarios = async () => {
      try {
        const res = await fetch("http://localhost:3001/api/usuarios", {
          headers: { "Authorization": `Bearer ${token}` },
        });
        const data = await res.json();
        setListaUsuarios(data.usuarios);
        setCargando(false);
      } catch (err) {
        console.error("Error al obtener usuarios:", err);
      }
    };
    obtenerUsuarios();
  }, [token]);

  // --- Cambiar rol ---
  const actualizarRol = async (idUsuario, nuevoRol) => {
    try {
      await fetch(`http://localhost:3001/api/usuarios/${idUsuario}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        body: JSON.stringify({ rol: nuevoRol }),
      });
      setListaUsuarios(prev =>
        prev.map(u => (u.id === idUsuario ? { ...u, rol: nuevoRol } : u))
      );
    } catch (err) {
      console.error("Error al actualizar rol:", err);
    }
  };

  // --- Activar / Desactivar usuario ---
  const cambiarEstado = async (idUsuario, activo) => {
    try {
      await fetch(`http://localhost:3001/api/usuarios/${idUsuario}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        body: JSON.stringify({ activo }),
      });
      setListaUsuarios(prev =>
        prev.map(u => (u.id === idUsuario ? { ...u, activo } : u))
      );
    } catch (err) {
      console.error("Error al actualizar estado:", err);
    }
  };

  // --- Eliminar usuario ---
  const eliminarUsuario = async (idUsuario) => {
    if (!window.confirm("¿Estás seguro de eliminar este usuario?")) return;
    try {
      await fetch(`http://localhost:3001/api/usuarios/${idUsuario}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` },
      });
      setListaUsuarios(prev => prev.filter(u => u.id !== idUsuario));
    } catch (err) {
      console.error("Error al eliminar usuario:", err);
    }
  };

  if (cargando) return <p>Cargando usuarios...</p>;

  // --- Filtrar usuarios ---
  const usuariosFiltrados = listaUsuarios.filter(u =>
    u.nombres.toLowerCase().includes(busqueda.toLowerCase()) ||
    u.apellidos.toLowerCase().includes(busqueda.toLowerCase()) ||
    u.correo.toLowerCase().includes(busqueda.toLowerCase())
  );

  // --- Paginación ---
  const indiceUltimo = paginaActual * usuariosPorPagina;
  const indicePrimero = indiceUltimo - usuariosPorPagina;
  const usuariosMostrados = usuariosFiltrados.slice(indicePrimero, indiceUltimo);
  const totalPaginas = Math.ceil(usuariosFiltrados.length / usuariosPorPagina);

  return (
    <div className="contenedor-panel-usuarios">
      <button className="btn-volver-panel" onClick={() => navegar("/administrador")}>
        <FaArrowLeft style={{ marginRight: "8px" }} />
      </button>

      <h2>Panel de Usuarios</h2>

      <input
        type="text"
        placeholder="Buscar por nombre, apellido o correo..."
        value={busqueda}
        onChange={(e) => {
          setBusqueda(e.target.value);
          setPaginaActual(1);
        }}
        className="input-busqueda-panel"
      />

      <table className="tabla-usuarios-panel">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombres</th>
            <th>Apellidos</th>
            <th>Correo</th>
            <th>Rol</th>
            <th>Activo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuariosMostrados.map(u => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.nombres}</td>
              <td>{u.apellidos}</td>
              <td>{u.correo}</td>
              <td>
                <select
                  value={u.rol}
                  onChange={(e) => actualizarRol(u.id, e.target.value)}
                >
                  <option value="admin">Admin</option>
                  <option value="alumno">Alumno</option>
                </select>
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={u.activo}
                  onChange={(e) => cambiarEstado(u.id, e.target.checked)}
                />
              </td>
              <td>
                <button className="btn-eliminar-usuario" onClick={() => eliminarUsuario(u.id)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
          {usuariosMostrados.length === 0 && (
            <tr>
              <td colSpan="7" style={{ textAlign: "center" }}>No se encontraron usuarios</td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="paginacion-panel">
        {Array.from({ length: totalPaginas }, (_, i) => (
          <button
            key={i}
            className={`btn-pagina-panel ${paginaActual === i + 1 ? "activo-panel" : ""}`}
            onClick={() => setPaginaActual(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default PanelUsuarios;