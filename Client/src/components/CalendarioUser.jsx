import { useState, useEffect } from 'react'
import { Calendar } from 'react-calendar'
import { getFechasOwDate } from '../api/veterinaria/FechasSolicitadas.api'
import "react-calendar/dist/Calendar.css"

export function Calendario() {

    const [date, onChangeDate] = useState(new Date())
    const anioAct = new Date().getFullYear()
    const userId = window.localStorage.getItem("id")
    const [found, setFound] = useState(true)

    const [citas, setCitas] = useState([])

    // OBTENER-MOSTRAR CITAS

    useEffect(()=>{
      async function cargarCitas(){
        let fechaHoy
        if((parseInt(date.getMonth())+1) < 10){
          fechaHoy = date.getFullYear() + '-' + '0'+(parseInt(date.getMonth())+1).toString() + '-'+ (parseInt(date.getDate())).toString()
        }else{
          fechaHoy = date.getFullYear() + '-' + (parseInt(date.getMonth())+1).toString() + '-'+ (parseInt(date.getDate())).toString()
        }

        
        let fechas = await getFechasOwDate(userId, fechaHoy)
        
        if(fechas.data.length){
          for(let i = 0; i<fechas.data.length; i++){
            let dateIniMod = fechas.data[i].fechainicial
            let dateFinMod = fechas.data[i].fechafinal

            let arrayIni = dateIniMod.split('T');
            let arrayFin = dateFinMod.split('T');

            fechas.data[i].fechainicial= arrayIni[1].substring(0, arrayIni[1].length - 4)
            fechas.data[i].fechafinal= arrayFin[1].substring(0, arrayFin[1].length - 4)

          }
          setCitas(fechas.data)
          setFound(true)
        } else {
          setFound(false)
        }
      }
  
      cargarCitas()
  
      },[])


      const onChange = async fecha =>{
        onChangeDate(fecha)

        let fechaCita
        if((parseInt(fecha.getMonth())+1) < 10){
          fechaCita = fecha.getFullYear() + '-' + '0'+(parseInt(fecha.getMonth())+1).toString() + '-'+ (parseInt(fecha.getDate())).toString()
        }else{
          fechaCita = fecha.getFullYear() + '-' +(parseInt(fecha.getMonth())+1).toString() + '-'+ (parseInt(fecha.getDate())).toString()
        }

        console.log(fechaCita)

        let citasDia = await getFechasOwDate(userId, fechaCita)
        console.log(citasDia.data)

        for(let i = 0; i<citasDia.data.length; i++){
          let dateIniMod = citasDia.data[i].fechainicial
          let dateFinMod = citasDia.data[i].fechafinal

          let arrayIni = dateIniMod.split('T');
          let arrayFin = dateFinMod.split('T');

          citasDia.data[i].fechainicial= arrayIni[1].substring(0, arrayIni[1].length - 4)
          citasDia.data[i].fechafinal= arrayFin[1].substring(0, arrayFin[1].length - 4)

        }

        if(citasDia.data.length > 0) {
          setCitas(citasDia.data)
          setFound(true)
        } else{
          setFound(false)
        }

      }
      // FIN OBTENER-MOSTRAR 


  return (
    <div className='lg:mt-10'>
        <div className='text-black flex justify-center container-sm'>
            <Calendar value={date} onChange={onChange} minDate={new Date(anioAct-1, 0, 1)} maxDate={new Date(anioAct+1, 11, 31)} className="bg-green-200"/>
        </div>
          {found ? (
            <div className='text-black lg:mt-10 mt-5 max-h-72 overflow-y-auto'>
              <table className='w-full'>
                <thead>
                  <tr className='bg-white border border-black'>
                    <th className='lg:px-4 py-2 px-1 border-r border-black'>Cita</th>
                  </tr>
                </thead>
                <tbody className='text-center bg-gray-100'>
                {citas && citas.map(cita => 
                  <tr className='border bg-grey-300 border-black' key={cita.idfechascalendario}>
                    <td className='text-left'>
                      Mascota: {cita.nombremascota} <br/>Hora inicio: {cita.fechainicial} <br/>Hora fin: {cita.fechafinal}<br/>Número de contacto: {cita.numerodecontacto}
                    </td>
                  </tr>
                )}
                </tbody>
              </table>
            </div>): (
            <>
              <div className='text-black lg:mt-10 mt-5 max-h-72'>
                <div className="flex justify-center">
                  <p className='tetx-2xl font-semibold'>No se han encontrado citas para esta fecha</p>
                </div>
                <div className="flex justify-center">
                </div>
              </div>
            </>)}
        </div>
  )
}
