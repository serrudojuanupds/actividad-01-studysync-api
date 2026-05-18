const notFoundHandler = (req, res, next) => {
  res.status(404).json({
    error: true,
    mensaje: `La ruta ${req.originalUrl} no existe`
  });
};

const errorHandler = (err, req, res, next) => {
  console.error(err);

  res.status(err.statusCode || 500).json({
    error: true,
    mensaje: err.message || "Error interno del servidor"
  });
};

module.exports = {
  notFoundHandler,
  errorHandler
};