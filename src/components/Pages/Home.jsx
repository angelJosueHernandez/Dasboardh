import React,{useState, useEffect} from 'react'
import { RiLineChartLine, RiHashtag } from "react-icons/ri";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line, Pie } from 'react-chartjs-2';

// Registra los componentes necesarios de Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement,ArcElement, Title, Tooltip, Legend);

export default function Home() {
  // Estado para almacenar el promedio de feedback
  const [feedbackRating, setFeedbackRating] = useState(null);
  // Estado para almacenar el total de donaciones
  const [totalDonations, setTotalDonations] = useState(null);
  const [donationData, setDonationData] = useState([]);
  const [feedbackPercentages, setFeedbackPercentages] = useState(null);
  const [serviceAverages, setServiceAverages] = useState({});
  const [contractTypeAverages, setContractTypeAverages] = useState({});

  //--------------------------------------------  Feedback ----------------------------------------
  // Función para obtener el promedio de feedback desde la API
  const fetchFeedbackRating = async () => {
    try {
      const response = await fetch('http://localhost:3000/feedback'); // Asegúrate de que esta sea la ruta correcta de tu API
      const data = await response.json();
      setFeedbackRating(data.averageRating); // Asigna el promedio al estado
    } catch (error) {
      console.error('Error fetching feedback rating:', error);
    }
  };

  // Ejecutar la solicitud al montar el componente
  useEffect(() => {
    fetchFeedbackRating();

    // Configurar un intervalo de 1 minuto (60000 ms)
    const interval = setInterval(() => {
      fetchFeedbackRating();
    }, 60000);

    // Limpiar el intervalo cuando el componente se desmonte
    return () => clearInterval(interval);
  }, []);

  const fetchFeedbackPercentages = async () => {
    try {
        const response = await fetch('http://localhost:3000/categoriaFeedback'); // Ruta de tu nueva API
        const data = await response.json();
        setFeedbackPercentages(data.percentages); // Asigna los datos al estado
    } catch (error) {
        console.error('Error fetching feedback percentages:', error);
    }
  };

  useEffect(() => {
    fetchFeedbackPercentages();

    // Configurar un intervalo de actualización (opcional)
    const interval = setInterval(() => {
      fetchFeedbackPercentages();
    }, 60000);

    // Limpiar el intervalo cuando el componente se desmonte
    return () => clearInterval(interval);
  }, []);

  // Datos para la gráfica de pastel
  const pieData = {
    labels: ['Satisfechos', 'Insatisfechos'],
    datasets: [
      {
        data: [feedbackRating !== null ? feedbackRating : 0, 5 - (feedbackRating || 0)],
        backgroundColor: ['#ef4444', '#f3f4f6'], // Colores para las porciones
        hoverBackgroundColor: ['#dc2626', '#e5e7eb'], // Colores al pasar el mouse
      },
    ],
  };

  const pieOptions = {
    plugins: {
      legend: {
        position: 'top',
      },
    },
    responsive: true,
  };

  const pieData2 = {
    labels: ["Muy malo", "Malo", "Regular", "Bueno", "Muy bueno"],
    datasets: [
        {
            data: feedbackPercentages 
                ? Object.values(feedbackPercentages).map(Number)
                : [0, 0, 0, 0, 0],
            backgroundColor: ['#ef4444', '#f59e0b', '#eab308', '#22c55e', '#3b82f6'],
            hoverBackgroundColor: ['#dc2626', '#d97706', '#ca8a04', '#16a34a', '#2563eb'],
        },
    ],
  };

  const pieOptions2 = {
    plugins: {
        legend: {
            position: 'top',
        },
    },
    responsive: true,
  };

  //----------------------------------------------------Donaciones ---------------------------------------
  // Función para obtener el total de donaciones desde la API
  const fetchTotalDonations = async () => {
    try {
      const response = await fetch('http://localhost:3000/totalDonaciones'); // Asegúrate de que esta sea la ruta correcta de tu API
      const data = await response.json();
      setTotalDonations(data.totalDonations); // Asigna el total al estado
      updateChartData(data.totalDonations); // Actualiza los datos de la gráfica
    } catch (error) {
      console.error('Error fetching total donations:', error);
    }
  };

  // Función para actualizar los datos de la gráfica
  const updateChartData = (newDonation) => {
    setDonationData((prevData) => {
      const updatedData = [...prevData, newDonation];
      return updatedData.slice(-10); // Mantén solo los últimos 10 puntos
    });
  };

  // Ejecutar la solicitud al montar el componente
  useEffect(() => {
    fetchTotalDonations();

    // Configurar un intervalo de 1 minuto (60000 ms)
    const interval = setInterval(() => {
      fetchTotalDonations();
    }, 60000);

    // Limpiar el intervalo cuando el componente se desmonte
    return () => clearInterval(interval);
  }, []);

  // Configuración de los datos para Chart.js
  const chartData = {
    labels: donationData.map((_, index) => `T-${donationData.length - index}`), // Etiquetas dinámicas
    datasets: [
      {
        label: 'Total Donaciones',
        data: donationData,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: true,
        tension: 0.4, // Hace la gráfica más curva
      },
    ],
  };

  // Configuración de opciones para la gráfica
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        ticks: { color: 'white' },
        grid: { display: false },
      },
      y: {
        ticks: { color: 'white' },
        grid: { display: true, color: 'rgba(255, 255, 255, 0.2)' },
      },
    },
  };
  
  //------------------------------------------ Citas --------------------------------------
  const fetchServiceAverages = async () => {
    try {
        const response = await fetch('http://localhost:3000/promedioCitas'); // Ruta de tu nueva API
        const data = await response.json();
        setServiceAverages(data.averages); // Asigna los datos al estado
    } catch (error) {
        console.error('Error fetching feedback percentages:', error);
    }
  };

  useEffect(() => {
    fetchServiceAverages();

    // Configurar un intervalo de actualización (opcional)
    const interval = setInterval(() => {
      fetchServiceAverages();
    }, 60000);

    // Limpiar el intervalo cuando el componente se desmonte
    return () => clearInterval(interval);
  }, []);

  const pieDataCitas = {
    labels: ["Certificado medico", "Toma de glucosa capilar", "Certificado prenupcial"],
    datasets: [
        {
            data: serviceAverages 
                ? Object.values(serviceAverages).map(Number)
                : [0, 0, 0],
            backgroundColor: ['#ef4444', '#22c55e', '#3b82f6'],
            hoverBackgroundColor: ['#dc2626', '#16a34a', '#2563eb'],
        },
    ],
  };

  const pieOptionsCitas = {
    plugins: {
        legend: {
            position: 'top',
        },
    },
    responsive: true,
  };

  //------------------------------------------ Contrataciones de ambulancias-------------------------------

  const fetchContractTypeAverages = async () => {
    try {
        const response = await fetch('http://localhost:3000/promedioTipoContrataciones'); // Ruta de tu nueva API
        const data = await response.json();
        setContractTypeAverages(data.averages); // Asigna los datos al estado
    } catch (error) {
        console.error('Error fetching feedback percentages:', error);
    }
  };

  useEffect(() => {
    fetchContractTypeAverages();

    // Configurar un intervalo de actualización (opcional)
    const interval = setInterval(() => {
      fetchContractTypeAverages();
    }, 60000);

    // Limpiar el intervalo cuando el componente se desmonte
    return () => clearInterval(interval);
  }, []);

  const pieDataContrataciones = {
    labels: ["Eventos", "Traslados"],
    datasets: [
        {
            data: contractTypeAverages 
                ? Object.values(contractTypeAverages).map(Number)
                : [0, 0],
            backgroundColor: ['#ef4444', '#22c55e'],
            hoverBackgroundColor: ['#dc2626', '#16a34a'],
        },
    ],
  };

  const pieOptionsContrataciones = {
    plugins: {
        legend: {
            position: 'top',
        },
    },
    responsive: true,
  };
  

  return (
    <div className="grid xl:grid-cols-4 min-h-screen">

      <main className="lg:col-span-3 xl:col-span-5 bg-red-100 p-8 h-full overflow-y-auto">
        {/* Section 1 */}
        <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 mt-10 gap-4 ">
          {/* Card 1 */}
          <div className="bg-red-700 p-8 rounded-xl text-gray-300 flex flex-col gap-6">
            {/* Gráfica en lugar del ícono */}
            <div className="h-40">
              <Line data={chartData} options={chartOptions} />
            </div>
            <h4 className="text-2xl text-white">Donaciones</h4>
            <span className="text-5xl text-white">{totalDonations !== null ? `$${totalDonations}` : 'Loading...'}</span>
            <span className="py-1 px-3 bg-red-600/80 rounded-full">
              + 10% since last month
            </span>
          </div>
          {/* Card 2 */}
          <div className="p-4 bg-white rounded-xl flex flex-col justify-between gap-4 drop-shadow-2xl ">
            <div className="flex items-center gap-4 bg-red-700/10 rounded-xl p-4">
              <span className="bg-red-700 text-white text-2xl font-bold p-4 rounded-xl">
                {feedbackRating !== null ? feedbackRating : '...'} %
              </span>
              <div>
                {/*<h3 className="font-bold">Feedback</h3>*/}
                <p className="text-black font-bold">de satisfacción por los servicios.</p>
              </div>
            </div>
            {/* Contenedor para las dos gráficas de pastel (horizontales) */}
            <div className="flex gap-2 h-full">
              {/* Gráfica de pastel 1 (feedbackRating) */}
              <div className="bg-red-700/10 rounded-xl p-4 w-1/2">
                {feedbackRating !== null && (
                  <Pie data={pieData} options={pieOptions} />
                )}
              </div>

              {/* Gráfica de pastel 2 (feedbackPercentages) */}
              <div className="bg-red-700/10 rounded-xl  w-1/2 ">
                {feedbackPercentages !== null && (
                  <Pie data={pieData2} options={pieOptions2} />
                )}
              </div>
            </div>
          </div>
        </section>
        {/* Section 2 */}
        <section className="grid grid-cols-1 md:grid-cols-2 mt-10 gap-8">
          <div>
            <h1 className="text-2xl font-bold mb-8">Monitoreo de Citas</h1>
            <div className="bg-white p-4 rounded-xl shadow-2xl mb-8 flex flex-col gap-8">
              {/* Contenedor para las dos gráficas de pastel (horizontales) */}
              <div className="flex gap-2 h-full">
                {/* Gráfica de pastel 1 (serviceAverages) */}
                <div className="bg-red-700/10 rounded-xl p-4 w-1/2">
                  {serviceAverages !== null && (
                    <Pie data={pieDataCitas} options={pieOptionsCitas} />
                  )}
                </div>
              </div>
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-bold mb-8">Contrataciones de Ambulancia</h1>
            <div className="bg-white p-6 rounded-xl shadow-2xl mb-8 flex flex-col gap-8">
              <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
                {/* Gráfica de pastel 1 (contractTypeAverages) */}
                <div className="bg-red-700/10 rounded-xl p-4 w-1/2">
                  {contractTypeAverages !== null && (
                    <Pie data={pieDataContrataciones} options={pieOptionsContrataciones} />
                  )}
                </div>
                
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
