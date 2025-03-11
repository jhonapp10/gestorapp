// ComprasList Component
import React from 'react';
import { Button, Table } from 'react-bootstrap';

const ComprasList = ({ compras, onUpdate, onDelete }) => {
  return (
    <Table striped bordered hover className="mt-3">
      <thead>
        <tr>
          <th>ID</th>
          <th>Proveedor</th>
          <th>Estado</th>
          <th>fecha de compra</th>
          <th>Precio</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {compras.map((compra) => (
          <tr key={compra.id}>
            <td>{compra.id}</td>
            <td>{compra.proveedor}</td>
            <td>{compra.estado}</td>
            <td>{compra.fechaCompra}</td>
            <td>{compra.precio}</td>
            <td>
              <Button variant="warning" onClick={() => onUpdate(compra)}>Editar</Button>{' '}
              <Button variant="danger" onClick={() => onDelete(compra.id)}>Eliminar</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default ComprasList;