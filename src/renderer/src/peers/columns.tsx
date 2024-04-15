"use client";

import { ColumnDef } from "@tanstack/react-table";

import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "../shadcn/components/ui/button";

import { Checkbox } from "../shadcn/components/ui/checkbox";

// This type is used to define the shape of our data.
  // You can use a Zod schema here if you want.


export type Seed = {
  location: string;
  latency: string;
  peerID: string;
  connection: string;
  openStreams: string;
  flagUrl: string;
};

export const columns: ColumnDef<Seed>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
  },
  {
    accessorKey: "location",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          
          Location
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) =>(
      <div className="text-right flex">
        <img src={row.original.flagUrl} alt="flag" style={{maxWidth: '23px', maxHeight: '20px'}} />
        <span className="ml-3"> {row.getValue("location")} </span> 
      </div>
    )
  },
  {
    accessorKey: "latency",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Latency
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "peerID",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Peer ID
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="text-right  flex">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 32 32"><path d="M27.332,10.323c-1.07,0-2.055,.361-2.842,.967-2.143-1.326-4.848-2.16-7.807-2.271v-.013c0-1.983,1.474-3.629,3.386-3.9v-.003c.347,1.47,1.666,2.564,3.242,2.564,1.84,0,3.331-1.491,3.331-3.331s-1.491-3.331-3.331-3.331c-1.609,0-2.95,1.14-3.262,2.657-2.694,.289-4.798,2.574-4.798,5.343v.017c-2.93,.123-5.605,.957-7.729,2.274-.789-.611-1.779-.974-2.853-.974-2.578,0-4.668,2.09-4.668,4.668,0,1.871,1.099,3.483,2.688,4.228,.155,5.419,6.06,9.778,13.323,9.778s13.176-4.364,13.323-9.787c1.576-.75,2.666-2.357,2.666-4.217,0-2.578-2.09-4.668-4.668-4.668ZM7.334,17.952c.078-1.693,1.203-2.992,2.51-2.992s2.307,1.373,2.229,3.066c-.078,1.693-1.054,2.308-2.363,2.308s-2.453-.689-2.375-2.382Zm13.596,4.424c-.804,1.922-2.703,3.273-4.919,3.273s-4.114-1.351-4.919-3.273c-.095-.228,.061-.483,.306-.508,1.437-.145,2.991-.225,4.613-.225s3.175,.08,4.613,.225c.245,.025,.401,.28,.306,.508Zm1.384-2.043c-1.307,0-2.285-.614-2.363-2.308-.078-1.693,.92-3.066,2.229-3.066s2.433,1.299,2.51,2.992c.078,1.693-1.068,2.382-2.375,2.382Z"></path></svg> <span className="ml-3">{row.getValue("peerID")}</span>
      </div>
    ),
  },

  {
    accessorKey: "connection",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Connection
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="text-right">{row.getValue("connection")}</div>
    ),
  },

  {
    accessorKey: "openStreams",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Open Streams
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="text-right"> {row.getValue("openStreams")}</div>
    ),
  },

];
