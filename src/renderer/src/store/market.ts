import { FilePeers } from "@shared/models";
import { atom } from "jotai";

const initialFilePeers: FilePeers = {
  peers: [],
};
const filePeersAtom = atom<FilePeers>(initialFilePeers);

export const fetchFilePeersAtom = atom(
  (get) => get(filePeersAtom),
  async (_get, set, fileHash: string) =>
    set(filePeersAtom, await window.context.findPeers(fileHash))
);
