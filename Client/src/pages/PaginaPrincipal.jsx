import { Navi } from "../components/Navi";
import { BodyPrinc } from "../components/BodyPrinc";
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export function PaginaPrincipal() {
  const navigate = useNavigate()

  useEffect(()=>{
    function verify(){
      const logged = window.localStorage.getItem("isLogged")
      if(logged == "true"){
        navigate("/Home")
      }

    }
    
    verify()
 }, [])

  return (
    <div>
      <Navi/>

      <BodyPrinc/>
    </div>
  )
}