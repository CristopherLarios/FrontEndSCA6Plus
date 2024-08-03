import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import MainSCA from "./pages/MainSCA";
import MainSCAReportes from "./pages/MainSCAReportes";
import MainSCAIngresoCombustible from "./pages/MainSCAIngresoCombustible";
import MainSCAGestionUsuarios from "./pages/MainSCAGestionUsuarios";
import MainSCARegistroDespachoLubricos from "./pages/MainSCARegistroDespachoLubricos";
import MainSCAPresupuestoUnidadAdministrativa from "./pages/MainSCAPresupuestoUnidadAdministrativa";
import NoPageFound from "./pages/NoPageFound";
import { despachoLubrico, gestionUsuarios, ingresoCombustible, login, menu, presupuestoAdministrativa, reports } from "./Routes/Path";
import PublicRoutes from "./Routes/PublicRoutes";
import PrivateRoutes from "./Routes/PrivateRoutes";
import { DataProvider } from "./Context/DataContextMain";


const Roles = {
  'Director Especifico de Almacenes': 1,
  'Asistente Administrativo': 2,
  'Analista de Sistema': 3,
  'Jefe de Bodega': 4,
}

function App() {

  return (
    <div className="App">

      <DataProvider>
        <BrowserRouter>
          <Routes>

            <Route path="/" element={<PublicRoutes />}>
              <Route index path={login} element={<Login />} />
            </Route>

            <Route path={'/'} element={<PrivateRoutes allowroled={[
              Roles["Director Especifico de Almacenes"],
              Roles["Analista de Sistema"],
              Roles["Asistente Administrativo"],
              Roles["Jefe de Bodega"]]} />}>
              <Route path={menu} element={<MainSCA />} />
            </Route>

            <Route path={'/'} element={<PrivateRoutes allowroled={[
              Roles["Director Especifico de Almacenes"],
              Roles["Analista de Sistema"],
              Roles["Asistente Administrativo"],
              Roles["Jefe de Bodega"]]} />}>
              <Route path={reports} element={<MainSCAReportes />} />
            </Route>

            <Route path={'/'} element={<PrivateRoutes allowroled={[
              Roles["Director Especifico de Almacenes"],
              Roles["Asistente Administrativo"],
              Roles["Jefe de Bodega"]]} />}>
              <Route path={ingresoCombustible} element={<MainSCAIngresoCombustible />} />
            </Route>

            <Route path={'/'} element={<PrivateRoutes allowroled={[
              Roles["Director Especifico de Almacenes"],
              Roles["Asistente Administrativo"]]} />}>
              <Route path={gestionUsuarios} element={<MainSCAGestionUsuarios />} />
            </Route>

            <Route path={'/'} element={<PrivateRoutes allowroled={[
              Roles["Director Especifico de Almacenes"],
              Roles["Analista de Sistema"],
              Roles["Jefe de Bodega"]]} />}>
              <Route path={despachoLubrico} element={<MainSCARegistroDespachoLubricos />} />
            </Route>

            <Route path={'/'} element={<PrivateRoutes allowroled={[
              Roles["Director Especifico de Almacenes"],
              Roles["Asistente Administrativo"]]} />}>
              <Route path={presupuestoAdministrativa} element={<MainSCAPresupuestoUnidadAdministrativa />} />
            </Route>


            <Route path="*" element={<NoPageFound />} />


          </Routes>
        </BrowserRouter>
      </DataProvider>
    </div>

  );
}

export default App;
