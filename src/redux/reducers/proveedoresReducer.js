import { combineReducers } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

const proveedoresInitialState = [];

const proveedoresReducer = (state = proveedoresInitialState, action) => {
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

export default proveedoresReducer;

/*const proveedoresSlice = createSlice({
  name: 'proveedores',
  initialState: proveedoresInitialState,
  reducers: {
    addProveedor: (state, action) => {
      state.push(action.payload);
    },
    updateProveedor: (state, action) => {
      const index = state.findIndex(item => item.id === action.payload.id);
      if (index !== -1) state[index] = action.payload;
    },
    deleteProveedor: (state, action) => {
      return state.filter(item => item.id !== action.payload);
    },
  },
});

export const { addProveedor, updateProveedor, deleteProveedor } = proveedoresSlice.actions;

const proveedoresReducer = combineReducers({
  compras: proveedoresSlice.reducer,
});

export default proveedoresReducer;*/