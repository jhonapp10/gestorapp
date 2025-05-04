const express = require('express');
const router = express.Router();
const Compra = require('../models/compra');

// Obtener todos los clientes
router.get('/', async (req, res) => {
  const compras = await Compra.find();
  res.json(compras);
});

// Ejemplo en Express
router.get("/api/compras/:ventaId", async (req, res) => {
  const compras = await Compra.find({ venta: req.params.ventaId });
  res.json(compras);
});

// Crear un nuevo producto
router.post('/', async (req, res) => {
  const nuevoCompra = new Compra(req.body);
  await nuevoCompra.save();
  res.json(nuevoCompra);
});

// Actualizar un producto
router.put('/:id', async (req, res) => {
  const compraActualizado = await Compra.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(compraActualizado);
});

// Eliminar un producto
router.delete('/:id', async (req, res) => {
  await Compra.findByIdAndDelete(req.params.id);
  res.json({ mensaje: 'Compra eliminado' });
});

module.exports = router;
