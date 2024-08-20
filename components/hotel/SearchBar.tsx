import { useCallback, useEffect, useState } from "react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

type NumberOfTravelerProps = {
  setAdult: (value: number) => void;
  setChildren: (value: number) => void;
  setInfant: (value: number) => void;
};

const NumberOfTraveler = ({
  setAdult,
  setChildren,
  setInfant,
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

  const memoizedSetInfant = useCallback(
    (count: number) => {
      setInfant(count);
    },
    [setInfant]
  );

  useEffect(() => {
    setTravelers(countAdult + countChildren + countInfant);
    memoizedSetAdult(countAdult);
    memoizedSetChildren(countChildren);
    memoizedSetInfant(countInfant);
  }, [
    countAdult,
    countChildren,
    countInfant,
    memoizedSetAdult,
    memoizedSetChildren,
    memoizedSetInfant,
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
            <div className="flex items-center w-100 justify-between py-6 border-b-2">
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
            <div className="flex items-center w-100 justify-between py-6 ">
              <div>
                <h3 className="font-bold text-lg">Infant</h3>
                <span>Under 2 years old</span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  className="border rounded-full p-2"
                  onClick={() => {
                    SetCountInfant((prev) => (prev > 0 ? prev - 1 : prev));
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
                <span>{countInfant}</span>
                <button
                  className="border rounded-full p-2"
                  onClick={() => {
                    SetCountInfant((prev) => prev + 1);
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

export const  SearchBar = ({ setResults }: any) => {
  const [input, setInput] = useState("");
  const [dateStart, setDateStart] = useState<Date>();
  const [dateReturn, setDateReturn] = useState<Date>();
  const [countAdult, setCountAdult] = useState<number>(0);
  const [countChildren, SetCountChildren] = useState<number>(0);
  const [countInfant, SetCountInfant] = useState<number>(0);
  const fetchData = (value: any) => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((json) => {
        const results = json.filter((user: any) => {
          return (
            value &&
            user &&
            user.name &&
            user.name.toLowerCase().includes(value)
          );
        });
        setResults(results);
      });
  };

  const handleChange = (value: any) => {
    setInput(value);
    fetchData(value);
  };

  return (
    <div className="flex gap-5">
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
          onChange={(e) => handleChange(e.target.value)}
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
                  value={dateStart ? format(dateStart, "PPP") : ""}
                />
              </div>
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={dateStart}
              onSelect={setDateStart}
              initialFocus
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
                  value={dateReturn ? format(dateReturn, "PPP") : ""}
                />
              </div>
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={dateReturn}
              onSelect={setDateReturn}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
      <div className="flex items-center  border-2 rounded-lg">
        <NumberOfTraveler
          setAdult={setCountAdult}
          setChildren={SetCountChildren}
          setInfant={SetCountInfant}
        />
      </div>
    </div>
  );
};
