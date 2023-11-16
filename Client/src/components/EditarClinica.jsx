import {actualizarUserVet, getAllUserVets, getUserVet, getUsersVet} from '../api/usuarios/user_vet.api'
import { useEffect, useState } from 'react'
import { actualizarVeterinaria, getVeterinaria } from '../api/veterinaria/veterinarias.api'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { getFranquicia } from '../api/veterinaria/franquicias.api'

export function EditarClinica() {

  const [modalEditarClinica, setModalEditarClinica] = useState(false)
  const [veterinarios, setVets] = useState([])
  const [veterinaria, setVet] = useState([])

  const [franquicia, setFranquicia] = useState([])

  const [vetCon, setVetCon] = useState()

  const [modalContratar, setModalContratar] = useState(false)
  const {register, handleSubmit} = useForm()

  const navigate = useNavigate()
  useEffect(()=>{
    async function comprobarVet(){
      const veterinario = await getUserVet(window.localStorage.getItem('id'))
      console.log(veterinario.data.veterinaria_idveterinaria)
      const vet = veterinario.data.veterinaria_idveterinaria
      if(veterinario.data.admin != '0'){
        navigate('/adminHome/Mascotas')
      }else{
        const vetSet= await getVeterinaria(vet)
        console.log(vetSet)

        setVet(vetSet.data)
        window.localStorage.setItem('idVeterinaria', vet)
  
        const usuarios = await getUsersVet(vet);
        console.log(usuarios.data)
        setVets(usuarios.data)
        const fr = await getFranquicia(vetSet.data.franquicia_idfranquicia)
        setFranquicia(fr.data)
      }
      
    }

    comprobarVet()
},[])

  const onSubmitEditar = handleSubmit (async data =>{

    console.log(data)
    await actualizarVeterinaria(data.idveterinaria, data)
    
    const vet = await getVeterinaria(data.idveterinaria)
    setVet(vet.data)

    setModalEditarClinica(false)
  })

  async function despedirVet(vetRut){

    console.log(vetRut)

    const vetDespedir = await getUserVet(vetRut)

    const res = window.confirm("Esta seguro que desea contratar a " + vetDespedir.data.nombres + " " + vetDespedir.data.apellidos)
    if(res){
      vetDespedir.data.contratado = false
      vetDespedir.data.veterinaria_idveterinaria = null
      await actualizarUserVet(vetRut, vetDespedir.data)
      window.alert("Veterinario/a despedido con éxito")
      const usersVet = await getUsersVet(veterinaria.idveterinaria)
      setVets(usersVet.data)
    }


  }

  const buscarVet = handleSubmit (async data=>{
    let res
    try {
      res = await getUserVet(data.rutVet)

    } catch (error) {
      console.log("a")
    }

    if(res){
      console.log(res.data)
      setModalContratar(true)
      setVetCon(res.data)
      console.log(res.data)
    }else{
      alert("Usuario no encontrado en el sistema")
    }
  })

  async function contratar(){

    const res = window.confirm("Esta seguro que desea contratar a " + vetCon.nombres + " " + vetCon.apellidos)
    if(res){
      vetCon.contratado = true
      vetCon.veterinaria_idveterinaria = veterinaria.idveterinaria
      console.log(vetCon)
      await actualizarUserVet(vetCon.rut, vetCon)

      const usersVet = await getAllUserVets(veterinaria.idveterinaria)
      setVets(usersVet.data)
    }

    setModalContratar(false)
    // Hacer contratar
  }


  return (
    <div className='lg:w-2/3'>

      <div className='flex lg:justify-between justify-center mb-10 mt-5 flex-wrap'>
        <form onSubmit={buscarVet}>
          <div className="flex">
            <input type="text" id="vetRut" maxLength="15" placeholder="buscar veterinario" style={{background:"#D8F3DC"}}
            className="text-center block rounded-md lg:w-72 border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            {...register('rutVet', {required : true})}/> 
            <button className='bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm lg:px-6 px-2 
            py-2 rounded' type="submit" >Buscar</button>
          </div>
        </form>
      
        <button className='flex bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm lg:px-6 px-2
        py-2 rounded' onClick={() => setModalEditarClinica(true)}>
          Editar datos de la clínica
        </button>
      </div>

      <div className='flex flex-wrap justify-center mb-5'>
        <p className='lg:text-3xl text-xl text-black font-bold'>{veterinaria.nombreveterinaria}</p>
      </div>
      
      <div className='flex justify-center'>
      <div className='lg:w-full w-64 max-h-3/4 overflow-y-auto'>
        <table className='w-full'>
          <thead className='text-black'>
            <tr style={{background:"#95D5B2"}}>
              <th className='py-2 px-1'>Rut</th> 
              <th className='py-2 px-1'>Nombres</th>
              <th className='py-2 px-1'>Apellidos</th>
              <th className='py-3 px-1'>Acción</th>
            </tr>
          </thead>
          <tbody className='text-center text-black bg-gray-100'>
            {veterinarios && veterinarios.map(vet => 
            <tr className='border-b border-black' key={vet.rut}>
              <td>{vet.rut}</td>
              <td>{vet.nombres}</td>
              <td>{vet.apellidos}</td>
              <td>
              {vet.admin != '0' ? (<button className='border-rounded border-2 bg-red-300 px-2 py-1' onClick={()=>despedirVet(vet.rut)}>Despedir</button>):(<p>Administrador</p>)}
              </td>
            </tr>)}
          </tbody>
        </table>
      </div>
      </div>
      
      


      {modalEditarClinica ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold text-black">
                    Editar Veterinaria
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setModalEditarClinica(false)}
                  >
                    <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <form onSubmit={onSubmitEditar} className='space-y-5' id='aaaa'>
                    <input type="hidden" defaultValue={veterinaria.idveterinaria} {...register('idveterinaria')}/>
                    <div>
                      <input type="text" placeholder='Nombre' defaultValue={veterinaria.nombreveterinaria} required
                        className="block text-center w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        {...register('nombreveterinaria', {required : true})}/>
                    </div>

                    <div>
                      <input type="text" placeholder='Direccion' defaultValue={veterinaria.direccion} required
                        className="block text-center w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        {...register('direccion', {required : true})}/>
                    </div>
                    <input type="hidden" value={veterinaria.franquicia_idfranquicia} {...register('franquicia_idfranquicia')}/>

                    <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                      <button
                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => setModalEditarClinica(false)}
                      >
                        Cancelar
                      </button>
                      <button
                        id='btn'
                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="submit"
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

{modalContratar ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold text-black">
                    {vetCon.nombres} {vetCon.apellidos}
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setModalContratar(false)}
                  >
                    <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                {vetCon.contratado == true ? 
                (
                  <>
                  {vetCon.veterinaria_idveterinaria == veterinaria.idveterinaria ? (
                  <div className="p-6 text-center text-black">
                    <p className='text-xl font-semibold'>{vetCon.rut}</p>
                    <p className='text-xl font-semibold'>{vetCon.nombres}</p>
                    <p className='text-xl font-semibold'>{vetCon.apellidos}</p>
                    <p className='text-xl font-semibold'>{vetCon.telefono}</p>
                    <p className='text-3xl text-green-500 font-semibold'>Usuario ya contratado</p>
                  
                  </div>
                  ):(
                  <div className="p-6 text-center text-black">
                    <p className='text-xl font-semibold'>{vetCon.rut}</p>
                    <p className='text-xl font-semibold'>{vetCon.nombres}</p>
                    <p className='text-xl font-semibold'>{vetCon.apellidos}</p>
                    <p className='text-xl font-semibold'>{vetCon.telefono}</p>
                    <p className='text-3xl text-green-500 font-semibold'>Usuario bajo contrato</p>
                  
                  </div>
                  )}
                  
                <div className='flex justify-between'>
               
                  <button
                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => setModalContratar(false)}
                      >
                        Cerrar
                      </button>
                </div>
                  </>
                  
                )
                : (
                  <>
                  <div className="p-6 text-center text-black">
                  <p className='text-xl font-semibold'>{vetCon.rut}</p>
                  <p className='text-xl font-semibold'>{vetCon.nombres}</p>
                  <p className='text-xl font-semibold'>{vetCon.apellidos}</p>
                  <p className='text-xl font-semibold'>{vetCon.telefono}</p>
                  
                </div>
                <div className='flex justify-between'>
               
                  <button
                        className="text-green-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => contratar()}
                      >
                        Contratar
                      </button>

                      <button
                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => setModalContratar(false)}
                      >
                        Cerrar
                      </button>
                </div>
                  </>

                )}
                
                
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}


    </div>
)}

