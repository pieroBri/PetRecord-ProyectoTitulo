import axios from 'axios'

const recetasMedApi = axios.create({
    baseURL: 'http://localhost:8000/fichamedica/API/Recetas_medicas/'
})

export const getAllRecetasMedicas = ()=> recetasMedApi.get('/')

export const createRecetaMedica = (ficha)=> recetasMedApi.post('/', ficha)

export const eliminarRecetaMedica = (id)=> recetasMedApi.delete('/' + id)

export const actualizarRecetaMedica = (id, ficha)=> recetasMedApi.put('/' + id + '/', ficha)

export const getRecetaMedica = (id)=> recetasMedApi.get('/' + id)
