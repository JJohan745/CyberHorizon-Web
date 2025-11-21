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
//-------------------------------
app.post("/api/registro", async (req, res) => {
  const { nombres, apellidos, correo, contrasena, rol } = req.body;

  if (!nombres || !apellidos || !correo || !contrasena || !rol) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  try {
    // Verificar si el correo ya existe
    const usuarioExistente = await pool.query(
      "SELECT * FROM usuarios WHERE correo = $1",
      [correo]
    );
    if (usuarioExistente.rows.length > 0) {
      return res.status(400).json({ error: "El correo ya está registrado" });
    }

    // Hashear contraseña
    const salt = await bcrypt.genSalt(10);
    const contrasenaHash = await bcrypt.hash(contrasena, salt);

    // Guardar usuario
    const nuevoUsuario = await pool.query(
      "INSERT INTO usuarios (nombres, apellidos, correo, contrasena, rol) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [nombres, apellidos, correo, contrasenaHash, rol]
    );

    res.json({ mensaje: "Usuario registrado correctamente", usuario: nuevoUsuario.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error en el servidor" });
  }
});

//-----------------------------------
//    Endpoint de login
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

    // Verificar contraseña
    const validPassword = await bcrypt.compare(contrasena, usuario.rows[0].contrasena);
    if (!validPassword) {
      return res.status(400).json({ error: "Correo o contraseña incorrectos" });
    }

    // Generar token JWT
    const token = jwt.sign(
      { id: usuario.rows[0].id, correo: usuario.rows[0].correo, rol: usuario.rows[0].rol },
      JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.json({ mensaje: "Login exitoso", token, usuario: { nombres: usuario.rows[0].nombres, rol: usuario.rows[0].rol } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error en el servidor" });
  }
});

//-----------------------------------
//     
//---------------------------------


//-----------------------------------
//     Inicio de servidor
//---------------------------------
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
