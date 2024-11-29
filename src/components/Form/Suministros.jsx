import React,{useState, useEffect} from 'react'
import { Formik,Form,Field,ErrorMessage } from 'formik'
import TblSuministros from '../Tables/TblSuministros';
import './Form.css'
import './ModalEmergencias.css'
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
            <div>
                <div className="isolate bg-white px-6 py-24 sm:py-5 lg:px-8">
                    <div
                        aria-hidden="true"
                        className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
                    >
                        <div
                        style={{
                            clipPath:
                            'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                        }}
                        className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#fa9797] to-[#ff6e6e] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
                        />
                    </div>
                    <div className="mx-auto max-w-2xl text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Suministros Medicos</h2>
                        
                    </div>
                    <form onSubmit={handleSubmit} className="mx-auto mt-16 max-w-xl sm:mt-20">
                        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                        <div>
                            <label htmlFor="clave" className="block text-sm font-semibold leading-6 text-gray-900">
                            Clave
                            </label>
                            <div className="mt-2.5">
                            <input
                                id="clave"
                                name="clave"
                                type="text"
                                autoComplete="family-name"
                                value={clave}
                                onChange={(e) => setClave(e.target.value)}
                                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="nombre_insumo" className="block text-sm font-semibold leading-6 text-gray-900">
                            Nombre del Insumo
                            </label>
                            <div className="mt-2.5">
                            <input
                                id="nombre_insumo"
                                name="nombre_insumo"
                                type="text"
                                autoComplete="family-name"
                                value={nombre_insumo}
                                onChange={(e) => setNombre_Insumo(e.target.value)}
                                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="cantidad" className="block text-sm font-semibold leading-6 text-gray-900">
                            Cantidad
                            </label>
                            <div className="mt-2.5">
                            <input
                                id="cantidad"
                                name="cantidad"
                                type="text"
                                autoComplete="family-name"
                                value={cantidad}
                                onChange={(e) => setCantidad(e.target.value)}
                                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="lote" className="block text-sm font-semibold leading-6 text-gray-900">
                            Número o Clave del Lote
                            </label>
                            <div className="mt-2.5">
                            <input
                                id="lote"
                                name="lote"
                                type="text"
                                autoComplete="family-name"
                                value={lote}
                                onChange={(e) => setLote(e.target.value)}
                                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            </div>
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="fecha_caducidad" className="block text-sm font-semibold leading-6 text-gray-900">
                            Fecha de Caducidad
                            </label>
                            <div className="mt-2.5">
                            <input
                                id="fecha_caducidad"
                                name="fecha_caducidad"
                                type="date"
                                autoComplete="organization"
                                value={fecha_caducidad}
                                onChange={(e) => setFechaCaducidad(e.target.value)}
                                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            </div>
                        </div>
                        </div>
                        <div className="mt-10">
                        <button
                            type="submit"
                            className="block w-full rounded-md bg-red-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-red-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Guardar Registro del Suministro
                        </button>
                        </div>
                    </form>
                    </div>
            
          </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Suministros
