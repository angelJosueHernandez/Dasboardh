import React,{useState, useEffect} from 'react'
import { Pagination, Input, DatePicker } from 'antd';
import { FiSearch } from "react-icons/fi";
import './Table.css'

const TblDonaciones = () => {
    const [donaciones, setDonaciones] = useState([]);
    const [filterNombre, setFilterNombre] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    const URLDonaciones = 'https://api-beta-mocha-59.vercel.app/donaciones';

    useEffect(() => {
        const peticionGetDonaciones = async () => {
            const response = await fetch(URLDonaciones);
            const data = await response.json();
            setDonaciones(data);
        };

        peticionGetDonaciones();

        const interval = setInterval(() => {
            peticionGetDonaciones();
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const filterItems = () => {
        return donaciones.filter(item => {
            const filterNombreLower = filterNombre ? filterNombre.toLowerCase() : '';
            const nombreMatch = !filterNombreLower || item.nombre.toLowerCase().includes(filterNombreLower) || item.apellido_Paterno.toLowerCase().includes(filterNombreLower) || item.apellido_Materno.toLowerCase().includes(filterNombreLower);
            return nombreMatch;
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
        { title: 'ID', dataIndex: 'ID_Folio', key: 'ID_Folio', width: 50 },
        { title: 'Nombre', dataIndex: 'nombre', key: 'nombre', width: 150 },
        { title: 'Apellido Paterno', dataIndex: 'apellido_Paterno', key: 'apellido_Paterno', width: 150 },
        { title: 'Apellido Materno', dataIndex: 'apellido_Materno', key: 'apellido_Materno', width: 150 },
        { title: 'Correo', dataIndex: 'correo', key: 'correo', width: 200 },
        { title: 'Teléfono', dataIndex: 'telefono', key: 'telefono', width: 150 },
        { title: 'Monto', dataIndex: 'monto', key: 'monto', width: 100 },
        { title: 'ID Usuario', dataIndex: 'ID_Usuario', key: 'ID_Usuario', width: 100 },
    ];

    return (
        <div className='container_principal' data-aos="fade-up" data-aos-duration="3000">
            <h1 className='title_emergencias'>Registro de Donaciones</h1>
            
            <div>
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
                                <tr key={item.ID_Folio}>
                                    {columns.map(column => (
                                        <td key={column.key} style={{ width: column.width }}>{item[column.dataIndex]}</td>
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

export default TblDonaciones
