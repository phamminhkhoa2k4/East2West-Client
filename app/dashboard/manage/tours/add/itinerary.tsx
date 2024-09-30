import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { IoIosClose } from "react-icons/io";
import { useState } from "react";
import Day from "./Day";

interface Accommodation {
  accommodationid: number;
  accommodationname: string;
  durationaccommodation: string;
  accommodationtype: string;
}

interface Meal {
  mealid: number;
  mealname: string;
  mealthumbnail: string;
  mealduration: string;
  mealactivity: string;
}

interface Place {
  placeid: number;
  placename: string;
  placethumbnail: string;
  description: string;
  placeduration: string;
}

interface Transfer {
  transferid: number;
  transfername: string;
  transferthumbnail: string;
  description: string;
  transferduration: string;
}

type ItineraryType = {
  handleCreate: (value: void) => void;
  setMeals: (value: Meal) => void;
  setAccommodation: (value: Accommodation) => void;
  setPlaces: (value: Place) => void;
  setTransfers: (value: Transfer) => void;
  meals: Meal;
  accommodation: Accommodation;
  places: Place;
  transfers: Transfer;
  setIsOpenMeals: (value: boolean) => void;
  setIsOpenAccommodation: (value: boolean) => void;
  setIsOpenPlaces: (value: boolean) => void;
  setIsOpenTransfer: (value: boolean) => void;
  isOpenMeals: boolean;
  isOpenAccommodation: boolean;
  isOpenPlaces: boolean;
  isOpenTransfers: boolean;
  days: number[];
  setDays: (value: number[]) => void;
};

const Itinerary = ({
  handleCreate,
  days,
  setDays,
  isOpenAccommodation,
  isOpenMeals,
  isOpenPlaces,
  isOpenTransfers,
  accommodation,
  meals,
  places,
  setAccommodation,
  setIsOpenAccommodation,
  setIsOpenMeals,
  setIsOpenPlaces,
  setIsOpenTransfer,
  setMeals,
  setPlaces,
  setTransfers,
  transfers,
}: ItineraryType) => {
  const addDay = () => {
    setDays(days.length < 18 ? [...days, days.length + 1] : [...days]);
  };
  return (
    <div className="">
      <div className="flex flex-col gap-9">
        <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
          <div className="border-b border-stroke px-6.5 py-4 dark:border-dark-3">
            <h3 className="font-semibold text-dark dark:text-white">
              Create Itinerary
            </h3>
          </div>
          <div className="p-6.5">
            <div className="flex items-center gap-5">
              <button
                className="flex gap-3 border rounded-lg px-6 py-3 text-nowrap"
                onClick={addDay}
              >
                <span>
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
                </span>
                Add Day
              </button>
              <ol className="flex items-center w-full">
                {days.length == 1 && (
                  <li className="  flex items-center w-full  text-blue-600 dark:text-blue-500 after:border-blue-100  dark:after:border-blue-800">
                    <span className="flex items-center font-bold text-white justify-center w-10 h-10 bg-blue-400 rounded-full  dark:bg-blue-800 shrink-0">
                      1
                    </span>
                  </li>
                )}
                {days.length > 1 &&
                  days.map((day, index) => (
                    <>
                      {index != days.length - 1 && (
                        <li className="group relative flex  items-center text-blue-600 dark:text-blue-500 after:content-[''] after:w-3 after:h-1 after:border-b after:border-blue-100 after:border-4 after:inline-block dark:after:border-blue-800">
                          <span className="flex items-center font-bold text-white justify-center w-10 h-10 bg-blue-400 rounded-full  dark:bg-blue-800 shrink-0">
                            {day}
                          </span>
                          <div className="absolute -top-10 left-[3px]  rounded-full p-2 bg-red-400 text-white text-center  opacity-0 group-hover:opacity-100 transition-opacity">
                            <IoIosClose className="h-5 w-5" />
                          </div>
                        </li>
                      )}

                      {index == days.length - 1 && (
                        <li className="group relative flex items-center w-full  text-blue-600 dark:text-blue-500 after:border-blue-100  dark:after:border-blue-800">
                          <span className="flex items-center font-bold text-white justify-center w-10 h-10 bg-blue-400 rounded-full  dark:bg-blue-800 shrink-0">
                            {day}
                          </span>
                          <div className="absolute -top-10 left-[3px]  rounded-full p-2 bg-red-400 text-white text-center  opacity-0 group-hover:opacity-100 transition-opacity">
                            <IoIosClose className="h-5 w-5" />
                          </div>
                        </li>
                      )}
                    </>
                  ))}
              </ol>
            </div>
            <div className="flex flex-col gap-10">
              {days.map((day) => (
                <Day
                  key={day}
                  day={day}
                  isOpenTransfers={isOpenTransfers}
                  isOpenPlaces={isOpenPlaces}
                  isOpenAccommodation={isOpenAccommodation}
                  isOpenMeals={isOpenMeals}
                  setIsOpenTransfer={setIsOpenTransfer}
                  setIsOpenPlaces={setIsOpenPlaces}
                  setIsOpenAccommodation={setIsOpenAccommodation}
                  setIsOpenMeals={setIsOpenMeals}
                  transfers={transfers!}
                  places={places!}
                  accommodation={accommodation!}
                  meals={meals!}
                  setTransfers={setTransfers}
                  setPlaces={setPlaces}
                  setAccommodation={setAccommodation}
                  setMeals={setMeals}
                />
              ))}
            </div>
            <div className="mb-6"></div>
            <button
              className="flex w-full justify-center rounded-[7px] bg-primary p-[13px] font-medium text-white hover:bg-opacity-90"
              onClick={() => handleCreate()}
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Itinerary;
