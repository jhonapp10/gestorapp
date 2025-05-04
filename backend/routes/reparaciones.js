const express = require('express');
const router = express.Router();
const Reparacion = require('../models/reparacion');

// Obtener todos los clientes
router.get('/', async (req, res) => {
  const reparaciones = await Reparacion.find();
  res.json(reparaciones);
});

// get id  reparaciones
router.get('/:id', async (req, res) => {
  const reparacion = await Reparacion.findById(req.params.id).then(repair => {
    if (!repair) {
      return res.status(404).json({ error: "Reparación no encontrada" });
    }
    res.json(repair);
  }).catch(error => {
    console.error("Error al buscar reparación:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  });
});

// Crear un nuevo producto
router.post('/', async (req, res) => {
  const nuevoReparacion = new Reparacion(req.body);
  await nuevoReparacion.save();
  res.json(nuevoReparacion);
});

// Actualizar un producto
router.put('/:id', async (req, res) => {
  const reparacionActualizado = await Reparacion.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(reparacionActualizado);
});

// Eliminar un producto
router.delete('/:id', async (req, res) => {
  await Reparacion.findByIdAndDelete(req.params.id);
  res.json({ mensaje: 'Reparacion eliminado' });
});

module.exports = router;
