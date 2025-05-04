// Reparaciones Module
import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addReparaciones, updateReparaciones, deleteReparaciones, fetchReparaciones } from '../redux/actions';
import ReparacionesList from './components/reparacionesList';
import ReparacionForm from './components/reparacionForm';

const Reparaciones = () => {
  const [reparaciones, setReparacion]= useState([]);
  //const reparaciones = useSelector((state) => state.reparaciones?.reparaciones || []);
  const dispatch = useDispatch();

    /*useEffect(()=>{
      dispatch(fetchReparaciones());
    },[dispatch]);*/

    useEffect(() => {
          // Simulación de una llamada a una API
          const cargarReparaciones = async () => {
            const response = await fetch('http://localhost:5000/api/reparaciones'); // Ajusta la URL a tu backend
            console.log('Reparaciones',response);
            const data = await response.json();
            setReparacion(data);
            dispatch(fetchReparaciones()); // Enviamos los datos al store
          };
      
          cargarReparaciones();
        }, [dispatch]);
    

  const handleAdd = (reparacion) => {
    dispatch(addReparaciones(reparacion));
  };

  const handleUpdate = (reparacion) => {
    dispatch(updateReparaciones(reparacion));
  };

  const handleDelete = (id) => {
    dispatch(deleteReparaciones(id));
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