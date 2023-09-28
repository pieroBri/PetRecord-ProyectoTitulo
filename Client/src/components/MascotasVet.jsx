import { useState, useEffect } from 'react'
import {getUserVet} from "../api/usuarios/user_vet.api"
import {createMascota, getMascota} from '../api/mascota/mascotas.api'
import { getUserDueno } from '../api/usuarios/user_dueno.api'
import { useForm } from 'react-hook-form'
import {FaDog} from 'react-icons/fa6'
import { getAlergiasMascota, createAlergia, getAlergia, eliminarAlergia, actualizarAlergia } from '../api/mascota/alergias.api'
import {tab} from '@preline/tabs'
import {FaPlus, FaPencil, FaRegTrashCan} from 'react-icons/fa6'



export function MascotasVet() {
  const [found, setFound] = useState()
  const [mascota, setMascota] = useState()
  const [dueno, setDueno] = useState()
  const [mascotaBuscada, setMascotaBuscada] = useState()
  const [alergias, setAlergias] = useState([])
  const [alergia, setAlergia] = useState()


  const [showModalAnadir, setShowModalAnadir]= useState(false)

  const [showModalAnadirAlergia, setShowModalAnadirAlergia]= useState(false)
  const [showModalEditarAlergia, setShowModalEditarAlergia]= useState(false)

  const [showModalFicha, setShowModalFicha]= useState(false)

  const {register, handleSubmit, formState:{errors}} = useForm()


  useEffect(()=>{
    async function cargarVet(){
      const veterinario = await getUserVet(window.localStorage.getItem('id'))
      const veterinaria = veterinario.data.veterinaria_idveterinaria

      window.localStorage.setItem('idVeterinaria', veterinaria)

    }

    cargarVet()

    },[])


    const buscarMascota = async() => {

      const idMascota = document.getElementById("mascota").value
      let pet 
      let owner
      let alergiasList
      setMascotaBuscada(idMascota)
      if(idMascota.length > 0){
        try {
          pet = await getMascota(idMascota)
          console.log(pet.data.usuariodueño_rut)
          setMascota(pet)
          owner = await getUserDueno(pet.data.usuariodueño_rut)
          setDueno(owner)
          setFound(true)
        } catch (error) {
          setFound(false)
        }

        try {
          alergiasList = await getAlergiasMascota(idMascota)
          console.log(alergiasList)
          setAlergias(alergiasList.data)
        } catch (error) {
          alergiasList = await getAlergiasMascota(idMascota)
          console.log(alergiasList)
        }
      }else{
        setFound(null)
      }
      
    }

    const onSubmitAnadir = handleSubmit(async data =>{

      console.log(data)

      const fecha = new Date(data.FechaDeNacimiento + 'T17:00:00').toLocaleString()
      const fechaFinal = fecha.split(',')
      

      data.FechaDeNacimiento = fechaFinal[0]
      console.log(data)
      const res = await createMascota(data)
      console.log(res)
      setShowModalAnadir(false)
  
      let pet = await getMascota(data.idmascota)
      let owner = await getUserDueno(data.usuariodueño_rut)

      setMascota(pet)
      setDueno(owner)
      setFound(true)
    })

// ------------------------------- ALERGIAS -----------------------------------------------------------------------

    const onSubmitAnadirAlergia = handleSubmit(async data =>{

      if(alergias.length == 0){
        data.idalergias = 0
      }else{
        console.log(parseInt(alergias[alergias.length - 1].idalergias))
        data.idalergias = parseInt(alergias[alergias.length - 1].idalergias) + 1;
      }

      const res = await createAlergia(data)
      console.log(res)
      setShowModalAnadirAlergia(false)
  
      location.reload()
    })
    

    async function deleteAlergia(id){

      const alergiaEliminar = await getAlergia(id);
      let res = window.confirm(`Esta seguro que desea eliminar ${alergiaEliminar.data.nombrealergia}`)
      if(res){
        await eliminarAlergia(id)
        location.reload()
      }
    }

    async function editarAlergia(id){
      const alergiaEditar = await getAlergia(id);
  
      setAlergia(alergiaEditar)
      setShowModalEditarAlergia(true)
    }

    const onSubmitEditarAlergia = handleSubmit(async data =>{

      const res = await actualizarAlergia(data.idalergias, data)
      console.log(res)
      setShowModalAnadirAlergia(false)
  
      location.reload()
    })

// ------------------------------- FIN ALERGIAS -----------------------------------------------------------------------


  return (
    <div className="w-full bg-gray-300">
      <div className='py-10 w-full h-1 flex justify-center items-center'>
        
        <input type="text" id="mascota" maxLength="15" onChange={ buscarMascota } placeholder="buscar mascota" style={{background:"#D8F3DC"}}
        className="text-center block rounded-md w-64 border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/> 

      </div>
      <div className='flex justify-center h-3/4'>
        {found ? ( 
          <>
          <div className='text-black w-3/4 rounded lg:mt-10 min-h-full' style={{background : "#B7E4C7"}}>
            <div className='flex border-b-2 border-solid border-black mx-5'>
              <FaDog className='lg:ml-10 lg:mt-10 lg:h-32 lg:w-32 h-16 w-16'/> 
              <p className='text-3xl text-black font-semibold ml-10 lg:mt-20 mt-5'>{mascota.data.nombremascota}</p>
              <br />
            </div>
            <div className="text-black text-lg lg:mx-5 mt-5">
              <div className="content-tabs">
                
                <div className="border-b border-gray-200 lg:px-4 dark:border-gray-700 ">
                  <nav className="flex space-x-2 flex flex-wrap" aria-label="Tabs" role="tablist" >
                    <button type="button" className="hs-tab-active:font-semibold hs-tab-active:border-blue-600 hs-tab-active:text-blue-600 py-4 px-1 inline-flex items-center gap-2 border-b-[3px] border-transparent text-sm whitespace-nowrap text-gray-500 hover:text-white active" id="basic-tabs-item-1" data-hs-tab="#basic-tabs-1" aria-controls="basic-tabs-1" role="tab">
                      Información
                    </button>
                    <button type="button" className="hs-tab-active:font-semibold hs-tab-active:border-blue-600 hs-tab-active:text-blue-600 py-4 px-1 inline-flex items-center gap-2 border-b-[3px] border-transparent text-sm whitespace-nowrap text-gray-500 hover:text-white" id="basic-tabs-item-2" data-hs-tab="#basic-tabs-2" aria-controls="basic-tabs-2" role="tab">
                      Alergias
                    </button>
                    <button type="button" className="hs-tab-active:font-semibold hs-tab-active:border-blue-600 hs-tab-active:text-blue-600 py-4 px-1 inline-flex items-center gap-2 border-b-[3px] border-transparent text-sm whitespace-nowrap text-gray-500 hover:text-white" id="basic-tabs-item-3" data-hs-tab="#basic-tabs-3" aria-controls="basic-tabs-3" role="tab">
                      Vacunas
                    </button>
                    <button type="button" className="hs-tab-active:font-semibold hs-tab-active:border-blue-600 hs-tab-active:text-blue-600 py-4 px-1 inline-flex items-center gap-2 border-b-[3px] border-transparent text-sm whitespace-nowrap text-gray-500 hover:text-white" id="basic-tabs-item-3" data-hs-tab="#basic-tabs-4" aria-controls="basic-tabs-3" role="tab">
                      Fichas
                    </button>
                  </nav>
                </div>

                <div className="lg:mt-3 p-4">
                  <div id="basic-tabs-1" role="tabpanel" aria-labelledby="basic-tabs-item-1">
                    <div className="bg-white rounded lg:w-2/3 lg:h-2/3 mt-5 p-5 whitespace-nowrap overflow-x-scroll">
                      <p>ESPECIE: {mascota.data.especie}</p>
                      <p>RAZA: {mascota.data.raza}</p>
                      <p>COLOR: {mascota.data.color}</p>
                      <p>FECHA DE NACIMIENTO: {mascota.data.fechadenacimiento}</p>
                    </div>
                    <div className="bg-white rounded lg:w-2/3 lg:h-2/3 mt-5 p-5 whitespace-nowrap overflow-x-scroll">
                      <p>RUT DUEÑO: {dueno.data.rut}</p>
                      <p>TELEFONO: {dueno.data.telefono}</p>
                      <p>DIRECCION: {dueno.data.direccion}</p>
                    </div>
                  </div>
                  <div id="basic-tabs-2" className="hidden" role="tabpanel" aria-labelledby="basic-tabs-item-2">
                  <table className='w-full'>
                    <thead>
                      <tr className='bg-white border border-black'>
                        <th className='lg:px-4 py-2 px-1 border-r border-black'>Alergia</th>
                        <th className='lg:px-4 py-4 px-1 cursor-pointer bg-gray-200 hover:bg-gray-300 flex justify-center' onClick={() => setShowModalAnadirAlergia(true)}><FaPlus/></th>
                      </tr>
                    </thead>
                    <tbody className='text-center bg-gray-100'>
                      {alergias && alergias.map(alergia => <tr className='border bg-grey-300 border-black' key={alergia.idalergias}>
                        <td>{alergia.nombrealergia}</td>
                        <td className='border-l border-black'>
                          <div className='flex space-x-5 justify-center'>
                            <FaPencil size="20px" color='blue' className="cursor-pointer" onClick={() => editarAlergia(alergia.idalergias)}/>
                            <FaRegTrashCan size="20px" color='red' className="cursor-pointer" onClick={() => deleteAlergia(alergia.idalergias)}/>
                          </div>
                        </td>
                        </tr>)}
                    </tbody>
                  </table>
                  </div>
                  <div id="basic-tabs-3" className="hidden" role="tabpanel" aria-labelledby="basic-tabs-item-3">
                    <p className="text-gray-500 dark:text-gray-400">
                      This is the <em className="font-semibold text-gray-800 dark:text-gray-200">third</em> item's tab body.
                    </p>
                  </div>
                  <div id="basic-tabs-4" className="hidden" role="tabpanel" aria-labelledby="basic-tabs-item-3">
                    <p className="text-gray-500 dark:text-gray-400">
                      This is the <em className="font-semibold text-gray-800 dark:text-gray-200">4</em> item's tab body.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </>
        ) : (
          <>
            {found != null ?(
            <div className='block'>
              <div>
                <h3 className='text-black text-2xl text-bold'>La mascota no se encuentra en nuestro sistema</h3>
              </div>
              <div className='flex justify-center'>
                <button
                className="bg-emerald-500 text-white active:bg-emerald-600 font-semi-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none"
                onClick={() => setShowModalAnadir(true)}>
                  Agregar Mascota
                </button>
              </div>
            </div>
            ) : null}
            
          </>
            
        )}
      </div>
      
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
                    Agregar Mascota
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModalAnadir(false)}
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
                      <label htmlFor="nombre" className='text-black'>Id Mascota</label>
                      <input type="text" defaultValue={mascotaBuscada} disabled 
                        className="block text-center w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        {...register('idmascota', {value : mascotaBuscada})}/>
                    </div>
                    <div>
                    <label htmlFor="nombre" className='text-black'>Nombre</label>
                      <input type="text" placeholder='Nombre' required
                        className="block text-center w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        {...register('nombremascota', {required : true})}/>
                    </div>

                    <div>
                    <label htmlFor="especie" className='text-black'>Especie</label>
                      <input type="text" placeholder='Especie' required
                        className="block text-center w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        {...register('especie', {required : true})}/>
                    </div>

                    <div>
                    <label htmlFor="color" className='text-black'>Color</label>
                      <input type="text" placeholder='Raza' required
                        className="block text-center w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        {...register('color', {required : true})}/>
                    </div>

                    <div>
                    <label htmlFor="raza" className='text-black'>Raza</label>
                      <input type="text" placeholder='Raza' required
                        className="block text-center w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        {...register('raza', {required : true})}/>
                    </div>

                    <div>
                      <label htmlFor="fechaNac" className='text-black'>Fecha de nacimiento</label>
                      <input type="date" placeholder='Fecha de nacimiento' required
                        className="block text-center w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        {...register('fechadenacimiento', {required : true})}/>
                    </div>

                    <div>
                    <label htmlFor="rut" className='text-black'>Rut dueño</label>
                      <input type="text" placeholder='XXXXXXXX-X' required
                        className="block text-center w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        {...register('usuariodueño_rut', {required : true})}/>
                    </div>

                    <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                      <button
                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => setShowModalAnadir(false)}
                      >
                        Cancelar
                      </button>
                      <button
                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="submit"
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


    {showModalAnadirAlergia ? (
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
                    Agregar Alergia
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModalAnadirAlergia(false)}
                  >
                    <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <form onSubmit={onSubmitAnadirAlergia} className='space-y-5'>

                    <input type="hidden" {...register('mascota_idmascota', {value : mascota.data.idmascota})}/>

                    <div>
                      <input type="text" placeholder='Nombre' required
                        className="block text-center w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        {...register('nombrealergia', {required : true})}/>
                    </div>

                    <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                      <button
                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => setShowModalAnadirAlergia(false)}
                      >
                        Cancelar
                      </button>
                      <button
                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="submit"
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

    {showModalEditarAlergia ? (
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
                    Agregar Alergia
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModalEditarAlergia(false)}
                  >
                    <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <form onSubmit={onSubmitEditarAlergia} className='space-y-5'>

                    <input type="hidden" {...register('mascota_idmascota', {value : mascota.data.idmascota})}/>
                    <input type="hidden" {...register('idalergias', {value : alergia.data.idalergias})}/>
                    <div>
                      <input type="text" placeholder='Nombre' required defaultValue={alergia.nombrealergia}
                        className="block text-center w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        {...register('nombrealergia', {required : true})}/>
                    </div>

                    <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                      <button
                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => setShowModalEditarAlergia(false)}
                      >
                        Cancelar
                      </button>
                      <button
                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="submit"
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

    </div>
  )
}


