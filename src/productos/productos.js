// Proveedores Module
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addProductos, updateProductos, deleteProductos } from '../redux/actions';
import ProductoList from './components/productoList';
import ProductoForm from './components/productoForm';

const Productos = () => {
  const productos = useSelector((state) => state.productos);
  const dispatch = useDispatch();

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