// ClienteForm Component
import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

const ClienteForm = ({ onAdd }) => {
  const [cliente, setCliente] = useState({ nombre: '', email: '', telefono: '' ,categoria:'Cliente'});

  const handleChange = (e) => {
    setCliente({ ...cliente, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({ ...cliente, id: Date.now() });
    setCliente({ nombre: '', email: '', telefono: '' ,categoria:''});
  };

  return (
    <Form onSubmit={handleSubmit} className="container mt-4">
      <Form.Group>
        <Form.Label>Nombre</Form.Label>
        <Form.Control type="text" name="nombre" value={cliente.nombre} onChange={handleChange} required />
      </Form.Group>
      <Form.Group>
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" name="email" value={cliente.email} onChange={handleChange} required />
      </Form.Group>
      <Form.Group>
        <Form.Label>Teléfono</Form.Label>
        <Form.Control type="text" name="telefono" value={cliente.telefono} onChange={handleChange} required />
      </Form.Group>
      <Form.Group>
          <Form.Label>Categoría</Form.Label>
          <Form.Control as="select" name="categoria" value={cliente.categoria} onChange={handleChange}>
            <option value="Cliente">Cliente</option>
            <option value="Técnico">Técnico</option>
            <option value="Profesional">Profesional</option>
          </Form.Control>
        </Form.Group>
      <Button variant="primary" type="submit" className="mt-2">Agregar Cliente</Button>
    </Form>
  );
};

export default ClienteForm;