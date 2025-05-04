const express = require('express');
const router = express.Router();
const Producto = require('../models/producto');

// Obtener todos los productos
router.get('/', async (req, res) => {
  const productos = await Producto.find();
  res.json(productos);
});

// Crear un nuevo producto
router.post('/', async (req, res) => {
  const nuevoProducto = new Producto(req.body);
  await nuevoProducto.save();
  res.json(nuevoProducto);
});

// Actualizar un producto
router.put('/:id', async (req, res) => {
  const productoActualizado = await Producto.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(productoActualizado);
});

// Eliminar un producto
router.delete('/:id', async (req, res) => {
  await Producto.findByIdAndDelete(req.params.id);
  res.json({ mensaje: 'Producto eliminado' });
});

module.exports = router;
