import { Insumos } from "../components/Insumos"
import { AsideVet } from '../components/Navi'



export function InsumosVet() {
  return (
    
    <div className="flex max-h-screen">
        <AsideVet/>

        <div className="w-full bg-gray-300">
          <div className="flex justify-center h-2/3">
            <Insumos/>
          </div>
        </div>
        
    </div>
    
  )
}

