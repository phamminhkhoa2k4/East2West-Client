import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Area from "./Area";
import Guest from "./Guest";
import Calendar from "./Calendar";


export default function Search() {
  return (
    <>
      <div className="h-18 w-230 border rounded-full absolute bg-white top-5 flex shadow-md">
        <Popover>
          <div className="w-2/6 h-full  rounded-l-full">
            <PopoverTrigger>
              <div className=" flex  flex-col px-8 py-3 border-red-200 border-r-2">
                <label
                  htmlFor="place"
                  className="text-left  font-bold text-[14px]"
                >
                  Places
                </label>
                <input
                  type="text"
                  placeholder="Find a destination"
                  className="placeholder-gray-600::placeholder bg-transparent outline-none"
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
            <div className="w-[300px] flex">
              <div className="w-1/2 h-full ">
                <div className=" flex  flex-col px-8 py-3 border-red-200 border-r-2">
                  <span className="text-left font-bold text-[14px]">
                    Check In
                  </span>
                  <span className="text-left text-gray-600">Add Day</span>
                </div>
              </div>
              <div className="w-1/2 h-full ">
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
              <div className=" flex gap-1 w-[300px]  py-3 pl-8 pr-2 ">
                <div className="flex flex-col  w-4/5  h-full ">
                  <span className="font-bold text-[14px]">Guests</span>
                  <span className="text-gray-600">Add Guest</span>
                </div>
                <div className="flex items-center gap-5 justify-center w-full bg-slate-400 text-white  rounded-full">
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
                  <span>Search</span>
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
