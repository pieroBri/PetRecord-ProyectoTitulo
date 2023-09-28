import { MascotasVet } from '../components/MascotasVet'
import { AsideVet } from '../components/Navi'



export function PaginaVeterinario() {

  return (
    <div className='flex min-w-full bg-gray-300'>
    
    <AsideVet/>

    <MascotasVet/>
  </div>
  )
}

