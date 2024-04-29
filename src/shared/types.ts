import {
  ActivityInfo,
  PeerInfo,
  FilePeers,
  JobID,
  HistoryJob,
  JobOverview,
} from "./models";

export type GetActivity = (
  filename: ActivityInfo["Name"],
  cid: ActivityInfo["Hash"]
) => Promise<ActivityInfo>;
export type GetActivities = () => Promise<ActivityInfo[]>;
// export type ReadAcitvity = (title: ActivityInfo['ID']) => Promise<NoteContent>
export type CreateActivity = () => Promise<ActivityInfo["Hash"] | false>;
export type DeleteActivity = (title: ActivityInfo["Hash"]) => Promise<boolean>;

export type GetPeers = () => Promise<PeerInfo[]>;

/* Market Page */
export type AddJob = (
  fileHash: string,
  peerID: string
) => Promise<{ jobID: JobID }>;
export type FindPeers = (fileHash: string) => Promise<FilePeers>;
export type JobList = () => Promise<JobOverview[]>;
export type StartJobs = (jobIDs: JobID[]) => Promise<boolean>;
export type PauseJobs = (jobIDs: JobID[]) => Promise<boolean>;
export type TerminateJobs = (jobIDs: JobID[]) => Promise<boolean>;
export type GetHistory = () => Promise<HistoryJob[]>;
export type RemoveFromHistory = (jobID: JobID) => Promise<boolean>;
export type ClearHistory = () => Promise<boolean>;
