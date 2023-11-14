import { Link } from 'react-router-dom'
import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import {actualizarUserVet, getUserVet} from "../api/usuarios/user_vet.api"
import CryptoJS from 'crypto-js';
import { FaAngleLeft, FaAlignJustify, FaRegCalendarDays, FaDollarSign, FaRegSun, FaComments, FaCircleArrowLeft, FaPrescriptionBottleMedical, FaPeopleGroup, FaSyringe, FaHospital, FaDog } from "react-icons/fa6";

export function Navi() {

  let [open, setOpen] = useState(false)

  return (
    <header className='border-b border-gray-400 py-10'>
      <div className='flex items-center lg:justify-center xl:mx-auto max-w-full px-[8%] flex-wrap w-full'>
        
        <div className='lg:hidden block h-6 w-6 cursor-pointer text-black' onClick={() => setOpen(!open)}><FaAlignJustify/></div>
        
        <nav className={`${open ? "block" : "hidden"} w-full relative lg:flex lg:items-center lg:w-auto`}>
          <ul className='lg:flex lg:justify-between'>
            <li>
              <Link className="block lg:px-5 lg:mx-5 py-3 text-center bg-green-200 hover:bg-green-500 rounded-xl text-black font-semibold" to="/ingresoUsuario">Acceder como usuario</Link>
            </li>
            <li>
              <Link className="block lg:px-5 py-3 bg-green-700 text-white text-center hover:bg-green-500 rounded-xl font-semibold" to="/ingresoVeterinario">Acceder como veterinario</Link>
            </li>
          </ul>
        </nav>
        
      </div>
    </header>
  )
}

export function NaviDueno(){


  return(
      <div className='py-10 w-full h-1 flex justify-center items-center'>
          <div className=''>
            <input type="text" placeholder="buscar veterinaria" style={{background:"#D8F3DC"}}
            className="text-center block rounded-md w-64 border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
          </div>
        </div>
    )}

