import React, { useEffect, useState } from 'react';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { Card, Col, Row, Statistic } from 'antd';

const CitasEstadisticas = () => {
  // Estados para almacenar el conteo de citas
  const [atendidas, setAtendidas] = useState(0);
  const [canceladas, setCanceladas] = useState(0);

  // Función para obtener los datos de la API
  const obtenerDatosCitas = async () => {
    try {
      // Llamada a la API para obtener el conteo de citas
      const response = await fetch('https://api-beta-mocha-59.vercel.app/citasConteoGrafica');
      const data = await response.json();

      // Actualizamos el estado con los datos obtenidos
      setAtendidas(data.Atendido || 0);
      setCanceladas(data.Cancelado || 0);
    } catch (error) {
      console.error('Error al obtener los datos de citas:', error);
    }
  };

  // useEffect para realizar la llamada a la API cada minuto y medio
  useEffect(() => {
    // Obtener los datos iniciales
    obtenerDatosCitas();

    // Configuramos un intervalo para actualizar los datos cada minuto y medio
    const intervalo = setInterval(obtenerDatosCitas, 90 * 1000); // 90 segundos

    // Limpiamos el intervalo cuando el componente se desmonte
    return () => clearInterval(intervalo);
  }, []);

  return (
    <Row gutter={16}>
      {/* Citas Atendidas */}
      <Col span={12}>
        <Card bordered={false} style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          <Statistic
            title={<span style={{ marginLeft: '-12px', fontWeight: 'bold' }}>Atendidas</span>}
            value={atendidas}  // Valor dinámico para citas atendidas
            precision={0}
            valueStyle={{
              color: '#3f8600',  // Color verde para citas atendidas
            }}
            prefix={<ArrowUpOutlined />}
            suffix=""
          />
        </Card>
      </Col>

      {/* Citas Canceladas */}
      <Col span={12}>
        <Card bordered={false} style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          <Statistic
            title={<span style={{ marginLeft: '-12px', fontWeight: 'bold' }}>Canceladas</span>}
            value={canceladas}  // Valor dinámico para citas canceladas
            precision={0}
            valueStyle={{
              color: '#cf1322',  // Color rojo para citas canceladas
            }}
            prefix={<ArrowDownOutlined />}
            suffix=""
          />
        </Card>
      </Col>
    </Row>
  );
};

export default CitasEstadisticas;
