import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

export default function FileTypeChart() {
  const series = [
    {
      name: "Upload",
      data: [17, 5, 7, 1, 20],
    },
    {
      name: "Download",
      data: [3, 2, 1, 2, 1],
    },
  ];

  const options: ApexOptions = {
    chart: {
      id: "basic-bar",
    },
    xaxis: {
      categories: ["JPG", "MP3", "PDF", "EXE", "Others"],
      title: {
        text: "Number of Files",
      },
    },
    plotOptions: {
      bar: {
        horizontal: true,
      },
    },
    colors: ["#5eead4", "#fda4af"],
    dataLabels: {
      enabled: false,
    },
  };

  return (
    <div className="border p-5 rounded-lg">
      <h3 className="text-stone-900 text-xl font-bold">File Types</h3>
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