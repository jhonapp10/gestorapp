// Proveedores Module
import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addProveedores, updateProveedores, deleteProveedores, fetchProveedor } from '../redux/actions';
import ProveedoresList from './components/proveedoresList';
import ProveedorForm from './components/proveedorForm';

const Proveedores = () => {
  const [proveedores, setProveedors] = useState([]);
  console.log(proveedores);
  //const proveedores = useSelector((state) => state.proveedores.proveedores.proveedores);
  const dispatch = useDispatch();

  useEffect(()=>{
      const fechData= async()=>{
        const response = await fetch('http://localhost:5000/api/proveedores'); // Ajusta la URL a tu backend
        const data = await response.json();
        console.log(data);
        setProveedors(data);      
        await dispatch(fetchProveedor());
      };
      fechData();    
       
    },[dispatch]);
  
  /*useEffect(() => {
        // Simulación de una llamada a una API
        const cargarProveedores = async () => {
          const response = await fetch('http://localhost:5000/api/proveedores'); // Ajusta la URL a tu backend
          const data = await response.json();
          dispatch(fetchProveedor(data)); // Enviamos los datos al store
        };
    
        cargarProveedores();
      }, [dispatch]);*/
  const handleAdd = (proveedor) => {
    dispatch(addProveedores(proveedor));
  };

  const handleUpdate = (proveedor) => {
    dispatch(updateProveedores(proveedor));
  };

  const handleDelete = (id) => {
    dispatch(deleteProveedores(id));
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
