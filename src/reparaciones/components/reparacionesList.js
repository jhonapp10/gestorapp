// ReparacionesList Component
import React from 'react';
import { Button, Table } from 'react-bootstrap';

const ReparacionesList = ({ reparaciones, onUpdate, onDelete }) => {
  return (
    <Table striped bordered hover className="mt-3">
      <thead>
        <tr>
          <th>ID</th>
          <th>Descripción</th>
          <th>Cliente</th>
          <th>Estado</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {reparaciones.map((reparacion) => (
          <tr key={reparacion.id}>
            <td>{reparacion.id}</td>
            <td>{reparacion.descripcion}</td>
            <td>{reparacion.cliente}</td>
            <td>{reparacion.estado}</td>
            <td>
              <Button variant="warning" onClick={() => onUpdate(reparacion)}>Editar</Button>{' '}
              <Button variant="danger" onClick={() => onDelete(reparacion.id)}>Eliminar</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default ReparacionesList;