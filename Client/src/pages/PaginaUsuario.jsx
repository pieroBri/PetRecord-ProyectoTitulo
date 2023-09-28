import React, { useEffect } from 'react'
import { AsideDueno, NaviDueno } from '../components/Navi'
import { useNavigate } from 'react-router-dom'
import { MascotasUsuario } from "../components/MascotasUsuario"

export function PaginaUsuario() {

  const navigate = useNavigate()

  useEffect(()=>{
    
    async function verify(){

      const logged = window.localStorage.getItem("id")
      if(logged == null){
        alert("Necesita iniciar sesion")
        navigate("/")
      }
    } 

    verify()
 }, [])
  

  return (
    <div className="flex max-h-screen">
        <AsideDueno/>

        <div className="w-full bg-gray-300">
          <NaviDueno/>
          <div className="flex justify-center h-2/3">
            <MascotasUsuario/>
          </div>
        </div>
        
    </div>
  )
}

