var express = require("express");
var router = express.Router();
const {
  crearUsuario,
  loginUsuario,
  obtenerUsuario,
} = require("../controllers/usuario.controller");
const authMiddleware = require("../middlewares/auth.middleware");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

// Rutas para crear y obtener usuarios
router.post("/crear", crearUsuario);
router.post("/login", loginUsuario);
router.get("/me", authMiddleware, obtenerUsuario);

module.exports = router;
