import { contextBridge, ipcRenderer } from 'electron'

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (!process.contextIsolated) {
  throw new Error('ContextIsolation must be enabled in the BrowserWindow')
}

try {
  contextBridge.exposeInMainWorld('electron', {
    getBackend: () => ipcRenderer.invoke('get-backend'),
    setBackend: (backend) => ipcRenderer.invoke('set-backend', backend)
  });
} catch (error) {
  console.error('Failed to expose electron APIs:', error);
}

