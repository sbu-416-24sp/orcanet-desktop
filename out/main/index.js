"use strict";
const electron = require("electron");
const path = require("path");
const utils = require("@electron-toolkit/utils");
const child_process = require("child_process");
const icon = path.join(__dirname, "../../resources/icon.png");
const portNumber = 45002;
const getPeers = async () => {
  return new Promise((resolve, reject) => {
    const request = electron.net.request({
      method: "GET",
      protocol: "http:",
      hostname: "localhost",
      port: portNumber,
      path: "/get-peers",
      redirect: "follow"
    });
    let responseBody = "";
    request.on("response", (response) => {
      console.info(`STATUS: ${response.statusCode}`);
      console.info(`HEADERS: ${JSON.stringify(response.headers)}`);
      response.on("data", (chunk) => {
        responseBody += chunk;
      });
      response.on("end", () => {
        console.log("No more data in response.");
        console.log("res body", responseBody);
        try {
          const files = JSON.parse(responseBody);
          if (!Array.isArray(files)) {
            throw new TypeError("Received data is not an array");
          }
          const peers = files.map((file) => ({
            Location: file.location,
            Latency: file.latency,
            PeerID: file.peerId,
            Connection: file.connection,
            OpenStreams: file.openStreams,
            FlagUrl: file.flagUrl
          }));
          resolve(peers);
        } catch (error) {
          console.error("Error parsing response:", error);
          reject(error);
        }
      });
    });
    request.on("error", (error) => {
      console.log(`ERROR: ${JSON.stringify(error)}`);
      reject(error);
    });
    request.on("close", () => {
      console.log("Last Transaction has occurred");
    });
    request.setHeader("Content-Type", "application/json");
    request.end();
  });
};
function createWindow() {
  const mainWindow = new electron.BrowserWindow({
    width: 900,
    height: 670,
    show: true,
    autoHideMenuBar: true,
    ...process.platform === "linux" ? { icon } : {},
    center: true,
    title: "OrcaNet",
    frame: true,
    vibrancy: "under-window",
    visualEffectState: "active",
    titleBarStyle: "hidden",
    trafficLightPosition: { x: 15, y: 10 },
    webPreferences: {
      preload: path.join(__dirname, "../preload/index.js"),
      sandbox: true,
      contextIsolation: true
    }
  });
  mainWindow.on("ready-to-show", () => {
    mainWindow.show();
  });
  mainWindow.webContents.setWindowOpenHandler((details) => {
    electron.shell.openExternal(details.url);
    return { action: "deny" };
  });
  if (utils.is.dev && process.env["ELECTRON_RENDERER_URL"]) {
    mainWindow.loadURL(process.env["ELECTRON_RENDERER_URL"]);
  } else {
    mainWindow.loadFile(path.join(__dirname, "../renderer/index.html"));
  }
}
electron.app.whenReady().then(() => {
  utils.electronApp.setAppUserModelId("com.electron");
  child_process.exec("make all", { cwd: "/Users/joannelu/PeerNode/orcanet-go-new/peer" }, (error, stdout, stderr) => {
    if (error) {
      console.error(`Server error: ${error}`);
      return;
    }
    console.log(`Server stdout: ${stdout}`);
    console.error(`Server stderr: ${stderr}`);
  });
  electron.app.on("browser-window-created", (_, window) => {
    utils.optimizer.watchWindowShortcuts(window);
  });
  electron.ipcMain.on("ping", () => console.log("pong"));
  electron.ipcMain.handle("getPeers", (_, ...args) => getPeers(...args));
  createWindow();
  electron.app.on("activate", function() {
    if (electron.BrowserWindow.getAllWindows().length === 0)
      createWindow();
  });
});
electron.app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    electron.app.quit();
  }
});
