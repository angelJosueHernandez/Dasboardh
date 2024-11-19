import React, {useState, useEffect} from 'react'
import { Pagination, Input, DatePicker } from 'antd';
import { FiSearch } from "react-icons/fi";
import './Table.css'

const TblEmergencias = () => {
    const [emergencia,setEmergencia]=useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    const URLUser='https://api-beta-mocha-59.vercel.app/Emergencias';

    useEffect(() => {

        const peticionGet= async()=>{
            const response= await fetch(URLUser)
            const data= await response.json();
            setEmergencia(data) 
        }

        peticionGet();
        const interval = setInterval(peticionGet, 1000); // Ejecutar la función cada segundo
        
        // Limpiar el intervalo cuando el componente se desmonte
        return () => clearInterval(interval);
    }, []); 

    function formatDate(dateString) {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
        return date.toLocaleDateString('es-MX', options);
    }

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = emergencia.slice(indexOfFirstItem, indexOfLastItem);

    const onChangePage = (page) => setCurrentPage(page);
    const onChangeItemsPerPage = (current, size) => {
        setCurrentPage(1);
        setItemsPerPage(size);
    };

    

    
  return (
    <div >
        {/*<h1 className='title_emergencias'>Registro de Emergencias</h1>*/}
        {/*<div className='contenedor_buscador'>
           {<div className='contedor_search'>
                <FiSearch  className='icon_search'/>
                <input className='btn_search' type="search" placeholder='Buscar'/>
            </div>}
        </div>*/}
        <div>
        {currentItems.length === 0 ? (
          <div className="textLe">No se encontraron registros</div>
        ) : (
            
            <table className='tabla'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Fecha</th>
                        <th>Nombre</th>
                        <th>Apellido Paterno</th>
                        <th>Apellido Materno</th>
                        <th>Lugar de Servicio</th>
                        <th>Sexo</th>
                        <th>Edad</th>
                        <th>Tipo de Servicio</th>
                        <th>Responsable</th>
                    </tr>
                </thead>
                <tbody>
                {currentItems.map((item) => (
                    <tr key={item.folio}>
                        <td>{item.folio}</td>
                        <td>{formatDate(item.fecha)}</td>
                        <td>{item.nombre}</td>
                        <td>{item.apellido_Paterno}</td>
                        <td>{item.apellido_Materno}</td>
                        <td>{item.lugar_Servicio}</td>
                        <td>{item.sexo}</td>
                        <td>{item.edad}</td>
                        <td>{item.ID_Emergencia}</td>
                        <td>{item.ID_Asociado}</td>
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
            total={emergencia.length}
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

export default TblEmergencias
