const rateLimit = require("express-rate-limit");

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: true,
    mensaje: "Demasiadas solicitudes. Intente nuevamente más tarde."
  }
});

module.exports = {
  apiLimiter
};