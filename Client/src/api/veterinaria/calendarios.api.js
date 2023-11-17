import axios from 'axios'

const CalendariosApi = axios.create({
    baseURL: 'http://localhost:8000/veterinaria/API/Calendarios/'
})

export const getAllCalendarios = ()=> CalendariosApi.get('/')

export const createCalendario = (calendario)=> CalendariosApi.post('/', calendario)

export const eliminarCalendario = (id)=> CalendariosApi.delete('/' + id)

export const actualizarCalendario = (id, calendario)=> CalendariosApi.put('/' + id + '/', calendario)

export const getCalendario = (id)=> CalendariosApi.get('/' + id)
