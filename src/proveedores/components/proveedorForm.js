// ProveedorForm Component
import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

const ProveedorForm = ({ onAdd }) => {
  const [proveedor, setProveedor] = useState({ nombre: '', contacto: '', telefono: '' });

  const handleChange = (e) => {
    setProveedor({ ...proveedor, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({ ...proveedor, id: Date.now() });
    setProveedor({ nombre: '', contacto: '', telefono: '' });
  };

  return (
    <Form onSubmit={handleSubmit} className="mt-3">
      <Form.Group>
        <Form.Label>Nombre</Form.Label>
        <Form.Control type="text" name="nombre" value={proveedor.nombre} onChange={handleChange} required />
      </Form.Group>
      <Form.Group>
        <Form.Label>Contacto</Form.Label>
        <Form.Control type="text" name="contacto" value={proveedor.contacto} onChange={handleChange} required />
      </Form.Group>
      <Form.Group>
        <Form.Label>Teléfono</Form.Label>
        <Form.Control type="text" name="telefono" value={proveedor.telefono} onChange={handleChange} required />
      </Form.Group>
      <Button variant="primary" type="submit" className="mt-2">Agregar Proveedor</Button>
    </Form>
  );
};

export default ProveedorForm;
