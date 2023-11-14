import { AsideVet} from "../components/Navi"
import { Ventas } from "../components/Ventas"

export function VentasVet() {
  return (
    <div className="flex max-h-screen">
        <AsideVet/>

        <div className="w-full bg-gray-300">
          <div className="flex justify-center h-2/3">
            <Ventas/>
          </div>
        </div>
        
    </div>
  )
}
