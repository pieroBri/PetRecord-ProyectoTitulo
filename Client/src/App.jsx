import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import { RegistroUsuario } from "./pages/RegistroUsuario";
import { IngresoUsuario } from "./pages/IngresoUsuario";

import { RegistroVeterinaria } from "./pages/RegistroVeterinaria";
import { RegistroVet } from "./pages/RegistroVet";
import { IngresoVet } from "./pages/IngresoVet";

import { Franquicias } from "./pages/Franquicias";
import { CrearFranquicia } from "./pages/CrearFranquicia";

import { PaginaPrincipal } from "./pages/PaginaPrincipal"

import { PaginaUsuario } from "./pages/PaginaUsuario"
import { PaginaVeterinario } from "./pages/PaginaVeterinario"

import { InsumosVet } from "./pages/InsumosVet"
import { CalendarVet } from "./pages/CalendarVet"

import { CalendarUser } from "./pages/CalendarUser";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PaginaPrincipal/>}/>


        <Route path="/registroUsuario" element={<RegistroUsuario/>}/>
        <Route path="/ingresoUsuario" element={<IngresoUsuario/>}/>


        <Route path="/registroVeterinaria/:id" element={<RegistroVeterinaria/>}/>


        <Route path="/registroVeterinario" element={<RegistroVet/>}/>
        <Route path="/ingresoVeterinario" element={<IngresoVet/>}/>

        <Route path="/Home" element={<PaginaUsuario/>}/>
        <Route path="/Home/Calendario" element={<CalendarUser/>}/>


        <Route path="/adminHome" element={<PaginaVeterinario/>}/>
        <Route path="/adminHome/insumos" element={<InsumosVet/>}/>
        <Route path="/adminHome/Calendario" element={<CalendarVet/>}/>


        <Route path="/franquicias" element={<Franquicias/>}/>
        <Route path="/registroFranquicia/:id" element={<CrearFranquicia/>}/>

        {/* <Route path="/franquicia/:id" element={<CrearFranquicia/>}/> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
