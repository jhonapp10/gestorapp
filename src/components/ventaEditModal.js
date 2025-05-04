import React, { useState, useEffect } from "react";
import { Modal, Form, Button } from "react-bootstrap";

const VentaEditModal = ({ show, onHide, venta, onSave, clientes, productos }) => {
  console.log("clientes: ",clientes);
  console.log("productos:" ,productos);
  const [formData, setFormData] = useState({
    cliente: "",
    estado: "",
    precio: 0,
    metodoPago: "",
    notas: "",
    comprasAsociadas: [],
    productos: [],
  });

  useEffect(() => {
    if (venta) {
      setFormData({
        cliente: venta.cliente || "",
        estado: venta.estado || "",
        precio: venta.precio || 0,
        metodoPago: venta.metodoPago || "",
        notas: venta.notas || "",
        comprasAsociadas: venta.comprasAsociadas || [],
        productos: venta.productos || [],
      });
    }
  }, [venta]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Editar Venta</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Cliente</Form.Label>
            <Form.Select name="cliente" value={formData.cliente} onChange={handleChange}>
              <option value="">Seleccione un cliente</option>
              {clientes.map((c) => (
                <option key={c.id} value={c.id}>{c.nombre}</option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mt-2">
            <Form.Label>Estado</Form.Label>
            <Form.Select name="estado" value={formData.estado} onChange={handleChange}>
              <option value="Pendiente">Pendiente</option>
              <option value="En Proceso">En Proceso</option>
              <option value="Completado">Completado</option>
              <option value="Cancelada">Cancelada</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mt-2">
            <Form.Label>Precio</Form.Label>
            <Form.Control
              type="number"
              name="precio"
              value={formData.precio}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mt-2">
            <Form.Label>Método de Pago</Form.Label>
            <Form.Select name="metodoPago" value={formData.metodoPago} onChange={handleChange}>
              <option value="Efectivo">Efectivo</option>
              <option value="Transferencia">Transferencia</option>
              <option value="Tarjeta">Tarjeta</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mt-2">
            <Form.Label>Notas</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="notas"
              value={formData.notas}
              onChange={handleChange}
            />
          </Form.Group>

          {/* Puedes renderizar compras y productos asociados aquí si quieres permitir editarlos */}
          {/* Por simplicidad, solo se muestran como texto (editable si quieres después) */}

          {formData.comprasAsociadas?.length > 0 && (
            <div className="mt-3">
              <strong>Compras Asociadas:</strong>
              <ul>
                {formData.comprasAsociadas.map((compraId, i) => (
                  <li key={i}>{compraId}</li>
                ))}
              </ul>
            </div>
          )}

          {formData.productosVendidos?.length > 0 && (
            <div className="mt-3">
              <strong>Productos Vendidos:</strong>
              <ul>
                {formData.productosVendidos.map((prod, i) => {
                  const producto = productos.productos.find(p => p._id === prod.producto);
                  return (
                    <li key={i}>
                      {producto?.nombre || "Producto"} - Cantidad: {prod.cantidad} - Precio: {prod.precioFinal}
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          <div className="mt-4 text-end">
            <Button variant="secondary" onClick={onHide} className="me-2">
              Cancelar
            </Button>
            <Button variant="primary" type="submit">
              Guardar Cambios
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default VentaEditModal;
