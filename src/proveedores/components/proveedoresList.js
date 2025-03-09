// ProveedoresList Component
import React from 'react';
import { Button, Table } from 'react-bootstrap';

const ProveedoresList = ({ proveedores, onUpdate, onDelete }) => {
  return (
    <Table striped bordered hover className="mt-3">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Contacto</th>
          <th>Teléfono</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {proveedores.map((proveedor) => (
          <tr key={proveedor.id}>
            <td>{proveedor.id}</td>
            <td>{proveedor.nombre}</td>
            <td>{proveedor.contacto}</td>
            <td>{proveedor.telefono}</td>
            <td>
              <Button variant="warning" onClick={() => onUpdate(proveedor)}>Editar</Button>{' '}
              <Button variant="danger" onClick={() => onDelete(proveedor.id)}>Eliminar</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default ProveedoresList;