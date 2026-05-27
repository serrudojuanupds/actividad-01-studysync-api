const sesiones = require("../models/sesiones.model");
const CHANNELS = require("../events/channels");
const { publishEvent } = require("../events/publisher");

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

const crearSesion = async (req, res) => {
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

  const event = {
  type: CHANNELS.STUDY_SESSION_CREATED,
  payload: {
    id: nuevaSesion.id,
    titulo: nuevaSesion.titulo,
    materia: nuevaSesion.materia,
    fecha: nuevaSesion.fecha,
    hora: nuevaSesion.hora,
    lugar: nuevaSesion.lugar,
    cupos: nuevaSesion.cupos,
    completada: nuevaSesion.completada
  },
  timestamp: new Date().toISOString(),
  version: "1.0"
  };

await publishEvent(CHANNELS.STUDY_SESSION_CREATED, event);

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
const normalizarTexto = (texto) => {
  return texto
    .toString()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
};


const buscarSesiones = (req, res) => {
  const q = req.query.q;

  if (!q) {
    return res.status(400).json({
      error: true,
      mensaje: "El parámetro q es obligatorio para realizar la búsqueda"
    });
  }

  const textoBusqueda = normalizarTexto(q);

  const resultados = sesiones.filter((sesion) => {
    return (
      normalizarTexto(sesion.titulo).includes(textoBusqueda) ||
      normalizarTexto(sesion.materia).includes(textoBusqueda) ||
      normalizarTexto(sesion.lugar).includes(textoBusqueda)
    );
  });

  res.status(200).json({
    error: false,
    mensaje: "Búsqueda realizada correctamente",
    total: resultados.length,
    data: resultados
  });
};

const llenarSesion = async (req, res) => {
  const id = parseInt(req.params.id);

  const sesion = sesiones.find((item) => item.id === id);

  if (!sesion) {
    return res.status(404).json({
      error: true,
      mensaje: "No se encontró una sesión con el ID proporcionado"
    });
  }

  sesion.cupos = 0;

  const event = {
    type: CHANNELS.STUDY_SESSION_FULL,
    payload: {
      id: sesion.id,
      titulo: sesion.titulo,
      materia: sesion.materia,
      fecha: sesion.fecha,
      hora: sesion.hora,
      lugar: sesion.lugar,
      cupos: sesion.cupos,
      completada: sesion.completada
    },
    timestamp: new Date().toISOString(),
    version: "1.0"
  };

  await publishEvent(CHANNELS.STUDY_SESSION_FULL, event);

  res.status(200).json({
    error: false,
    mensaje: "La sesión fue marcada como llena correctamente",
    data: sesion
  });
};
module.exports = {
  listarSesiones,
  obtenerSesionPorId,
  crearSesion,
  actualizarSesion,
  eliminarSesion,
  buscarSesiones,
  llenarSesion
};