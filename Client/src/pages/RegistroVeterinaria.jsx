
import { useEffect, useState } from 'react'
import {useForm} from 'react-hook-form'
import { createVeterinaria, getAllVeterinarias } from '../api/veterinaria/veterinarias.api'
import { getUserVet, actualizarUserVet } from '../api/usuarios/user_vet.api'
import { useNavigate, useParams } from 'react-router-dom'
import CryptoJS from 'crypto-js';
import { getAllFranquicias } from '../api/veterinaria/franquicias.api'


export function RegistroVeterinaria() {

  const navigate = useNavigate()
  const {register, handleSubmit, formState:{errors}} = useForm()

  const [franquicias, setFR] = useState([])

  const [veterinarias, setVet] = useState([])

  const params = useParams()

  useEffect(()=>{
     
    async function comprobarVet(){

      
      let encrut = CryptoJS.enc.Base64.parse(params.id)
      let rut = CryptoJS.enc.Utf8.stringify(encrut).toString()
      
      try {
        await getUserVet(rut)
      } catch (error) {
        navigate("/")
      } 

    }

    comprobarVet()

    async function cargarVeterinarias(){
        const vet = await getAllVeterinarias();
        setVet(vet.data)
       } 
   
       cargarVeterinarias()

    async function cargarFranquicias(){
        const fran = await getAllFranquicias();
        setFR(fran.data)
       }
      cargarFranquicias()

    
 }, [])

  const onSubmit = handleSubmit(async data =>{

    // console.log(veterinarias)
    const avanzar = window.confirm('Esta seguro/a que desea continuar?')
    if(avanzar){
      if(veterinarias.length == 0){
        data.idveterinaria = 1;
    }else{
        const vetv = veterinarias.length
        data.idveterinaria = parseInt(veterinarias[vetv - 1].idveterinaria) + 1
    }

      console.log(data)

      let encrut = CryptoJS.enc.Base64.parse(params.id)
      let rut = CryptoJS.enc.Utf8.stringify(encrut).toString()

      let datosVet = await getUserVet(rut);
      datosVet.data.veterinaria_idveterinaria = data.idveterinaria

      if(data.franquicia_idfranquicia == "-2"){
        data.franquicia_idfranquicia = ''
        console.log(data.franquicia_idfranquicia)
        await createVeterinaria(data)
        await actualizarUserVet(rut, datosVet.data)
        
        let encid = CryptoJS.enc.Utf8.parse(data.idveterinaria);

        navigate("/registroFranquicia/" + CryptoJS.enc.Base64.stringify(encid))
      }else{
        if(data.franquicia_idfranquicia == "-1"){
          data.franquicia_idfranquicia = ''
          await createVeterinaria(data)
          await actualizarUserVet(rut, datosVet.data)

          navigate("/adminHome")
          
        }else{
          await createVeterinaria(data)
          await actualizarUserVet(rut, datosVet.data)

          navigate("/adminHome")
        }
        
      }
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
            Registro
          </h2>
        </div>

        <div className="sm:mx-auto mt-5 sm:w-full sm:max-w-sm">
          <form className="space-y-4" onSubmit={onSubmit}>
            <div>
              <input type="text" placeholder='Nombre veterinaria'
                className="block w-full text-center rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                {...register('nombreveterinaria', {required : true})}/>
                {errors.email && <span className='text-black'>Se requiere el campo</span>}

            </div>

            <div>
              <input type="text" placeholder='Dirección' 
                className="block w-full text-center rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                {...register('direccion', {required : true})}/>
                {errors.Direccion && <span className='text-black'>Se requiere el campo</span>}
            </div>

            <div>
              <select className='bg-gray-50 text-center text-gray-900 text-sm rounded-lg block w-full p-2.5' {...register('franquicia_idfranquicia', {required : true})}>
                {/* <option key={-2} value="-2" defaultChecked={true} >Independiente</option> */}
                <option key={-2} value="-2">Registrar Franquicia</option>
                <option key={-1} value="-1">Independiente</option>
                {
                franquicias.map(franquicia =>(
                  <option key={franquicia.idfranquicia} value={franquicia.idfranquicia}> {franquicia.nombrefranquicia}</option>
                ))}
              </select>
              
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

