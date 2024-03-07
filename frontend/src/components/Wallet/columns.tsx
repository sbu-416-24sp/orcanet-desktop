"use client";

import { ColumnDef } from "@tanstack/react-table";
import IPayment from "@/interfaces/IPayment";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
// export type IPayment = {
//   id: string;
//   amount: number;
//   note: string;
//   date: Date;
//   status: "pending" | "processing" | "success" | "failed";
// };

export const columns: ColumnDef<IPayment>[] = [
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      const color =
        status === "pending"
          ? "text-yellow-500"
          : status === "processing"
          ? "text-blue-500"
          : status === "success"
          ? "text-green-500"
          : "text-red-500";
      return (
        <div>
          <div className={`font-medium ${color}`}>{status}</div>
          <div className="text-gray-500">2021-10-10</div>
        </div>
      );
    },
  },
  {
    accessorKey: "id",
    header: "Transaction ID",
    cell: ({ row }) => {
      return (
        <div>
          <div className="font-medium">{row.getValue("id")}</div>
          {row.original.note && (
            <div className="text-gray-500">Note: {row.original.note}</div>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      const color = amount > 0 ? "text-green-500" : "text-red-500";
      return (
        <div>
          <div className={`text-right font-medium ${color}`}>{amount}</div>
          {/* <div className="text-right">Orca Coin</div> */}
        </div>
      );
    },
  },
];
