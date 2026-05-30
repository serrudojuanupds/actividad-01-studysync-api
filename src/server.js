const express = require("express");
const dotenv = require("dotenv");
const swaggerUi = require("swagger-ui-express");

dotenv.config();

const sesionesRoutes = require("./routes/sesiones.routes");
const authRoutes = require("./routes/auth.routes");
const swaggerDocument = require("./docs/swagger");

const { apiLimiter } = require("./middlewares/rateLimit.middleware");
const { autenticarToken } = require("./middlewares/auth.middleware");
const {
  notFoundHandler,
  errorHandler
} = require("./middlewares/error.middleware");

const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/", (req, res) => {
  res.status(200).json({
    mensaje: "API StudySync funcionando correctamente"
  });
});

app.use("/auth", apiLimiter, authRoutes);

app.use("/api", apiLimiter);
app.use("/api/sesiones", autenticarToken, sesionesRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
}

module.exports = app;