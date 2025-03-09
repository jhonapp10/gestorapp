import { combineReducers } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

const clientesInitialState = [];

const clientesReducer = (state = clientesInitialState, action) => {
  switch (action.type) {
    case 'ADD_CLIENTE':
      return [...state, action.payload];
    case 'UPDATE_CLIENTE':
      return state.map((cliente) =>
        cliente.id === action.payload.id ? action.payload : cliente
      );
    case 'DELETE_CLIENTE':
      return state.filter((cliente) => cliente.id !== action.payload);
    default:
      return state;
  }
};

export default clientesReducer;


/*const clientesSlice = createSlice({
  name: 'clientes',
  initialState: clientesInitialState,
  reducers: {
    addCliente: (state, action) => {
        state.push(action.payload);
      },
      updateCliente: (state, action) => {
        const index = state.findIndex(item => item.id === action.payload.id);
        if (index !== -1) state[index] = action.payload;
      },
      deleteCliente: (state, action) => {
        return state.filter(item => item.id !== action.payload);
      },
  },
});

export const { addCliente, updateCliente, deleteCliente } = clientesSlice.actions;

const clientesReducer = combineReducers({
  compras: clientesSlice.reducer,
});

export default clientesReducer;*/