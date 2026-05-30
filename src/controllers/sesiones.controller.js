const prisma = require("../config/prisma");
const CHANNELS = require("../events/channels");
const { publishEvent } = require("../events/publisher");

/*
  Función auxiliar para normalizar texto.
  Se usa en la búsqueda para ignorar mayúsculas, minúsculas y tildes.
*/
const normalizarTexto = (texto) => {
  return texto
    .toString()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
};

/*
  Función auxiliar para validar IDs recibidos por parámetro.
  Convierte el ID a número entero y evita valores inválidos.
*/
const obtenerIdValido = (idParam) => {
  const id = parseInt(idParam);

  if (Number.isNaN(id)) {
    return null;
  }

  return id;
};

/*
  Función auxiliar para validar los campos obligatorios de una sesión.
  La usamos en POST y PUT para evitar repetir demasiada lógica.
*/
const validarDatosSesion = ({ titulo, materia, fecha, hora, lugar, cupos, completada }) => {
  if (!titulo) {
    return "El campo titulo es obligatorio";
  }

  if (!materia) {
    return "El campo materia es obligatorio";
  }

  if (!fecha) {
    return "El campo fecha es obligatorio";
  }

  if (!hora) {
    return "El campo hora es obligatorio";
  }

  if (!lugar) {
    return "El campo lugar es obligatorio";
  }

  if (cupos === undefined || cupos === null || cupos === "") {
    return "El campo cupos es obligatorio";
  }

  if (completada === undefined) {
    return "El campo completada es obligatorio";
  }

  return null;
};

/*
  GET /api/sesiones

  Antes:
  - Se devolvía el arreglo en memoria.

  Ahora:
  - Se consulta la tabla Sesion en Supabase mediante Prisma.
*/
const listarSesiones = async (req, res) => {
  try {
    const sesiones = await prisma.sesion.findMany({
      orderBy: {
        id: "asc"
      }
    });

    res.status(200).json({
      error: false,
      mensaje: "Sesiones obtenidas correctamente",
      data: sesiones
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      mensaje: "Error al obtener las sesiones",
      detalle: error.message
    });
  }
};

/*
  GET /api/sesiones/:id

  Busca una sesión por ID usando Prisma.
*/
const obtenerSesionPorId = async (req, res) => {
  try {
    const id = obtenerIdValido(req.params.id);

    if (!id) {
      return res.status(400).json({
        error: true,
        mensaje: "El ID proporcionado no es válido"
      });
    }

    const sesion = await prisma.sesion.findUnique({
      where: {
        id
      }
    });

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
  } catch (error) {
    res.status(500).json({
      error: true,
      mensaje: "Error al obtener la sesión",
      detalle: error.message
    });
  }
};

/*
  POST /api/sesiones

  Antes:
  - Se creaba una sesión con sesiones.push().

  Ahora:
  - Se crea una sesión real en Supabase con prisma.sesion.create().
  - Después de crearla, se publica el evento study-session.created en Redis Pub/Sub.
*/
const crearSesion = async (req, res) => {
  try {
    const { titulo, materia, fecha, hora, lugar, cupos, completada, usuarioId } = req.body;

    const errorValidacion = validarDatosSesion({
      titulo,
      materia,
      fecha,
      hora,
      lugar,
      cupos,
      completada
    });

    if (errorValidacion) {
      return res.status(400).json({
        error: true,
        mensaje: errorValidacion
      });
    }

    const nuevaSesion = await prisma.sesion.create({
      data: {
        titulo,
        materia,
        fecha,
        hora,
        lugar,
        cupos: Number(cupos),
        completada: Boolean(completada),
        usuarioId: usuarioId ? Number(usuarioId) : null
      }
    });

    const event = {
      type: CHANNELS.STUDY_SESSION_CREATED,
      payload: nuevaSesion,
      timestamp: new Date().toISOString(),
      version: "1.0"
    };

    console.log("Publicando evento de sesión creada...");
    await publishEvent(CHANNELS.STUDY_SESSION_CREATED, event);

    res.status(201).json({
      error: false,
      mensaje: "Sesión creada correctamente",
      data: nuevaSesion
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      mensaje: "Error al crear la sesión",
      detalle: error.message
    });
  }
};

/*
  PUT /api/sesiones/:id

  Antes:
  - Se buscaba el índice en el arreglo y se reemplazaba el objeto.

  Ahora:
  - Se verifica si existe la sesión.
  - Se actualiza en Supabase con prisma.sesion.update().
  - Se publica el evento study-session.updated.
*/
const actualizarSesion = async (req, res) => {
  try {
    const id = obtenerIdValido(req.params.id);

    if (!id) {
      return res.status(400).json({
        error: true,
        mensaje: "El ID proporcionado no es válido"
      });
    }

    const sesionExistente = await prisma.sesion.findUnique({
      where: {
        id
      }
    });

    if (!sesionExistente) {
      return res.status(404).json({
        error: true,
        mensaje: "No se encontró una sesión con el ID proporcionado"
      });
    }

    const { titulo, materia, fecha, hora, lugar, cupos, completada, usuarioId } = req.body;

    const errorValidacion = validarDatosSesion({
      titulo,
      materia,
      fecha,
      hora,
      lugar,
      cupos,
      completada
    });

    if (errorValidacion) {
      return res.status(400).json({
        error: true,
        mensaje: errorValidacion
      });
    }

    const sesionActualizada = await prisma.sesion.update({
      where: {
        id
      },
      data: {
        titulo,
        materia,
        fecha,
        hora,
        lugar,
        cupos: Number(cupos),
        completada: Boolean(completada),
        usuarioId: usuarioId ? Number(usuarioId) : null
      }
    });

    const event = {
      type: CHANNELS.STUDY_SESSION_UPDATED,
      payload: sesionActualizada,
      timestamp: new Date().toISOString(),
      version: "1.0"
    };

    await publishEvent(CHANNELS.STUDY_SESSION_UPDATED, event);

    res.status(200).json({
      error: false,
      mensaje: "Sesión actualizada correctamente",
      data: sesionActualizada
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      mensaje: "Error al actualizar la sesión",
      detalle: error.message
    });
  }
};

