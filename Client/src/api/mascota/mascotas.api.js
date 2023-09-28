import axios from 'axios'

const mascotaApi = axios.create({
    baseURL: 'http://localhost:8000/mascota/API/Mascotas/'
})

export const getAllMascotas = ()=> mascotaApi.get('/')

export const getMascotasDueno = (id)=> mascotaApi.get('/?id=' + id)

export const createMascota = (mascota)=> mascotaApi.post('/', mascota)

export const eliminarMascota = (id)=> mascotaApi.delete('/' + id)

export const actualizarMascota = (id, mascota)=> mascotaApi.put('/' + id + '/', mascota)

export const getMascota = (id)=> mascotaApi.get('/' + id)
