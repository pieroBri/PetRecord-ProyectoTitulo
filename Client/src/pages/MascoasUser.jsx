import { MascotasUsuario } from "../components/MascotasUsuario"
import { AsideDueno } from '../components/Navi'



export function MascoasUser() {
  return (
    
    <div className="flex max-h-screen">
        <AsideDueno/>

        <div className="w-full bg-gray-300">
          <div className="flex justify-center h-2/3">
            <MascotasUsuario/>
          </div>
        </div>
        
    </div>
    
  )
}

