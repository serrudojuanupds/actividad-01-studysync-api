const bcrypt = require("bcryptjs");
const prisma = require("../config/prisma");
const { generarToken } = require("../utils/jwt");

const validarEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const registrarUsuario = async (req, res) => {
  try {
    const { nombre, email, password } = req.body;

    if (!nombre || !email || !password) {
      return res.status(400).json({
        error: true,
        mensaje: "Nombre, email y password son obligatorios"
      });
    }

    if (!validarEmail(email)) {
      return res.status(400).json({
        error: true,
        mensaje: "El email no tiene un formato válido"
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        error: true,
        mensaje: "La contraseña debe tener al menos 6 caracteres"
      });
    }

    const usuarioExistente = await prisma.usuario.findUnique({
      where: {
        email
      }
    });

    if (usuarioExistente) {
      return res.status(409).json({
        error: true,
        mensaje: "El email ya está registrado"
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const usuario = await prisma.usuario.create({
      data: {
        nombre,
        email,
        passwordHash
      },
      select: {
        id: true,
        nombre: true,
        email: true,
        createdAt: true
      }
    });

    res.status(201).json({
      error: false,
      mensaje: "Usuario registrado correctamente",
      data: usuario
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      mensaje: "Error al registrar usuario",
      detalle: error.message
    });
  }
};

const iniciarSesion = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: true,
        mensaje: "Email y password son obligatorios"
      });
    }

    const usuario = await prisma.usuario.findUnique({
      where: {
        email
      }
    });

    if (!usuario) {
      return res.status(401).json({
        error: true,
        mensaje: "Credenciales inválidas"
      });
    }

    const passwordCorrecto = await bcrypt.compare(password, usuario.passwordHash);

    if (!passwordCorrecto) {
      return res.status(401).json({
        error: true,
        mensaje: "Credenciales inválidas"
      });
    }

    const token = generarToken({
      id: usuario.id,
      email: usuario.email
    });

    res.status(200).json({
      error: false,
      mensaje: "Login correcto",
      token,
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email
      }
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      mensaje: "Error al iniciar sesión",
      detalle: error.message
    });
  }
};

const obtenerPerfil = async (req, res) => {
  res.status(200).json({
    error: false,
    mensaje: "Usuario autenticado correctamente",
    data: req.usuario
  });
};

module.exports = {
  registrarUsuario,
  iniciarSesion,
  obtenerPerfil
};