import axios from 'axios'

const tablasMedApi = axios.create({
    baseURL: 'http://localhost:8000/fichamedica/API/Tablas_medicas/'
})

export const getAllTablasMedicas = ()=> tablasMedApi.get('/')

export const createTablaMedica = (ficha)=> tablasMedApi.post('/', ficha)

export const eliminarTablaMedica = (id)=> tablasMedApi.delete('/' + id)

export const actualizarTablaMedica = (id, ficha)=> tablasMedApi.put('/' + id + '/', ficha)

export const getTablaMedica = (id)=> tablasMedApi.get('/' + id)
