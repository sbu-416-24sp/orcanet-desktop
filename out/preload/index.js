"use strict";
const electron = require("electron");
if (!process.contextIsolated) {
  throw new Error("ContextIsolation must be enabled in the BrowserWindow");
}
try {
  electron.contextBridge.exposeInMainWorld("context", {
    locale: navigator.language,
    getPeers: (...args) => electron.ipcRenderer.invoke("getPeers", ...args),
    getBackend: () => electron.ipcRenderer.invoke("get-backend"),
    setBackend: (backend) => electron.ipcRenderer.invoke("set-backend", backend),
    /* Market Page */
    addJob: (...args) => electron.ipcRenderer.invoke("addJob", ...args),
    findPeers: (...args) => electron.ipcRenderer.invoke("findPeers", ...args),
    jobList: (...args) => electron.ipcRenderer.invoke("jobList", ...args),
    jobInfo: (...args) => electron.ipcRenderer.invoke("jobInfo", ...args),
    startJobs: (...args) => electron.ipcRenderer.invoke("startJobs", ...args),
    pauseJobs: (...args) => electron.ipcRenderer.invoke("pauseJobs", ...args),
    terminateJobs: (...args) => electron.ipcRenderer.invoke("terminateJobs", ...args),
    getHistory: (...args) => electron.ipcRenderer.invoke("getHistory", ...args),
    removeFromHistory: (...args) => electron.ipcRenderer.invoke("removeFromHistory", ...args),
    clearHistory: (...args) => electron.ipcRenderer.invoke("clearHistory", ...args)
  });
} catch (error) {
  console.error("Failed to expose electron APIs:", error);
}
