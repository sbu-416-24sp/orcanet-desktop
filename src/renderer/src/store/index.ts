import { ActivityInfo, PeerInfo } from "@shared/models";
import { atom } from "jotai";
import { unwrap } from "jotai/utils";

// const loadActivities = async () => {
//   const activities = await window.context.getActivities();
//   // sort them by most recently edited
//   return activities.sort((a, b) => b.lastEditTime - a.lastEditTime)
// }

// const ActivitiesAtomAsync = atom<ActivityInfo[] | Promise<ActivityInfo[]>>(loadActivities())

// export const ActivitiesAtom = unwrap(ActivitiesAtomAsync, (prev) => prev)

const loadPeers = async () => {
  const peers = await window.context.getPeers();
  return peers.sort((a, b) => b.Location.localeCompare(a.Location));
};

const PeersAtomAsync = atom<PeerInfo[] | Promise<PeerInfo[]>>(loadPeers);

export const PeersAtom = unwrap(PeersAtomAsync, (prev) => prev);

// export const selectedActivityIndexAtom = atom<number | null>(null)

// const selectedNoteAtomAsync = atom(async (get) => {
//   const activities = get(ActivitiesAtom)
//   const selectedActivityIndex = get(selectedActivityIndexAtom)

//   if (selectedActivityIndex == null || !activities) return null

//   const selectedNote = activities[selectedActivityIndex]

//   const noteContent = await window.context.readNote(selectedNote.title)

//   return {
//     ...selectedNote,
//     content: noteContent
//   }
// })

// export const selectedActivityAtom = unwrap(
//   selectedNoteAtomAsync,
//   (prev) =>
//     prev ?? {
//       title: '',
//       content: '',
//       lastEditTime: Date.now()
//     }
// )

// export const saveNoteAtom = atom(null, async (get, set, newContent: NoteContent) => {
//   const notes = get(notesAtom)
//   const selectedNote = get(selectedNoteAtom)

//   if (!selectedNote || !notes) return

//   // save on disk
//   await window.context.writeNote(selectedNote.title, newContent)

//   // update the saved note's last edit time
//   set(
//     notesAtom,
//     notes.map((note) => {
//       // this is the note that we want to update
//       if (note.title === selectedNote.title) {
//         return {
//           ...note,
//           lastEditTime: Date.now()
//         }
//       }

//       return note
//     })
//   )
// })

// export const createEmptyNoteAtom = atom(null, async (get, set) => {
//   const notes = get(notesAtom)

//   if (!notes) return

//   const title = await window.context.createNote()

//   if (!title) return

//   const newNote: NoteInfo = {
//     title,
//     lastEditTime: Date.now()
//   }

//   set(notesAtom, [newNote, ...notes.filter((note) => note.title !== newNote.title)])

//   set(selectedNoteIndexAtom, 0)
// })

// export const deleteNoteAtom = atom(null, async (get, set) => {
//   const notes = get(notesAtom)
//   const selectedNote = get(selectedNoteAtom)

//   if (!selectedNote || !notes) return

//   const isDeleted = await window.context.deleteNote(selectedNote.title)

//   if (!isDeleted) return

//   // filter out the deleted note
//   set(
//     notesAtom,
//     notes.filter((note) => note.title !== selectedNote.title)
//   )

//   // de select any note
//   set(selectedNoteIndexAtom, null)
// })

/* Market Page */
import {
  fetchFilePeersAtom,
  fetchHistoryAtom,
  fetchJobListAtom,
} from "./market";

export { fetchFilePeersAtom, fetchHistoryAtom, fetchJobListAtom };
