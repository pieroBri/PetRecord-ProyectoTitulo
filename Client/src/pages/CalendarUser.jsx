import { AsideDueno } from "../components/Navi"
import { CalendarioUser } from "../components/CalendarioUser"

export function CalendarUser() {
  return (
    <div className="flex max-h-screen">
        <AsideDueno/>

        <div className="w-full bg-gray-300">
          <div className="flex justify-center h-2/3">
            <CalendarioUser/>
          </div>
        </div>
        
    </div>
  )
}
