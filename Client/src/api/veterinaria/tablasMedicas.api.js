import axios from 'axios'

const tabMedApi = axios.create({
    baseURL: 'http://localhost:8000/veterinaria/API/Tablas_medicas/'
})

export const getAllTablas = ()=> tabMedApi.get('/')

export const createTabla = (tabla)=> tabMedApi.post('/', tabla)

export const eliminarTabla = (id)=> tabMedApi.delete('/' + id)

export const actualizarTabla = (id, tabla)=> tabMedApi.put('/' + id + '/', tabla)

export const getTabla = (id)=> tabMedApi.get('/' + id)
