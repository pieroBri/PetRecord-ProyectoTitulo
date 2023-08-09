import axios from 'axios'

const userVetApi = axios.create({
    baseURL: 'http://localhost:8000/usuarios/API/User_Vet/'
})

export const getAllUserVets = ()=> userVetApi.get('/')

export const createUserVet = (user)=> userVetApi.post('/', user)

export const eliminarUserVet = (id)=> userVetApi.delete('/' + id)

export const actualizarUserVet = (id, user)=> userVetApi.put('/' + id + '/', user)

export const getUserVet = (id)=> userVetApi.get('/' + id)
