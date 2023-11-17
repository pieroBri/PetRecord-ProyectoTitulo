import { getMascotasDueno} from '../api/mascota/mascotas.api'
import { getAlergiasMascota } from '../api/mascota/alergias.api'
import { useState, useEffect, useRef } from 'react'
import { FaDog, FaDownload, FaPen } from 'react-icons/fa6'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { getFichasMedMascota } from '../api/fichamedica/fichasMedicas.api'
import { getFichasOpMascota } from '../api/fichamedica/fichaOperacion.api'
import { getFichasSedMascota } from '../api/fichamedica/fichaSedacion.api'
import { getFichasHosptMascota } from '../api/fichamedica/fichasHospt.api'
import { getFechasOw } from '../api/veterinaria/FechasSolicitadas.api'
import { getVacunaSumPet } from '../api/fichamedica/vacunasSumConsultas.api'
import { getTratConsultaPet } from '../api/fichamedica/tratamientosConsultas.api'
import { getRecetaMedicaPet } from '../api/fichamedica/recetasMedicas.api'
import { getMedConsPet } from '../api/fichamedica/medicamentosConsultas.api'
import { useForm } from 'react-hook-form'
import { useReactToPrint } from 'react-to-print'
import axios from 'axios'

export function MascotasUsuario() {
  const [mascotas, setMascotas] = useState([])
  const [pet, setPet] = useState()
  const [nombreMascotaPDF, setNombre] = useState()
  const [date, setDate] = useState()

  const [fichasMedicas, setFichas] = useState([])
  const [fichasOp, setFichasOp] = useState([])
  const [fichasSed, setFichasSed] = useState([])
  const [fichasHospt, setFichasHopst] = useState([])
  const [tratCons, setTratCons] = useState([])
  const [medCons, setMedCons] = useState([])
  const [recetaCons, setReceta] = useState([])

  const [idFoto, setIdFoto] = useState()

  const [alergias, setAlergias] = useState([])
  const [vacPet, setVacPet] = useState([])
  const [modalMascota, setshowModalMascota] = useState(false)

  const [form, setForm] = useState()

  const [modalEditarImagen, setModalEditarImagen] = useState(false)

  const rutDueno = window.localStorage.getItem("id")

  const componentPDF = useRef()


  useEffect(()=>{ 
  async function buscarMascotas(){

    let pets = []
    try {
      pets = await getMascotasDueno(rutDueno)
      // console.log(pets)
      setMascotas(pets.data)
    } catch (error) {
      console.log(error.response)
    }

    const fecha = new Date()
    setDate(fecha.toLocaleDateString().split('T')[0])
  }

  async function cargarCitasAlerta(){

    const flagcitas = document.cookie.split(';').find((row) => row == "citas=1")
    if(!flagcitas){
      document.cookie = 'citas=1'
      const hoy = new Date()
      let citas
      try {
        citas = await getFechasOw(rutDueno, hoy.toISOString().split('T')[0])
      } catch (error) {
        console.log("no hay citas")
      }
  
      citas = citas.data
          
        citas = citas.sort((a, b) =>
           { const nameA = a.fechainicial; // ignore upper and lowercase
            const nameB = b.fechainicial; // ignore upper and lowercase
            if (nameA < nameB) {
              return -1;
            }
            if (nameA > nameB) {
              return 1;
            }
        
            // names must be equal
            return 0;})
  
      // console.log(citas)
      if(citas.length > 0){
        const cita = new Date(citas[0].fechainicial)
        if((hoy.getFullYear() == cita.getFullYear()) && (hoy.getMonth() == cita.getMonth()) && (cita.getDate() - hoy.getDate() <= 3)){
          let mes = parseInt(cita.getMonth()) + 1
          alert("Tienes una cita el día " + cita.getDate() + "/" + mes + "/" + cita.getFullYear() + " revisa tu calendario para más información")
        }
      }
    }
  }

  buscarMascotas()
  cargarCitasAlerta()
},[])

  async function setMascota(mascota){

    setPet(mascota)

    // console.log(mascota.imagen)
    setNombre(mascota.nombremascota)
    const fichasM = await getFichasMedMascota(mascota.idmascota)
    const fichasO = await getFichasOpMascota(mascota.idmascota)
    const fichasS = await getFichasSedMascota(mascota.idmascota)
    const fichasH = await getFichasHosptMascota(mascota.idmascota)

    const trat = await getTratConsultaPet(mascota.idmascota)
    const med = await getMedConsPet(mascota.idmascota)
    const recetas = await getRecetaMedicaPet(mascota.idmascota)
    setFichas(fichasM.data)
    setFichasOp(fichasO.data)
    setFichasSed(fichasS.data)
    setFichasHopst(fichasH.data)

    const vacunasPet = await getVacunaSumPet(mascota.idmascota)
    setVacPet(vacunasPet.data)

    setTratCons(trat.data)
    setMedCons(med.data)
    setReceta(recetas.data)

    let alergiasList = []
    
    try {
      alergiasList = await getAlergiasMascota(mascota.idmascota)
      // console.log(alergiasList)
      setAlergias(alergiasList.data)
    } catch (error) {
      console.log(error.response)
    }

  }

  function agregarFoto(id){
    setIdFoto(id)
    setModalEditarImagen(true)
  }

  const generatePDF = useReactToPrint({
    content: ()=>componentPDF.current,
    documentTitle:'Ficha medica' + nombreMascotaPDF + date,
    onAfetPrint:()=>alert("Documento guardado como pdf")
  })


  const agregarEditarFoto = (e)=>{
    const forme = document.getElementById('form')
    e.preventDefault
    const formData = new FormData(forme)
    formData.append('agregarEditarFoto', document.getElementById('foto').files[0])

    axios.post(
      'http://localhost:8000/mascota/subirFoto/' + idFoto, formData
    ).then(res =>
        window.alert(res.data.mensaje)
      )
    .catch(err => window.alert(err.response))
    
  }

  
  

  return (
    <div className='flex justify-center items-center lg:mt-40 lg:h-96 h-96'>
      
      {mascotas.length ? (
        <>
        <div className="flex bg-white rounded-2xl items-center lg:h-full h-3/4 p-5 ">
          <Carousel showThumbs={false} showStatus={false}>
            {mascotas && mascotas.map(mascota => 
              <div key={mascota.idmascota}>
                <div className='flex justify-center'>
                  <FaPen size="30px" color="black" className='mt-2 cursor-pointer' title='Editar foto' onClick={()=>agregarFoto(mascota.idmascota)}/>
                </div>
                <div className='text-black p-5 rounded-xl mt-2 mb-10 rounded-b-2xl cursor-pointer'  onClick={() => {setshowModalMascota(true); setMascota(mascota)}} style={{background : "#B7E4C7"}}>
                  <div className='flex justify-center'>
                    {mascota.imagen ? (
                      <img src={mascota.imagen} className='object-contain lg:h-40 h-24'/>
                    ):(
                      <FaDog className='lg:h-40 lg:w-40 h-20 w-20' color="black"/>
                    )}
                  </div>
                  <div className='flex justify-center'>
                    <p className='text-3xl text-black font-semibold mb-10'>{mascota.nombremascota}</p>
                  </div>
                </div>
              </div>
            )}
          </Carousel>
          </div>

      {modalMascota ? (
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
                      {pet.nombremascota}
                    </h3>
                    <button
                      className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                      onClick={() => setshowModalMascota(false)}
                    >
                      <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                        ×
                      </span>
                    </button>
                  </div>
                  {/*body*/}
                  <div className="relative text-black p-6 flex-auto" style={{background : "#B7E4C7"}}>
                  <div className="content-tabs">

                      <div className="border-b border-gray-200 px-4 dark:border-gray-700">
                        <nav className="flex flex-nowrap space-x-2" aria-label="Tabs" role="tablist">
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
      
                      <div className="mt-3 p-4">
                        <div id="basic-tabs-1" role="tabpanel" aria-labelledby="basic-tabs-item-1">
                          <div className="bg-white rounded whitespace-nowrap h-2/3 mt-5 p-5">
                            <p>ESPECIE: {pet.especie}</p>
                            <p>RAZA: {pet.raza}</p>
                            <p>COLOR: {pet.color}</p>
                            <p>FECHA DE NACIMIENTO: {pet.fechadenacimiento}</p>
                          </div>
                        </div>
                        <div id="basic-tabs-2" className="hidden" role="tabpanel" aria-labelledby="basic-tabs-item-2">
                          <div className="bg-white whitespace-nowrap overflow-x-scroll rounded w-2/3 h-2/3 mt-5 p-5">
                              {alergias && alergias.map(alergia =>
                                  <p key={alergia.idalergia}>{alergia.nombrealergia}</p>
                                )}
                              {alergias.length == 0 ? (
                                <p>No registra alergias</p>
                              ): null}
                            </div>
                          </div>
                        <div id="basic-tabs-3" className="hidden" role="tabpanel" aria-labelledby="basic-tabs-item-3">
                        {vacPet.length > 0 ?(
                          <>
                            <div className="bg-white rounded lg:w-2/3 lg:h-72 mt-5 p-5 whitespace-nowrap overflow-y-scroll">
                              <p>Vacunas aplicadas: </p>
                              {vacPet && vacPet.map(vacuna =>
                                <p key={vacuna.idvacunassuministradas}>-{vacuna.nombrevacuna}</p>
                                )}
                            </div>
                          </>
                        ) :(
                          <div className='block flex justify-center'>
                                <h3 className='text-black text-2xl text-bold'>No se han registrado vacunas aplicadas en nuestro sistema</h3>
                              </div>
                        )}
                        </div>
                        <div id="basic-tabs-4" className="hidden" role="tabpanel" aria-labelledby="basic-tabs-item-3">
                            {fichasMedicas.length > 0 ? (
                              <div className="mx-auto px-5 text-black max-h-72 overflow-y-scroll bg-white min-h-sceen">
                              {fichasMedicas && fichasMedicas.map(ficha => 
                              <div className="py-5 text-black" key={ficha.idfichamedica} ref={componentPDF}> 
                                <details className="group">
                                  <summary className="flex justify-between font-medium cursor-pointer list-none">
                                  <span className='text-xl font-bold border-b-2 border-red-300'> {ficha.veterinarioacargo} - {ficha.sucursalveterinaria} {ficha.fechaconsulta.split('T')[0]}</span>
                                    <span className="transition group-open:rotate-180">
                                          <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path>
                                          </svg>
                                    </span>
                                  </summary>
                                  <div className='flex justify-end mt-2' >
                                    <button onClick={()=> generatePDF()}
                                    className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none">
                                      <FaDownload size={"20px"}/>
                                    </button>
                                  </div>
                                  <div className='text-black' >
                                  <div className='bg-gray-200 mt-2 rounded-xl'>
                                    <p className='ml-2'>Fecha consulta: {ficha.fechaconsulta.split('T')[0]}</p>
                                    <p className='ml-2'>Peso: {ficha.peso}</p>
                                    <p className='ml-2'>Edad: {ficha.edad}</p>
                                    <p className='ml-2'>Temperatura: {ficha.temperatura}</p>
                                    <p className='ml-2'>Frecuencia Respiratoria: {ficha.frecuenciarespiratoria}</p>
                                    <p className='ml-2'>Frecuencia Cardiaca: {ficha.frecuenciacardiaca}</p>
                                  </div>
                                  {fichasHospt && fichasHospt.map( fichaHopst =>
                                  <>
                                  {fichaHopst.fichamedica_idfichamedica == ficha.idfichamedica ? (
                                    <div className='bg-gray-200 mt-2 rounded-xl'>
                                      <p className='ml-2'>Hospitalización</p>
                                      <p className='ml-2'>Motivo: {fichaHopst.motivohospitalización}</p>
                                    </div>
                                  ):null}

                                  </>
                                  )}
                                  <div className='bg-gray-200 mt-2 rounded-xl'>
                                    <>
                                      {fichasOp && fichasOp.map (fichaOp =>
                                      <> 
                                      {fichaOp.fichamedica_idfichamedica == ficha.idfichamedica ?
                                      (
                                        <>
                                        <p className='ml-2'>Diagnóstico: {fichaOp.diagnostico}</p>
                                        <p className='ml-2'>Operación Realizada: {fichaOp.cirugiaarealizar}</p>
                                        </>
                                      ):null}
                                        </>
                                      )}
                                  </>
                                  {fichasSed && fichasSed.map(fichaSed => 
                                    <>
                                      {fichaSed.fichamedica_idfichamedica == ficha.idfichamedica ? (
                                        <>
                                        {fichaSed.autorizacióntutor ? (<p className='ml-2'>El tutor a autorizado la sedacion</p>) : <p className='ml-2'>El tutor no a autorizado la sedacion</p>}
                                        </>
                                      ):null}
                                    </>
                                    )}
                                  </div>

                                  <div className='bg-gray-200 mt-2 rounded-xl'>
                                    {tratCons && tratCons.map (tratamiento =>
                                      <> 
                                      {tratamiento.fichamedica_idfichamedica == ficha.idfichamedica ?
                                      (
                                        <>
                                        <p className='ml-2'>Causa de la visita: {tratamiento.caudadelavisita}</p>
                                        <p className='ml-2'>Tratamientos: {tratamiento.nombretratamientos}</p>
                                        </>
                                      ):null}
                                        </>
                                      )}

                                      {medCons && medCons.map (medicamento =>
                                      <> 
                                      {medicamento.fichamedica_idfichamedica == ficha.idfichamedica ?
                                      (
                                        <>
                                        <p className='ml-2'>Nombre medicamento: {medicamento.nombremedicamentos}</p>
                                        </>
                                      ):null}
                                        </>
                                      )}

                                      {vacPet && vacPet.map (vacuna =>
                                      <> 
                                      {vacuna.fichamedica_idfichamedica == ficha.idfichamedica ?
                                      (
                                        <>
                                        <p className='ml-2'>Nombre de la vacuna: {vacuna.nombrevacuna}</p>
                                        </>
                                      ):null}
                                        </>
                                      )}

                                      {recetaCons && recetaCons.map (receta =>
                                      <> 
                                      {receta.fichamedica_idfichamedica == ficha.idfichamedica ?
                                      (
                                        <>
                                        <p className='ml-2'>Prescripción: {receta.prescripcion}</p>
                                        </>
                                      ):null}
                                        </>
                                      )}
                                  </div>
                                  </div>
                                  
                                </details>
                              </div>
                            )}
                              </div>
                            ):(
                              <div className='block flex justify-center'>
                                <h3 className='text-black text-2xl text-bold'>No se han registrado fichas en nuestro sistema</h3>
                              </div>
                            )} 

                            
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                            
                            
                </div>
                            
        </>
      ) : null}


      {modalEditarImagen ? (
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
                    Agregar/Editar Foto Mascota
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setModalEditarImagen(false)}
                    
                  >
                    <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative text-black p-6 flex-auto">
                  <form className='space-y-5' id="form">
                    <div>
                      <input type="file" accept='image/png, image/jpg, image/jpeg' name="agregarEditarFoto" id="foto"
                      className="block text-center w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      
                      />
                    </div>
                  <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setModalEditarImagen(false)}
                    >
                      Cancelar
                    </button>
                    
                    <button
                      className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      onClick={agregarEditarFoto}
                      
                    >
                      Agregar
                    </button>
                    
                  </div>
                  </form>
                      
              </div>        
            </div>
          </div>      
        </div>
      </>
      ) : null}
          </>
          
        ):null}
      


    </div>
      
  )
}

