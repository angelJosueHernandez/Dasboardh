import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { message, Button, Popconfirm  } from 'antd';
import moment from 'moment';
//import '../Form/Form.css'

const RegistroContrataciones = () => {
    const { ID_Contratacion } = useParams();
    const navigate = useNavigate();
    const [contratacion, setContratacion] = useState(null);
    const [ambulancia, setAmbulancia] = useState(null);
    const [tipoContratacion, setTipoContratacion] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalContent, setModalContent] = useState('');
    const [modalType, setModalType] = useState(''); // 'accept' o 'reject'
    const [motivo, setMotivo] = useState('');
    const [precio, setPrecio] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responseContratacion = await fetch(`https://api-beta-mocha-59.vercel.app/ContratacionAmbulancia/${ID_Contratacion}`);
                if (!responseContratacion.ok) {
                    throw new Error('No se pudo obtener los datos de la contratación');
                }
                const dataContratacion = await responseContratacion.json();
                console.log('Contratacion:', dataContratacion);
                setContratacion(dataContratacion);

                const responseAmbulancia = await fetch(`https://api-beta-mocha-59.vercel.app/ambulancia/${dataContratacion.AmbulanciaID}`);
                if (!responseAmbulancia.ok) {
                    throw new Error('No se pudo obtener los datos de la ambulancia');
                }
                const dataAmbulancia = await responseAmbulancia.json();
                console.log('Ambulancia:', dataAmbulancia);
                setAmbulancia(dataAmbulancia);

                const responseTipoContratacion = await fetch(`https://api-beta-mocha-59.vercel.app/tipoContratacion/${dataContratacion.ID_Tipo_Contratacion}`);
                if (!responseTipoContratacion.ok) {
                    throw new Error('No se pudo obtener los datos del tipo de contratación');
                }
                const dataTipoContratacion = await responseTipoContratacion.json();
                console.log('Tipo de Contratacion:', dataTipoContratacion);
                setTipoContratacion(dataTipoContratacion);
            } catch (error) {
                console.error('Error al obtener los datos:', error);
                message.error('Error al obtener los datos');
            }
        };

        fetchData();
    }, [ID_Contratacion]);

    const formatDate = (dateString) => {
        return moment(dateString).format('DD/MM/YYYY');
    };

    const formatTime = (timeString) => {
        return moment(timeString, 'HH:mm').format('HH:mm');
    };

    const handleModalOpen = (type) => {
        setModalType(type);
        setIsModalVisible(true);
    };

    const handleModalClose = () => {
        setIsModalVisible(false);
        setMotivo('');
        setPrecio('');
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);

        const estado = modalType === 'accept' ? 'aceptada' : 'rechazada';
        const body = modalType === 'accept' ? { estado, motivo, precio } : { estado, motivo };
        console.log('Cuerpo de la solicitud:', body); // Asegúrate de que esto contiene los datos esperados

        try {
            const response = await fetch(`https://api-beta-mocha-59.vercel.app/ContratacionAmbulancia/${ID_Contratacion}/estado`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });

            if (response.ok) {
                message.success(`Solicitud ${estado} con éxito`);
                handleModalClose();
            } else {
                message.error(`Error al ${estado} la solicitud`);
            }
        } catch (error) {
            console.error('Error:', error);
            message.error(`Error al ${estado} la solicitud`);
        } finally {
            setIsSubmitting(false);
        }
    };


    if (!contratacion || !ambulancia || !tipoContratacion) {
        return <div>Cargando...</div>;
    }

    const handleFinalizarContratacion = async () => {
        try {
            const response = await fetch(`http://localhost:3000/ContratacionRealizada/${ID_Contratacion}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ estado: 'Realizada' }),
            });

            if (!response.ok) throw new Error('Error al finalizar la contratación');

            message.success('Contratación finalizada con éxito');
            navigate('/ContratacionAmbulancias'); // Redirigir al componente
        } catch (error) {
            console.error('Error al finalizar la contratación:', error);
            message.error('Error al finalizar la contratación');
        }
    };


  return (
    <div className="">
        <div className="flex justify-center items-center min-h-screen bg-white-100 p-4 mt-10">
            <div className="flex flex-col w-full max-w-5xl ">
                <form className="w-full ">
                    <h3 className="text-[30px] text-red-800 mb-4" style={{ width: '100%', textAlign: 'center' }}>Detalle de Contratación de Ambulancia</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="form-group col-span-1 md:col-span-1">
                            <label className="block text-sm font-medium text-gray-700">Nombre</label>
                            <p className="mt-1 p-2 text-[12px] border border-gray-300 rounded-md w-full bg-gray-50">{contratacion.nombre}</p>
                        </div>
                        <div className="form-group col-span-1 md:col-span-1">
                            <label className="block text-sm font-medium text-gray-700">Apellido Paterno</label>
                            <p className="mt-1 p-2 text-[12px] border border-gray-300 rounded-md w-full bg-gray-50">{contratacion.apellido_Paterno}</p>
                        </div>
                        <div className="form-group col-span-1 md:col-span-1">
                            <label className="block text-sm font-medium text-gray-700">Apellido Materno</label>
                            <p className="mt-1 p-2 text-[12px] border border-gray-300 rounded-md w-full bg-gray-50">{contratacion.apellido_Materno}</p>
                        </div>
                        <div className="form-group col-span-1 md:col-span-1">
                            <label className="block text-sm font-medium text-gray-700">Inicio de Traslado</label>
                            <p className="mt-1 p-2 text-[12px] border border-gray-300 rounded-md w-full bg-gray-50">{contratacion.inicio_Traslado}</p>
                        </div>
                        <div className="form-group col-span-1 md:col-span-1">
                            <label className="block text-sm font-medium text-gray-700">Escala</label>
                            <p className="mt-1 p-2 text-[12px] border border-gray-300 rounded-md w-full bg-gray-50">{contratacion.escala}</p>
                        </div>
                        <div className="form-group col-span-1 md:col-span-1">
                            <label className="block text-sm font-medium text-gray-700">Destino de Traslado</label>
                            <p className="mt-1 p-2 text-[12px] border border-gray-300 rounded-md w-full bg-gray-50">{contratacion.destino_Traslado}</p>
                        </div>
                        <div className="form-group col-span-1 md:col-span-2 lg:col-span-3">
                            <label className="block text-sm font-medium text-gray-700">Motivo</label>
                            <p className="mt-1 p-2 text-[12px] border border-gray-300 rounded-md w-full bg-gray-50">{contratacion.motivo}</p>
                        </div>
                        <div className="form-group col-span-1 md:col-span-2 lg:col-span-3">
                            <label className="block text-sm font-medium text-gray-700">Material Específico</label>
                            <p className="mt-1 p-2 text-[12px] border border-gray-300 rounded-md w-full bg-gray-50">{contratacion.material_especifico}</p>
                        </div>
                        <div className="form-group col-span-1 md:col-span-1">
                            <label className="block text-sm font-medium text-gray-700">Fecha</label>
                            <p className="mt-1 p-2 text-[12px] border border-gray-300 rounded-md w-full bg-gray-50">{formatDate(contratacion.fecha)}</p>
                        </div>
                        <div className="form-group col-span-1 md:col-span-1">
                            <label className="block text-sm font-medium text-gray-700">Horario</label>
                            <p className="mt-1 p-2 text-[12px] border border-gray-300 rounded-md w-full bg-gray-50">{formatTime(contratacion.horario)}</p>
                        </div>
                        <div className="form-group col-span-1 md:col-span-1">
                            <label className="block text-sm font-medium text-gray-700">Estado</label>
                            <p className="mt-1 p-2 text-[12px] border border-gray-300 rounded-md w-full bg-gray-50">{contratacion.estado}</p>
                        </div>
                        <div className="form-group col-span-1 md:col-span-1">
                            <label className="block text-sm font-medium text-gray-700">Número de Ambulancia</label>
                            <p className="mt-1 p-2 text-[12px] border border-gray-300 rounded-md w-full bg-gray-50">{ambulancia.NumeroAmbulancia}</p>
                        </div>
                        <div className="form-group col-span-1 md:col-span-1">
                            <label className="block text-sm font-medium text-gray-700">Tipo de Ambulancia</label>
                            <p className="mt-1 p-2 text-[12px] border border-gray-300 rounded-md w-full bg-gray-50">{ambulancia.TipoAmbulancia}</p>
                        </div>
                        <div className="form-group col-span-1 md:col-span-1">
                            <label className="block text-sm font-medium text-gray-700">Tipo de Contratación</label>
                            <p className="mt-1 p-2 text-[12px] border border-gray-300 rounded-md w-full bg-gray-50">{tipoContratacion.tipo}</p>
                        </div>
                    </div>
                    <div className="flex justify-center space-x-4 mt-4">
                        <button 
                            type="button" 
                            className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-700" 
                            onClick={() => handleModalOpen('accept')}
                        >
                            Aceptar Solicitud
                        </button>
                        <button 
                            type="button" 
                            className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-700" 
                            onClick={() => handleModalOpen('reject')}
                        >
                            Rechazar Solicitud
                        </button>
                        <Popconfirm
                            title="Finalizar Contratación"
                            description="¿Estas Seguro de finalizar la contratación?"
                            icon={
                            <QuestionCircleOutlined
                                style={{
                                color: 'red',
                                }}
                            />
                            }
                            onConfirm={handleFinalizarContratacion} 
                        >
                            <Button style={{background:'#FF0040', color:'#fff',height:'40px'}} 
                                >Finalizar Contratación
                            </Button>
                        </Popconfirm>
                    </div>
                </form>
                <div className="w-full lg:w-1/3 flex justify-center items-center mt-4 lg:mt-0">
                </div>
            </div>
        </div>
        {isModalVisible && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white p-6 rounded-md shadow-md w-96">
                    <h3 className="text-lg font-semibold mb-4">
                        {modalType === 'accept' ? 'Motivo de Aceptación' : 'Motivo de Rechazo'}
                    </h3>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label className="block text-sm font-medium text-gray-700">
                                {modalType === 'accept' ? 'Motivo de Aceptación' : 'Motivo de Rechazo'}
                            </label>
                            <textarea
                                className="mt-1 p-2 text-[12px] border border-gray-300 rounded-md w-full bg-gray-50"
                                value={motivo}
                                onChange={(e) => setMotivo(e.target.value)}
                                rows="4"
                                required
                            />
                        </div>
                        {modalType === 'accept' && (
                            <div className="form-group mt-4">
                                <label className="block text-sm font-medium text-gray-700">Precio de la Contratación</label>
                                <input
                                    type="text"
                                    className="mt-1 p-2 text-[12px] border border-gray-300 rounded-md w-full bg-gray-50"
                                    value={precio}
                                    onChange={(e) => setPrecio(e.target.value)}
                                    pattern="^\d+(\.\d{1,2})?$"
                                    title="El precio debe ser un número válido con hasta dos decimales"
                                    required
                                />
                            </div>
                        )}
                        <div className="flex justify-end space-x-4 mt-4">
                            <button
                                type="button"
                                className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400"
                                onClick={handleModalClose}
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-700"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Procesando...' : modalType === 'accept' ? 'Aceptar' : 'Rechazar'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )}
    </div>
  )
}

export default RegistroContrataciones
