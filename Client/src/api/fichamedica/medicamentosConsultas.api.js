import axios from 'axios'

const medConsApi = axios.create({
    baseURL: 'http://localhost:8000/fichamedica/API/Medicamentos_consultas/'
})

export const getAllMedCons = ()=> medConsApi.get('/')

export const createMedCons = (ficha)=> medConsApi.post('/', ficha)

export const eliminarMedCons = (id)=> medConsApi.delete('/' + id)

export const actualizarMedCons = (id, ficha)=> medConsApi.put('/' + id + '/', ficha)

export const getMedCons = (id)=> medConsApi.get('/' + id)

export const getMedConsMed = (id)=> medConsApi.get('/?ficha=' + id)
