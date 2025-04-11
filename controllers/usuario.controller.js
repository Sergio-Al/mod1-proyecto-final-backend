const { Usuario } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Tarea } = require("../models");
const { validationResult } = require("express-validator");

const generateToken = (usuario) => {
  const payload = {
    id: usuario.id,
    email: usuario.email,
  };

  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

const crearUsuario = async (req, res) => {
  // En este paso se validan los datos de entrada
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password } = req.body;

  try {
    const usuarioExistente = await Usuario.findOne({
      where: { email },
    });

    if (usuarioExistente) {
      return res.status(400).json({ message: "El usuario ya existe" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const datosNuevoUsuario = {
      name,
      email,
      password: hashedPassword,
    };

    const nuevoUsuario = await Usuario.create(datosNuevoUsuario);

    const token = generateToken(nuevoUsuario);

    // Excluir la contraseña del objeto de usuario
    datosNuevoUsuario.password = undefined;

    res.status(201).json({
      ...datosNuevoUsuario,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear el usuario" });
  }
};

const loginUsuario = async (req, res) => {
  const { email, password } = req.body;

  try {
    const usuario = await Usuario.findOne({
      where: { email },
    });

    if (!usuario) {
      return res.status(400).json({ message: "Credenciales inválidas" });
    }

    const passwordValido = await bcrypt.compare(password, usuario.password);

    if (!passwordValido) {
      return res.status(400).json({ message: "Credenciales inválidas" });
    }

    const token = generateToken(usuario);

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al iniciar sesión" });
  }
};

const obtenerUsuario = async (req, res) => {
  const { id } = req.usuario.dataValues;

  try {
    const usuario = await Usuario.findByPk(id, {
      include: [
        {
          model: Tarea,
        },
      ],
    });

    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Excluir la contraseña del objeto de usuario
    usuario.password = undefined;

    res.json(usuario);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener el usuario" });
  }
};

module.exports = {
  crearUsuario,
  loginUsuario,
  obtenerUsuario,
};
