import axios from 'axios';
import { createAsyncThunk } from "@reduxjs/toolkit";

import { setCliente,addCliente,updateCliente,deleteCliente } from './reducers/clientesReducer';
import { setVenta,addVenta,updateVenta,deleteVenta } from './reducers/ventasReducer';
import { setCompra,addCompra,updateCompra,deleteCompra } from './reducers/comprasReducer';
import {setProveedor,addProveedor,deleteProveedor,updateProveedor} from './reducers/proveedoresReducer'
import {setProducto,addProducto,deleteProducto,updateProducto} from './reducers/productosReducer';
import {setReparacion,addReparacion,deleteReparacion,updateReparacion} from './reducers/reparacionesReducer';

/*export const addVenta = (venta) => ({
    type: 'ADD_VENTA',
    payload: venta,
  });
  
export const updateVenta = (venta) => ({
    type: 'UPDATE_VENTA',
    payload: venta,
  });
  
export const deleteVenta = (id) => ({
    type: 'DELETE_VENTA',
    payload: id,
  });
*/
  
export const fetchVentas = () => async (dispatch) => {
 try{
  const res = await axios.get('http://localhost:5000/api/ventas');
  console.log('ventas',res.data);
  dispatch(setVenta(res.data || []));
  }catch(error){
    dispatch(setVenta([]));
   console.error("Error cargando ventas",error);
}
};

export const addVentas = (venta) => async (dispatch) => {
 
 try{
  const res = await axios.post('http://localhost:5000/api/ventas', venta);
  dispatch(addVenta(res.data || []));
  }catch(error){
    dispatch(addVenta([]));
   console.error("Error añadiendo ventas",error);
}
};

export const updateVentas = (venta) => async (dispatch) => {
  try{
  const res = await axios.put(`http://localhost:5000/api/ventas/${venta.id}`, venta);

  dispatch(updateVenta(venta || []));
  }catch(error){
    dispatch(updateVenta([]));
   console.error("Error actualizados ventas",error);
}
};

export const deleteVentas = (id) => async (dispatch) => {
  try{
  await axios.delete(`http://localhost:5000/api/ventas/${id}`);
  dispatch(deleteVenta(id || []));
  }catch(error){
    dispatch(deleteVenta([]));
   console.error("Error eliminar ventas",error);
}
};

  
// Acciones para Compras
/*export const addCompra = (compra) => ({
  type: 'ADD_COMPRA',
  payload: compra,
});

export const updateCompra = (compra) => ({
  type: 'UPDATE_COMPRA',
  payload: compra,
});

export const deleteCompra = (id) => ({
  type: 'DELETE_COMPRA',
  payload: id,
});
*/
export const fetchCompra = () => async (dispatch) => {
  try{
  const res = await axios.get('http://localhost:5000/api/compras');
  dispatch(setCompra(res.data || []));
  }catch(error){
    dispatch(setCompra([]));
   console.error("Error cargando clientes",error);
}
};

export const addCompras = (compra) => async (dispatch) => {
  try{
  const res = await axios.post('http://localhost:5000/api/compras', compra);
  dispatch(addCompra(res.data || []));
}catch(error){
  dispatch(addCompra([]));
console.error("Error cargando clientes",error);
}
};

export const updateCompras = (compra) => async (dispatch) => {
  try{
  const res = await axios.put(`http://localhost:5000/api/compras/${compra.id}`, compra);
  dispatch(updateCompra(res.data || []));
}catch(error){
  dispatch(updateCompra([]));
console.error("Error cargando clientes",error);
}
};

export const deleteCompras = (id) => async (dispatch) => {
  try{
  await axios.delete(`http://localhost:5000/api/compras/${id}`);
  dispatch(deleteCompra(id || []));
}catch(error){
  dispatch(deleteCompra([]));
console.error("Error cargando clientes",error);
}
};


// Acciones para Clientes
/*export const addCliente = (cliente) => ({
  type: 'ADD_CLIENTE',
  payload: cliente,
});

export const updateCliente = (cliente) => ({
  type: 'UPDATE_CLIENTE',
  payload: cliente,
});

export const deleteCliente = (id) => ({
  type: 'DELETE_CLIENTE',
  payload: id,
});
*/

