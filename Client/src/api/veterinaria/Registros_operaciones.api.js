import axios from 'axios'

const regisOpeApi = axios.create({
    baseURL: 'http://localhost:8000/veterinaria/API/Registros_operaciones/'
})

export const getAllRegiOpe = ()=> regisOpeApi.get('/')

export const createRegiOpe = (registro)=> regisOpeApi.post('/', registro)

export const eliminarRegiOpe = (id)=> regisOpeApi.delete('/' + id)

export const actualizarRegiOpe = (id, registro)=> regisOpeApi.put('/' + id + '/', registro)

export const getRegiOpe = (id)=> regisOpeApi.get('/' + id)
