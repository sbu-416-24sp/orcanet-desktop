import { contextBridge } from 'electron'
// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (!process.contextIsolated) {
  throw new Error('ContextIsolation must be enabled in the BrowserWindow')
}

try{
  contextBridge.exposeInMainWorld('context',{
    //TODO
  })
}catch(error){
  console.log(error)
}
