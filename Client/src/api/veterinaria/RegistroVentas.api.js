import axios from 'axios'

const ventasApi = axios.create({
    baseURL: 'http://localhost:8000/veterinaria/API/Registros_de_ventas/'
})

export const createVenta = (venta)=> ventasApi.post('/', venta)

export const eliminarVenta = (id)=> ventasApi.delete('/' + id)

export const actualizarVenta = (id, venta)=> ventasApi.put('/' + id + '/', venta)

export const getVentasVet = (id)=> ventasApi.get('/?id=' + id)

export const getAllVentas = ()=> ventasApi.get()

export const getVenta = (id)=> ventasApi.get('/' + id)