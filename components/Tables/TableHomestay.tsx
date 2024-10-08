"use client";
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

import { useEffect, useState } from "react";
import Link from "next/link";
import { api, getData } from "@/utils/axios";
import { format } from "date-fns";
import { useToast } from "../ui/use-toast";
import { useMessage } from "@/store/MessageCotext";

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
  const [visibleColumns, setVisibleColumns] = useState<string[]>(
    columns.map((col) => col.key)
  );

  const handleColumnToggle = (key: string) => {
    setVisibleColumns((prev) =>
      prev.includes(key) ? prev.filter((col) => col !== key) : [...prev, key]
    );
  };
   const { message ,setMessage } = useMessage();

   const { toast } = useToast();

   useEffect(() => {
     if (message) {
       toast({
         title: message?.title,
         description: message?.description,
         status: message?.status,
       });
       setMessage(null);
     }
   }, [message]);


  const handleApprove = async (id : number, des: string) => {
      try {
        await api.put(`/homestays/host/approved/${id}`,null);
         setMessage({
           title: `Approve Homestays`,
           description: `Approve ${des} Successfully`,
           status: "success",
         });
      } catch (error) {
        console.log(error);
        
      }
  }

  return (
    <div className="">
      <div className="flex my-5 items-center justify-between max-w-[1135px]">
        <div>
          {/* <Pagination>
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
          </Pagination> */}
        </div>
        <Popover>
          <PopoverTrigger asChild>
            <div className="px-3 py-2 border rounded-lg bg-blue-500 text-white font-bold flex items-center">
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
              {data?.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className="dark:border-dark-3 border dark:bg-[#152030]"
                >
                  {columns
                    .filter((col) => visibleColumns.includes(col.key))
                    .map((col) => (
                      <td key={col.key} className="px-4 py-4">
                        {col.key === "homestayid" && (
                          <div className="text-sm font-medium dark:text-dark-6 text-gray-900  line-clamp-1">
                            {row[col.key]}
                          </div>
                        )}
                        {col.key === "photos" && (
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
                          col.key !== "photos" &&
                          col.key !== "instant" &&
                          col.key !== "perk" &&
                          col.key !== "homestayid" && (
                            <div className="text-sm font-medium dark:text-dark-6 text-gray-900 w-[200px] line-clamp-2">
                              {row[col.key]}
                            </div>
                          )}
                        {col.key === "instant" && (
                          <button className="px-4 py-2  rounded-xl font-bold dark:text-white border text-white bg-blue-500">
                            {row[col.key] === "false" ? "Yes" : "No"}
                          </button>
                        )}

                        {col.key === "approve" && (
                          <button
                            className="px-4 py-2  rounded-xl font-bold dark:text-white border text-white bg-blue-500"
                            onClick={() =>
                              handleApprove(
                                Number(row[columns[0].key]),
                                String(row[columns[2].key])
                              )
                            }
                          >
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
  { key: "homestayid", label: "ID" },
  { key: "photos", label: "Photo" },
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
  { key: "room", label: "Room" },
  { key: "instant", label: "Instant" },
  { key: "bed", label: "Bed" },
  { key: "bathroom", label: "Bathroom" },
  { key: "approve", label: "Approve" },
];

interface Homestay {
  homestayid: number | null;
  wardName: string; //
  districtName: string; //
  cityProvinceName: string; //
  longitude: number; //
  latitude: number; //
  geom: string | null;
  structureId: number | null; //
  userId: number | null; //
  type: string; //
  title: string; //
  address: string; //
  photos: string[]; //
  description: string; //
  extraInfo: string; //
  cleaningFee: number; //
  isApproved: boolean;
  maxGuest: number; //
  perkIds: number[]; //
  pricePerNight: number; //
  instant: boolean;
  beds: number;
  bathroom: number;
  room: number | null;
  availability: HomestayAvailability[];
}

interface FormattedTourData extends DataRow {
  homestayid: number;
  longitude: number; //
  latitude: number; //
  geom: string;
  structureId: number; //
  userId: number; //
  type: string; //
  title: string; //
  address: string; //
  photos: string; //
  description: string; //
  extraInfo: string; //
  cleaningFee: number; //
  isApproved: string;
  maxGuest: number; //
  perkIds: number; //
  pricePerNight: number; //
  instant: string;
  bed: number;
  bathroom: number;
  room: number;
  owner: string;
  location: string;
  approve: string;

}

const TableHomestay = () => {

   const { message } = useMessage();
  const [homestays, setHomestays] = useState<FormattedTourData[]>();


  const currentDate = format(new Date(), "yyyy-MM-dd");
  
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getData({
          endpoint: "/homestays/admin",
        });

        const formattedData: FormattedTourData[] = response.map(
          (home: Homestay) => ({
            homestayid: home.homestayid,
            location: `${home.wardName} ,${home.districtName}, ${home.cityProvinceName}`,
            structureId: home.structureId,
            userId: home.userId,
            type: home.type,
            title: home.title,
            address: home.address,
            photos: home.photos[0],
            description: home.description,
            extraInfo: home.extraInfo,
            cleaningFee: home.cleaningFee,
            approve: String(home.isApproved),
            maxGuest: home.maxGuest,
            perkIds: home.perkIds,
            pricePerNight: home.availability.find((avail) => {
              return avail.date.startsWith(currentDate);
            })?.pricepernight,
            instant: String(home.instant),
            bed: home.beds,
            bathroom: home.bathroom,
            room: home.room,
          })
        );

        setHomestays(formattedData);
      } catch (error) {
        console.error("Error fetching makes:", error);
      }
    };

    fetchData();
  }, [message]);
  return (
    <>
      <CustomTable columns={columns} data={homestays!} />
    </>
  );
};

export default TableHomestay;
