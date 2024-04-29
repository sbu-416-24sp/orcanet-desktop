import {
  GetActivity,
  GetActivities,
  GetPeers,
  FindPeers,
  StartJobs,
  PauseJobs,
  TerminateJobs,
  GetHistory,
  RemoveFromHistory,
  ClearHistory,
  JobList,
  AddJob,
} from "@shared/types";
import { contextBridge, ipcRenderer } from "electron";
// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (!process.contextIsolated) {
  throw new Error("ContextIsolation must be enabled in the BrowserWindow");
}

try {
  contextBridge.exposeInMainWorld("context", {
    locale: navigator.language,
    // getActivity : (...args: Parameters<GetActivity>) =>  ipcRenderer.invoke('getActivity', ...args),
    // getActivities : (...args: Parameters<GetActivities>) =>  ipcRenderer.invoke('getActivities', ...args),
    getPeers: (...args: Parameters<GetPeers>) =>
      ipcRenderer.invoke("getPeers", ...args),
    // deleteActivity : (...args: Parameters<DeleteActivity>) =>  ipcRenderer.invoke('deleteActivity', ...args),
    //TODO

    /* Market Page */
    addJob: (...args: Parameters<AddJob>) =>
      ipcRenderer.invoke("addJob", ...args),
    findPeers: (...args: Parameters<FindPeers>) =>
      ipcRenderer.invoke("findPeers", ...args),
    jobList: (...args: Parameters<JobList>) =>
      ipcRenderer.invoke("jobList", ...args),
    startJobs: (...args: Parameters<StartJobs>) =>
      ipcRenderer.invoke("startJobs", ...args),
    pauseJobs: (...args: Parameters<PauseJobs>) =>
      ipcRenderer.invoke("pauseJobs", ...args),
    terminateJobs: (...args: Parameters<TerminateJobs>) =>
      ipcRenderer.invoke("terminateJobs", ...args),
    getHistory: (...args: Parameters<GetHistory>) =>
      ipcRenderer.invoke("getHistory", ...args),
    removeFromHistory: (...args: Parameters<RemoveFromHistory>) =>
      ipcRenderer.invoke("removeFromHistory", ...args),
    clearHistory: (...args: Parameters<ClearHistory>) =>
      ipcRenderer.invoke("clearHistory", ...args),
  });
} catch (error) {
  console.log(error);
}
