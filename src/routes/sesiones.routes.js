const express = require("express");
const router = express.Router();

const sesionesController = require("../controllers/sesiones.controller");

router.get("/", sesionesController.listarSesiones);
router.get("/:id", sesionesController.obtenerSesionPorId);
router.post("/", sesionesController.crearSesion);

module.exports = router;