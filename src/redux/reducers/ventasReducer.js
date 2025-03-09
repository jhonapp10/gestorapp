import { combineReducers } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

const ventasInitialState = [];

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

export default ventasReducer;
/*const ventasSlice = createSlice({
  name: 'ventas',
  initialState: ventasInitialState,
  reducers: {
    addVenta: (state, action) => {
      state.push(action.payload);
    },
    updateVenta: (state, action) => {
      const index = state.findIndex(item => item.id === action.payload.id);
      if (index !== -1) state[index] = action.payload;
    },
    deleteVenta: (state, action) => {
      return state.filter(item => item.id !== action.payload);
    },
  },
});


export const { addVenta, updateVenta, deleteVenta } = ventasSlice.actions;

const ventasReducer = combineReducers({
    ventas: ventasSlice.reducer,
  });

export default ventasReducer;*/