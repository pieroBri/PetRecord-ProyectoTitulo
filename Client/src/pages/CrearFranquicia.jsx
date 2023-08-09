
import {useEffect} from 'react'
import {useForm} from 'react-hook-form'
import { actualizarFranquicia, createFranquicia, eliminarFranquicia, getFranquicia } from '../api/veterinaria/franquicias.api'
import { useNavigate, useParams } from 'react-router-dom'


export function CrearFranquicia() {
    const {register, handleSubmit, formState:{errors}, setValue} = useForm()
    const navigate = useNavigate()
    const params = useParams()

    console.log(params)

    const onSubmit = handleSubmit(async data =>{
      if(params.id){
        await actualizarFranquicia(params.id,data)
      }else{
        await createFranquicia(data)
      }
        navigate('/franquicias')    
    })

    useEffect (()=>{
      async function  cargarFranquicia(){
      if(params.id){
        const {data} = await getFranquicia(params.id)
        setValue('idfranquicia', data.idfranquicia)
        setValue('nombrefranquicia', data.nombrefranquicia)
      }
     }

     cargarFranquicia()
    }, [])
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input type="number" placeholder="id" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
        {...register('idfranquicia', {required : true})}/> 
        {errors.idfranquicia && <span>Se requiere el campo</span>}
        <input type="text" placeholder="nombre franquicia" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
        {...register('nombrefranquicia', {required : true})}/>
        {errors.nombrefranquicia && <span>Se requiere el campo</span>}
        <button className='block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5'>guardar</button>
      </form>

      {params.id && <button onClick={async () => {
        const aceptar = window.confirm('seguro?')
        if(aceptar){
          await eliminarFranquicia(params.id)
          navigate('/franquicias')
        }
      }} className='text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm p-2.5'>Eliminar</button> }
    </div>
  )
}

