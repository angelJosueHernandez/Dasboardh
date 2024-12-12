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
    const [asociados, setAsociados] = useState([]); 
    const [ID_Asociado, setIdAsociado] = useState(''); 
    const [errors, setErrors] = useState({});

    // Fetch de los asociados
    useEffect(() => {
      const fetchAsociados = async () => {
        try {
          const response = await fetch('http://localhost:3000/personal');
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          setAsociados(data); // Asignar los datos de la API al estado
        } catch (error) {
          console.error('Error al obtener los asociados:', error);
        }
      };
      fetchAsociados();
    }, []);

    const validateInputs = () => {
      const newErrors = {};
  
      if (!clave) newErrors.clave = 'La clave no debe estar vacía';
      else if (!/^\d+$/.test(clave)) newErrors.clave = 'La clave debe contener solo números';
  
      if (!nombre_insumo) newErrors.nombre_insumo = 'El nombre del insumo no debe estar vacío';
      else if (!/^[a-zA-Z\s]+$/.test(nombre_insumo))
        newErrors.nombre_insumo = 'El nombre del insumo debe contener solo letras';
  
      if (!cantidad) newErrors.cantidad = 'La cantidad no debe estar vacía';
      else if (!/^\d+$/.test(cantidad)) newErrors.cantidad = 'La cantidad debe contener solo números';
  
      if (!lote) newErrors.lote = 'El lote no debe estar vacío';
      else if (!/^\d+$/.test(lote)) newErrors.lote = 'El lote debe contener solo números';
  
      if (!fecha_caducidad) newErrors.fecha_caducidad = 'La fecha de caducidad no debe estar vacía';
  
      if (!ID_Asociado) newErrors.ID_Asociado = 'Debe seleccionar un asociado';
  
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0; // Retorna true si no hay errores
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!validateInputs()) return;
        const data = {
          clave,
          nombre_insumo,
          cantidad,
          lote,
          fecha_caducidad,
          ID_Asociado: ID_Asociado,
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
          // Limpiar el formulario y cerrar el modal
          setClave('');
          setNombre_Insumo('');
          setCantidad('');
          setLote('');
          setFechaCaducidad('');
          setIdAsociado('');
          setShowModal(false);
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
            <form className='form_Grid_Suministros' onSubmit={handleSubmit}>
              <div className='titulo_suministro'><h1>Registrar Suministro</h1></div>
              <div className='grup-input'>
                <div><label htmlFor="">Clave:</label></div>
                <div>
                  <input 
                    className="input-text"
                    type="text"
                    id="clave"
                    value={clave}
                    onChange={(e) => setClave(e.target.value)} 
                  />
                </div>
                <div className='msg_error'>
                  {errors.clave && <span className="error-message">{errors.clave}</span>}
                </div>
              </div>
              <div className='grup-input'>
                <div><label htmlFor="">Nombre del Insumo:</label></div>
                <div>
                  <input 
                    className="input-text"
                    type="text"
                    id="nombre_insumo"
                    value={nombre_insumo}
                    onChange={(e) => setNombre_Insumo(e.target.value)} 
                  />
                </div>
                <div className='msg_error'>
                  {errors.nombre_insumo && (
                    <span className="error-message">{errors.nombre_insumo}</span>
                  )}
                </div>
              </div>
              <div className='grup-input'>
                <div><label htmlFor="">Cantidad:</label></div>
                <div>
                  <input  
                    className="input-text"
                    type="text"
                    id="cantidad"
                    value={cantidad}
                    onChange={(e) => setCantidad(e.target.value)} 
                  />
                </div>
                <div className='msg_error'>
                  {errors.cantidad && <span className="error-message">{errors.cantidad}</span>}
                </div>
              </div>
              <div className='grup-input'>
                <div><label htmlFor="">Lote:</label></div>
                <div>
                  <input 
                    className="input-text"
                    type="text"
                    id="lote"
                    value={lote}
                    onChange={(e) => setLote(e.target.value)} 
                  />
                </div>
                <div className='msg_error'>
                  {errors.lote && <span className="error-message">{errors.lote}</span>}
                </div>
              </div>
              <div className='grup-input'>
                <div><label htmlFor="">Fecha de Caducidad:</label></div>
                <div>
                  <input 
                    className="input-text"
                    type="date"
                    id="fecha_caducidad"
                    value={fecha_caducidad}
                    onChange={(e) => setFechaCaducidad(e.target.value)} 
                  />
                </div>
                <div className='msg_error'>
                  {errors.fecha_caducidad && (
                    <span className="error-message">{errors.fecha_caducidad}</span>
                  )}
                </div>
              </div>
              <div className='grup-input'>
                <div><label htmlFor="">Nombre del Asociado:</label></div>
                <div>
                  <select 
                    className="input-text"
                    id="ID_Asociado"
                    value={ID_Asociado}
                    onChange={(e) => setIdAsociado(e.target.value)}
                  >
                    <option value="">Selecciona un asociado</option>
                    {asociados.map((asociado) => (
                      <option key={asociado.ID_Asociado} value={asociado.ID_Asociado}>
                        {asociado.nombre}
                      </option>
                    ))}
                  </select>
                </div>
                <div className='msg_error'>
                  {errors.ID_Asociado && <span className="error-message">{errors.ID_Asociado}</span>}
                </div>
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
