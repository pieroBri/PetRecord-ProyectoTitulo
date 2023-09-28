import { Link } from 'react-router-dom'
import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'

import { FaAngleLeft, FaRegCalendarDays, FaRegSun, FaComments, FaCircleArrowLeft, FaPrescriptionBottleMedical, FaPeopleGroup, FaSyringe, FaHospital, FaDog } from "react-icons/fa6";

export function Navi() {

  let [open, setOpen] = useState(false)

  return (
    <header className='border-b border-gray-400 py-10'>
      <div className='flex items-center justify-between xl:mx-auto max-w-full px-[8%] flex-wrap w-full'>
        
        <div className='lg:hidden block h-6 w-6 cursor-pointer text-black' onClick={() => setOpen(!open)}>a</div>

        <nav className={`${open ? "block" : "hidden"} relative w-full lg:flex lg:items-center lg:w-auto`}>
          <ul className='text-base text-gray-600 lg:flex lg:justify-between'>
            <li>
              <Link className="lg:px-5 py-2 block hover:text-green-500 font-semibold" to="">MyPetRecord</Link>
            </li>
            <li>
              <Link className="lg:px-5 py-2 block hover:text-green-500 font-semibold"  to="">Acerca de</Link>
            </li>
            <li>
              <Link className="lg:px-5 py-2 block hover:text-green-500 font-semibold" to="">Veterinarias</Link>
            </li>
            <li>
              <Link className="lg:px-5 py-2 block hover:text-green-500 font-semibold" to="">Médicos</Link>
            </li>
          </ul>
        </nav>
        
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

  const salir = () => {
    window.localStorage.removeItem("id")
    window.localStorage.removeItem("type")
    const logged = window.localStorage.getItem("isLogged")

    if(logged){
      window.localStorage.removeItem("isLogged")
    }

    navigate("/")
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
              <li className='text-black text-sm flex items-center gap-x-4'>
                <FaDog size="30px" color='#74C69D'/> 
                <p className={`${!open && 'hidden'}`}>mascotas</p>
              </li>
              <li className='text-black text-sm flex items-center gap-x-4'>
                <FaComments size="30px" color='#74C69D'/> 
                <p className={`${!open && 'hidden'}`}>chats</p>
              </li>
              <li className='text-black text-sm flex items-center gap-x-4'>
                <FaHospital size="30px" color='#74C69D'/>
                <p className={`${!open && 'hidden'}`}>veterinarias</p>
              </li>
            </ul>
          </nav>
          </div>

          <div className='absolute bottom-20 block'>
            <nav>
            <ul className='space-y-4'>
              <li className='text-black text-sm flex items-center gap-x-4'>
                <FaRegSun size="30px"/>
                <p className={`${!open && 'scale-0'} duration-300`}>Configuracion</p>
              </li>
              
              <li className='text-black text-sm flex items-center gap-x-4 cursor-pointer'  onClick={salir}>
                <FaCircleArrowLeft size="30px"/>
                <p className={`${!open && 'scale-0'} duration-300 `}>Cerrar sesion</p>
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

      const home = ()=>{
        navigate("/adminHome")
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

      const Personal = () => {
        navigate("/adminHome/insumos")
      }

      const Chats = () => {
        navigate("/adminHome/insumos")
      }
      
      return(
          
          <div className='flex '>
            <div className={`${open ? 'w-72' : 'w-20'} h-screen relative p-5 pt-8 bg-white`} >
              <div>
                <FaAngleLeft size="30px" className={`absolute cursor-pointer bg-green-100 text-black lg:visible md:visible invisible rounded-full -right-4 top-9 border-2 border-green-300 ${!open && 'rotate-180'}`} onClick={()=> setOpen(!open)}/>

                <div className='text-black flex items-center gap-x-4 cursor-pointer text-lg' onClick={home}>
                  <FaHospital size="30px" color='black'/>
                  <p className={`${!open && 'hidden'} text-black block text-xl origin-left duration-300`}>
                    MyPetRecord
                  </p>

                </div>

                <nav className='mt-5'>
                  <ul className='space-y-10'>
                    <li className='text-black flex items-center gap-x-4 cursor-pointer text-lg'>  
                      <FaPeopleGroup size="30px" color='#74C69D'/>
                      <p className={`${!open && 'hidden'} font-semibold`}>Personal</p>
                    </li> 
                    <li className='text-black flex items-center gap-x-4 cursor-pointer text-lg'>
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
                    <li className='text-black flex items-center gap-x-4 cursor-pointer text-lg'>
                      <FaPrescriptionBottleMedical size="30px" color='#74C69D'/>
                      <p className={`${!open && 'hidden'} font-semibold`}>Medicamentos</p>
                    </li>
                  </ul>
                </nav>
              </div>

              <div className='absolute bottom-20 block'>
                <nav>
                <ul className='space-y-4'>
                  <li className='text-black text-lg flex items-center gap-x-4 cursor-pointer'>
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
    
            
            
          </div>
            
        )}   