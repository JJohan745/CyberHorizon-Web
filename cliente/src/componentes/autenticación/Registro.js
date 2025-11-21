// Cliente/src/componentes/Autenticacion/Registro.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import "../../estilos/Autenticacion.css";

function Registro() {
  const navigate = useNavigate();

  const [nombres, setNombres] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [confirmarContrasena, setConfirmarContrasena] = useState("");

  const [error, setError] = useState("");
  const [exito, setExito] = useState("");

  const [mostrarContrasena, setMostrarContrasena] = useState(false);
  const [mostrarConfirm, setMostrarConfirm] = useState(false);

  const toggleVisibilidad = (setter, valorActual) => setter(!valorActual);

  const validarContrasena = (pass) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[*\-_/.@]).{8,}$/;
    return regex.test(pass);
  };

  const manejarRegistro = async (e) => {
    e.preventDefault();
    setError("");
    setExito("");

    if (contrasena !== confirmarContrasena) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    if (!validarContrasena(contrasena)) {
      setError(
        "La contraseña debe tener mínimo 8 caracteres, mayúscula, minúscula, número y símbolo (* - _ /.@)."
      );
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/api/registro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombres, apellidos, correo, contrasena, rol: "alumno" }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Error al registrar usuario");
        return;
      }

      setExito("¡Registro exitoso! Serás redirigido al inicio de sesión.");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      console.error(err);
      setError("Error al conectar con el servidor");
    }
  };

  const irLogin = () => navigate("/login");

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
        <h2 className="titulo-tarjeta">Crear Cuenta</h2>

        {error && <p className="mensaje-error">{error}</p>}
        {exito && <p className="mensaje-exito">{exito}</p>}

        <form onSubmit={manejarRegistro} className="formulario-autenticacion">
          <input
            type="text"
            placeholder="Nombres"
            value={nombres}
            onChange={(e) => setNombres(e.target.value.toUpperCase())}
            className="campo-entrada"
            required
          />

          <input
            type="text"
            placeholder="Apellidos"
            value={apellidos}
            onChange={(e) => setApellidos(e.target.value.toUpperCase())}
            className="campo-entrada"
            required
          />

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
              onClick={() => toggleVisibilidad(setMostrarContrasena, mostrarContrasena)}
            >
              {mostrarContrasena ? <FaRegEyeSlash size={20} /> : <FaRegEye size={20} />}
            </span>
          </div>

          <div className="contenedor-password">
            <input
              type={mostrarConfirm ? "text" : "password"}
              placeholder="Confirmar Contraseña"
              value={confirmarContrasena}
              onChange={(e) => setConfirmarContrasena(e.target.value)}
              className="campo-entrada"
              required
            />
            <span
              className="icono-toggle"
              onClick={() => toggleVisibilidad(setMostrarConfirm, mostrarConfirm)}
            >
              {mostrarConfirm ? <FaRegEyeSlash size={20} /> : <FaRegEye size={20} />}
            </span>
          </div>

          <button type="submit" className="boton-autenticacion">
            Registrarse
          </button>
        </form>

        <p className="texto-registro">
          ¿Ya tienes cuenta?{" "}
          <span className="enlace-registro" onClick={irLogin}>
            Inicia sesión
          </span>
        </p>
      </div>
    </div>
  );
}

export default Registro;
