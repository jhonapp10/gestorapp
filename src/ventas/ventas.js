import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button, Row, Col } from 'react-bootstrap';

const Ventas = () => {
  const navigate = useNavigate();

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Gestión de Ventas</h2>
      <Row className="g-4">
        <Col md={6}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>Nueva Venta</Card.Title>
              <Card.Text>Registrar una nueva venta en el sistema.</Card.Text>
              <Button variant="primary" onClick={() => navigate("/ventas/new")}>
                Ir al Formulario
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>Lista de Ventas</Card.Title>
              <Card.Text>Ver todas las ventas registradas y administrar sus detalles.</Card.Text>
              <Button variant="secondary" onClick={() => navigate("/ventas/list")}>
                Ver Listado
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Ventas;
