// Redux Reducers
import { combineReducers } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

const comprasInitialState = {compras:[],};

/*const comprasReducer = (state = comprasInitialState, action) => {
  switch (action.type) {
    case 'ADD_COMPRA':
      return [...state, action.payload];
    case 'UPDATE_COMPRA':
      return state.map((compra) =>
        compra.id === action.payload.id ? action.payload : compra
      );
    case 'DELETE_COMPRA':
      return state.filter((compra) => compra.id !== action.payload);
    default:
      return state;
  }
};

export default comprasReducer;*/


const comprasSlice = createSlice({
  name: 'compras',
  initialState: comprasInitialState,
  reducers: {
    setCompra: (state, action) => {
      state.compras = action.payload; // Cargar ventas desde una API o estado inicial
    },
    addCompra: (state, action) => {
      state.compras.push(action.payload);
    },
    updateCompra: (state, action) => {
      const index = state.compras.findIndex(item => item.id === action.payload.id);
      if (index !== -1) state.compras[index] = action.payload;
    },
    deleteCompra: (state, action) => {
      return state.compras.filter(item => item.id !== action.payload);
    },
  },
});

export const { addCompra, updateCompra, deleteCompra, setCompra } = comprasSlice.actions;

const comprasReducer = combineReducers({
  compras: comprasSlice.reducer,
});

export default comprasReducer;