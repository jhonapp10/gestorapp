// ProveedoresList Component
import React from 'react';
import { Button, Table } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';

const ProveedoresList = ({ proveedores, onUpdate, onDelete }) => {

  console.log(proveedores);

  

  //const proveedores1 = useSelector((state) => state.proveedores.proveedores || []);

  return (
    <Table striped bordered hover className="mt-3">
      <thead>
        <tr>          
          <th>Nombre</th>
          <th>Contacto</th>
          <th>Teléfono</th>
          <th>Numero de cuenta</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
      
        {proveedores.map((proveedor) => (        
          <tr>
          <td>{proveedor.nombre}</td>
          <td>{proveedor.contacto}</td>
          <td>{proveedor.telefono}</td>
          <td>{proveedor.numerocuenta}</td>
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