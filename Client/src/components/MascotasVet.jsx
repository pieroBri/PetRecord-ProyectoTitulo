import { useState, useEffect } from 'react'
import {getUserVet} from "../api/usuarios/user_vet.api"
import {createMascota, getMascota} from '../api/mascota/mascotas.api'
import { getUserDueno } from '../api/usuarios/user_dueno.api'
import { useForm } from 'react-hook-form'
import {FaDog, FaTrashCan} from 'react-icons/fa6'
import { getAlergiasMascota, createAlergia, getAlergia, eliminarAlergia, actualizarAlergia, getAllAlergias } from '../api/mascota/alergias.api'
import {tab} from '@preline/tabs'
import {FaPlus, FaPencil, FaRegTrashCan, FaEye} from 'react-icons/fa6'
import { createTabla, getAllTablas, getTabla } from '../api/veterinaria/tablasMedicas.api'
import { getVeterinaria } from '../api/veterinaria/veterinarias.api'
import { actualizarFichaMed, createFichaMed, eliminarFichaMed, getAllFichaMed, getFichaMed, getFichasMedMascota } from '../api/fichamedica/fichasMedicas.api'
import { actualizarFichaOp, createFichaOp, getAllFichaOp, getFichasOpMascota, getFichasOpMed } from '../api/fichamedica/fichaOperacion.api'
import { actualizarFichaSed, createFichaSed, getAllFichaSed, getFichasSedMascota, getFichasSedMed } from '../api/fichamedica/fichaSedacion.api'
import { actualizarFichaHospt, createFichaHospt, getAllFichaHospt, getFichasHosptMascota, getFichasHosptMed } from '../api/fichamedica/fichasHospt.api'
import { actualizarMedCons, createMedCons, eliminarMedCons, getAllMedCons, getMedConsMed } from '../api/fichamedica/medicamentosConsultas.api'
import { actualizarTratConsulta, createTratConsulta, getAllTratConsultas, getTratConsulta, getTratConsultaMed } from '../api/fichamedica/tratamientosConsultas.api'
import { actualizarVacunaSum, createVacunaSum, eliminarVacunaSum, getAllVacunasSum, getVacunaSumMed, getVacunaSumPet } from '../api/fichamedica/vacunasSumConsultas.api'
import { actualizarRecetaMedica, createRecetaMedica, getAllRecetasMedicas, getRecetaMedicaMed } from '../api/fichamedica/recetasMedicas.api'



