import { FilePeers, HistoryJob } from "@shared/models";
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
