export default interface IPayment {
  id: string;
  amount: number;
  note: string;
  date: Date;
  status: "pending" | "processing" | "success" | "failed";
}
