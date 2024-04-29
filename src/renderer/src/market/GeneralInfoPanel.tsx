import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import { Card } from "../shadcn/components/ui/card";
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
    <div className="rounded-lg border bg-gray-50 dark:bg-gray-900">
      <div className="flex justify-between rounded-t-lg bg-gray-300 text-gray-800">
        <div className="ml-2">{props.jobInfo.fileHash}</div>
        <CopyIcon
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(props.jobInfo.fileHash);
              alert("Hash copied to clipboard!");
            } catch (err) {
              alert("Failed to copy hash");
            }
          }}
          className="mr-2 p-1"
        />
      </div>
      <div className="relative flex flex-col justify-between h-[calc(100%-4rem)] mt-2 mb-3 pt-3 pb-3 pl-4 pr-4">
        <div className="text-lg">{props.jobInfo.fileName}</div>
        <div className="">
          <span className="text-blue-600">
            {props.jobInfo.accumulatedMemory}
          </span>{" "}
          / {props.jobInfo.fileSize}
        </div>
        <div className="">
          Running Cost:{" "}
          <span className="text-blue-600">{props.jobInfo.accumulatedCost}</span>
        </div>
        <div className="">Projected Cost: {props.jobInfo.projectedCost}</div>
        <div>ETA: {props.jobInfo.eta}</div>
        <svg
          width={80}
          height={80}
          className="absolute top-1 right-3 text-xl fill-black dark:fill-gray-50 stroke-black dark:stroke-gray-50"
        >
          <circle
            cx={40}
            cy={40}
            r={38}
            strokeWidth={1}
            strokeMiterlimit={10}
            className="fill-none"
          ></circle>
          <text x="50%" y="50%" textAnchor="middle" dy=".3em" className="">
            {Math.round(
              (parseInt(props.jobInfo.accumulatedMemory) /
                parseInt(props.jobInfo.fileSize.slice(0, -4))) *
                10000
            ) /
              100 +
              "%"}
          </text>
        </svg>
      </div>
      <div className="text-right text-sm rounded-b-lg bg-gray-500 text-gray-100">
        <div className="mr-2">{props.jobInfo.timeQueued}</div>
      </div>
    </div>
  );
};
