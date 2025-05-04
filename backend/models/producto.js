const mongoose = require('mongoose');

const ProductoSchema = new mongoose.Schema({
  nombre: String,
  precio: Number,
  categoria:{ type: String, enum: ['Electrónica', 'Muebles de Cocina', 'Accesorios'] },
  stock: Number,
});

module.exports = mongoose.model('Producto', ProductoSchema);
