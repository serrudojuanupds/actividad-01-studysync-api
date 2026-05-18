// src/server.js

const express = require('express');
const dotenv = require('dotenv');
const sesionesRoutes = require("./routes/sesiones.routes");
const { notFoundHandler, errorHandler } = require("./middlewares/error.middleware");

// Configurar dotenv para leer variables de entorno
dotenv.config();

// Crear servidor Express
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    mensaje: "API StudySync funcionando correctamente"
  });
});

app.use("/api/sesiones", sesionesRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});