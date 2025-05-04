const mongoose = require('mongoose');

const ProveedorSchema = new mongoose.Schema({
  nombre: {type: String,required:true},
  contacto: String,
  telefono: String,
  numerocuenta: String,
});

module.exports = mongoose.model('Proveedor', ProveedorSchema);
