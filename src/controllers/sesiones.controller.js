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

const crearSesion = (req, res) => {
  const { titulo, materia, fecha, hora, lugar, cupos, completada } = req.body;

  if (!titulo) {
    return res.status(400).json({
      error: true,
      mensaje: "El campo titulo es obligatorio"
    });
  }

  if (!materia) {
    return res.status(400).json({
      error: true,
      mensaje: "El campo materia es obligatorio"
    });
  }

  if (!fecha) {
    return res.status(400).json({
      error: true,
      mensaje: "El campo fecha es obligatorio"
    });
  }

  if (!hora) {
    return res.status(400).json({
      error: true,
      mensaje: "El campo hora es obligatorio"
    });
  }

  if (!lugar) {
    return res.status(400).json({
      error: true,
      mensaje: "El campo lugar es obligatorio"
    });
  }

  if (!cupos) {
    return res.status(400).json({
      error: true,
      mensaje: "El campo cupos es obligatorio"
    });
  }

  if (completada === undefined) {
    return res.status(400).json({
      error: true,
      mensaje: "El campo completada es obligatorio"
    });
  }

  const nuevaSesion = {
    id: sesiones.length + 1,
    titulo,
    materia,
    fecha,
    hora,
    lugar,
    cupos,
    completada
  };

  sesiones.push(nuevaSesion);

  res.status(201).json({
    error: false,
    mensaje: "Sesión creada correctamente",
    data: nuevaSesion
  });
};

const actualizarSesion = (req, res) => {
  const id = parseInt(req.params.id);

  const indice = sesiones.findIndex((item) => item.id === id);

  if (indice === -1) {
    return res.status(404).json({
      error: true,
      mensaje: "No se encontró una sesión con el ID proporcionado"
    });
  }

  const { titulo, materia, fecha, hora, lugar, cupos, completada } = req.body;

  if (!titulo) {
    return res.status(400).json({
      error: true,
      mensaje: "El campo titulo es obligatorio"
    });
  }

  if (!materia) {
    return res.status(400).json({
      error: true,
      mensaje: "El campo materia es obligatorio"
    });
  }

  if (!fecha) {
    return res.status(400).json({
      error: true,
      mensaje: "El campo fecha es obligatorio"
    });
  }

  if (!hora) {
    return res.status(400).json({
      error: true,
      mensaje: "El campo hora es obligatorio"
    });
  }

  if (!lugar) {
    return res.status(400).json({
      error: true,
      mensaje: "El campo lugar es obligatorio"
    });
  }

  if (!cupos) {
    return res.status(400).json({
      error: true,
      mensaje: "El campo cupos es obligatorio"
    });
  }

  if (completada === undefined) {
    return res.status(400).json({
      error: true,
      mensaje: "El campo completada es obligatorio"
    });
  }

  const sesionActualizada = {
    id,
    titulo,
    materia,
    fecha,
    hora,
    lugar,
    cupos,
    completada
  };

  sesiones[indice] = sesionActualizada;

  res.status(200).json({
    error: false,
    mensaje: "Sesión actualizada correctamente",
    data: sesionActualizada
  });
};
const eliminarSesion = (req, res) => {
  const id = parseInt(req.params.id);

  const indice = sesiones.findIndex((item) => item.id === id);

  if (indice === -1) {
    return res.status(404).json({
      error: true,
      mensaje: "No se encontró una sesión con el ID proporcionado"
    });
  }

  const sesionEliminada = sesiones[indice];

  sesiones.splice(indice, 1);

  res.status(200).json({
    error: false,
    mensaje: "Sesión eliminada correctamente",
    data: sesionEliminada
  });
};
module.exports = {
  listarSesiones,
  obtenerSesionPorId,
  crearSesion,
  actualizarSesion,
  eliminarSesion
};