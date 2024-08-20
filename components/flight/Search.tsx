"use client"
import { useCallback, useEffect, useState } from "react";
import { format } from "date-fns"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import SelectRecommend from "./SelectRecommend";
import { Calendar } from "@/components/ui/calendar";

type SelectProps = {
  value: string;
  onValueChange: (value: string) => void;
};

type NumberOfTravelerProps = {
  setAdult: (value: number) => void;
  setChildren: (value: number) => void;
  setInfant: (value: number) => void;
};

function SelectWay({ value, onValueChange }: SelectProps) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue>
          <div className="flex items-center gap-4">
            <div>
              {value === "round-trip" && (
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
                    d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
                  />
                </svg>
              )}
              {value === "one-way" && (
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
                    d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
                  />
                </svg>
              )}
              {value === "multi-stage" && (
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
                    d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3"
                  />
                </svg>
              )}
            </div>
            {value === "round-trip" && <span>Round Trip</span>}
            {value === "one-way" && <span>One Way</span>}
            {value === "multi-stage" && <span>Multiple Stage</span>}
          </div>
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Choose Way</SelectLabel>
          <SelectItem value="round-trip">
            <div className="flex items-center gap-4">
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
                    d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
                  />
                </svg>
              </div>
              <span>Round Trip</span>
            </div>
          </SelectItem>
          <SelectItem value="one-way">
            <div className="flex items-center gap-4">
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
                    d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
                  />
                </svg>
              </div>
              <span>One Way</span>
            </div>
          </SelectItem>
          <SelectItem value="multi-stage">
            <div className="flex items-center gap-4">
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
                    d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3"
                  />
                </svg>
              </div>
              <span>Multiple Stage</span>
            </div>
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
function SelectClass({ value, onValueChange }: SelectProps) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue>
          <div>
            {value === "economy-class" && <span>Economy Class</span>}
            {value === "special-popular" && <span>Special Popular</span>}
            {value === "business-class" && <span>Business Class</span>}
            {value === "first-class" && <span>First Class</span>}
          </div>
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Choose Class</SelectLabel>
          <SelectItem value="economy-class">
            <div className="flex items-center gap-4">
              <span>Economy Class</span>
            </div>
          </SelectItem>
          <SelectItem value="special-popular">
            <div className="flex items-center gap-4">
              <span>Special Popular</span>
            </div>
          </SelectItem>
          <SelectItem value="business-class">
            <div className="flex items-center gap-4">
              <span>Business Class</span>
            </div>
          </SelectItem>
          <SelectItem value="first-class">
            <div className="flex items-center gap-4">
              <span>First Class</span>
            </div>
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}


const NumberOfTraveler = ({
  setAdult,
  setChildren,
  setInfant,
}: NumberOfTravelerProps) => {
  const [countAdult, setCountAdult] = useState<number>(1);
  const [countChildren, SetCountChildren] = useState<number>(0);
  const [countInfant, SetCountInfant] = useState<number>(0);
  const [traveler,setTravelers] = useState<number>(1);

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
          <div className="bg-white py-4 px-10 rounded-2xl shadow-md">
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

export default function Search() {
    const [way,setWay] = useState<string>("round-trip");
    const [classes,setClasses] = useState<string>("economy-class");
    const [countAdult, setCountAdult] = useState<number>(0);
    const [countChildren, SetCountChildren] = useState<number>(0);
    const [countInfant, SetCountInfant] = useState<number>(0);
    const [dateStart, setDateStart] = useState<Date>();
    const [dateReturn, setDateReturn] = useState<Date>();
    const [departure, setDeparture] = useState<string | null>(null);
    const [destination, setDestination] = useState<string | null>(null);
    

    
  return (
    <>
      <div className="flex justify-center my-10">
        <div className="flex gap-5 items-end p-6 pb-14 border justify-center w-[1250px] rounded-lg relative">
          <div className="flex flex-col">
            <div className="flex mb-2">
              <div>
                <SelectWay value={way} onValueChange={setWay} />
              </div>
              <div>
                <NumberOfTraveler
                  setAdult={setCountAdult}
                  setChildren={SetCountChildren}
                  setInfant={SetCountInfant}
                />
              </div>
              <div>
                <SelectClass value={classes} onValueChange={setClasses} />
              </div>
            </div>
            <div className="flex gap-2 relative">
              <Popover>
                <PopoverTrigger asChild>
                  <div className="relative">
                    <span className="absolute top-[18px] left-4">
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
                          d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                      </svg>
                    </span>
                    <div className="border-2">
                      <input
                      value={departure || ""}
                        type="text"
                        placeholder="Departure ?"
                        className="p-4 pl-12 outline-none"
                      />
                    </div>
                  </div>
                </PopoverTrigger>

                <PopoverContent>
                  <SelectRecommend
                    placeholder={"Departure ?"}
                    change={setDeparture}
                  />
                </PopoverContent>
              </Popover>
              <div>
                <button className="border-2 rounded-full p-1 absolute top-3 left-[270px] z-9 bg-white">
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
                      d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
                    />
                  </svg>
                </button>
              </div>
              <Popover>
                <PopoverTrigger asChild>
                  <div className="relative">
                    <span className="absolute top-[18px] left-4">
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
                          d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                        />
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                        />
                      </svg>
                    </span>
                    <div className="border-2">
                      <input
                        value={destination || ""}
                        type="text"
                        placeholder="Destination ?"
                        className="p-4 pl-12 outline-none"
                      />
                    </div>
                  </div>
                </PopoverTrigger>
                <PopoverContent>
                  <SelectRecommend
                    placeholder={"Destination ?"}
                    change={setDestination}
                  />
                </PopoverContent>
              </Popover>
            </div>
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
                  <div className="border-2">
                    <input
                      type="text"
                      placeholder="Start"
                      className={
                        way === "round-trip"
                          ? "p-4 pl-12 outline-none"
                          : "p-4 w-[560px] pl-12 outline-none"
                      }
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
            {way === "round-trip" && (
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
                    <div className="border-2">
                      <input
                        type="text"
                        placeholder="Return"
                        className="p-4 pl-12 outline-none"
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
            )}
          </div>
          <button className="absolute p-4 flex gap-2 bg-slate-500 rounded-full top-40">
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
            <span>Discovery</span>
          </button>
        </div>
      </div>
    </>
  );
}
