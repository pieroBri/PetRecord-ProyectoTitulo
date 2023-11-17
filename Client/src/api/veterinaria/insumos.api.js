import axios from 'axios'

const insumosApi = axios.create({
    baseURL: 'http://localhost:8000/veterinaria/API/Insumos/'
})

export const createInsumo = (insumo)=> insumosApi.post('/', insumo)

export const eliminarInsumo = (id)=> insumosApi.delete('/' + id)

export const actualizarInsumos = (id, insumo)=> insumosApi.put('/' + id + '/', insumo)

export const getInsumosVet = (id)=> insumosApi.get('/?id=' + id)

export const getAllInsumos = ()=> insumosApi.get()

export const getInsumo = (id)=> insumosApi.get('/' + id)