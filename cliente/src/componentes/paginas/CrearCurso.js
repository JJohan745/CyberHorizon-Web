import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaArrowLeft, FaSave } from "react-icons/fa";
import "../../estilos/CrearCurso.css";

function CrearCurso() {
  const navigate = useNavigate();
  const location = useLocation();
  const agregarCurso = location.state?.agregarCurso;

  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [imagen, setImagen] = useState("");
  const [nivel, setNivel] = useState("Principiante");
  const [tema, setTema] = useState("");
  const [resumen, setResumen] = useState("");

  const manejarGuardar = (e) => {
    e.preventDefault();
    if (!titulo || !descripcion) {
      alert("Título y descripción son obligatorios");
      return;
    }

    const nuevoCurso = {
      id: Date.now(),
      titulo,
      descripcion,
      imagen,
      nivel,
      tema,
      resumen,
    };

    if (agregarCurso) agregarCurso(nuevoCurso);

    navigate("/panel-cursos");
  };

  return (
    <div className="crear-curso-contenedor">
      <button className="btn-volver" onClick={() => navigate("/panel-cursos")}>
        <FaArrowLeft /> Volver
      </button>

      <h2>Crear Curso</h2>

      <form className="form-crear-curso" onSubmit={manejarGuardar}>
        <label>
          Título:
          <input type="text" value={titulo} onChange={e => setTitulo(e.target.value)} required />
        </label>

        <label>
          Descripción corta:
          <textarea value={descripcion} onChange={e => setDescripcion(e.target.value)} required />
        </label>

        <label>
          Imagen (URL):
          <input type="text" value={imagen} onChange={e => setImagen(e.target.value)} />
        </label>

        <label>
          Nivel:
          <select value={nivel} onChange={e => setNivel(e.target.value)}>
            <option value="Principiante">Principiante</option>
            <option value="Intermedio">Intermedio</option>
            <option value="Avanzado">Avanzado</option>
          </select>
        </label>

        <label>
          Tema:
          <input type="text" value={tema} onChange={e => setTema(e.target.value)} />
        </label>

        <label>
          Resumen:
          <textarea value={resumen} onChange={e => setResumen(e.target.value)} />
        </label>

        <button type="submit" className="btn-guardar-curso">
          <FaSave /> Guardar Curso
        </button>
      </form>
    </div>
  );
}

export default CrearCurso;

