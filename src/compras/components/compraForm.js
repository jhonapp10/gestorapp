// CompraForm Component
/*import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Form ,Table} from 'react-bootstrap';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import{DatePicker} from '@mui/x-date-pickers/DatePicker';
import Proveedores from '../../proveedores/proveedores';
import ProveedoresList from '../../proveedores/components/proveedoresList';
const CompraForm=({onAdd})=>{
  const [compra, setCompra] = useState({ productos: [], precio: 0 });
  const ventas = useSelector((state) => state.ventas.ventas); // Obtener ventas para asociarlas
  const productos = useSelector((state)=>state.productos.productos);
  const IVA = 0.12; // IVA del 12%
  const [productoTemp, setProductoTemp] = useState({ producto: '',cantidad: '', precio: '' });
  const proveedores = useSelector((state) => state.proveedores.proveedores); // Obtener proveedores de Redux

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
                    <Form.Label>Estado</Form.Label>
                    <Form.Select name="estado" value={compra.estado} onChange={handleChange}>
                      <option>Pendiente</option>
                      <option>En Proceso</option>
                      <option>Enviada</option>
                      <option>Cancelada</option>
                    </Form.Select>
                  </Form.Group>  
      <Form.Group>
        <Form.Label>Fecha de compra</Form.Label>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
         <DatePicker label="Basic date picker" />      
      </LocalizationProvider>   
      </Form.Group>
             
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

export default CompraForm;*/

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Form, Table } from 'react-bootstrap';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { addCompras } from '../../redux/actions'; // Asegúrate de tener la acción en Redux

const CompraForm = () => {
  const dispatch = useDispatch();
  
  const [compra, setCompra] = useState({
    proveedor: '',
    estado: 'Pendiente',
    datecompra: null,
    productos: [],
    precio: 0
  });

  //const productos = useState([]);
  //const proveedores = useState([]);
  const productos = useSelector((state) => state.productos.productos.productos);
  const proveedores = useSelector((state) => state.proveedores.proveedores.proveedores);
  
  console.log("Proveedores en modulo de compras: ", proveedores);
  const IVA = 0.12;

  const calcularTotal = (productos) => {
    let total = productos.reduce((sum, p) => sum + (p.subtotal || 0), 0);
    return total + (compra.incluirIVA ? total * IVA : 0);
  };

  const handleCompraChange = (e) => {
    console.log("cambio de proveedores en compras:",e.target.name, e.target.value);

    setCompra({ ...compra, [e.target.name]: e.target.value });
  };

  const handleDateChange = (newDate) => {
    console.log("fecha compra: ",newDate);
    setCompra({ ...compra, datecompra: newDate });
  };

  const handleAgregarProducto = () => {
    setCompra({
      ...compra,
      productos: [...compra.productos, { id: "", nombre: "", cantidad: 1, precio: 0 }],
    });
  };

  const handleProductoChange = (index, field, value) => {
    const newProductos = [...compra.productos];
    newProductos[index][field] = value;

    if (field === "cantidad") {
      newProductos[index].subtotal = newProductos[index].cantidad * newProductos[index].precio;
    }

    setCompra({ ...compra, productos: newProductos, precio: calcularTotal(newProductos) });
  };

  const handleEliminarProducto = (index) => {
    const newProductos = compra.productos.filter((_, i) => i !== index);
    setCompra({ ...compra, productos: newProductos, precio: calcularTotal(newProductos) });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(compra);
    const nuevaCompra = {
      ...compra,
      id: Date.now(),
      estado: compra.estado,
      datecompra: compra.datecompra ? compra.datecompra.toISOString() : null,
    };

    dispatch(addCompras(nuevaCompra));

    setCompra({ proveedor: '', estado: 'Pendiente', datecompra: null, productos: [], precio: 0 });
  };

  return (
    <Form onSubmit={handleSubmit} className="container mt-4">
      {/* PROVEEDOR */}
      <Form.Group>
        <Form.Label>Proveedor</Form.Label>
        <Form.Select name="proveedor" value={compra.proveedor} onChange={handleCompraChange} required>
          <option value="">Seleccione un proveedor</option>
          {proveedores.map((prov) => (
            <option key={prov._id} value={prov._id}>{prov.nombre}</option>
          ))}
        </Form.Select>
      </Form.Group>

      {/* ESTADO */}
      <Form.Group>
        <Form.Label>Estado</Form.Label>
        <Form.Select name="estado" value={compra.estado} onChange={handleCompraChange}>
          <option>Pendiente</option>
          <option>En Proceso</option>
          <option>Completada</option>
          <option>Cancelada</option>
        </Form.Select>
      </Form.Group>

      {/* FECHA DE COMPRA */}
      <Form.Group>
        <Form.Label>Fecha de compra</Form.Label>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker value={compra.datecompra} onChange={handleDateChange} />
        </LocalizationProvider>
      </Form.Group>

      {/* TABLA DE PRODUCTOS */}
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
                <Form.Select
                  value={producto._id}
                  onChange={(e) => {
                    const selectedProduct = productos.find(p => p._id === e.target.value);
                    handleProductoChange(index, "id",selectedProduct._id);
                    handleProductoChange(index, "nombre", selectedProduct.nombre);
                    handleProductoChange(index, "precio", selectedProduct.precio);
                    handleProductoChange(index, "subtotal", selectedProduct.precio * producto.cantidad);
                  }}
                >
                  <option value="">Seleccione un producto</option>
                  {productos.map((p) => (
                    <option key={p._id} value={p._id}>{p.nombre} - ${p.precio}</option>
                  ))}
                </Form.Select>
              </td>
              <td>
                <Form.Control
                  type="number"
                  min="1"
                  value={producto.cantidad}
                  onChange={(e) => handleProductoChange(index, "cantidad", parseInt(e.target.value))}
                  required
                />
              </td>
              <td>
                <Form.Control type="number" value={producto.precio} disabled />
              </td>
              <td>${producto.subtotal}</td>
              <td>
                <Button variant="danger" onClick={() => handleEliminarProducto(index)}>Eliminar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Button variant="secondary" onClick={handleAgregarProducto} className="mb-2">+ Agregar Producto</Button>

      <h4>Total: ${compra.precio.toFixed(2)}</h4>

      <Button variant="primary" type="submit" className="mt-2">Agregar compra</Button>
    </Form>
  );
};

export default CompraForm;
