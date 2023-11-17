import axios from 'axios'

const userDuenoApi = axios.create({
    baseURL: 'http://localhost:8000/usuarios/API/User_Dueño/'
})

export const getAllUserDuenos = ()=> userDuenoApi.get('/')

export const createUserDueno = (user)=> userDuenoApi.post('/', user)

export const eliminarUserDueno = (id)=> userDuenoApi.delete('/' + id)

export const actualizarUserDueno = (id, user)=> userDuenoApi.put('/' + id + '/', user)

export const getUserDueno = (id)=> userDuenoApi.get('/' + id)
