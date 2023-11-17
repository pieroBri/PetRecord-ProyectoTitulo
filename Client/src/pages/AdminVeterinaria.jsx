import { EditarClinica } from '../components/EditarClinica'
import { AsideVet } from '../components/Navi'



export function AdminVeterinaria() {

  return (
    <div className="flex max-h-screen">
        <AsideVet/>

        <div className="w-full bg-gray-300">
          <div className="flex justify-center h-2/3">
            <EditarClinica/>
          </div>
        </div>
        
    </div>
  )
}

