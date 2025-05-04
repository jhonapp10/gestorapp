import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Card } from "react-bootstrap";

const VentaDetail = ({ venta }) => {
  const clientes = useSelector(state => state.clientes.clientes.clientes);

  if (!venta) {
    return <p className="text-center text-gray-500">Selecciona una venta para ver los detalles.</p>;
  }

  return (
    <Card className="shadow-lg border-0 rounded-3 p-3 w-100 max-w-md">
      <Card.Body>
        <Card.Title className="text-xl font-bold text-blue-700">Venta #{venta.id}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{venta.fecha}</Card.Subtitle>

        <p><strong>Cliente:</strong> {clientes.find((c) => c.id === venta.cliente)?.nombre || ""}</p>
        <p><strong>Estado:</strong> <span className={`badge bg-${venta.estado === 'Completada' ? 'success' : 'warning'}`}>{venta.estado}</span></p>
        <p><strong>Notas:</strong> {venta.nota || "Sin notas"}</p>
        <h4 className="text-green-600 font-semibold">Total: ${venta.precio.toFixed(2)}</h4>
      </Card.Body>
    </Card>
  );
};

export default VentaDetail;
