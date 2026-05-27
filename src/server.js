const express = require("express");
const dotenv = require("dotenv");
const swaggerUi = require("swagger-ui-express");

const sesionesRoutes = require("./routes/sesiones.routes");
const swaggerDocument = require("./docs/swagger");

const { apiLimiter } = require("./middlewares/rateLimit.middleware");
const {
  notFoundHandler,
  errorHandler
} = require("./middlewares/error.middleware");

dotenv.config();

const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/", (req, res) => {
  res.status(200).json({
    mensaje: "API StudySync funcionando correctamente"
  });
});

app.use("/api", apiLimiter);
app.use("/api/sesiones", sesionesRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});