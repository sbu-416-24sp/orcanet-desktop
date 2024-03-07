"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Peer } from "./PeerData";

export const columns: ColumnDef<Peer>[] = [
  {
    accessorKey: "location",
    header: "Location",
  },
  {
    accessorKey: "latency",
    header: "Latency",
  },
  {
    accessorKey: "peerId",
    header: "Peer ID",
  },
  {
    accessorKey: "connection",
    header: "Connection",
  },
];
