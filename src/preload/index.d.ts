import { ElectronAPI } from '@electron-toolkit/preload'
import { GetActivity , DeleteActivity, GetActivities, GetPeers} from '@shared/types'

declare global {
  interface Window {
    //electron: ElectronAPI
    context: {
      locale: string
      // getActivity: GetActivity
      // getActivities: GetActivities
      // deleteActivity: DeleteActivity
      getPeers: GetPeers
    }
  }
}
