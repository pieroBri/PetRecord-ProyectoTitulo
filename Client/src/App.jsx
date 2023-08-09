import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import { Registro } from "./pages/Registro";
import { Ingreso } from "./pages/Ingreso";
import { Navi } from "./components/Navi";
import { Franquicias } from "./pages/Franquicias";
import { CrearFranquicia } from "./pages/CrearFranquicia";

function App() {
  return (
    <BrowserRouter>
      <Navi/>
      <Routes>
        <Route path="/" element={<Navigate to ="/ingreso"/>}/>
        <Route path="/registro" element={<Registro/>}/>
        <Route path="/ingreso" element={<Ingreso/>}/>
        <Route path="/franquicias" element={<Franquicias/>}/>
        <Route path="/crear_franquicia" element={<CrearFranquicia/>}/>
        <Route path="/franquicia/:id" element={<CrearFranquicia/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
