import {MultiChatSocket, MultiChatWindow, useMultiChatLogic} from 'react-chat-engine-advanced'

export const Chat = (props) => { 
  console.log(props)

  const chatPropts = useMultiChatLogic(
    'd00f28b5-fcf4-4b2d-9626-b96853d25bfe',
    props.user.rut,
    props.user.contraseña)
  return (
    
    <div className="h-screen text-black">
        <MultiChatSocket {...chatPropts}/>
        <MultiChatWindow {...chatPropts}/>
    </div>
    
  )
}
