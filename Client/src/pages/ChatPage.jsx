import { Chat } from "../components/Chat"
import { AsideDueno, AsideVet} from '../components/Navi'
import {getUserVet} from "../api/usuarios/user_vet.api"
import {getUserDueno} from "../api/usuarios/user_dueno.api"
import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'
import CryptoJS from 'crypto-js';

export function ChatPage() {

  const navigate = useNavigate()
  const type = window.localStorage.getItem("type") 
  const [user, setUser] = useState()

  useEffect(()=>{
    async function cargarUserChat(){
        const rut = window.localStorage.getItem('id')
        let usuario
        let flag = true

        const tipo = window.localStorage.getItem('type')

        if(tipo == 'vet'){
          try {
            usuario = await getUserVet(rut)
            flag = true
          } catch (error) {
            flag = false
          }
        }else{
          try {
              usuario = await getUserDueno(rut)
          } catch (error) {
              console.log(error)
              flag = false
          }
        }

        if(!flag){
            window.localStorage.removeItem('id')
            window.localStorage.removeItem('idVeterinaria')
            navigate('/')
        }

        // console.log(usuario.data)

        const desencriptada = CryptoJS.AES.decrypt(usuario.data.contraseña, ":v")
        const plaintext = desencriptada.toString(CryptoJS.enc.Utf8)

        usuario.data.contraseña = plaintext

        if(tipo == 'vet'){
          usuario.data.nombres = 'vet ' + usuario.data.nombres
        }else{
          usuario.data.nombres = 'dueno ' + usuario.data.nombres
        }
        setUser(usuario.data)
    }
    
    cargarUserChat()
  },[])

  
  return (
    <>
    {user ? (
            <div className="flex max-h-screen">
        
            {type == "user" ? (<AsideDueno/>
    )
            :
            (<AsideVet/>
            )}
            
            <div className="w-full bg-gray-300 flex justify-center">
            <div className="w-5/6 font-sans">
              <Chat user={user}/>
            </div>
            </div>
            
            
        </div>
            ):null}
    </>
    
    
  )
}
