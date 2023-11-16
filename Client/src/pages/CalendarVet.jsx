import { AsideVet} from "../components/Navi"
import { CalendarioVet } from "../components/CalendarioVet"

export function CalendarVet() {
  return (
    <div className="flex max-h-screen">
        <AsideVet/>

        <div className="w-full bg-gray-300">
          <div className="flex justify-center h-2/3">
            <CalendarioVet/>
          </div>
        </div>
        
    </div>
  )
}
