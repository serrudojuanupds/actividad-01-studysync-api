const express = require("express");
const router = express.Router();

const sesionesController = require("../controllers/sesiones.controller");

router.get("/", sesionesController.listarSesiones);

module.exports = router;