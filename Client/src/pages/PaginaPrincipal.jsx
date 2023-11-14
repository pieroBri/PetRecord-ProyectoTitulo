import { Navi } from "../components/Navi";
import { BodyPrinc } from "../components/BodyPrinc";
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export function PaginaPrincipal() {
  const navigate = useNavigate()

  

  
  useEffect(()=>{
    function verify(){
      const logged = window.localStorage.getItem("isLogged")
      const type = window.localStorage.getItem("type")
      if(logged == "true"){
        if(type == "vet"){
          navigate("/adminHome")
        }else{
          navigate("/Home")
        }
      }

    }
    
    function carga(){
    
      console.log("epico")
  
      const log = window.localStorage.getItem("isLogged")
  
      const sesion = document.cookie.split(';').find((row) => row == " session=true")
      
  
      if(sesion == null){
        if(log == "false"){
          window.localStorage.removeItem("isLogged")
          window.localStorage.removeItem("id")
          window.localStorage.removeItem("idVeterinaria")
          window.localStorage.removeItem("type")
        }
      }
        
    }
    carga()

    verify()
 }, [])

  return (
    <div>
      <Navi/>

      <BodyPrinc/>
    </div>
  )
}