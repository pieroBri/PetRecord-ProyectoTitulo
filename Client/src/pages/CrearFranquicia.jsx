
import {useEffect, useState} from 'react'
import {useForm} from 'react-hook-form'
import { createFranquicia, getAllFranquicias } from '../api/veterinaria/franquicias.api'
import { getVeterinaria, actualizarVeterinaria } from '../api/veterinaria/veterinarias.api'
import { useNavigate, useParams } from 'react-router-dom'
import CryptoJS from 'crypto-js';

export function CrearFranquicia() {
    const {register, handleSubmit, formState:{errors}, setValue} = useForm()
    const navigate = useNavigate()
    const params = useParams()

    const [franquicias, setFR] = useState([])

    useEffect (()=>{
      async function cargarFranquicias(){
        const fran = await getAllFranquicias();
        setFR(fran.data)
       }
    cargarFranquicias()

       async function verificarVeterinaria(){

        let encid = CryptoJS.enc.Base64.parse(params.id)
        let idVet = CryptoJS.enc.Utf8.stringify(encid).toString()
        
        try {
          await getVeterinaria(idVet)
        } catch (error) {
          navigate("/")
        } 

       }

       verificarVeterinaria()
    }, [])


    const onSubmit = handleSubmit(async data =>{
      const avanzar = window.confirm('Esta seguro/a que desea continuar?')
      if(avanzar){
        if(franquicias.length == 0){
          data.idfranquicia = 1;
        }else{
            const franl = franquicias.length
            data.idfranquicia = Number(franquicias[franl - 1].idfranquicia) + 1
        }   
  
        await createFranquicia(data)
  
        let encid = CryptoJS.enc.Base64.parse(params.id)
        let idVet = CryptoJS.enc.Utf8.stringify(encid).toString()
  
        let datosVeterinaria = await getVeterinaria(idVet);
        datosVeterinaria.data.franquicia_idfranquicia = data.idfranquicia
        // console.log(datos.data.veterinaria_idveterinaria)
        await actualizarVeterinaria(idVet, datosVeterinaria.data)
        navigate("/adminHome");
      }
      
    })

    
  return (
    <div> 
      <div className="flex min-h-screen flex-1 flex-col justify-center" style={{background:"#D8F3DC"}}>
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-40 w-auto"
            src="https://mir-s3-cdn-cf.behance.net/project_modules/fs/e1dd5c19815449.562e0bbe27e94.png"
            alt="Your Company"
          />
          <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Registro Franquicia
          </h2>
        </div>

        <div className="sm:mx-auto mt-5 sm:w-full sm:max-w-sm">
          <form className="space-y-4" onSubmit={onSubmit}>
            <div>
              <input type="text" placeholder='Nombre franquicia'
                className="block w-full text-center rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                {...register('nombrefranquicia', {required : true})}/>
                {errors.email && <span className='text-black'>El campo nombre es obligatorio</span>}

            </div>
              
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Registrarse
              </button>
            </div>
          </form>
        </div>
      </div>

    </div>
  )
}

