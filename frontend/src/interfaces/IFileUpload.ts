export default interface IFileUpload {
  cid: string;
  size: number;
  status: "pending" | "processing" | "success" | "failed";
  name: string;
  peers: number;
}
