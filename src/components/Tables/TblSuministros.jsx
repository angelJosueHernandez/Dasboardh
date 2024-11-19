import React,{useState, useEffect} from 'react'
import { Pagination, Input, DatePicker } from 'antd';
import { Link } from 'react-router-dom';
import { FiSearch } from "react-icons/fi";
import './Table.css'

const TblSuministros = () => {
    const [suministro, setSuministro] = useState([]);
    const [filterNombre, setFilterNombre] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    const URLSuministros = 'http://localhost:3000/Suministro';

    useEffect(() => {
        const peticionGetSuministros = async () => {
            const response = await fetch(URLSuministros);
            const data = await response.json();
            setSuministro(data);
        };

        peticionGetSuministros();

        const interval = setInterval(() => {
            peticionGetSuministros();
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const filterItems = () => {
        return suministro.filter(item => {
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
        { title: 'Clave', dataIndex: 'clave', key: 'clave', width: 50 },
        { title: 'Nombre', dataIndex: 'nombre_insumo', key: 'nombre_insumo', width: 150 },
        { title: 'Cantidad', dataIndex: 'cantidad', key: 'cantidad', width: 150 },
        { title: 'Lote', dataIndex: 'lote', key: 'lote', width: 150 },
        { title: 'Fecha de Caducidad', dataIndex: 'fecha_caducidad', key: 'fecha_caducidad', width: 200 },
        { title: 'ID_Asociado', dataIndex: 'ID_Asociado', key: 'ID_Asociado', width: 150 },
        
    ];

    return (
        <div /*className='container_principal'*/>
            {/*<h1 className='title_emergencias'>Registro de Donaciones</h1>*/}
            
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

export default TblSuministros
