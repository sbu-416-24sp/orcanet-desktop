import React from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

const Bandwidth: React.FC = () => {
  const series = [
    {
      name: "Incoming",
      data: [50, 501, 205, 550, 590, 600, 100, 120, 110, 350, 100, 690],
    },
    {
      name: "Outgoing",
      data: [
        -50, -501, -205, -550, -590, -600, -100, -120, -110, -350, -100, -690,
      ],
    },
  ];

  const options: ApexOptions = {
    chart: {
      type: "area",
      toolbar: {
        show: false,
        // tools: {
        //   download: false,
        // },
      },
    },
    dataLabels: {
      enabled: false,
    },
    // stroke: {
    //   curve: "smooth",
    // },
    tooltip: {
      theme: "dark",
    },
    yaxis: {
      title: {
        text: "Kb/s",
      },
    },
    xaxis: {
      categories: [
        "11:10 PM",
        "11:15 PM",
        "11:20 PM",
        "11:25 PM",
        "11:30 AM",
        "11:35 AM",
        "11:40 PM",
        "11:45 PM",
        "11:50 PM",
        "11:55 PM",
        "00:00 AM",
        "00:05 AM",
      ],
    },
    colors: ["#5eead4", "#fda4af"],
  };

  return (
    <div className="2xl:col-span-3 xl:col-span-2 bg-white rounded-lg p-5 border">
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
