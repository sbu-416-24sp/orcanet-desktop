export type PeerInfo = {
  Location: string;
  Latency: string;
  PeerID: string;
  Connection: string;
  OpenStreams: string;
  FlagUrl: string;
};

export type ActivityInfo = {
  Name: string;
  Size: string;
  Hash: string;
  Status: string;
  Peers: number;
  lastEditTime: number;
};

/* Market Page */
export type FilePeers = {
  peers: FilePeer[];
};
export type FilePeer = {
  peerID: any;
  ip: string;
  region: string;
  price: Number;
};

export type JobID = string;

export type HistoryJob = {
  jobID: JobID;
  fileName: string;
  timeCompleted: Date;
};

export type JobStatus = "active" | "paused" | "error" | "completed";

export type JobOverview = {
  jobID: JobID;
  fileName: string;
  fileSize: Number;
  eta: Number;
  timeQueued: Date;
  status: JobStatus;
};

export type JobDetails = {
  fileHash: string;
  fileName: string;
  fileSize: Number;
  accumulatedMemory: Number;
  accumulatedCost: Number;
  projectedCost: Number;
  eta: Number;
  timeQueued: Date;
  status: JobStatus;

  /* Added from job-peer */
  ipAddress: string;
  region: string;
  price: Number;
};
