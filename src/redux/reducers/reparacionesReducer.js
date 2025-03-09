import { combineReducers } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

const reparacionesInitialState = [];


const reparacionesReducer = (state = reparacionesInitialState, action) => {
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

export default reparacionesReducer;


/*const reparacionesSlice = createSlice({
    name: 'reparaciones',
    initialState: reparacionesInitialState,
    reducers: {
      addReparacion: (state, action) => {
        state.push(action.payload);
      },
      updateReparacion: (state, action) => {
        const index = state.findIndex(item => item.id === action.payload.id);
        if (index !== -1) state[index] = action.payload;
      },
      deleteReparacion: (state, action) => {
        return state.filter(item => item.id !== action.payload);
      },
    },
  });
  

export const { addReparacion, updateReparacion, deleteReparacion } = reparacionesSlice.actions;

const reparacionReducer = combineReducers({
  compras: reparacionesSlice.reducer,
});

export default reparacionReducer;*/