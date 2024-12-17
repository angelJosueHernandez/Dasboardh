import React, {useState,useEffect} from 'react'
import { useParams } from 'react-router-dom';
import { RiAddFill } from "react-icons/ri";
import './HistorialCompleto.css'
import { PaperClipIcon } from '@heroicons/react/20/solid'

const HistorialCompleto = () => {
    const { ID_Historial } = useParams();
    const [historial, setHistorial] = useState(null);
    const [antecedente, setAntecedente] = useState([]);
    const [expedientes, setExpedientes] = useState([]);
  
    useEffect(() => {
      const fetchData = async () => {
          try {
              const response = await fetch(`https://api-beta-mocha-59.vercel.app/historialMedicoId/${ID_Historial}`);
              if (!response.ok) {
                  throw new Error('No se pudo obtener los datos');
              }
              const data = await response.json();
              // Verifica si data es un arreglo y si es así, toma el primer elemento
              const historialData = Array.isArray(data) ? data[0] : data;
              setHistorial(historialData);
          } catch (error) {
              console.error('Error al obtener los datos:', error);
          }
  
          try {
              const response = await fetch(`https://api-beta-mocha-59.vercel.app/antecedentesID/${ID_Historial}`);
              if (!response.ok) {
                  throw new Error('No se pudo obtener los datos');
              }
              const data = await response.json();
              // Verifica si data es un arreglo y si es así, mantenlo como está.
              // Si no es un arreglo, envuélvelo en un arreglo.
              const antecedenteData = Array.isArray(data) ? data : [data];
              setAntecedente(antecedenteData);
          } catch (error) {
              console.error('Error al obtener los datos:', error);
          }
  
          try {
              const response = await fetch(`https://api-beta-mocha-59.vercel.app/expedienteID/${ID_Historial}`);
              if (!response.ok) {
                  throw new Error('No se pudo obtener los expedientes');
              }
              const data = await response.json();
              setExpedientes(data);
          } catch (error) {
              console.error('Error al obtener los expedientes:', error);
          }
      };
  
      // Llama a fetchData inicialmente
      fetchData();
  
      // Llama a fetchData cada segundo
      const intervalId = setInterval(fetchData, 1000);
  
      // Limpia el intervalo en el momento que el componente se desmonta
      return () => clearInterval(intervalId);
  }, [ID_Historial]);
  
  
    function formatDate(dateString) {
      const date = new Date(dateString);
      const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
      return date.toLocaleDateString('es-MX', options);
    }
  
  
    const [nuevoAntecedenteVisible, setNuevoAntecedenteVisible] = useState(false);
      const [nuevoAntecedente, setNuevoAntecedente] = useState({
          nombreAntecedente: '',
          fecha_Diacnostico: '',
          tratamiento: '',
          idH:ID_Historial
      });
  
      const handleAgregarAntecedente = () => {
          setNuevoAntecedenteVisible(true);
      };
  
      const handleCancelarAgregarAntecedente = () => {
          setNuevoAntecedenteVisible(false);
      };
  
      const handleChangeNuevoAntecedente = (e) => {
          const { name, value, type, checked } = e.target;
          const newValue = type === 'checkbox' ? checked : value;
          setNuevoAntecedente(prevState => ({
              ...prevState,
              [name]: newValue
          }));
      };
  
  
      const handleSubmitNuevoAntecedente = async (e) => {
        e.preventDefault();
        
        try {
            const response = await fetch('https://api-beta-mocha-59.vercel.app/antecedentesPatologico2', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(nuevoAntecedente), // Envía el nuevo antecedente como JSON
            });
    
            if (!response.ok) {
                throw new Error('No se pudo agregar el nuevo antecedente');
            }
    
            // Si la solicitud es exitosa, limpia el formulario y oculta el formulario
            setNuevoAntecedente({
                nombreAntecedente: '',
                fecha_Diacnostico: '',
                tratamiento: ''
            });
            setNuevoAntecedenteVisible(false);
    
            console.log('Nuevo antecedente agregado exitosamente');
        } catch (error) {
            console.error('Error al agregar el nuevo antecedente:', error);
        }
    };
    
  
  
    return (
      <div>
        <div>
          {historial ? (
                    <div>
                        <div className='contendor_historial_completo'>
                            <div className='datos_personales'>
                                <h1 className='informacion_Personal'>Información Personal</h1>
                                <p><strong>Nombre Completo:</strong></p>
                                <p>{historial.nombre}</p>
                                <p><strong>Apellido Paterno:</strong></p>
                                <p>{historial.apellido_Paterno}</p>
                                <p><strong>Apellido Materno:</strong></p>
                                <p>{historial.apellido_Materno}</p>
                                
                                <p><strong>Municipio:</strong></p>
                                <p>{historial.Municipio}</p>
                                <p><strong>Colonia:</strong></p>
                                <p>{historial.colonia}</p>
                                <p><strong>Calle:</strong></p>
                                <p>{historial.calle}</p>

                                <h1 className='informacion_Personal'>Contacto de Emergencia</h1>
                                <p><strong>Nombre Completo:</strong></p>
                                <p>{historial.nombre_Contacto}</p>
                                <p><strong>Apellido Paterno:</strong></p>
                                <p>{historial.apellidoP_Contacto}</p>
                                <p><strong>Apellido Materno:</strong></p>
                                <p>{historial.apellidoM_Contacto}</p>
                                <p><strong>Telefono:</strong></p>
                                <p>{historial.telefono}</p>
                              
                              
                            </div>
                            <div className='antecedentes_completos'>
                            <div className='contenedor_antecedentes'>
                                <h1 className='titulo_antecedente'>Antecedentes Patologicos</h1>
                              {antecedente.map((antecedentes, index) => (
                                <div key={index} className='grupo_antecedente'>
                                    <p><strong>Nombre:</strong></p>
                                    <p>{antecedentes.nombre}</p>
                                    <p><strong>Fecha Diagnostico:</strong></p>
                                    <p>{formatDate(antecedentes.fecha_Diacnostico)}</p>
                                    <p><strong>Tratamiento:</strong></p>
                                    <p>{antecedentes.tratamiento}</p>
                                </div>
                              ))}

                                    <div className='contendor_btnAntecedente'>
                                        <button 
                                            className='btn_antecedente' 
                                            type="button"
                                            onClick={handleAgregarAntecedente}>Agregar Nuevo Antecedente Patologico
                                        </button>
                                    </div>
                              <div className='nuevo_antecedente'>
                                {nuevoAntecedenteVisible ? (
                                    <form className='form_nuevo' onSubmit={handleSubmitNuevoAntecedente}>
                                        <div>
                                            <input type="text" 
                                                  className='nuevo-text'
                                                  name="nombreAntecedente" 
                                                  value={nuevoAntecedente.nombreAntecedente} 
                                                  onChange={handleChangeNuevoAntecedente} 
                                                  placeholder="Nombre Antecedente" required 
                                                />
                                        </div>
                                        <div>
                                            <input type="date" 
                                                  className='nuevo-text'
                                                  name="fecha_Diacnostico" 
                                                  value={nuevoAntecedente.fecha_Diacnostico} 
                                                  onChange={handleChangeNuevoAntecedente} required 
                                                />
                                        </div>
                                        <div>
                                            <input 
                                              className='nuevo-text'
                                              type="text" 
                                              name="tratamiento" 
                                              value={nuevoAntecedente.tratamiento} 
                                              onChange={handleChangeNuevoAntecedente} 
                                              placeholder="Tratamiento" 
                                            />
                                        </div>
                                        <div className='contenedor_btn'>
                                            <button className='btn_guardar'type="submit">Guardar</button>
                                            <button className='btn_cancelar' type="button" onClick={handleCancelarAgregarAntecedente}>Cancelar</button>
                                        </div>
                                    </form>
                                ) : (
                                  <div>
                                    
                                  </div>
                                )}
                            </div>
                              
                          </div>
  
                          {/*
                            <div className='contenedor_expedientes'>
                              <div className='tituloA'><h1>Expedientes</h1></div>
                                {expedientes.map((expediente, index) => (
                                    <div key={index} className='grupo_expediente'>
                                        <div>
                                            <p>Fecha: {formatDate(expediente.fecha)}</p>
                                        </div>
                                        <div>
                                            <p>Motivo: {expediente.motivo}</p>
                                        </div>
                                        <div>
                                            <p>Diagnóstico ingreso: {expediente.diacnostico_ingreso}</p>
                                        </div>
                                        <div>
                                            <p>Diagnóstico egreso: {expediente.diacnostico_egreso}</p>
                                        </div>
                                        <div>
                                            <p>Medicamentos: {expediente.medicamentos}</p>
                                        </div>
                                    </div>
                                ))}
                                <div className='nuevo_antecedente'>
                                  <div><button className='btn_antecedente' type="button"><RiAddFill className='icon_add'/></button></div>
                                  <div><p>Agregar Nuevo Expediente</p></div>
                                </div>
                            </div> */}
                          </div>
                          <div className='contenedor_alergias'>
                            <h1 className='titulo_alergias'>Alergico a Medicamentos</h1>
                            <div><p>Medicamentos: {historial.alergico_Medicamento}</p></div>
                          </div>

                        

                          


                      </div>
                    </div>
                ) : (
                    <p>Cargando...</p>
          )}
          
        </div>
      </div>
    )
}

export default HistorialCompleto
