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
  const [compra, setCompra] = useState({ productos: [], precio: 0 });
  const ventas = useSelector((state) => state.ventas); // Obtener ventas para asociarlas
  const productos = useSelector((state)=>state.productos);
  const IVA = 0.12; // IVA del 12%
  const [productoTemp, setProductoTemp] = useState({ producto: '',cantidad: '', precio: '' });
  const proveedores = useSelector((state) => state.proveedores); // Obtener proveedores de Redux

  const handleChange = (e) => {
    setCompra({ ...compra, [e.target.name]: e.target.value });
  };
  var productoAdd= false;
  const handleProductoChange = (index, field, value) => {
    const newProductos = [...compra.productos];
    newProductos[index][field] = value;

    if (field === "cantidad" || field === "precio") {
      newProductos[index].subtotal = newProductos[index].cantidad * newProductos[index].precio;
    }

    setCompra({ ...compra, productos: newProductos, precio: calcularTotal(newProductos) });
  };

  const calcularTotal = (productos) => {
    let total = productos.reduce((sum, p) => sum + (p.subtotal || 0), 0);
    if (compra.incluirIVA) total += total * IVA;
    return total;
  };

  const handleAgregarProducto = () => {
    setCompra({
      ...compra,
      productos: [...compra.productos, { id: "", nombre: "", cantidad: 1, precio: 0, subtotal: 0 }],
    });
  };

  const handleEliminarProducto = (index) => {
    const newProductos = compra.productos.filter((_, i) => i !== index);
    setCompra({ ...compra, productos: newProductos, total: calcularTotal(newProductos) });
  };
  /*const agregarProducto = () => {

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
  };*/

  // Eliminar un producto de la lista
  /*const handleEliminarProducto = (index) => {
    const productosActualizados = [...compra.productos];
    const productoEliminado = productosActualizados.splice(index, 1)[0];
    setCompra({
      ...compra,
      productos: productosActualizados,
      precio: compra.precio - parseFloat(productoEliminado.precio) * productoEliminado.cantidad,
    });
  };*/

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
    setCompra({ productos: [], precio: 0 });
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
        <Form.Label>Fecha de compra</Form.Label>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
         <DatePicker label="Basic date picker" />      
      </LocalizationProvider>   
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
                 {compra.productos.map((producto, index) => (
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
                
      <h4>Total: ${compra.precio.toFixed(2)}</h4>
      <Form.Group>
        <Form.Label>Total</Form.Label>
        <Form.Control type="number" name="total" value={compra.precio} onChange={handleChange} />
      </Form.Group>
            <Button variant="primary" type="submit" className="mt-2">Agregar compra</Button>
      
    </Form>
  );
};

export default CompraForm;