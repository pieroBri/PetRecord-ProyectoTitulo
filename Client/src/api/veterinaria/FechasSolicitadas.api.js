import axios from 'axios'

const fechasApi = axios.create({
    baseURL: 'http://localhost:8000/veterinaria/API/Fechas_calendarios/'
})

export const getAllFechas = ()=> fechasApi.get('/')

export const getFechasVetDate = (id, date)=> fechasApi.get('/?vet=' + id + '&date=' + date)

export const getFechasOwDate = (id, date)=> fechasApi.get('/?ow=' + id + '&date=' + date)

export const createFecha = (Fecha)=> fechasApi.post('/', Fecha)

export const eliminarFecha = (id)=> fechasApi.delete('/' + id)

export const actualizarFecha = (id, Fecha)=> fechasApi.put('/' + id + '/', Fecha)

export const getFecha = (id)=> fechasApi.get('/' + id)
