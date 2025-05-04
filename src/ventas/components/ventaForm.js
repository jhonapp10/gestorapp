// VentaForm Component
/*import React, { useState } from 'react';
import {useSelector} from 'react-redux';
import { Button, Form, Table } from 'react-bootstrap';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import{DatePicker} from '@mui/x-date-pickers/DatePicker';
import { useNavigate } from "react-router-dom";
import Proveedores from '../../proveedores/proveedores';
import Clientes from '../../clientes/clientes';
const VentaForm = ({ onAdd }) => {
  const navigate = useNavigate(); // Hook para navegar entre rutas
  const [venta, setVenta] = useState({ cliente:'' ,productos: [], /*cantidad: 0,* / precio: 0 ,incluirIVA: false, comprasAsociadas:[],metodoPago:"efectivo", estadoVenta:"Pendiente",notas:""});
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
 };

    // Manejo de selección de compras en la tabla
  const handleCompraSelect = (compra) => {
    setVenta((prevVenta) => {
      const comprasActualizadas = prevVenta.comprasAsociadas.includes(compra.id)
        ? prevVenta.comprasAsociadas.filter((id) => id !== compra.id)
        : [...prevVenta.comprasAsociadas, compra.id];

      return { ...prevVenta, comprasAsociadas: comprasActualizadas };
    });
  };


    const handleProductoChange = (index, field, value) => {
      const newProductos = [...venta.productos];
      newProductos[index][field] = value;
  
      if (field === "cantidad" || field === "precio") {
        newProductos[index].subtotal = newProductos[index].cantidad * newProductos[index].precio;
      }
  
      setVenta({ ...venta, productos: newProductos, precio: calcularTotal(newProductos) });
    };
 


  

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


  const handleAgregarCompras = () => {
    setVenta({
      ...venta,
      comprasAsociadas: [...venta.comprasAsociadas, { id: "", proveedor: "", estado:"", precio: 0 }],
    });
  };
  const handleEliminarProducto = (index) => {
    const newProductos = venta.productos.filter((_, i) => i !== index);
    setVenta({ ...venta, productos: newProductos, total: calcularTotal(newProductos) });
  };


  const handleEliminarCompra = (index) => {
    const newCompras = venta.comprasAsociadas.filter((_, i) => i !== index);
    setVenta({ ...venta, comprasAsociadas:newCompras });
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


  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({ ...venta, id: Date.now() });
    setVenta({cliente:'', productos: [], precio: 0,comprasAsociadas:[], metodoPago: "Efectivo",
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
              <Form.Label>Estado</Form.Label>
              <Form.Select name="estado" value={venta.estado} /*onChange={handleChange}* />
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
        <Form.Select name="typePago" value={venta.typePago} /*onChange={handleChange}* />
                <option>Transferencia</option>
                <option>Tarjeta</option>
                <option>efectivo</option>
              </Form.Select>
        <Form.Label>Notas</Form.Label>
        <Form.Control type="text" name="nota" value={venta.nota} /*onChange={handleChange}* / />
      </Form.Group>
      <Form.Group> 
      
        
        <Form.Label>Seleccionar Producto</Form.Label>
        <Form.Check type="checkbox" label="Incluir IVA (12%)" checked={venta.incluirIVA} onChange={(e) => setVenta({ ...venta, incluirIVA: e.target.checked, total: calcularTotal(venta.productos) })} /> 
      </Form.Group>
      {/* Tabla de Productos * /}
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

      <Form.Label>Seleccionar compras</Form.Label>
      <br></br>
      
    <Button
        variant="secondary"
        className="mt-3"
        onClick={() => navigate("/comprasForm")}
      >
        Añadir Nueva Compra
      </Button>
      <Button variant="secondary" onClick={handleAgregarCompras} className="mt-3">+ Agregar Compras</Button>

    {/* Tabla de Compras * /}
    <Table striped bordered hover className="mt-3">
      <thead>
        <tr>          
          <th>Compra</th>
          <th>Proveedor</th>
          <th>Fecha de compra</th>
          <th>Precio</th>          
          <th>Estado</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {venta.comprasAsociadas.map((compra, index) => (
          <tr key={index}>
            
             <td>
              <Form.Select value={compra.id} onChange={(e) => {
                const selectedCompras = compras.find(c => c.id === parseInt(e.target.value));
               
                              
              }}>
                <option value="">Seleccione una compra</option>
                {compras.map((c) => (
                  <option key={c.id} value={c.id}>{c.proveedor.nombre} - ${c.precio}</option>
                ))}
              </Form.Select>
            </td>
            <td>
              <Form.Control type="string" min="1" value={compra.proveedor.nombre}  />
            </td>
            <td>
              <Form.Control type="date" value={compra.fechaCompra} />
            </td>    


            <td>
              <Form.Control type="number" value={compra.precio.toFixed(2)} disabled />
            </td>

            <td>
              <Form.Control type="string" value={compra.estado} disabled />
            </td>
            
            <td>
              <Button variant="danger" onClick={() => handleEliminarCompra(index)}>Eliminar</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>  

      <Button variant="primary" type="submit" className="mt-2">Agregar Venta</Button>
    </Form>
  );
};

export default VentaForm;*/

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Form, Table } from 'react-bootstrap';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { addVentas, fetchCliente, fetchCompra } from '../../redux/actions';
import axios from "axios";

