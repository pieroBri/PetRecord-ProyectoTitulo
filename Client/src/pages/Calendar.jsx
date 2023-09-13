import React from 'react'
import { AsideVet, NaviVet} from "../components/Navi"
import { Calendario } from "../components/Calendario"

export function Calendar() {
  return (
    <div className="flex max-h-screen">
        <AsideVet/>

        <div className="w-full bg-gray-300">
          <NaviVet/>
          <div className="flex justify-center h-2/3">
            <Calendario/>
          </div>
        </div>
        
    </div>
  )
}
