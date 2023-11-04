import { Medicamentos } from "../components/Medicamentos"
import { AsideVet } from '../components/Navi'



export function MedicamentosVet() {
  return (
    
    <div className="flex max-h-screen">
        <AsideVet/>

        <div className="w-full bg-gray-300">
          <div className="flex justify-center h-2/3">
            <Medicamentos/>
          </div>
        </div>
        
    </div>
    
  )
}

