import axios from 'axios'

const fichasedacionApi = axios.create({
    baseURL: 'http://localhost:8000/fichamedica/API/Fichas_sedación/'
})

export const getAllFichaSed = ()=> fichasedacionApi.get('/')

export const createFichaSed = (ficha)=> fichasedacionApi.post('/', ficha)

export const eliminarFichaSed = (id)=> fichasedacionApi.delete('/' + id)

export const actualizarFichaSed = (id, ficha)=> fichasedacionApi.put('/' + id + '/', ficha)

export const getFichaSed = (id)=> fichasedacionApi.get('/' + id)

export const getFichasSedMascota = (id)=> fichasedacionApi.get('/?pet=' + id)

export const getFichasSedMed = (id)=> fichasedacionApi.get('/?ficha=' + id)