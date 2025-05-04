import { combineReducers } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

const reparacionesInitialState = {
  reparaciones:[],
};


/*const reparacionesReducer = (state = reparacionesInitialState, action) => {
  switch (action.type) {
    case 'ADD_REPARACION':
      return [...state, action.payload];
    case 'UPDATE_REPARACION':
      return state.map((reparacion) =>
        reparacion.id === action.payload.id ? action.payload : reparacion
      );
    case 'DELETE_REPARACION':
      return state.filter((reparacion) => reparacion.id !== action.payload);
    default:
      return state;
  }
};

export default reparacionesReducer;*/


const reparacionesSlice = createSlice({
    name: 'reparaciones',
    initialState: reparacionesInitialState,
    reducers: {
      setReparacion: (state, action) => {
        state.reparaciones = action.payload; // Cargar ventas desde una API o estado inicial
      },
      addReparacion: (state, action) => {
        state.reparaciones.push(action.payload);
      },
      updateReparacion: (state, action) => {
        const index = state.reparaciones.findIndex(item => item.id === action.payload.id);
        if (index !== -1) state.reparaciones[index] = action.payload;
      },
      deleteReparacion: (state, action) => {
        return state.reparaciones.filter(item => item.id !== action.payload);
      },
    },
  });
  

export const { addReparacion, updateReparacion, deleteReparacion, setReparacion } = reparacionesSlice.actions;

const reparacionReducer = combineReducers({
  reparaciones: reparacionesSlice.reducer,
});

export default reparacionReducer;