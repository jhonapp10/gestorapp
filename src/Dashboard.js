import React, { useEffect } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useCargarDatosIniciales } from './utils/usecargarDatos';
import { useSelector, useDispatch } from 'react-redux';

const modulos = [
  { nombre: "Ventas", ruta: "/ventas", color: "#28a745" },
  { nombre: "Clientes", ruta: "/clientes", color: "#007bff" },
  { nombre: "Productos", ruta: "/productos", color: "#ffc107" },
  { nombre: "Compras", ruta: "/compras", color: "#28a745"},
  { nombre: "Proveedores", ruta: "/proveedores", color: "#ffc107" }

];

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useCargarDatosIniciales();
  
  
  return (
    <div className="container mt-4">
      <h2>Bienvenido 👋</h2>
      <Row>
        {modulos.map((mod, idx) => (
          <Col key={idx} md={4}>
            <Card onClick={() => navigate(mod.ruta)} style={{ cursor: "pointer", backgroundColor: mod.color, color: "white" }}>
              <Card.Body>
                <Card.Title>{mod.nombre}</Card.Title>
                <Card.Text>Ir al módulo de {mod.nombre}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Dashboard;
