import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Filter, PlusIcon } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { DataTable } from "./DataTable";
import fakeSeeds from "./fakeSeeds";
import { Seed2, columns2 } from "./columns";
import { toast } from "@/components/ui/use-toast";
const OverviewHeader = (props: {
  setFilter: React.Dispatch<React.SetStateAction<string>>;
  setStatusFilter: React.Dispatch<React.SetStateAction<string>>;
  addJob: (hash: string) => void;
}) => {
  return (
    <div className="flex justify-between mb-2">
      <div className="flex">
        <FilterInput setFilter={props.setFilter} />
        <Button className="ml-2" onClick={() => props.setStatusFilter("all")}>
          All
        </Button>
        <Button
          className="ml-2"
          onClick={() => props.setStatusFilter("downloading")}
        >
          Downloading
        </Button>
        <Button
          className="ml-2"
          onClick={() => props.setStatusFilter("paused")}
        >
          Paused
        </Button>
        <Button className="ml-2" onClick={() => props.setStatusFilter("error")}>
          Error
        </Button>
        <Button
          className="ml-2"
          onClick={() => props.setStatusFilter("completed")}
        >
          Completed
        </Button>
      </div>
      <AddJob addJob={props.addJob} />
    </div>
  );
};
export default OverviewHeader;

const FilterInput = (props: {
  setFilter: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [buffer, setBuffer] = useState("");
  return (
    <div className="relative min-w-28">
      <Input
        type="text"
        value={buffer}
        onChange={(e) => setBuffer(e.target.value)}
        onKeyUp={(e) => {
          if (e.key === "Enter") {
            props.setFilter(buffer);
          }
        }}
        placeholder="Filter..."
      />
      {/* <span className="absolute left-2 top-2">Filter</span> */}
      <Filter
        className="absolute right-2 top-2"
        onClick={(e) => props.setFilter(buffer)}
      />
    </div>
  );
};

const fakeData: Seed2[] = [
  { name: "Alice", price: "30 USD", rate: "30 Mb/s"},
  { name: "Bob", price: "35 USD", rate: "50 Mb/s"}
]
const DialogClose = DialogPrimitive.Close
const AddJob = (props: { addJob: (hash: string) => void }) => {
  const [buffer, setBuffer] = useState("");
  const [validHash, setValidHash] = useState(0);
  //const [selectedPeer, setSelectedPeer] = useState(false)
  const hash = "f26811862f6ba50908850f61ad73fb5d8d86754cd2acb9ef";

  const resetAddJob = () => {
    setBuffer("");
    setValidHash(0);
  }

  const handleSearchHash = () => {
    if (buffer === hash) {
      setValidHash(1);
      console.log("Hello");
    }
    else{
      setValidHash(-1);
    }
  };

  const handleAddJob = () => {
    props.addJob(buffer);
    toast({
      title: "Job Successfully Added!",
      description: "Your job has been successfully added!",
    })
  }

  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <Button onClick={resetAddJob} className="ml-20">Add Job</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Add Job</DialogTitle>
          <Input
            type="text"
            value={buffer}
            onChange={(e) => setBuffer(e.target.value)}
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                handleSearchHash();
              }
            }}
            placeholder="File hash..."
          />
          {validHash !== 1 && <Button onClick={handleSearchHash}>Search Hash</Button>}
          {validHash === -1 && <p>No files match this hash</p>}
          {validHash === 1 && (
          <>
           <DataTable data={fakeData} columns={columns2}></DataTable>
            <DialogClose>
              <Button onClick={handleAddJob}>Select Peer</Button>
            </DialogClose>
          </>)}
        </DialogContent>
      </Dialog>
    </div>
  );
};
