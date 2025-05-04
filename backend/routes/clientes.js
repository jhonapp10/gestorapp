const express = require('express');
const router = express.Router();
const Cliente = require('../models/cliente');

// Obtener todos los clientes
router.get('/', async (req, res) => {
  const clientes = await Cliente.find();
  res.json(clientes);
});

// Actualizar un producto
router.get('/:id', async (req, res) => {
  const cliente = await Cliente.findById(req.params.id);
  res.json(cliente);
});

// Crear un nuevo producto
router.post('/', async (req, res) => {
  const nuevoCliente = new Cliente(req.body);
  await nuevoCliente.save();
  res.json(nuevoCliente);
});

// Actualizar un producto
router.put('/:id', async (req, res) => {
  const clienteActualizado = await Cliente.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(clienteActualizado);
});

// Eliminar un producto
router.delete('/:id', async (req, res) => {
  await Cliente.findByIdAndDelete(req.params.id);
  res.json({ mensaje: 'Cliente eliminado' });
});

module.exports = router;
