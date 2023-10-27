import axios from 'axios'

const tratConsultasApi = axios.create({
    baseURL: 'http://localhost:8000/fichamedica/API/Tratamientos_consultas/'
})

export const getAllTratConsultas = ()=> tratConsultasApi.get('/')

export const createTratConsulta = (ficha)=> tratConsultasApi.post('/', ficha)

export const eliminarTratConsulta = (id)=> tratConsultasApi.delete('/' + id)

export const actualizarTratConsulta = (id, ficha)=> tratConsultasApi.put('/' + id + '/', ficha)

export const getTratConsulta = (id)=> tratConsultasApi.get('/' + id)

export const getTratConsultaMed = (id)=> tratConsultasApi.get('/?ficha=' + id)
