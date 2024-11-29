import React, {useState, useEffect}  from 'react'
import './Form.css'
import './ModalHistorial.css'
import TblHistorialMedico from '../Tables/TblHistorialMedico';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Formik,Form,Field,ErrorMessage } from 'formik'
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';


const HistorialMedico = () => {
    const navigate = useNavigate(); 
    AOS.init();

  return (
    <div className="container_principal" data-aos="fade-up" data-aos-duration="3000">
      <h1 className="title_emergencias">Historiales Medicos</h1>
      
      {/* Botón para abrir el modal */}
      <div style={{ textAlign: 'right', marginBottom: '10px' }}>
        <button className="btn_new_emergency" onClick={() => navigate('/RegistroHistorial')}>
          Nuevo Historial Medico
        </button>
      </div>

      {/* Tabla */}
      <TblHistorialMedico/>
      {/* Modal */}
      
    </div>
  )
}

export default HistorialMedico
