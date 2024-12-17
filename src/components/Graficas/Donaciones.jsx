import React, { useEffect, useState } from "react";
import { AreaChart } from "@tremor/react";

export default function DonationAreaChart() {
  const [donationData, setDonationData] = useState([]);
  const [totalDonations, setTotalDonations] = useState(0);
  const [tooltipData, setTooltipData] = useState(null);

  const currencyFormatter = (number) =>
    new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN",
      minimumFractionDigits: 2,
    }).format(number);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-MX", {
      year: "numeric",
      month: "short",
    });
  };

  const filterLastThreeMonths = (donations) => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(currentDate.getMonth() - 3);

    return donations.filter((donation) => {
      const donationDate = new Date(donation.fecha);
      return (
        donationDate >= threeMonthsAgo &&
        donationDate <= currentDate &&
        donationDate.getFullYear() === currentYear
      );
    });
  };

  const fetchDonationsWithDate = async () => {
    try {
      const response = await fetch("https://api-beta-mocha-59.vercel.app/fechaMontoDonaciones");
      const data = await response.json();

      const filteredData = filterLastThreeMonths(data.donations);

      const formattedData = filteredData.map((donation) => ({
        date: formatDate(donation.fecha),
        monto: donation.monto,
      }));

      setDonationData(formattedData);

      const total = filteredData.reduce((sum, donation) => sum + donation.monto, 0);
      setTotalDonations(total);
    } catch (error) {
      console.error("Error fetching donations with date:", error);
    }
  };

  useEffect(() => {
    fetchDonationsWithDate();
    const interval = setInterval(() => {
      fetchDonationsWithDate();
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const payload = tooltipData?.payload?.[0];
  const value = payload?.value;

  const formattedValue = payload
    ? currencyFormatter(value)
    : currencyFormatter(totalDonations);

  return (
    <div>
      <p className="text-sm text-red-700 dark:text-white">Monto Total de las Donaciones</p>
      <p className="mt-2 text-[25px] font-semibold text-red-600 dark:text-white">
        {formattedValue}
      </p>

      <AreaChart
        data={donationData}
        index="date"
        categories={["monto"]}
        colors={["red"]} // Color rojo más brillante para la línea
        showLegend={false}
        yAxisWidth={60}
        showGridLines={true}
        startEndOnly={true}
        className="mt-4 h-60"
        minValue={0}
        maxValue={3000}
        valueFormatter={(number) => `${number}`}
        lineProps={{
          className: "stroke-red-500 stroke-2", // Color rojo para la línea y grosor 2
        }}
        areaProps={{
          className: "fill-[#f87171] opacity-30", // Fondo del área con opacidad
        }}
        customTooltip={({ payload }) => {
          if (payload?.[0]) {
            return (
              <div className="bg-red-500 text-white text-xs p-2 rounded">
                <p>{`Fecha: ${payload[0]?.payload?.date}`}</p>
                <p>{`Monto: ${currencyFormatter(payload[0]?.value)}`}</p>
              </div>
            );
          }
          return null;
        }}
        styles={{
          axis: {
            x: { tickText: "text-white text-xs" },
            y: { tickText: "text-white text-xs" },
          },
        }}
      />
    </div>
  );
}
