// ClientesList Component
import React,{ useState} from 'react';
import { useSelector } from 'react-redux';
import { Button, Table, Label, Select, Form } from 'react-bootstrap';




const ClientesList = ({ clientes, onUpdate, onDelete }) => {

  // Estado para el filtro
  const [filtroCategoria, setFiltroCategoria] = useState('Todos');

   // Filtrar clientes según la categoría seleccionada
  const clientesFiltrados = filtroCategoria === 'Todos' 
   ? clientes 
   : clientes.filter(cliente => cliente.categoria === filtroCategoria);


  return (

    <div className='container mt-4'>
    <h2>Lista de compras</h2>
     <Form.Group className="mb-3">
     <Form.Label>Filtrar por Categoría del cliente:</Form.Label>
     <Form.Control as="select" value={filtroCategoria} onChange={(e) => setFiltroCategoria(e.target.value)}>
       <option value="Todos">Todos</option>
       <option value="Cliente">Cliente</option>
       <option value="Técnico">Técnico</option>
       <option value="Profesional">Profesional</option>
     </Form.Control>
   </Form.Group>

    <Table striped bordered hover className="mt-3">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Email</th>
          <th>Teléfono</th>
          <th>categoria</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {clientesFiltrados.map((cliente) => (
          <tr key={cliente._id}>
            <td>{cliente._id}</td>
            <td>{cliente.nombre}</td>
            <td>{cliente.email}</td>
            <td>{cliente.telefono}</td>
            <td>{cliente.categoria}</td>
            <td>
              <Button variant="warning" onClick={() => onUpdate(cliente)}>Editar</Button>
              <Button variant="danger" onClick={() => onDelete(cliente._id)}>Eliminar</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
    </div>
  );
};

export default ClientesList;
