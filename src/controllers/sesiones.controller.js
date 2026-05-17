const sesiones = require("../models/sesiones.model");

const listarSesiones = (req, res) => {
  res.status(200).json({
    error: false,
    mensaje: "Sesiones obtenidas correctamente",
    data: sesiones
  });
};

const obtenerSesionPorId = (req, res) => {
  const id = parseInt(req.params.id);

  const sesion = sesiones.find((item) => item.id === id);

  if (!sesion) {
    return res.status(404).json({
      error: true,
      mensaje: "No se encontró una sesión con el ID proporcionado"
    });
  }

  res.status(200).json({
    error: false,
    mensaje: "Sesión encontrada correctamente",
    data: sesion
  });
};

module.exports = {
  listarSesiones,
  obtenerSesionPorId
};