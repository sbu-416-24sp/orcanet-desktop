import { createContext, useState } from "react";
import Overview from "./Overview";
import Details from "./Details";
import memory from "./fakeJobs";

export interface JobInfo {
  id: string;
  fileName: string;
  fileSize: string;
  status: JobStatus;
  remainingTime: string;
  timeQueued: string;

  hash: string;
  accumulatedData: string;
  runningCost: string;
  projectedCost: string;
}
export type JobStatus = "downloading" | "paused" | "error" | "completed";

interface JobSelectionContext {
  selectedJobs: string[];
  setSelectedJobs: React.Dispatch<React.SetStateAction<string[]>>;
}
export const MarketPageContext = createContext<JobSelectionContext>(
  {} as JobSelectionContext
);

const MarketPage = () => {
  const [selectedJobs, setSelectedJobs] = useState<string[]>([]);
  const [jobInfoList, setJobInfoList] = useState<JobInfo[]>(memory);
  const updateJobStatuses = (newStatus: JobStatus) => {
    setJobInfoList((prevJobInfoList) => {
      return prevJobInfoList.map((job) => {
        if (selectedJobs.includes(job.id)) {
          return { ...job, status: newStatus };
        }
        return job;
      });
    });
  };
  const removeJobs = () => {
    setJobInfoList((prevJobInfoList) =>
      prevJobInfoList.filter((job) => !selectedJobs.includes(job.id))
    );
  };
  const addJob = (hash: string) => {
    setJobInfoList((prev) => {
      const newList = [...prev];
      // console.log(newList[prev.length-1]);
      // console.log(parseInt(prev[-1].id) + 1);
      // console.log((parseInt(prev[-1].id) + 1).toString());
      const date = new Date();
      newList.push({
        id: (parseInt(prev[prev.length - 1].id) + 1).toString(),
        fileName: `new_job${parseInt(prev[prev.length - 1].id) + 1}.json`,
        fileSize: 10 + Math.floor(Math.random() * 10) + 1 + " KiB",
        status: "downloading",
        remainingTime: Math.floor(Math.random() * 10) + 1 + " s",
        timeQueued: `${("0000" + date.getFullYear()).slice(-4)}-${(
          "00" + date.getMonth()
        ).slice(-2)}-${("00" + date.getDay()).slice(-2)} ${(
          "00" + date.getHours()
        ).slice(-2)}:${("00" + date.getMinutes()).slice(-2)}:${(
          "00" + date.getSeconds()
        ).slice(-2)}`,
        hash: `NeW_jOB${parseInt(prev[prev.length - 1].id) + 1}.jSoN`,
        accumulatedData: Math.floor(Math.random() * 10) + 1 + " KiB",
        runningCost: Math.floor(Math.random() * 10) + 1 + " USD",
        projectedCost: 10 + Math.floor(Math.random() * 10) + 1 + " USD",
      });
      return newList;
    });
  };
  return (
    <MarketPageContext.Provider
      value={{ selectedJobs: selectedJobs, setSelectedJobs: setSelectedJobs }}
    >
      <div id="market-page" className="relative grow bg-background p-6">
        <Overview
          jobInfoList={jobInfoList}
          updateJobStatuses={updateJobStatuses}
          removeJobs={removeJobs}
          addJob={addJob}
        />
        <Details
          jobInfo={
            selectedJobs.length > 0
              ? jobInfoList.filter((e) => e.id === selectedJobs[0])[0]
              : {
                  id: "-1",
                  fileName: "MissingNo",
                  fileSize: "-1 KiB",
                  status: "completed",
                  remainingTime: "-1 s",
                  timeQueued: "9999-99-99 99:99:99",

                  hash: "OnGnIsSiM",
                  accumulatedData: "-1",
                  runningCost: "-1 USD",
                  projectedCost: "-1 USD",
                }
          }
        />
      </div>
    </MarketPageContext.Provider>
  );
};

export default MarketPage;
