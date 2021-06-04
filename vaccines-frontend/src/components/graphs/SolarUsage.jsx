import React from "react";
import { Bar } from "react-chartjs-2";

const SolarUsage = ({ solar, solarData, bottles }) => {
  const COLORS = ["#8884d8", "#82ca9d", "#d84a26", "#12584f"];

  const intersectionByMonth = (month) =>
    solar
      .filter((vaccine) => vaccine.arrived.includes(`2021-${month}`))
      .map((vaccine) => vaccine.id)
      .filter((vaccine) => bottles.includes(vaccine)).length;

  const usedByMonth = [
    intersectionByMonth("01"),
    intersectionByMonth("02"),
    intersectionByMonth("03"),
    intersectionByMonth("04"),
  ];

  const unUsedByMonth = [
    solarData[0] - intersectionByMonth("01"),

    solarData[1] - intersectionByMonth("02"),
    solarData[2] - intersectionByMonth("03"),
    solarData[3] - intersectionByMonth("04"),
  ];

  const chartData = {
    labels: ["January", "February", "March", "April"],
    datasets: [
      {
        label: "Used",
        data: usedByMonth,
        backgroundColor: COLORS,
      },
      {
        label: "Unused",
        data: unUsedByMonth,
        backgroundColor: "red",
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
    plugins: {
      legend: {
        display: false,
        position: "right",
      },
    },
  };
  return (
    <div style={{ width: "100%" }}>
      {solarData[0] > 0 && <Bar data={chartData} options={options} />}
    </div>
  );
};

export default SolarUsage;
