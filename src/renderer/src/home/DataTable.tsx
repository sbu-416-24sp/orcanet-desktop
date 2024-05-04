import React, { useState, useRef, useEffect } from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  FilterFnOption,
} from "@tanstack/react-table";

import SearchBar from "./SearchBar";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../shadcn/components/ui/table";

import { Button } from "../shadcn/components/ui/button";
import { Activity } from "./columns";

interface DataTableProps {
  columns: ColumnDef<Activity>[];
  data: Activity[];
  totalSize: string;
  onFileAdded: (file: File) => Promise<void>;
  activities: Activity[];
}

export function DataTable({
  columns,
  data,
  onFileAdded,
}: DataTableProps) {
  const [globalFilter, setGlobalFilter] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (fileInputRef.current) {
      fileInputRef.current.setAttribute("webkitdirectory", "true");
      fileInputRef.current.setAttribute("directory", "true");
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const fuzzyTextFilterFn: FilterFnOption<Activity> = (
    row,
    value,
  ) => {
    const cellValue = row.original["hash"];
    console.log("cellValue", cellValue)
    return cellValue && typeof cellValue === "string"
      ? cellValue.toLowerCase().startsWith(globalFilter.toLowerCase())
      : false;
  };

  const [sorting, setSorting] = useState([]);

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
      sorting: sorting,
    },
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyTextFilterFn,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting, //Ignore this error its cool
  });

  return (
    <div className="flex flex-col py-4 w-full">
      <div className="flex items-center justify-between py-2">
        <div className="w-1/2">
          <SearchBar
            value={globalFilter}
            onChange={(value) => setGlobalFilter(String(value))}
          />

        </div>
        <div className="w-1/2 flex justify-end relative">
          <button
            id="file-upload"
            className="border border-black hover:bg-gray-100 font-medium py-2 px-4 rounded-lg transition duration-150 ease-in-out"
            onClick={() => setIsDropdownVisible(!isDropdownVisible)}
          >
            <span className="">+</span> Import
          </button>
          <div
            ref={dropdownRef}
            className={`origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 divide-y divide-gray-300 ${
              isDropdownVisible ? "block" : "hidden"
            }`}
            id="file-upload-dropdown"
            style={{ top: "100%" }}
          >
            <label
              htmlFor="file-upload-file"
              className="block px-4 py-2 text-sm hover:bg-gray-100 border-b border-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 cursor-pointer"
            >
              File
              <input
                id="file-upload-file"
                type="file"
                ref={fileInputRef}
                className="hidden"
                onChange={async (e) => {
                  const file = e.target.files ? e.target.files[0] : null;
                  if (file) {
                    await onFileAdded(file);
                  }
                }}
              />
            </label>
            <label
              htmlFor="folder-upload"
              className="block px-4 py-2 text-sm hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 cursor-pointer"
            >
              Folder
              <input
                id="folder-upload"
                type="file"
                ref={fileInputRef}
                className="hidden"
                onChange={async (e) => {
                  const items = e.target.files ? e.target.files : null;
                  if (items) {
                    for (let i = 0; i < items.length; i++) {
                      await onFileAdded(items[i]);
                    }
                  }
                }}
              />
            </label>
          </div>
        </div>
      </div>

      <div className="rounded-md border overflow-visible">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} style={{ cursor: 'pointer' }} className="bg-gray-50 text-black" onClick={header.column.getToggleSortingHandler()}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                        {
                          //Ignore this error it works
                          {asc: ' ⬆️', desc: ' ⬇️'} [header.column.getIsSorted() ?? null]
                        }
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
                  className={row.getIsSelected() ? "selected-row bg-gray-100 dark:bg-gray-600" : "unselected-row"} 
                  >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4 pb-8">
        <Button
          variant="outline"
          size="sm"
          className="border-black"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="border-black"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
