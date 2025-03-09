import { combineReducers } from '@reduxjs/toolkit';
import ventasReducer from './reducers/ventasReducer';
import comprasReducer from './reducers/comprasReducer';
import clientesReducer from './reducers/clientesReducer';
import reparacionesReducer from './reducers/reparacionesReducer';
import proveedoresReducer from './reducers/proveedoresReducer';
import beneficiosReducer from './reducers/beneficiosReducer';
import productosReducer from './reducers/productosReducer';
const rootReducer = combineReducers({
  // Aquí irán los reducers individuales
  ventas: ventasReducer,
  compras: comprasReducer,
  clientes: clientesReducer,
  reparaciones: reparacionesReducer,
  proveedores: proveedoresReducer,
  productos: productosReducer,
  beneficios: beneficiosReducer,
});

export default rootReducer;
