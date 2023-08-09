import axios from 'axios'

const fechasApi = axios.create({
    baseURL: 'http://localhost:8000/veterinaria/API/Fechas_solicitadas/'
})

export const getAllFechas = ()=> fechasApi.get('/')

export const createFecha = (Fecha)=> fechasApi.post('/', Fecha)

export const eliminarFecha = (id)=> fechasApi.delete('/' + id)

export const actualizarFecha = (id, Fecha)=> fechasApi.put('/' + id + '/', Fecha)

export const getFecha = (id)=> fechasApi.get('/' + id)
