import {useForm} from 'react-hook-form'
import { getUserDueno } from '../api/usuarios/user_dueno.api'
import { useNavigate } from 'react-router-dom'
import CryptoJS from 'crypto-js';
import { createGetUserChat } from '../api/Chat.api'

export function IngresoUsuario() {
  // const [agreed, setAgreed] = useState(false)
  const navigate = useNavigate()
  const {register, handleSubmit, formState:{errors}} = useForm()
  const onSubmit = handleSubmit(async data =>{

    let res 
    try {
      res = await getUserDueno(data.rut)
    } catch (error) {
      alert("Usuario no encontrado")
    }

      const desencriptada = CryptoJS.AES.decrypt(res.data.contraseña, ":v")
      const plaintext = desencriptada.toString(CryptoJS.enc.Utf8)

      if(plaintext != data.contraseña){
        // console.log(plaintext)
        // console.log(plaintextc)
        window.alert(" Contrseña incorrecta ")
      }else{
        let conf = window.confirm("Desea mantener la sesion iniciada")
        window.localStorage.setItem("id", data.rut)
        window.localStorage.setItem("type", "user")
        document.cookie = "session=true"
        if(conf == true){
          window.localStorage.setItem("isLogged", true)
        }else{
          window.localStorage.setItem("isLogged", false)
        }

        res.data.nombres = 'dueno ' + res.data.nombres
        const respuesta = await createGetUserChat(res.data)
        // console.log(respuesta)
        window.localStorage.setItem("idChat", respuesta.data.id)
          
        if(respuesta.status == 400 || respuesta.status == 403 || respuesta.status == 500 || respuesta.status == 404){
          // console.log("ta malo")
          alert("Error en la comunicacion con el chat, vuelva a intenarlo")
        }else{
          navigate('/Home')
        }
      }

  })
  return (

    <div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8" style={{background:"#D8F3DC"}}>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-40 w-auto"
          src="https://mir-s3-cdn-cf.behance.net/project_modules/fs/e1dd5c19815449.562e0bbe27e94.png"
          alt="Your Company"
        />
        <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Iniciar sesión
        </h2>
      </div>

    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form className="space-y-6" onSubmit={onSubmit}>
        <div>
          <label htmlFor="Rut" className="block text-sm font-medium leading-6 text-gray-900">
            Rut
          </label>
          <div className="mt-2">
            <input
              type="Text"
              className="block w-full rounded-md border-0 text-center py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              {...register('rut', {required : true})}/>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
              Contraseña
            </label>
          </div>
          <div className="mt-2">
            <input
              type="password"
              className="block w-full rounded-md border-0 py-1.5 text-center text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              {...register('contraseña', {required : true})}/>
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Iniciar sesión
          </button>
        </div>
      </form>

    </div>
  </div>
    
  )
}

