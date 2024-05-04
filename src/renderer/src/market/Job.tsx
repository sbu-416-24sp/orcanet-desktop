import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../shadcn/components/ui/tooltip";
import { Play, Pause, Trash2, MoveUpIcon, MoveDownIcon } from "lucide-react";
import { useContext } from "react";
import { MarketPageContext } from "./MarketPage";
import { ScrollArea } from "../shadcn/components/ui/scroll-area";
import { toast } from "../shadcn/components/ui/use-toast";
import { JobID, JobStatus, JobOverview } from "@shared/models";

export const JobListHeader = (props: {
  sortOrder: string[][];
  setSortOrder: React.Dispatch<React.SetStateAction<string[][]>>;
}) => {
  return (
    <div className="flex items-center justify-between w-[calc(100%-1rem)] p-2 mb-2 rounded border">
      <div
        className="w-48 flex items-center justify-center"
        onClick={() => {
          props.setSortOrder((prev) => {
            const poppedSort = prev.splice(
              prev.findIndex((e) => {
                return e[0] === "name";
              }),
              1
            );
            const newOrder = [...prev];
            newOrder.unshift([
              poppedSort[0][0],
              poppedSort[0][1] === "ascending" ? "descending" : "ascending",
            ]);
            return newOrder;
          });
        }}
      >
        <div>
          File Name
          <button className="absolute">
            {props.sortOrder[
              props.sortOrder.findIndex((e) => {
                return e[0] === "name";
              })
            ][1] === "ascending" ? (
              <MoveUpIcon />
            ) : (
              <MoveDownIcon />
            )}
          </button>
        </div>
      </div>
      <div
        className="w-[4.5rem] flex items-center justify-center"
        onClick={() => {
          props.setSortOrder((prev) => {
            const poppedSort = prev.splice(
              prev.findIndex((e) => {
                return e[0] === "size";
              }),
              1
            );
            const newOrder = [...prev];
            newOrder.unshift([
              poppedSort[0][0],
              poppedSort[0][1] === "ascending" ? "descending" : "ascending",
            ]);
            return newOrder;
          });
        }}
      >
        <div>
          Size
          <button className="absolute">
            {props.sortOrder[
              props.sortOrder.findIndex((e) => {
                return e[0] === "size";
              })
            ][1] === "ascending" ? (
              <MoveUpIcon />
            ) : (
              <MoveDownIcon />
            )}
          </button>
        </div>
      </div>
      <div
        className="w-16 flex items-center justify-center"
        onClick={() => {
          props.setSortOrder((prev) => {
            const poppedSort = prev.splice(
              prev.findIndex((e) => {
                return e[0] === "eta";
              }),
              1
            );
            const newOrder = [...prev];
            newOrder.unshift([
              poppedSort[0][0],
              poppedSort[0][1] === "ascending" ? "descending" : "ascending",
            ]);
            return newOrder;
          });
        }}
      >
        <div>
          ETA
          <button className="absolute">
            {props.sortOrder[
              props.sortOrder.findIndex((e) => {
                return e[0] === "eta";
              })
            ][1] === "ascending" ? (
              <MoveUpIcon />
            ) : (
              <MoveDownIcon />
            )}
          </button>
        </div>
      </div>
      <div
        className="w-[9.5rem] flex items-center justify-center"
        onClick={() => {
          props.setSortOrder((prev) => {
            const poppedSort = prev.splice(
              prev.findIndex((e) => {
                return e[0] === "timeQueued";
              }),
              1
            );
            const newOrder = [...prev];
            newOrder.unshift([
              poppedSort[0][0],
              poppedSort[0][1] === "ascending" ? "descending" : "ascending",
            ]);
            return newOrder;
          });
        }}
      >
        <div>
          Time Queued
          <button className="absolute">
            {props.sortOrder[
              props.sortOrder.findIndex((e) => {
                return e[0] === "timeQueued";
              })
            ][1] === "ascending" ? (
              <MoveDownIcon />
            ) : (
              <MoveUpIcon />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
export const JobList = (props: {
  jobInfoList: JobOverview[];
  filter: string;
  statusFilter: string;
  sortOrder: string[][];
}) => {
  const filteredJobs = props.jobInfoList
    .filter(
      (job) => job.status === props.statusFilter || props.statusFilter === "all"
    )
    .filter(
      (job) =>
        job.fileName.toLowerCase().includes(props.filter.toLowerCase()) ||
        props.filter === ""
    );
  console.log(props.sortOrder);
  filteredJobs.sort((a, b) => {
    for (let sorting of props.sortOrder) {
      const multiplier = sorting[1] === "ascending" ? 1 : -1;
      if (sorting[0] === "name" && a.fileName !== b.fileName) {
        return a.fileName.localeCompare(b.fileName) * multiplier;
      } else if (sorting[0] === "size" && a.fileSize !== b.fileSize) {
        if (a.fileSize < b.fileSize) {
          return -multiplier;
        } else if (a.fileSize === b.fileSize) {
          return 0;
        } else {
          return multiplier;
        }
      } else if (sorting[0] === "eta" && a.eta !== b.eta) {
        if (a.eta < b.eta) {
          return -multiplier;
        } else if (a.eta === b.eta) {
          return 0;
        } else {
          return multiplier;
        }
      } else if (sorting[0] === "timeQueued" && a.timeQueued !== b.timeQueued) {
        return a.timeQueued.localeCompare(b.timeQueued);
      }
    }
    return 0;
  });
  return (
    <ScrollArea className="h-[35vh]">
      <ul className="w-[calc(100%-1rem)]">
        {filteredJobs.map((e) => (
          <Job key={e.jobID} {...e} />
        ))}
      </ul>
    </ScrollArea>
  );
};
const Job = (props: {
  jobID: JobID;
  fileName: string;
  fileSize: Number;
  status: JobStatus;
  eta: Number;
  timeQueued: string;
}) => {
  const { selectedJobs: selectedJobs, setSelectedJobs: setSelectedJobs } =
    useContext(MarketPageContext);
  return (
    <li
      className={`flex items-center justify-between p-2 mb-2 rounded ${
        selectedJobs.includes(props.jobID)
          ? "bg-gray-200 dark:bg-gray-600"
          : "bg-gray-50 hover:bg-accent hover:text-accent-foreground dark:bg-gray-900 dark:hover:bg-gray-800"
      }`}
      onClick={(e) => {
        if (e.ctrlKey) {
          if (selectedJobs.includes(props.jobID)) {
            setSelectedJobs(selectedJobs.filter((job) => job !== props.jobID));
          } else {
            const jobIDsCopy = [...selectedJobs];
            jobIDsCopy.push(props.jobID);
            setSelectedJobs(jobIDsCopy);
          }
        } else {
          if (selectedJobs.includes(props.jobID) && selectedJobs.length === 1) {
            setSelectedJobs([]);
          } else {
            setSelectedJobs([props.jobID]);
          }
        }
      }}
    >
      <div className="flex items-center w-48">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={statusToColorCSS(props.status) + " overflow-visible"}
              >
                <circle cx="12" cy="12" r="2" />
              </svg>
            </TooltipTrigger>
            <TooltipContent>
              <div>{props.status}</div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <div>{props.fileName}</div>
      </div>
      <div className="w-[4.5rem] text-right">{props.fileSize.toString()}</div>
      <div className="w-16 text-right">{props.eta.toString()}</div>
      <div className="w-[9.5rem] text-right">{props.timeQueued}</div>
    </li>
  );
};
export const JobControls = (props: {
  updateJobStatuses: (newStatus: JobStatus) => void;
  removeJobs: () => void;
}) => {
  const { selectedJobs, setSelectedJobs } = useContext(MarketPageContext);
  return (
    <div className="flex items-center p-4">
      <div className="mr-8 min-w-28">
        {selectedJobs.length +
          " job" +
          (selectedJobs.length === 1 ? "" : "s") +
          " selected"}
      </div>
      <button
        onClick={() => {
          props.updateJobStatuses("active");
          toast({
            title: "File Download Resumed",
            description: "The file download has been resumed.",
          });
        }}
      >
        <Play className="size-6 text-gray-500 hover:text-gray-800" />
      </button>
      <button
        onClick={() => {
          props.updateJobStatuses("paused");
          toast({
            title: "File Download Paused",
            description: "The file download has been paused.",
          });
        }}
      >
        <Pause className="size-6 text-gray-500 hover:text-gray-800" />
      </button>
      <button
        onClick={() => {
          props.removeJobs();
          toast({
            variant: "destructive",
            title: "File Download Cancelled",
            description: "The file download has been cancelled.",
          });
        }}
      >
        <Trash2 className="size-6 text-gray-500 hover:text-destructive" />
      </button>
    </div>
  );
};
function statusToColorCSS(status: JobStatus): string {
  switch (status) {
    case "active":
      return "stroke-green-500";
    case "paused":
      return "stroke-yellow-500";
    case "error":
      return "stroke-red-500";
    default:
      return "";
  }
}
