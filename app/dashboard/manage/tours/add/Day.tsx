import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import CardItinerary from "@/components/tour/CardItinerary";
import { useState } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import TransferInfo from "@/components/tour/TransferInfo";
import { FaRegStar, FaStar } from "react-icons/fa6";
import { FaStarHalfAlt } from "react-icons/fa";
import { GiForkKnifeSpoon } from "react-icons/gi";
const frameworks = [
  {
    value: "next.js",
    label: "Next.js",
  },
  // {
  //   value: "sveltekit",
  //   label: "SvelteKit",
  // },
  // {
  //   value: "nuxt.js",
  //   label: "Nuxt.js",
  // },
  // {
  //   value: "remix",
  //   label: "Remix",
  // },
  // {
  //   value: "astro",
  //   label: "Astro",
  // },
];
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

type DayType = {
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
  day: number;
};
const Day = ({
  accommodation,
  meals,
  places,
  transfers,
  setAccommodation,
  setMeals,
  setPlaces,
  setTransfers,
  isOpenAccommodation,
  isOpenMeals,
  isOpenPlaces,
  isOpenTransfers,
  setIsOpenAccommodation,
  setIsOpenMeals,
  setIsOpenPlaces,
  setIsOpenTransfer,
  day}: DayType) => {
    const [isExpanded, setIsExpanded] = useState<boolean>(false);

    const toggleExpansion = () => {
      setIsExpanded(!isExpanded);
    };
  return (
    <div className="flex flex-col p-6 border rounded-xl mt-5">
      <div className="mb-5">Day {day}</div>
      <div className="flex gap-3">
        <Popover open={isOpenTransfers} onOpenChange={setIsOpenTransfer}>
          <PopoverTrigger asChild>
            <button className="flex gap-3 border rounded-lg px-6 py-3">
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
              Add Transfers
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Command>
              <CommandInput placeholder="Search framework..." />
              <CommandList>
                <CommandEmpty>No framework found.</CommandEmpty>
                <CommandGroup>
                  {frameworks.map((framework) => (
                    <CommandItem
                      key={framework.value}
                   
                    >
               
                      <div className="h-30 p-4 border rounded-lg flex items-center gap-5">
                        <div className="w-50 h-25 overflow-hidden rounded-lg">
                          <Image
                            src={"/boat.png"}
                            alt=""
                            height={400}
                            width={400}
                            className="object-center object-position w-full h-full"
                          />
                        </div>
                        <div>
                          <div className="flex flex-col gap-2">
                            <div className="font-bold text-base">
                              Private Transfer
                            </div>
                            <div className="w-125">
                              <p
                                className={`overflow-hidden text-ellipsis ${
                                  isExpanded
                                    ? "whitespace-normal"
                                    : "line-clamp-2"
                                }`}
                              >
                                Travel comfortably in a private vehicle from
                                Dabolim airport to North Goa hotel. Note: The
                                pick-up timing is subject to your flight/train
                                arrival and shall be communicated to you by the
                                local vendor. There will be non stop-overs
                                allowed during this transfer.
                              </p>
                            </div>
                            <div className="flex gap-1 items-center ">
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
                                    d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                  />
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                                  />
                                </svg>
                              </span>
                              <p>Ninh Kieu, Can Tho</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        <Popover open={isOpenPlaces} onOpenChange={setIsOpenPlaces}>
          <PopoverTrigger asChild>
            <button className="flex gap-3 border rounded-lg px-6 py-3">
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
              Add Places
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Command>
              <CommandInput placeholder="Search framework..." />
              <CommandList>
                <CommandEmpty>No framework found.</CommandEmpty>
                <CommandGroup>
                  {frameworks.map((framework) => (
                    <CommandItem
                      key={framework.value}
                    >

                      <div className="h-30 p-4 border rounded-lg flex items-center gap-5">
                        <div className="w-50 h-25 overflow-hidden rounded-lg">
                          <Image
                            src={"/boat.png"}
                            alt=""
                            height={400}
                            width={400}
                            className="object-center object-position w-full h-full"
                          />
                        </div>
                        <div>
                          <div className="flex flex-col">
                            <div className="font-bold text-base">
                              7 Islands Sunset Tour with Picnic Dinner - Shared
                              Transfers
                            </div>
                            <div className="w-125">
                              <p
                                className={`overflow-hidden text-ellipsis ${
                                  isExpanded
                                    ? "whitespace-normal"
                                    : "line-clamp-2"
                                }`}
                              >
                                Timings - 1230 hrs - 1930 hrs. Aptly crafted for
                                couples on honeymoon, or family who wish to have
                                leisure holiday, but don&apos;t want to rush for
                                early morning tours. This is perfect tour to
                                start your vacation, enjoy your breakfast, no
                                need to rush for it to catch a pick up early in
                                the morning The tour pick up is later in the
                                noon so you get peaceful wake up and breakfast
                                at your hotel.
                              </p>
                            </div>
                            <div className="flex gap-1 items-center ">
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
                                    d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                  />
                                </svg>
                              </span>
                              <p>Duration : 10h</p>
                            </div>
                            <div className="flex gap-1 items-center ">
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
                                    d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                  />
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                                  />
                                </svg>
                              </span>
                              <p>Ninh Kieu, Can Tho</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        <Popover
          open={isOpenAccommodation}
          onOpenChange={setIsOpenAccommodation}
        >
          <PopoverTrigger asChild>
            <button className="flex gap-3 border rounded-lg px-6 py-3">
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
              Add Accommodations
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Command>
              <CommandInput placeholder="Search framework..." />
              <CommandList>
                <CommandEmpty>No framework found.</CommandEmpty>
                <CommandGroup>
                  {frameworks.map((framework) => (
                    <CommandItem
                      key={framework.value}
                     
                    >

                      <div className="h-40 p-4 border rounded-lg flex items-center gap-5">
                        <div className="w-60 h-35 overflow-hidden rounded-lg">
                          <Image
                            src={"/boat.png"}
                            alt=""
                            height={400}
                            width={400}
                            className="object-center object-position w-full h-full"
                          />
                        </div>
                        <div className="">
                          <div className="flex flex-col gap-1 border-b-2 pb-3 border-dashed">
                            <div className="font-bold text-base">
                              Spectacular Krabi and Phuket Getaway
                            </div>
                            <div className="flex gap-1 items-center ">
                              <FaStar className="h-3 w-3" />
                              <FaStarHalfAlt className="h-3 w-3" />
                              <FaRegStar className="h-3 w-3" />
                            </div>
                            <div className="flex gap-1 items-center ">
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
                                    d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
                                  />
                                </svg>
                              </span>
                              <p className="text-[10px]">2 Nights</p>
                            </div>
                            <div className="flex gap-1 items-center ">
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
                                    d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                  />
                                </svg>
                              </span>
                              <p className="text-[10px]">
                                22 September - 25 September
                              </p>
                            </div>
                          </div>
                          <div className=" flex flex-col gap-1 mt-0.5">
                            <div className="text-sm font-bold">Deluxe</div>
                            <div className="flex gap-1 items-center">
                              <GiForkKnifeSpoon className="h-3 w-3" />
                              <span className="text-[10px] font-bold text-[#797979]">
                                Breakfast is included
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        <Popover open={isOpenMeals} onOpenChange={setIsOpenMeals}>
          <PopoverTrigger asChild>
            <button className="flex gap-3 border rounded-lg px-6 py-3">
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
              Add Meals
            </button>
          </PopoverTrigger>
          <PopoverContent className="p-0">
            <Command>
              <CommandInput placeholder="Search framework..." />
              <CommandList>
                <CommandEmpty>No framework found.</CommandEmpty>
                <CommandGroup>
                  <CommandItem>
                    <div className="w-full  border rounded-xl px-5 py-3 bg-blue-100">
                      <p className="text-sm font-medium text-[#797979]">
                        at Evoke Lifestyle Candolim
                      </p>
                      <div className="flex items-center gap-1">
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
                              d="m4.5 12.75 6 6 9-13.5"
                            />
                          </svg>
                        </span>
                        <p className="text-xs text-blue-light-2">
                          Included with Hotel
                        </p>
                      </div>
                    </div>
                  </CommandItem>
                  {frameworks.map((framework) => (
                    <CommandItem key={framework.value}>
                      <div className="p-4 border rounded-lg flex items-center gap-5">
                        <div className="w-50 h-25 overflow-hidden rounded-lg">
                          <Image
                            src={"/boat.png"}
                            alt=""
                            height={400}
                            width={400}
                            className="object-center object-position w-full h-full"
                          />
                        </div>
                        <div>
                          <div className="flex flex-col">
                            <div className="font-bold text-lg">
                              7 Islands Sunset Tour with Picnic Dinner - Shared
                              Transfers
                            </div>
                            <div className="w-125">
                              <p
                                className={`overflow-hidden text-ellipsis ${
                                  isExpanded
                                    ? "whitespace-normal"
                                    : "line-clamp-2"
                                }`}
                              >
                                Timings - 1230 hrs - 1930 hrs. Aptly crafted for
                                couples on honeymoon, or family who wish to have
                                leisure holiday, but don&apos;t want to rush for
                                early morning tours. This is perfect tour to
                                start your vacation, enjoy your breakfast, no
                                need to rush for it to catch a pick up early in
                                the morning The tour pick up is later in the
                                noon so you get peaceful wake up and breakfast
                                at your hotel.
                              </p>
                            </div>
                            <div className="flex gap-1 items-center ">
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
                                    d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                  />
                                </svg>
                              </span>
                              <p>Duration : 40 min</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
      <div className="flex flex-col gap-5 my-5  ">
        <div className="border rounded-lg py-5">
          <CardItinerary />
        </div>
        <div className="border rounded-lg py-5">
          <CardItinerary />
        </div>
        <div className="border rounded-lg py-5">
          <CardItinerary />
        </div>
        <div className="border rounded-lg py-5">
          <CardItinerary />
        </div>
      </div>
    </div>
  );
};

export default Day;