const VentaForm = () => {
  const dispatch = useDispatch();
  
  const [venta, setVenta] = useState({
    cliente: '',
    productos: [],
    comprasAsociadas: [],
    metodoPago: "Efectivo",
    estado: "Pendiente",
    nota: "",
    incluirIVA: false,
    fechaEntrega: null,
    precio: 0
  });
  /*const [clientes, setClientes] = useState([
    { id: 1, nombre: "Juan Pérez" },
    { id: 2, nombre: "Ana Gómez" },
  ]);*/
  const clientes = useSelector((state)=> state.clientes.clientes.clientes || []);
  console.log("Clientes en el store:", clientes);

  //const productos = useState([]);
  //const compras = useState([]);

  const compras =  useSelector(state => state.compras.compras.compras || []);
   useEffect(() => {
            // Simulación de una llamada a una API
   
            dispatch(fetchCliente(), fetchCompra());
          }, [dispatch]);
  

  //const clientes = useSelector(state => state.clientes.clientes);
  const productos = useSelector(state => state.productos.productos.productos);
  //const compras = useSelector(state => state.compras.compras);
  const IVA = 0.12;

  /*const calcularTotal = (productos) => {
    let total = productos.reduce((sum, p) => sum + (p.subtotal || 0), 0);
    return total + (venta.incluirIVA ? total * IVA : 0);
  };*/

  const handleVentaChange = (e) => {
    console.log(e);
    console.log("cliente", clientes);
    setVenta({ ...venta, [e.target.name]: e.target.value });
  };

  const handleDateChange = (newDate) => {
    setVenta({ ...venta, fechaEntrega: newDate });
  };

  const handleAgregarProducto = () => {
    setVenta({
      ...venta,
      productos: [...venta.productos, { id: "", nombre: "", cantidad: 1, precio: 0, subtotal: 0 }]
    });
  };

  const handleAgregarCompras = () => {
    setVenta(prev => ({
      ...prev,
      comprasAsociadas: [...prev.comprasAsociadas, { _id: "", proveedor: "", precio: 0 }]
    }));
  };
  const handleProductoChange = (index, field, value) => {
    const nuevosProductos = [...venta.productos];
  
    // Asegura que el producto en el índice exista
    if (!nuevosProductos[index]) return;
  
    // Actualiza el campo específico
    nuevosProductos[index][field] = value;
  
    // Si se cambia precio o cantidad, recalcula subtotal
    const cantidad = Number(nuevosProductos[index].cantidad || 1);
    const precio = Number(nuevosProductos[index].precio || 0);
    nuevosProductos[index].subtotal = cantidad * precio;
  
    // Actualiza el estado de venta y recalcula el total
    const nuevaVenta = {
      ...venta,
      productos: nuevosProductos,
    };
  
    nuevaVenta.precio = calcularTotal(nuevaVenta);
    setVenta(nuevaVenta);
  };
  
  const handleCompraChange = (index, field, value) => {
    const newCompras = [...venta.comprasAsociadas];
    newCompras[index][field] = value;
  
    setVenta((prev) => ({
      ...prev,
      comprasAsociadas: newCompras,
      precio: calcularTotal({ ...prev, comprasAsociadas: newCompras }),
    }));
  };
  
  
  const handleEliminarProducto = (index) => {
    const newProductos = venta.productos.filter((_, i) => i !== index);
  
    setVenta((prev) => ({
      ...prev,
      productos: newProductos,
      precio: calcularTotal({ ...prev, productos: newProductos })
    }));
  };

  const handleAsignarCompra = (compraId) => {
    const compra = compras.find((c) => c._id === parseInt(compraId));
    if (compra && !venta.comprasAsociadas.some((c) => c._id === compra.id)) {
      setVenta((prev) => ({
        ...prev,
        comprasAsociadas: [...prev.comprasAsociadas, compra],
        precio: calcularTotal(), // Recalcular total
      }));
    }
  };

  const handleEliminarCompra = (compraId) => {
    setVenta((prev) => {
      const nuevasCompras = prev.comprasAsociadas.filter((c) => c._id !== compraId);
      return { ...prev, comprasAsociadas: nuevasCompras, precio: calcularTotal({ ...prev, comprasAsociadas: nuevasCompras }) };
    });
  };

  // Cálculo de total con IVA y compras asignadas
  const calcularTotal = (ventaActual = venta) => {
    console.log("venta calcular total", ventaActual);
    const totalProductos = ventaActual.productos.reduce((sum, p) => sum + (p.subtotal || 0), 0);
    //const totalCompras = ventaActual.comprasAsociadas.reduce((sum, c) => sum + (c.precio || 0), 0);
    let total = totalProductos;
  
    if (ventaActual.incluirIVA) total += total * IVA;
    return total;
  };

   
  


  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const nuevaVenta = {
      ...venta,
      id: Date.now(),
      fechaEntrega: venta.fechaEntrega ? venta.fechaEntrega.toISOString() : null,
      precio: calcularTotal()
    };

    try {
      //const response = await axios.post("/api/ventas", nuevaVenta);
      dispatch(addVentas(nuevaVenta));      
      setVenta({
        cliente: "",
        productos: [],
        comprasAsociadas: [],
        precio: 0,
        incluirIVA: false,
        metodoPago: "Efectivo",
        estado: "Pendiente",
        nota: "",
      });
    } catch (error) {
      console.error("Error al guardar la venta:", error);
    }

    console.log("guardando ventas: ", nuevaVenta);

    //dispatch(addVentas(nuevaVenta));

    /*setVenta({
      cliente: '',
      productos: [],
      comprasAsociadas: [],
      metodoPago: "Efectivo",
      estado: "Pendiente",
      notas: "",
      incluirIVA: false,
      fechaEntrega: null,
      precio: 0
    });*/
  };

  return (
    <Form onSubmit={handleSubmit} className="container mt-4">
      {/* CLIENTE */}
      <Form.Group>
        <Form.Label>Cliente</Form.Label>
        <Form.Select name="cliente" value={venta.cliente} onChange={handleVentaChange} required>
          <option value="">Seleccione un cliente</option>
          {clientes.map(cliente => (
            <option key={cliente._id} value={cliente._id}>{cliente.nombre}</option>
          ))}
        </Form.Select>
      </Form.Group>
      
      {/* ESTADO DE VENTA */}
      <Form.Group>
        <Form.Label>Estado</Form.Label>
        <Form.Select name="estadoVenta" value={venta.estadoVenta} onChange={handleVentaChange}>
          <option>Pendiente</option>
          <option>En Proceso</option>
          <option>Completado</option>
          <option>Cancelada</option>
        </Form.Select>
      </Form.Group>
      
      {/* FECHA DE ENTREGA */}
      <Form.Group>
        <Form.Label>Fecha de entrega</Form.Label>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker value={venta.fechaEntrega} onChange={handleDateChange} />
        </LocalizationProvider>
      </Form.Group>

      {/* MÉTODO DE PAGO */}
      <Form.Group>
        <Form.Label>Método de Pago</Form.Label>
        <Form.Select name="metodoPago" value={venta.metodoPago} onChange={handleVentaChange}>
          <option>Transferencia</option>
          <option>Tarjeta</option>
          <option>Efectivo</option>
        </Form.Select>
      </Form.Group>
      
      {/* NOTAS */}
      <Form.Group>
        <Form.Label>Notas</Form.Label>
        <Form.Control type="textarea" name="nota" value={venta.nota} onChange={handleVentaChange} />
      </Form.Group>


     {/* Tabla de compras asignadas */}
<Table striped bordered hover className="mt-3">
  <thead>
    <tr>
      <th>Proveedor</th>
      <th>Precio</th>
      <th>Acciones</th>
    </tr>
  </thead>
  <tbody>
    {venta.comprasAsociadas.map((compra, index) => (
      <tr key={index}>
        <td>
          <Form.Select
            value={compra._id}
            onChange={(e) => {
              const newCompras = [...venta.comprasAsociadas];
              const selectedCompra = compras.find(p => p._id === e.target.value);
              if (selectedCompra) {
                newCompras[index] = {
                  _id: selectedCompra._id,
                  proveedor: selectedCompra.proveedor,
                  precio: selectedCompra.precio,
                };
                setVenta((prev) => ({
                  ...prev,
                  comprasAsociadas: newCompras,
                  precio: calcularTotal({ ...prev, comprasAsociadas: newCompras }),
                }));
              }
            }}
          >
            <option value="">Seleccione una compra</option>
            {compras.map(c => (
              <option key={c._id} value={c._id}>
                {c.proveedor} - ${c.precio}
              </option>
            ))}
          </Form.Select>
        </td>
        <td>${compra.precio.toFixed(2) || "0.00"}</td>
        <td>
          <Button
            variant="danger"
            onClick={() => handleEliminarCompra(compra._id)}
          >
            Eliminar
          </Button>
        </td>
      </tr>
    ))}
  </tbody>
</Table>

        <Button variant="secondary" onClick={handleAgregarCompras} className="mb-2">+ Agregar Compras</Button>
    

 
      
      {/* INCLUIR IVA */}
      <Form.Check type="checkbox" label="Incluir IVA (12%)" checked={venta.incluirIVA} onChange={(e) => setVenta({ ...venta, incluirIVA: e.target.checked, precio: calcularTotal(venta.productos) })} />
      
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
          {venta.productos.map((producto, index) => (
            <tr key={index}>
              <td>
                <Form.Select value={producto._id} onChange={(e) => {
                  const selectedProduct = productos.find(p => p._id === e.target.value);
                  handleProductoChange(index, "id", selectedProduct._id);
                  handleProductoChange(index, "nombre", selectedProduct.nombre);
                  handleProductoChange(index, "precio", selectedProduct.precio);
                  handleProductoChange(index, "subtotal", selectedProduct.precio * producto.cantidad);
                }}>
                  <option value="">Seleccione un producto</option>
                  {productos.map(p => (
                    <option key={p.id} value={p._id}>{p.nombre} - ${p.precio}</option>
                  ))}
                </Form.Select>
              </td>
              <td>
                <Form.Control type="number" min="1" value={producto.cantidad} onChange={(e) => handleProductoChange(index, "cantidad", parseInt(e.target.value))} required />
              </td>
              <td>${producto.precio.toFixed(2)}</td>
              <td>${producto.subtotal.toFixed(2)}</td>
              <td>
                <Button variant="danger" onClick={() => handleEliminarProducto(index)}>Eliminar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>


      <Button variant="secondary" onClick={handleAgregarProducto} className="mb-2">+ Agregar Producto</Button>
      
            <h4>Total: ${calcularTotal().toFixed(2)}</h4>

  
      <Button variant="primary" type="submit" className="mt-2">Agregar Venta</Button>
    </Form>
  );
};

export default VentaForm;

