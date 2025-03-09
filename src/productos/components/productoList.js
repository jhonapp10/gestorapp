import React from "react";
import { Table, Button, Form } from "react-bootstrap";

const ProductoList = ({ productos, onUpdate, onDelete }) => {
  const handleChange=(id,field,value)=>{
    onUpdate(id,field,value);
  }
  
  
  
    return (
    <Table striped bordered hover className="mt-3">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Precio sin IVA</th>
          <th>Precio con IVA</th>
          <th>Categoría</th>
          <th>Stock</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {productos.map((producto) => (
          <tr key={producto.id}>
            <td>
              <Form.Control type="text" value={producto.nombre} 
                onChange={(e) => handleChange(producto.id, "nombre", e.target.value)} />
            </td>
            <td>
              <Form.Control type="number" value={producto.precio} 
                onChange={(e) => handleChange(producto.id, "precio", e.target.value)} />
            </td>
            <td>${(producto.precio * 1.12).toFixed(2)}</td>
            <td>
              <Form.Select value={producto.categoria} onChange={(e) => handleChange(producto.id, "categoria", e.target.value)}>
                <option value="Electrónica">Electrónica</option>
                <option value="Muebles de Cocina">Muebles de Cocina</option>
                <option value="Accesorios">Accesorios</option>
              </Form.Select>
            </td>
            <td>
              <Form.Control type="number" value={producto.stock} 
                onChange={(e) => handleChange(producto.id, "stock", e.target.value)} />
            </td>
            <td>
              <Button variant="danger" onClick={() => onDelete(producto.id)}>Eliminar</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default ProductoList;