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
import { JobInfo } from "./MarketPage";
import { toast } from "../shadcn/components/ui/use-toast";
const Details = (props: {
  jobInfo: JobInfo;
  completedJobs: JobInfo[];
  setCompletedJobs: React.Dispatch<React.SetStateAction<JobInfo[]>>;
}) => {
  return (
    <div className="grid grid-cols-[minmax(0,_1fr)_minmax(0,_2fr)] gap-4 h-[calc(65vh-15rem)]">
      <GeneralInfoPanel jobInfo={props.jobInfo} />
      <History
        completedJobs={props.completedJobs}
        setCompletedJobs={props.setCompletedJobs}
      />
    </div>
  );
};

const History = (props: {
  completedJobs: JobInfo[];
  setCompletedJobs: React.Dispatch<React.SetStateAction<JobInfo[]>>;
}) => {
  const handleClearHistory = () => {
    props.setCompletedJobs([]);
    toast({
      variant: "destructive",
      title: "History Cleared!",
      description: "Your download history has been cleared.",
    });
  };
  const handleDeleteJob = (jobId: string) => {
    props.setCompletedJobs(
      props.completedJobs.filter((job) => job.id !== jobId)
    );
  };
  return (
    <div className="grid overflow-hidden">
      <div className="flex justify-between mb-2">
        <p className="pt-1 text-lg font-bold">History</p>
        <Button className="text-right" onClick={handleClearHistory}>
          Clear History
        </Button>
      </div>
      {props.completedJobs.length === 0 ? (
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
                {props.completedJobs.map((job) => (
                  <TableRow key={job.id}>
                    <TableCell className="w-[300px]">{job.fileName}</TableCell>
                    <TableCell>{job.timeQueued}</TableCell>
                    <TableCell className="text-right">
                      <button onClick={() => handleDeleteJob(job.id)}>
                        <Trash2 className="size-6 text-gray-500 hover:text-destructive" />
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </ScrollArea>
            </TableBody>
          </Table>
        </>
      )}
    </div>
  );
};
export default Details;