export function MascotasVet() {
  const [found, setFound] = useState()
  const [mascota, setMascota] = useState()
  const [dueno, setDueno] = useState()
  const [mascotaBuscada, setMascotaBuscada] = useState()
  const [alergias, setAlergias] = useState([])
  const [fichasMedicas, setFichas] = useState([])
  const [fichaMedica, setFicha] = useState()
  const [fichaOp, setFichaOp] = useState([])
  const [fichaSed, setFichaSed] = useState([])
  const [fichaHospt, setFichaHospt] = useState([])
  const [vacPet, setVacPet] = useState([])
  const [opPet, setOpPet] = useState([])

  const [tratCons, setTratCons] = useState()
  const [recetaCons, setRecetaCons] = useState([])
  const [medCons, setMedCons] = useState([])
  const [vacCons, setVacCons] = useState([])

  const [alergia, setAlergia] = useState()
  const [tablaPet, setTabla] = useState()
  const [veterinaria, setVet] = useState()
  const [dateStr, setDate] = useState()
  const [idFichaCreada, setFichaCreada] = useState()

  const [showModalAnadir, setShowModalAnadir]= useState(false)

  const [showModalAnadirAlergia, setShowModalAnadirAlergia]= useState(false)
  const [showModalEditarAlergia, setShowModalEditarAlergia]= useState(false) 

  const [showModalFicha, setShowModalFicha]= useState(false)
  const [showModalVerFicha, setShowModalVerFicha]= useState(false)
  const [showModalEditarFicha, setShowModalEditarFicha]= useState(false)

  const [showModalTrat, setShowModalTrat]= useState(false)
  const [showModalEditarTrat, setShowModalEditarTrat]= useState(false)
  const [showModalEditarVacMed, setShowModalEditarVacMed] = useState(false)

  const {register, reset, handleSubmit, formState:{errors}} = useForm()


  useEffect(()=>{
    async function cargarVet(){
      const veterinario = await getUserVet(window.localStorage.getItem('id'))
      console.log(veterinario.data.veterinaria_idveterinaria)
      const vet = veterinario.data.veterinaria_idveterinaria

      const vetSet= await getVeterinaria(vet)

      setVet(vetSet.data)
      window.localStorage.setItem('idVeterinaria', vet)

      const date = new Date() 
      let fechaHoy
      if((parseInt(date.getMonth())+1) < 10){
        fechaHoy = date.getFullYear() + '-' + '0'+(parseInt(date.getMonth())+1).toString() + '-'
      }else{
        fechaHoy = date.getFullYear() + '-' + (parseInt(date.getMonth())+1).toString() + '-'
      }
      if(parseInt(date.getDate()) < 10){
        fechaHoy += '0' + parseInt(date.getDate()).toString()
      }else{
        fechaHoy += parseInt(date.getDate()).toString()
      }
      setDate(fechaHoy)
    }

    cargarVet()

    },[])


    const buscarMascota = async() => {

      const idMascota = document.getElementById("mascota").value
      let pet 
      let owner
      let alergiasList
      let table
      let vet = veterinaria.idveterinaria
      setMascotaBuscada(idMascota)
      if(idMascota.length > 0){
        try {
          pet = await getMascota(idMascota)
          setMascota(pet)
          owner = await getUserDueno(pet.data.usuariodueño_rut)
          setDueno(owner)
          setFound(true)
        } catch (error) {
          setFound(false)
        }

        try {
          alergiasList = await getAlergiasMascota(idMascota)
          setAlergias(alergiasList.data)
        } catch (error) {
          alergiasList = await getAlergiasMascota(idMascota)
        }

        table = await getTabla(vet, idMascota)
        console.log(table.data[0])
        if(table.data[0] != null){
          setTabla(table.data[0])
        }

        const fichasMascota =  await getFichasMedMascota(idMascota)
        setFichas(fichasMascota.data) 

        const operacionesPet = await getFichasOpMascota(idMascota)
        setOpPet(operacionesPet.data)

        const vacunasPet = await getVacunaSumPet(idMascota)
        setVacPet(vacunasPet.data)
      }else{
        setFound(null)
      }
    }

    const onSubmitAnadir = handleSubmit(async data =>{


      const fecha = new Date(data.FechaDeNacimiento + 'T17:00:00').toLocaleString()
      const fechaFinal = fecha.split(',')
      
      const vet = veterinaria.idveterinaria
      data.FechaDeNacimiento = fechaFinal[0]
      console.log(data)
      let tabla
      const tablas = await getAllTablas()
      console.log(tablas.data.length)

      if(tablas.data.length > 0){
          tabla = {
          idtablamedica : parseInt(tablas.data[tablas.data.length-1].idtablamedica) + 1,
          mascota_idmascota : data.idmascota,
          veterinaria_idveterinaria : vet
        }
      }else{
          tabla = {
          idtablamedica : 0,
          mascota_idmascota : data.idmascota,
          veterinaria_idveterinaria : vet
        }
      }
      const res = await createMascota(data)
      
      await createTabla(tabla)
      setShowModalAnadir(false)
  
      let pet = await getMascota(data.idmascota)
      let owner = await getUserDueno(data.usuariodueño_rut)

      setMascota(pet)
      setDueno(owner)
      setFound(true)
      reset()
    })

// ------------------------------- ALERGIAS -----------------------------------------------------------------------

    const onSubmitAnadirAlergia = handleSubmit(async data =>{

      const alergiasTotales = await getAllAlergias() 
      if(alergiasTotales.data.length == 0){
        data.idalergias = 0
      }else{
        console.log(parseInt(alergiasTotales.data[alergiasTotales.data.length - 1].idalergias))
        data.idalergias = parseInt(alergiasTotales.data[alergiasTotales.data.length - 1].idalergias) + 1;
      }

      const res = await createAlergia(data)
      console.log(res)
      setShowModalAnadirAlergia(false)
      
      const alergiasActuales = await getAlergiasMascota(mascota.data.idmascota)
      setAlergias(alergiasActuales.data)
      reset()
    })
    

    async function deleteAlergia(id){

      const alergiaEliminar = await getAlergia(id);
      let res = window.confirm(`Esta seguro que desea eliminar ${alergiaEliminar.data.nombrealergia}`)
      if(res){
        await eliminarAlergia(id)
        const alergiasActuales = await getAlergiasMascota(mascota.data.idmascota)
        setAlergias(alergiasActuales.data)
      }
    }

    async function editarAlergia(id){
      const alergiaEditar = await getAlergia(id);
      reset()
  
      setAlergia(alergiaEditar)
      setShowModalEditarAlergia(true)
    }

    const onSubmitEditarAlergia = handleSubmit(async data =>{

      const res = await actualizarAlergia(data.idalergias, data)
      console.log(res)
      setShowModalEditarAlergia(false)
  
      const alergiasActuales = await getAlergiasMascota(mascota.data.idmascota)
      setAlergias(alergiasActuales.data)
      reset()
    })

// ------------------------------- FIN ALERGIAS -----------------------------------------------------------------------


// ------------------------------- FICHAS MEICAS -----------------------------------------------------------------------

    const crearFichaMedica = handleSubmit (async data =>{
      
      let veterinario = await getUserVet(window.localStorage.getItem('id'))
      let tablaVet = null
      const allTablas = await getAllTablas()
      
      if(tablaPet){
        data.tablamedica_idtablamedica = tablaPet.idtablamedica
      }else{
        tablaVet = {
          idtablamedica : parseInt(allTablas.data[allTablas.data.length-1].idtablamedica) + 1,
          mascota_idmascota : data.mascota_idmascota,
          veterinaria_idveterinaria : veterinaria.idveterinaria
        }
        data.tablamedica_idtablamedica = tablaVet.idtablamedica
        await createTabla(tablaVet)
        setTabla(tablaVet)
      }
      
      data.sucursalveterinaria = veterinaria.nombreveterinaria
      data.veterinarioacargo = veterinario.data.nombres + ' ' + veterinario.data.apellidos

      let fichas = await getAllFichaMed();

      if(fichas.data.length == 0){
        data.idfichamedica = '0'
      }else{
        data.idfichamedica = parseInt(fichas.data[fichas.data.length - 1].idfichamedica)+ 1
      }

      setFichaCreada(data.idfichamedica)
      await createFichaMed(data);

      if(data.operación){
        let fichasOp = await getAllFichaOp();

        if(fichasOp.data.length == 0){
          data.idfichaoperación = 0
        }else{
          data.idfichaoperación = parseInt(fichasOp.data[fichasOp.data.length - 1].idfichaoperación) + 1
        }

        
        data.autorizaciontutor = 1
        data.fichamedica_idfichamedica = data.idfichamedica

        await createFichaOp(data)
      }

      if(data.sedación){
        
        let fichasSed = await getAllFichaSed();

        if(fichasSed.data.length == 0){
          data.idfichasedación = 0
        }else{
          data.idfichasedación = parseInt(fichasSed.data[fichasSed.data.length - 1].idfichasedación) + 1
        }

        data.autorizacióntutor = 1
        data.fichamedica_idfichamedica = data.idfichamedica

        await createFichaSed(data)
      }

      if(data.hospitalización){

        let fichasHospt = await getAllFichaHospt();

        if(fichasHospt.data.length == 0){
          data.idfichahospitalización = 0
        }else{
          data.idfichahospitalización = parseInt(fichasHospt.data[fichasHospt.data.length - 1].idfichahospitalización) + 1
        }
        
        data.fichamedica_idfichamedica = data.idfichamedica

        await createFichaHospt(data)
      }

      const fichasMascota =  await getFichasMedMascota(mascota.data.idmascota)
      setFichas(fichasMascota.data) 


      setShowModalFicha(false)
      setShowModalTrat(true)

 
    })

    const cirugiaText = () =>{
      // console.log("HOLA")
      const cirugia = document.getElementById('textCirugia')
      const diagnostico = document.getElementById('textDiagnostico')

      if(cirugia.classList.contains("hidden")){
        cirugia.classList.remove("hidden")
      }else{
        cirugia.classList.add("hidden")
      }

      if(diagnostico.classList.contains("hidden")){
        diagnostico.classList.remove("hidden")
      }else{
        diagnostico.classList.add("hidden")
      }
    }

    const hosptText = () =>{

      const hospt = document.getElementById('textHospt')

      if(hospt.classList.contains("hidden")){
        hospt.classList.remove("hidden")
      }else{
        hospt.classList.add("hidden")
      }
    }

    const medicamentosText = () =>{
      // console.log("HOLA")
      const med = document.getElementById('textMedicamentos')
      const buttonMed = document.getElementById('buttonMed')

      if(med.classList.contains("hidden")){
        med.classList.remove("hidden")
      }else{
        med.classList.add("hidden")
      }

      if(buttonMed.classList.contains("hidden")){
        buttonMed.classList.remove("hidden")
      }else{
        buttonMed.classList.add("hidden")
      }

    }

    const vacunasText = () =>{

      const vac = document.getElementById('textVacunas')
      const buttonVac = document.getElementById('buttonVac')

      if(vac.classList.contains("hidden")){
        vac.classList.remove("hidden")
      }else{
        vac.classList.add("hidden")
      }

      if(buttonVac.classList.contains("hidden")){
        buttonVac.classList.remove("hidden")
      }else{
        buttonVac.classList.add("hidden")
      }

    }

    const recetaText = () =>{

      const receta = document.getElementById('textReceta')

      if(receta.classList.contains("hidden")){
        receta.classList.remove("hidden")
      }else{
        receta.classList.add("hidden")
      }
    }

    async function modalFichas(opc, idFicha){

      const ficha = await getFichaMed(idFicha)
      const fichaOP = await getFichasOpMed(idFicha)
      const fichaSED = await getFichasSedMed(idFicha)
      const fichaHOPST = await getFichasHosptMed(idFicha)
      const TratCons = await getTratConsultaMed(idFicha)
      const MedCons = await getMedConsMed(idFicha)
      const VacCons = await getVacunaSumMed(idFicha)
      const RecetaCons = await getRecetaMedicaMed(idFicha)

      ficha.data.fechaconsulta = ficha.data.fechaconsulta.split('T')[0]

      setFicha(ficha.data)
      setFichaOp(fichaOP.data[0])
      setFichaHospt(fichaHOPST.data[0])
      setFichaSed(fichaSED.data[0])

      setTratCons(TratCons.data[0])
      setRecetaCons(RecetaCons.data[0])
      setVacCons(VacCons.data)
      setMedCons(MedCons.data)

      if(opc == 0){
        setShowModalVerFicha(true)
      }else{
        setShowModalEditarFicha(true)
      }

    }

    async function deleteFicha(idFicha){
      
      const fichaEliminar = await getFichaMed(idFicha);
      let res = window.confirm(`Esta seguro que desea eliminar la ficha del día ${fichaEliminar.data.fechaconsulta.split('T')[0]}`)
      if(res){
        await eliminarFichaMed(idFicha)
        const fichasActuales = await getFichasMedMascota(mascota.data.idmascota)
        setFichas(fichasActuales.data)
      }
      
    }

    function cerrarModalEditar(){
      reset()
      setShowModalEditarFicha(false)
    }

    const editarFichaMedica = handleSubmit( async data => {
      console.log(data)

      data.fechaconsulta = document.getElementById('fechaconsulta').value
      console.log(data.fechaconsulta)
      data.fichamedica_idfichamedica = data.idfichamedica

      if(data.operación == null){
        data.operación = true

        const fichaOP = await getFichasOpMed(data.idfichamedica)
        data.idfichaoperación = fichaOP.data[0].idfichaoperación
        data.autorizaciontutor = 1
        await actualizarFichaOp(fichaOP.data[0].idfichaoperación, data)
      }

      if(data.hospitalización == null){
        
        const fichaHOPST = await getFichasHosptMed(data.idfichamedica)
        data.hospitalización = true
        data.idfichahospitalización = fichaHOPST.data[0].idfichahospitalización
        console.log(data)
        await actualizarFichaHospt(fichaHOPST.data[0].idfichahospitalización, data)
      }

      if(data.sedación == null){
        const fichaSED = await getFichasSedMed(data.idfichamedica)
        data.sedación = true
        data.autorizacióntutor = 1
        data.idfichasedación = fichaSED.data[0].idfichasedación
        await actualizarFichaSed(fichaSED.data[0].idfichasedación, data)
      }


      await actualizarFichaMed(data.idfichamedica, data)

      console.log(mascota.data.idmascota)
      const fichas = await getFichasMedMascota(mascota.data.idmascota) 
      console.log(fichas)
      setFichas(fichas.data)
      setShowModalEditarFicha(false)
      setShowModalEditarTrat(true)

    })

    const crearMedConsulta = async (idFicha)=>{
      const medFichas = await getAllMedCons()
      const nombreMed = document.getElementById("textMedicamentos").value
      let data 
        if(medFichas.data.length == 0){
          data = {
            idmedicamentosconsulta : 0,
            nombremedicamentos : nombreMed,
            fichamedica_idfichamedica : idFicha
          } 
        }else{
          data = {
            idmedicamentosconsulta : parseInt(medFichas.data[medFichas.data.length - 1].idmedicamentosconsulta) + 1, 
            nombremedicamentos : nombreMed,
            fichamedica_idfichamedica : idFicha
          } 
        }
        await createMedCons(data)
        const medElement = document.getElementById("textMedicamentos")
        medElement.value = null

    }

    const crearVacConsulta = async (idFicha)=>{
      const vacFichas = await getAllVacunasSum()
      const vacuna = document.getElementById("textVacunas").value
      let data
        if(vacFichas.data.length == 0){
          data = {
            idvacunassuministradas : 0,
            nombrevacuna : vacuna,
            fichamedica_idfichamedica : idFicha
          }
        }else{
          data = {
            idvacunassuministradas : parseInt(vacFichas.data[vacFichas.data.length - 1].idvacunassuministradas) + 1,
            nombrevacuna : vacuna,
            fichamedica_idfichamedica : idFicha
          }
        }
        await createVacunaSum(data)
        const vacunaElement = document.getElementById("textVacunas")
        vacunaElement.value = null
    }

    const crearTratConsulta = handleSubmit (async data =>{

      console.log(data)
      const tratCons = await getAllTratConsultas()
      if(tratCons.data.length == 0){
        data.idtratamientosconsulta = 0
      }else{
        data.idtratamientosconsulta = parseInt(tratCons.data[tratCons.data.length - 1].idtratamientosconsulta) + 1
      }

      await createTratConsulta(data)

      if(data.receta){
        const recetas = await getAllRecetasMedicas()
        data.rutveterinario = window.localStorage.getItem('id')
        console.log(data.prescripcion)
        if(recetas.data.length == 0){
          data.idrecetamedica = 0
        }else{
          data.idrecetamedica = parseInt(recetas.data[recetas.data.length - 1].idrecetamedica) + 1 
        }
        await createRecetaMedica(data)
      }


      setShowModalTrat(false)

 
    })

    const editarTratCons = handleSubmit( async data => {
    
      data.idtratamientosconsulta = tratCons.idtratamientosconsulta

      await actualizarTratConsulta(tratCons.idtratamientosconsulta, data)

      if(recetaCons){
        data.idrecetamedica = recetaCons.idrecetamedica
        data.rutveterinario = window.localStorage.getItem('id')
        await actualizarRecetaMedica(recetaCons.idrecetamedica, data)
      }

      setShowModalEditarTrat(false)
      
      if(vacCons || medCons){
        setShowModalEditarVacMed(true)
      }

    })

    const editarVacConsulta = async (idVac, idFicha)=> {
      const vacuna = document.getElementById(idVac).value

      const data = {
        idvacunassuministradas : idVac,
        nombrevacuna : vacuna,
        fichamedica_idfichamedica : idFicha
      }

      await actualizarVacunaSum(idVac, data)
      window.alert('Modificación exitosa')
    }

    const editarMedConsulta = async (idMed, idFicha) => {
      const medicamento = document.getElementById(idMed).value
      console.log(medicamento + ' ' + idFicha)

      const data = {
        idmedicamentosconsulta : idMed,
        nombremedicamentos : medicamento,
        fichamedica_idfichamedica : idFicha
      }

      await actualizarMedCons(idMed, data)
      window.alert('Modificación exitosa')
    }

    const eliminarVacConsulta = async (idVac)=> {
      
      const vac = document.getElementById(idVac)
      const conf= window.confirm('Desea eliminar la vacuna ' + vac.value)
      if(conf){
        await eliminarVacunaSum(idVac)
        
        const vacEdit = document.getElementById(idVac + '-editar')
        const vacDel = document.getElementById(idVac + '-delete')

        vac.classList.add("hidden")
        vacEdit.classList.add("hidden")
        vacDel.classList.add("hidden")
      }
    }

    const eliminarMedConsulta = async (idMed) => {
      const med = document.getElementById(idMed)
      const conf= window.confirm('Desea eliminar el medicamento ' + med.value)
      console.log(conf)
      if(conf){
        await eliminarMedCons(idMed)
        const medEdit = document.getElementById(idMed + '-editar')
        const medDel = document.getElementById(idMed + '-delete')

        med.classList.add("hidden")
        medEdit.classList.add("hidden")
        medDel.classList.add("hidden")
      }
    }
    


// ------------------------------- FIN FICHAS MEICAS -----------------------------------------------------------------------

  return (
    <div className="w-full bg-gray-300">
      <div className='py-10 w-full h-1 flex justify-center items-center'>
        
        <input type="text" id="mascota" maxLength="15" onChange={ buscarMascota } placeholder="buscar mascota" style={{background:"#D8F3DC"}}
        className="text-center block rounded-md w-64 border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/> 

      </div>
      <div className='flex justify-center h-3/4'>
        {found ? ( 
          <>
          <div className='text-black w-3/4 rounded lg:mt-10 min-h-full overflow-y-scroll' style={{background : "#B7E4C7"}}>
            <div className='flex border-b-2 border-solid border-black mx-5 '>
              <FaDog className='lg:ml-10 lg:mt-10 lg:h-32 lg:w-32 h-16 w-16'/> 
              <p className='text-3xl text-black font-semibold ml-10 lg:mt-20 mt-5'>{mascota.data.nombremascota}</p>
              <br />
            </div>
            <div className="text-black text-lg lg:mx-5 mt-5 ">
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
                    <div className="bg-white rounded lg:w-2/3 overflow-y-scroll h-32 lg:h-60 mt-2 p-5 whitespace-nowrap">
                      <p>ESPECIE: {mascota.data.especie}</p>
                      <p>RAZA: {mascota.data.raza}</p>
                      <p>COLOR: {mascota.data.color}</p>
                      <p>FECHA DE NACIMIENTO: {mascota.data.fechadenacimiento}</p> 
                      {opPet.length > 0 ?(
                        
                        <p>Operaciónes realizadas:
                          {opPet && opPet.map(operacion =>
                            <p key={operacion.idfichaoperación}> -{operacion.cirugiaarealizar}</p>
                            )}
                        </p>
                      ):null}
                    </div>
                    <div className="bg-white rounded lg:w-2/3 lg:h-40 mt-2 p-5 whitespace-nowrap overflow-x-scroll">
                      <p>RUT DUEÑO: {dueno.data.rut}</p>
                      <p>TELEFONO: {dueno.data.telefono}</p>
                      <p>DIRECCION: {dueno.data.direccion}</p>
                    </div>
                  </div>
                  <div id="basic-tabs-2" className="hidden" role="tabpanel" aria-labelledby="basic-tabs-item-2">
                  {alergias.length == 0 ? (
                  <> 
                    <div className='block flex justify-center'>
                      <h3 className='text-black text-2xl text-bold'>No se han encontrado alergias en nuestro sistema</h3>
                    </div>
                    <div className='flex justify-center mt-5'>
                      <button
                      className="bg-emerald-500 text-white active:bg-emerald-600 font-semi-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none"
                      onClick={() => setShowModalAnadirAlergia(true)}>
                        Agregar Alergia
                      </button>
                    </div>
                  </>
                  ):(
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
                  )}
                  
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
                    {fichasMedicas.length < 1 ? (
                      <> 
                          <div className='block flex justify-center'>
                            <h3 className='text-black text-2xl text-bold'>No se han encontrado fichas en nuestro sistema</h3>
                          </div>
                          <div className='flex justify-center mt-5'>
                            <button
                            className="bg-emerald-500 text-white active:bg-emerald-600 font-semi-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none"
                            onClick={() => setShowModalFicha(true)}>
                              Agregar Ficha
                            </button>
                          </div>
                      </>
                    ) : (<>
                    <div className="max-w-screen px-5 text-black lg:max-h-72 max-h-60 overflow-y-scroll">
                        <div className="max-w-full mt-8">
                        <button
                            className="bg-emerald-500 text-white active:bg-emerald-600 font-semi-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none"
                            onClick={() => setShowModalFicha(true)}>
                              Agregar Ficha
                            </button>
                      {fichasMedicas && fichasMedicas.map(ficha => 
                      <>
                        {tablaPet ? (
                          <>
                          {tablaPet.idtablamedica == ficha.tablamedica_idtablamedica ? 
                          (
                            <div className="py-3 min-w-full flex justify-between border-b border-black" key={ficha.idfichamedica}>
                              <div className='text-black font-semibold'>
                                <span> {ficha.veterinarioacargo}</span>
                                <span> {ficha.sucursalveterinaria}</span>
                                <span> {ficha.fechaconsulta.split('T')[0]}</span>
                              </div>
                              <div className='flex justify-between w-24'>
                                <FaEye className='cursor-pointer ' onClick={() => modalFichas(0, ficha.idfichamedica)}/>
                                <FaPencil className='cursor-pointer' onClick={() => modalFichas(1, ficha.idfichamedica)}/>
                                <FaRegTrashCan className='cursor-pointer' onClick={() => deleteFicha(ficha.idfichamedica)}/>
                              </div>    

                            </div>
                          )
                          : 
                          (
                            <div className="py-3 min-w-full flex justify-between border-b border-black" key={ficha.idfichamedica}>
                              <div className='text-black font-semibold'>
                                <span> {ficha.veterinarioacargo}</span>
                                <span> {ficha.sucursalveterinaria}</span>
                                <span> {ficha.fechaconsulta.split('T')[0]}</span>
                              </div>
                              <div className='flex justify-between w-24'>
                                <FaEye className='cursor-pointer ' onClick={() => modalFichas(0, ficha.idfichamedica)}/>
                              </div>    
                      
                            </div>
                          )}
                          
                        </>
                        )
                        :
                        (
                          <div className="py-3 min-w-full flex justify-between border-b border-black" key={ficha.idfichamedica}>
                            <div className='text-black font-semibold'>
                              <span> {ficha.veterinarioacargo}</span>
                              <span> {ficha.sucursalveterinaria}</span>
                              <span> {ficha.fechaconsulta.split('T')[0]}</span>
                            </div>
                            <div className='flex justify-between w-24'>
                              <FaEye className='cursor-pointer ' onClick={() => modalFichas(0, ficha.idfichamedica)}/>
                            </div>    
                      
                          </div>
                        )}
                          
                        
                      </> 
                      )}
                    </div>
                      </div>
                    </>)}
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
      {/* AÑADIR MASCOTA */}
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

{/* CRUD ALERGIAS */}
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
                    Editar Alergia
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
                      <input type="text" placeholder='Nombre' required defaultValue={alergia.data.nombrealergia}
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
{/* FIN CRUD ALERGIAS */}

{/* FICHAS MEDICAS CRUD */}

      {showModalFicha ? (
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
                    Ficha medica
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModalFicha(false)}
                  >
                    <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <form onSubmit={crearFichaMedica} className='space-y-5'>

                    <input type="hidden" {...register('mascota_idmascota', {value : mascota.data.idmascota})}/>

                    <div>

                      <input type="date" defaultValue={dateStr} required
                        className="block text-center w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        {...register('fechaconsulta', {required : true})}/>
                    </div>

                    <div>
                      <input type="text" placeholder='Frecuencia Respiratoria' required
                        className="block text-center w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        {...register('frecuenciarespiratoria', {required : true})}/>
                    </div>

                    <div>
                      <input type="text" placeholder='Frecuencia Cardiaca' required
                        className="block text-center w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        {...register('frecuenciacardiaca', {required : true})}/>
                    </div>

                    <div>
                      <input type="text" placeholder='Peso' required
                        className="block text-center w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        {...register('peso', {required : true})}/>
                    </div>

                    <div>
                      <input type="text" placeholder='Edad' required
                        className="block text-center w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        {...register('edad', {required : true})}/>
                    </div>

                    <div>
                      <input type="text" placeholder='temperatura' required
                        className="block text-center w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        {...register('temperatura', {required : true})}/>
                    </div>

                    <div className='flex justify-between'> 
                      <div>
                        <label className='text-black block'>Operación</label>
                        <input type="checkbox" onClick={() => cirugiaText()}
                          className="rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          {...register('operación')}/>
                      </div>
                      <div>
                        <label className='text-black block'>Hospitalizacion</label>
                        <input type="checkbox" onClick={() => hosptText()}
                          className="rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          {...register('hospitalización')}/>
                      </div>
                      <div>
                        <label className='text-black block'>Sedación</label>
                        <input type="checkbox"
                          className="rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          {...register('sedación')}/>
                      </div>
                    
                    </div>  

                    <div>
                      <textarea placeholder='Diagnóstico' id='textDiagnostico'
                      className="block text-center w-full rounded-md hidden border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      {...register('diagnostico')}/>
                    </div>
                      
                    <div>
                      <input type="text" placeholder='Cirugia' id='textCirugia' 
                      className="block text-center w-full rounded-md border-0 hidden py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      {...register('cirugiaarealizar')}/>
                    </div>
                      
                     <div>
                      <textarea placeholder='Motivo hospitalización' id='textHospt'
                      className="block text-center w-full rounded-md hidden border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      {...register('motivohospitalización')}/>
                    </div> 
                    

                    <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                      <button
                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => setShowModalFicha(false)}
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

      {showModalVerFicha ? (
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
                    Ficha medica
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModalVerFicha(false)}
                  >
                    <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <div className='text-black'>
                    <p className='text-xl font-bold border-b-2 border-red-300 '>{fichaMedica.sucursalveterinaria} {fichaMedica.veterinarioacargo}</p>
                    <div className='bg-gray-200 mt-2 rounded-xl'>
                          <p className='ml-2'>Peso: {fichaMedica.peso}</p>
                          <p className='ml-2'>Edad: {fichaMedica.edad}</p>
                          <p className='ml-2'>Temperatura: {fichaMedica.temperatura}</p>
                          <p className='ml-2'>Frecuencia Respiratoria: {fichaMedica.frecuenciarespiratoria}</p>
                          <p className='ml-2'>Frecuencia Cardiaca: {fichaMedica.frecuenciacardiaca}</p>
                        </div>
                    {tablaPet ? (
                      <>
                      {fichaMedica.tablamedica_idtablamedica == tablaPet.idtablamedica ? (
                        <>
                        <div className='bg-gray-200 mt-2 rounded-xl'>
                          <p className='ml-2'>Causa de la visita: {tratCons.caudadelavisita}</p>
                          <p className='ml-2'>Tratamiento: {tratCons.nombretratamientos}</p>
                        </div>
                        <div className='bg-gray-200 mt-2 rounded-xl'>
                          {medCons.length > 0 ? (
                            <>
                            <p className='ml-2'>Medicamentos suministrados</p>
                            {medCons && medCons.map(medi => <>
                            <p className='ml-2'>- {medi.nombremedicamentos}</p>
                          </>)}
                            </>
                          ):(
                            <p className='ml-2'>No se suministraron medicamentos</p>
                          )}
                          
                          {vacCons.length > 0 ? (<>
                            <p className='ml-2'>Vacunas suministradas</p>
                            {vacCons && vacCons.map (vacuna => <>
                              <p className='ml-2'>- {vacuna.nombrevacuna}</p>
                            </>)}
                          </>)
                          :(<>
                            <p className='ml-2'>No se aplicaron vacunas</p>
                          </>)}

                        </div>
                        
                        {recetaCons ? (<>
                        <div className='bg-gray-200 mt-2 rounded-xl'>
                          <p className='ml-2'>Receta Medica: {recetaCons.prescripcion}</p>
                        </div>
                          
                        </>):null}

                        {fichaHospt ? (<>
                        <div className='bg-gray-200 mt-2 rounded-xl'>
                          <p className='ml-2'>Hospitalización</p>
                          <p className='ml-2'>Motivo: {fichaHospt.motivohospitalización}</p>
                        </div>
                          
                        </>):null}

                        {fichaHospt ? (<>
                        <div className='bg-gray-200 mt-2 rounded-xl'>
                          <p className='ml-2'>Hospitalización</p>
                          <p className='ml-2'>Motivo: {fichaHospt.motivohospitalización}</p>
                        </div>
                          
                        </>):null}

                        {fichaHospt ? (<>
                        <div className='bg-gray-200 mt-2 rounded-xl'>
                          <p className='ml-2'>Hospitalización</p>
                          <p className='ml-2'>Motivo: {fichaHospt.motivohospitalización}</p>
                        </div>
                          
                        </>):null}
                        <div className='bg-gray-200 mt-2 rounded-xl'>
                        {fichaOp ? (<>
                          <p className='ml-2'>Diagnóstico: {fichaOp.diagnostico}</p>
                          <p className='ml-2'>Operación Realizada: {fichaOp.cirugiaarealizar}</p>
                        </>):null}
                        {fichaSed ? (<>{fichaSed.autorizacióntutor ? (<p className='ml-2'>El tutor a autorizado la sedacion</p>) : <p className='ml-2'>El tutor no a autorizado la sedacion</p>} </>):null}
                        </div>
                        </>
                      ) 
                      : 
                      (<>
                        <div className='bg-gray-200 mt-2 rounded-xl'>
                          <p className='ml-2'>Causa de la visita: {tratCons.caudadelavisita}</p>
                          
                          {medCons ? (
                            <>
                            <p className='ml-2'>Medicamentos suministrados</p>
                            {medCons && medCons.map(medi => <>
                            <p className='ml-2'>- {medi.nombremedicamentos}</p>
                          </>)}
                            </>
                          ):(
                            <p className='ml-2'>No se suministraron medicamentos</p>
                          )}
                          
                          {vacCons ? (<>
                            <p className='ml-2'>Vacunas suministradas</p>
                            {vacCons && vacCons.map (vacuna => <>
                              <p className='ml-2'>- {vacuna.nombrevacuna}</p>
                            </>)}
                          </>)
                          :(<>
                            <p className='ml-2'>No se aplicaron vacunas</p>
                          </>)}
                          
                        </div>
                        
                        {recetaCons ? (<>
                        <div className='bg-gray-200 mt-2 rounded-xl'>
                          <p className='ml-2'>Receta Medica: {recetaCons.prescripcion}</p>
                        </div>
                          
                        </>):null}
                      
                      <div className='bg-gray-200 mt-2 rounded-xl'>
                      {fichaMedica.sedación ? (<p className='ml-2'>La mascota fue sedada</p>) : null}
                      {fichaMedica.hospitalización ? (<p className='ml-2'>La mascota fue hospitalizada</p>) : null}
                      {fichaOp ? (<>
                          <p className='ml-2'>Diagnóstico: {fichaOp.diagnostico}</p>
                          <p className='ml-2'>Operación Realizada: {fichaOp.cirugiaarealizar}</p>
                        </>):null}
                      </div>
                      
                      </>)}
                        
                      </>
                    ) : (
                      <>
                      <div className='bg-gray-200 mt-2 rounded-xl'>
                          <p className='ml-2'>Causa de la visita: {tratCons.caudadelavisita}</p>
                          <p className='ml-2'>Tratamiento: {tratCons.nombretratamientos}</p>
                        </div>
                        <div className='bg-gray-200 mt-2 rounded-xl'>
                        {medCons ? (
                            <>
                            <p className='ml-2'>Medicamentos suministrados</p>
                            {medCons && medCons.map(medi => <>
                            <p className='ml-2'>- {medi.nombremedicamentos}</p>
                          </>)}
                            </>
                          ):(
                            <p className='ml-2'>No se suministraron medicamentos</p>
                          )}
                          
                          {vacCons ? (<>
                            <p className='ml-2'>Vacunas suministradas</p>
                            {vacCons && vacCons.map (vacuna => <>
                              <p className='ml-2'>- {vacuna.nombrevacuna}</p>
                            </>)}
                          </>)
                          :(<>
                            <p className='ml-2'>No se aplicaron vacunas</p>
                          </>)}
                        </div>
                        
                        {recetaCons ? (<>
                        <div className='bg-gray-200 mt-2 rounded-xl'>
                          <p className='ml-2'>Receta Medica: {recetaCons.prescripcion}</p>
                        </div>
                          
                        </>):null}
                      <div className='bg-gray-200 mt-2 rounded-xl'>
                      {fichaMedica.sedación ? (<p className='ml-2'>La mascota fue sedada</p>) : null}
                      {fichaMedica.hospitalización ? (<p className='ml-2'>La mascota fue hospitalizada</p>) : null}
                      {fichaOp ? (<>
                          <p className='ml-2'>Diagnóstico: {fichaOp.diagnostico}</p>
                          <p className='ml-2'>Operación Realizada: {fichaOp.cirugiaarealizar}</p>
                        </>):null}
                      </div>
                      </>
                    )}
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}


  {showModalEditarFicha ? (
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
                    Ficha medica
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => cerrarModalEditar()}
                  >
                    <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <form onSubmit={editarFichaMedica} className='space-y-5'>
                    

                    <input type="hidden" {...register('veterinarioacargo', {value : fichaMedica.veterinarioacargo})}/>
                    <input type="hidden" {...register('idfichamedica', {value : fichaMedica.idfichamedica})}/>
                    <input type="hidden" {...register('tablamedica_idtablamedica', {value : fichaMedica.tablamedica_idtablamedica})}/>
                    <input type="hidden" {...register('sucursalveterinaria', {value : fichaMedica.sucursalveterinaria })}/>
                    <input type="hidden" {...register('fechaultimamod', {value : dateStr })}/>
                    <input type="hidden" {...register('flagmodificacion', {value : true })}/>
                    <div>
                      <input type="date" defaultValue={fichaMedica.fechaconsulta} id='fechaconsulta' required
                        className="block text-center w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>

                    <div>
                      <input type="text" placeholder='Frecuencia Respiratoria' required defaultValue={fichaMedica.frecuenciarespiratoria}
                        className="block text-center w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        {...register('frecuenciarespiratoria', {required : true})}/>
                    </div>

                    <div>
                      <input type="text" placeholder='Frecuencia Cardiaca' required defaultValue={fichaMedica.frecuenciacardiaca}
                        className="block text-center w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        {...register('frecuenciacardiaca', {required : true})}/>
                    </div>

                    <div>
                      <input type="text" placeholder='Peso' required defaultValue={fichaMedica.peso}
                        className="block text-center w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        {...register('peso', {required : true})}/>
                    </div>

                    <div>
                      <input type="text" placeholder='Edad' required defaultValue={fichaMedica.edad}
                        className="block text-center w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        {...register('edad', {required : true})}/>
                    </div>

                    <div>
                      <input type="text" placeholder='temperatura' required defaultValue={fichaMedica.temperatura}
                        className="block text-center w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        {...register('temperatura', {required : true})}/>
                    </div>

                    <div className='flex justify-between'> 
                      <div>
                        <label className='text-black block'>Operación</label>
                        <input type="checkbox" onClick={() => cirugiaText()} defaultChecked={fichaMedica.operación} disabled
                          className="rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          {...register('operación', {value : fichaMedica.operación})}/>
                        
                      </div>
                      <div>
                        <label className='text-black block'>Hospitalizacion</label>
                        <input type="checkbox" onClick={() => hosptText()} defaultChecked={fichaMedica.hospitalización} disabled
                          className="rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          {...register('hospitalización', {value : fichaMedica.hospitalización})}/>
                      </div>
                      <div>
                        <label className='text-black block'>Sedación</label>
                        <input type="checkbox" defaultChecked={fichaMedica.sedación} disabled
                          className="rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          {...register('sedación', {value : fichaMedica.sedación})}/>
                      </div>
                    
                    </div>  
                    {fichaMedica.operación ? 
                      (<>
                        <div>
                          <textarea placeholder='Diagnóstico' id='textDiagnostico' defaultValue={fichaOp.diagnostico}
                          className="block text-center w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          {...register('diagnostico')}/> 

                        </div>
                        <div>
                          <input type="text" placeholder='Cirugia' id='textCirugia' defaultValue={fichaOp.cirugiaarealizar}
                          className="block text-center w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          {...register('cirugiaarealizar')}/>
                        </div>
                      </>
                      ) 
                      : 
                      null}
                      
                    {fichaMedica.hospitalización ? 
                    (<div>
                      <textarea placeholder='Motivo hospitalización' id='textHospt' defaultValue={fichaHospt.motivohospitalización}
                      className="block text-center w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      {...register('motivohospitalización')}/>
                    </div> ) 
                    : 
                    null }
                    
                    

                    <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                      <button
                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => cerrarModalEditar()}
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

    {showModalTrat ? (
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
                    Tratamientos
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModalTrat(false)}
                  >
                    <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <form onSubmit={crearTratConsulta} className='space-y-5'>

                    <input type="hidden" {...register('fichamedica_idfichamedica', {value : idFichaCreada})}/>

                    <div>

                      <textarea placeholder='Tratamientos' required
                        className="block text-center w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        {...register('nombretratamientos', {required : true})}/>
                    </div>

                    <div>
                      <textarea placeholder='Causa de la visita' required
                        className="block text-center w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        {...register('caudadelavisita', {required : true})}/>
                    </div>

                    <div className='flex justify-between'> 
                      <div>
                        <label className='text-black block'>Medicamento/s</label>
                        <input type="checkbox" onClick={() => medicamentosText()}
                          className="rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          {...register('medicamentos')}/>
                      </div>
                      <div>
                        <label className='text-black block'>Vacuna/s</label>
                        <input type="checkbox" onClick={() => vacunasText()}
                          className="rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          {...register('vacunas')}/>
                      </div>

                      <div>
                        <label className='text-black block'>Receta medica</label>
                        <input type="checkbox" onClick={() => recetaText()}
                          className="rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          {...register('receta')}/>
                      </div>
                    
                    </div>  

                    <div className='flex justify-between'>
                      <input type='text' max={45} placeholder='Medicamentos' id='textMedicamentos'
                      className="block text-center w-full rounded-md hidden border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />

                      <button className='bg-emerald-500 text-white 
                      active:bg-emerald-600 font-bold 
                      uppercase text-sm px-2 py-1 rounded hidden
                      shadow hover:shadow-lg outline-none
                       focus:outline-none ml-1 transition-all duration-150'
                       type="button"
                      onClick={() => crearMedConsulta(idFichaCreada)}
                      id='buttonMed'
                      >
                      <FaPlus/>

                      </button>
                    </div>
                      
                    <div className='flex justify-between'>
                      <input type='text' max={45} placeholder='Vacunas' id='textVacunas' 
                      className="block text-center w-full rounded-md border-0 hidden py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />

                      <button className='bg-emerald-500 text-white 
                      active:bg-emerald-600 font-bold 
                      uppercase text-sm px-2 py-1 rounded hidden
                      shadow hover:shadow-lg outline-none
                       focus:outline-none ml-1 transition-all duration-150'
                       type="button"
                      onClick={() => crearVacConsulta(idFichaCreada)}
                      id='buttonVac'
                      >
                      <FaPlus/>

                      </button>
                    </div>

                    <div>
                      <textarea placeholder='Prescripción' id='textReceta' 
                      className="block text-center w-full rounded-md border-0 hidden py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      {...register('prescripcion')}/>
                    </div>
                    

                    <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                      <button
                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => setShowModalTrat(false)}
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


{showModalEditarTrat ? (
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
                    Ficha medica
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModalEditarTrat(false)}
                  >
                    <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <form onSubmit={editarTratCons} className='space-y-5'>

                    <input type="hidden" {...register('fichamedica_idfichamedica', {value : fichaMedica.idfichamedica})}/>

                    <div>
                      <textarea placeholder='Causa de la visita' required defaultValue={tratCons.caudadelavisita}
                        className="block text-center w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        {...register('caudadelavisita', {required : true})}/>
                    </div>

                    <div>
                      <textarea placeholder='Tratamientos' required defaultValue={tratCons.nombretratamientos}
                        className="block text-center w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        {...register('nombretratamientos', {required : true})}/>
                    </div>

                    <div>
                      {recetaCons ? (
                        <textarea placeholder='Receta Medica' required defaultValue={recetaCons.prescripcion}
                        className="block text-center w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        {...register('prescripcion', {required : true})}/>
                      ):null}
                    </div>
                    <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                      <button
                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => setShowModalEditarTrat(false)}
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

{showModalEditarVacMed ? (
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
                    Ficha medica
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModalEditarVacMed(false)}
                  >
                    <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <form className='space-y-5'>

                    <input type="hidden" {...register('fichamedica_idfichamedica', {value : fichaMedica.idfichamedica})}/>

                      {vacCons && vacCons.map( vacuna => 
                        <div key={vacuna.idvacunassuministradas} >
                          <p className='text-black'>Vacunas</p>
                          <div className="flex justify-between">
                            <input type="text" id={vacuna.idvacunassuministradas} defaultValue={vacuna.nombrevacuna}
                            className="rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />

                            <button className='bg-emerald-500 text-white 
                            active:bg-emerald-600 font-bold 
                            uppercase text-sm px-2 py-1 rounded
                            shadow hover:shadow-lg outline-none
                             focus:outline-none ml-1 transition-all duration-150'
                             type="button"
                            onClick={() => editarVacConsulta(vacuna.idvacunassuministradas, fichaMedica.idfichamedica)}
                            id={vacuna.idvacunassuministradas + '-editar'}
                            >
                            <FaPencil/>

                            </button>
                            <button className='bg-red-500 text-white 
                            active:bg-red-600 font-bold 
                            uppercase text-sm px-2 py-1 rounded
                            shadow hover:shadow-lg outline-none
                             focus:outline-none ml-1 transition-all duration-150'
                             type="button"
                            onClick={() => eliminarVacConsulta(vacuna.idvacunassuministradas)}
                            id={vacuna.idvacunassuministradas + '-delete'}
                            >
                            <FaTrashCan/>

                            </button>
                          </div>
                        </div>
                        )}

                      {medCons && medCons.map( med => 
                        <div key={med.idmedicamentosconsulta}>
                          <p className='text-black'>Medicamentos</p>
                          <div className="flex justify-between">
                            <input type="text" id={med.idmedicamentosconsulta} defaultValue={med.nombremedicamentos}
                            className="rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            {...register('nombremedicamentos')}/>

                            <button className='bg-emerald-500 text-white 
                            active:bg-emerald-600 font-bold 
                            uppercase text-sm px-2 py-1 rounded
                            shadow hover:shadow-lg outline-none
                             focus:outline-none ml-1 transition-all duration-150'
                             type="button"
                            onClick={() => editarMedConsulta(med.idmedicamentosconsulta, fichaMedica.idfichamedica)}
                            id={med.idmedicamentosconsulta + '-editar'}
                            >
                            <FaPencil/>

                            </button>

                            <button className='bg-red-500 text-white 
                            active:bg-red-600 font-bold 
                            uppercase text-sm px-2 py-1 rounded
                            shadow hover:shadow-lg outline-none
                             focus:outline-none ml-1 transition-all duration-150'
                             type="button"
                            onClick={() => eliminarMedConsulta(med.idmedicamentosconsulta)}
                            id={med.idmedicamentosconsulta + '-delete'}
                            >
                            <FaTrashCan/>

                            </button>
                          </div>
                        </div>
                        )}
                    <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                      <button
                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={()=>setShowModalEditarVacMed(false)}
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

{/* FIN CRUD FICHAS MEDICAS */}
    </div>
  )
}


