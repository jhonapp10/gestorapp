import { combineReducers } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

const clientesInitialState = {clientes:[],};


const clientesSlice = createSlice({
  name: 'clientes',
  initialState: clientesInitialState,
  reducers: {
    setCliente: (state, action) => {
      state.clientes = action.payload; // Cargar ventas desde una API o estado inicial
      console.log(state.clientes);
    },
    addCliente: (state, action) => {
        state.clientes.push(action.payload);
      },
      updateCliente: (state, action) => {
        const index = state.clientes.findIndex(item => item.id === action.payload.id);
        if (index !== -1) state.clientes[index] = action.payload;
      },
      deleteCliente: (state, action) => {
        return state.clientes.filter(item => item.id !== action.payload);
      },
  },
});

export const { addCliente, updateCliente, deleteCliente, setCliente } = clientesSlice.actions;

const clientesReducer = combineReducers({
  clientes: clientesSlice.reducer,
});

export default clientesReducer;