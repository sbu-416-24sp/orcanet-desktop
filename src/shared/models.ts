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

export type JobOverview = {
  jobID: JobID;
  fileName: string;
  fileSize: string;
  eta: string;
  timeQueued: Date;
  status: "active" | "paused" | "error";
};
