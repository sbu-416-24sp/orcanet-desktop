import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

export default function FileTypeChart() {
  const series = [
    {
      name: "Mon",
      data: [40, 28, 37, 75, 45, 23, 96, 22, 45, 32],
    },
    {
      name: "Tue",
      data: [40, 28, 37, 75, 45, 23, 96, 22, 45, 32],
    },
    {
      name: "Wed",
      data: [40, 28, 37, 75, 45, 23, 96, 22, 45, 32],
    },
    {
      name: "Thu",
      data: [40, 28, 37, 75, 45, 23, 96, 22, 45, 32],
    },
    {
      name: "Fri",
      data: [40, 28, 37, 75, 45, 23, 96, 22, 45, 32],
    },
    {
      name: "Sat",
      data: [40, 28, 37, 75, 45, 23, 96, 22, 45, 32],
    },
    {
      name: "Sun",
      data: [40, 28, 37, 75, 45, 23, 96, 22, 45, 32],
    },
  ];

  const options: ApexOptions = {
    chart: {
      type: "heatmap",
    },
    colors: ["#5eead4"],
    dataLabels: {
      enabled: false,
    },
    labels: [
      "Apr 1",
      "Mar 25",
      "Mar 18",
      "Mar 11",
      "Mar 4",
      "Feb 26",
      "Feb 19",
      "Feb 12",
      "Feb 5",
      "Jan 29",
    ].reverse(),
    xaxis: {
      title: {
        text: "Weeks",
      },
    },
  };

  return (
    <div className="bg-white p-5 rounded-lg border">
      <h3 className="text-stone-900 text-xl font-bold">Activity</h3>
      <div>
        <ReactApexChart
          options={options}
          series={series.reverse()}
          type="heatmap"
          height={300}
        />
      </div>
    </div>
  );
}
