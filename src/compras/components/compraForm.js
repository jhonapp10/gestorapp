// CompraForm Component
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Form ,Table} from 'react-bootstrap';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import{DatePicker} from '@mui/x-date-pickers/DatePicker';
import Proveedores from '../../proveedores/proveedores';
import ProveedoresList from '../../proveedores/components/proveedoresList';
const CompraForm=({onAdd})=>{
  const [compra, setCompra] = useState({ productos: [], precio: '' });
  const ventas = useSelector((state) => state.ventas); // Obtener ventas para asociarlas
  const [productoTemp, setProductoTemp] = useState({ producto: '',cantidad: '', precio: '' });
  const proveedores = useSelector((state) => state.proveedores); // Obtener proveedores de Redux

  const handleChange = (e) => {
    setCompra({ ...compra, [e.target.name]: e.target.value });
  };
  var productoAdd= false;
  const handleProductoChange = (e) => {

    const {name, value}= e.target;

    setProductoTemp((productoTemp)=>({
      ...productoTemp,
      [name]: value,
    }));

    console.log(productoTemp);
    //setProductoTemp({ ...productoTemp, [e.target.name]: e.target.value });
  };

  const agregarProducto = () => {

    console.log(productoTemp);
    if (productoTemp.producto && productoTemp.cantidad && productoTemp.precio) {
      setCompra((prevCompra)=>({
        ...prevCompra,
        productos: [...prevCompra.productos,{...productoTemp, precio: parseFloat(productoTemp.precio), cantidad: Number(productoTemp.cantidad)}],
        precio: compra.precio + parseFloat(productoTemp.precio)* (productoTemp.cantidad)
      }));

      productoAdd= true;

      
    }
    if (productoAdd){
      setProductoTemp({ producto: '', cantidad:'' , precio: '' });
    }
  };

  // Eliminar un producto de la lista
  const handleEliminarProducto = (index) => {
    const productosActualizados = [...compra.productos];
    const productoEliminado = productosActualizados.splice(index, 1)[0];
    setCompra({
      ...compra,
      productos: productosActualizados,
      precio: compra.precio - parseFloat(productoEliminado.precio) * productoEliminado.cantidad,
    });
  };

  // Manejar cambios en la compra
  const handleCompraChange = (e) => {
    setCompra({ ...compra, [e.target.name]: e.target.value });
  };

  const handleVentaSelect = (ventaId) => {
    setCompra({
      ...compra,
      ventasAsociadas: [...compra.ventasAsociadas, ventaId]
    });
  };

  const handleProveedorSelect = (proveedorId) => {
    setCompra({
      ...compra,
      ventasAsociadas: [...compra.ventasAsociadas],
      proveedor: proveedorId
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({ ...compra, id: Date.now() });
    setCompra({ productos: [], precio: '' });
  };

  const calculoprecioTotal =()=>{
    
  }

  return (
    <Form onSubmit={handleSubmit} className="mt-3">
      <Form.Group>
        <Form.Label>Proveedor</Form.Label>
        <Form.Select name="proveedor" value={compra.proveedor} onChange={handleCompraChange} required>                            
                                 {proveedores.map((prov) => (
                                  <option key={prov.id} value={prov.nombre}>
                                    {prov.nombre}
                                  </option>
                                ))}
                             
                           </Form.Select>
      </Form.Group>
      <Form.Group>
          <Form.Label>Seleccionar Ventas Asociadas</Form.Label>
          <Form.Control as="select" multiple onChange={(e) => handleVentaSelect(e.target.value)}>
            {ventas.map((venta) => (
              <option key={venta.id} value={venta.id}>
                {venta.cliente} - ${venta.precio}
              </option>
             
            ))}
          </Form.Control>
        </Form.Group>
      <Form.Group>            
         <Form.Label>Producto</Form.Label>
         <Form.Control type="text" name="producto" value={productoTemp.producto} onChange={handleProductoChange} />
      </Form.Group>
      <Form.Group>
        <Form.Label>Fecha de compra</Form.Label>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
         <DatePicker label="Basic date picker" />      
      </LocalizationProvider>   
      </Form.Group>
      <Form.Group>
        <Form.Label>Cantidad</Form.Label>
               <Form.Control type="number" name="cantidad" value={productoTemp.cantidad} onChange={handleProductoChange}  />
      <Form.Label>Precio</Form.Label>
              <Form.Control type="number" name="precio" value={productoTemp.precio} onChange={handleProductoChange}  />      
      </Form.Group>
      
       <Button variant="secondary" type="button" onClick={agregarProducto} className="mt-2">
                Agregar Producto
        </Button>

            {/* Tabla para mostrar los productos añadidos */}
      {compra.productos.length > 0 && (
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
            {compra.productos.map((prod, index) => (
              <tr key={index}>
                <td>{prod.producto}</td>
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

      <h4>Total: ${compra.precio}</h4>
      <Form.Group>
        <Form.Label>Total</Form.Label>
        <Form.Control type="number" name="total" value={compra.precio} onChange={handleChange} />
      </Form.Group>
            <Button variant="primary" type="submit" className="mt-2">Agregar compra</Button>
      
    </Form>
  );
};

export default CompraForm;