import { combineReducers } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

/*const ventasInitialState = [];

const ventasReducer = (state = ventasInitialState, action) => {
  switch (action.type) {
    case 'ADD_VENTA':
      return [...state, action.payload];
    case 'UPDATE_VENTA':
      return state.map((venta) =>
        venta.id === action.payload.id ? action.payload : venta
      );
    case 'DELETE_VENTA':
      return state.filter((venta) => venta.id !== action.payload);
    default:
      return state;
  }
};

export default ventasReducer;*/
const ventasInitialState = {
  ventas: [] // Lista de ventas
};
const ventasSlice = createSlice({
  name: 'ventas',
  initialState: ventasInitialState,
  reducers: {
    setVenta: (state, action) => {
      state.ventas = action.payload; // Cargar ventas desde una API o estado inicial
    },
    addVenta: (state, action) => {
      state.ventas.push(action.payload);
    },
    updateVenta: (state, action) => {
      const index = state.ventas.findIndex(item => item.id === action.payload.id);
      if (index !== -1) state.ventas[index] = action.payload;
    },
    deleteVenta: (state, action) => {
      return state.ventas.filter(item => item.id !== action.payload);
    },
  },
});


export const { addVenta, updateVenta, deleteVenta,setVenta } = ventasSlice.actions;

const ventasReducer = combineReducers({
    ventas: ventasSlice.reducer,
  });

export default ventasReducer;