/*
  DELETE /api/sesiones/:id

  Antes:
  - Se eliminaba la sesión del arreglo con splice().

  Ahora:
  - Se elimina de Supabase con prisma.sesion.delete().
  - Se publica el evento study-session.deleted.
*/
const eliminarSesion = async (req, res) => {
  try {
    const id = obtenerIdValido(req.params.id);

    if (!id) {
      return res.status(400).json({
        error: true,
        mensaje: "El ID proporcionado no es válido"
      });
    }

    const sesionExistente = await prisma.sesion.findUnique({
      where: {
        id
      }
    });

    if (!sesionExistente) {
      return res.status(404).json({
        error: true,
        mensaje: "No se encontró una sesión con el ID proporcionado"
      });
    }

    const sesionEliminada = await prisma.sesion.delete({
      where: {
        id
      }
    });

    const event = {
      type: CHANNELS.STUDY_SESSION_DELETED,
      payload: sesionEliminada,
      timestamp: new Date().toISOString(),
      version: "1.0"
    };

    await publishEvent(CHANNELS.STUDY_SESSION_DELETED, event);

    res.status(200).json({
      error: false,
      mensaje: "Sesión eliminada correctamente",
      data: sesionEliminada
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      mensaje: "Error al eliminar la sesión",
      detalle: error.message
    });
  }
};

/*
  GET /api/sesiones/buscar?q=texto

  Prisma puede buscar texto con contains, pero para mantener la búsqueda sin tildes
  se cargan las sesiones y se filtran con normalizarTexto().
*/
const buscarSesiones = async (req, res) => {
  try {
    const q = req.query.q;

    if (!q) {
      return res.status(400).json({
        error: true,
        mensaje: "El parámetro q es obligatorio para realizar la búsqueda"
      });
    }

    const textoBusqueda = normalizarTexto(q);

    const sesiones = await prisma.sesion.findMany({
      orderBy: {
        id: "asc"
      }
    });

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
  } catch (error) {
    res.status(500).json({
      error: true,
      mensaje: "Error al buscar sesiones",
      detalle: error.message
    });
  }
};

/*
  POST /api/sesiones/:id/llenar

  Cambia los cupos de una sesión a 0 en Supabase.
  Luego publica el evento study-session.full.
*/
const llenarSesion = async (req, res) => {
  try {
    const id = obtenerIdValido(req.params.id);

    if (!id) {
      return res.status(400).json({
        error: true,
        mensaje: "El ID proporcionado no es válido"
      });
    }

    const sesionExistente = await prisma.sesion.findUnique({
      where: {
        id
      }
    });

    if (!sesionExistente) {
      return res.status(404).json({
        error: true,
        mensaje: "No se encontró una sesión con el ID proporcionado"
      });
    }

    const sesionLlena = await prisma.sesion.update({
      where: {
        id
      },
      data: {
        cupos: 0
      }
    });

    const event = {
      type: CHANNELS.STUDY_SESSION_FULL,
      payload: sesionLlena,
      timestamp: new Date().toISOString(),
      version: "1.0"
    };

    await publishEvent(CHANNELS.STUDY_SESSION_FULL, event);

    res.status(200).json({
      error: false,
      mensaje: "La sesión fue marcada como llena correctamente",
      data: sesionLlena
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      mensaje: "Error al marcar la sesión como llena",
      detalle: error.message
    });
  }
};

/*
  DELETE /api/sesiones

  Antes:
  - Se vaciaba el arreglo con sesiones.length = 0.

  Ahora:
  - Se eliminan todas las sesiones de Supabase con prisma.sesion.deleteMany().
  - Se publica el evento study-session.cleared.
*/
const vaciarSesiones = async (req, res) => {
  try {
    const totalAntesDeEliminar = await prisma.sesion.count();

    await prisma.sesion.deleteMany();

    const event = {
      type: CHANNELS.STUDY_SESSION_CLEARED,
      payload: {
        totalEliminadas: totalAntesDeEliminar
      },
      timestamp: new Date().toISOString(),
      version: "1.0"
    };

    await publishEvent(CHANNELS.STUDY_SESSION_CLEARED, event);

    res.status(200).json({
      error: false,
      mensaje: "Todas las sesiones fueron eliminadas correctamente",
      totalEliminadas: totalAntesDeEliminar
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      mensaje: "Error al vaciar las sesiones",
      detalle: error.message
    });
  }
};

module.exports = {
  listarSesiones,
  obtenerSesionPorId,
  crearSesion,
  actualizarSesion,
  eliminarSesion,
  buscarSesiones,
  llenarSesion,
  vaciarSesiones
};