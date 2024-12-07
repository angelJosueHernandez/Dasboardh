import React, { useState, useEffect } from 'react'
import { Pagination, Input, DatePicker } from 'antd';
import { FiSearch } from "react-icons/fi";
import { FaUserEdit, FaTimes } from "react-icons/fa";
import './Table.css'
import '../Form/ModalPersonal.css'

const TblPersonal = () => {
    const [personal, setPersonal] = useState([]);
    const [cargo, setCargo] = useState([]);
    const [selectedCargo, setSelectedCargo] = useState('');
    const [selectedPersonalId, setSelectedPersonalId] = useState('');
    const [selectedPersonal, setSelectedPersonal] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    const URLPersonal = 'https://api-beta-mocha-59.vercel.app/personal';
    const URLTipoCargo = 'https://api-beta-mocha-59.vercel.app/tipoCargo';

    useEffect(() => {
        const fetchData = async () => {
            const personalResponse = await fetch(URLPersonal);
            const personalData = await personalResponse.json();
            setPersonal(personalData);

            const cargoResponse = await fetch(URLTipoCargo);
            const cargoData = await cargoResponse.json();
            setCargo(cargoData);
        };

        fetchData();

        const interval = setInterval(fetchData, 1000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const selected = personal.find(item => item.ID_Asociado === selectedPersonalId);
        setSelectedPersonal(selected);
    }, [selectedPersonalId, personal]);

    const handleCargoChange = (event) => {
        setSelectedCargo(event.target.value);
    };

    const handleEdit = (id) => {
        setSelectedPersonalId(id);
        setEditMode(true);
        toggleMenu();
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`https://api-beta-mocha-59.vercel.app/actualizarPersonal/${selectedPersonalId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ Id_Cargo: selectedCargo }),
            });
            if (response.ok) {
                toggleMenu();
            } else {
                console.error('Error al actualizar el cargo');
            }
        } catch (error) {
            console.error('Error al conectar con el servidor:', error);
        }
    };

    const handleCancel = () => {
        setEditMode(false);
        toggleMenu();
    };

    function toggleMenu() {
        setModalOpen(!modalOpen);
    }

    const atenderCita = async (ID_Asociado, estadoActual) => {
        try {
            const nuevoEstado = estadoActual === 'Activo' ? 'Desactivado' : 'Activo';
            await fetch(`https://api-beta-mocha-59.vercel.app/actualizarEstadoPersonal/${ID_Asociado}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ estado_Usuario: nuevoEstado }),
            });
        } catch (error) {
            console.error('Error al actualizar el estado de la cita:', error);
        }
    };

    function formatDate(dateString) {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
        return date.toLocaleDateString('es-MX', options);
    }

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = personal.slice(indexOfFirstItem, indexOfLastItem);

    const onChangePage = (page) => setCurrentPage(page);
    const onChangeItemsPerPage = (current, size) => {
        setCurrentPage(1);
        setItemsPerPage(size);
    };

    return (
        <div /*className='container_principal'*/>
            <div>
                {currentItems.length === 0 ? (
                <div className="textLe">No se encontraron registros</div>
                ) : (
                <table className='tabla'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Apellido Paterno</th>
                            <th>Apellido Materno</th>
                            <th>Fecha de Registro</th>
                            <th>Estado del Usuario</th>
                            <th>Estado de Cuenta</th>
                            <th>Cargo</th>
                            <th>Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((item) => (
                            <tr key={item.ID_Asociado}>
                                <td>{item.ID_Asociado}</td>
                                <td>{item.nombre}</td>
                                <td>{item.apellidoP}</td>
                                <td>{item.apellidoM}</td>
                                <td>{formatDate(item.fecha_Registro)}</td>
                                <td>{item.estado_Usuario}</td>
                                <td>{item.estado_Cuenta}</td>
                                <td>{item.Id_Cargo}</td>
                                <td>
                                    <div className='contenedor_btn'>
                                        <button className='btn_editar' type="button" onClick={() => handleEdit(item.ID_Asociado)}><FaUserEdit className='icon_editar'/></button>
                                        <button
                                            className='btn_eliminar'
                                            onClick={() => atenderCita(item.ID_Asociado, item.estado_Usuario)}
                                            type="button">{item.estado_Usuario === 'Activo' ? 'Desactivar' : 'Activar'}
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                )}
                
                <br />
                <div className="pagination">
                    <Pagination
                        current={currentPage}
                        onChange={onChangePage}
                        total={personal.length}
                        showSizeChanger
                        showQuickJumper
                        pageSizeOptions={['5', '10']}
                        onShowSizeChange={onChangeItemsPerPage}
                        locale={{
                        items_per_page: 'Registros por página',
                        jump_to: 'Ir a',
                        jump_to_confirm: 'confirmar',
                        page: 'Página',
                        }}
                    />
                </div>

                <div>
                    {editMode && (
                        <form className={`modal_editar ${modalOpen ? 'open-menu' : ''}`} id='modalEditar' onSubmit={handleSubmit}>
                            {selectedPersonal && (
                                <>
                                    
                                    <label htmlFor="">Nombre</label>
                                    <input className='input_Modal' type="text" value={selectedPersonal.nombre} readOnly />
                                    
                                    
                                    <label htmlFor="">Apellido Paterno</label>
                                    <input className='input_Modal' type="text" value={selectedPersonal.apellidoP} readOnly />
                                    
                                    
                                    <label htmlFor="">Apellido Materno</label>
                                    <input className='input_Modal' type="text" value={selectedPersonal.apellidoM} readOnly />
                                </>
                            )}
                                <label htmlFor="">Cargo</label>
                                <select className='input_Modal' value={selectedCargo} onChange={handleCargoChange}>
                                    {cargo.map((cargos) => (
                                        <option
                                            key={cargos.Id_Cargo}
                                            value={cargos.Id_Cargo}>{cargos.tipo_Cargo}
                                        </option>
                                    ))}
                                </select>
                            <div className='btns_editar_personal'>
                                <div className="btn-group">
                                    <button className='btn_actualizar_personal' type="submit">Actualizar</button>
                                    <button className='btn_cancelar_personal' type="button" onClick={handleCancel}>Cancelar</button>
                                </div>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    )
}

export default TblPersonal
