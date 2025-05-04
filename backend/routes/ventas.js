const express = require('express');
const router = express.Router();
const Venta = require('../models/venta');

// Obtener todos los clientes
router.get('/', async (req, res) => {
  const ventas = await Venta.find();
  res.json(ventas);
});

// Actualizar un producto
router.get('/:id', async (req, res) => {
  const venta = await Venta.findById(req.params.id);
  res.json(venta);
});

// Crear un nuevo producto
router.post('/', async (req, res) => {
  const nuevoVenta = new Venta(req.body);
  await nuevoVenta.save();
  res.json(nuevoVenta);
});

// Actualizar un producto
router.put('/:id', async (req, res) => {
  const ventaActualizado = await Venta.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(ventaActualizado);
});

// Eliminar un producto
router.delete('/:id', async (req, res) => {
  await Venta.findByIdAndDelete(req.params.id);
  res.json({ mensaje: 'Venta eliminado' });
});

module.exports = router;
