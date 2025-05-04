import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Card } from "react-bootstrap";

const CompraDetail = ({ compra }) => {
  const proveedores = useSelector(state => state.proveedores.proveedores.proveedores);

  if (!compra) {
    return <p className="text-center text-gray-500">Selecciona una compra para ver los detalles.</p>;
  }

  return (
    <Card className="shadow-lg border-0 rounded-3 p-3 w-100 max-w-md">
      <Card.Body>
        <Card.Title className="text-xl font-bold text-purple-700">Compra #{compra.id}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{compra.fecha}</Card.Subtitle>

        <p><strong>Proveedor:</strong> {proveedores.find((p) => p._id === compra.proveedor)?.nombre || ""} </p>
        <p><strong>Estado:</strong> <span className={`badge bg-${compra.estado === 'Completada' ? 'success' : 'warning'}`}>{compra.estado}</span></p>
        <p><strong>Notas:</strong> {compra.nota || "Sin notas"}</p>
        <h4 className="text-green-600 font-semibold">Total: ${compra.precio.toFixed(2)}</h4>
      </Card.Body>
    </Card>
  );
};

export default CompraDetail;
