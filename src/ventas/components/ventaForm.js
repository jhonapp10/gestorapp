// VentaForm Component
import React, { useState } from 'react';
import {useSelector} from 'react-redux';
import { Button, Form, Table } from 'react-bootstrap';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import{DatePicker} from '@mui/x-date-pickers/DatePicker';
import Proveedores from '../../proveedores/proveedores';
import Clientes from '../../clientes/clientes';
const VentaForm = ({ onAdd }) => {
  const [venta, setVenta] = useState({ cliente:'' ,productos: [], cantidad: 0, precio: 0 });
  const compras = useSelector((state) => state.compras); // Obtener ventas para asociarlas
  const clientes = useSelector((state)=> state.clientes);
  const [productoTemp, setProductoTemp] = useState({ nombre: '',cantidad: '', precio: '' });
  const handleChange = (e) => {
    console.log(venta.cliente);
    const {name, value}= e.target;

    setProductoTemp((productoTemp)=>({
      ...productoTemp,
      [name]: value,
    }));  };

  const handleProductoChange = (e) => {
    setProductoTemp({ ...productoTemp, [e.target.name]: e.target.value });
  };

  

  const agregarProducto = () => {
    if (productoTemp.nombre && productoTemp.precio) {
      setVenta((prevVenta)=>({
        ...prevVenta,
        productos: [...prevVenta.productos,{...productoTemp, precio: parseFloat(productoTemp.precio), cantidad: Number(productoTemp.cantidad)}],
        precio: venta.precio + parseFloat(productoTemp.precio)* (productoTemp.cantidad)
      }));      
      setProductoTemp({ nombre: '', cantidad:0 , precio: 0 });
    }
  };

  // Eliminar un producto de la lista
  const handleEliminarProducto = (index) => {
    const productosActualizados = [...venta.productos];
    const productoEliminado = productosActualizados.splice(index, 1)[0];
    setVenta({
      ...venta,
      productos: productosActualizados,
      precio: venta.precio - parseFloat(productoEliminado.precio) * productoEliminado.cantidad,
    });
  };

  const handleClienteSelect = (clienteId) => {
    setVenta({
      ...venta,
      cliente: clienteId
    });
  };

  const handleCompraSelect = (compraId) => {
    setVenta({
      ...venta,
      comprasAsociadas: [...venta.comprasAsociadas, compraId]
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({ ...venta, id: Date.now() });
    setVenta({cliente:'', productos: [], cantidad: '', precio: '' });
  };

  return (
    <Form onSubmit={handleSubmit} className="mt-3">
      <Form.Group>
        <Form.Label>Cliente</Form.Label>
        <Form.Control as="select" multiple onChange={(e) => handleClienteSelect(e.target.value)}>
                            {clientes.map((cliente) => (
                              <option key={cliente.id} value={cliente.id}>
                                {cliente.nombre}
                              </option>
                             
                            ))}
                          </Form.Control>
        
        <Form.Control type="text" name="cliente" value={venta.cliente} onChange={handleChange} required />
          <Form.Label>Producto</Form.Label>
          <Form.Control type="text" name="producto" value={productoTemp.nombre} onChange={handleProductoChange} required />
      </Form.Group>
      <Form.Group>
        <Form.Label>Cantidad</Form.Label>
        <Form.Control type="number" name="cantidad" value={productoTemp.cantidad} onChange={handleProductoChange} required />
      </Form.Group>
      <Form.Group>
        <Form.Label>Precio</Form.Label>
        <Form.Control type="number" name="precioU" value={productoTemp.precio} onChange={handleProductoChange} required />
      </Form.Group>
      <Button variant="secondary" type="button" onClick={agregarProducto} className="mt-2">
          Agregar Producto
      </Button>
           {/* Tabla para mostrar los productos añadidos */}
           {venta.productos.length > 0 && (
        <Table striped bordered hover className="mt-3">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Cantidad</th>
              <th>Total</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {venta.productos.map((prod, index) => (
              <tr key={index}>
                <td>{prod.nombre}</td>
                <td>${prod.precio}</td>
                <td>{prod.cantidad}</td>
                <td>${prod.precio * prod.cantidad}</td>
                <td>
                  <Button variant="danger" size="sm" onClick={() => handleEliminarProducto(index)}>
                    Eliminar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      <h4>Total: ${venta.precio}</h4>


      <Form.Group>
        <Form.Label>Total</Form.Label>
        <Form.Control type="number" name="precio" value={venta.precio} onChange={handleChange} required />
      </Form.Group>
       <Form.Group>
              <Form.Label>Estado</Form.Label>
              <Form.Select name="estado" value={venta.estado} onChange={handleChange}>
                <option>Pendiente</option>
                <option>En Proceso</option>
                <option>Completado</option>
                <option>Cancelada</option>
              </Form.Select>
            </Form.Group>
           <Form.Group>
                   <Form.Label>Fecha de entrega</Form.Label>
                 <LocalizationProvider dateAdapter={AdapterDayjs}>
                 
                   <DatePicker label="Basic date picker" />
                 
               </LocalizationProvider>
              
                 </Form.Group>
      
    
      <Form.Group>
        <Form.Label>Metodo Pago</Form.Label>
        <Form.Select name="typePago" value={venta.typePago} onChange={handleChange}>
                <option>Transferencia</option>
                <option>Tarjeta</option>
                <option>efectivo</option>
              </Form.Select>
        <Form.Label>Notas</Form.Label>
        <Form.Control type="text" name="nota" value={venta.nota} onChange={handleChange} />
      </Form.Group>
      <Form.Group>
        <Form.Label>Compras</Form.Label>
        

      </Form.Group>
      <Button variant="primary" type="submit" className="mt-2">Agregar Venta</Button>
    </Form>
  );
};

export default VentaForm;
