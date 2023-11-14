
import React, { useEffect, useState } from 'react'
import { getMedicamentoVet, getAllMedicamentos, createMedicamento, getMedicamento, actualizarMedicamento, eliminarMedicamento} from '../api/veterinaria/medicamentos.api'
import { useForm } from 'react-hook-form'

import { FaPencil, FaRegTrashCan, FaPlus} from "react-icons/fa6";


// Cambiar de insumos a medicamentos

export function Medicamentos() {

  const veterinaria = window.localStorage.getItem('idVeterinaria')
  
  const [medicamentos, setData]= useState([])


  const [showModalAnadir, setShowModalAnadir]= useState(false)
  const [showModalEditar, setShowModalEditar]= useState(false)

  const [medEditar, setMed] = useState()
  
  const {register, handleSubmit, reset, formState:{errors}} = useForm()

  useEffect(()=>{
    async function cargarMedicamentos(){
      const data = await getMedicamentoVet(veterinaria)
      setData(data.data)
      console.log(data.data)
    }
    cargarMedicamentos()
  },[])

  const onSubmitAnadir = handleSubmit(async dataForm =>{

    const medicamentosTotales = await getAllMedicamentos()
    let id
    if(medicamentosTotales.data.length <= 0){
      id = 0
    }else{
      id = parseInt(medicamentosTotales.data[medicamentosTotales.data.length - 1].idmedicamentos) + 1
    }

    dataForm.idmedicamentos = id
    dataForm.veterinaria_idveterinaria = veterinaria
    await createMedicamento(dataForm)

    setShowModalAnadir(false)

    const med = await getMedicamentoVet(veterinaria)
    setData(med.data)
    reset()
  })
  
  function anadir(){
    reset()
    setShowModalAnadir(true)
  }
  const onSubmitEditar = handleSubmit(async dataFormEditar =>{

    console.log(dataFormEditar)
    dataFormEditar.veterinaria_idveterinaria = veterinaria
    await actualizarMedicamento(dataFormEditar.idmedicamentos, dataFormEditar)
    const med = await getMedicamentoVet(veterinaria)
    setData(med.data)
    setShowModalEditar(false)
    reset()

  })

  async function editarMed(id){
    const medEd = await getMedicamento(id);

    setMed(medEd)
    setShowModalEditar(true)
    reset()
  }

  async function deleteMed(id){

    const medEliminar = await getMedicamento(id);
    let res = window.confirm(`Esta seguro que desea eliminar ${medEliminar.data.nombre}`)
    if(res == true){
      await eliminarMedicamento(id)
      const med = await getMedicamentoVet(veterinaria)
      setData(med.data)
    }
  }

  

  return (
    <div className='flex lg:justify-center mt-10 text-black lg:w-2/3 w-5/6 max-h-3/4 overflow-y-auto'>
      <table className='w-full'>
        <thead className=''>
          <tr style={{background:"#95D5B2"}}>
            <th className='lg:px-4 py-2 px-1'>Id</th>
            <th className='lg:px-4 py-2 px-1'>Nombre</th>
            <th className='lg:px-4 py-2 px-1'>Valor</th> 
            <th className='lg:px-4 py-2 px-1'>Cantidad</th> 
            <th className='lg:px-4 py-3 px-1 cursor-pointer bg-green-400 hover:bg-green-300 flex justify-center' onClick={() => anadir()}><FaPlus/></th>
          </tr>
        </thead>
        <tbody className='text-center bg-gray-100'>
          {medicamentos && medicamentos.map(medicamento => <tr className='border-b border-black' key={medicamento.idmedicamentos}>
            <td>{medicamento.idmedicamentos}</td>
            <td>{medicamento.nombre}</td>
            <td>{medicamento.valor}</td>
            <td>{medicamento.cantidad}</td>
            <td>
              <div className='flex space-x-5 justify-center'>
                <FaPencil size="20px" color='blue' className="cursor-pointer" onClick={() => editarMed(medicamento.idmedicamentos)}/>
                <FaRegTrashCan size="20px" color='red' className="cursor-pointer" onClick={() => deleteMed(medicamento.idmedicamentos)}/>
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
                    Agregar Medicamento
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
                    Editar Medicamento
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModalEditar(false)}
                  >
                    <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <form onSubmit={onSubmitEditar} className='space-y-5'>
                    <input type="hidden" value={medEditar.data.idmedicamentos} {...register('idmedicamentos')}/>
                    <div>
                      <input type="text" placeholder='Nombre' defaultValue={medEditar.data.nombre} required
                        className="block text-center w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        {...register('nombre', {required : true})}/>
                        {errors.nombre && <span className='text-black'>El campo nombre es obligatorio</span>}
                    </div>

                    <div>
                      <input type="number" placeholder='Valor' defaultValue={medEditar.data.valor} required
                        className="block text-center w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        {...register('valor', {required : true})}/>
                    </div>

                    <div>
                      <input type="number" placeholder='Cantidad' defaultValue={medEditar.data.cantidad} required
                        className="block text-center w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        {...register('cantidad', {required : true})}/>
                    </div>

                    <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                      <button
                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() =>setShowModalEditar(false)}
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
