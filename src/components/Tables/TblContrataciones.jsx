import React, {useState, useEffect} from 'react'
import { Pagination, Input, DatePicker } from 'antd';
import { Link } from 'react-router-dom';
import { FiSearch } from "react-icons/fi";
import './Table.css'


const TblContrataciones = () => {
    const [historial, setHistorial] = useState([]);
    const [filterDate, setFilterDate] = useState(null);
    const [filterNombre, setFilterNombre] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [ambulancias, setAmbulancias] = useState([]);
    const [tipoContratacion, setTipoContratacion] = useState([]);

    const URLContratacion = 'http://localhost:3000/ContratacionAmbulancias';
    const URLAmbulancias = 'https://api-beta-mocha-59.vercel.app/Ambulancias';
    const URLTipoContratacion = 'https://api-beta-mocha-59.vercel.app/TipoContratacion';

    function formatDate(dateString) {
        const date = new Date(dateString);
        date.setTime(date.getTime() + date.getTimezoneOffset() * 60 * 1000);
        const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
        return date.toLocaleDateString('es-MX', options);
    }

    useEffect(() => {
        const peticionContratacionAmbulancia = async () => {
            const response = await fetch(URLContratacion);
            const data = await response.json();
            setHistorial(data);
        };
        const peticionGetAmbulancias = async () => {
            const response = await fetch(URLAmbulancias);
            const data = await response.json();
            setAmbulancias(data);
        };

        const peticionTipoContratacion = async () => {
            const response = await fetch(URLTipoContratacion);
            const data = await response.json();
            setTipoContratacion(data);
        };

        peticionContratacionAmbulancia();
        peticionGetAmbulancias();
        peticionTipoContratacion();

        const interval = setInterval(() => {
            peticionContratacionAmbulancia();
            peticionGetAmbulancias();
            peticionTipoContratacion();
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const filterItems = () => {
        return historial.filter(item => {
            const filterDateLower = filterDate ? formatDate(filterDate).toLowerCase() : '';
            const fechaItemLower = formatDate(item.fecha).toLowerCase();
            const filterNombreLower = filterNombre ? filterNombre.toLowerCase() : '';

            const dateMatch = !filterDateLower || fechaItemLower.includes(filterDateLower);
            const nombreMatch = !filterNombreLower || item.nombre.toLowerCase().includes(filterNombreLower) || item.apellido_Paterno.toLowerCase().includes(filterNombreLower) || item.apellido_Materno.toLowerCase().includes(filterNombreLower);

            return dateMatch && nombreMatch;
        });
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filterItems().slice(indexOfFirstItem, indexOfLastItem);

    const onChangePage = (page) => setCurrentPage(page);
    const onChangeItemsPerPage = (current, size) => {
        setCurrentPage(1);
        setItemsPerPage(size);
    };

    const columns = [
        { title: 'ID', dataIndex: 'ID_Contratacion', key: 'ID_Contratacion', width: 50 },
        { title: 'Nombre', dataIndex: 'nombre', key: 'nombre', width: 150 },
        { title: 'Apellido Paterno', dataIndex: 'apellido_Paterno', key: 'apellido_Paterno', width: 150 },
        { title: 'Apellido Materno', dataIndex: 'apellido_Materno', key: 'apellido_Materno', width: 150 },
        { title: 'Traslado', dataIndex: 'inicio_Traslado', key: 'inicio_Traslado', width: 200 },
        { title: 'Escala', dataIndex: 'escala', key: 'escala', width: 100 },
        { title: 'Fecha', dataIndex: 'fecha', key: 'fecha', render: formatDate, width: 150 },
        { title: 'Estado', dataIndex: 'estado', key: 'estado', width: 100,
            render: (text) => (
                <span
                    className={`estado-pill ${
                        text === 'rechazada' ? 'estado-rechazada' :
                        text === 'revision' ? 'estado-revision' :
                        text === 'Realizada' ? 'estado-realizada' :
                        text === 'aceptada' ? 'estado-aceptada' :
                        text === 'Cancelado' ? 'estado-cancelado' : ''
                    }`}
                >
                    {text}
                </span>
            ),
        },
        {
            title: 'Acción',
            key: 'accion',
            render: (text, record) => (
                <div className='btn_mostrarH'>
                    <Link className='verMas' to={`/ContratacionAmbulancias/${record.ID_Contratacion}`}>
                        Ver completo
                    </Link>
                </div>
            ),
            width: 100
        },
    ];

    

    return (
        <div /*className='container_principal'*/ >
            
            
            <div>
                <legend className='text-sm'>Filtros</legend>
                <DatePicker
                    value={filterDate}
                    onChange={date => setFilterDate(date)}
                    allowClear
                    className='Input'
                />

                {currentItems.length === 0 ? (
                    <div>
                        <div className="textLe">
                            No se encontraron registros
                        </div>
                        <div className="data">
                        </div>
                    </div>
                ) : (
                    <table className='tabla'>
                        <thead>
                            <tr>
                                {columns.map(column => (
                                    <th key={column.key} style={{ width: column.width }}>{column.title}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((item) => (
                                <tr key={item.ID_Contratacion}>
                                    {columns.map(column => (
                                        <td key={column.key} style={{ width: column.width }}>{column.render ? column.render(item[column.dataIndex], item) : item[column.dataIndex]}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
            <br />
            <div className='pagination'>
                <Pagination
                    current={currentPage}
                    onChange={onChangePage}
                    total={filterItems().length}
                    showSizeChanger
                    showQuickJumper
                    pageSizeOptions={['5', '10']}
                    onShowSizeChange={onChangeItemsPerPage}
                    locale={{
                        items_per_page: 'Registros por página',
                        jump_to: 'Ir a',
                        jump_to_confirm: 'confirmar',
                        page: 'Página'
                    }}
                />
            </div>
        </div>
    );
}

export default TblContrataciones
