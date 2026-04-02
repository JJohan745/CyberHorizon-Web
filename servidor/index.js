require("dotenv").config();
const express = require("express");
const cors = require("cors");
const pool = require("./db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const app = express();
const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET;

app.use(cors());
app.use(express.json());

//--------------------------------
//     Endpoint de registro
//--------------------------------
app.post("/api/registro", async (req, res) => {
  const { nombres, apellidos, correo, contrasena, rol } = req.body;

  if (!nombres || !apellidos || !correo || !contrasena || !rol) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  try {
    const usuarioExistente = await pool.query(
      "SELECT * FROM usuarios WHERE correo = $1",
      [correo]
    );
    if (usuarioExistente.rows.length > 0) {
      return res.status(400).json({ error: "El correo ya está registrado" });
    }

    const salt = await bcrypt.genSalt(10);
    const contrasenaHash = await bcrypt.hash(contrasena, salt);

    const nuevoUsuario = await pool.query(
      "INSERT INTO usuarios (nombres, apellidos, correo, contrasena, rol, activo) VALUES ($1, $2, $3, $4, $5, FALSE) RETURNING *",
      [nombres, apellidos, correo, contrasenaHash, rol]
    );

    res.json({ mensaje: "Usuario registrado correctamente", usuario: nuevoUsuario.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error en el servidor" });
  }
});

//-----------------------------------
//     Endpoint de login
//---------------------------------
app.post("/api/login", async (req, res) => {
  const { correo, contrasena } = req.body;

  if (!correo || !contrasena) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  try {
    const usuario = await pool.query(
      "SELECT * FROM usuarios WHERE correo = $1",
      [correo]
    );

    if (usuario.rows.length === 0) {
      return res.status(400).json({ error: "Correo o contraseña incorrectos" });
    }

    const validPassword = await bcrypt.compare(contrasena, usuario.rows[0].contrasena);
    if (!validPassword) {
      return res.status(400).json({ error: "Correo o contraseña incorrectos" });
    }

    // Marcar usuario como activo
    await pool.query("UPDATE usuarios SET activo = TRUE WHERE id = $1", [usuario.rows[0].id]);

    const token = jwt.sign(
      { id: usuario.rows[0].id, correo: usuario.rows[0].correo, rol: usuario.rows[0].rol },
      JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.json({
      mensaje: "Login exitoso",
      token,
      usuario: { id: usuario.rows[0].id, nombres: usuario.rows[0].nombres, rol: usuario.rows[0].rol }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error en el servidor" });
  }
});

//-----------------------------------
//     Endpoint de logout
//---------------------------------
app.post("/api/logout", async (req, res) => {
  const { id } = req.body;
  try {
    await pool.query("UPDATE usuarios SET activo = FALSE WHERE id = $1", [id]);
    res.json({ mensaje: "Logout exitoso" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al hacer logout" });
  }
});

//-----------------------------------
//     Estadísticas Admin
//-----------------------------------

//obtener el total de usuarios
app.get("/api/total-usuarios", async (req, res) => {
  try {
    const resultado = await pool.query("SELECT COUNT(*) FROM usuarios");
    res.json({ totalUsuarios: parseInt(resultado.rows[0].count) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al obtener total de usuarios" });
  }
});

//obtener el total de usuarios activos
app.get("/api/usuarios-activos", async (req, res) => {
  try {
    const resultado = await pool.query("SELECT COUNT(*) FROM usuarios WHERE activo = TRUE");
    res.json({ usuariosActivos: parseInt(resultado.rows[0].count) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al obtener usuarios activos" });
  }
});

//-----------------------------------
//     Panel de Usuarios
//---------------------------------

//Obtener los usuarios de la DB
app.get("/api/usuarios", async (req, res) => {
  try {
    const resultado = await pool.query("SELECT id, nombres, apellidos, correo, rol, activo FROM usuarios ORDER BY id ASC");
    res.json({ usuarios: resultado.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al obtener usuarios" });
  }
});

//Actualizar rol usuarios
app.put("/api/usuarios/:id", async (req, res) => {
  const { rol, activo } = req.body;
  const { id } = req.params;
  try {
    const resultado = await pool.query(
      "UPDATE usuarios SET rol = $1, activo = $2 WHERE id = $3 RETURNING *",
      [rol, activo, id]
    );
    res.json({ usuario: resultado.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al actualizar usuario" });
  }
});

//Eliminar usuario
app.delete("/api/usuarios/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM usuarios WHERE id = $1", [id]);
    res.json({ mensaje: "Usuario eliminado correctamente" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al eliminar usuario" });
  }
});


//-----------------------------------
//     Inicio de servidor
//---------------------------------
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

