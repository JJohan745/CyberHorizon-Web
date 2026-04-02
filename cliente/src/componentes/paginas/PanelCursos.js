import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import "../../estilos/PanelCursos.css";

function PanelCursos() {
  const navigate = useNavigate();
  const [cursos, setCursos] = useState([
    // Cursos de ejemplo
    { id: 1, titulo: "React Básico", nivel: "Principiante", tema: "Frontend" },
    { id: 2, titulo: "Node.js Intermedio", nivel: "Intermedio", tema: "Backend" },
    { id: 3, titulo: "CSS Avanzado", nivel: "Avanzado", tema: "Frontend" },
  ]);
  const [filtro, setFiltro] = useState("");
  const [paginaActual, setPaginaActual] = useState(1);
  const cursosPorPagina = 5;

  // --- Función para agregar curso desde CrearCurso ---
  const agregarCurso = (nuevoCurso) => {
    setCursos(prev => [...prev, nuevoCurso]);
  };

  // --- Filtrado ---
  const cursosFiltrados = cursos.filter(c =>
    c.titulo.toLowerCase().includes(filtro.toLowerCase())
  );

  const indiceUltimo = paginaActual * cursosPorPagina;
  const indicePrimero = indiceUltimo - cursosPorPagina;
  const cursosPaginados = cursosFiltrados.slice(indicePrimero, indiceUltimo);
  const totalPaginas = Math.ceil(cursosFiltrados.length / cursosPorPagina);

  // --- Eliminar ---
  const eliminarCurso = (id) => {
    if (!window.confirm("¿Eliminar este curso?")) return;
    setCursos(prev => prev.filter(c => c.id !== id));
  };

  return (
    <div className="panel-cursos-contenedor">
      <button className="boton-volver" onClick={() => navigate("/administrador")}>
        <FaArrowLeft />
      </button>

      <h2>Panel de Cursos</h2>

      <div className="contenedor-superior">
        <input
          type="text"
          placeholder="Buscar cursos..."
          value={filtro}
          onChange={(e) => { setFiltro(e.target.value); setPaginaActual(1); }}
          className="input-busqueda-cursos"
        />

        <button
          className="boton-crear-curso"
          onClick={() => navigate("/crear-curso", { state: { agregarCurso } })}
        >
          <FaPlus /> Crear Curso
        </button>
      </div>

      <table className="tabla-cursos">
        <thead>
          <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Nivel</th>
            <th>Tema</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {cursosPaginados.map((curso) => (
            <tr key={curso.id}>
              <td>{curso.id}</td>
              <td>{curso.titulo}</td>
              <td>{curso.nivel}</td>
              <td>{curso.tema}</td>
              <td>
                <button className="btn-editar-curso"><FaEdit /></button>
                <button className="btn-eliminar-curso" onClick={() => eliminarCurso(curso.id)}><FaTrash /></button>
              </td>
            </tr>
          ))}
          {cursosPaginados.length === 0 && (
            <tr><td colSpan="5">No se encontraron cursos</td></tr>
          )}
        </tbody>
      </table>

      <div className="paginacion-cursos">
        {Array.from({ length: totalPaginas }, (_, i) => (
          <button
            key={i}
            className={`boton-pagina-cursos ${paginaActual === i + 1 ? "activo" : ""}`}
            onClick={() => setPaginaActual(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default PanelCursos;
