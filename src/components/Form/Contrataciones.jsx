import React,{useState, useEffect} from 'react'
import TblContrataciones from '../Tables/TblContrataciones';
import { Formik,Form,Field,ErrorMessage } from 'formik'
import './Form.css'
import './ModalEmergencias.css'
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useNavigate } from 'react-router-dom';

const Contrataciones = () => {
  const navigate = useNavigate(); 

    const [showModal, setShowModal] = useState(false); // Estado para controlar el modal
    const [newContratacion, setNewContratacion] = useState({}); // Estado para la nueva emergencia

    AOS.init();
  return (
    <div className="container_principal" data-aos="fade-up" data-aos-duration="3000">
      <h1 className="title_emergencias">Contrataciones Registradas</h1>
      
      {/* Botón para abrir el modal */}
      <div style={{ textAlign: 'right', marginBottom: '10px' }}>
        <button className="btn_new_emergency" onClick={() => navigate('/NuevaContratacion')}>
          Nueva Contratación
        </button>
      </div>

      {/* Tabla */}
      <TblContrataciones/>
      
      
    </div>
  )
}

export default Contrataciones
