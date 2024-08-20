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

import { useState} from 'react';
import Link from "next/link";

interface Column {
  key: string;
  label: string;
  isNumeric?: boolean;
}

interface DataRow {
  [key: string]: string | number | string[];
}


interface CustomTableProps {
  columns: Column[];
  data: DataRow[];
}

const CustomTable: React.FC<CustomTableProps> = ({ columns, data }) => {
  const [visibleColumns, setVisibleColumns] = useState<string[]>(columns.map(col => col.key));




  const handleColumnToggle = (key: string) => {
    setVisibleColumns((prev) =>
      prev.includes(key) ? prev.filter((col) => col !== key) : [...prev, key]
    );
  };





  return (
    <div className="">
      <div className="flex my-5 items-center justify-between max-w-[1135px]">
        <Link href={"/dashboard/manage/homestays/add"}  className="px-7 py-3 rounded-full bg-blue-500 text-white font-bold">Add New</Link>
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
              Homestays
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
                        {col.key === "photo" && (
                          <div className="h-20 w-25 rounded-md overflow-hidden">
                            <Image
                              src={String(row[col.key])}
                              width={240}
                              height={200}
                              alt="Product"
                              className="object-cover object-center w-full h-full"
                            />
                          </div>
                        )}
                        {col.key !== "approve" &&
                          col.key !== "photo" &&
                          col.key !== "perk" && (
                            <div className="text-sm font-medium dark:text-dark-6 text-gray-900 w-[200px] line-clamp-2">
                              {row[col.key]}
                            </div>
                          )}
                        {col.key === "approve" && (
                          <button className="px-4 py-2  rounded-xl font-bold dark:text-white border bg-blue-500">
                            {row[col.key] === "false" ? "Approve" : "Approved"}
                          </button>
                        )}
                        <div className="flex flex-row gap-1 items-center">
                          {col.key === "perk" && Array.isArray(row[col.key])
                            ? (row[col.key] as string[]).map(
                                (element, index) => (
                                  <div
                                    className="px-4 py-1 border-2 border-black text-base font-semibold  rounded-2xl"
                                    key={index}
                                  >
                                    {element}
                                  </div>
                                )
                              )
                            : null}
                        </div>
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



const columns = [
  { key: "photo", label: "Photo" },
  { key: "title", label: "Title" },
  { key: "owner", label: "Owner" },
  { key: "type", label: "Type" },
  { key: "location", label: "Location" },
  { key: "perk", label: "Perk" },
  { key: "maxGuest", label: "Max Guest", isNumeric: true },
  { key: "cleaningFee", label: "Cleaning Fee", isNumeric: true },
  { key: "extraInfo", label: "Extra Information" },
  { key: "description", label: "Description" },
  { key: "pricePerNight", label: "Price Per Night" },
  { key: "status", label: "Status" },
  { key: "date", label: "Date" },
  { key: "approve", label: "Approve" },
];

const data = [
  {
    photo: "/boat.png",
    title: "Apple Watch Series 7 pham minh khoa dda dvsd dcs cdvsd ",
    owner: "Wisdom",
    type: "Cabin",
    perk: ["wifi","path"],
    location: "1234 Elm Street, Springfield, IL, 62704",
    maxGuest: 12,
    cleaningFee: 300,
    extraInfo: "john@example.com",
    description: "Company A",
    pricePerNight: "Manager",
    status: "Sales",
    date: 60000,
    approve: "false",
  },
];






const TableHomestay = () => {
  return (
    <>
      <CustomTable columns={columns} data={data} />
    </>
  );
};

export default TableHomestay;
