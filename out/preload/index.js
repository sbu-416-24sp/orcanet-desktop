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
    setBackend: (backend) => electron.ipcRenderer.invoke("set-backend", backend)
  });
} catch (error) {
  console.error("Failed to expose electron APIs:", error);
}
