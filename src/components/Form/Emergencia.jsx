import React,{useState, useEffect} from 'react'
import TblEmergencias from '../Tables/TblEmergencias'
import './Form.css'
import './ModalEmergencias.css'
import { Formik,Form,Field,ErrorMessage } from 'formik'
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Emergencia() {
  const [showModal, setShowModal] = useState(false); // Estado para controlar el modal
  const [newEmergency, setNewEmergency] = useState({}); // Estado para la nueva emergencia

  const [tipoEmergencia,setTipoEmergencia]=useState([]);

    const URLUser='https://api-beta-mocha-59.vercel.app/tipoEmergencia';

    const peticionGet= async()=>{
        const response= await fetch(URLUser)
        const data= await response.json();
        setTipoEmergencia(data) 
    }
    
    useEffect(()=>{
        peticionGet();
    },[])

    const [personal,setPersonal]=useState([]);

    const URLPersonal='https://api-beta-mocha-59.vercel.app/personal';

    const peticionGet2= async()=>{
        const response= await fetch(URLPersonal)
        const data= await response.json();
        setPersonal(data) 
    }
    
    useEffect(()=>{
        peticionGet2();
    },[])

  const [formularioEnviado,cambiarFormularioEnviado]= useState(false);

  const handleModalSubmit = () => {
    console.log('Nueva emergencia:', newEmergency);
    setShowModal(false);
    setNewEmergency({});
  };

  AOS.init();
  return (
    <div className="container_principal" data-aos="fade-up" data-aos-duration="3000">
      <h1 className="title_emergencias">Emergencias Registradas</h1>
      
      {/* Botón para abrir el modal */}
      <div style={{ textAlign: 'right', marginBottom: '10px' }}>
        <button className="btn_new_emergency" onClick={() => setShowModal(true)}>
          Nueva Emergencia
        </button>
      </div>

      {/* Tabla */}
      <TblEmergencias/>
      {/* Modal */}
      {showModal && (
        <div className="modal">
          <div className="modal_content">
          <div>
            <Formik
              initialValues={{
                folio:'',
                nombre:'',
                apellido_Paterno:'',
                apellido_Materno:'',
                lugar_Servicio:'',
                sexo:'',
                edad:'',
                ID_Emergencia:'',
                ID_Asociado:''
              }}
              validate={(valores)=>{
                  let errores={};


                  if(!valores.folio){
                    errores.folio='Por favor ingresa un folio'
                  } else if(!/^[0-9]{1,40}$/.test(valores.folio)){
                    errores.folio='El folio solo puede contener numeros'
                  }

                  //validacion del nombre
                  if(!valores.nombre){
                      errores.nombre='Por favor ingresa un nombre'
                  } else if(!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.nombre)){
                      errores.nombre='El nombre solo puede contener letras'
                  }

                  //validacion de los apellidos
                  if(!valores.apellido_Paterno){
                      errores.apellido_Paterno='Por favor ingresa un apellido'
                  } else if(!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.apellido_Paterno)){
                      errores.apellido_Paterno='El apellido solo puede contener letras'
                  }

                  if(!valores.apellido_Materno){
                      errores.apellido_Materno='Por favor ingresa un apellido'
                  } else if(!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.apellido_Materno)){
                      errores.apellido_Materno='El apellido solo puede contener letras'
                  }

                  // validacion de edad
                  if(!valores.edad){
                      errores.edad='Por favor ingresa una edad'
                  } else if(!/^[0-9]{1,40}$/.test(valores.edad)){
                      errores.edad='La edad solo puede contener numeros'
                  }

                  //validacion del municipio
                  if(!valores.lugar_Servicio){
                      errores.lugar_Servicio='Por favor ingresa un lugar de servicio'
                  } else if(!/^[a-zA-ZÀ-ÿ\s0-9]+$/.test(valores.lugar_Servicio)){
                      errores.lugar_Servicio='El lugar de Servicio solo puede contener letras y numeros'
                  }

                  //validacion para la colonia
                  if(!valores.sexo){
                      errores.sexo='Por favor seleccione un sexo'
                  }

                  //validacion para la calle
                  if(!valores.ID_Emergencia){
                      errores.ID_Emergencia='Por favor seleccione un tipo de emergencia'
                  } 

                  // validacion de edad
                  if(!valores.ID_Asociado){
                    errores.ID_Asociado='Por favor ingresa un responsable'
                  }
                  
                  return errores;
              }}
              
              onSubmit={(valores,{resetForm})=>{
                    
                fetch("https://api-beta-mocha-59.vercel.app/registrarEmergencia",
                    {
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json' // Especifica que el cuerpo de la solicitud es JSON
                        },
                        body: JSON.stringify(valores),
                        credentials: 'include', // Convierte el objeto 'valores' a JSON
                    })
                resetForm();

                console.log(valores);
                setShowModal(false);
                cambiarFormularioEnviado(true);
                //desaparece la leyenda de formulario enviado despues de 5 segundos
                setTimeout(()=>cambiarFormularioEnviado(false),5000);
              }}
            >
            
            

            {({errors})=>(
                <Form /*className='form_Emergencias'*/ >
                <div className='form_Grid_emergencia'>
                    <div className='sub-tituloE'><h1>Registro de Emergencias</h1></div>
                    <div className='grup-input'>
                      <div><label htmlFor="" className='label-name'>Folio:</label></div>
                      <div><Field
                            type="text" 
                            name="folio" 
                            id="" 
                            className='input-text' 
                          />
                      </div>
                      <div className='msg_error'>
                        <ErrorMessage name='folio' component={()=>(
                          <div><span>{errors.folio}</span></div>
                        )}/>
                      </div>
                    </div>
                    <div className='grup-input'>
                      <div><label htmlFor="" className='label-name'>Nombre:</label></div>
                      <div><Field
                            type="text" 
                            name="nombre" 
                            id="" 
                            className='input-text' 
                          />
                      </div>
                      <div className='msg_error'>
                        <ErrorMessage name='nombre' component={()=>(
                          <div><span>{errors.nombre}</span></div>
                        )}/>
                      </div>
                    </div>
                    <div className='grup-input'>
                      <div><label htmlFor="" className='label-name'>Apellido Paterno:</label></div>
                      <div><Field
                            type="text" 
                            name="apellido_Paterno" 
                            id="" 
                            className='input-text' 
                          />
                      </div>
                      <div className='msg_error'>
                        <ErrorMessage name='apellido_Paterno' component={()=>(
                          <div><span>{errors.apellido_Paterno}</span></div>
                        )}/>
                      </div>
                    </div>
                    <div className='grup-input'>
                      <div><label htmlFor="" className='label-name'>Apellido Materno:</label></div>
                      <div><Field 
                            type="text" 
                            name="apellido_Materno" 
                            id="" 
                            className='input-text'
                          />
                      </div>
                      <div className='msg_error'>
                        <ErrorMessage name='apellido_Materno' component={()=>(
                          <div><span>{errors.apellido_Materno}</span></div>
                        )}/>
                      </div>
                    </div>
                    <div className='grup-input'>
                      <div><label htmlFor="" className='label-name'>Lugar de Servicio:</label></div>
                      <div><Field 
                            type="text" 
                            name="lugar_Servicio" 
                            id="" 
                            className='input-text' 
                          />
                      </div>
                      <div className='msg_error'>
                        <ErrorMessage name='lugar_Servicio' component={()=>(
                          <div><span>{errors.lugar_Servicio}</span></div>
                        )}/>
                      </div>
                    </div>
                    <div className='grup-input'>
                      <div><label htmlFor="" className='label-name'>Sexo:</label></div>
                      <div>
                        <Field type="radio" name="sexo" value="F" /> Femenino
                        <Field type="radio" name="sexo" value="M"/> Masculino
                      </div>
                      <div className='msg_error'>
                        <ErrorMessage name='sexo' component={()=>(
                          <div><span>{errors.sexo}</span></div>
                        )}/>
                      </div>
                    </div>
                    <div className='grup-input'>
                      <div><label htmlFor="" className='label-name'>Edad:</label></div>
                      <div><Field
                            type="text" 
                            name="edad" 
                            id="" 
                            className='input-text' 
                            
                          />
                      </div>
                      <div className='msg_error'>
                        <ErrorMessage name='edad' component={()=>(
                          <div><span>{errors.edad}</span></div>
                        )}/>
                      </div>
                    </div>
                    <div className='grup-input'>
                        <div><label htmlFor="" className='label-name'>Tipo de Emergencia:</label></div>
                        <div><Field as="select" name="ID_Emergencia" 
                                    
                                    //onBlur={() => validateTipoEmergencia(tipoEmergencias)}
                                    className='input-text'>
                                        {tipoEmergencia.map((tipo)=>(
                                            <option 
                                                key={tipo.ID_Emergencia} 
                                                value={tipo.ID_Emergencia}>{tipo.tipo}
                                            </option>
                                        ))}
                            </Field>
                        </div>
                      <div className='msg_error'>
                        <ErrorMessage name='ID_Emergencia' component={()=>(
                          <div><span>{errors.ID_Emergencia}</span></div>
                        )}/>
                      </div>
                    </div>
                    <div className='grup-input'>
                      <div><label htmlFor="" className='label-name'>Responsable:</label></div>
                      <div><Field as="select" name="ID_Asociado" 
                                    className='input-text'>
                                        {personal.map((personales)=>(
                                            <option 
                                                key={personales.ID_Asociado} 
                                                value={personales.ID_Asociado}>{personales.nombre}
                                            </option>
                                        ))}
                            </Field>
                        </div>
                        <div className='msg_error'>
                          <ErrorMessage name='ID_Asociado' component={()=>(
                            <div><span>{errors.ID_Asociado}</span></div>
                          )}/>
                        </div>
                    </div>
                    <div className='conte-registrarE'>
                        <input className='btn_submit' type="submit" value="Registrar" />
                        <button className='btn_cancel' type="button" onClick={() => setShowModal(false)}>Cancelar</button>
                        
                    </div>
                    {formularioEnviado &&<p className='exito'>Formulario Enviado con Exito</p>}
                </div>
            </Form>
            )}
            </Formik>
            
          </div>
          </div>
        </div>
      )}
    </div>
  )
}
