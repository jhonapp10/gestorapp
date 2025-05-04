import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { store } from './redux/store';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './redux';
//import { AuthProvider } from "././context/AuthContext";
import Dashboard from './Dashboard';
import ProtectedRoute from './users/components/ProtectedRoute';
import Navbar from './navbar/components/Navbar';
import Ventas from './ventas/ventas';
import VentaForm from './ventas/components/ventaForm';
import VentasList from './ventas/components/ventasList';
import Compras from './compras/compras';
import CompraForm from './compras/components/compraForm';
import ComprasList from './compras/components/comprasList';
import Clientes from './clientes/clientes';
import Reparaciones from './reparaciones/reparaciones';
import Proveedores from './proveedores/proveedores';
//import Beneficios from './modules/Beneficios';
import ControlGanancias from './controlganancias/ControlGanancias';
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
          
          <Route path="/home" element={<ProtectedRoute><Dashboard /> 
          </ProtectedRoute>} />
          <Route path="/ventas" element={<ProtectedRoute><Ventas /></ProtectedRoute>} />
          <Route path="/ventas/new" element={<VentaForm />} />
          <Route path="/ventas/list" element={<VentasList />} />
          <Route path="/compras" element={<Compras />} />
          <Route path="/compras/new" element={<CompraForm />} />
          <Route path="/compras/list" element={<ComprasList />} />
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
