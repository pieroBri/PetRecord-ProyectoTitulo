import { useState, useEffect } from 'react'
import { Calendar } from 'react-calendar'
import { actualizarFecha, createFecha, eliminarFecha, getAllFechas, getFecha, getFechasVetDate } from '../api/veterinaria/FechasSolicitadas.api'
import "react-calendar/dist/Calendar.css"
import {FaPlus, FaPencil, FaRegTrashCan} from 'react-icons/fa6'
import { useForm } from 'react-hook-form'

export function Calendario() {

    const [date, onChangeDate] = useState(new Date())
    const anioAct = new Date().getFullYear()
    const vetId = window.localStorage.getItem("id")
    const [found, setFound] = useState(true)
    const [showModalAnadir, setAnadir] = useState(false)
    const [showModalEditar, setEditar] = useState(false)
    const [dateStr, setDateStr] = useState ()                  

    const [citas, setCitas] = useState([])
    const [citaEdit, setCitaEdit] = useState()

    const {register, reset, handleSubmit, formState:{errors}} = useForm()

    const idVeterinaria = window.localStorage.getItem("idVeterinaria")
    // OBTENER-MOSTRAR CITAS

    useEffect(()=>{
      async function cargarCitas(){
        let fechaHoy
        if((parseInt(date.getMonth())+1) < 10){
          fechaHoy = date.getFullYear() + '-' + '0'+(parseInt(date.getMonth())+1).toString() + '-'+ (parseInt(date.getDate())).toString()
        }else{
          fechaHoy = date.getFullYear() + '-' + (parseInt(date.getMonth())+1).toString() + '-'+ (parseInt(date.getDate())).toString()
        }

        setDateStr(fechaHoy)
        
        let fechas = await getFechasVetDate(vetId, fechaHoy)
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

        setDateStr(fechaCita)
        console.log(fechaCita)

        let citasDia = await getFechasVetDate(vetId, fechaCita)
        console.log(citasDia.data.length)

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


      // CRUD CITAS  

      const onSubmitAnadir = handleSubmit(async dataForm =>{
        
      
        let citasTotales = await getAllFechas()

        if(citasTotales.data.length > 0){
          dataForm.idfechascalendario = parseInt(citasTotales.data[citasTotales.data.length -1].idfechascalendario) + 1
        }else{
          dataForm.idfechascalendario = 0
        }

        dataForm.fechainicial = dataForm.crearFechaInicial
        dataForm.fechafinal = dataForm.crearFechaFinal
        dataForm.rutVet = vetId
        dataForm.veterinaria_idveterinaria = idVeterinaria

        console.log(dataForm)

        await createFecha(dataForm)

        let citasDia = await getFechasVetDate(vetId, dateStr)

        for(let i = 0; i<citasDia.data.length; i++){
          let dateIniMod = citasDia.data[i].fechainicial
          let dateFinMod = citasDia.data[i].fechafinal

          let arrayIni = dateIniMod.split('T');
          let arrayFin = dateFinMod.split('T');

          citasDia.data[i].fechainicial= arrayIni[1].substring(0, arrayIni[1].length - 4)
          citasDia.data[i].fechafinal= arrayFin[1].substring(0, arrayFin[1].length - 4)

        }

        console.log(citasDia)
        setCitas(citasDia.data)
        setAnadir(false)

        reset()

      })

      const eliminarCita = async (id)=>{
        
        const fecha = await getFecha(id);
        
        let dateIniMod = fecha.data.fechainicial
        let dateFinMod = fecha.data.fechafinal
        let arrayIni = dateIniMod.split('T');
        let arrayFin = dateFinMod.split('T');
        fecha.data.fechainicial= arrayIni[1].substring(0, arrayIni[1].length - 4)
        fecha.data.fechafinal= arrayFin[1].substring(0, arrayFin[1].length - 4)

        let res = window.confirm(`Esta seguro que desea eliminar la cita de las ${fecha.data.fechainicial} con la mascota ${fecha.data.nombremascota}`)
        let citas
        if(res == true){
          await eliminarFecha(id)
          citas = await getFechasVetDate(vetId, dateStr)
          setCitas(citas.data)
        }

      }
    
      const editarCita = async (cita)=>{
        const citaEdit = await getFecha(cita)

        setCitaEdit(citaEdit.data)
        
        reset()
        setEditar(true)
      }

      const onsubmitEditar = handleSubmit (async dataForm=>{

        dataForm.idfechascalendario = citaEdit.idfechascalendario

        dataForm.rutVet = vetId
        dataForm.veterinaria_idveterinaria = idVeterinaria

        console.log(dataForm)

        dataForm.fechainicial = dataForm.editarFechaInicial
        dataForm.fechafinal = dataForm.editarFechaFinal
        dataForm.nombremascota = dataForm.editarnombremascota
        dataForm.rutDueno = dataForm.editarrutDueno
        dataForm.numerodecontacto = dataForm.editarnumerodecontacto

        await actualizarFecha(dataForm.idfechascalendario, dataForm)

        setEditar(false)

        let citasDia = await getFechasVetDate(vetId, dateStr)
        console.log(citasDia.data.length)

        for(let i = 0; i<citasDia.data.length; i++){
          let dateIniMod = citasDia.data[i].fechainicial
          let dateFinMod = citasDia.data[i].fechafinal

          let arrayIni = dateIniMod.split('T');
          let arrayFin = dateFinMod.split('T');

          citasDia.data[i].fechainicial= arrayIni[1].substring(0, arrayIni[1].length - 4)
          citasDia.data[i].fechafinal= arrayFin[1].substring(0, arrayFin[1].length - 4)

        }
        setCitas(citasDia.data)
        setFound(true)
        reset()

      })
      // FIN CRUD


  return (
    <div className='lg:mt-10'>
        <div className='text-black flex justify-center container-sm'>
            <Calendar value={date} onChange={onChange} minDate={new Date(anioAct-1, 0, 1)} maxDate={new Date(anioAct+1, 11, 31)} className="bg-green-200"/>
        </div>
          {found ? (
            <div className='text-black lg:mt-10 mt-5 max-h-72 overflow-y-scroll'>
              <table className='w-full'>
                <thead>
                  <tr className='bg-white border border-black'>
                    <th className='lg:px-4 py-2 px-1 border-r border-black'>Cita</th>
                    <th className='lg:px-4 py-4 px-1 cursor-pointer bg-gray-200 hover:bg-gray-300 flex justify-center' onClick={() => setAnadir(true)}><FaPlus/></th>
                  </tr>
                </thead>
                <tbody className='text-center bg-gray-100'>
                {citas && citas.map(cita => 
                  <tr className='border bg-grey-300 border-black' key={cita.idfechascalendario}>
                    <td className='text-left'>
                      Mascota: {cita.nombremascota} <br/>Hora inicio: {cita.fechainicial} <br/>Hora fin: {cita.fechafinal}<br/>Número de contacto: {cita.numerodecontacto}
                    </td>
                    <td className='border-l border-black'>
                      <div className='flex space-x-5 justify-center'>
                        <FaPencil onClick={() => editarCita(cita.idfechascalendario)} size="20px" color='blue' className="cursor-pointer"/>
                        <FaRegTrashCan onClick={() => eliminarCita(cita.idfechascalendario)} size="20px" color='red' className="cursor-pointer"/>
                      </div>
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
                  <button className='rounded-xl border-2 mt-2 border-black p-1 bg-green-200 hover:bg-green-300' onClick={()=>setAnadir(true)}> 
                    Crear cita
                  </button>
                </div>
              </div>
            </>)}
              
          {showModalAnadir ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl text-black font-semibold">
                    Crear cita
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setAnadir(false)}
                  >
                    <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <form onSubmit={onSubmitAnadir} className='space-y-5'>

                    <div>
                      <label className='text-black'>Fecha inicial</label>
                      <input type="datetime-local" required defaultValue={dateStr +'T12:00:00'} min={dateStr +'T00:00:00'}
                        className="block text-center w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        {...register('crearFechaInicial', {required : true})}/>
                    </div>

                    <div>
                      <label className='text-black'>Fecha Final</label>
                      <input type="datetime-local" required defaultValue={dateStr +'T12:00:00'} min={dateStr +'T00:00:00'}
                        className="block text-center w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        {...register('crearFechaFinal', {required : true})}/>
                    </div>

                    <div>
                      <label className='text-black'>Rut dueño</label>
                      <input type="text" required
                        className="block text-center w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        {...register('rutDueno', {required : true})}/>
                    </div>

                    <div>
                      <label className='text-black'>Nombre Mascota</label>
                      <input type="text" required
                        className="block text-center w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        {...register('nombremascota', {required : true})}/>
                    </div>

                    <div>
                      <label className='text-black'>Numero contacto</label>
                      <input type="text" required placeholder='+569XXXXXXXX' maxLength="12"
                        className="block text-center w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        {...register('numerodecontacto', {required : true})}/>
                    </div>


                    <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                      <button
                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => setAnadir(false)}
                      >
                        Cancelar
                      </button>
                      <button
                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type='submit'
                      >
                        Agregar
                      </button>
                    </div>

                  </form>
                </div>
                
                
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}

      {showModalEditar ? (
        <>
        <div
          className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
        >
          <div className="relative w-auto my-6 mx-auto max-w-3xl">
            {/*content*/}
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              {/*header*/}
              <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                <h3 className="text-3xl text-black font-semibold">
                  Editar cita
                </h3>
                <button
                  className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={() => setEditar(false)}
                >
                  <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                    ×
                  </span>
                </button>
              </div>
              {/*body*/}
              <div className="relative p-6 flex-auto">
                <form onSubmit={onsubmitEditar} className='space-y-5'>
                  
                  <input type="hidden" value={citaEdit.idfechascalendario} {...register('idfechascalendario')}/>
                  <div>
                      <label className='text-black'>Fecha inicial</label>
                      <input type="datetime-local" required defaultValue={dateStr +'T12:00:00'} min={dateStr +'T00:00:00'}
                        className="block text-center w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        {...register('editarFechaInicial', {required : true})}/>
                    </div>

                    <div>
                      <label className='text-black'>Fecha inicial</label>
                      <input type="datetime-local" required defaultValue={dateStr +'T12:00:00'} min={dateStr +'T00:00:00'}
                        className="block text-center w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        {...register('editarFechaFinal', {required : true})}/>
                    </div>

                  <div>
                    <label className='text-black'>Rut dueño</label>
                    <input type="text" required defaultValue={citaEdit.rutDueno}
                      className="block text-center w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      {...register('editarrutDueno', {required : true})}/>
                  </div>

                  <div>
                    <label className='text-black'>Nombre Mascota</label>
                    <input type="text" required defaultValue={citaEdit.nombremascota}
                      className="block text-center w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      {...register('editarnombremascota', {required : true})}/>
                  </div>

                  <div>
                    <label className='text-black'>Numero contacto</label>
                    <input type="text" required placeholder='+569XXXXXXXX' maxLength="12" defaultValue={citaEdit.numerodecontacto}
                      className="block text-center w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      {...register('editarnumerodecontacto', {required : true})}/>
                  </div>


                  <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setEditar(false)}
                    >
                      Cancelar
                    </button>
                    <button
                      className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type='submit'
                    >
                      Editar
                    </button>
                  </div>

                </form>
              </div>
              
              
            </div>
          </div>
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
      </>
      ) : null}
            
        </div>
  )
}