//clientes


// Base URL de la API (ajústala según tu backend)
const API_URL = "http://localhost:5000/api/clientes"; 

// 🔹 Acción para obtener clientes desde la API
export const fetchCliente = createAsyncThunk("clientes/fetchCliente", async (_, thunkAPI) => {
  try {
    const response = await axios.get(API_URL);
    thunkAPI.dispatch(setCliente(response.data)); // ✅ Guarda los clientes en el store
    return response.data;
  } catch (error) {
    console.error("Error al obtener clientes:", error);
    return thunkAPI.rejectWithValue(error.response?.data || error.message);
  }
});

// 🔹 Acción para agregar un nuevo cliente
export const addClientes = createAsyncThunk("clientes/addClientes", async (cliente, thunkAPI) => {
  try {
    const response = await axios.post(API_URL, cliente);
    thunkAPI.dispatch(addCliente(response.data)); // ✅ Agrega el cliente al store
    return response.data;
  } catch (error) {
    console.error("Error al agregar cliente:", error);
    return thunkAPI.rejectWithValue(error.response?.data || error.message);
  }
});

// 🔹 Acción para actualizar un cliente
export const updateClientes = createAsyncThunk("clientes/updateClientes", async (cliente, thunkAPI) => {
  try {
    await axios.put(`${API_URL}/${cliente.id}`, cliente);
    thunkAPI.dispatch(updateCliente(cliente)); // ✅ Actualiza el cliente en el store
    return cliente;
  } catch (error) {
    console.error("Error al actualizar cliente:", error);
    return thunkAPI.rejectWithValue(error.response?.data || error.message);
  }
});

// 🔹 Acción para eliminar un cliente
export const deleteClientes = createAsyncThunk("clientes/deleteClientes", async (clienteId, thunkAPI) => {
  try {
    await axios.delete(`${API_URL}/${clienteId}`);
    thunkAPI.dispatch(deleteCliente(clienteId)); // ✅ Elimina el cliente del store
    return clienteId;
  } catch (error) {
    console.error("Error al eliminar cliente:", error);
    return thunkAPI.rejectWithValue(error.response?.data || error.message);
  }
});


/*export const fetchCliente = () => async (dispatch) => {
  try{
    const res = await axios.get('http://localhost:5000/api/clientes');
    dispatch(setCliente(res.data));
    }catch(error){
      dispatch(setCliente([]));
    console.error("Error cargando clientes",error);
  }
  
};

export const addClientes = (cliente) => async (dispatch) => {
  try{
    const res = await axios.post('http://localhost:5000/api/clientes', cliente);
    dispatch(addCliente(res.data));
  }catch(error){
    dispatch(addCliente([]));
  console.error("Error add clientes",error);
}
};

export const updateClientes = (cliente) => async (dispatch) => {
  try{
  const res = await axios.put(`http://localhost:5000/api/clientes/${cliente.id}`, cliente);
  dispatch(updateCliente(res.data));
}catch(error){
  dispatch(updateCliente([]));
console.error("Error update clientes",error);}
};

export const deleteClientes = (id) => async (dispatch) => {
  try{
  await axios.delete(`http://localhost:5000/api/clientes/${id}`);
  dispatch(deleteCliente(id));
}catch(error){
  dispatch(deleteCliente([]));
  console.error("Error update clientes",error);}
};*/


// Acciones para proveedores
/*export const addProveedor = (proveedor) => ({
  type: 'ADD_PROVEEDOR',
  payload: proveedor,
});

export const updateProveedor = (proveedor) => ({
  type: 'UPDATE_PROVEEDOR',
  payload: proveedor,
});

export const deleteProveedor = (id) => ({
  type: 'DELETE_PROVEEDOR',
  payload: id,
});
*/
export const fetchProveedor = () => async (dispatch) => {
  
  try{
    const res = await axios.get('http://localhost:5000/api/proveedores');
    console.log(res);
    dispatch(setProveedor(res.data));
  }catch(error){
    console.error("no se ha podido cargar proveedor", error);
  }
  
};

