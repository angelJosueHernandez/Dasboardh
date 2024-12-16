import React, {useState, useEffect} from 'react'
import { Select, Option, } from "@material-tailwind/react";
import './NuevaContratacion.css'
import { useNavigate } from 'react-router-dom';

const NuevaContratacion = () => {
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState({
    nombre: '',
    apellido_Paterno: '',
    apellido_Materno: '',
    inicio_Traslado: '',
    escala: '',
    destino_Traslado: '',
    motivo: '',
    material_especifico: '',
    fecha: '',
    horario: '',
    ID_Asociado: '',
    ID_Tipo_Contratacion: '',
    AmbulanciaID: '',
  });

  const [formErrors, setFormErrors] = useState({});
  const [tiposContratacion, setTiposContratacion] = useState([]);
  const [asociados, setAsociados] = useState([]);
  const [ambulancias, setAmbulancias] = useState([]);
  const [mensajeAmbulancias, setMensajeAmbulancias] = useState(''); // Nuevo estado para el mensaje
  const [showModal, setShowModal] = useState(false); // Estado para mostrar el modal

  useEffect(() => {
    // Fetch tipos de contratación
    const fetchTiposContratacion = async () => {
      try {
        const response = await fetch('http://localhost:3000/tipoContratacion');
        const data = await response.json();
        setTiposContratacion(data);
      } catch (error) {
        console.error('Error fetching tipos de contratación:', error);
      }
    };

    // Fetch asociados
    const fetchAsociados = async () => {
      try {
        const response = await fetch('http://localhost:3000/personal');
        const data = await response.json();
        setAsociados(data);
      } catch (error) {
        console.error('Error fetching asociados:', error);
      }
    };

    // Fetch ambulancias
    const fetchAmbulancias = async () => {
      try {
        const response = await fetch('http://localhost:3000/ambulancias-disponiblesAdmin');
        if (!response.ok) {
          throw new Error('Error al cargar las ambulancias.');
        }
        const data = await response.json();
        // Manejar array vacío o mensaje
        if (Array.isArray(data) && data.length > 0) {
          setAmbulancias(data);
          setMensajeAmbulancias('');
        } else if (data.msg) {
          setAmbulancias([]);
          setMensajeAmbulancias(data.msg);
        }
      } catch (error) {
        console.error('Error fetching ambulancias:', error);
      }
    };

    fetchTiposContratacion();
    fetchAsociados();
    fetchAmbulancias();
  }, []);


  const validateForm = () => {
    const errors = {};
    const lettersOnly = /^[a-zA-Z\s]+$/;
    const lettersAndNumbers = /^[a-zA-Z0-9\s]+$/;

    if (!formValues.nombre.trim()) {
      errors.nombre = 'El campo no puede estar vacío.';
    } else if (!lettersOnly.test(formValues.nombre)) {
      errors.nombre = 'Solo se permiten letras.';
    }

    if (!formValues.apellido_Paterno.trim()) {
      errors.apellido_Paterno = 'El campo no puede estar vacío.';
    } else if (!lettersOnly.test(formValues.apellido_Paterno)) {
      errors.apellido_Paterno = 'Solo se permiten letras.';
    }

    if (!formValues.apellido_Materno.trim()) {
      errors.apellido_Materno = 'El campo no puede estar vacío.';
    } else if (!lettersOnly.test(formValues.apellido_Materno)) {
      errors.apellido_Materno = 'Solo se permiten letras.';
    }

    if (!formValues.inicio_Traslado.trim()) {
      errors.inicio_Traslado = 'El campo no puede estar vacío.';
    } else if (!lettersOnly.test(formValues.inicio_Traslado)) {
      errors.inicio_Traslado = 'Solo se permiten letras.';
    }

    if (!formValues.escala.trim()) {
      errors.escala = 'El campo no puede estar vacío.';
    } else if (!lettersOnly.test(formValues.escala)) {
      errors.escala = 'Solo se permiten letras.';
    }

    if (!formValues.destino_Traslado.trim()) {
      errors.destino_Traslado = 'El campo no puede estar vacío.';
    } else if (!lettersOnly.test(formValues.destino_Traslado)) {
      errors.destino_Traslado = 'Solo se permiten letras.';
    }

    if (!formValues.motivo.trim()) {
      errors.motivo = 'El campo no puede estar vacío.';
    } else if (!lettersOnly.test(formValues.motivo)) {
      errors.motivo = 'Solo se permiten letras.';
    }

    if (!formValues.material_especifico.trim()) {
      errors.material_especifico = 'El campo no puede estar vacío.';
    } else if (!lettersAndNumbers.test(formValues.material_especifico)) {
      errors.material_especifico = 'Solo se permiten letras y números.';
    }

    if (!formValues.fecha.trim()) {
      errors.fecha = 'El campo no puede estar vacío.';
    }

    if (!formValues.horario.trim()) {
      errors.horario = 'El campo no puede estar vacío.';
    }

    if (!formValues.ID_Asociado.trim()) {
      errors.ID_Asociado = 'Seleccione un asociado.';
    }

    if (!formValues.ID_Tipo_Contratacion.trim()) {
      errors.ID_Tipo_Contratacion = 'Seleccione un tipo de contratación.';
    }

    if (!formValues.AmbulanciaID.trim()) {
      errors.AmbulanciaID = 'Seleccione una ambulancia.';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validar formulario
    if (validateForm()) {
      try {
        const payload = {
          nombre: formValues.nombre,
          apellido_Paterno: formValues.apellido_Paterno,
          apellido_Materno: formValues.apellido_Materno,
          inicio_Traslado: formValues.inicio_Traslado,
          escala: formValues.escala,
          destino_Traslado: formValues.destino_Traslado,
          motivo: formValues.motivo,
          material_especifico: formValues.material_especifico,
          fecha: formValues.fecha,
          horario: formValues.horario,
          ID_Asociado: formValues.ID_Asociado,
          ID_Tipo_Contratacion: formValues.ID_Tipo_Contratacion,
          AmbulanciaID: formValues.AmbulanciaID,
        };
  
        console.log("Enviando payload:", payload); // Debugging
  
        const response = await fetch("http://localhost:3000/CrearContratacionAdmin", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
  
        if (response.ok) {
          alert("Contratación registrada con éxito.");
          // Limpiar formulario
          setFormValues({
            nombre: '',
            apellido_Paterno: '',
            apellido_Materno: '',
            inicio_Traslado: '',
            escala: '',
            destino_Traslado: '',
            motivo: '',
            material_especifico: '',
            fecha: '',
            horario: '',
            ID_Asociado: '',
            ID_Tipo_Contratacion: '',
            AmbulanciaID: '',
          });
          setFormErrors({});
        } else {
          const errorResponse = await response.json(); // Capturamos el mensaje de error
          console.error("Error en la respuesta:", errorResponse);
          if (errorResponse.msg) {
            alert(errorResponse.msg); // Mostramos el mensaje en un alert
          } else {
            alert("Error al registrar la contratación.");
          }
        }
      } catch (error) {
        console.error("Error al enviar los datos:", error);
        alert("Error al registrar la contratación.");
      }
    }
  };

  /*----------------------Codigo del Modal-------------------*/
  const handleCancelar = () => {
    setShowModal(true); // Muestra el modal
  };

  const confirmCancel = () => {
    setShowModal(false);
    navigate('/ContratacionAmbulancias'); // Redirige si confirma cancelar
  };

  const closeModal = () => {
    setShowModal(false); // Cierra el modal sin redirigir
  };

  return (
    <div>
      <form className='form_nueva_contratacion' onSubmit={handleSubmit}>
        <div className='titulo_contratacion'><h1>Registrar Nueva Contratación</h1></div>
        
        {/* Mostrar mensaje de ambulancias */}
        <div className='ocupadas'>
          {mensajeAmbulancias && (
            <p className="msg_ambulancias">{mensajeAmbulancias}</p>
          )}
        </div>
        
        <div className='grup-input'>
          <div><label htmlFor="" className='label-name'>Nombre:</label></div>
          <div>
            <input 
              className="text_input"
              type="text"
              name="nombre"
              value={formValues.nombre}
              onChange={handleChange}
              disabled={!!mensajeAmbulancias} 
            />         
          </div>
          <div className='msg_error'>
            {formErrors.nombre && <div className="msg_error">{formErrors.nombre}</div>}            
          </div>
        </div>
        <div className='grup-input'>
          <div><label htmlFor="" className='label-name'>Apellido Paterno:</label></div>
          <div>
            <input 
              className="text_input"
              type="text"
              name="apellido_Paterno"
              value={formValues.apellido_Paterno}
              onChange={handleChange} 
              disabled={!!mensajeAmbulancias}
            />
          </div>
          <div className='msg_error'>
            {formErrors.apellido_Materno && <div className="msg_error">{formErrors.apellido_Paterno}</div>} 
          </div>
        </div>
        <div className='grup-input'>
          <div><label htmlFor="" className='label-name'>Apellido Materno:</label></div>
          <div>
            <input 
              className="text_input"
              type="text"
              name="apellido_Materno"
              value={formValues.apellido_Materno}
              onChange={handleChange} 
              disabled={!!mensajeAmbulancias}
            />
          </div>
          <div className='msg_error'>
            {formErrors.apellido_Materno && <div className="msg_error">{formErrors.apellido_Materno}</div>}          
          </div>
        </div>
        <div className='grup-input'>
          <div><label htmlFor="" className='label-name'>Inicio del Traslado:</label></div>
          <div>
            <input 
              className="text_input"
              type="text"
              name="inicio_Traslado"
              value={formValues.inicio_Traslado}
              onChange={handleChange} 
              disabled={!!mensajeAmbulancias}
            />
          </div>
          <div className='msg_error'>
            {formErrors.inicio_Traslado && <div className="msg_error">{formErrors.inicio_Traslado}</div>}      
          </div>
        </div>
        <div className='grup-input'>
          <div><label htmlFor="" className='label-name'>Escala:</label></div>
          <div>
            <input 
              className="text_input"
              type="text"
              name="escala"
              value={formValues.escala}
              onChange={handleChange} 
              disabled={!!mensajeAmbulancias}
            />
          </div>
          <div className='msg_error'>
            {formErrors.escala && <div className="msg_error">{formErrors.escala}</div>}  
          </div>
        </div>
        <div className='grup-input'>
          <div><label htmlFor="" className='label-name'>Destino del Traslado:</label></div>
          <div>
            <input 
              className="text_input"
              type="text"
              name="destino_Traslado"
              value={formValues.destino_Traslado}
              onChange={handleChange} 
              disabled={!!mensajeAmbulancias}
            />
          </div>
          <div className='msg_error'>
            {formErrors.destino_Traslado && <div className="msg_error">{formErrors.destino_Traslado}</div>}        
          </div>
        </div>
        <div className='grup-input'>
          <div><label htmlFor="" className='label-name'>Motivo:</label></div>
          <div>
            <input 
              className="text_input"
              type="text"
              name="motivo"
              value={formValues.motivo}
              onChange={handleChange} 
              disabled={!!mensajeAmbulancias}
            />
          </div>
          <div className='msg_error'>
            {formErrors.motivo && <div className="msg_error">{formErrors.motivo}</div>} 
          </div>
        </div>
        <div className='grup-input'>
          <div><label htmlFor="" className='label-name'>Material Especifico:</label></div>
          <div>
            <input 
              className="text_input"
              type="text"
              name="material_especifico"
              value={formValues.material_especifico}
              onChange={handleChange}
              disabled={!!mensajeAmbulancias}
            />
          </div>
          <div className='msg_error'>
            {formErrors.material_especifico && (
              <div className="msg_error">{formErrors.material_especifico}</div>
            )}              
          </div>
        </div>
        <div className='grup-input'>
          <div><label htmlFor="" className='label-name'>Fecha:</label></div>
          <div>
            <input 
              className='text_input' 
              type="date" 
              name="fecha"
              value={formValues.fecha}
              onChange={handleChange}
              disabled={!!mensajeAmbulancias}
            />
          </div>
          <div className='msg_error'>
            {formErrors.fecha && <div className="msg_error">{formErrors.fecha}</div>} 
          </div>
        </div>
        <div className='grup-input'>
          <div><label htmlFor="" className='label-name'>Horario:</label></div>
          <div>
            <input 
              className='text_input' 
              type="time" 
              name="horario"
              value={formValues.horario}
              onChange={handleChange}
              disabled={!!mensajeAmbulancias}
            />
          </div>
          <div className='msg_error'>
            {formErrors.horario && <div className="msg_error">{formErrors.horario}</div>} 
          </div>
        </div>
        <div className='grup-input'>
          <div><label htmlFor="" className='label-name'>Nombre del Asociado:</label></div>
          <div>
            <select 
              className='text_input' 
              name="ID_Asociado"
              value={formValues.ID_Asociado}
              onChange={handleChange}
              disabled={!!mensajeAmbulancias}
            >
              <option value="">Seleccione un asociado</option>
              {asociados.map((asociado) => (
                <option key={asociado.ID_Asociado} value={asociado.ID_Asociado}>
                  {asociado.nombre}
                </option>
              ))}
            </select>
          </div>
          <div className='msg_error'>
            {formErrors.ID_Asociado && <div className="msg_error">{formErrors.ID_Asociado}</div>} 
          </div>
        </div>
        <div className='grup-input'>
          <div><label htmlFor="" className='label-name'>Tipo de contratación:</label></div>
          <div>
            <select 
              className='text_input' 
              name="ID_Tipo_Contratacion"
              value={formValues.ID_Tipo_Contratacion}
              onChange={handleChange}
              disabled={!!mensajeAmbulancias}
            >
              <option value="">Seleccione un tipo de contratación</option>
              {tiposContratacion.map((tipo) => (
                <option key={tipo.ID_Tipo_Contratacion} value={tipo.ID_Tipo_Contratacion}>
                  {tipo.tipo}
                </option>
              ))}
            </select>
          </div>
          <div className='msg_error'>
            {formErrors.ID_Tipo_Contratacion && <div className="msg_error">{formErrors.ID_Tipo_Contratacion}</div>}    
          </div>
        </div>
        <div className='grup-input'>
          <div><label htmlFor="" className='label-name'>Ambulancia:</label></div>
          <div>
            <select 
              className='text_input' 
              name="AmbulanciaID"
              value={formValues.AmbulanciaID}
              onChange={handleChange}
              disabled={!!mensajeAmbulancias}
            >
              <option value="">Seleccione una ambulancia</option>
              {ambulancias.map((ambulancia) => (
                <option key={ambulancia.AmbulanciaID} value={ambulancia.AmbulanciaID}>
                  {ambulancia.NumeroAmbulancia}
                </option>
              ))}
            </select>
          </div>
          <div className='msg_error'>
            {formErrors.AmbulanciaID && <div className="msg_error">{formErrors.AmbulanciaID}</div>}        
          </div>
        </div>
        <div className='btns_contratacion'>
          <button className='btn_cancelar' type="button" 
            onClick={handleCancelar}>Cancelar
          </button> 
          <input className='btn_nueva' type="submit" value="Registrar" disabled={!!mensajeAmbulancias}/>
        </div> 
      </form>
      {/* Modal de confirmación */}
      {showModal && (
        <div className="modal_confirmacion">
          <div className="modal1">
            <h3>¿Desea cancelar el registro?</h3>
            <div className="modal-buttons">
              <button className="btn_confirmar" onClick={confirmCancel}>Sí, cancelar</button>
              <button className="btn_cerrar" onClick={closeModal}>No</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default NuevaContratacion
