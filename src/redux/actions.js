export const addVenta = (venta) => ({
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
  
// Acciones para Compras
export const addCompra = (compra) => ({
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

// Acciones para Clientes
export const addCliente = (cliente) => ({
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


// Acciones para proveedores
export const addProveedor = (proveedor) => ({
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


// Acciones para reparaciones
export const addReparacion = (reparacion) => ({
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