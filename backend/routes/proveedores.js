const express = require('express');
const router = express.Router();
const Proveedor = require('../models/proveedor');

// Obtener todos los clientes
router.get('/', async (req, res) => {
  try{
  const proveedores = await Proveedor.find();
  res.json(proveedores);
} catch (error) {
  res.status(500).json({ message: "Error al obtener proveedores", error });
}
});

// Crear un nuevo producto
router.post('/', async (req, res) => {
  const nuevoProveedor = new Proveedor(req.body);
  await nuevoProveedor.save();
  res.json(nuevoProveedor);
});

// Actualizar un producto
router.put('/:id', async (req, res) => {
  const proveedorActualizado = await Proveedor.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(proveedorActualizado);
});

// Eliminar un producto
router.delete('/:id', async (req, res) => {
  await Proveedor.findByIdAndDelete(req.params.id);
  res.json({ mensaje: 'proveedor eliminado' });
});

module.exports = router;
