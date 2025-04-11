const { Tarea } = require("../models");
const { Op } = require("sequelize");

const crearTarea = async (req, res) => {
  const { titulo, descripcion, estado, fecha_limite } = req.body;

  try {
    const nuevaTarea = await Tarea.create({
      titulo,
      descripcion,
      estado,
      fecha_limite,
      usuarioId: req.usuario.dataValues.id,
    });

    res.status(201).json(nuevaTarea);
  } catch (error) {
    res.status(500).json({ message: "Error al crear la tarea" });
  }
};

const obtenerTareas = async (req, res) => {
  const { status, search, date } = req.query;
  const where = {
    usuarioId: req.usuario.id, // Filtrar por el ID del usuario
  };

  if (status) {
    where.estado = status;
  }
  if (search) {
    where.titulo = {
      [Op.like]: `%${search}%`,
    };
  }

  if (date) {
    const fechaLimite = new Date(date);
    console.log(date, fechaLimite)
    where.fecha_limite = {
      // Filtrar por fecha exacta sin hora
      [Op.eq]: fechaLimite,
    };
  }

  try {
    const tareas = await Tarea.findAll({
      where,
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json(tareas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener las tareas" });
  }
};

const obtenerTareaPorId = async (req, res) => {
  const { id } = req.params;

  try {
    const tarea = await Tarea.findByPk(id);

    if (!tarea) {
      return res.status(404).json({ message: "Tarea no encontrada" });
    }

    if (tarea.usuarioId !== req.usuario.id) {
      return res.status(403).json({ message: "No tienes permiso para ver esta tarea" });
    }

    res.status(200).json(tarea);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener la tarea" });
  }
};

const actualizarTarea = async (req, res) => {
  const { id } = req.params;
  const { titulo, descripcion, estado, fecha_limite } = req.body;

  try {
    const tarea = await Tarea.findByPk(id);

    if (!tarea) {
      return res.status(404).json({ message: "Tarea no encontrada" });
    }

    if (tarea.estado === "Completada")
      return res.status(400).json({ message: "Tarea completada" });

    if (!!estado && estado === "Pendiente" && tarea.estado === "En Progreso")
      return res.status(400).json({
        message: "No se puede asignar una tarea En Progreso como Pendiente",
      });

    if (!!estado && estado === "Completada" && tarea.estado === "Pendiente")
      return res.status(400).json({
        message:
          "No se puede cambiar una tarea a completada sin pasar por 'En Progreso'",
      });

    await tarea.update({
      titulo,
      descripcion,
      estado,
      fecha_limite,
    });

    res.status(200).json(tarea);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al actualizar la tarea" });
  }
};

const eliminarTarea = async (req, res) => {
  const { id } = req.params;

  try {
    const tarea = await Tarea.findByPk(id);

    if (!tarea) {
      return res.status(404).json({ message: "Tarea no encontrada" });
    }

    if (tarea.estado !== "Completada") {
      return res
        .status(400)
        .json({ message: "No se puede eliminar tareas no completadas" });
    }

    await tarea.destroy();

    res.status(200).json({ message: "Tarea eliminada con éxito" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al eliminar la tarea" });
  }
};

module.exports = {
  crearTarea,
  obtenerTareas,
  obtenerTareaPorId,
  actualizarTarea,
  eliminarTarea,
};
