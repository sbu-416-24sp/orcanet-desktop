import { FilePeers, HistoryJob, JobID, JobOverview } from "@shared/models";
import { atom } from "jotai";
import { unwrap } from "jotai/utils";

const initialFilePeers: FilePeers = {
  peers: [],
};
const filePeersAtom = atom<FilePeers>(initialFilePeers);
export const fetchFilePeersAtom = unwrap(
  atom(
    (get) => get(filePeersAtom),
    async (_get, set, fileHash: string) => {
      const filePeers = await window.context.findPeers(fileHash);
      set(filePeersAtom, filePeers);
    }
  )
);

const initialHistory: HistoryJob[] = [];
const historyAtom = atom<HistoryJob[]>(initialHistory);
export const fetchHistoryAtom = unwrap(
  atom(
    (get) => get(historyAtom),
    async (_get, set) => {
      const history = await window.context.getHistory();
      set(historyAtom, history);
    }
  )
);

const initialJobList: JobOverview[] = [];
const jobListAtom = atom<JobOverview[]>(initialJobList);
export const fetchJobListAtom = unwrap(
  atom(
    (get) => get(jobListAtom),
    async (_get, set) => {
      const jobList = await window.context.jobList();
      set(jobListAtom, jobList);
    }
  )
);
