import { useState } from 'react'
import { Calendar } from 'react-calendar'
import "react-calendar/dist/Calendar.css"

export function Calendario() {

    const [value, onChange] = useState(new Date())
    const anioAct = new Date().getFullYear()
    
  return (
    <div className='grid grid-cols-2'>
        <div className='text-black'>
            {value.toString()}
        </div>
        <div className='text-black flex justify-center'>
            <Calendar value={value} onChange={onChange} minDate={new Date(anioAct-1, 0, 1)} maxDate={new Date(anioAct+1, 11, 31)}/>
            
        </div>
      
    </div>
  )
}
