import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../shadcn/components/ui/table";
import { Trash2 } from "lucide-react";
import { ScrollArea } from "../shadcn/components/ui/scroll-area";
import { Button } from "../shadcn/components/ui/button";
import { GeneralInfoPanel } from "./GeneralInfoPanel";
import { toast } from "../shadcn/components/ui/use-toast";
import { JobID, JobOverview, HistoryJob } from "@shared/models";
import { fetchHistoryAtom } from "@renderer/store/market";
import { useAtom, useAtomValue } from "jotai";
import { useEffect, useState } from "react";
const Details = (props: { jobID: JobID }) => {
  return (
    <div className="grid grid-cols-[minmax(0,_1fr)_minmax(0,_2fr)] gap-4 h-[calc(65vh-15rem)]">
      <GeneralInfoPanel jobID={props.jobID} />
      <History />
    </div>
  );
};

const History = () => {
  const [history, setHistory] = useState<HistoryJob[]>();
  useEffect(() => {
    const fn = async () => {
      const historyData = await window.context.getHistory();
      setHistory(historyData);
    };
    fn();
  });

  const handleClearHistory = async () => {
    await window.context.clearHistory();
    toast({
      variant: "destructive",
      title: "History Cleared!",
      description: "Your download history has been cleared.",
    });
  };
  const handleDeleteJob = async (jobID: JobID) => {
    await window.context.removeFromHistory(jobID);
  };
  return (
    <div className="grid overflow-hidden">
      <div className="flex justify-between mb-2">
        <p className="pt-1 text-lg font-bold">History</p>
        <Button className="text-right" onClick={handleClearHistory}>
          Clear History
        </Button>
      </div>
      {history !== undefined && history.length === 0 ? (
        <p>No previous jobs</p>
      ) : (
        <>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[300px]">File Name</TableHead>
                <TableHead>Date Finished</TableHead>
              </TableRow>
            </TableHeader>
          </Table>
          <Table>
            <TableBody>
              <ScrollArea>
                {history !== undefined
                  ? history.map((job) => (
                      <TableRow key={job.jobID}>
                        <TableCell className="w-[300px]">
                          {job.fileName}
                        </TableCell>
                        <TableCell>{job.timeCompleted}</TableCell>
                        <TableCell className="text-right">
                          <button onClick={() => handleDeleteJob(job.jobID)}>
                            <Trash2 className="size-6 text-gray-500 hover:text-destructive" />
                          </button>
                        </TableCell>
                      </TableRow>
                    ))
                  : null}
              </ScrollArea>
            </TableBody>
          </Table>
        </>
      )}
    </div>
  );
};
export default Details;
