const mongoose = require('mongoose');

const ClienteSchema = new mongoose.Schema({
  nombre: String,
  email: String,
  telefono: String,
  categoria: { type: String, enum: ['Técnico', 'Profesional', 'Cliente'] },
});

module.exports = mongoose.model('Cliente', ClienteSchema);
