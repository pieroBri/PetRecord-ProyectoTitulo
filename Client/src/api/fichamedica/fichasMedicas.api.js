import axios from 'axios'

const fichamedApi = axios.create({
    baseURL: 'http://localhost:8000/fichamedica/API/Fichas_medicas/'
})

export const getAllFichaMed = ()=> fichamedApi.get('/')

export const createFichaMed = (ficha)=> fichamedApi.post('/', ficha)

export const eliminarFichaMed = (id)=> fichamedApi.delete('/' + id)

export const actualizarFichaMed = (id, ficha)=> fichamedApi.put('/' + id + '/', ficha)

export const getFichaMed = (id)=> fichamedApi.get('/' + id)

export const getFichasMedMascota = (id)=> fichamedApi.get('/?pet=' + id)