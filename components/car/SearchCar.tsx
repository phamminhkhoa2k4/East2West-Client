import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import SelectRecommend from "../flight/SelectRecommend";
import { useState } from "react";
type SearchProps = {
  isScroll: boolean;
};

const SearchCar = ({ isScroll }: SearchProps) => {
  const [fromPlace, setFromPlace] = useState<string | null>("");
  const [toPlace, setToPlace] = useState<string | null>("");
  return (
    <>
      <div
        className={`flex items-center border w-4/5 shadow-lg rounded-lg transition-all duration-1000 ease-in-out ${
          isScroll ? "mb-3" : ""
        }`}
      >
        <div className="flex  w-2/5 h-full">
          <div className="w-full h-full border-r-2 py-3 px-5">
            <div className="relative w-full h-full ">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                className="block w-full p-4 ps-10 text-sm  outline-none"
                placeholder="Search Mockups, Logos..."
                required
              />
            </div>
          </div>
        </div>
        <div className="flex w-3/5 h-full">
          <div className="flex w-1/2">
            <Popover>
              <PopoverTrigger asChild>
                <div className=" flex gap-3 w-3/5 h-full border-r-2 py-3 px-5">
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
                      />
                    </svg>
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="text-sm">Pick-Up Date</p>
                    <h3 className="font-medium text-base">12/34/3224</h3>
                  </div>
                </div>
              </PopoverTrigger>
              <PopoverContent></PopoverContent>
            </Popover>
            <Popover>
              <PopoverTrigger asChild>
                <div className="flex gap-3 w-2/5 h-full border-r-2 py-3 px-5">
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="text-sm">Time</p>
                    <h3 className="font-medium text-base">12:00</h3>
                  </div>
                </div>
              </PopoverTrigger>
              <PopoverContent></PopoverContent>
            </Popover>
          </div>
          <div className="flex w-1/2">
            <Popover>
              <PopoverTrigger asChild>
                <div className=" flex gap-3 w-3/5 h-full border-r-2 py-3 px-5">
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
                      />
                    </svg>
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="text-sm">Drop-Off Date</p>
                    <h3 className="font-medium text-base">12/34/3224</h3>
                  </div>
                </div>
              </PopoverTrigger>
              <PopoverContent>
                <h1>dsfsadf</h1>
              </PopoverContent>
            </Popover>
            <Popover>
              <PopoverTrigger asChild>
                <div className="flex gap-3 w-2/5 h-full  py-3 px-5">
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="text-sm">Time</p>
                    <h3 className="font-medium text-base">12:00</h3>
                  </div>
                </div>
              </PopoverTrigger>
              <PopoverContent>
                <h1>dsfsadf</h1>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchCar;
