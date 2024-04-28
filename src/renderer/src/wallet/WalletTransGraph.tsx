import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { useState } from "react";
import { Button } from "../shadcn/components/ui/button";
import { displayControllerProps } from "./WalletTransPanel";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../shadcn/components/ui/dropdown-menu";

export function DisplayMenu({ display, setDisplay }: displayControllerProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">{display}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Display</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={display} onValueChange={setDisplay}>
          <DropdownMenuRadioItem value="Daily">Daily</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="Monthly">Monthly</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="Yearly">Yearly</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function ChartHeader({ display, setDisplay }: displayControllerProps) {
  return (
    <div className="flex justify-between">
      <h3 className="text-stone-900 text-xl font-bold">Revenue</h3>
      <DisplayMenu display={display} setDisplay={setDisplay} />
    </div>
  );
}

export default function WalletTransGraph() {
  const series = [
    {
      name: "Earning",
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
      toolbar: {
        show: false,
      },
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
    colors: ["#5eead4", "#FDA4AF"],
  };

  const [display, setDisplay] = useState("Monthly");

  return (
    <div className="border p-5 rounded-lg">
      <ChartHeader display={display} setDisplay={setDisplay} />
      <ReactApexChart
        options={options}
        series={series}
        type="bar"
        height={300}
      />
    </div>
  );
}
