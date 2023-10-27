import React, { useEffect, useState } from 'react'
import { getInsumosVet, getAllInsumos, createInsumo, getInsumo, actualizarInsumos, eliminarInsumo} from '../api/veterinaria/insumos.api'
import { useForm } from 'react-hook-form'

import { FaPencil, FaRegTrashCan, FaPlus} from "react-icons/fa6";


export function Insumos() {

  const veterinaria = window.localStorage.getItem('idVeterinaria')
  
  const [data, setData]= useState([])


  const [showModalAnadir, setShowModalAnadir]= useState(false)
  const [showModalEditar, setShowModalEditar]= useState(false)

  const [insumoEditar, setInsumo] = useState()
  
  const {register, handleSubmit, reset, formState:{errors}} = useForm()

  useEffect(()=>{
    async function cargarInsumos(){
      const data = await getInsumosVet(veterinaria)
      setData(data.data)
    }
    cargarInsumos()
  },[])

  const onSubmitAnadir = handleSubmit(async dataForm =>{

    const insumosTotales = await getAllInsumos()

    const id = parseInt(insumosTotales.data[insumosTotales.data.length - 1].idinsumos) + 1

    dataForm.idinsumos = id
    dataForm.veterinaria_idveterinaria = veterinaria
    await createInsumo(dataForm)

    setShowModalAnadir(false)

    const ins = await getInsumosVet(veterinaria)
    setData(ins.data)
    reset()
  })

  const onSubmitEditar = handleSubmit(async dataFormEditar =>{

    console.log(dataFormEditar)

    dataFormEditar.nombre = dataFormEditar.nombreIns
    dataFormEditar.valor = dataFormEditar.valorIns
    dataFormEditar.cantidad = dataFormEditar.cantidadIns

    dataFormEditar.veterinaria_idveterinaria = veterinaria
    await actualizarInsumos(dataFormEditar.idinsumos, dataFormEditar)
    const ins = await getInsumosVet(veterinaria)
    setData(ins.data)
    reset()

    setShowModalEditar(false)

  })

  async function editarInsumo(id){
    const insEditar = await getInsumo(id);

    setInsumo(insEditar)
    setShowModalEditar(true)
  }

  async function deleteInsumo(id){

    const insEliminar = await getInsumo(id);
    let res = window.confirm(`Esta seguro que desea eliminar ${insEliminar.data.nombre}`)
    if(res == true){
      await eliminarInsumo(id)
      const ins = await getInsumosVet(veterinaria)
      setData(ins.data)
    }
  }

  

  return (
    <div className='flex lg:justify-center mt-10 text-black lg:w-2/3 w-5/6 overflow-y-auto'>
      <table className='w-full'>
        <thead className=''>
          <tr style={{background:"#95D5B2"}}>
            <th className='lg:px-4 py-2 px-1'>Id</th>
            <th className='lg:px-4 py-2 px-1'>Nombre</th>
            <th className='lg:px-4 py-2 px-1'>Cantidad</th> 
            <th className='lg:px-4 py-3 px-1 cursor-pointer bg-green-400 hover:bg-green-300 flex justify-center' onClick={() => setShowModalAnadir(true)}><FaPlus/></th>
          </tr>
        </thead>
        <tbody className='text-center bg-gray-100'>
          {data && data.map(insumo => <tr className='border-b border-black' key={insumo.idinsumos}>
            <td>{insumo.idinsumos}</td>
            <td>{insumo.nombre}</td>
            <td></td>
            <td>
              <div className='flex space-x-5 justify-center'>
                <FaPencil size="20px" color='blue' className="cursor-pointer" onClick={() => editarInsumo(insumo.idinsumos)}/>
                <FaRegTrashCan size="20px" color='red' className="cursor-pointer" onClick={() => deleteInsumo(insumo.idinsumos)}/>
              </div>
            </td>
            </tr>)}
        </tbody>
      </table>

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
                  <h3 className="text-3xl font-semibold">
                    Agregar Insumo
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
                      <input type="text" placeholder='Nombre' required
                        className="block text-center w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        {...register('nombre', {required : true})}/>
                    </div>

                    <div>
                      <input type="number" placeholder='Valor' required
                        className="block text-center w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        {...register('valor', {required : true})}/>
                    </div>

                    <div>
                      <input type="number" placeholder='Cantidad' required
                        className="block text-center w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        {...register('cantidad', {required : true})}/>
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
                  <h3 className="text-3xl font-semibold">
                    Editar Insumo
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => location.reload()}
                  >
                    <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <form onSubmit={onSubmitEditar} className='space-y-5'>
                    <input type="hidden" value={insumoEditar.data.idinsumos} {...register('idinsumos')}/>
                    <div>
                      <input type="text" placeholder='Nombre' defaultValue={insumoEditar.data.nombre} required
                        className="block text-center w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        {...register('nombreIns', {required : true})}/>
                        {errors.nombre && <span className='text-black'>El campo nombre es obligatorio</span>}
                    </div>

                    <div>
                      <input type="number" placeholder='Valor' defaultValue={insumoEditar.data.valor} required
                        className="block text-center w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        {...register('valorIns', {required : true})}/>
                    </div>

                    <div>
                      <input type="number" placeholder='Cantidad' defaultValue="" required
                        className="block text-center w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        {...register('cantidadIns', {required : true})}/>
                    </div>

                    <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                      <button
                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => location.reload()}
                      >
                        Cancelar
                      </button>
                      <button
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

    </div>

    
  )
}