export function AsideDueno(){

  let [open, setOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(()=>{
    function carga(){
    
  
      const log = window.localStorage.getItem("isLogged")
  
      const sesion = document.cookie.split(';').find((row) => row == " session=true")
      
      console.log(sesion)
      if(sesion == null){
        console.log("a")
        if(log == "false" || log == null){
          window.localStorage.removeItem("isLogged")
          window.localStorage.removeItem("id")
          window.localStorage.removeItem("type")
          console.log("epico epicoooo")

          navigate("/")
        }
      }
        
    }
    carga()
  },[])

  const salir = () => {
    window.localStorage.removeItem("id")
    window.localStorage.removeItem("type")
    const logged = window.localStorage.getItem("isLogged")

    if(logged){
      window.localStorage.removeItem("isLogged")
    }

    navigate("/")
  }

  const home = () => {
    navigate("/Home")
  }

  const chat = () => {
    navigate("/Home/chat")
  }

  const calendario = () => {
    navigate("/Home/Calendario")
  }

  return(
      
      <div className='flex'>
        <div className={`${open ? 'w-72' : 'w-20'} h-screen relative p-5 pt-8 bg-white`}>
          <div>
          <FaAngleLeft size="30px" className={`absolute cursor-pointer bg-green-100 text-black lg:visible md:visible invisible rounded-full -right-4 top-9 border-2 border-green-300 ${!open && 'rotate-180'}`} onClick={()=> setOpen(!open)}/>
          
          <div className='flex gap-x-4 items-center'>
            <FaHospital size="30px" color='black'/>
            <p className={`${!open && 'hidden'} text-black block text-xl origin-left duration-300`}>
              MyPetRecord
            </p>
          </div>
          
          <nav className='mt-5'>
            <ul className='space-y-10'>
              <li className='text-black text-lg flex items-center cursor-pointer gap-x-4' onClick={home}>
                <FaDog size="30px" color='#74C69D'/> 
                <p className={`${!open && 'hidden'} font-semibold`} >Mascotas</p>
              </li>
              <li className='text-black flex items-center gap-x-4 cursor-pointer text-lg' onClick={chat}>
                <FaComments size="30px" color='#74C69D'/> 
                <p className={`${!open && 'hidden'} font-semibold`}>Chats</p>
              </li>
              <li className='text-black flex items-center gap-x-4 cursor-pointer text-lg'>
                <FaHospital size="30px" color='#74C69D'/>
                <p className={`${!open && 'hidden'} font-semibold`}>Veterinarias</p>
              </li>
              <li className='text-black flex items-center gap-x-4 cursor-pointer text-lg' onClick={calendario}>
                <FaRegCalendarDays size="30px" color='#74C69D'/>
                <p className={`${!open && 'hidden'} font-semibold`}>Calendario</p>
              </li>
            </ul>
          </nav>
          </div>

          <div className='absolute bottom-20 block'>
            <nav>
            <ul className='space-y-4'>
              <li className='text-black text-lg flex items-center gap-x-4 cursor-pointer'>
                <FaRegSun size="30px"/>
                <p className={`${!open && 'hidden'} font-semibold`}>Configuracion</p>
              </li>
              
              <li className='text-black text-lg flex items-center gap-x-4 cursor-pointer'  onClick={salir}>
                <FaCircleArrowLeft size="30px"/>
                <p className={`${!open && 'hidden'} font-semibold`}>Cerrar sesion</p>
              </li>
            </ul>
            </nav>
          </div>
        </div>
  
      </div>
        
    )}



    export function AsideVet(){

      let [open, setOpen] = useState(false)
      const navigate = useNavigate()
      const {register, handleSubmit, formState:{errors}} = useForm()

      const [vet, setVet] = useState()
      const [admin, setAdmin] = useState()
      const [modalEditarVet, showModalEditarVet] = useState(false)

      useEffect(()=>{
        async function cargarVet(){
          const veterinario = await getUserVet(window.localStorage.getItem('id'))
    
          setVet(veterinario.data)
          if(veterinario.data.admin == '0'){
            setAdmin(true)
          }

        }


        function carga(){
    
  
          const log = window.localStorage.getItem("isLogged")
      
          const sesion = document.cookie.split(';').find((row) => row == "session=true")
          
          console.log(sesion)
          if(sesion == null){
            console.log("a")
            if(log == "false" || log == null){
              window.localStorage.removeItem("isLogged")
              window.localStorage.removeItem("id")
              window.localStorage.removeItem("idVeterinaria")
              window.localStorage.removeItem("type")
              console.log("epico epicoooo")
    
              navigate("/")
            }
          }
            
        }
        carga()
    
        cargarVet()
        },[])

      
        

      const salir = () => {
        window.localStorage.removeItem("id")
        window.localStorage.removeItem("idVeterinaria")
        window.localStorage.removeItem("type")
        const logged = window.localStorage.getItem("isLogged")
    
        if(logged){
          window.localStorage.removeItem("isLogged")
        }
    
        navigate("/")
      }

      const editarVet = () => {
        // DESENCRIPTAR LA CONTRA PARA PODER EDITAR LA MISMA
        
        const desencriptada = CryptoJS.AES.decrypt(vet.contraseña, ":v")
        const plaintext = desencriptada.toString(CryptoJS.enc.Utf8)

        vet.contraseñaDes = plaintext

        showModalEditarVet(true)
      
      }

      const onSubmitEditar = handleSubmit(async data =>{

        console.log(data)

        if(data.contraseña != data.contraseña2){
          window.alert("las contraseñas no coinciden")
        }else{
          data.contraseña = CryptoJS.AES.encrypt(data.contraseña, ":v")
          data.contraseña = data.contraseña.toString()

          await actualizarUserVet(vet.rut, data)
          showModalEditarVet(false)
        }


      })

      const home = ()=>{
        navigate("/adminHome/Mascotas")
      }
      const insumos = () => {
        navigate("/adminHome/insumos")
      }

      const calendario = () => {
        navigate("/adminHome/Calendario")
      }

      const medicamentos = () => {
        navigate("/adminHome/Medicamentos")
      }

      const Admin = () => {
        navigate("/adminHome")
      }

      const chat = () => {
        navigate("/adminHome/chat")
      }

      const ventas = () => {
        navigate("/adminHome/Ventas")
      }
      
      return(
          
          <div className='flex '>
            <div className={`${open ? 'w-72' : 'w-20'} h-screen relative p-5 pt-8 bg-white`} >
              <div>
                <FaAngleLeft size="30px" className={`absolute cursor-pointer bg-green-100 text-black lg:visible md:visible invisible rounded-full -right-4 top-9 border-2 border-green-300 ${!open && 'rotate-180'}`} onClick={()=> setOpen(!open)}/>

                {admin ? (
                  <div className='text-black flex items-center gap-x-4 cursor-pointer text-lg' onClick={Admin}>
                  <FaHospital size="30px" color='black'/>
                  <p className={`${!open && 'hidden'} text-black block text-xl origin-left duration-300`}>
                    MyPetRecord
                  </p>

                </div>
                ) : null}
                

                <nav className='mt-5'>
                  <ul className='space-y-10'>
                    <li className='text-black flex items-center gap-x-4 cursor-pointer text-lg' onClick={home}>  
                      <FaDog size="30px" color='#74C69D'/>
                      <p className={`${!open && 'hidden'} font-semibold`}>Mascotas</p>
                    </li> 
                    <li className='text-black flex items-center gap-x-4 cursor-pointer text-lg' onClick={chat}>
                      <FaComments size="30px" color='#74C69D'/>
                      <p className={`${!open && 'hidden'} font-semibold`}>Chats</p>
                    </li>
                    <li className='text-black flex items-center gap-x-4 cursor-pointer text-lg' onClick={calendario}>
                      <FaRegCalendarDays size="30px" color='#74C69D'/>
                      <p className={`${!open && 'hidden'} font-semibold`}>Calendario</p>
                    </li>
                    <li className='text-black flex items-center gap-x-4 cursor-pointer text-lg' onClick={insumos}>
                      <FaSyringe size="30px" color='#74C69D'/>
                      <p className={`${!open && 'hidden'} font-semibold`}>Insumos</p>
                    </li>
                    <li className='text-black flex items-center gap-x-4 cursor-pointer text-lg' onClick={medicamentos}>
                      <FaPrescriptionBottleMedical size="30px" color='#74C69D'/>
                      <p className={`${!open && 'hidden'} font-semibold`}>Medicamentos</p>
                    </li>
                    <li className='text-black flex items-center gap-x-4 cursor-pointer text-lg' onClick={ventas}>
                      <FaDollarSign size="30px" color='#74C69D'/>
                      <p className={`${!open && 'hidden'} font-semibold`}>Medicamentos</p>
                    </li>
                  </ul>
                </nav>
              </div>

              <div className='absolute bottom-20 block'>
                <nav>
                <ul className='space-y-4'>
                  <li className='text-black text-lg flex items-center gap-x-4 cursor-pointer' onClick={()=>editarVet()}>
                    <FaRegSun size="30px"/>
                    <p className={`${!open && 'hidden'}`}>Configuracion</p>
                  </li>

                  <li className='text-black text-lg flex items-center gap-x-4 cursor-pointer' onClick={salir}>
                    <FaCircleArrowLeft size="30px"/>
                    <p className={`${!open && 'hidden'}`} >Cerrar sesion</p>
                  </li>
                </ul>
                </nav>
              </div>


            </div>
    
      {modalEditarVet ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl text-black font-semibold">
                    {vet.nombres} {vet.apellidos}
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => showModalEditarVet(false)}
                  >
                    <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <form onSubmit={onSubmitEditar} className='space-y-5'>

                    <input type="hidden" {...register('rut', {value : vet.rut})}/>
                    <input type="hidden" {...register('admin', {value : vet.admin})}/>
                    <input type="hidden" {...register('contratado', {value : vet.contratado})}/>

                    <div>
                      <input type="text" required defaultValue={vet.nombres}
                        className="block text-center w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        {...register('nombres', {required : true})}/>
                    </div>

                    <div>
                      <input type="text" required defaultValue={vet.apellidos}
                        className="block text-center w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        {...register('apellidos', {required : true})}/>
                    </div>

                    <div>
                        <input type="text" required defaultValue={vet.telefono}
                        className="block text-center w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        {...register('telefono', {required : true})}/>
                    </div>

                    <div>
                        <input type="text" required defaultValue={vet.direccion}
                        className="block text-center w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        {...register('direccion', {required : true})}/>
                    </div>

                    <div>
                      <input type="email" defaultValue={vet.correo}
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
                        <input type="password" required defaultValue={vet.contraseñaDes}
                        className="block text-center w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        {...register('contraseña', {required : true})}/>
                    </div>

                    <div>
                        <input type="password" required defaultValue={vet.contraseñaDes}
                        className="block text-center w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        {...register('contraseña2', {required : true})}/>
                    </div>

                    <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                      <button
                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => showModalEditarVet(false)}
                      >
                        Cancelar
                      </button>
                      <button
                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="submit"
                      >
                        Editar
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
            
          </div>
            
        )}   