import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import { Card } from "@/components/ui/card";
import { CopyIcon } from "lucide-react";
import { JobInfo } from "./MarketPage";

export const GeneralInfoPanel = (props: { jobInfo: JobInfo }) => {
  const speedGraph = [
    { time: 0, speed: 0 },
    { time: 1, speed: 8 },
    { time: 2, speed: 12 },
    { time: 3, speed: 14 },
    { time: 4, speed: 14 },
    { time: 5, speed: 14 },
  ];
  return (
    <Card className="">
      <div className="flex justify-between rounded-t-lg bg-gray-300 text-gray-800">
        <div className="ml-2">{props.jobInfo.hash}</div>
        <CopyIcon
          onClick={async (e) => {
            try {
              await navigator.clipboard.writeText(props.jobInfo.hash);
              alert("Text copied to clipboard!");
            } catch (err) {
              alert("Failed to copy text");
            }
          }}
          className="mr-2"
        />
      </div>
      <div className="p-3 text-lg">
        <div className="mb-1">{props.jobInfo.fileName}</div>
        <div>
          <span className="text-blue-600">{props.jobInfo.accumulatedData}</span>{" "}
          / {props.jobInfo.fileSize}
        </div>
        <div>
          Running Cost:{" "}
          <span className="text-blue-600">{props.jobInfo.runningCost}</span>
        </div>
        <div>Projected Cost: {props.jobInfo.projectedCost}</div>
        <div>ETA: {props.jobInfo.remainingTime}</div>
      </div>
      <div className="text-right text-sm rounded-b-lg bg-gray-500 text-gray-100">
        <div className="mr-2">{props.jobInfo.timeQueued}</div>
      </div>
    </Card>
  );
};
