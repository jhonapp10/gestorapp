// ReparacionForm Component
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, Form } from 'react-bootstrap';

const ReparacionForm = ({ onAdd }) => {
  const [reparacion, setReparacion] = useState({
    descripcion: '',
    cliente: '',
    tecnico: '',
    estado: 'Pendiente',
    precio: 0,
  });

  const clientes = useSelector((state) => state.clientes.clientes.clientes || []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReparacion({ ...reparacion, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({ ...reparacion });
    setReparacion({
      descripcion: '',
      cliente: '',
      tecnico: '',
      estado: 'Pendiente',
      precio: 0,
    });
  };

  return (
    <Form onSubmit={handleSubmit} className="mt-3">
      <Form.Group>
        <Form.Label>Descripción</Form.Label>
        <Form.Control
          type="text"
          name="descripcion"
          value={reparacion.descripcion}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Cliente</Form.Label>
        <Form.Select
          name="cliente"
          value={reparacion.cliente}
          onChange={handleChange}
          required
        >
          <option value="">Seleccione un cliente</option>
          {clientes
            .filter((cliente) => cliente.categoria !== 'Técnico')
            .map((cliente) => (
              <option key={cliente._id} value={cliente._id}>
                {cliente.nombre}
              </option>
            ))}
        </Form.Select>
      </Form.Group>

      <Form.Group>
        <Form.Label>Estado</Form.Label>
        <Form.Select
          name="estado"
          value={reparacion.estado}
          onChange={handleChange}
        >
          <option value="Pendiente">Pendiente</option>
          <option value="En Proceso">En Proceso</option>
          <option value="Completada">Completada</option>
          <option value="Cancelada">Cancelada</option>
        </Form.Select>
      </Form.Group>

      <Form.Group>
        <Form.Label>Técnico</Form.Label>
        <Form.Select
          name="tecnico"
          value={reparacion.tecnico}
          onChange={handleChange}
          required
        >
          <option value="">Seleccione un técnico</option>
          {clientes
            .filter((cliente) => cliente.categoria === 'Técnico')
            .map((cliente) => (
              <option key={cliente._id} value={cliente._id}>
                {cliente.nombre}
              </option>
            ))}
        </Form.Select>
      </Form.Group>

      <Form.Group>
        <Form.Label>Costo</Form.Label>
        <Form.Control
          type="number"
          name="precio"
          value={reparacion.precio}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Button variant="primary" type="submit" className="mt-2">
        Agregar Reparación
      </Button>
    </Form>
  );
};

export default ReparacionForm;
