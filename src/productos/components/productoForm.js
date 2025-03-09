import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

const ProductoForm = ({ onAdd }) => {
  const [producto, setProducto] = useState({ nombre: "", precio: "",categoria:"Electronica", stock: "" });

  const handleChange = (e) => {
    setProducto({ ...producto, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (producto.nombre && producto.precio && producto.stock) {
        console.log(producto);
      onAdd(producto);
      setProducto({ nombre: "", precio: "", stock: "" });
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="mt-3">
      <Form.Group className="mb-2">
        <Form.Label>Nombre</Form.Label>
        <Form.Control type="text" name="nombre" value={producto.nombre} onChange={handleChange} required />
      </Form.Group>
      <Form.Group className="mb-2">
        <Form.Label>Precio</Form.Label>
        <Form.Control type="number" name="precio" value={producto.precio} onChange={handleChange} required />
      </Form.Group>
      <Form.Group>
        <Form.Label>Categoría</Form.Label>
        <Form.Select name="categoria" value={producto.categoria} onChange={handleChange}>
          <option value="Electrónica">Electrónica</option>
          <option value="Muebles de Cocina">Muebles de Cocina</option>
          <option value="Accesorios">Accesorios</option>
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-2">
        <Form.Label>Stock</Form.Label>
        <Form.Control type="number" name="stock" value={producto.stock} onChange={handleChange} required />
      </Form.Group>
      <Button variant="primary" type="submit">Agregar Producto</Button>
    </Form>
  );
};

export default ProductoForm;