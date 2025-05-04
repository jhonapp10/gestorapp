// Redux Reducers
import { combineReducers } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

const productosInitialState = {productos:[],};

/*const productosReducer = (state = productosInitialState, action) => {
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

export default productosReducer;*/

const productoSlice = createSlice({
  name: 'producto',
  initialState: productosInitialState,
  reducers: {
    setProducto: (state, action) => {
      state.productos = action.payload; // Cargar ventas desde una API o estado inicial
    },
    addProducto: (state, action) => {
      state.productos.push(action.payload);
    },
    updateProducto: (state, action) => {
      const index = state.productos.findIndex(item => item.id === action.payload.id);
      if (index !== -1) state.productos[index] = action.payload;
    },
    deleteProducto: (state, action) => {
      return state.productos.filter(item => item.id !== action.payload);
    },
  },
});

export const { addProducto, updateProducto, deleteProducto, setProducto } = productoSlice.actions;

const productosReducer = combineReducers({
  productos: productoSlice.reducer,
});

export default productosReducer;
