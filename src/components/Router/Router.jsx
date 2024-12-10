import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from '../Layout/Layout';
import Home from '../Pages/Home';
import Chart from '../Pages/Chart';
import Emergencia from '../Form/Emergencia';
import Citas from '../Form/Citas';
import TblContrataciones from '../Tables/TblContrataciones';
import TblDonaciones from '../Tables/TblDonaciones';
import TblHistorialMedico from '../Tables/TblHistorialMedico';
import TblPersonal from '../Tables/TblPersonal';
import TblSuministros from '../Tables/TblSuministros';
import TblUsuarios from '../Tables/TblUsuarios';
import Contrataciones from '../Form/Contrataciones';
import Personal from '../Form/Personal';
import Suministros from '../Form/Suministros';
import HistorialCompleto from '../Pages/HistorialCompleto';
import HistorialMedico from '../Form/HistorialMedico';
import RegistroHistorial from '../Pages/RegistroHistorial';
import RegistroContrataciones from '../Pages/RegistroContrataciones';
import Login from '../Pages/Login';
import NuevaContratacion from '../Form/NuevaContratacion';


const PrivateRoute = ({ children }) => {
  
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'; // O usa tu lógica de autenticación (por ejemplo, Contexto, Redux, etc.)

  if (!isLoggedIn) {
    return <Navigate to="/" />; // Si no está logueado, redirige al Login
  }

  return children; // Si está logueado, permite el acceso a la ruta
};

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/Home" element={<PrivateRoute><Layout><Home/></Layout></PrivateRoute>} />
        <Route path="/Emergencia" element={<PrivateRoute><Layout><Emergencia /></Layout></PrivateRoute>} />
        <Route path='/Citas' element={<PrivateRoute><Layout><Citas/></Layout></PrivateRoute>}/>
        <Route path='/NuevaContratacion' element={<PrivateRoute><Layout><NuevaContratacion/></Layout></PrivateRoute>}/>
        <Route path='/ContratacionAmbulancias' element={<PrivateRoute><Layout><Contrataciones/></Layout></PrivateRoute>}/>
        <Route path='/ContratacionAmbulancias/:ID_Contratacion' element={<PrivateRoute><Layout><RegistroContrataciones/></Layout></PrivateRoute>}/>
        <Route path='/Donaciones' element={<PrivateRoute><Layout><TblDonaciones/></Layout></PrivateRoute>}/>
        <Route path='/HistorialRegistrado' element={<PrivateRoute><Layout><HistorialMedico/></Layout></PrivateRoute>}/>
        <Route path='/RegistroHistorial' element={<PrivateRoute><Layout><RegistroHistorial/></Layout></PrivateRoute>}/>
        <Route path='/HistorialRegistrado/HistorialCompleto/:ID_Historial' element={<PrivateRoute><Layout><HistorialCompleto/></Layout></PrivateRoute>}/>
        <Route path='/PersonalRegistrado' element={<PrivateRoute><Layout><Personal/></Layout></PrivateRoute>}/>
        <Route path='/SuministrosMedicos' element={<PrivateRoute><Layout><Suministros/></Layout></PrivateRoute>}/>
        <Route path='/UsuariosRegistrados' element={<PrivateRoute><Layout><TblUsuarios/></Layout></PrivateRoute>}/>
      </Routes>
    </BrowserRouter>
  );
}
