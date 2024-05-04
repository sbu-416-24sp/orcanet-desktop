import { Button } from "../shadcn/components/ui/button";
import { Input } from "../shadcn/components/ui/input";
import { Filter, PlusIcon } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../shadcn/components/ui/dialog";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { DataTable } from "./DataTable";
import { columns2 } from "./columns";
import { toast } from "../shadcn/components/ui/use-toast";
import { fetchFilePeersAtom } from "@renderer/store";
import { useAtom } from "jotai";
import { FilePeer, FilePeers } from "@shared/models";
const OverviewHeader = (props: {
  setFilter: React.Dispatch<React.SetStateAction<string>>;
  setStatusFilter: React.Dispatch<React.SetStateAction<string>>;
  addJob: (hash: string, peerID: string) => void;
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
      </div>
      <div className="text-right">
        <AddJob addJob={props.addJob} />
      </div>
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
        onClick={() => props.setFilter(buffer)}
      />
    </div>
  );
};

const DialogClose = DialogPrimitive.Close;
const AddJob = (props: { addJob: (hash: string, peerID: string) => void }) => {
  const [buffer, setBuffer] = useState("");
  const [validHash, setValidHash] = useState(0);
  const [selectedPeer, setSelectedPeer] = useState([]);

  const [filePeers, setFilePeers] = useState<FilePeers>({ peers: [] });
  useEffect(() => {
    const fn = async () => {
      const filePeersData = await window.context.findPeers(buffer);
      setFilePeers(filePeersData);
    };
    fn();
  }, [buffer]);

  const resetAddJob = () => {
    setBuffer("");
    setValidHash(0);
    setSelectedPeer([]);
  };

  const handleSearchHash = () => {
    if (filePeers !== undefined && filePeers.peers.length > 0) {
      setValidHash(1);
    } else {
      setValidHash(-1);
    }
  };

  const handleAddJob = () => {
    props.addJob(buffer, selectedPeer[0]);
    toast({
      title: "Job Successfully Added!",
      description: "Your job has been successfully added!",
    });
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <Button onClick={resetAddJob}>Add Job</Button>
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
          {validHash !== 1 && (
            <Button onClick={handleSearchHash}>Search Hash</Button>
          )}
          {validHash === -1 && <p>No files match this hash</p>}
          {validHash === 1 && (
            <>
              <div>Select a Peer</div>
              <DataTable
                data={filePeers !== undefined ? filePeers.peers : []}
                columns={columns2}
                setSelectedPeer={setSelectedPeer}
              ></DataTable>
              {selectedPeer.length === 1 && (
                <DialogClose>
                  <Button onClick={handleAddJob}>Select Peer</Button>
                </DialogClose>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
