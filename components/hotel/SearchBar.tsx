import { useCallback, useEffect, useState } from "react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Hotel } from "@/types/hotel";
import { getData } from "@/utils/axios";
import CalendarSearch from "./CalendarSearch";

type NumberOfTravelerProps = {
  setAdult: (value: number) => void;
  setChildren: (value: number) => void;
};

const NumberOfTraveler = ({
  setAdult,
  setChildren,

}: NumberOfTravelerProps) => {
  const [countAdult, setCountAdult] = useState<number>(1);
  const [countChildren, SetCountChildren] = useState<number>(0);
  const [countInfant, SetCountInfant] = useState<number>(0);
  const [traveler, setTravelers] = useState<number>(1);

  const memoizedSetAdult = useCallback(
    (count: number) => {
      setAdult(count);
    },
    [setAdult]
  );

  const memoizedSetChildren = useCallback(
    (count: number) => {
      setChildren(count);
    },
    [setChildren]
  );

 
  useEffect(() => {
    setTravelers(countAdult + countChildren + countInfant);
    memoizedSetAdult(countAdult);
    memoizedSetChildren(countChildren);
  }, [
    countAdult,
    countChildren,
    countInfant,
    memoizedSetAdult,
    memoizedSetChildren,
  ]);
  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <button className="flex gap-2 items-center p-2 px-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="size-5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
              />
            </svg>
            <span>{traveler}</span>
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
          </button>
        </PopoverTrigger>
        <PopoverContent>
          <div className="bg-white py-4 px-10 rounded-2xl shadow-md mt-2">
            <div className="flex items-center w-100 justify-between py-6 border-b-2">
              <div>
                <h3 className="font-bold text-lg">Adult</h3>
                <span>13 years and older</span>
              </div>
              <div className="flex  items-center gap-3">
                <button
                  className="border rounded-full p-2"
                  onClick={() =>
                    setCountAdult((prev) => (prev > 0 ? prev - 1 : prev))
                  }
                >
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
                      d="M5 12h14"
                    />
                  </svg>
                </button>
                <span>{countAdult}</span>
                <button
                  className="border rounded-full p-2"
                  onClick={() => setCountAdult((prev) => prev + 1)}
                >
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
                      d="M12 4.5v15m7.5-7.5h-15"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div className="flex items-center w-100 justify-between py-6">
              <div>
                <h3 className="font-bold text-lg">Children</h3>
                <span>Ages 2 to 12</span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  className="border rounded-full p-2"
                  onClick={() => {
                    SetCountChildren((prev) => (prev > 0 ? prev - 1 : prev));
                  }}
                >
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
                      d="M5 12h14"
                    />
                  </svg>
                </button>
                <span>{countChildren}</span>
                <button
                  className="border rounded-full p-2"
                  onClick={() => {
                    SetCountChildren((prev) => prev + 1);
                  }}
                >
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
                      d="M12 4.5v15m7.5-7.5h-15"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
};

type SearchBarType = {
  setHotel : (value : Hotel) => void;

};

export const SearchBar = ({ setHotel }: SearchBarType) => {
  const [input,setInput] = useState<string>();
  const [dateStart, setDateStart] = useState<string | null>("");
  const [dateReturn, setDateReturn] = useState<string | null>("");
  const [countAdult, setCountAdult] = useState<number>(0);
  const [countChildren, SetCountChildren] = useState<number>(0);
  const [load,setLoad] = useState<boolean>(false);

  function convertDate(date: string): string {
    const [day, month, year] = date.split("/");

    return `${year}-${month}-${day}`;
  }

  const handleSearch = async () => {
    try{
      setLoad(true)
      const response = await getData({
        endpoint: `/searchHotels?query=${input}&checkInDate=${convertDate(
          dateStart!
        )}&checkOutDate=${convertDate(dateReturn!)}&adults=${countAdult}`,
      });
      setHotel(response);
    }catch(error){
      console.log(error);
      
    }finally{
      setLoad(false);
    }
  }
  return (
    <div className="flex gap-5 relative">
      <div className="relative">
        <span className="absolute top-[18px] left-3">
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
        </span>
        <input
          placeholder="Type to search..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="border-2 p-4 pl-12 w-[590px] rounded-lg"
          type="search"
        />
      </div>
      <div className="flex">
        <Popover>
          <PopoverTrigger asChild>
            <div className="relative">
              <label htmlFor="" className="absolute top-[18px] left-4">
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
                    d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
                  />
                </svg>
              </label>
              <div className="border-2 rounded-l-lg">
                <input
                  type="text"
                  placeholder="Start"
                  className="p-4 pl-12 w-[330px] outline-none"
                  value={dateStart!}
                />
              </div>
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <CalendarSearch
              dateReturn={dateReturn!}
              dateStart={dateStart!}
              setDateReturn={setDateReturn}
              setDateStart={setDateStart}
            />
          </PopoverContent>
        </Popover>
        <Popover>
          <PopoverTrigger asChild>
            <div className="relative">
              <label htmlFor="" className="absolute top-[18px] left-4">
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
                    d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
                  />
                </svg>
              </label>
              <div className="border-2 rounded-r-lg">
                <input
                  type="text"
                  placeholder="Return"
                  className="p-4 pl-12 w-[330px] outline-none"
                  value={dateReturn!}
                />
              </div>
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <CalendarSearch
              dateReturn={dateReturn!}
              dateStart={dateStart!}
              setDateReturn={setDateReturn}
              setDateStart={setDateStart}
            />
          </PopoverContent>
        </Popover>
      </div>
      <div className="flex items-center  border-2 rounded-lg">
        <NumberOfTraveler
          setAdult={setCountAdult}
          setChildren={SetCountChildren}
        />
      </div>

      <button
        onClick={handleSearch}
        className=" absolute top-20 z-29 right-[45%] left-[45%]   bg-blue-500 rounded-2xl border text-white py-2.5 px-5 mr-2 text-sm font-bold  border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-blue-700 focus:text-blue-700 flex justify-center items-center"
      >
        {load && (
          <svg
            aria-hidden="true"
            role="status"
            className="inline mr-2 w-4 h-4 text-gray-200 animate-spin dark:text-gray-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            ></path>
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="#1C64F2"
            ></path>
          </svg>
        )}

        {load ? "Loading..." : "Search"}
      </button>
    </div>
  );
};
