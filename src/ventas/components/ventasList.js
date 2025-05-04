// VentasList Component
import React, { useState, useEffect } from 'react';
import axios from "axios";

import { useSelector, useDispatch } from 'react-redux';
import { Button, Form, Table, Modal } from 'react-bootstrap';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import EditModal from '../../components/editmodal';
import VentaEditModal from '../../components/ventaEditModal';
import  ControlGanancias  from '../../controlganancias/ControlGanancias'
import dayjs from "dayjs";
import VentaDetail from './ventaDetail';
import { addVentas, updateVentas, deleteVentas, fetchVentas, fetchCliente } from '../../redux/actions';


const VentasList = () => {

    const dispatch = useDispatch();

    const [ventas, setVenta]= useState([]);


  
  const clientes = useSelector(state => state.clientes.clientes.clientes);

    // Extraer datos del store o pasarlos como props
  const productos = useSelector(state => state.productos.productos);

  // Estados para los filtros
  const [filtroCliente, setFiltroCliente] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("");
  const [filtroMetodoPago, setFiltroMetodoPago] = useState("");
  const [filtroFechaInicio, setFiltroFechaInicio] = useState(null);
  const [filtroFechaFin, setFiltroFechaFin] = useState(null);
  const [ventasFiltradas, setVentasFiltradas] = useState(ventas);

  const [modoAdd, setModoAdd] = useState(false);

  const [ventaSeleccionada, setVentaSeleccionada] = useState(null);
  const [compras, setCompras] = useState([]);
  const [reparaciones, setReparaciones] = useState([]);
  const [showModalDetail, setShowModalDetail] = useState(false);
  const [showModalGanancia, setShowModalGanancia] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);



  console.log("ventasfiltradas:",ventasFiltradas);
  console.log("clientes:",clientes);

  useEffect(() => {
    // Simulación de una llamada a una API
    const cargarVentas = async () => {
      const response = await fetch('http://localhost:5000/api/ventas'); // Ajusta la URL a tu backend
      const data = await response.json();
      setVenta(data);
      dispatch(fetchVentas(data)); // Enviamos los datos al store
      //dispatch(fetchCliente());
    };

    cargarVentas();
  }, [dispatch]);

    // Función para aplicar los filtros
    useEffect(() => {
      let ventasFiltradas = ventas;
  
      if (filtroCliente) {
        ventasFiltradas = ventasFiltradas.filter(v => v.cliente === filtroCliente);
      }
  
      if (filtroEstado) {
        ventasFiltradas = ventasFiltradas.filter(v => v.estado === filtroEstado);
      }
  
      if (filtroMetodoPago) {
        ventasFiltradas = ventasFiltradas.filter(v => v.typepago === filtroMetodoPago);
      }
  
      if (filtroFechaInicio) {
        ventasFiltradas = ventasFiltradas.filter(v => dayjs(v.fecha).isAfter(filtroFechaInicio, "day"));
      }
  
      if (filtroFechaFin) {
        ventasFiltradas = ventasFiltradas.filter(v => dayjs(v.fecha).isBefore(filtroFechaFin, "day"));
      }
  
      setVentasFiltradas(ventasFiltradas);
    }, [filtroCliente, filtroEstado, filtroMetodoPago, filtroFechaInicio, filtroFechaFin, ventas]);
  

    const handleVerDetalles = (venta) => {
      setVentaSeleccionada(venta);
      setShowModalDetail(true);
    };

    const handleEditarVenta = (venta) => {
      setVentaSeleccionada(venta);
      setShowEditModal(true);
    };

    
    
      const handleDelete = (id) => {
        dispatch(deleteVentas(id));
      };
    

    const handleGuardarVenta = async (datosActualizados) => {
      try {
        const res = await axios.put(`/api/ventas/${ventaSeleccionada._id}`, datosActualizados);
        updateVentas(res.data);  // actualiza en el padre
        setShowEditModal(false);
      } catch (error) {
        console.error("Error actualizando venta:", error);
      }
    };
    // Función para cargar compras y reparaciones de una venta específica
  const handleVerGanancias = async (venta) => {
    try {
      const comprasRes = venta.comprasAsociadas;
      const reparacionesRes = venta.reparaciones;

      setVentaSeleccionada(venta);
      setCompras(comprasRes);
      /*comprasRes.map((compra) => (
        
        setCompras(compra)
      ))*/

      /*reparacionesRes.map((reparacion)=>{
        setReparaciones(reparacion);
      })*/
      //setCompras(comprasRes.data);
      
      setShowModalGanancia(true);
    } catch (error) {
      console.error("Error al cargar datos de la venta:", error);
    }
  };





  return (

    <div className="container mt-4">
    <h2>Lista de Ventas</h2>

      {/* Filtros */}
      <Form className="mb-3 d-flex gap-3">
        <Form.Group>
          <Form.Label>Cliente</Form.Label>
          <Form.Select onChange={(e) => setFiltroCliente(e.target.value)} value={filtroCliente}>
            <option value="">Todos</option>
            {clientes.map((cliente) => (
              <option key={cliente.id} value={cliente.id}>
                {cliente.nombre}
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
            <option value="Completado">Completada</option>
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
          setFiltroCliente("");
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
          
          <th>Cliente</th>
          <th>Estado</th>
          <th>Precio</th>
          <th>Metodo de pago</th>
          <th>Notas</th>          
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>{ventasFiltradas.length > 0 ? (
            ventasFiltradas.map((venta) => (
          <tr key={venta._id}>               
              <td>
                {clientes.find((c) => c.id === venta.cliente)?.nombre || "Cliente no encontrado"}
              </td>
          
            <td>{venta.estado}</td>
            <td>{venta.precio}</td>
            <td>{venta.typepago}</td>
            <td>{venta.nota}</td>
            <td>
              <Button variant="info" onClick={() => handleVerDetalles(venta)}>Detalles</Button>
              <Button variant="info" onClick={() => handleVerGanancias(venta)}>
                    📈 Ver Ganancias
                  </Button>
              <Button variant="warning" onClick={() => handleEditarVenta(venta)}>Editar</Button>{' '}
              <Button variant="danger" onClick={() => handleDelete(venta._id)}>Eliminar</Button>
              
            </td>
          </tr>
        ))): (
          <tr>
            <td colSpan="6" className="text-center">No hay ventas disponibles</td>
          </tr>)}
      </tbody>
    </Table>

    {/* Modal para ver detalles */}
    <Modal show={showModalDetail} onHide={() => setShowModalDetail(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Detalles de la Venta</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <VentaDetail venta={ventaSeleccionada} />
        </Modal.Body>
      </Modal>

       {/* Modal para mostrar ControlGanancias */}
       <Modal show={showModalGanancia} onHide={() => setShowModalGanancia(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>📊 Control de Ganancias</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {ventaSeleccionada && (
            <ControlGanancias
              venta={ventaSeleccionada}
              compras={compras}
              reparaciones={reparaciones}
            />
          )}
        </Modal.Body>
      </Modal>

      <VentaEditModal
  show={showEditModal}
  onHide={() => setShowEditModal(false)}
  venta={ventaSeleccionada}
  onChange={setVentaSeleccionada}
  onSave={handleGuardarVenta}
  clientes={clientes}
  compras={compras}
  productos={productos}
/>

    </div>
  );
};

export default VentasList;