import axios from 'axios'

const vetApi = axios.create({
    baseURL: 'http://localhost:8000/veterinaria/API/Veterinarias/'
})

export const getAllVeterinarias = ()=> vetApi.get('/')

export const createVeterinaria = (veterinaria)=> vetApi.post('/', veterinaria)

export const eliminarVeterinaria = (id)=> vetApi.delete('/' + id)

export const actualizarVeterinaria = (id, veterinaria)=> vetApi.put('/' + id + '/', veterinaria)

export const getVeterinaria = (id)=> vetApi.get('/' + id)
