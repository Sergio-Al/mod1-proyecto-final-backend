const express = require("express");
const router = express.Router();
const {
  crearTarea,
  obtenerTareas,
  obtenerTareaPorId,
  actualizarTarea,
  eliminarTarea,
} = require("../controllers/tarea.controller");

// Middleware para verificar la autenticación
const authMiddleware = require("../middlewares/auth.middleware");

// Rutas para las tareas
router.post("/", authMiddleware, crearTarea); // Crear tarea
router.get("/", authMiddleware, obtenerTareas); // Obtener todas las tareas del usuario autenticado
router.get("/:id", authMiddleware, obtenerTareaPorId); // Obtener tarea por ID
router.put("/:id", authMiddleware, actualizarTarea); // Actualizar tarea por ID
router.delete("/:id", authMiddleware, eliminarTarea); // Eliminar tarea por ID

// Exportar el router
module.exports = router;
