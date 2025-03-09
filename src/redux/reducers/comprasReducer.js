// Redux Reducers
import { combineReducers } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

const comprasInitialState = [];

const comprasReducer = (state = comprasInitialState, action) => {
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

export default comprasReducer;


/*const comprasSlice = createSlice({
  name: 'compras',
  initialState: comprasInitialState,
  reducers: {
    addCompra: (state, action) => {
      state.push(action.payload);
    },
    updateCompra: (state, action) => {
      const index = state.findIndex(item => item.id === action.payload.id);
      if (index !== -1) state[index] = action.payload;
    },
    deleteCompra: (state, action) => {
      return state.filter(item => item.id !== action.payload);
    },
  },
});

export const { addCompra, updateCompra, deleteCompra } = comprasSlice.actions;

const comprasReducer = combineReducers({
  compras: comprasSlice.reducer,
});

export default comprasReducer;*/