import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { store } from './redux/store';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './redux';
//import { AuthProvider } from "././context/AuthContext";

import Navbar from './navbar/components/Navbar';
import Ventas from './ventas/ventas';
import Compras from './compras/compras';
import Clientes from './clientes/clientes';
import Reparaciones from './reparaciones/reparaciones';
import Proveedores from './proveedores/proveedores';
//import Beneficios from './modules/Beneficios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CssBaseline } from '@mui/material';
import Login from "./users/components/Login";
import Register from "./users/components/Register";
import Productos from './productos/productos';


function App() {
  return (
    <Provider store={store}>
      <CssBaseline />
      <Router>
        <Navbar />
        <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
          <Route path="/ventas" element={<Ventas />} />
          <Route path="/compras" element={<Compras />} />
          <Route path="/clientes" element={<Clientes />} />
          <Route path="/reparaciones" element={<Reparaciones />} />
          <Route path="/proveedores" element={<Proveedores />} />
          <Route path="/productos" element={<Productos/>}/>          
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
