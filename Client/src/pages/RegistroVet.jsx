import ChileanRutify from 'chilean-rutify';
import { useEffect, useState } from 'react'
import {useForm} from 'react-hook-form'
import { createUserVet } from '../api/usuarios/user_vet.api'
import { useNavigate } from 'react-router-dom'
import CryptoJS from 'crypto-js';
import {getAllVeterinarias} from '../api/veterinaria/veterinarias.api'


export function RegistroVet() {

  const navigate = useNavigate()
  const {register, handleSubmit, formState:{errors}} = useForm()

  const [veterinarias, setVet] = useState([])

  useEffect(()=>{
    async function cargarVeterinarias(){
     const vet = await getAllVeterinarias();
     setVet(vet.data)
    } 

    cargarVeterinarias()
 }, [])

  const onSubmit = handleSubmit(async data =>{


      console.log(data.rut)
      
      if(data.contraseña != data.password2){
        window.alert('Las contraseñas no coinciden')
      }else{
        data.contraseña = CryptoJS.AES.encrypt(data.contraseña, ":v")
        data.contraseña = data.contraseña.toString()
        // const desencriptada = CryptoJS.AES.decrypt(encriptada, ":v")
        // const plaintext = desencriptada.toString(CryptoJS.enc.Utf8)

        console.log(data.contraseña)
        let enc = CryptoJS.enc.Utf8.parse(data.rut);
        window.localStorage.setItem('id', data.rut)

        if(data.veterinaria_idveterinaria == '-1'){
          data.veterinaria_idveterinaria = ""
          data.admin = '0'
          await createUserVet(data)
          navigate('/RegistroVeterinaria/' + CryptoJS.enc.Base64.stringify(enc))    
        }else{
          data.admin = '2'
          await createUserVet(data)
          navigate('/ingresoVeterinario')    
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
              <input type="text" placeholder='Rut: XXXXXXXX-X'
              className="text-center block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              {...register('rut', {
                required : {
                  value: true,
                  message : "El campo rut es obligatorio"
                },
                
                validate: (fieldvalue)=>{
                  if(!ChileanRutify.validRut(fieldvalue)){
                    return "Este rut no existe";
                  }
                }
              }
              )}/>
              {errors.rut && <span className='text-black'>{errors.rut.message}</span>}
            </div>

            <div>
              <input type="text" placeholder='Nombre/s'
                className="block text-center w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                {...register('nombres', {required : true})}/>
                {errors.nombres && <span className='text-black'>El campo nombre/s es obligatorio</span>}
            </div>


            <div>
              <input type="text" placeholder='Apellido/s'
                className="block w-full text-center rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                {...register('apellidos', {required : true})}/>
                {errors.apellidos && <span className='text-black'>El campo apellido/s es obligatorio</span>}
            </div>

            <div>
              <input type="text" placeholder='Teléfono: 9XXXXXXXX' maxLength="9"
                className="block w-full text-center rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                {...register('telefono', {required : true})}/>
                {errors.telefono && <span className='text-black'>El campo teléfono es obligatorio</span>}
            </div>

            <div>
              <input type="text" placeholder='Dirección' 
                className="block w-full text-center rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                {...register('direccion', {required : true})}/>
                {errors.direccion && <span className='text-black'>El campo dirección es obligatorio</span>}
            </div>

            <div>
              <input type="email" placeholder='Correo'
                className="block w-full text-center rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                {...register('correo', {
                  required : {
                    value: true,
                    message: "El campo correo es obligatorio"
                  },
                  pattern : {
                    value: /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
                    message: "formato de correo invalido"
                  }
                  
                  })}/>
                {errors.correo && <span className='text-black'>{errors.correo.message}</span>}

            </div>

            <div>
                <input
                  type="password" placeholder='Contraseña'
                  className="block w-full text-center rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  {...register('contraseña', {required : true})}/>
                  {errors.contraseña && <span className='text-black'>El campo contraseña es obligatorio</span>}
            </div>

            <div>
                <input 
                type='password' placeholder='Confirmar contraseña'
                className="block w-full text-center rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                {...register('password2', {required : true})}/>
                {errors.password2 && <span className='text-black'> El campo contraseña es obligatorio</span>}
            </div>

            <div>
              <select className='bg-gray-50 text-center text-gray-900 text-sm rounded-lg block w-full p-2.5' {...register('veterinaria_idveterinaria', {required : true})}>
                <option key={-1} value="-1" defaultChecked={true} >Crear Veterinaria</option>
                {veterinarias.map(veterinaria =>(
                  <option key={veterinaria.idveterinaria}  value={veterinaria.idveterinaria}> {veterinaria.nombreveterinaria}</option>
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

