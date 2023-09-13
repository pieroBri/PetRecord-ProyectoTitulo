import React, { useEffect } from 'react'
import { AsideDueno, NaviDueno } from '../components/Navi'
import { useNavigate } from 'react-router-dom'

export function PaginaUsuario() {

  const navigate = useNavigate()

  useEffect(()=>{
    
    async function cargarVeterinarias(){

      const logged = window.localStorage.getItem("id")
      if(logged == null){
        alert("Necesita iniciar sesion")
        navigate("/")
      }
    } 

    cargarVeterinarias()
 }, [])
  

  return (
    <div className='flex min-w-full bg-gray-300'>
    
        <AsideDueno/>

        <NaviDueno/>

  </div>
  )
}

