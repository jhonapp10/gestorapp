import React from 'react';
import { Link } from 'react-router-dom';

//import Beneficios from './modules/Beneficios';
import 'bootstrap/dist/css/bootstrap.min.css';
import {  AppBar, Toolbar, Typography, Button } from '@mui/material';




const Navbar = () => {
    return (
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h6' sx={{ flexGrow: 1 }}>
            Muebles & Electrónica
          </Typography>
          <Button color='inherit' component={Link} to='/clientes'>Clientes</Button>
          <Button color='inherit' component={Link} to='/ventas'>Ventas</Button>
          <Button color='inherit' component={Link} to='/compras'>Compras</Button>
          <Button color='inherit' component={Link} to='/reparaciones'>Reparaciones</Button>
          <Button color='inherit' component={Link} to='/proveedores'>Proveedores</Button>
          <Button color='inherit' component={Link} to='/beneficios'>Beneficios</Button>
        </Toolbar>
      </AppBar>
    );
  }

  export default Navbar;
  