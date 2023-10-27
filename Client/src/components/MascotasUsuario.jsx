import { getMascotasDueno} from '../api/mascota/mascotas.api'
import { getAlergiasMascota } from '../api/mascota/alergias.api'
import { useState, useEffect } from 'react'
import { FaDog, FaAngleRight, FaAngleLeft } from 'react-icons/fa6'
import {Carousel} from 'react-responsive-carousel'
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { getFichasMedMascota } from '../api/fichamedica/fichasMedicas.api'
import { getFichasOpMascota } from '../api/fichamedica/fichaOperacion.api'
import { getFichasSedMascota } from '../api/fichamedica/fichaSedacion.api'
import { getFichasHosptMascota } from '../api/fichamedica/fichasHospt.api'
import { getFechasOw } from '../api/veterinaria/FechasSolicitadas.api'

export function MascotasUsuario() {
  const [mascotas, setMascotas] = useState([])
  const [pet, setPet] = useState()

  const [fichasMedicas, setFichas] = useState([])
  const [fichasOp, setFichasOp] = useState([])
  const [fichasSed, setFichasSed] = useState([])
  const [fichasHospt, setFichasHopst] = useState([])

  const [alergias, setAlergias] = useState([])

  const [modalMascota, setshowModalMascota] = useState(false)

  const rutDueno = window.localStorage.getItem("id")
  


  useEffect(()=>{
  async function buscarMascotas(){

    let pets = []
    try {
      pets = await getMascotasDueno(rutDueno)
      // console.log(pets)
      setMascotas(pets.data)
    } catch (error) {
      console.log("error")
    }

  }

  async function cargarCitasAlerta(){

    const hoy = new Date()
    const citas = await getFechasOw(rutDueno, hoy.toISOString().split('T')[0])

    console.log(citas.data)
    
    const cita = new Date(citas.data[0].fechainicial)
    console.log(cita.getDate())

    if((hoy.getFullYear() == cita.getFullYear()) && (hoy.getMonth() == cita.getMonth()) && (cita.getDate() - hoy.getDate() <= 3)){
      let mes = parseInt(cita.getMonth()) + 1
      alert("Tienes una cita el día " + cita.getDate() + "/" + mes + "/" + cita.getFullYear() + " revisa tu calendario para más información")
    }
  }

  buscarMascotas()
  cargarCitasAlerta()
},[])

  async function setMascota(mascota){

    setPet(mascota)

    const fichasM = await getFichasMedMascota(mascota.idmascota)
    const fichasO = await getFichasOpMascota(mascota.idmascota)
    const fichasS = await getFichasSedMascota(mascota.idmascota)
    const fichasH = await getFichasHosptMascota(mascota.idmascota)

    setFichas(fichasM.data)
    setFichasOp(fichasO.data)
    setFichasSed(fichasS.data)
    setFichasHopst(fichasH.data)

    let alergiasList = []
    
    try {
      alergiasList = await getAlergiasMascota(mascota.idmascota)
      console.log(alergiasList)
      setAlergias(alergiasList.data)
    } catch (error) {
      console.log("error")
    }

  }

  return (
    <div className='flex justify-center'>
      <div className="bg-white flex items-center p-5 rounded-2xl">
      <Carousel showThumbs={false}>
      {mascotas && mascotas.map(mascota => 
          <div className='text-black p-5 rounded-xl cursor-pointer' key={mascota.idmascota} onClick={() => {setshowModalMascota(true); setMascota(mascota)}} style={{background : "#B7E4C7"}}>
            <div className='flex justify-center'>
              <FaDog className='lg:h-32 lg:w-32 mb-5 h-16 w-16'/> 
            </div>
            <div className='flex justify-center'>
              <p className='text-3xl text-black font-semibold mb-10'>{mascota.nombremascota}</p>
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
                        <p className="text-gray-500 dark:text-gray-400">
                          This is the <em className="font-semibold text-gray-800 dark:text-gray-200">third</em> item's tab body.
                        </p>
                      </div>
                      <div id="basic-tabs-4" className="hidden" role="tabpanel" aria-labelledby="basic-tabs-item-3">
                        <div className="mx-auto px-5 text-black max-h-72 overflow-y-scroll bg-white min-h-sceen">
    	                    <div className="mx-auto">
                          {fichasMedicas && fichasMedicas.map(ficha => 
                            <div className="py-5" key={ficha.idfichamedica}> 
                              <details className="group">
                                <summary className="flex justify-between font-medium cursor-pointer list-none">
                                <span className='text-xl font-bold border-b-2 border-red-300'> {ficha.veterinarioacargo} {ficha.sucursalveterinaria} {ficha.fechaconsulta.split('T')[0]}</span>
                                  <span className="transition group-open:rotate-180">
                                        <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path>
                                        </svg>
                                  </span>
                                </summary>
                                <div className='bg-gray-200 mt-2 rounded-xl'>
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
                              </details>
                            </div>
                          )}
    	                    	
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                
              </div>
            </div>
          </div>
      
      </>
    ) : null}


    </div>
      
  )
}

