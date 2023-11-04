import axios from 'axios'

const medicamenotsApi = axios.create({
    baseURL: 'http://localhost:8000/veterinaria/API/Medicamentos/'
})

export const createMedicamento = (med)=> medicamenotsApi.post('/', med)

export const eliminarMedicamento = (id)=> medicamenotsApi.delete('/' + id)

export const actualizarMedicamento = (id, med)=> medicamenotsApi.put('/' + id + '/', med)

export const getMedicamentoVet = (id)=> medicamenotsApi.get('/?id=' + id)

export const getAllMedicamentos = ()=> medicamenotsApi.get()

export const getMedicamento = (id)=> medicamenotsApi.get('/' + id)