import { combineReducers } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

const proveedoresInitialState = {proveedores:[],};

/*const proveedoresReducer = (state = proveedoresInitialState, action) => {
  switch (action.type) {
    case 'ADD_PROVEEDOR':
      return [...state, action.payload];
    case 'UPDATE_PROVEEDOR':
      return state.map((proveedor) =>
        proveedor.id === action.payload.id ? action.payload : proveedor
      );
    case 'DELETE_PROVEEDOR':
      return state.filter((proveedor) => proveedor.id !== action.payload);
    default:
      return state;
  }
};

export default proveedoresReducer;*/

const proveedoresSlice = createSlice({
  name: 'proveedores',
  initialState: proveedoresInitialState,
  reducers: {
    setProveedor: (state, action) => {
      state.proveedores = action.payload || []; // Cargar ventas desde una API o estado inicial
      console.log(action.payload);
    },
    addProveedor: (state, action) => {
      state.proveedores.push(action.payload);
    },
    updateProveedor: (state, action) => {
      const index = state.proveedores.findIndex(item => item.id === action.payload.id);
      if (index !== -1) state.proveedores[index] = action.payload;
    },
    deleteProveedor: (state, action) => {
      return state.proveedores.filter(item => item.id !== action.payload);
    },
  },
});

export const { addProveedor, updateProveedor, deleteProveedor, setProveedor } = proveedoresSlice.actions;

const proveedoresReducer = combineReducers({
  proveedores: proveedoresSlice.reducer,
});

export default proveedoresReducer;