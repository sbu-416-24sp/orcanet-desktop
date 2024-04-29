import { ElectronAPI } from "@electron-toolkit/preload";
import {
  GetActivity,
  DeleteActivity,
  GetActivities,
  GetPeers,
  FindPeers,
  StartJobs,
  TerminateJobs,
  GetHistory,
  RemoveFromHistory,
  ClearHistory,
} from "@shared/types";

declare global {
  interface Window {
    //electron: ElectronAPI
    context: {
      locale: string;
      // getActivity: GetActivity
      // getActivities: GetActivities
      // deleteActivity: DeleteActivity
      getPeers: GetPeers;
      /* Market Page */
      findPeers: FindPeers;
      startJobs: StartJobs;
      pauseJobs: PauseJobs;
      terminateJobs: TerminateJobs;
      getHistory: GetHistory;
      removeFromHistory: RemoveFromHistory;
      clearHistory: ClearHistory;
    };
  }
}
