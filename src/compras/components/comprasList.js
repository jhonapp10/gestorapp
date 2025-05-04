// ComprasList Component
import React, { useState, useEffect } from "react";
import axios from "axios";

import { useSelector, useDispatch } from "react-redux";
import { Table, Form, Button, Modal } from "react-bootstrap";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import CompraEditModal from "../../components/compraEditModal";
import dayjs from "dayjs";
import CompraDetail from "./compraDetail";
import { addCompras,updateCompras, deleteCompras, fetchCompra } from '../../redux/actions';



const ComprasList = () => {

  const dispatch = useDispatch();

  const [compras, setCompras]= useState([]);
  const proveedores = useSelector(state => state.proveedores.proveedores.proveedores);

  const productos = useSelector(state => state.productos.productos);
  
  const [compraSeleccionada, setCompraSeleccionada] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const handleUpdate = (compra) => {
    dispatch(updateCompras(compra));
  };

  const handleDelete = (id) => {
    dispatch(deleteCompras(id));
  };
  const handleVerDetalles = (compra) => {
    setCompraSeleccionada(compra);
    setShowModal(true);
  };

  const handleEditarCompra = (compra) => {
    setCompraSeleccionada(compra);
    setShowEditModal(true);
  };

  // Estados para los filtros
  const [filtroProveedor, setFiltroProveedor] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("");
  const [filtroMetodoPago, setFiltroMetodoPago] = useState("");
  const [filtroFechaInicio, setFiltroFechaInicio] = useState(null);
  const [filtroFechaFin, setFiltroFechaFin] = useState(null);
  const [comprasFiltradas, setComprasFiltradas] = useState(compras);


  useEffect(() => {
    const cargarCompras = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/compras');
        const data= await response.json();
        setCompras(data);
        dispatch(fetchCompra(response.data)); 

      } catch (error) {
        console.error('Error al cargar compras:', error);
      }
    };

    cargarCompras();
  }, [dispatch]);


  // Función para aplicar los filtros
  useEffect(() => {
    let comprasFiltradas = compras;

    if (filtroProveedor) {
      {proveedores.map((prov) => (
        
        comprasFiltradas = comprasFiltradas.filter(c => c.proveedor === prov && prov.nombre === filtroProveedor)
      ))}
      
    }

    if (filtroEstado) {
      comprasFiltradas = comprasFiltradas.filter(c => c.estado === filtroEstado);
    }

    if (filtroMetodoPago) {
      comprasFiltradas = comprasFiltradas.filter(c => c.typepago === filtroMetodoPago);
    }

    if (filtroFechaInicio) {
      comprasFiltradas = comprasFiltradas.filter(c => dayjs(c.fecha).isAfter(filtroFechaInicio, "day"));
    }

    if (filtroFechaFin) {
      comprasFiltradas = comprasFiltradas.filter(c => dayjs(c.fecha).isBefore(filtroFechaFin, "day"));
    }

    setComprasFiltradas(comprasFiltradas);
  }, [filtroProveedor, filtroEstado, filtroMetodoPago, filtroFechaInicio, filtroFechaFin, compras]);

  const handleGuardarCompra = async (datosActualizados) => {
    try {
      const res = await axios.put(`/api/compras/${compraSeleccionada._id}`, datosActualizados);
      handleUpdate(res.data);  // actualiza en el padre
      setShowEditModal(false);
    } catch (error) {
      console.error("Error actualizando compra:", error);
    }
  };

  return (

    <div className="container mt-4">
    <h2>Lista de Compras</h2>

    {/* Filtros */}
    <Form className="mb-3 d-flex gap-3">
      <Form.Group>
        <Form.Label>Proveedor</Form.Label>
        <Form.Select onChange={(e) => setFiltroProveedor(e.target.value)} value={filtroProveedor}>
          <option value="">Todos</option>
          {proveedores.map((proveedor) => (
            <option key={proveedor.id} value={proveedor.id}>
              {proveedor.nombre}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      <Form.Group>
        <Form.Label>Estado</Form.Label>
        <Form.Select onChange={(e) => setFiltroEstado(e.target.value)} value={filtroEstado}>
          <option value="">Todos</option>
          <option value="Pendiente">Pendiente</option>
          <option value="En Proceso">En Proceso</option>
          <option value="Completado">Completado</option>
          <option value="Cancelada">Cancelada</option>
        </Form.Select>
      </Form.Group>

      <Form.Group>
        <Form.Label>Método de Pago</Form.Label>
        <Form.Select onChange={(e) => setFiltroMetodoPago(e.target.value)} value={filtroMetodoPago}>
          <option value="">Todos</option>
          <option value="Transferencia">Transferencia</option>
          <option value="Tarjeta">Tarjeta</option>
          <option value="Efectivo">Efectivo</option>
        </Form.Select>
      </Form.Group>

      <Form.Group>
        <Form.Label>Fecha Inicio</Form.Label>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker value={filtroFechaInicio} onChange={setFiltroFechaInicio} />
        </LocalizationProvider>
      </Form.Group>

      <Form.Group>
        <Form.Label>Fecha Fin</Form.Label>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker value={filtroFechaFin} onChange={setFiltroFechaFin} />
        </LocalizationProvider>
      </Form.Group>

      <Button variant="secondary" className="mt-4" onClick={() => {
        setFiltroProveedor("");
        setFiltroEstado("");
        setFiltroMetodoPago("");
        setFiltroFechaInicio(null);
        setFiltroFechaFin(null);
      }}>
        Resetear Filtros
      </Button>
    </Form>


    <Table striped bordered hover className="mt-3">
      <thead>
        <tr>
          <th>ID</th>
          <th>Proveedor</th>
          <th>Estado</th>
          <th>fecha de compra</th>
          <th>Precio</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>{comprasFiltradas.length > 0 ? (
            comprasFiltradas.map((compra) => (
          <tr key={compra.id}>
            <td>{compra.id}</td>
            <td>{proveedores.find((p) => p._id == compra.proveedor)?.nombre || "Proveedor no encontrado"}</td>
            <td>{compra.estado}</td>
            <td>{compra.datecompra}</td>
            <td>{compra.precio}</td>
            <td>
              <Button variant="info" onClick={() => handleVerDetalles(compra)}>Detalles</Button>

              <Button variant="warning" onClick={() => handleEditarCompra(compra)}>Editar</Button>{' '}
              <Button variant="danger" onClick={() => handleDelete(compra.id)}>Eliminar</Button>
            </td>
          </tr>
        ))) : (
          <tr>
            <td colSpan="6" className="text-center">No hay compras disponibles</td>
          </tr>
        )
      }
      </tbody>
    </Table>
     {/* Modal para ver detalles */}
     <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Detalles de la Compra</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CompraDetail compra={compraSeleccionada} />
        </Modal.Body>
      </Modal>

      <CompraEditModal
  show={showEditModal}
  onHide={() => setShowEditModal(false)}
  compra={compraSeleccionada}
  onSave={handleGuardarCompra}
  proveedores={proveedores}
  productos={productos}
/>
    </div>
  );
};

export default ComprasList;