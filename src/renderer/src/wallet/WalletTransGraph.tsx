import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

export default function WalletTransGraph() {
  const series = [
    {
      name: "Revenue",
      data: [76, 85, 101, 98, 87, 105, 91, 114, 100],
    },
    {
      name: "Spending",
      data: [35, 41, 36, 26, 45, 48, 52, 53, 41],
    },
  ];

  const options: ApexOptions = {
    chart: {
      id: "basic-bar",
    },
    xaxis: {
      categories: [
        "Jun",
        "Jul",
        "Aug",
        "Sept",
        "Oct",
        "Nov",
        "Dec",
        "Jan",
        "Feb",
      ],
    },
    yaxis: {
      title: {
        text: "OrcaCoins (ORC)",
      },
    },
    dataLabels: {
      enabled: false,
    },
  };

  return (
    <div className="bg-white p-5 rounded-lg border">
      <h3 className="text-stone-900 text-xl font-bold">Revenue</h3>
      <div>
        <ReactApexChart
          options={options}
          series={series}
          type="bar"
          height={300}
        />
      </div>
    </div>
  );
}
