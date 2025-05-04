// utils/cargarDatos.js
/*import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useDispatch } from 'react-redux';


import {fetchReparaciones, fetchCompra, fetchProductos, fetchProveedor, fetchVentas, fetchCliente } from '../redux/actions';

export async function usecargarDatosIniciales() {
  const dispatch = useDispatch();  

  const loadClientes = () =>{
    const [clientes, setClientes] = useState([]);

    //const clientes = useSelector((state) => state.clientes);
  
    useEffect(()=>{
      const fechData= async()=>{
        const response = await fetch('http://localhost:5000/api/clientes'); // Ajusta la URL a tu backend
        const data = await response.json();
        console.log(data);
        setClientes(data);      
        dispatch(fetchCliente());
      };
      fechData();    
       
    },[dispatch]);
  }
  
  const loadProveedor = ()=>{
  const [proveedores, setProveedors] = useState([]);
  //const proveedores = useSelector((state) => state.proveedores.proveedores.proveedores);

  useEffect(()=>{
      const fechData= async()=>{
        const response = await fetch('http://localhost:5000/api/proveedores'); // Ajusta la URL a tu backend
        const data = await response.json();
        console.log(data);
        setProveedors(data);      
        dispatch(fetchProveedor());
      };
      fechData();    
       
    },[dispatch]);
  }

  const loadProductos=()=>{
  const [productos, setProducto] = useState([]);
  //const productos = useSelector((state) => state.productos?.productos || []);


    useEffect(() => {
      // Simulación de una llamada a una API
      const cargarProductos = async () => {
        const response = await fetch('http://localhost:5000/api/productos'); // Ajusta la URL a tu backend
        const data = await response.json();
        setProducto(data);
        dispatch(fetchProductos()); // Enviamos los datos al store
      };
  
      cargarProductos();
    }, [dispatch]);

  }

  const loadCompra =()=>{
    const [compras, setCompras]= useState([]);
    useEffect(() => {
        const cargarCompras = async () => {
          try {
            const response = await fetch('http://localhost:5000/api/compras');
            const data= await response.json();
            setCompras(data);
            dispatch(fetchCompra(response.data)); 
    
          } catch (error) {
            console.error('Error al cargar compras:', error);
          }
        };
    
        cargarCompras();
      }, [dispatch]);
  }
  const loadVentas=()=>{
    const [ventas, setVenta]= useState([]);
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
  }
  const loadReparaciones=()=>{
     const [reparaciones, setReparacion]= useState([]);
      
    
        useEffect(() => {
              // Simulación de una llamada a una API
              const cargarReparaciones = async () => {
                const response = await fetch('http://localhost:5000/api/reparaciones'); // Ajusta la URL a tu backend
                console.log('Reparaciones',response);
                const data = await response.json();
                setReparacion(data);
                dispatch(fetchReparaciones()); // Enviamos los datos al store
              };
          
              cargarReparaciones();
            }, [dispatch]);
  }
  try {
    // Paso 1: cargar datos base sin dependencias
    await Promise.all([
        loadClientes(),
        loadProveedor(),
        loadProductos(),
    ]);

    // Paso 2: cargar datos que dependen de productos y clientes
    await Promise.all([
        loadCompra(),
        loadVentas(),
    ]);

    // Paso 3: cargar reparaciones que pueden depender de ventas, productos y clientes
    loadReparaciones();

    console.log('✅ Datos iniciales cargados correctamente.');
  } catch (error) {
    console.error('❌ Error al cargar datos iniciales:', error);
  }
}*/

// utils/useCargarDatosIniciales.js
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  fetchReparaciones,
  fetchCompra,
  fetchProductos,
  fetchProveedor,
  fetchVentas,
  fetchCliente,
} from '../redux/actions';

/**
 * Hook personalizado para cargar datos iniciales al montar la app.
 */
export function useCargarDatosIniciales() {
  const dispatch = useDispatch();

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        // Paso 1: cargar datos sin dependencias
        await Promise.all([
          dispatch(fetchCliente()),
          dispatch(fetchProveedor()),
          dispatch(fetchProductos()),
        ]);

        // Paso 2: cargar datos con dependencias
        await Promise.all([
          dispatch(fetchCompra()),
          dispatch(fetchVentas()),
        ]);

        // Paso 3: cargar reparaciones (que pueden depender de otros)
        await dispatch(fetchReparaciones());

        console.log('✅ Datos iniciales cargados correctamente');
      } catch (error) {
        console.error('❌ Error al cargar datos iniciales:', error);
      }
    };

    cargarDatos();
  }, [dispatch]);
}

