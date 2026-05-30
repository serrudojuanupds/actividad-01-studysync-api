const prisma = require("../config/prisma");
const { verificarToken } = require("../utils/jwt");

const autenticarToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        error: true,
        mensaje: "Token no proporcionado"
      });
    }

    if (!authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        error: true,
        mensaje: "Formato de token inválido. Use Bearer TOKEN"
      });
    }

    const token = authHeader.split(" ")[1];

    const payload = verificarToken(token);

    const usuario = await prisma.usuario.findUnique({
      where: {
        id: payload.id
      },
      select: {
        id: true,
        nombre: true,
        email: true,
        createdAt: true,
        updatedAt: true
      }
    });

    if (!usuario) {
      return res.status(401).json({
        error: true,
        mensaje: "Usuario del token no existe"
      });
    }

    req.usuario = usuario;
    req.token = token;

    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        error: true,
        mensaje: "Token expirado. Inicie sesión nuevamente."
      });
    }

    return res.status(401).json({
      error: true,
      mensaje: "Token inválido"
    });
  }
};

module.exports = {
  autenticarToken
};