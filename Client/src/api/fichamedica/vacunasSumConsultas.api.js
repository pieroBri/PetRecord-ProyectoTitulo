import axios from 'axios'

const vacSumApi = axios.create({
    baseURL: 'http://localhost:8000/fichamedica/API/Vacunas_suministradas_consultas/'
})

export const getAllVacunasSum = ()=> vacSumApi.get('/')

export const createVacunaSum = (ficha)=> vacSumApi.post('/', ficha)

export const eliminarVacunaSum = (id)=> vacSumApi.delete('/' + id)

export const actualizarVacunaSum = (id, ficha)=> vacSumApi.put('/' + id + '/', ficha)

export const getVacunaSum = (id)=> vacSumApi.get('/' + id)

export const getVacunaSumMed = (id)=> vacSumApi.get('/?ficha=' + id)

export const getVacunaSumPet = (id)=> vacSumApi.get('/?pet=' + id)
