import { getMascotasDueno} from '../api/mascota/mascotas.api'


export function EditarClinica() {

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


  return (
    <div className='flex justify-center'>
    </div>
)}

