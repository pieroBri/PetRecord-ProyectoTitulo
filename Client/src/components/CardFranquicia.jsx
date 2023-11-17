import { useNavigate } from "react-router-dom"
import { eliminarFranquicia } from '../api/veterinaria/franquicias.api'

export function CardFranquicia({franquicia}) {

    const navigate = useNavigate();

  return (
    <div>
      <div className='grid grid-cols-6' style={{background:"black"}}>
            <div className="mb-3" >
                <h1>{franquicia.nombrefranquicia}</h1>
                <br />
            </div>

            <div className='mb-3'>
            <button onClick={() => navigate('/franquicia/' + franquicia.idfranquicia)} className='text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm p-2.5'>Editar</button>
                <button onClick={async() => {
                const aceptar = window.confirm('seguro?')
                if(aceptar){
                  await eliminarFranquicia(franquicia.idfranquicia)
                  window.location.reload(false);
                }
                }} className='text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm p-2.5'>Eliminar</button>
            </div>
        </div>
        <hr/>
        <hr/>
    </div>
  )
}


// SE USO PARA PRUEBAS ACUALMENTE NO SE USA HASTA UN FUTURO
