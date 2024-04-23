import React from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

const Bandwidth: React.FC = () => {
  const series = [
    {
      name: "In",
      data: [
        {
          x: 1,
          y: 100,
        },
        {
          x: 2,
          y: 120,
        },
        {
          x: 3,
          y: 110,
        },
        {
          x: 4,
          y: 350,
        },
        {
          x: 5,
          y: 100,
        },
        {
          x: 6,
          y: 690,
        },
      ],
    },
    {
      name: "Out",
      data: [
        {
          x: 1,
          y: -50,
        },
        {
          x: 2,
          y: -501,
        },
        {
          x: 3,
          y: -205,
        },
        {
          x: 4,
          y: -550,
        },
        {
          x: 5,
          y: -590,
        },
        {
          x: 6,
          y: -600,
        },
      ],
    },
  ];

  const options: ApexOptions = {
    chart: {
      type: "area",
      toolbar: {
        show: true,
        tools: {
          download: false,
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    tooltip: {
      theme: "dark",
    },
    yaxis: {
      title: {
        text: "Kb/s",
      },
    },
    colors: ["#5eead4", "#fda4af"],
    labels: [
      "11:40 PM",
      "11:45 PM",
      "11:50 PM",
      "11:55 PM",
      "00:00 AM",
      "00:05 AM",
    ],
  };

  return (
    <div className="col-span-3 border rounded-lg p-5">
      <h3 className="text-stone-900 text-xl font-bold">Bandwidth Overtime</h3>
      <div>
        <ReactApexChart
          options={options}
          series={series}
          type="area"
          height={300}
        />
      </div>
    </div>
  );
};

export default Bandwidth;