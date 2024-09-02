import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Image from "next/image";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CiCalendar, CiUser } from "react-icons/ci";

const RentalStaff = () => {
  return (
    <>
      <DefaultLayout>
        <div className="mx-auto w-full max-w-[1080px]">
          <Breadcrumb pageName="Staff" />

          <div>
            <div className="flex flex-col gap-9">
              <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
                <div className="border-b border-stroke px-6.5 py-4 dark:border-dark-3">
                  <h3 className="font-semibold text-dark dark:text-white">
                    Booking Via Staff
                  </h3>
                </div>
                <div className="flex items-center gap-5 mx-5 mt-5">
                  <div className="flex items-center gap-10  p-4  border border-gray-300 rounded-2xl overflow-hidden w-3/5">
                    <div className="h-35 rounded-lg overflow-hidden ">
                      <Image
                        src={"/boat.png"}
                        alt=""
                        height={300}
                        width={300}
                        className="object-cover object-center w-full h-full"
                      />
                    </div>
                    <div className="flex flex-col gap-1 ">
                      <span className="border rounded-md border-blue-600 text-blue-600 px-[5px] py-[3px] text-xs w-12">
                        5N/6D
                      </span>
                      <div className="text-base font-extrabold">
                        Spectacular Krabi ang Phuket Gateway
                      </div>
                      <div className="flex items-baseline space-x-2">
                        <span className="text-base line-through text-gray-500">
                          $115
                        </span>
                        <span className="text-base">$ 100</span>
                        <span className="text-gray-500">/ Person</span>
                      </div>
                      <div className="flex items-center gap-1 mt-1 mb-2">
                        <span className="text-sm">2N Hanoi</span>
                        <span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            className="size-3"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                            />
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M9 9.563C9 9.252 9.252 9 9.563 9h4.874c.311 0 .563.252.563.563v4.874c0 .311-.252.563-.563.563H9.564A.562.562 0 0 1 9 14.437V9.564Z"
                            />
                          </svg>
                        </span>
                        <span className="text-sm">2N HoChiMinh</span>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 p-[19px] border  border-gray-300 rounded-lg w-2/5">
                    {/* <Popover open={open} onOpenChange={setOpen}> */}
                    <Popover>
                      <PopoverTrigger asChild>
                        <div className="flex gap-1 flex-col space-y-1">
                          <label
                            className="text-xs font-bold uppercase"
                            htmlFor="check-in"
                          >
                            Pick-Up
                          </label>
                          <button
                            id="check-in"
                            className="w-full items-center gap-1 p-2 text-left bg-white border border-gray-300 rounded-lg text-sm flex"
                          >
                            <CiCalendar className="h-5 w-5" />
                          </button>
                        </div>
                      </PopoverTrigger>
                      <PopoverContent>
                        {/* <Calendar
                        setCheckOutDate={setCheckOutDate}
                        setCheckInDate={setCheckInDate}
                        checkInDate={checkInDate}
                        checkOutDate={checkOutDate}
                      /> */}
                      </PopoverContent>
                    </Popover>
                    <Popover>
                      <PopoverTrigger asChild>
                        <div className="flex gap-1 flex-col space-y-1">
                          <label
                            className="text-xs font-bold uppercase"
                            htmlFor="check-out"
                          >
                            Time
                          </label>
                          <button
                            id="check-out"
                            className="w-full gap-1  p-2 text-left bg-white border border-gray-300 rounded-lg text-sm flex"
                          >
                            <CiCalendar className="h-5 w-5" />
                          </button>
                        </div>
                      </PopoverTrigger>
                      <PopoverContent>
                        {/* <Calendar
                        setCheckOutDate={setCheckOutDate}
                        setCheckInDate={setCheckInDate}
                        checkInDate={checkInDate}
                        checkOutDate={checkOutDate}
                      /> */}
                      </PopoverContent>
                    </Popover>
                    <Popover>
                      <PopoverTrigger asChild>
                        <div className="flex gap-1 flex-col space-y-1">
                          <label
                            className="text-xs font-bold uppercase"
                            htmlFor="check-in"
                          >
                            Pick-Up
                          </label>
                          <button
                            id="check-in"
                            className="w-full items-center gap-1 p-2 text-left bg-white border border-gray-300 rounded-lg text-sm flex"
                          >
                            <CiCalendar className="h-5 w-5" />
                          </button>
                        </div>
                      </PopoverTrigger>
                      <PopoverContent>
                        {/* <Calendar
                        setCheckOutDate={setCheckOutDate}
                        setCheckInDate={setCheckInDate}
                        checkInDate={checkInDate}
                        checkOutDate={checkOutDate}
                      /> */}
                      </PopoverContent>
                    </Popover>
                    <Popover>
                      <PopoverTrigger asChild>
                        <div className="flex gap-1 flex-col space-y-1">
                          <label
                            className="text-xs font-bold uppercase"
                            htmlFor="check-out"
                          >
                            Time
                          </label>
                          <button
                            id="check-out"
                            className="w-full gap-1  p-2 text-left bg-white border border-gray-300 rounded-lg text-sm flex"
                          >
                            <CiCalendar className="h-5 w-5" />
                          </button>
                        </div>
                      </PopoverTrigger>
                      <PopoverContent>
                        {/* <Calendar
                        setCheckOutDate={setCheckOutDate}
                        setCheckInDate={setCheckInDate}
                        checkInDate={checkInDate}
                        checkOutDate={checkOutDate}
                      /> */}
                      </PopoverContent>
                    </Popover>
                  
                  </div>
                </div>
                <div className="border border-gray-300 rounded-2xl mx-5 mt-5 p-4 px-6">
                  <div className="flex flex-col space-y-3">
                    <div className="flex justify-between">
                      <span>$ 213123 x 12312 Day</span>
                      <span>$ 312312</span>
                    </div>
                    <hr />
                    <div className="flex justify-between font-bold">
                      <span>Total</span>
                      <span>$ 1234</span>
                    </div>
                  </div>
                </div>
                <div className="m-5">
                  <button className="w-full rounded-md bg-primary py-2.5 text-center text-base font-medium text-white shadow-md transition hover:bg-opacity-80">
                    Rental
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DefaultLayout>
    </>
  );
};

export default RentalStaff;
