import { getVenta, createVenta, actualizarVenta, getVentasVet, eliminarVenta, getAllVentas } from '../api/veterinaria/RegistroVentas.api'
import { getProductosVentaVenta, createProductoVenta, eliminarProductoVenta, getAllProductosVentas, actualizarProductosVentas } from '../api/veterinaria/ProductosVentas.api'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'

import { FaPencil, FaRegTrashCan, FaPlus, FaEye} from "react-icons/fa6";

export function Ventas() {

    const veterinaria = window.localStorage.getItem('idVeterinaria')
  
    const [ventas, setData]= useState([])

    const [venta, setVentaCreada]= useState([])
    const [productos, setProd]= useState([])
    const [vVenta, setVerVenta] = useState()
  
    const [showModalAnadirVenta, setShowModalAnadirVenta]= useState(false)
    const [showModalEditarVenta, setShowModalEditarVenta]= useState(false)
    const [showModalVerVenta, setShowModalVerVenta]= useState(false)

    const [showModalAnadirProd, setShowModalAnadirProd]= useState(false)
    const [showModalEditarProd, setShowModalEditarProd]= useState(false)
  
    const [ventaEditar, setVenta] = useState([])
    const [prodEditar, setProdEdit] = useState([])
    const [dateStr, setDateStr] = useState()
    
    const {register, handleSubmit, reset} = useForm()
  
    useEffect(()=>{
      async function cargarVentas(){
        const data = await getVentasVet(veterinaria)
        setData(data.data)
        // console.log(data.data)

        let fechaHoy
        const date = new Date() 
        if((parseInt(date.getMonth())+1) < 10){
          if(parseInt(date.getDate()) < 10){
            fechaHoy = date.getFullYear() + '-0'+(parseInt(date.getMonth())+1).toString() + '-0'+ (parseInt(date.getDate())).toString()
          }else{
            fechaHoy = date.getFullYear() + '-0'+(parseInt(date.getMonth())+1).toString() + '-'+ (parseInt(date.getDate())).toString()
          }
        }else{
          if(parseInt(date.getDate()) < 10){
            fechaHoy = date.getFullYear() + '-'+(parseInt(date.getMonth())+1).toString() + '-0'+ (parseInt(date.getDate())).toString()
          }else{
            fechaHoy = date.getFullYear() + '-' +(parseInt(date.getMonth())+1).toString() + '-'+ (parseInt(date.getDate())).toString()
          }
        }

        setDateStr(fechaHoy)
      }
      cargarVentas()
    },[])
  
    const onSubmitAnadirVenta = handleSubmit(async dataForm =>{
  
      const ventasTotales = await getAllVentas()
      let id
      if(ventasTotales.data.length <= 0){
        id = 0
      }else{
        id = parseInt(ventasTotales.data[ventasTotales.data.length - 1].idregistrodeventas) + 1
      }
  
      dataForm.idregistrodeventas = id
      dataForm.veterinaria_idveterinaria = veterinaria
      dataForm.valortotal = 0

      setVentaCreada(dataForm)
      await createVenta(dataForm)
  
      setShowModalAnadirVenta(false)
      setShowModalAnadirProd(true)
  
      
      reset()
    })

    const onSubmitAnadirProd = handleSubmit(async dataForm =>{
  
      const prodTotales = await getAllProductosVentas()
      let id
      if(prodTotales.data.length <= 0){
        id = 0
      }else{
        id = parseInt(prodTotales.data[prodTotales.data.length - 1].idproductosventa) + 1
      }
  
      dataForm.idproductosventa = id
      dataForm.registrodeventas_idregistrodeventas = venta.idregistrodeventas

      await createProductoVenta(dataForm)  

      const inputProd = document.getElementById('prod')
      const inputCant = document.getElementById('cant')
      const inputVal = document.getElementById('val')

      inputProd.value = ""
      inputCant.value = ""
      inputVal.value = ""

      const finBtn = document.getElementById('fin')
      finBtn.classList.remove('hidden')
    })
    
    function anadir(){
      reset()
      setShowModalAnadirVenta(true)
    }


    const onSubmitEditarVenta = handleSubmit(async dataFormEditar =>{
  
      // console.log(dataFormEditar)
      dataFormEditar.veterinaria_idveterinaria = veterinaria
      await actualizarVenta(dataFormEditar.idregistrodeventas, dataFormEditar)
      
      setShowModalEditarVenta(false)
      setShowModalEditarProd(true)
      reset()
  
    })

    async function onSubmitEditarProd(id){
      

      const nombre = document.getElementById("nombre" + id).value
      const cantidad = document.getElementById("cant" + id).value
      const valor = document.getElementById("valor" + id).value

      const data = {
        idproductosventa : id,
        nombreproducto : nombre,
        cantidad : cantidad,
        valor : valor,
        registrodeventas_idregistrodeventas : ventaEditar.idregistrodeventas
      }

      // console.log(data)

      await actualizarProductosVentas(id, data)

      window.alert('Producto editado existosamente')
  
    }

    async function finalizarEdit(){
      // console.log("a")
      const vent = await getVentasVet(veterinaria)
      setData(vent.data)

      setShowModalEditarProd(false)
      reset()
    }

    async function finalizarCrear(){
      // console.log("epico")

      const productos = await getProductosVentaVenta(venta.idregistrodeventas)
      let total = 0
      for(let i = 0;  i < productos.data.length; i++){
        total += productos.data[i].valor
      }

      venta.valortotal = total

      await actualizarVenta(venta.idregistrodeventas, venta)

      const finBtn = document.getElementById('fin')
      finBtn.classList.add('hidden')

      const vent = await getVentasVet(veterinaria)
      setData(vent.data)
      setShowModalAnadirProd(false)
      setVentaCreada(null);

    }
  
    async function editarVenta(id){
      const ventaEd = await getVenta(id);
      const prodEd = await getProductosVentaVenta(id)
      setProdEdit(prodEd.data)
      setVenta(ventaEd.data)
      // console.log(ventaEd.data.fecha.splitr)
      setShowModalEditarVenta(true)
      reset()
    }
  
    async function deleteVenta(id){
  
      const ventaEliminar = await getVenta(id);
      let res = window.confirm(`Esta seguro que desea eliminar la venta de ${ventaEliminar.data.nombreDueno} con fecha ${ventaEliminar.data.fecha.split('T')[0]}`)
      if(res == true){
        await eliminarVenta(id)
        const vent = await getVentasVet(veterinaria)
        setData(vent.data)
      }
    }

    async function verVenta(id){
      
      const ventaVer = await getVenta(id)
      setVerVenta(ventaVer.data)

      const productos = await getProductosVentaVenta(id)
      setProd(productos.data)

      setShowModalVerVenta(true)

    }
  



  return (
    <div className='flex lg:justify-center mt-10 text-black lg:w-2/3 w-5/6 max-h-3/4 overflow-y-auto'>
      <table className='w-full'>
        <thead className=''>
          <tr style={{background:"#95D5B2"}}>
            <th className='lg:px-4 py-2 px-1'>Fecha</th>
            <th className='lg:px-4 py-2 px-1'>Nombre comprador</th> 
            <th className='lg:px-4 py-2 px-1'>Opciones</th>
            <th className='lg:px-4 py-3 px-1 cursor-pointer bg-green-400 hover:bg-green-300 flex justify-center' onClick={() => anadir()}><FaPlus/></th>
          </tr>
        </thead>
        <tbody className='text-center bg-gray-100'>
          {ventas && ventas.map(venta => <tr className='border-b border-black' key={venta.idregistrodeventas}>
            <td>{venta.fecha.split('T')[0]}</td>
            <td>{venta.nombreDueno}</td>
            <td>
              <div className='flex space-x-5 justify-center'>
                <FaEye size="20px" color='blue' className="cursor-pointer" onClick={() => verVenta(venta.idregistrodeventas)}/>
                <FaPencil size="20px" color='blue' className="cursor-pointer" onClick={() => editarVenta(venta.idregistrodeventas)}/>
                <FaRegTrashCan size="20px" color='red' className="cursor-pointer" onClick={() => deleteVenta(venta.idregistrodeventas)}/>
              </div>
            </td>
            <td></td>
            </tr>)}
        </tbody>
      </table>

      {showModalAnadirVenta ? (
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
                    Registrar Venta
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModalAnadirVenta(false)}
                  >
                    <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <form onSubmit={onSubmitAnadirVenta} className='space-y-5'>
                    <input type="hidden" {...register('valorTotal', {value : 0})}/>

                    <div>
                      <input type="date" required defaultValue={dateStr} min={dateStr}
                        className="block text-center w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        {...register('fecha', {required : true})}/>
                    </div>

                    <div>
                      <input type="text" placeholder='Rut comprador' required
                        className="block text-center w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        {...register('rutDueno', {required : true})}/>
                    </div>

                    <div>
                      <input type="text" placeholder='Nombre comprador' required
                        className="block text-center w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        {...register('nombreDueno', {required : true})}/>
                    </div>

                    <div>
                      <input type="text" placeholder='Teléfono comprador: 9XXXXXXXX' maxLength={9} required
                        className="block text-center w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        {...register('telefono', {required : true})}/>
                    </div>

                    <div>
                      <input type="text" placeholder='Correo comprador (Opcional)'  
                        className="block text-center w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        {...register('correo')}/>
                    </div>

                    <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                      <button
                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => setShowModalAnadirVenta(false)}
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


      {showModalAnadirProd ? (
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
                    Agregar Productos
                  </h3>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <form onSubmit={onSubmitAnadirProd} className='space-y-5'>

                    <div>
                      <input type="text" placeholder='Nombre producto' id="prod" required
                        className="block text-center w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        {...register('nombreproducto', {required : true})}/>
                    </div>

                    <div>
                      <input type="number" placeholder='Cantidad' id="cant" min={1} required
                        className="block text-center w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        {...register('cantidad', {required : true})}/>
                    </div>

                    <div>
                      <input type="number" placeholder='Valor' id="val" min={0} required
                        className="block text-center w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        {...register('valor', {required : true})}/>
                    </div>
                    <div className='flex justify-center'>
                      <button
                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="submit"
                      >
                        Agregar
                      </button>
                    </div>
                    <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                      
                      <button
                        className="bg-emerald-500 text-white hidden active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button" id="fin" onClick={finalizarCrear}
                      >
                        Finalizar
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

      {showModalEditarVenta ? (
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
                    Editar Venta
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModalEditarVenta(false)}
                  >
                    <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <form onSubmit={onSubmitEditarVenta} className='space-y-5'>
                    <input type="hidden" value={ventaEditar.idregistrodeventas} {...register('idregistrodeventas')}/>
                    <input type="hidden" value={ventaEditar.valortotal} {...register('valortotal')}/>
                    <div>
                      <input type="date" required defaultValue={ventaEditar.fecha.split('T')[0]} min={ventaEditar.fecha.split('T')[0]}
                        className="block text-center w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        {...register('fecha', {required : true})}/>
                    </div>

                    <div>
                      <input type="text" placeholder='Rut comprador' defaultValue={ventaEditar.rutDueno} required
                        className="block text-center w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        {...register('rutDueno', {required : true})}/>
                    </div>

                    <div>
                      <input type="text" placeholder='Nombre comprador' required defaultValue={ventaEditar.nombreDueno}
                        className="block text-center w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        {...register('nombreDueno', {required : true})}/>
                    </div>

                    <div>
                      <input type="text" placeholder='Teléfono comprador: 9XXXXXXXX' maxLength={9} required defaultValue={ventaEditar.telefono}
                        className="block text-center w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        {...register('telefono', {required : true})}/>
                    </div>

                    <div>
                      <input type="text" placeholder='Correo comprador (Opcional)' defaultValue={ventaEditar.correo}
                        className="block text-center w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        {...register('correo')}/>
                    </div>

                    <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                      <button
                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => setShowModalEditarVenta(false)}
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

      {showModalEditarProd ? (
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
                    Editar Productos
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModalEditarProd(false)}
                  >
                    <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  {prodEditar && prodEditar.map(prod =>
                    <div key={prod.idproductosventa}>
                      <input
                      className="block text-center w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      type="text" id={'nombre'+prod.idproductosventa} defaultValue={prod.nombreproducto}/>
                      <input 
                      className="block text-center w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      type="number" min={1} id={'cant'+prod.idproductosventa} defaultValue={prod.cantidad}/>
                      <input 
                      className="block text-center w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      type="number" min={0} id={'valor'+prod.idproductosventa} defaultValue={prod.valor}/>
                      <button
                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => eliminarProducto(prod.idproductosventa)}
                      >
                        Eliminar
                      </button>
                      <button
                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button" onClick={()=>onSubmitEditarProd(prod.idproductosventa)}
                      >
                        Editar
                      </button>
                    </div>
                    )}

                    <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                      <button
                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button" id="fin" onClick={finalizarEdit}
                      >
                        Finalizar
                      </button>
                    </div>
                </div>
                
                
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}

      {showModalVerVenta ? (
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
                    Detalles venta
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModalVerVenta(false)}
                  >
                    <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  
                  <div className='bg-gray-300 p-3 rounded-xl'> 
                    <p className='text-xl text-black'>Información cliente</p>
                    <p className='text-black'> Nombre: {vVenta.nombreDueno}</p>
                    <p className='text-black'> Telefono: {vVenta.telefono}</p>
                    <p className='text-xl text-black'>Informacion de la compra</p>

                    {productos && productos.map(prod => 
                    <div key={prod.idproductosventa}>
                      <p className='text-black'> Nombre: {prod.nombreproducto}</p>
                      <p className='text-black'> Cantidad: {prod.cantidad}</p>
                      <p className='text-black'> Precio: {prod.valor}</p>   
                    </div>
                    )}
                      <p className='text-black'> Total de la venta: {vVenta.valortotal}</p>  
                    
                  </div>
                  <div className="flex items-center justify-center p-6 border-t border-solid border-slate-200 rounded-b">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setShowModalVerVenta(false)}
                    >
                      Cerrar
                    </button>
                  </div>

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

