// src/server.js

const express = require('express');
const dotenv = require('dotenv');
const sesionesRoutes = require("./routes/sesiones.routes");


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

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});