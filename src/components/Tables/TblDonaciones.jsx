import React, { useState, useEffect } from 'react'
import { Pagination, Input, DatePicker, ConfigProvider } from 'antd';
import { FiSearch } from "react-icons/fi";
import './Table.css'
import locale from 'antd/locale/es_ES';
import dayjs from 'dayjs';
import 'dayjs/locale/es';

const { RangePicker } = DatePicker;

const TblDonaciones = () => {
    const [donaciones, setDonaciones] = useState([]);
    const [filterNombre, setFilterNombre] = useState('');
    const [filterFechas, setFilterFechas] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    const URLDonaciones = 'https://api-beta-mocha-59.vercel.app/donaciones';

    useEffect(() => {
        const peticionGetDonaciones = async () => {
            try {
                const response = await fetch(URLDonaciones);
                const data = await response.json();
                setDonaciones(data);
            } catch (error) {
                console.error("Error al cargar donaciones:", error);
            }
        };

        peticionGetDonaciones();

        const interval = setInterval(() => {
            peticionGetDonaciones();
        }, 60000); // Cambié a 1 minuto para reducir solicitudes frecuentes
        return () => clearInterval(interval);
    }, []);

    // Función para formatear la fecha
    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('es-MX', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    const filterItems = () => {
        return donaciones.filter(item => {
            // Filtro por nombre (mejora para coincidir con nombres completos)
            const filterNombreLower = filterNombre ? filterNombre.toLowerCase().trim() : '';
            const nombreCompleto = `${item.nombre} ${item.apellido_Paterno} ${item.apellido_Materno}`.toLowerCase();
            const nombreMatch = !filterNombreLower || 
                nombreCompleto.includes(filterNombreLower);
            
            // Filtro por fecha
            const itemDate = new Date(item.fecha);
            const fechaMatch = !filterFechas || (
                (!filterFechas[0] || itemDate >= filterFechas[0].toDate()) &&
                (!filterFechas[1] || itemDate <= filterFechas[1].toDate())
            );
            
            return nombreMatch && fechaMatch;
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

    const handleDateChange = (dates) => {
        // Manejar cuando se limpia el rango de fechas
        setFilterFechas(dates && dates.length ? dates : null);
    };

    const columns = [
        { title: 'ID', dataIndex: 'ID_Folio', key: 'ID_Folio', width: 50 },
        { title: 'Nombre', dataIndex: 'nombre', key: 'nombre', width: 150 },
        { title: 'Apellido Paterno', dataIndex: 'apellido_Paterno', key: 'apellido_Paterno', width: 150 },
        { title: 'Apellido Materno', dataIndex: 'apellido_Materno', key: 'apellido_Materno', width: 150 },
        { title: 'Correo', dataIndex: 'correo', key: 'correo', width: 200 },
        { title: 'Teléfono', dataIndex: 'telefono', key: 'telefono', width: 150 },
        { title: 'Monto', dataIndex: 'monto', key: 'monto', width: 100 },
        { title: 'Fecha', dataIndex: 'fecha', key: 'fecha', width: 100, render: formatDate },
    ];

    return (
        <ConfigProvider locale={locale}>
            <div className='container_principal' data-aos="fade-up" data-aos-duration="3000">
                <h1 className='title_emergencias'>Registro de Donaciones</h1>
                
                <div className="filters" style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    marginBottom: '20px' 
                }}>
                    <Input
                        placeholder="Buscar por nombre completo"
                        prefix={<FiSearch />}
                        value={filterNombre}
                        onChange={(e) => setFilterNombre(e.target.value)}
                        style={{ width: 250, marginRight: 10 }}
                    />
                    <RangePicker
                        placeholder={['Fecha inicial', 'Fecha final']}
                        onChange={handleDateChange}
                        style={{ width: 250 }}
                    />
                </div>
                
                <div>
                    {filterItems().length === 0 ? (
                        <div>
                            <div className="textLe">
                                No se encontraron registros
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
                                            <td key={column.key} style={{ width: column.width }}>
                                                {column.render 
                                                    ? column.render(item[column.dataIndex]) 
                                                    : item[column.dataIndex]
                                                }
                                            </td>
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
        </ConfigProvider>
    );
}

export default TblDonaciones