export const addProveedores = (proveedor) => async (dispatch) => {
  try{
  const res = await axios.post('http://localhost:5000/api/proveedores', proveedor);
  dispatch(addProveedor(res.data));
}catch(error){
  console.error("no se ha podido añadir proveedor", error);
}
};

export const updateProveedores = (proveedor) => async (dispatch) => {
 try{
  const res = await axios.put(`http://localhost:5000/api/proveedores/${proveedor._id}`, proveedor);
  dispatch(updateProveedor(res.data));
}catch(error){
  console.error("no se ha podido actualizar proveedor", error);
}
};

export const deleteProveedores = (id) => async (dispatch) => {
 try{
  await axios.delete(`http://localhost:5000/api/proveedores/${id}`);
  dispatch(deleteProveedor(id));
}catch(error){
  console.error("no se ha podido eliminar proveedor", error);
}
};


// Acciones para reparaciones
/*export const addReparacion = (reparacion) => ({
  type: 'ADD_REPARACION',
  payload: reparacion,
});

export const updateReparacion = (reparacion) => ({
  type: 'UPDATE_REPARACION',
  payload: reparacion,
});

export const deleteReparacion = (id) => ({
  type: 'DELETE_REPARACION',
  payload: id,
});
*/
export const fetchReparaciones = () => async (dispatch) => {
  try{
  const res = await axios.get('http://localhost:5000/api/reparaciones');
  console.log('Reparaciones',res.data);
  dispatch(setReparacion(res.data || []));
    }catch(error){
      dispatch(setReparacion([]));
    console.error("Error cargando reparaciones",error);
  }
};

export const addReparaciones = (reparacion) => async (dispatch) => {
  try{
  const res = await axios.post('http://localhost:5000/api/reparaciones', reparacion);
  dispatch(addReparacion(res.data || []));
    }catch(error){
      dispatch(addReparacion([]));
    console.error("Error añadiendo reparaciones",error);
  }
};

export const updateReparaciones = (reparacion) => async (dispatch) => {
  try{
  const res = await axios.put(`http://localhost:5000/api/reparaciones/${reparacion._id}`, reparacion);
  dispatch(updateReparacion(res.data || []));
    }catch(error){
      dispatch(updateReparacion([]));
    console.error("Error actualizando reparaciones",error);
  }
};


export const deleteReparaciones = (id) => async (dispatch) => {
  try{
  await axios.delete(`http://localhost:5000/api/reparaciones/ ${id}`);
  dispatch(deleteReparacion(id || []));
    }catch(error){
      dispatch(deleteReparacion([]));
    console.error("Error eliminando reparaciones",error);
  }
};



// Acciones para productos
/*export const addProductos = (producto) => ({
  type: 'ADD_PRODUCTO',
  payload: {...producto,id: Date.now()},
});

export const updateProductos = (id,field,value) => ({
  type: 'UPDATE_PRODUCTO',
  payload: {id,field,value},
});

export const deleteProductos = (id) => ({
  type: 'DELETE_PRODUCTO',
  payload: id,
});

*/

export const fetchProductos = () => async (dispatch) => {
  try{
  const res = await axios.get('http://localhost:5000/api/productos');
  console.log('productos',res.data);
  dispatch(setProducto(res.data || []));
    }catch(error){
      dispatch(setProducto([]));
    console.error("Error cargando productos",error);
  }
};

export const addProductos = (producto) => async (dispatch) => {
  try{
    console.log("producto agregado: ", producto);
  const res = await axios.post('http://localhost:5000/api/productos', producto);
  dispatch(addProducto(res.data || []));
    }catch(error){
      dispatch(addProducto([]));
    console.error("Error añadir producto",error);
  }
};

export const updateProductos = (producto) => async (dispatch) => {
  try{
  const res = await axios.put(`http://localhost:5000/api/productos/${producto._id}`, producto);
  dispatch(updateProducto(res.data || []));
    }catch(error){
      dispatch(updateProducto([]));
    console.error("Error actualizar producto",error);
  }
};

export const deleteProductos = (id) => async (dispatch) => {
  try{
  await axios.delete(`http://localhost:5000/api/productos/${id}`);
  dispatch(deleteProducto(id || []));
    }catch(error){
      dispatch(deleteProducto([]));
    console.error("Error borrado productos",error);
  }
};
