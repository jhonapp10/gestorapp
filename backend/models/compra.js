const mongoose = require('mongoose');

const CompraSchema = new mongoose.Schema({
  datecompra: { type: Date, default: Date.now },
  proveedor: { type: mongoose.Schema.Types.ObjectId, ref: 'Proveedores' },
  productos: [{ producto_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Productos' }, cantidad: Number, precio: Number }],
  estado: { type: String, enum: ['Pendiente', 'En Proceso', 'Completado'] },
  precio: Number,
});

module.exports = mongoose.model('Compra', CompraSchema);
