"use strict";
const electron = require("electron");
if (!process.contextIsolated) {
  throw new Error("ContextIsolation must be enabled in the BrowserWindow");
}
try {
  electron.contextBridge.exposeInMainWorld("context", {
    //TODO
  });
} catch (error) {
  console.log(error);
}
