import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import { Card } from "../shadcn/components/ui/card";
import { CopyIcon } from "lucide-react";
import { JobInfo } from "./MarketPage";
import { JobDetails, JobID } from "@shared/models";
import { useEffect, useState } from "react";

export const GeneralInfoPanel = (props: { jobID: JobID }) => {
  const [jobDetails, setJobDetails] = useState<JobDetails>({} as JobDetails);
  useEffect(() => {
    const fn = async () => {
      const jobDetails = await window.context.jobInfo(props.jobID);
      setJobDetails(jobDetails);
    };
  });
  return (
    <div className="rounded-lg border bg-gray-50 dark:bg-gray-900">
      <div className="flex justify-between rounded-t-lg bg-gray-300 text-gray-800">
        <div className="ml-2">{jobDetails.fileHash}</div>
        <CopyIcon
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(jobDetails.fileHash);
              alert("Hash copied to clipboard!");
            } catch (err) {
              alert("Failed to copy hash");
            }
          }}
          className="mr-2 p-1"
        />
      </div>
      <div className="relative flex flex-col justify-between h-[calc(100%-4rem)] mt-2 mb-3 pt-3 pb-3 pl-4 pr-4">
        <div className="text-lg">{jobDetails.fileName}</div>
        <div className="">
          <span className="text-blue-600">
            {jobDetails.accumulatedMemory.toString()}
          </span>
          {jobDetails.fileSize.toString()}
        </div>
        <div className="">
          Running Cost:{" "}
          <span className="text-blue-600">
            {jobDetails.accumulatedCost.toString()}
          </span>
        </div>
        <div className="">
          Projected Cost: {jobDetails.projectedCost.toString()}
        </div>
        <div>ETA: {jobDetails.eta.toString()}</div>
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
              (parseInt(jobDetails.accumulatedMemory.toString()) /
                parseInt(jobDetails.fileSize.toString().slice(0, -4))) *
                10000
            ) /
              100 +
              "%"}
          </text>
        </svg>
      </div>
      <div className="text-right text-sm rounded-b-lg bg-gray-500 text-gray-100">
        <div className="mr-2">{jobDetails.timeQueued.toISOString()}</div>
      </div>
    </div>
  );
};
