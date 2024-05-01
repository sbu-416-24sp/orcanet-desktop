import { app, shell, BrowserWindow, ipcMain, net } from "electron";
import { join } from "path";
import { electronApp, optimizer, is } from "@electron-toolkit/utils";
import icon from "../../resources/icon.png?asset";
import {
  clearHistory,
  findPeers,
  getHistory,
  getPeers,
  pauseJobs,
  removeFromHistory,
  startJobs,
  terminateJobs,
} from "@/lib";
import {
  GetActivity,
  GetActivities,
  GetPeers,
  FindPeers,
  PauseJobs,
  StartJobs,
  TerminateJobs,
  GetHistory,
  RemoveFromHistory,
  ClearHistory,
  JobList,
  AddJob,
  JobInfo,
} from "@shared/types";

import { exec, spawn, ChildProcessWithoutNullStreams } from "child_process";
import { addJob, jobInfo, jobList } from "./lib/market";

let backendProcess: ChildProcessWithoutNullStreams | null = null;

function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: true,
    autoHideMenuBar: true,
    ...(process.platform === "linux" ? { icon } : {}),
    center: true,
    title: "OrcaNet",
    frame: true,
    vibrancy: "under-window",
    visualEffectState: "active",
    titleBarStyle: "hidden",
    trafficLightPosition: { x: 15, y: 10 },
    webPreferences: {
      preload: join(__dirname, "../preload/index.js"),
      sandbox: true,
      contextIsolation: true,
      // nodeIntegration: false,
    },
  });

  mainWindow.on("ready-to-show", () => {
    mainWindow.show();
  });

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url);
    return { action: "deny" };
  });

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env["ELECTRON_RENDERER_URL"]) {
    mainWindow.loadURL(process.env["ELECTRON_RENDERER_URL"]);
  } else {
    mainWindow.loadFile(join(__dirname, "../renderer/index.html"));
  }
}

function setupBackendProcessHandlers(process: ChildProcessWithoutNullStreams) {
  let outputBuffer = "";

  const promptResponseMap = {
    "Enter a port number to start listening to requests for Market RPC Server:":
      "8121\n",
    "Enter a port number to start listening to requests for Market DHT Host:":
      "8122\n",
    "Enter a port number to start listening to requests for HTTP Server:":
      "3000\n",
  };

  process.stdout.on("data", (data) => {
    const output = data.toString();
    console.log(`Backend output: ${output}`);
    outputBuffer += output;

    // Check each prompt in the map
    Object.keys(promptResponseMap).forEach((prompt) => {
      if (outputBuffer.includes(prompt)) {
        process.stdin.write(promptResponseMap[prompt]);
        outputBuffer = "";
      }
    });
  });

  process.stderr.on("data", (data) => {
    console.error(`Backend error: ${data.toString()}`);
  });

  process.on("close", (code) => {
    console.log(`Backend process exited with code ${code}`);
  });

  process.on("error", (err) => {
    console.error(`Failed to start backend process: ${err}`);
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId("com.electron");

  const makeDirectory = "../../orcanet-go/peer";
  backendProcess = spawn("make", ["all"], {
    cwd: makeDirectory,
    stdio: ["pipe", "pipe", "pipe"],
  });

  if (backendProcess) {
    setupBackendProcessHandlers(backendProcess);
  }

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on("browser-window-created", (_, window) => {
    optimizer.watchWindowShortcuts(window);
  });

  // IPC test
  ipcMain.on("ping", () => console.log("pong"));

  // ipcMain.handle('getActivity', (_, ...args: Parameters<GetActivity>) => getActivity(...args))
  // ipcMain.handle('getActivities', (_, ...args: Parameters<GetActivities>) => getActivities(...args))
  ipcMain.handle("getPeers", (_, ...args: Parameters<GetPeers>) =>
    getPeers(...args)
  );

  /* Market Page */
  ipcMain.handle("addJob", (_, ...args: Parameters<AddJob>) => addJob(...args));
  ipcMain.handle("findPeers", (_, ...args: Parameters<FindPeers>) =>
    findPeers(...args)
  );
  ipcMain.handle("jobList", (_, ...args: Parameters<JobList>) =>
    jobList(...args)
  );
  ipcMain.handle("jobInfo", (_, ...args: Parameters<JobInfo>) =>
    jobInfo(...args)
  );
  ipcMain.handle("startJobs", (_, ...args: Parameters<StartJobs>) =>
    startJobs(...args)
  );
  ipcMain.handle("pauseJobs", (_, ...args: Parameters<PauseJobs>) =>
    pauseJobs(...args)
  );
  ipcMain.handle("terminateJobs", (_, ...args: Parameters<TerminateJobs>) =>
    terminateJobs(...args)
  );
  ipcMain.handle("getHistory", (_, ...args: Parameters<GetHistory>) =>
    getHistory(...args)
  );
  ipcMain.handle(
    "removeFromHistory",
    (_, ...args: Parameters<RemoveFromHistory>) => removeFromHistory(...args)
  );
  ipcMain.handle("clearHistory", (_, ...args: Parameters<ClearHistory>) =>
    clearHistory(...args)
  );

  createWindow();

  app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (backendProcess) {
    backendProcess.kill();
  }
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
