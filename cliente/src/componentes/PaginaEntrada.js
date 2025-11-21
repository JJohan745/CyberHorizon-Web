import EntradaFoto from "../archivos/EntradaFoto.png";
import EntradaAprendizaje from "../archivos/EntradaAprendizaje.png";
// Cliente/src/componentes/PaginaEntrada.js
import React from "react";
import { Link } from "react-router-dom";
import "../estilos/PaginaEntrada.css";
import { GrCertificate } from "react-icons/gr";
import { TfiAlarmClock } from "react-icons/tfi";
import { GiBrain, GiProgression } from "react-icons/gi";
import { FaCheck } from "react-icons/fa"

function PaginaEntrada() {
  return (
    <div className="entrada-container">
      <header className="entrada-header">
        <div className="entrada-bienvenida">
          <div className="texto-bienvenida">
            <h1>Bienvenido a <span>CyberHorizon</span></h1>
            <p className="descripcion-bienvenida">
              Aprende a proteger tus datos, detectar amenazas reales y dominar los fundamentos de redes.
              CyberHorizon te ofrece una formación especializada, práctica y certificada para impulsar tu carrera.
            </p>
            <div className="entrada-buttons">
              <Link to="/login" className="btn-entrada">Iniciar Sesión</Link>
              <Link to="/registro" className="btn-entrada btn-secundario">Registrarse</Link>
            </div>
          </div>

          {/* Si usas assets: <img src={EntradaFoto} alt="Ilustración bienvenida" className="imagen-bienvenida" /> */}
          <img src={EntradaFoto} alt="Ilustración bienvenida" className="imagen-bienvenida" />
        </div>
      </header>

      <section className="entrada-aprendizaje">
        <div className="aprendizaje-contenido">
          {/* Si usas assets: <img src={EntradaAprendizaje} alt="Ilustración aprendizaje" className="imagen-aprendizaje" /> */}
          <img src={EntradaAprendizaje} alt="Ilustración aprendizaje" className="imagen-aprendizaje" />
          <div className="texto-aprendizaje">
            <h2>¿Qué aprenderas en CyberHorizon?</h2>
            <ul className="lista-aprendizaje">
              <li><span className="check-icon"><FaCheck/></span>Responder de forma efectiva a ataques informáticos, evaluando amenazas reales y su impacto.</li>
              <li><span className="check-icon"><FaCheck/></span>Desarrollar una visión integral de los sistemas para resolver problemas de seguridad.</li>
              <li><span className="check-icon"><FaCheck/></span>Analizar auditorías internas y proponer mejoras en procesos y controles.</li>
              <li><span className="check-icon"><FaCheck/></span>Supervisar el uso y acceso a datos para proteger la información organizacional.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="entrada-ventajas">
        <div className= "titulo-ventajas">
            <h2>Ventajas de usar CyberHorizon</h2>
        </div>
        <div className="ventajas-linea">
          <div className="ventaja-bloque">
            <div className="ventaja-icono"><GrCertificate/></div>
            <h3>Certificación</h3>
            <p>Obtén certificados para validar tus conocimientos.</p>
          </div>
          <div className="ventaja-bloque">
            <div className="ventaja-icono"><TfiAlarmClock/></div>
            <h3>Flexibilidad</h3>
            <p>Accede a cursos desde cualquier dispositivo, cuando tú quieras.</p>
          </div>
          <div className="ventaja-bloque">
            <div className="ventaja-icono"><GiBrain/></div>
            <h3>Entrenamiento práctico</h3>
            <p>Fortalece tus habilidades en ciberseguridad.</p>
          </div>
          <div className="ventaja-bloque">
            <div className="ventaja-icono"><GiProgression/></div>
            <h3>Seguimiento de progreso</h3>
            <p>Visualiza tu avance, descubre logros y mejora tus competencias paso a paso.</p>
          </div>
        </div>
      </section>

      <footer className="entrada-footer">
        <div className="motivacion-bienvenida">
              <h3>¡¡Protege tus datos, domina las amenazas y convierte cada desafío en tu aprendizaje!!</h3>
            </div>
      </footer>
    </div>
  );
}

export default PaginaEntrada;
