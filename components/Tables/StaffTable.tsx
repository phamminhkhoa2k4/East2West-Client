"use client"
import Image from "next/image";
import { Check } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { useState } from "react";
import { StaffTableProps } from "@/types/table";
import Link from "next/link";
import SearchForm from "../Header/SearchForm";



const StaffTable: React.FC<StaffTableProps> = ({ columns, data, title }) => {
  const [visibleColumns, setVisibleColumns] = useState<string[]>(
    columns.map((col) => col.key)
  );

  const handleColumnToggle = (key: string) => {
    setVisibleColumns((prev) =>
      prev.includes(key) ? prev.filter((col) => col !== key) : [...prev, key]
    );
  };

  return (
    <div className="">
      <div className="flex my-5 items-center justify-between max-w-[1135px]">
        <SearchForm />
        <div>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  2
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
        <Popover>
          <PopoverTrigger asChild>
            <div className="px-3 py-1 border rounded-lg flex items-center">
              Custom Column
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-[150px]">
            <Command>
              <CommandList>
                <CommandEmpty>No framework found.</CommandEmpty>
                <CommandGroup>
                  {columns.map((column) => (
                    <CommandItem
                      key={column.key}
                      value={column.key}
                      onSelect={() => handleColumnToggle(column.key)}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          visibleColumns.includes(column.key)
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                      {column.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
      <div className="rounded-[10px] w-[1160px] overflow-hidden ">
        <div className="w-full  overflow-x-auto bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
          <div className="px-4 py-6 md:px-6 xl:px-9">
            <h4 className="text-body-2xlg font-bold text-dark dark:text-white">
              {title}
            </h4>
          </div>
          <table className="w-full max-w-full divide-gray-200">
            <thead className="border-y dark:border-dark-3">
              <tr>
                {columns
                  .filter((col) => visibleColumns.includes(col.key))
                  .map((col) => (
                    <th
                      key={col.key}
                      className="px-4 dark:text-dark-6 py-4.5 text-left text-xs font-medium text-nowrap uppercase tracking-wider"
                    >
                      {col.label}
                    </th>
                  ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-gray-200">
              {data.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className="dark:border-dark-3 border dark:bg-[#152030]"
                >
                  {columns
                    .filter((col) => visibleColumns.includes(col.key))
                    .map((col) => (
                      <td key={col.key} className="px-4 py-4">
                        {col.key === "photo" ||
                          (col.key === "thumbnail" && (
                            <div className="h-20 w-25 rounded-md overflow-hidden">
                              <Image
                                src={String(row[col.key])}
                                width={240}
                                height={200}
                                alt="Product"
                                className="object-cover object-center w-full h-full"
                              />
                            </div>
                          ))}
                        {col.key !== "approve" &&
                          col.key !== "photo" &&
                          col.key !== "thumbnail" && (
                            <div className="text-sm font-medium dark:text-dark-6 text-gray-900 w-[200px] line-clamp-2">
                              {row[col.key] ?? ""}
                            </div>
                          )}
                        {col.key === "approve" && (
                          <button className="px-4 py-2  rounded-xl font-bold dark:text-white border bg-blue-500">
                            {row[col.key] === "false" ? "Approve" : "Approved"}
                          </button>
                        )}
                      </td>
                    ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};




export default StaffTable;