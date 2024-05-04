import { ElectronAPI } from "@electron-toolkit/preload";
import {
  GetActivity,
  DeleteActivity,
  GetActivities,
  GetPeers,
  FindPeers,
  StartJobs,
  PauseJobs,
  TerminateJobs,
  GetHistory,
  RemoveFromHistory,
  ClearHistory,
  AddJob,
  JobList,
  JobInfo,
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
      addJob: AddJob;
      findPeers: FindPeers;
      jobList: JobList;
      jobInfo: JobInfo;
      startJobs: StartJobs;
      pauseJobs: PauseJobs;
      terminateJobs: TerminateJobs;
      getHistory: GetHistory;
      removeFromHistory: RemoveFromHistory;
      clearHistory: ClearHistory;
      getBackend: null
      setBackend: string
    };
  }
}
