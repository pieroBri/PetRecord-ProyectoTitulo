import axios from 'axios'

const fichahosptApi = axios.create({
    baseURL: 'http://localhost:8000/fichamedica/API/Fichas_hospitalización/'
})

export const getAllFichaHospt = ()=> fichahosptApi.get('/')

export const createFichaHospt = (ficha)=> fichahosptApi.post('/', ficha)

export const eliminarFichaHospt = (id)=> fichahosptApi.delete('/' + id)

export const actualizarFichaHospt = (id, ficha)=> fichahosptApi.put('/' + id + '/', ficha)

export const getFichaHospt = (id)=> fichahosptApi.get('/' + id)
