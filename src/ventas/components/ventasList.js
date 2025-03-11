// VentasList Component
import React from 'react';
import { Button, Table } from 'react-bootstrap';

const VentasList = ({ ventas, onUpdate, onDelete }) => {
  return (
    <Table striped bordered hover className="mt-3">
      <thead>
        <tr>
          <th>ID</th>
          <th>Cliente</th>
          <th>Estado</th>
          <th>Precio</th>
          <th>Metodo de pago</th>
          <th>Notas</th>          
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {ventas.map((venta) => (
          <tr key={venta.id}>
            <td>{venta.id}</td>
            <td>{venta.cliente}</td>
            <td>{venta.estado}</td>
            <td>{venta.precio}</td>
            <td>{venta.metodopago}</td>
            <td>{venta.notas}</td>
            <td>
              <Button variant="warning" onClick={() => onUpdate(venta)}>Editar</Button>{' '}
              <Button variant="danger" onClick={() => onDelete(venta.id)}>Eliminar</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default VentasList;