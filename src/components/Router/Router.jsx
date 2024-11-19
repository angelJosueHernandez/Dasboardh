import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/Chart" element={<Layout><Chart /></Layout>} />
        <Route path="/Emergencia" element={<Layout><Emergencia /></Layout>} />
        <Route path='/Citas' element={<Layout><Citas/></Layout>}/>
        <Route path='/ContratacionAmbulancias' element={<Layout><TblContrataciones/></Layout>}/>
        <Route path='/Donaciones' element={<Layout><TblDonaciones/></Layout>}/>
        <Route path='/HistorialRegistrado' element={<Layout><TblHistorialMedico/></Layout>}/>
        <Route path='/PersonalRegistrado' element={<Layout><TblPersonal/></Layout>}/>
        <Route path='/SuministrosMedicos' element={<Layout><TblSuministros/></Layout>}/>
        <Route path='/UsuariosRegistrados' element={<Layout><TblUsuarios/></Layout>}/>
      </Routes>
    </BrowserRouter>
  );
}
