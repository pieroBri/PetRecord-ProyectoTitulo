import { useEffect, useState } from 'react'
import { getAllFranquicias } from '../api/veterinaria/franquicias.api'
import { CardFranquicia } from './CardFranquicia'
 
export function ListaFranquicias() {

    const [franqucias, setFranquicia] = useState([])

    useEffect(()=>{
       async function cargarFranquicias(){
        const franq = await getAllFranquicias();
        setFranquicia(franq.data)
       } 

       cargarFranquicias()
    }, [])
  return (
    <div>
      {franqucias.map(franquicia =>(
        <CardFranquicia key={franquicia.idfranquicia} franquicia={franquicia}/>
        
      ))}
    </div>
  )
}

