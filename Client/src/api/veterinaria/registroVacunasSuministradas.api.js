import axios from 'axios'

const regisVacApi = axios.create({
    baseURL: 'http://localhost:8000/veterinaria/API/Registros_vacunas_suministradas/'
})

export const getAllRegiVac = ()=> regisVacApi.get('/')

export const createRegiVac = (registro)=> regisVacApi.post('/', registro)

export const eliminarRegiVac = (id)=> regisVacApi.delete('/' + id)

export const actualizarRegiVac = (id, registro)=> regisVacApi.put('/' + id + '/', registro)

export const getRegiVac = (id)=> regisVacApi.get('/' + id)
