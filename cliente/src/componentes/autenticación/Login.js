// Cliente/src/componentes/Autenticacion/Login.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import "../../estilos/Autenticacion.css";

function Login() {
  const navigate = useNavigate();

  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");
  const [mostrarContrasena, setMostrarContrasena] = useState(false);

  const toggleVisibilidad = () => setMostrarContrasena(!mostrarContrasena);

  // --- Redirigir si ya está logueado ---
  useEffect(() => {
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    if (usuario) {
      navigate("/inicio"); 
    }
  }, [navigate]);

  const manejarLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!correo || !contrasena) {
      setError("Completa todos los campos.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo, contrasena }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Correo o contraseña incorrectos");
        return;
      }

      // Guardar token y usuario en localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("usuario", JSON.stringify(data.usuario));

      // Redirigir al inicio
      navigate("/inicio");
    } catch (err) {
      console.error(err);
      setError("Error al conectar con el servidor");
    }
  };

  const irRegistro = () => navigate("/registro");

  return (
    <div className="envoltorio-autenticacion">
      <div className="seccion-logo-autenticacion">
        <img
          src={require("../../archivos/logo.png")}
          alt="CyberHorizon Logo"
          className="imagen-logo"
        />
        <h1 className="texto-logo">CyberHorizon</h1>
      </div>

      <div className="tarjeta-autenticacion">
        <h2 className="titulo-tarjeta">Iniciar Sesión</h2>

        {error && <p className="mensaje-error">{error}</p>}

        <form onSubmit={manejarLogin} className="formulario-autenticacion">
          <input
            type="email"
            placeholder="Correo electrónico"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            className="campo-entrada"
            required
          />

          <div className="contenedor-password">
            <input
              type={mostrarContrasena ? "text" : "password"}
              placeholder="Contraseña"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              className="campo-entrada"
              required
            />
            <span
              className="icono-toggle"
              onClick={toggleVisibilidad}
              aria-label={mostrarContrasena ? "Ocultar contraseña" : "Mostrar contraseña"}
            >
              {mostrarContrasena ? <FaRegEyeSlash size={20} /> : <FaRegEye size={20} />}
            </span>
          </div>

          <button type="submit" className="boton-autenticacion">
            Iniciar Sesión
          </button>
        </form>

        <p className="texto-registro">
          ¿No tienes cuenta?{" "}
          <span className="enlace-registro" onClick={irRegistro}>
            Regístrate
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;