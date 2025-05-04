const mongoose = require('mongoose');

const VentaSchema = new mongoose.Schema({
  fechaEntrega: { type: Date, default: Date.now },
  cliente: { type: mongoose.Schema.Types.ObjectId, ref: 'Cliente' },
  productos: [{ producto_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Producto' }, cantidad: Number, precio: Number }],
  estado: { type: String, enum: ['Pendiente', 'En Proceso', 'Completado'] },
  comprasAsociadas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Compras' }],
  typepago: { type: String, enum: ['Efectivo', 'Transferencia', 'Tarjeta'] },
  precio: Number,
  nota: String
});

module.exports = mongoose.model('Venta', VentaSchema);
