import { app, shell, BrowserWindow, ipcMain, net } from "electron";
import { join } from "path";
import { electronApp, optimizer, is } from "@electron-toolkit/utils";
import icon from "../../resources/icon.png?asset";
import { getPeers } from "@/lib";
import { GetActivity, GetActivities, GetPeers } from "@shared/types";
import ElectronStore from "electron-store";

import { exec, spawn, ChildProcessWithoutNullStreams } from "child_process";

let backendProcess: ChildProcessWithoutNullStreams | null = null;

const schema = {
  backend: {
    type: "string",
    default: "go",
  },
};

const store = new ElectronStore({ schema });

ipcMain.handle("get-backend", async () => {
  return store.get("backend");
});

ipcMain.handle("set-backend", async (_, newBackend) => {
  store.set("backend", newBackend);
  startBackendProcess(newBackend);
});

function watchBackendChanges() {
  store.onDidChange("backend", (newValue, oldValue) => {
    console.log(`Backend changed from ${oldValue} to ${newValue}`);
    startBackendProcess(newValue as string);
  });
}

function startBackendProcess(backend: string) {
  console.log(`Attempting to start backend: ${backend}`); // Debugging
  if (backendProcess) {
    console.log("Killing existing backend process"); // Debugging
    backendProcess.kill("SIGTERM");
    backendProcess = null;
  }

  let makeDirectory: string;
  let command: string;
  let args: string[];
  

  if (backend.toLowerCase() === "go") {
    makeDirectory = `../../orcanet-${backend.toLowerCase()}/peer`;
    command = "make";
    args = ["all"];
  } else if (backend.toLowerCase() === "js") {
    makeDirectory = `../../orcanet-${backend.toLowerCase()}/src`;
    command = process.execPath;
    args = ["."];
  } else if (backend.toLowerCase() === "rust") {
    makeDirectory = `../../orcanet-${backend.toLowerCase()}/peernode`;
    command = "cargo";
    args = ["build", "&&", "cargo", "run"];
  } else {
    console.error(`Unsupported backend type: ${backend}`);
    return;
  }

  console.log(`Directory for backend: ${makeDirectory}`); // Debugging
  backendProcess = spawn(command, args, {
    cwd: makeDirectory,
    stdio: ["pipe", "pipe", "pipe"],
  });

  setupBackendProcessHandlers(backendProcess, backend);
}
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

function setupBackendProcessHandlers(process: ChildProcessWithoutNullStreams, backend: string) {
  let outputBuffer = "";

  const promptResponseMap = {
    "Enter a port number to start listening to requests for Market RPC Server:":
      "8121\n",
    "Enter a port number to start listening to requests for Market DHT Host:":
      "8122\n",
    "Enter a port number to start listening to requests for HTTP Server:":
      "45002\n",
  };

  process.stdout.on("data", (data) => {
    const output = data.toString();
    console.log(`Backend output: ${output}`);
    outputBuffer += output;

    if(backend.toLowerCase() === "go") {
      
    // Check each prompt in the map
    Object.keys(promptResponseMap).forEach((prompt) => {
      if (outputBuffer.includes(prompt)) {
        process.stdin.write(promptResponseMap[prompt]);
        outputBuffer = "";
      }
    });
    }
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

// This method will be call when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId("com.electron");

  startBackendProcess(store.get("backend") as string);

  watchBackendChanges();

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
    backendProcess.kill("SIGTERM");
  }
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
