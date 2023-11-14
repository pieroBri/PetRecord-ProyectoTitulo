import axios from 'axios'

const productosApi = axios.create({
    baseURL: 'http://localhost:8000/veterinaria/API/Productos_venta/'
})

export const createProductoVenta = (prod)=> productosApi.post('/', prod)

export const eliminarProductoVenta = (id)=> productosApi.delete('/' + id)

export const actualizarProductosVentas = (id, prod)=> productosApi.put('/' + id + '/', prod)

export const getProductosVentaVenta = (id)=> productosApi.get('/?id=' + id)

export const getAllProductosVentas = ()=> productosApi.get()

export const getProductoVenta = (id)=> productosApi.get('/' + id)