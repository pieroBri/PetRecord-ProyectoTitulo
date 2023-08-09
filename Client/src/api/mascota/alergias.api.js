import axios from 'axios'

const alergiaApi = axios.create({
    baseURL: 'http://localhost:8000/mascotas/API/Alergias/'
})

export const getAllAlergias = ()=> alergiaApi.get('/')

export const createAlergia = (alergia)=> alergiaApi.post('/', alergia)

export const eliminarAlergia = (id)=> alergiaApi.delete('/' + id)

export const actualizarAlergia = (id, alergia)=> alergiaApi.put('/' + id + '/', alergia)

export const getAlergia = (id)=> alergiaApi.get('/' + id)
