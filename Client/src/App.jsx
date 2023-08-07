import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import { Registro } from "./pages/Registro";
import { Ingreso } from "./pages/Ingreso";
import { Navi } from "./components/Navi";

function App() {
  return (
    <BrowserRouter>
      <Navi/>
      <Routes>
        <Route path="/" element={<Navigate to ="/ingreso"/>}/>
        <Route path="/registro" element={<Registro/>}/>
        <Route path="/ingreso" element={<Ingreso/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
