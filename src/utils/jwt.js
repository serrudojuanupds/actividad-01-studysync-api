const jwt = require("jsonwebtoken");

const getJwtConfig = () => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET no está configurado en el archivo .env");
  }

  return {
    secret,
    expiresIn: process.env.JWT_EXPIRES_IN || "1h"
  };
};

const generarToken = (payload) => {
  const { secret, expiresIn } = getJwtConfig();

  return jwt.sign(payload, secret, {
    expiresIn
  });
};

const verificarToken = (token) => {
  const { secret } = getJwtConfig();

  return jwt.verify(token, secret);
};

module.exports = {
  generarToken,
  verificarToken
};