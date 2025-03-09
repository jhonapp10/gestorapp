// Reparaciones Module
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addReparacion, updateReparacion, deleteReparacion } from '../redux/actions';
import ReparacionesList from './components/reparacionesList';
import ReparacionForm from './components/reparacionForm';

const Reparaciones = () => {
  const reparaciones = useSelector((state) => state.reparaciones);
  const dispatch = useDispatch();

  const handleAdd = (reparacion) => {
    dispatch(addReparacion(reparacion));
  };

  const handleUpdate = (reparacion) => {
    dispatch(updateReparacion(reparacion));
  };

  const handleDelete = (id) => {
    dispatch(deleteReparacion(id));
  };

  return (
    <div className="container mt-4">
      <h2>Gestión de Reparaciones</h2>
      <ReparacionForm onAdd={handleAdd} />
      <ReparacionesList reparaciones={reparaciones} onUpdate={handleUpdate} onDelete={handleDelete} />
    </div>
  );
};

export default Reparaciones;