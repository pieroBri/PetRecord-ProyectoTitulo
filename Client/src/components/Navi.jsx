import { Link } from 'react-router-dom'

export function Navi() {
  return (
    <div>
        <Link to="/ingreso"><h2>Iniciar sesion</h2></Link>
        <Link to="/registro"><h2>Registro</h2></Link>
    </div>
  )
}
/* para hacer peticiones al back se usa 
async en la funcion y await en la api video 1:00:33 

para recibir prop es function x({ propiedad })
divs nececitan key
*/