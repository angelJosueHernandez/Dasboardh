import React, { useEffect, useState } from 'react';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { Card, Col, Row, Statistic } from 'antd';

const ContratacionesGrafica = () => {
  // Estados para almacenar los valores de las contrataciones
  const [realizadas, setRealizadas] = useState(0);
  const [aceptadas, setAceptadas] = useState(0);
  const [rechazadas, setRechazadas] = useState(0);
  const [canceladas, setCanceladas] = useState(0);

  // Función para obtener los datos de la API
  const obtenerDatosContrataciones = async () => {
    try {
      // Llamada a la API para obtener los datos de contrataciones por estado
      const response = await fetch('https://api-beta-mocha-59.vercel.app/contratacionEstadoGrafica');
      const data = await response.json();
console.log(data)
      // Actualizamos el estado con los datos obtenidos
      setRealizadas(data.Realizada || 0);
      setAceptadas(data.Aceptada || 0);
      setRechazadas(data.Rechazada || 0);
      setCanceladas(data.Cancelado || 0);
    } catch (error) {
      console.error('Error al obtener los datos de contrataciones:', error);
    }
  };

  // useEffect para realizar la llamada a la API cada minuto y medio
  useEffect(() => {
    // Obtener los datos iniciales
    obtenerDatosContrataciones();

    // Configuramos un intervalo para actualizar los datos cada minuto y medio
    const intervalo = setInterval(obtenerDatosContrataciones, 90 * 1000); // 90 segundos

    // Limpiamos el intervalo cuando el componente se desmonte
    return () => clearInterval(intervalo);
  }, []);

  return (
    <Row gutter={16}>
      {/* Traslados Realizadas */}
      <Col span={12}>
        <Card bordered={false} style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.1)', paddingTop: '10px' }}>
          <Statistic
            title={<span style={{ marginLeft: '-12px', fontWeight: 'bold' }}>Realizadas</span>}
            value={realizadas}  // Valor dinámico para traslados realizadas
            precision={0}
            valueStyle={{
              color: '#3f8600',  // Color verde para traslados realizadas
            }}
            prefix={<ArrowUpOutlined />}
            suffix=""
          />
        </Card>
      </Col>

      {/* Traslados Aceptadas */}
      <Col span={12}>
        <Card bordered={false} style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.1)', paddingTop: '10px' }}>
          <Statistic
            title={<span style={{ marginLeft: '-12px', fontWeight: 'bold' }}>Aceptadas</span>}
            value={aceptadas}  // Valor dinámico para traslados aceptadas
            precision={0}
            valueStyle={{
              color: '#3f8600',  // Color verde para traslados aceptadas
            }}
            prefix={<ArrowUpOutlined />}
            suffix=""
          />
        </Card>
      </Col>

      {/* Traslados Rechazadas */}
      <Col span={12}>
        <Card bordered={false} style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.1)', marginTop: '10px' }}>
          <Statistic
            title={<span style={{ marginLeft: '-12px', fontWeight: 'bold' }}>Rechazadas</span>}
            value={rechazadas}  // Valor dinámico para traslados rechazadas
            precision={0}
            valueStyle={{
              color: '#cf1322',  // Color rojo para traslados rechazadas
            }}
            prefix={<ArrowDownOutlined />}
            suffix=""
          />
        </Card>
      </Col>

      {/* Traslados Canceladas */}
      <Col span={12}>
        <Card bordered={false} style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.1)', marginTop: '10px' }}>
          <Statistic
            title={<span style={{ marginLeft: '-12px', fontWeight: 'bold' }}>Canceladas</span>}
            value={canceladas}  // Valor dinámico para traslados canceladas
            precision={0}
            valueStyle={{
              color: '#cf1322',  // Color rojo para traslados canceladas
            }}
            prefix={<ArrowDownOutlined />}
            suffix=""
          />
        </Card>
      </Col>
    </Row>
  );
};

export default ContratacionesGrafica;
