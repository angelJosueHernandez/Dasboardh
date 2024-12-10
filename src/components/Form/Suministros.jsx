import React,{useState, useEffect} from 'react'
import { Formik,Form,Field,ErrorMessage } from 'formik'
import TblSuministros from '../Tables/TblSuministros';
import './Form.css'
import './ModalSuministros.css'
import AOS from 'aos';
import 'aos/dist/aos.css';

const Suministros = () => {
    const [showModal, setShowModal] = useState(false); // Estado para controlar el modal
    const [clave, setClave] = useState('');
    const [nombre_insumo, setNombre_Insumo] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [lote, setLote] = useState('');
    const [fecha_caducidad, setFechaCaducidad] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {
          clave,
          nombre_insumo,
          cantidad,
          lote,
          fecha_caducidad,
        };
    
        try {
          const response = await fetch('http://localhost:3000/registrarSuministro', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          });
    
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
    
          const result = await response.json();
          console.log('Success:', result);
          // Aquí puedes manejar la respuesta exitosa, como mostrar un mensaje o limpiar el formulario
        } catch (error) {
          console.error('Error:', error);
          // Aquí puedes manejar el error, como mostrar un mensaje al usuario
        }
    };

    AOS.init();
  return (
    <div className="container_principal" data-aos="fade-up" data-aos-duration="3000">
      <h1 className="title_emergencias">Suministros Registrados</h1>
      
      {/* Botón para abrir el modal */}
      <div style={{ textAlign: 'right', marginBottom: '10px' }}>
        <button className="btn_new_emergency" onClick={() => setShowModal(true)}>
          Nuevo Suministro
        </button>
      </div>

      {/* Tabla */}
      <TblSuministros/>
      {/* Modal */}
      {showModal && (
        <div className="modal">
          <div className="modal_content">
            <form className='form_Grid_Suministros' method="post">
              <div className='titulo_suministro'><h1>Registrar Suministro</h1></div>
              <div className='grup-input'>
                <div><label htmlFor="">Clave:</label></div>
                <div><input className='input-text' type="text" name="" id="" /></div>
              </div>
              <div className='grup-input'>
                <div><label htmlFor="">Nombre del Insumo:</label></div>
                <div><input className='input-text' type="text" name="" id="" /></div>
              </div>
              <div className='grup-input'>
                <div><label htmlFor="">Cantidad:</label></div>
                <div><input  className='input-text' type="text" name="" id="" /></div>
              </div>
              <div className='grup-input'>
                <div><label htmlFor="">Lote:</label></div>
                <div><input className='input-text' type="text" name="" id="" /></div>
              </div>
              <div className='grup-input'>
                <div><label htmlFor="">Fecha de Caducidad:</label></div>
                <div><input className='input-text' type="date" name="" id="" /></div>
              </div>
              <div className='grup-input'>
                <div><label htmlFor="">Nombre del Asociado:</label></div>
                <div><select className='input-text' name="" id=""></select></div>
              </div>
              <div className='conte-registrarS'>
                <input className='btn_submit' type="submit" value="Registrar" />
                <button className='btn_cancel' type="button" onClick={() => setShowModal(false)}>Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Suministros
