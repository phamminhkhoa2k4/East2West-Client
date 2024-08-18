import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import Calendar from "./Calendar";
import Guest from "./RoomGuests";
import SelectRecommend from "../flight/SelectRecommend";
import { useState } from "react";

type SearchProps = {
  isScroll: boolean;
};

const SearchTour = ({ isScroll }: SearchProps) => {
    const [fromPlace,setFromPlace] = useState<string | null>("");
    const [toPlace, setToPlace] = useState<string | null>("");
  return (
    <>
      <div
        className={`flex items-center w-5/6 shadow-lg border rounded-lg transition-all duration-1000 ease-in-out ${
          isScroll ? "mb-3" : ""
        }`}
      >
        <div className="flex  w-1/2 h-full">
          <Popover>
            <PopoverTrigger asChild>
              <div className="w-1/2 h-full border-r-2  py-3 px-5">
                <p>Form City</p>
                <h1
                  className={`text-3xl font-bold ${isScroll ? "hidden" : ""}`}
                >
                  {fromPlace || "Can Tho"}
                </h1>
                <p className={`text-sm ${isScroll ? "hidden" : ""}`}>
                  Vietnamese
                </p>
              </div>
            </PopoverTrigger>
            <PopoverContent>
              <SelectRecommend
                placeholder={"To Place ?"}
                change={setFromPlace}
              />
            </PopoverContent>
          </Popover>
          <Popover>
            <PopoverTrigger asChild>
              <div className="w-1/2 h-full border-r-2 py-3 px-5">
                <p>To City/Country/Category</p>
                <h1
                  className={`text-3xl font-bold ${isScroll ? "hidden" : ""}`}
                >
                  {toPlace || "Can Tho"}
                </h1>
              </div>
            </PopoverTrigger>
            <PopoverContent>
              <SelectRecommend placeholder={"To Place ?"} change={setToPlace} />
            </PopoverContent>
          </Popover>
        </div>
        <div className="flex w-1/2 h-full">
          <Popover>
            <PopoverTrigger asChild>
              <div className="w-1/3 h-full border-r-2 py-3 px-5">
                <div className="flex gap-2 items-center">
                  Departure Date
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="size-4"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="m19.5 8.25-7.5 7.5-7.5-7.5"
                      />
                    </svg>
                  </span>
                </div>
                <p
                  className={`text-sm font-extrabold ${
                    isScroll ? "hidden" : ""
                  }`}
                >
                  Select Date
                </p>
              </div>
            </PopoverTrigger>
            <PopoverContent>
              <Calendar />
            </PopoverContent>
          </Popover>
          <Popover>
            <PopoverTrigger asChild>
              <div className="w-1/3 h-full border-r-2 py-3 px-5">
                <div className="flex gap-2 items-center">
                  Room & Guests
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="size-4"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="m19.5 8.25-7.5 7.5-7.5-7.5"
                      />
                    </svg>
                  </span>
                </div>
                <p
                  className={`text-sm font-extrabold ${
                    isScroll ? "hidden" : ""
                  }`}
                >
                  Select Rooms
                </p>
              </div>
            </PopoverTrigger>
            <PopoverContent>
              <Guest />
            </PopoverContent>
          </Popover>
          <Popover>
            <PopoverTrigger asChild>
              <div className="w-1/3 h-full  py-3 px-5">
                <div className="flex gap-2 items-center">
                  Filter{" "}
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="size-4"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z"
                      />
                    </svg>
                  </span>
                </div>
                <p
                  className={`text-sm font-extrabold ${
                    isScroll ? "hidden" : ""
                  }`}
                >
                  Select Filters (optional)
                </p>
              </div>
            </PopoverTrigger>
            <PopoverContent>
              <h1>dsfsadf</h1>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </>
  );
};

export default SearchTour;
