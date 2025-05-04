import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Badge, Dropdown } from 'react-bootstrap';
import { Bell } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'; // Ícono MUI


const NotificationPanel = () => {
  const navigate = useNavigate();

  const ventas = useSelector((state) => state.ventas.ventas.ventas || []);
  const compras = useSelector((state) => state.compras.compras.compras || []);
  const clientes = useSelector((state) => state.clientes.clientes?.clientes || []);
  const proveedores = useSelector((state) => state.proveedores.proveedores.proveedores || []);

  const [notificaciones, setNotificaciones] = useState([]);

  useEffect(() => {
    const nuevasNotis = [];

    ventas.forEach((venta) => {
      if (venta.estado === 'Pendiente') {
        const cliente = clientes.find((c) => c.id === venta.cliente);
        nuevasNotis.push({
          tipo: 'venta',
          id: venta._id,
          mensaje: `Venta pendiente con ${cliente?.nombre || 'Cliente desconocido'}`,
        });
      }
    });

    compras.forEach((compra) => {
      if (compra.estado === 'Pendiente') {
        const proveedor = proveedores.find((p) => p.id === compra.proveedor);
        nuevasNotis.push({
          tipo: 'compra',
          id: compra._id,
          mensaje: `Compra pendiente con ${proveedor?.nombre || 'Proveedor desconocido'}`,
        });
      }
    });

    setNotificaciones(nuevasNotis);
  }, [ventas, compras, clientes, proveedores]);

  const handleIrADetalle = (noti) => {
    if (noti.tipo === 'venta') {
      navigate(`/ventas`);
    } else if (noti.tipo === 'compra') {
      navigate(`/compras`);
    }
  };

  return (
    <Dropdown align="end">
      <Dropdown.Toggle  variant="outline-light" // Estilo más limpio
       id="dropdown-notificaciones">
        <NotificationsNoneIcon />
        {notificaciones.length > 0 && (
          <Badge bg="danger" pill className="ms-1">
            {notificaciones.length}
          </Badge>
        )}
      </Dropdown.Toggle>

      <Dropdown.Menu style={{ minWidth: '300px' }}>
        <Dropdown.Header>🔔 Notificaciones</Dropdown.Header>
        {notificaciones.length === 0 ? (
          <Dropdown.ItemText>No hay notificaciones pendientes</Dropdown.ItemText>
        ) : (
          notificaciones.map((noti, idx) => (
            <Dropdown.Item key={idx} onClick={() => handleIrADetalle(noti)}>
              {noti.mensaje}
            </Dropdown.Item>
          ))
        )}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default NotificationPanel;
