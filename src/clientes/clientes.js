// Clientes Module
import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addClientes, updateClientes, deleteClientes, fetchCliente } from '../redux/actions';
import ClientesList from './components/clientesList';
import ClienteForm from './components/clienteForm';

const Clientes = () => {
  const [clientes, setClientes] = useState([]);
  //const clientes = useSelector((state) => state.clientes);
  const dispatch = useDispatch();

  useEffect(()=>{
    const fechData= async()=>{
      const response = await fetch('http://localhost:5000/api/clientes'); // Ajusta la URL a tu backend
      const data = await response.json();
      console.log(data);
      setClientes(data);      
      await dispatch(fetchCliente());
    };
    fechData();    
     
  },[dispatch]);

  /*useEffect(() => {
    // Simulación de una llamada a una API
    const cargarClientes = async () => {
      const response = await fetch('http://localhost:5000/api/clientes'); // Ajusta la URL a tu backend
      const data = await response.json();
      dispatch(fetchCliente(data)); // Enviamos los datos al store
    };

    cargarClientes();
  }, [dispatch]);*/

  const handleAdd = (cliente) => {

    dispatch(addClientes(cliente));
  };

  const handleUpdate = (cliente) => {
    console.log("Clientes a Actualizar: ", cliente);
    dispatch(updateClientes(cliente));
  };

  const handleDelete = (id) => {
    console.log("Cliente a eliminar: ", id);
    dispatch(deleteClientes(id));
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