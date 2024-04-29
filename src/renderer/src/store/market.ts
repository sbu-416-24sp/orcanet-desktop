import { FilePeers, HistoryJob, JobID, JobOverview } from "@shared/models";
import { atom } from "jotai";
import { unwrap } from "jotai/utils";

const initialFilePeers: FilePeers = {
  peers: [],
};
const filePeersAtom = atom<FilePeers>(initialFilePeers);
export const fetchFilePeersAtom = atom(
  (get) => get(filePeersAtom),
  async (_get, set, fileHash: string) =>
    set(filePeersAtom, await window.context.findPeers(fileHash))
);

const initialHistory: HistoryJob[] = [];
const historyAtom = atom<HistoryJob[]>(initialHistory);
export const fetchHistoryAtom = atom(
  (get) => get(historyAtom),
  async (_get, set) => set(historyAtom, await window.context.getHistory())
);

const initialJobList: JobOverview[] = [];
const jobListAtom = atom<JobOverview[]>(initialJobList);
export const fetchJobListAtom = atom(
  (get) => get(jobListAtom),
  async (_get, set) => set(jobListAtom, await window.context.jobList())
);
