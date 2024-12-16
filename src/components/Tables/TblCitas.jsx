import React,{useState, useEffect} from 'react'
import { Pagination, Input, DatePicker } from 'antd';
import { FiSearch } from "react-icons/fi";
import './Table.css'
import AOS from 'aos';
import 'aos/dist/aos.css';

const TblCitas = () => {
    const [citas,setCitas]=useState([]);
    const [filterNombre, setFilterNombre] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    const URLUser='https://api-beta-mocha-59.vercel.app/citasRegistradas';

    /*const peticionGet= async()=>{
        const response= await fetch(URLUser)
        const data= await response.json();
        setCitas(data) 
    }
    
    useEffect(()=>{
        peticionGet();
    },[])*/

    useEffect(() => {
        const peticionGet = async () => {
          const response = await fetch(URLUser);
          const data = await response.json();
          setCitas(data);
          
        };
    
        peticionGet();
    
        const interval = setInterval(() => {
          peticionGet();
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    
    const filterItems = () => {
        return citas.filter(item => {
          const filterNombreLower = filterNombre ? filterNombre.toLowerCase() : '';
          const nombreMatch =
            !filterNombreLower ||
            item.nombre.toLowerCase().includes(filterNombreLower) ||
            item.apellido_Paterno.toLowerCase().includes(filterNombreLower) ||
            item.apellido_Materno.toLowerCase().includes(filterNombreLower);
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
        { title: 'ID', dataIndex: 'ID_Cita', key: 'ID_Cita', width: 50 },
        { title: 'Nombre', dataIndex: 'nombre', key: 'nombre', width: 150 },
        { title: 'Apellido Paterno', dataIndex: 'apellido_Paterno', key: 'apellido_Paterno', width: 150 },
        { title: 'Apellido Materno', dataIndex: 'apellido_Materno', key: 'apellido_Materno', width: 150 },
        { title: 'Fecha', dataIndex: 'fecha', key: 'fecha', width: 150 },
        { title: 'Horario', dataIndex: 'horario', key: 'horario', width: 100 },
        { title: 'Tipo de Trámite', dataIndex: 'ID_Servicio', key: 'ID_Servicio', width: 150 },
        { title: 'Estado', dataIndex: 'estado', key: 'estado', width: 100 },
        {
          title: 'Acción',
          key: 'action',
          width: 100,
          render: (text, record) => (
            <div className="btn_mostrarC">
              <button
                className='btn_estado_cita'
                onClick={() => atenderCita(record.ID_Cita, record.estado)}
                type="button"
              >
                {record.estado === 'Atendido' ? 'Pendiente' : 'Atender'}
              </button>
            </div>
          ),
        },
    ];

    // Función para actualizar el estado de una cita
    const atenderCita = async (ID_Cita, estadoActual) => {
        try {
            // Determina el nuevo estado basado en el estado actual
            const nuevoEstado = estadoActual === 'Atendido' ? 'Pendiente' : 'Atendido';

            // Realiza la solicitud a la API para actualizar el estado de la cita
            await fetch(`https://api-beta-mocha-59.vercel.app/citas/${ID_Cita}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ estado: nuevoEstado }), // Cambia 'Atendido' según lo que necesites
            });

            // Una vez que se actualiza la cita en la API, vuelve a cargar las citas para reflejar el cambio
            cargarCitas();
        } catch (error) {
            console.error('Error al actualizar el estado de la cita:', error);
        }
    };

    AOS.init();

  return (
    <div /*className='container_principal'*/ data-aos="fade-up" data-aos-duration="3000">
        <div>
            {currentItems.length === 0 ? (
            <div>
                <div className="textLe">No se encontraron registros</div>
            </div>
            ) : (
            /*<table className='tabla'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Apellido Paterno</th>
                        <th>Apellido Materno</th>
                        <th>Fecha</th>
                        <th>Horario</th>
                        <th>Tipo de Tramite</th>
                        <th>Estado</th>
                        <th>Accion</th>
                    </tr>
                </thead>
                <tbody>
                {citas.map((item) => (
                    <tr key={item.ID_Cita}>
                        <td>{item.ID_Cita}</td>
                        <td>{item.nombre}</td>
                        <td>{item.apellido_Paterno}</td>
                        <td>{item.apellido_Materno}</td>
                        <td>{item.fecha}</td>
                        <td>{item.horario}</td>
                        <td>{item.ID_Servicio}</td>
                        <td>{item.estado}</td>
                        <td>
                            <div className='btn_mostrarC'>
                                <button className='' 
                                        onClick={() => atenderCita(item.ID_Cita,item.estado)} // Pasa el estado actual
                                        type="button">{item.estado === 'Atendido' ? 'Pendiente' : 'Atender'}
                                </button>
                            </div>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>*/
            <table className="tabla">
                <thead>
                    <tr>
                    {columns.map(column => (
                        <th key={column.key} style={{ width: column.width }}>{column.title}</th>
                    ))}
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map(item => (
                    <tr key={item.ID_Cita}>
                        {columns.map(column => (
                        <td key={column.key} style={{ width: column.width }}>
                            {column.dataIndex === 'estado' ? (
                                <span
                                className={`estado-pill ${
                                    item.estado === 'Atendido' ? 'estado-atendido' : 'estado-pendiente'
                                }`}
                                >
                                {item.estado}
                                </span>
                            ) : (
                                column.render ? column.render(null, item) : item[column.dataIndex]
                            )}
                        </td>
                        ))}
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
                total={filterItems().length}
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

export default TblCitas
