import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import NotificationsIcon from '@mui/icons-material/Notifications';

//import Beneficios from './modules/Beneficios';
import 'bootstrap/dist/css/bootstrap.min.css';
import {  AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import NotificationPanel from '../../components/notificationPanel';



const Navbar = () => {

  /*const [anchorEl, setAnchorEl] = useState(null);

  // Filtrar notificaciones pendientes
  const ventasPendientes = ventas.filter(v => v.estado === "Pendiente");
  const comprasPendientes = compras.filter(c => c.estado === "Pendiente");
  const totalNotificaciones = ventasPendientes.length + comprasPendientes.length;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };*/



    return (

      /*<Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="/home">Muebles & Electrónica</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <NotificationPanel />
          </Navbar.Collapse>
          <Navbar.Brand href="/clientes">Clientes</Navbar.Brand>
          <Navbar.Brand href="/productos">Productos</Navbar.Brand>
          <Navbar.Brand href="/ventas">Ventas</Navbar.Brand>
          <Navbar.Brand href="/compras">Compras</Navbar.Brand>
          <Navbar.Brand href="/reparaciones">Reparaciones</Navbar.Brand>
          <Navbar.Brand href="/proveedores">Proveedores</Navbar.Brand>


        </Container>
      </Navbar>*/


      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h6' component={Link} to='/home' sx={{ flexGrow: 1 }}>
            Muebles & Electrónica
          </Typography>
          <Button color='inherit' component={Link} to='/clientes'>Clientes</Button>
          <Button color='inherit' component={Link} to='/productos'>Productos</Button>
          <Button color='inherit' component={Link} to='/ventas'>Ventas</Button>
          <Button color='inherit' component={Link} to='/compras'>Compras</Button>
          <Button color='inherit' component={Link} to='/reparaciones'>Reparaciones</Button>
          <Button color='inherit' component={Link} to='/proveedores'>Proveedores</Button>
          
         {/* Espacio para NotificationPanel (alineado a la derecha) */}
         <Box sx={{ ml: 2 }}>
          <NotificationPanel />
        </Box>
        </Toolbar>
      </AppBar>
    );
  }

  export default Navbar;
  