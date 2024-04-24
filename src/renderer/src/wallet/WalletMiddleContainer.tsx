import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { useState } from "react";
import { Button } from "../shadcn/components/ui/button";
import QRCode from "react-qr-code";

function MonthlyIncomeChart() {
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

function SendPanel() {
  function send() {
    const amount = (document.getElementById("amount") as HTMLInputElement)
      .value;
    const receiverId = (
      document.getElementById("receiver-id") as HTMLInputElement
    ).value;
    const reason = (document.getElementById("reason") as HTMLInputElement)
      .value;

    alert(`Sending ${amount} ORC to ${receiverId} with reason: ${reason}`);
  }
  return (
    <div className="px-5 mt-11">
      <div className="grid grid-cols-2 gap-7">
        <div>
          <h3 className="text-stone-900 text-md font-semibold">Amount</h3>
          <input
            id="amount"
            type="number"
            className="border border-stone-900 rounded-lg px-3 py-2 w-full mt-2"
          />
          <h3 className="text-stone-900 text-md font-semibold">Reason</h3>
          <input
            id="reason"
            type="text"
            className="border border-stone-900 rounded-lg px-3 py-2 w-full mt-2"
          />
        </div>
        <div className="h-full flex justify-center items-center">
          <div className="w-full">
            <h3 className="text-stone-900 text-md font-semibold">
              Receiver ID
            </h3>
            <input
              id="receiver-id"
              type="text"
              className="border border-stone-900 rounded-lg px-3 py-2 w-full mt-2"
            />
            <p className="w-full text-center text-sm text-gray-500">
              Please enter the Wallet ID of the Receiver
            </p>
          </div>
        </div>
      </div>
      <Button className="mt-7 bg-indigo-500 text-white px-7" onClick={send}>
        Send
      </Button>
    </div>
  );
}

function QRCodeContainer() {
  return (
    <div className="flex justify-center mt-5">
      <QRCode value="https://www.google.com" />
    </div>
  );
}

function TransferPanel() {
  const [displayQR, setDisplayQR] = useState(false);

  return (
    <div className="bg-white p-5 rounded-lg text-stone-900 border">
      <div className="flex justify-between">
        <h3 className="text-stone-900 text-xl font-bold">Transfer</h3>
        <div className="flex font-semibold gap-5 ">
          <div
            className={`h-fit ${
              !displayQR ? "border-b-2 border-b-indigo-500" : ""
            }`}
            onClick={() => setDisplayQR(false)}
          >
            Send
          </div>
          <div
            className={`h-fit ${
              displayQR ? "border-b-2 border-b-indigo-500" : ""
            }`}
            onClick={() => setDisplayQR(true)}
          >
            Code
          </div>
        </div>
      </div>
      {displayQR ? <QRCodeContainer /> : <SendPanel />}
    </div>
  );
}

export default function WalletMiddleContainer() {
  return (
    <div className="grid grid-cols-2 gap-7 mb-7">
      <TransferPanel />
      <MonthlyIncomeChart />
    </div>
  );
}
