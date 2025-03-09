// Compras Module
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addCompra, updateCompra, deleteCompra } from '../redux/actions';
import ComprasList from './components/comprasList';
import CompraForm from './components/compraForm';

const Compras = () => {
  const compras = useSelector((state) => state.compras);
  const dispatch = useDispatch();

  const handleAdd = (compra) => {
    console.log(compra);
    dispatch(addCompra(compra));
  };

  const handleUpdate = (compra) => {
    dispatch(updateCompra(compra));
  };

  const handleDelete = (id) => {
    dispatch(deleteCompra(id));
  };

  return (
    <div className="container mt-4">
      <h2>Gestión de Compras</h2>
      <CompraForm onAdd={handleAdd} />
      <ComprasList compras={compras} onUpdate={handleUpdate} onDelete={handleDelete} />
    </div>
  );
};

export default Compras;
