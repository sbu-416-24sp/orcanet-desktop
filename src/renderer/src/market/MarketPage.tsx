import { createContext, useEffect, useState } from "react";
import Overview from "./Overview";
import Details from "./Details";
import { ScrollArea } from "@shadcn/components/ui/scroll-area";
import { JobID, JobStatus } from "@shared/models";
import { fetchJobListAtom } from "@renderer/store/market";
import { useAtom } from "jotai";
export interface JobInfo {
  jobID: JobID;
  fileName: string;
  fileSize: string;
  status: JobStatus;
  eta: string;
  timeQueued: string;

  fileHash: string;
  accumulatedMemory: string;
  accumulatedCost: string;
  projectedCost: string;
}

interface JobSelectionContext {
  selectedJobs: string[];
  setSelectedJobs: React.Dispatch<React.SetStateAction<string[]>>;
}
export const MarketPageContext = createContext<JobSelectionContext>(
  {} as JobSelectionContext
);

const MarketPage = () => {
  const [selectedJobs, setSelectedJobs] = useState<JobID[]>([]);
  const [jobList, fetchJobList] = useAtom(fetchJobListAtom);
  useEffect(() => {
    fetchJobList();
  }, [fetchJobList]);

  const updateJobStatuses = async (newStatus: JobStatus) => {
    if (newStatus === "active") {
      await window.context.startJobs(selectedJobs);
    } else if (newStatus === "paused") {
      await window.context.pauseJobs(selectedJobs);
    }
    // /* Old frontend testing */
    // setJobInfoList((prevJobInfoList) => {
    //   return prevJobInfoList.map((job) => {
    //     if (selectedJobs.includes(job.id)) {
    //       return { ...job, status: newStatus };
    //     }
    //     return job;
    //   });
    // });
  };
  const removeJobs = async () => {
    await window.context.terminateJobs(selectedJobs);
    // /* Old frontend testing */
    // setJobInfoList((prevJobInfoList) =>
    //   prevJobInfoList.filter((job) => !selectedJobs.includes(job.id))
    // );
    setSelectedJobs([]);
  };

  const addJob = async (hash: string, peerID: string) => {
    const jobID = await window.context.addJob(hash, peerID);
    setSelectedJobs([jobID.jobID]);

    // if (hash) {
    //   //new stuff with hash
    // }
    // setJobInfoList((prev) => {
    //   const newList = [...prev];
    //   // console.log(newList[prev.length-1]);
    //   // console.log(parseInt(prev[-1].id) + 1);
    //   // console.log((parseInt(prev[-1].id) + 1).toString());
    //   const date = new Date();
    //   newList.push({
    //     id: (parseInt(prev[prev.length - 1].id) + 1).toString(),
    //     fileName: `new_job${parseInt(prev[prev.length - 1].id) + 1}.json`,
    //     fileSize: 10 + Math.floor(Math.random() * 10) + 1 + " KiB",
    //     status: "downloading",
    //     eta: Math.floor(Math.random() * 10) + 1 + " s",
    //     timeQueued: `${("0000" + date.getFullYear()).slice(-4)}-${(
    //       "00" + date.getMonth()
    //     ).slice(-2)}-${("00" + date.getDay()).slice(-2)} ${(
    //       "00" + date.getHours()
    //     ).slice(-2)}:${("00" + date.getMinutes()).slice(-2)}:${(
    //       "00" + date.getSeconds()
    //     ).slice(-2)}`,
    //     fileHash: `NeW_jOB${parseInt(prev[prev.length - 1].id) + 1}.jSoN`,
    //     accumulatedMemory: Math.floor(Math.random() * 10) + 1 + " KiB",
    //     accumulatedCost: Math.floor(Math.random() * 10) + 1 + " USD",
    //     projectedCost: 10 + Math.floor(Math.random() * 10) + 1 + " USD",
    //   });
    //   return newList;
    // });
  };
  return (
    <MarketPageContext.Provider
      value={{ selectedJobs: selectedJobs, setSelectedJobs: setSelectedJobs }}
    >
      <ScrollArea className="h-full grow">
        <div id="market-page" className="bg-background p-6 h-full">
          <Overview
            jobInfoList={jobList}
            updateJobStatuses={updateJobStatuses}
            removeJobs={removeJobs}
            addJob={addJob}
          />
          <hr className="border mt-4 mb-4" />
          <Details jobID={selectedJobs.length > 0 ? selectedJobs[0] : "-1"} />
        </div>
      </ScrollArea>
    </MarketPageContext.Provider>
  );
};

export default MarketPage;
