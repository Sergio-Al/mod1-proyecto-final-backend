const { Tarea } = require('../models');

const crearTarea = async (req, res) => {
  const { titulo, descripcion, estado, fecha_limite } = req.body;

  try {
    const nuevaTarea = await Tarea.create({
      titulo,
      descripcion,
      estado,
      fecha_limite,
      usuarioId: req.usuario.dataValues.id, // Asumiendo que el ID del usuario está en req.usuario.id
    });

    res.status(201).json(nuevaTarea);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear la tarea' });
  }
}

const obtenerTareas = async (req, res) => {
  try {
    const tareas = await Tarea.findAll({
      where: { usuarioId: req.usuario.id }, // Filtrar por el ID del usuario
    });

    res.status(200).json(tareas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener las tareas' });
  }
}

const obtenerTareaPorId = async (req, res) => {
  const { id } = req.params;

  try {
    const tarea = await Tarea.findByPk(id);

    if (!tarea) {
      return res.status(404).json({ message: 'Tarea no encontrada' });
    }

    res.status(200).json(tarea);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener la tarea' });
  }
}

const actualizarTarea = async (req, res) => {
  const { id } = req.params;
  const { titulo, descripcion, estado, fecha_limite } = req.body;

  try {
    const tarea = await Tarea.findByPk(id);

    if (!tarea) {
      return res.status(404).json({ message: 'Tarea no encontrada' });
    }

    await tarea.update({
      titulo,
      descripcion,
      estado,
      fecha_limite,
    });

    res.status(200).json(tarea);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar la tarea' });
  }
}

const eliminarTarea = async (req, res) => {
  const { id } = req.params;

  try {
    const tarea = await Tarea.findByPk(id);

    if (!tarea) {
      return res.status(404).json({ message: 'Tarea no encontrada' });
    }

    await tarea.destroy();

    res.status(200).json({ message: 'Tarea eliminada con éxito' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar la tarea' });
  }
}

module.exports = {
  crearTarea,
  obtenerTareas,
  obtenerTareaPorId,
  actualizarTarea,
  eliminarTarea,
};
