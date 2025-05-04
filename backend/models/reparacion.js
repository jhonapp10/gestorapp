const mongoose = require('mongoose');

const ReparacionSchema = new mongoose.Schema(
  {
  
  descripcion: String,
  cliente: { type: mongoose.Schema.Types.ObjectId, ref: 'Clientes' },
  estado: { type: String, enum: ['Pendiente', 'En Proceso', 'Completado'] },
  datereparacion: { type: Date, default: Date.now },
  tecnico:  { type: mongoose.Schema.Types.ObjectId, ref: 'Clientes' },
  precio: Number
});

module.exports = mongoose.model('Reparacion', ReparacionSchema);
