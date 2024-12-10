import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { message } from 'antd';
import moment from 'moment';
import '../Form/Form.css'

const RegistroContrataciones = () => {
    const { ID_Contratacion } = useParams();
    const navigate = useNavigate();
    const [contratacion, setContratacion] = useState(null);
    const [ambulancia, setAmbulancia] = useState(null);
    const [tipoContratacion, setTipoContratacion] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responseContratacion = await fetch(`http://localhost:3000/ContratacionAmbulancia/${ID_Contratacion}`);
                if (!responseContratacion.ok) {
                    throw new Error('No se pudo obtener los datos de la contratación');
                }
                const dataContratacion = await responseContratacion.json();
                console.log('Contratacion:', dataContratacion);
                setContratacion(dataContratacion);

                const responseAmbulancia = await fetch(`http://localhost:3000/ambulancia/${dataContratacion.AmbulanciaID}`);
                if (!responseAmbulancia.ok) {
                    throw new Error('No se pudo obtener los datos de la ambulancia');
                }
                const dataAmbulancia = await responseAmbulancia.json();
                console.log('Ambulancia:', dataAmbulancia);
                setAmbulancia(dataAmbulancia);

                const responseTipoContratacion = await fetch(`http://localhost:3000/tipoContratacion/${dataContratacion.ID_Tipo_Contratacion}`);
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

    const handleAccept = () => {
        navigate(`/ContratacionAmbulancias/Aceptado/${ID_Contratacion}`);
    };

    const handleReject = () => {
        navigate(`/ContratacionAmbulancias/Rechazado/${ID_Contratacion}`);
    };

    if (!contratacion || !ambulancia || !tipoContratacion) {
        return <div>Cargando...</div>;
    }

    const isAcceptDisabled = contratacion.estado === 'aceptada';
    const isRejectDisabled = contratacion.estado === 'aceptada';

  return (
    <div className="container_principal">
        <div className="flex justify-center items-center min-h-screen bg-white-100 p-4">
            <div className="flex flex-col lg:flex-row lg:space-x-8 w-full ">
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
                            onClick={handleAccept} 
                            disabled={isAcceptDisabled}
                        >
                            Aceptar Solicitud
                        </button>
                        <button 
                            type="button" 
                            className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-700" 
                            onClick={handleReject} 
                            disabled={isRejectDisabled}
                        >
                            Rechazar Solicitud
                        </button>
                    </div>
                </form>
                <div className="w-full lg:w-1/3 flex justify-center items-center mt-4 lg:mt-0">
                </div>
            </div>
        </div>
      
    </div>
  )
}

export default RegistroContrataciones
