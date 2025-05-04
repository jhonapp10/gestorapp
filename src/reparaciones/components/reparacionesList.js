// ReparacionesList Component
import React from 'react';
import { Button, Table } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
const ReparacionesList = ({ reparaciones, onUpdate, onDelete }) => {

  const clientes = useSelector(state => state.clientes.clientes.clientes);
  console.log("clientes en reparaciones: ", clientes)
  return (
    <Table striped bordered hover className="mt-3">
      <thead>
        <tr>
          
          <th>Descripción</th>
          <th>Cliente</th>
          <th>Estado</th>
          <th>Coste</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {reparaciones.map((reparacion) => (
          <tr key={reparacion._id}>
            <td>{reparacion.descripcion}</td>
            <td>  {clientes.find((c) => c._id == reparacion.cliente)?.nombre || "Cliente no encontrado"}</td>
            <td>{reparacion.estado}</td>
            <td>{reparacion.precio}</td>
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