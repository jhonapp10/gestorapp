// Redux Reducers
import { combineReducers } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

const productosInitialState = [];

const productosReducer = (state = productosInitialState, action) => {
  switch (action.type) {
    case 'ADD_PRODUCTO':
      return [...state, action.payload];
    case 'UPDATE_PRODUCTO':
      return state.map((producto) =>
        producto.id === action.payload.id 
        ? {...producto,[action.payload.field]: action.payload.value}
        : producto  
    );
    case 'DELETE_PRODUCTO':
      return state.filter((producto) => producto.id !== action.payload);
    default:
      return state;
  }
};

export default productosReducer;
