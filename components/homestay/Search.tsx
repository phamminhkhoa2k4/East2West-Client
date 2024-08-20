import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Area from "./Area";
import Guest from "./Guest";
import Calendar from "./Calendar";
import {  useRef, useState } from "react";

type SearchProps = {
  isScroll:boolean
}

export default function Search({isScroll}: SearchProps) {
  const [place, setPlace] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handlePopoverTriggerClick = () => {
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 0);
  };



  
  return (
    <>
      <div
        className={`   ${
          isScroll ? "w-125 mb-5 h-12" : "w-230 h-18 "
        } transition-all duration-500 ease-in-out  border rounded-full bg-white flex shadow-md `}
      >
        <Popover>
          <div className="w-2/6 h-full  rounded-l-full">
            <PopoverTrigger asChild>
              <div
                onClick={handlePopoverTriggerClick}
                className={`flex  flex-col px-8 py-3 ${
                  isScroll ? "" : "border-red-200 border-r-2"
                }  cursor-pointer`}
              >
                <label
                  htmlFor="place"
                  className="text-left  font-bold text-[14px]"
                >
                  {isScroll ? "Any" : ""} Places
                </label>
                <input
                  type="text"
                  placeholder="Find a destination"
                  className={` ${
                    isScroll ? "opacity-0 hidden" : "opacity-100"
                  } transition-all duration-1000 ease-in-out placeholder-gray-600::placeholder bg-transparent outline-none `}
                  value={place}
                  onChange={(e) => setPlace(e.target.value)}
                  ref={inputRef}
                />
              </div>
            </PopoverTrigger>
          </div>
          <PopoverContent>
            <Area />
          </PopoverContent>
        </Popover>
        <Popover>
          <PopoverTrigger>
            <div
              className={`${
                isScroll
                  ? "w-[140px] flex justify-center border-red-200 border-x-2 "
                  : "w-[300px]"
              } transition-all duration-150 ease-in-out flex`}
            >
              <span
                className={`${
                  isScroll ? "visible" : "hidden"
                }  text-left font-bold text-[14px]`}
              >
                Any Week
              </span>
              <div
                className={`${
                  isScroll ? "opacity-0 hidden" : "opacity-100 "
                } w-1/2 h-full`}
              >
                <div className=" flex  flex-col px-8 py-3 border-red-200 border-r-2">
                  <span className="text-left font-bold text-[14px]">
                    Check In
                  </span>
                  <span className="text-left text-gray-600">Add Day</span>
                </div>
              </div>
              <div
                className={`${
                  isScroll ? "opacity-0 hidden" : "opacity-100 "
                } w-1/2 h-full  `}
              >
                <div className=" flex  flex-col px-8 py-3 border-red-200 border-r-2">
                  <span className="text-left font-bold text-[14px]">
                    Check Out
                  </span>
                  <span className="text-left text-gray-600">Add Day</span>
                </div>
              </div>
            </div>
          </PopoverTrigger>
          <PopoverContent>
            <Calendar />
          </PopoverContent>
        </Popover>
        <Popover>
          <div className="w-2/6 h-full  rounded-r-full">
            <PopoverTrigger>
              <div
                className={`flex gap-1 ${
                  isScroll ? "w-[140px] items-center relative h-[47px]" : "w-[300px] py-3"
                }    pl-8 pr-2`}
              >
                <div className={`flex flex-col   w-4/5 ${isScroll ? "" : "h-full"}  `} >
                  <span className="font-bold text-[14px]">
                    {isScroll ? "Add" : ""} Guests
                  </span>
                  <span
                    className={` ${isScroll ? "hidden" : ""} text-gray-600`}
                  >
                    Add Guest
                  </span>
                </div>
                <div
                  className={`flex items-center gap-5 justify-center ${
                    isScroll ? "p-1.5 absolute -right-11" : "w-full"
                  }  bg-slate-400 text-white  rounded-full`}
                >
                  <div>
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
                        d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                      />
                    </svg>
                  </div>
                  <span className={`${isScroll ? "hidden" : ""}`}>Search</span>
                </div>
              </div>
            </PopoverTrigger>
          </div>
          <PopoverContent>
            <Guest />
          </PopoverContent>
        </Popover>
      </div>
    </>
  );
}
