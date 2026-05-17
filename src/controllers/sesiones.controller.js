const sesiones = require("../models/sesiones.model");

const listarSesiones = (req, res) => {
  res.status(200).json({
    error: false,
    mensaje: "Sesiones obtenidas correctamente",
    data: sesiones
  });
};
  
module.exports = {
  listarSesiones
};