"use strict";
const electron = require("electron");
if (!process.contextIsolated) {
  throw new Error("ContextIsolation must be enabled in the BrowserWindow");
}
try {
  electron.contextBridge.exposeInMainWorld("context", {
    locale: navigator.language,
    // getActivity : (...args: Parameters<GetActivity>) =>  ipcRenderer.invoke('getActivity', ...args),
    // getActivities : (...args: Parameters<GetActivities>) =>  ipcRenderer.invoke('getActivities', ...args),
    getPeers: (...args) => electron.ipcRenderer.invoke("getPeers", ...args)
    // deleteActivity : (...args: Parameters<DeleteActivity>) =>  ipcRenderer.invoke('deleteActivity', ...args),
    //TODO
  });
} catch (error) {
  console.log(error);
}
