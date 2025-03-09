// Clientes Module
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addCliente, updateCliente, deleteCliente } from '../redux/actions';
import ClientesList from './components/clientesList';
import ClienteForm from './components/clienteForm';

const Clientes = () => {
  const clientes = useSelector((state) => state.clientes);
  const dispatch = useDispatch();

  const handleAdd = (cliente) => {
    dispatch(addCliente(cliente));
  };

  const handleUpdate = (cliente) => {
    dispatch(updateCliente(cliente));
  };

  const handleDelete = (id) => {
    dispatch(deleteCliente(id));
  };

  return (
    <div className="container mt-4">
      <h2>Gestión de Clientes</h2>
      <ClienteForm onAdd={handleAdd} />
      <ClientesList clientes={clientes} onUpdate={handleUpdate} onDelete={handleDelete} />
    </div>
  );
};

export default Clientes;