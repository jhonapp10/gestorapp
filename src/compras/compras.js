// Compras Module
import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Button, Row, Col } from 'react-bootstrap';

import { fetchCompra, updateCompras, deleteCompras, addCompras } from '../redux/actions';
import ComprasList from './components/comprasList';
import CompraForm from './components/compraForm';

const Compras = () => {
  const navigate = useNavigate();

  /*const [compras, setCompras] = useState([]);
  //const compras = useSelector((state) => state.compras.compras || []);
  const dispatch = useDispatch();

  useEffect(()=>{
      const fechData= async()=>{
        const response = await fetch('http://localhost:5000/api/compras'); // Ajusta la URL a tu backend
        const data = await response.json();
        console.log(data);
        setCompras(data);      
        await dispatch(fetchCompra());
      };
      fechData();    
       
    },[dispatch]);*/

  
/*
  const handleAdd = (compra) => {
    console.log(compra);
    dispatch(addCompras(compra));
  };

  const handleUpdate = (compra) => {
    dispatch(updateCompras(compra));
  };

  const handleDelete = (id) => {
    dispatch(deleteCompras(id));
  };

  return (
    <div className="container mt-4">
      <h2>Gestión de Compras</h2>
      <CompraForm onAdd={handleAdd} />
      <ComprasList compras={compras} onUpdate={handleUpdate} onDelete={handleDelete} />
    </div>
  );
};*/

return(

<div className="container mt-5">
<h2 className="mb-4">Gestión de Compra</h2>
<Row className="g-4">
  <Col md={6}>
    <Card className="shadow-sm">
      <Card.Body>
        <Card.Title>Nueva Compra</Card.Title>
        <Card.Text>Registrar una nueva compra en el sistema.</Card.Text>
        <Button variant="primary" onClick={() => navigate("/compras/new")}>
          Ir al Formulario
        </Button>
      </Card.Body>
    </Card>
  </Col>

  <Col md={6}>
    <Card className="shadow-sm">
      <Card.Body>
        <Card.Title>Lista de Compras</Card.Title>
        <Card.Text>Ver todas las compras registradas y administrar sus detalles.</Card.Text>
        <Button variant="secondary" onClick={() => navigate("/compras/list")}>
          Ver Listado
        </Button>
      </Card.Body>
    </Card>
  </Col>
</Row>
</div>



);
};

export default Compras;
