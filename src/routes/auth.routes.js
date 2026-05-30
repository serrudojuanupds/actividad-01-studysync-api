const express = require("express");
const {
  registrarUsuario,
  iniciarSesion,
  obtenerPerfil
} = require("../controllers/auth.controller");
const { autenticarToken } = require("../middlewares/auth.middleware");

const router = express.Router();

router.post("/register", registrarUsuario);
router.post("/login", iniciarSesion);
router.get("/me", autenticarToken, obtenerPerfil);

module.exports = router;