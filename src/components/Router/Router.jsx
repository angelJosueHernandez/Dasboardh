import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from '../Layout/Layout';
import Home from '../Pages/Home';
import Chart from '../Pages/Chart';
import Emergencia from '../Form/Emergencia';
export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/Chart" element={<Layout><Chart /></Layout>} />
        <Route path="/Emergencia" element={<Layout><Emergencia /></Layout>} />
      </Routes>
    </BrowserRouter>
  );
}
