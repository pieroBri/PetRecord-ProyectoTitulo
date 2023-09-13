import React from 'react'
import { useEffect } from 'react'
import { AsideVet, NaviVet } from '../components/Navi'
import {getUserVet} from "../api/usuarios/user_vet.api"


export function PaginaVeterinario() {

  useEffect(()=>{
    async function cargarInsumos(){
      const veterinario = await getUserVet(window.localStorage.getItem('id'))
      const veterinaria = veterinario.data.veterinaria_idveterinaria

      window.localStorage.setItem('idVeterinaria', veterinaria)

    }

    cargarInsumos()

    },[])

  return (
    <div className='flex min-w-full bg-gray-300'>
    
    <AsideVet/>

    <NaviVet/>

  </div>
  )
}

