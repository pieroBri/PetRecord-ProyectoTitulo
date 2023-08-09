import axios from 'axios'

const franquiciaApi = axios.create({
    baseURL: 'http://localhost:8000/veterinaria/API/Franquicias/'
})

export const getAllFranquicias = ()=> franquiciaApi.get('/')

export const createFranquicia = (franquicia)=> franquiciaApi.post('/', franquicia)

export const eliminarFranquicia = (id)=> franquiciaApi.delete('/' + id)

export const actualizarFranquicia = (id, franquicia)=> franquiciaApi.put('/' + id + '/', franquicia)

export const getFranquicia = (id)=> franquiciaApi.get('/' + id)
