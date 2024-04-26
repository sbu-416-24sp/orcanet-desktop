import { GetActivity, GetActivities , GetPeers} from '@shared/types'
import { contextBridge, ipcRenderer } from 'electron'
// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (!process.contextIsolated) {
  throw new Error('ContextIsolation must be enabled in the BrowserWindow')
}

try{
  contextBridge.exposeInMainWorld('context',{
    locale: navigator.language,
    // getActivity : (...args: Parameters<GetActivity>) =>  ipcRenderer.invoke('getActivity', ...args),
    // getActivities : (...args: Parameters<GetActivities>) =>  ipcRenderer.invoke('getActivities', ...args),
    getPeers : (...args: Parameters<GetPeers>) =>  ipcRenderer.invoke('getPeers', ...args),
    // deleteActivity : (...args: Parameters<DeleteActivity>) =>  ipcRenderer.invoke('deleteActivity', ...args),
    //TODO
  })
}catch(error){
  console.log(error)
}
