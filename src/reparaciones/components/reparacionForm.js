// ReparacionForm Component
import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

const ReparacionForm = ({ onAdd }) => {
  const [reparacion, setReparacion] = useState({ descripcion: '', cliente: '', estado: 'Pendiente' });

  const handleChange = (e) => {
    setReparacion({ ...reparacion, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({ ...reparacion, id: Date.now() });
    setReparacion({ descripcion: '', cliente: '', estado: 'Pendiente' });
  };

  return (
    <Form onSubmit={handleSubmit} className="mt-3">
      <Form.Group>
        <Form.Label>Descripción</Form.Label>
        <Form.Control type="text" name="descripcion" value={reparacion.descripcion} onChange={handleChange} required />
      </Form.Group>
      <Form.Group>
        <Form.Label>Cliente</Form.Label>
        <Form.Control type="text" name="cliente" value={reparacion.cliente} onChange={handleChange} required />
      </Form.Group>
      <Form.Group>
        <Form.Label>Estado</Form.Label>
        <Form.Select name="estado" value={reparacion.estado} onChange={handleChange}>
          <option>Pendiente</option>
          <option>En Proceso</option>
          <option>Completado</option>
        </Form.Select>
      </Form.Group>
      <Button variant="primary" type="submit" className="mt-2">Agregar Reparación</Button>
    </Form>
  );
};

export default ReparacionForm;