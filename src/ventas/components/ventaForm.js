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
  const [venta, setVenta] = useState({ cliente:'' ,productos: [], /*cantidad: 0,*/ precio: 0 ,incluirIVA: false});
  const compras = useSelector((state) => state.compras); // Obtener ventas para asociarlas
  const clientes = useSelector((state)=> state.clientes);
  const productos = useSelector((state)=>state.productos);
  const IVA = 0.12; // IVA del 12%
  const [productoTemp, setProductoTemp] = useState({ nombre: '',cantidad: '', precio: '' });
  const handleChange = (e) => {
    console.log(venta.cliente);
    const {name, value}= e.target;
    setVenta((prevVenta) => ({
      ...prevVenta,
      [name]: value,
    }));
    /*setProductoTemp((productoTemp)=>({
      ...productoTemp,
      [name]: value,
    })); */ };

    const handleProductoChange = (index, field, value) => {
      const newProductos = [...venta.productos];
      newProductos[index][field] = value;
  
      if (field === "cantidad" || field === "precio") {
        newProductos[index].subtotal = newProductos[index].cantidad * newProductos[index].precio;
      }
  
      setVenta({ ...venta, productos: newProductos, precio: calcularTotal(newProductos) });
    };


  /*const handleProductoChange = (e) => {
    setProductoTemp({ ...productoTemp, [e.target.name]: e.target.value });
  };*/

  const calcularTotal = (productos) => {
    let total = productos.reduce((sum, p) => sum + (p.subtotal || 0), 0);
    if (venta.incluirIVA) total += total * IVA;
    return total;
  };

  const handleAgregarProducto = () => {
    setVenta({
      ...venta,
      productos: [...venta.productos, { id: "", nombre: "", cantidad: 1, precio: 0, subtotal: 0 }],
    });
  };

  const handleEliminarProducto = (index) => {
    const newProductos = venta.productos.filter((_, i) => i !== index);
    setVenta({ ...venta, productos: newProductos, total: calcularTotal(newProductos) });
  };
 

  const handleClienteSelect = (clienteId) => {
    setVenta({
      ...venta,
      cliente: clienteId
    });
  };

  const handleProductoSeleccionado = (id) => {
    const producto = productos.find((p) => p.id === parseInt(id));
    if (producto) {
      setVenta({ ...venta, productosVendidos: [...venta.productosVendidos, producto] });
    }
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
    setVenta({cliente:'', productos: [], precio: 0, metodoPago: "Efectivo",
      estadoVenta: "Pendiente",
      notas: "",incluirIVA: false });
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
      </Form.Group>
      <Form.Group>     
      
        
        <Form.Label>Seleccionar Producto</Form.Label>
        <Form.Check type="checkbox" label="Incluir IVA (12%)" checked={venta.incluirIVA} onChange={(e) => setVenta({ ...venta, incluirIVA: e.target.checked, total: calcularTotal(venta.productos) })} /> 
      </Form.Group>
      {/* Tabla de Productos */}
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Precio Unitario</th>
            <th>Subtotal</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {venta.productos.map((producto, index) => (
            <tr key={index}>
              <td>
                <Form.Select value={producto.id} onChange={(e) => {
                  const selectedProduct = productos.find(p => p.id === parseInt(e.target.value));
                  handleProductoChange(index, "id", selectedProduct.id);
                  handleProductoChange(index, "nombre", selectedProduct.nombre);
                  handleProductoChange(index, "precio", selectedProduct.precio);
                  handleProductoChange(index, "subtotal", selectedProduct.precio * producto.cantidad);
                }}>
                  <option value="">Seleccione un producto</option>
                  {productos.map((p) => (
                    <option key={p.id} value={p.id}>{p.nombre} - ${p.precio}</option>
                  ))}
                </Form.Select>
              </td>
              <td>
                <Form.Control type="number" min="1" value={producto.cantidad} onChange={(e) => handleProductoChange(index, "cantidad", parseInt(e.target.value))} required />
              </td>
              <td>
                <Form.Control type="number" value={producto.precio} disabled />
              </td>
              <td>${producto.subtotal.toFixed(2)}</td>
              <td>
                <Button variant="danger" onClick={() => handleEliminarProducto(index)}>Eliminar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Button variant="secondary" onClick={handleAgregarProducto} className="mb-2">+ Agregar Producto</Button>
     
      <h4>Total: ${venta.precio.toFixed(2)}</h4>


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
