import React, { useEffect, useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import dayjs from "dayjs";

const CompraEditModal = ({ show, onHide, compra, onSave, proveedores, productos }) => {
  console.log("productos:" ,productos);
  const [formData, setFormData] = useState({
    proveedor: "",
    estado: "",
    fechaCompra: "",
    productosAsociados: [],
    precio:0,
  });

  useEffect(() => {
    if (compra) {
      setFormData({
        proveedor: compra.proveedor || "",
        estado: compra.estado || "",
        fechaCompra: compra.fechaCompra || dayjs().format("YYYY-MM-DD"),
        productosAsociados: compra.productos || [],
        precio:compra.precio,
      });
    }
  }, [compra]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleProductoChange = (index, field, value) => {
    const updatedProductos = [...formData.productosAsociados];
    updatedProductos[index][field] = value;
    setFormData(prev => ({
      ...prev,
      productos: updatedProductos
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Editar Compra</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Proveedor</Form.Label>
            <Form.Select name="proveedor" value={formData.proveedor} onChange={handleChange}>
              <option value="">Seleccione un proveedor</option>
              {proveedores.map((p) => (
                <option key={p.id} value={p.id}>{p.nombre}</option>
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
            <Form.Label>Fecha de Compra</Form.Label>
            <Form.Control
              type="date"
              name="fechaCompra"
              value={dayjs(formData.fechaCompra).format("YYYY-MM-DD")}
              onChange={handleChange}
            />

          </Form.Group>

          <hr />
          <h5>Productos Comprados</h5>
          {formData.productosAsociados.length > 0 ? (
            formData.productosAsociados.map((item, i) => {
              const producto = productos.productos.find(p => p._id === item.producto);
              return (
                <div key={i} className="mb-3 p-2 border rounded">
                  <div><strong>{producto?.nombre || "Producto"}</strong></div>
                  <Form.Group className="mt-1">
                    <Form.Label>Cantidad</Form.Label>
                    <Form.Control
                      type="number"
                      value={item.cantidad}
                      onChange={(e) => handleProductoChange(i, "cantidad", parseInt(e.target.value))}
                    />
                  </Form.Group>
                  <Form.Group className="mt-1">
                    <Form.Label>Precio</Form.Label>
                    <Form.Control
                      type="number"
                      value={item.precio}
                      onChange={(e) => handleProductoChange(i, "precio", parseFloat(e.target.value))}
                    />
                  </Form.Group>
                </div>
              );
            })
          ) : (
            <p>No hay productos asociados.</p>
          )}

           <Form.Group className="mt-2">
            <Form.Label>Precio</Form.Label>
            <Form.Control
              type="number"
              name="precio"
              value={formData.precio}
              onChange={handleChange}
            />

          </Form.Group>


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

export default CompraEditModal;
