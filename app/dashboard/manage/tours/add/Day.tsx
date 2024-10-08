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
  import { useCallback, useEffect, useState } from "react";
  import Image from "next/image";
  import TransferInfo from "@/components/tour/TransferInfo";
  import { FaRegStar, FaStar } from "react-icons/fa6";
  import { FaStarHalfAlt } from "react-icons/fa";
  import { GiForkKnifeSpoon } from "react-icons/gi";
  import { Button } from "@/components/ui/button";
  interface Accommodation {
    accommodationid: number;
    accommodationname: string;
    durationaccommodation: string;
    accommodationtype: string;
    isbreadkfast: boolean;
    accommodationthumbnail: string;
    roomtype: string;
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
    setMeals: (value: Meal[]) => void;
    setAccommodation: (value: Accommodation[]) => void;
    setPlaces: (value: Place[]) => void;
    setTransfers: (value: Transfer[]) => void;
    meals: Meal[];
    accommodation: Accommodation[];
    places: Place[];
    transfers: Transfer[];
    day: number;
    toursInfo: ToursInfoType;
    setToursInfo: (value: ToursInfoType) => void;
  };

  type ToursInfoType = {
    title: string;
    price: number;
    groupsize: string;
    deposit: string;
    bookinghold: string;
    bookingchange: string;
    categoryTourId: number[];
    themeTourId: number[];
    suitableTourId: number[];
    departureDates: DateTimeOption[];
    thumbnail: string[];
    itineraries: Itinerary[];
  };

  interface DateTimeOption {
    id: string;
    dateTime: string;
  }

  interface Itinerary {
    itineraryId?: number;
    tourPackageId?: number;
    accommodationIds?: number[];
    mealIds?: number[];
    placeIds?: number[];
    transferIds?: number[];
    day: number;
  }


  interface ItineraryData {
    accommodationData: Accommodation[];
    mealData: Meal[];
    placeData: Place[];
    transferData: Transfer[];
    day: number;
  }

  interface ItineraryDatas  {
    accommodations: Accommodation[];
    meals: Meal[];
    places: Place[];
    transfers: Transfer[];
      day: number;
  }

  const Day = ({
    accommodation,
    meals,
    places,
    transfers,
    setAccommodation,
    setMeals,
    setPlaces,
    setTransfers,
    setToursInfo,
    toursInfo,
    day,
  }: DayType) => {
    const [isExpanded, setIsExpanded] = useState<boolean>(false);
    const [isOpenTransfers, setIsOpenTransfer] = useState<boolean>(false);
    const [isOpenPlaces, setIsOpenPlaces] = useState<boolean>(false);
    const [isOpenAccommodation, setIsOpenAccommodation] =
      useState<boolean>(false);
    const [isOpenMeals, setIsOpenMeals] = useState<boolean>(false);
    const [itinerary, setItinerary] = useState<ItineraryData>();
    const toggleExpansion = () => {
      setIsExpanded(!isExpanded);
    };
    console.log(`meals ${day -1}`, meals);
    console.log("places", places);
    console.log("transfer", transfers);
    console.log("accomodations", accommodation);
    const convertToTimeUnit = (value: number): string => {
      const minutesInHour = 60;
      const minutesInDay = 60 * 24;
      if (value >= minutesInDay) {
        const days = Math.floor(value / minutesInDay);
        const remainingMinutes = value % minutesInDay;
        const hours = Math.floor(remainingMinutes / minutesInHour);
        return `${days} Nights ${hours > 0 ? hours + " Hours" : ""}`;
      } else if (value >= minutesInHour) {
        const hours = Math.floor(value / minutesInHour);
        const minutes = value % minutesInHour;
        return `${hours} Hours ${minutes > 0 ? minutes + " Minutes" : ""}`;
      } else {
        return `${value} Minutes`;
      }
    };
    const isItinerary = (
      itinerary: Itinerary | ItineraryData
    ): itinerary is Itinerary => {
      return Array.isArray((itinerary as Itinerary)?.accommodationIds);
    };
  const getItineraryData = (
    itinerary: Itinerary | ItineraryDatas,
    accommodations: Accommodation[],
    meals: Meal[],
    places: Place[],
    transfers: Transfer[]
  ): ItineraryData => {
    console.log("kkk", itinerary);
    console.log("kkk1", accommodations);
    console.log("kkk2", meals);
    console.log("kkk3", places);
    console.log("kkk4", transfers);
    if (isItinerary(itinerary)) {
      return {
        accommodationData:
          itinerary?.accommodationIds
            ?.map((id) =>
              accommodations?.find((accom) => accom.accommodationid === id)
            )
            .filter((accom): accom is Accommodation => !!accom) || [],

           mealData:
             itinerary?.mealIds
               ?.map((id) => meals?.find((meal) => meal.mealid === id))
               .filter((meal): meal is Meal => !!meal) || [],

           placeData:
             itinerary?.placeIds
               ?.map((id) => places?.find((place) => place.placeid === id))
               .filter((place): place is Place => !!place) || [],

           transferData:
             itinerary?.transferIds
               ?.map((id) =>
                 transfers?.find((transfer) => transfer.transferid === id)
               )
               .filter((transfer): transfer is Transfer => !!transfer) || [],

           day: itinerary?.day,
         };
       } else {
         console.log("sasa", itinerary);

      return {
        accommodationData: itinerary?.accommodations || [],
        mealData: itinerary?.meals || [],
        placeData: itinerary?.places || [],
        transferData: itinerary?.transfers || [],
        day: itinerary?.day, 
      };
    }
  };
  const addItineraryItem = (type: string, id: number) => {
    ensureItineraryExists();
    
    const currentItinerary = toursInfo.itineraries[day - 1] || {
      day,
      accommodationIds: [],
      mealIds: [],
      placeIds: [],
      transferIds: [],
    };

    let updatedItinerary = { ...currentItinerary };
    
    switch (type) {
      case 'accommodation':
        updatedItinerary.accommodationIds = [...(currentItinerary.accommodationIds || []), id];
        break;
      case 'meal':
        updatedItinerary.mealIds = [...(currentItinerary.mealIds || []), id];
        break;
      case 'place':
        updatedItinerary.placeIds = [...(currentItinerary.placeIds || []), id];
        break;
      case 'transfer':
        updatedItinerary.transferIds = [...(currentItinerary.transferIds || []), id];
        break;
    }

    setToursInfo({
      ...toursInfo,
      itineraries: [
        ...toursInfo.itineraries.slice(0, day - 1),
        updatedItinerary,
        ...toursInfo.itineraries.slice(day),
      ],
    });
  };
  const ensureItineraryExists = () => {
    if (!toursInfo.itineraries[day - 1]) {
      setToursInfo({
        ...toursInfo,
        itineraries: [
          ...toursInfo.itineraries.slice(0, day - 1),
          {
            day,
            accommodationIds: [],
            mealIds: [],
            placeIds: [],
            transferIds: [],
          },
          ...toursInfo.itineraries.slice(day),
        ],
      });
    }
  };
  const deleteItineraryItem = (type: string, id: number) => {
    const currentItinerary = toursInfo.itineraries[day - 1];
    if (!currentItinerary) return;
    let updatedItinerary = { ...currentItinerary };
    switch (type) {
      case 'accommodation':
        updatedItinerary.accommodationIds = currentItinerary.accommodationIds?.filter(itemId => itemId !== id);
        break;
      case 'meal':
        updatedItinerary.mealIds = currentItinerary.mealIds?.filter(itemId => itemId !== id);
        break;
      case 'place':
        updatedItinerary.placeIds = currentItinerary.placeIds?.filter(itemId => itemId !== id);
        break;
      case 'transfer':
        updatedItinerary.transferIds = currentItinerary.transferIds?.filter(itemId => itemId !== id);
        break;
    }

    setToursInfo({
      ...toursInfo,
      itineraries: [
        ...toursInfo.itineraries.slice(0, day - 1),
        updatedItinerary,
        ...toursInfo.itineraries.slice(day),
      ],
    });
  };


    useEffect(() => {
      const itineraryData = getItineraryData(
        toursInfo?.itineraries?.[day - 1] || {},
        accommodation,
        meals,
        places,
        transfers
      );
      console.log("kokko", itineraryData);

      setItinerary(itineraryData);
    }, [
      toursInfo,
      accommodation,
      day,
      meals,
      places,
      transfers,
      getItineraryData,
    ]);



    // useEffect(() => {
    //   console.log("la", toursInfo?.itineraries);
    //   console.log("in", itinerary);
    //   console.log(`meals ${day -1}`, meals);
    //   console.log("places", places);
    //   console.log("transfer", transfers);
    //   console.log("accomodations", accommodation);
    // }, [toursInfo, itinerary,meals,places,transfers,accommodation]);

    
 

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
                <CommandEmpty>No transfer found.</CommandEmpty>
                <CommandGroup>
                  {transfers?.map((transfer) => (
                    <CommandItem key={transfer.transferid}>
                      <div
                        className="h-30 p-4 border rounded-lg flex items-center gap-5"
                        onClick={() => {
                          const currentItinerary = toursInfo.itineraries[
                            day - 1
                          ] || { transferIds: [] };

                          setToursInfo({
                            ...toursInfo,
                            itineraries: [
                              ...toursInfo.itineraries.slice(0, day - 1),
                              {
                                ...currentItinerary,
                                day,
                                transferIds: [
                                  ...(currentItinerary.transferIds || []),
                                  transfer.transferid,
                                ],
                              },
                              ...toursInfo.itineraries.slice(day),
                            ],
                          });
                        }}
                      >
                        <div className="w-50 h-25 overflow-hidden rounded-lg">
                          <Image
                            src={transfer.transferthumbnail}
                            alt=""
                            height={400}
                            width={400}
                            className="object-center object-position w-full h-full"
                          />
                        </div>
                        <div>
                          <div className="flex flex-col gap-2">
                            <div className="font-bold text-base">
                              {transfer.transfername}
                            </div>
                            <div className="w-125">
                              <p
                                className={`overflow-hidden text-ellipsis ${
                                  isExpanded
                                    ? "whitespace-normal"
                                    : "line-clamp-2"
                                }`}
                              >
                                {transfer.description}
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
                <CommandEmpty>No place found.</CommandEmpty>
                <CommandGroup>
                  {places?.map((place) => (
                    <CommandItem key={place.placeid}>
                      <div
                        className="h-30 p-4 border rounded-lg flex items-center gap-5"
                        onClick={() => {
                          const currentItinerary = toursInfo.itineraries[
                            day - 1
                          ] || { placeIds: [] };

                          setToursInfo({
                            ...toursInfo,
                            itineraries: [
                              ...toursInfo.itineraries.slice(0, day - 1),
                              {
                                ...currentItinerary,
                                day,
                                placeIds: [
                                  ...(currentItinerary.placeIds || []),
                                  place.placeid,
                                ],
                              },
                              ...toursInfo.itineraries.slice(day),
                            ],
                          });
                        }}
                      >
                        <div className="w-50 h-25 overflow-hidden rounded-lg">
                          <Image
                            src={place.placethumbnail}
                            alt=""
                            height={400}
                            width={400}
                            className="object-center object-position w-full h-full"
                          />
                        </div>
                        <div>
                          <div className="flex flex-col">
                            <div className="font-bold text-base">
                              {place.placename}
                            </div>
                            <div className="w-125">
                              <p
                                className={`overflow-hidden text-ellipsis ${
                                  isExpanded
                                    ? "whitespace-normal"
                                    : "line-clamp-2"
                                }`}
                              >
                                {place.description}
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
                              <p>
                                Duration :{" "}
                                {convertToTimeUnit(Number(place.placeduration))}
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
                <CommandEmpty>No accommodation found.</CommandEmpty>
                <CommandGroup>
                  {accommodation?.map((item) => (
                    <CommandItem key={item.accommodationid}>
                      <div
                        className="h-40 p-4 border rounded-lg flex items-center gap-5"
                        onClick={() => {
                          const currentItinerary = toursInfo.itineraries[
                            day - 1
                          ] || { accommodationIds: [] };

                          setToursInfo({
                            ...toursInfo,
                            itineraries: [
                              ...toursInfo.itineraries.slice(0, day - 1),
                              {
                                ...currentItinerary,
                                day,
                                accommodationIds: [
                                  ...(currentItinerary.accommodationIds || []),
                                  item.accommodationid,
                                ],
                              },
                              ...toursInfo.itineraries.slice(day),
                            ],
                          });
                        }}
                      >
                        <div className="w-60 h-35 overflow-hidden rounded-lg">
                          <Image
                            src={item.accommodationthumbnail}
                            alt=""
                            height={400}
                            width={400}
                            className="object-center object-position w-full h-full"
                          />
                        </div>
                        <div className="">
                          <div className="flex flex-col gap-1 border-b-2 pb-3 border-dashed">
                            <div className="font-bold text-base">
                              {item.accommodationname}
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
                              <p className="text-[10px]">
                                {convertToTimeUnit(
                                  Number(item.durationaccommodation)
                                )}
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
                            <div className="text-sm font-bold">
                              {item.roomtype}
                            </div>
                            {item?.isbreadkfast && (
                              <div className="flex gap-1 items-center">
                                <GiForkKnifeSpoon className="h-3 w-3" />
                                <span className="text-[10px] font-bold text-[#797979]">
                                  Breakfast is included
                                </span>
                              </div>
                            )}
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
                <CommandEmpty>No meal found.</CommandEmpty>
                <CommandGroup>
                  {meals?.map((meal) => (
                    <>
                      {meal.mealactivity != "" && (
                        <CommandItem>
                          {" "}
                          <div
                            className="w-full  border rounded-xl px-5 py-3 bg-blue-100"
                            onClick={() => {
                              const currentItinerary = toursInfo.itineraries[
                                day - 1
                              ] || { mealIds: [] };
                              setToursInfo({
                                ...toursInfo,
                                itineraries: [
                                  ...toursInfo.itineraries.slice(0, day - 1),
                                  {
                                    ...currentItinerary,
                                    day,
                                    mealIds: [
                                      ...(currentItinerary.mealIds || []),
                                      meal.mealid,
                                    ],
                                  },
                                  ...toursInfo.itineraries.slice(day),
                                ],
                              });
                            }}
                          >
                            <p className="text-sm font-medium text-[#797979]">
                              {meal.mealactivity}
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
                      )}
                      {meal.mealactivity == "" && (
                        <CommandItem>
                          <div
                            className="p-4 border rounded-lg flex items-center gap-5"
                            onClick={() => {
                              const currentItinerary = toursInfo.itineraries[
                                day - 1
                              ] || { mealIds: [] };

                              setToursInfo({
                                ...toursInfo,
                                itineraries: [
                                  ...toursInfo.itineraries.slice(0, day - 1),
                                  {
                                    ...currentItinerary,
                                    day,
                                    mealIds: [
                                      ...(currentItinerary.mealIds || []),
                                      meal.mealid,
                                    ],
                                  },
                                  ...toursInfo.itineraries.slice(day),
                                ],
                              });
                            }}
                          >
                            <div className="w-50 h-25 overflow-hidden rounded-lg">
                              <Image
                                src={meal.mealthumbnail}
                                alt=""
                                height={400}
                                width={400}
                                className="object-center object-position w-full h-full"
                              />
                            </div>
                            <div>
                              <div className="flex flex-col">
                                <div className="font-bold text-lg">
                                  {meal.mealname}
                                </div>

                                <div className="flex gap-1 my-5 items-center ">
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
                                  <p>
                                    Duration :{" "}
                                    {convertToTimeUnit(
                                      Number(meal.mealduration)
                                    )}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CommandItem>
                      )}
                    </>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
      <div className="flex flex-col gap-5 my-5  ">
      {itinerary?.accommodationData.map((item, index) => (
          <div key={index} className="border rounded-lg py-5 relative">
            <Button 
              variant="destructive" 
              size="sm"
              className="absolute top-2 right-2"
              onClick={() => deleteItineraryItem('accommodation', item.accommodationid)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </Button>
            <CardItinerary data={item} />
          </div>
        ))}
        {itinerary?.transferData.map((item, index) => (
          <div key={index} className="border rounded-lg py-5 relative">
            <Button 
              variant="destructive" 
              size="sm"
              className="absolute top-2 right-2"
              onClick={() => deleteItineraryItem('transfer', item.transferid)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </Button>
            <CardItinerary data={item} />
          </div>
        ))}
        {itinerary?.mealData.map((item, index) => (
          <div key={index} className="border rounded-lg py-5 relative">
            <Button 
              variant="destructive" 
              size="sm"
              className="absolute top-2 right-2"
              onClick={() => deleteItineraryItem('meal', item.mealid)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </Button>
            <CardItinerary data={item} />
          </div>
        ))}
        {itinerary?.placeData.map((item, index) => (
          <div key={index} className="border rounded-lg py-5 relative">
            <Button 
              variant="destructive" 
              size="sm"
              className="absolute top-2 right-2"
              onClick={() => deleteItineraryItem('place', item.placeid)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </Button>
            <CardItinerary data={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Day;
