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
