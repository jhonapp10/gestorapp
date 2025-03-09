// Proveedores Module
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addProveedor, updateProveedor, deleteProveedor } from '../redux/actions';
import ProveedoresList from './components/proveedoresList';
import ProveedorForm from './components/proveedorForm';

const Proveedores = () => {
  const proveedores = useSelector((state) => state.proveedores);
  const dispatch = useDispatch();

  const handleAdd = (proveedor) => {
    dispatch(addProveedor(proveedor));
  };

  const handleUpdate = (proveedor) => {
    dispatch(updateProveedor(proveedor));
  };

  const handleDelete = (id) => {
    dispatch(deleteProveedor(id));
  };

  return (
    <div className="container mt-4">
      <h2>Gestión de Proveedores</h2>
      <ProveedorForm onAdd={handleAdd} />
      <ProveedoresList proveedores={proveedores} onUpdate={handleUpdate} onDelete={handleDelete} />
    </div>
  );
};

export default Proveedores;
