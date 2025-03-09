// Ventas Module
import React, { useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addVenta, updateVenta, deleteVenta } from '../redux/actions';
import VentasList from './components/ventasList';
import VentaForm from './components/ventaForm';
import { Button, Table } from 'react-bootstrap';

const Ventas = () => {
  const ventas = useSelector((state) => state.ventas);
  const dispatch = useDispatch();
  
  if (!ventas) return <p>Cargando...</p>;

  

  const handleAdd = (venta) => {
    dispatch(addVenta(venta));
  };

  const handleUpdate = (venta) => {
    dispatch(updateVenta(venta));
  };

  const handleDelete = (id) => {
    dispatch(deleteVenta(id));
  };

  return (
    <div className="container mt-4">
      <h2>Gestión de Ventas</h2>
      <VentaForm onAdd={handleAdd} />
      <VentasList ventas={ventas} onUpdate={handleUpdate} onDelete={handleDelete} />
      
      
    </div>
  );
};

export default Ventas;