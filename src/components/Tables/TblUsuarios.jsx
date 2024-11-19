import React, {useEffect, useState} from 'react'
import { Pagination, Input, DatePicker } from 'antd';
import { FiSearch } from "react-icons/fi";
import { FaUserEdit, FaTimes } from "react-icons/fa";
import './Table.css'

const TblUsuarios = () => {
    const [users,setUsers]=useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    const URLUser='https://api-beta-mocha-59.vercel.app/user';

    
    useEffect(() => {

        const peticionGet= async()=>{
            const response= await fetch(URLUser)
            const data= await response.json();
            setUsers(data) 
        };
        
        
        peticionGet(); // Ejecutar la función inicialmente
        
        const interval = setInterval(peticionGet, 1000); // Ejecutar la función cada segundo
        
        // Limpiar el intervalo cuando el componente se desmonte
        return () => clearInterval(interval);
    }, []);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = users.slice(indexOfFirstItem, indexOfLastItem);

    const onChangePage = (page) => setCurrentPage(page);
    const onChangeItemsPerPage = (current, size) => {
        setCurrentPage(1);
        setItemsPerPage(size);
    };



  return (
    <div className='container_principal' data-aos="fade-up" data-aos-duration="3000">
        <h1 className='title_emergencias'>Usuarios Registrados</h1>
        <div className='contenedor_buscador'>
            {/*<div className='contedor_search'>
                <FiSearch  className='icon_search'/>
                <input className='btn_search' type="search" placeholder='Buscar'/>
            </div>*/}
        </div>
        <div>
            {currentItems.length === 0 ? (
                <div className="textLe">No se encontraron registros</div>
            ) : (
            <table className='tabla'>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nombre</th>
                        <th>Apellido Paterno</th>
                        <th>Apellido Materno</th>
                        <th>Fecha de Registro</th>
                        <th>Inicio de Sesion</th>
                        <th>Estado del Usuario </th>
                        <th>Estado de Cuenta</th>
                        <th>Fecha de Bloqueo</th>
                    </tr>
                </thead>
                <tbody>
                {currentItems.map((user) => (
                    <tr key={user.ID_Usuario}>
                        <td>{user.ID_Usuario}</td>
                        <td>{user.nombre}</td>
                        <td>{user.apellidoP}</td>
                        <td>{user.apellidoM}</td>
                        <td>{user.fecha_Registro}</td>
                        <td>{user.fecha_Sesion}</td>
                        <td>{user.estado_Usuario}</td>
                        <td>{user.estado_Cuenta}</td>
                        <td>{user.fecha_bloqueo}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            )}
        </div>
        <br />
        <div className="pagination">
            <Pagination
                current={currentPage}
                onChange={onChangePage}
                total={users.length}
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
    </div>
  )
}

export default TblUsuarios
