import React from "react";
import { useSelector, useDispatch } from 'react-redux';

import { Card, Table } from "react-bootstrap";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, LineChart, Line } from "recharts";

const COLORS = ["#FF6384", "#36A2EB", "#FFCE56"];

const ControlGanancias = ({ venta, compras, reparaciones }) => {
  const dispatch = useDispatch();
  const comprasList = useSelector((state) => state.compras.compras.compras);

  
  if (!venta) return <p>Selecciona una venta para ver los detalles</p>;

  //const productos = useSelector((state) => state.productos.productos.productos);

  // Filtrar compras asociadas a la venta
  const comprasAsociadas = comprasList.filter((compra) => venta.comprasAsociadas.includes(compra._id));

  console.log("en beneficios, las compras en ventas son: ", compras);
  // Calcular totales
  const totalCompras = comprasAsociadas.reduce((sum, compra) => sum + compra.precio, 0);
  const totalReparaciones = reparaciones.reduce((sum, rep) => sum + rep.costo, 0);
  const totalGastos = totalCompras + totalReparaciones;
  const beneficioNeto = venta.precio - totalGastos;
  const margenGanancia = venta.precio > 0 ? (beneficioNeto / venta.precio) * 100 : 0;

  const dataPie = [
    { name: "Compras", value: totalCompras },
    { name: "Reparaciones", value: totalReparaciones },
    { name: "Beneficio", value: beneficioNeto },
  ];

  const dataBar = [
    { name: "Ingresos", valor: venta.precio },
    { name: "Compras", valor: - totalCompras },
    { name: "Reparaciones", valor: -totalReparaciones },
    { name: "Beneficio", valor: beneficioNeto },
  ];




  return (
    <div className="container mt-4">
      <Card className="p-3 shadow-lg">
        <h3 className="text-center">📊 Control de Ganancias</h3>

        {/* Datos de la Venta */}
        <Card className="p-3 my-3 bg-light">
          <h5>🛒 Venta Seleccionada</h5>
          <p><strong>ID:</strong> {venta.id}</p>
          <p><strong>Cliente:</strong> {venta.cliente}</p>
          <p><strong>Estado:</strong> {venta.estado}</p>
          <p><strong>Fecha:</strong> {venta.fecha}</p>
          <p><strong>Notas:</strong> {venta.notas}</p>
          <p><strong>💰 Precio Final:</strong> ${venta.precio.toFixed(2)}</p>
        </Card>

        {/* Compras Asociadas */}
        <Card className="p-3 my-3">
          <h5>🛍 Compras Asociadas</h5>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Proveedor</th>
                <th>Precio</th>
              </tr>
            </thead>
            <tbody>
              {comprasAsociadas.length > 0 ? (
                comprasAsociadas.map((compra) => (
                  <tr key={compra.id}>
                    <td>{compra.id}</td>
                    <td>{compra.proveedor}</td>
                    <td>${compra.precio.toFixed(2)}</td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="3" className="text-center">No hay compras asociadas</td></tr>
              )}
            </tbody>
          </Table>
          <p><strong>Total Compras:</strong> ${totalCompras.toFixed(2)}</p>
        </Card>

        {/* Reparaciones Asociadas */}
        <Card className="p-3 my-3">
          <h5>🔧 Reparaciones Realizadas</h5>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Descripción</th>
                <th>Costo</th>
              </tr>
            </thead>
            <tbody>
              {reparaciones.length > 0 ? (
                reparaciones.map((rep) => (
                  <tr key={rep.id}>
                    <td>{rep.id}</td>
                    <td>{rep.descripcion}</td>
                    <td>${rep.costo.toFixed(2)}</td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="3" className="text-center">No hay reparaciones registradas</td></tr>
              )}
            </tbody>
          </Table>
          <p><strong>Total Reparaciones:</strong> ${totalReparaciones.toFixed(2)}</p>
        </Card>

        {/* Gráfico de distribución de gastos */}
        <h4 className="mt-4 text-center">Distribución de Costos</h4>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={dataPie} cx="50%" cy="50%" outerRadius={100} fill="#8884d8" dataKey="value">
              {dataPie.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>

        {/* Gráfico de ingresos vs gastos */}
        <h4 className="mt-4 text-center">Comparación de Ingresos y Gastos</h4>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={dataBar}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="valor" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>


        {/* Resultados Finales */}
        <Card className="p-3 my-3 bg-success text-white">
          <h5>💵 Resumen de Ganancias</h5>
          <p><strong>Ingresos (Venta):</strong> ${venta.precio.toFixed(2)}</p>
          <p><strong>Gastos (Compras + Reparaciones):</strong> ${totalGastos.toFixed(2)}</p>
          <h4><strong>📈 Beneficio Neto:</strong> ${beneficioNeto.toFixed(2)}</h4>
          <h5><strong>📊 Margen de Ganancia:</strong> {margenGanancia.toFixed(2)}%</h5>
        </Card>
      </Card>
    </div>
  );
};

export default ControlGanancias;
