const express = require("express");
const router = express.Router();

const sesionesController = require("../controllers/sesiones.controller");

router.get("/", sesionesController.listarSesiones);
router.get("/buscar", sesionesController.buscarSesiones);
router.post("/:id/llenar", sesionesController.llenarSesion);
router.get("/:id", sesionesController.obtenerSesionPorId);
router.post("/", sesionesController.crearSesion);
router.put("/:id", sesionesController.actualizarSesion);
router.delete("/", sesionesController.vaciarSesiones);
router.delete("/:id", sesionesController.eliminarSesion);
module.exports = router;