"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../shadcn/components/ui/table";

import { ChevronsRight } from "lucide-react";
import { Link, useParams } from "react-router-dom";

export const WalletData = [
  {
    id: "59a53ee428a643e940546c5ccfc5663e",
    amount: -0.5523342,
    status: "pending",
    reason: "BananaHub.mp4",
    date: new Date("2021-10-10"),
  },
  {
    id: "f0623b42ea2d521b945a80b014f5694b",
    amount: 0.000012323,
    status: "failed",
    reason: "Dota2_OnePunchGodModeMenu.exe",
    date: new Date("2021-10-10"),
  },
  {
    id: "061b96f36e163ef82de2feefe7d7aaba",
    amount: -0.8311008,

    status: "processing",
    reason: "PayPaiBalanceInjector.bin",
    date: new Date("2021-10-10"),
  },
  {
    id: "b8ae1f8845ee9cbe64174ae089973b56",
    amount: 0.663450023,
    status: "processing",
    reason: "",
    date: new Date("2021-10-10"),
  },
  {
    id: "bcaeff20734041e27098eb5138b3003a",
    amount: 0.00432,
    status: "success",
    reason: "きかんしゃトーマス.avi",
    date: new Date("2021-10-10"),
  },
];

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="rounded-md bg-white border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    className="font-semibold text-stone-900"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export const columns = [
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }: { row: any }) => {
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
    cell: ({ row }: { row: any }) => {
      return (
        <div>
          <div className="font-md">{row.getValue("id")}</div>
          {row.original.reason && (
            <div className="text-gray-500">Reason: {row.original.reason}</div>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }: { row: any }) => {
      const amount = parseFloat(row.getValue("amount"));
      const color = amount > 0 ? "text-green-500" : "text-red-500";
      return (
        <div>
          <div className={`text-right font-medium ${color}`}>{amount}</div>
        </div>
      );
    },
  },
];

export default function TransactionTable() {
  const { page } = useParams();

  return (
    <div className="rounded-md bg-white p-5 border">
      <div className="flex justify-between font-bold mb-2">
        <h3 className="text-stone-900 text-xl">Transactions</h3>
        {page !== "transactions" && (
          <Link to="/wallet/transactions">
            <div className="text-indigo-500 flex gap-2 text-sm items-center hover:cursor-pointer">
              <h3>View All</h3>
              <ChevronsRight />
            </div>
          </Link>
        )}
      </div>
      <DataTable columns={columns} data={WalletData} />
    </div>
  );
}
