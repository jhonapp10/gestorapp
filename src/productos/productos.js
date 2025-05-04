// Proveedores Module
import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addProductos, updateProductos, deleteProductos, fetchProductos } from '../redux/actions';
import ProductoList from './components/productoList';
import ProductoForm from './components/productoForm';

const Productos = () => {
  const [productos, setProducto] = useState([]);
  //const productos = useSelector((state) => state.productos?.productos || []);
  const dispatch = useDispatch();

  /*useEffect(()=>{
    dispatch(fetchProductos());
  },[dispatch]);*/

    useEffect(() => {
      // Simulación de una llamada a una API
      const cargarProductos = async () => {
        const response = await fetch('http://localhost:5000/api/productos'); // Ajusta la URL a tu backend
        const data = await response.json();
        setProducto(data);
        dispatch(fetchProductos()); // Enviamos los datos al store
      };
  
      cargarProductos();
    }, [dispatch]);

  const handleAdd = (producto) => {
    console.log("Productos_add:",producto);
    dispatch(addProductos(producto));
  };

  const handleUpdate = (id,field,value) => {
    
    console.log("Productos",id,field,value);



    
    dispatch(updateProductos(id,field,value));
  };

  const handleDelete = (id) => {
    dispatch(deleteProductos(id));
  };

  return (
    <div className="container mt-4">
      <h2>Gestión de Productos</h2>
      <ProductoForm onAdd={handleAdd} />
      <ProductoList productos={productos} onUpdate={handleUpdate} onDelete={handleDelete} />
    </div>
  );
};

export default Productos;