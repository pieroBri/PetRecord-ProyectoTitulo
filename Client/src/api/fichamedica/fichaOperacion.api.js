import axios from 'axios'

const fichaOpApi = axios.create({
    baseURL: 'http://localhost:8000/fichamedica/API/Fichas_operación/'
})

export const getAllFichaOp = ()=> fichaOpApi.get('/')

export const createFichaOp = (ficha)=> fichaOpApi.post('/', ficha)

export const eliminarFichaOp = (id)=> fichaOpApi.delete('/' + id)

export const actualizarFichaOp = (id, ficha)=> fichaOpApi.put('/' + id + '/', ficha)

export const getFichaOp = (id)=> fichaOpApi.get('/' + id)
